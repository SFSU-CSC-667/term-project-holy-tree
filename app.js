const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs  = require('express-handlebars');

require('dotenv').config({ silent: true });

const routes = require('./routes/index');
const users = require('./routes/users');
const private = require('./routes/private');
const lobby = require('./routes/lobby');

const Lobby = require('./models/Lobby');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./db').db;

app.set('db', db);

io.on('connection', function(socket){
  // Socket.io Intializations and Config
  socket.on('subscribe to lobby', function(subscription) {
    console.log(subscription);
    socket.join(subscription.lobby);

    new Lobby().incrementPlayerCount(subscription.lobby)
         .then( player_count => {
            io.to(subscription.lobby).emit('player joined', { player_count: data.player_count });
            io.to(subscription.lobby).emit('chat message', { message: `${subscription.user_name} has joined the lobby`, user_name: 'WerewolfApp' });
         })
         .catch( error => { console.log(error) });
  });

  socket.on('chat message', function(data) {
    io.to(data.lobby).emit('chat message', {
      message: data.message,
      user_name: data.user_name
    });
  });
  
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', '.hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( function(req, res, next) {
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  secret: 'Super Secret',
  saveUninitialized: false
}));

app.use('/', routes);
app.use('/users', users);
app.use('/private', private);
app.use('/lobby', lobby);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = { app: app, server: server };
