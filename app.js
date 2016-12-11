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
const game = require('./routes/game');
const models = require('./models/models');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = require('./db').db;
const socketInit = require('./routes/socketInit')( io );

app.set('db', db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.handlebars', exphbs({extname: '.handlebars', defaultLayout: 'layout'}));
app.set('view engine', '.handlebars');
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

app.use('/game', function (req, res, next) {
  if ( !req.session.user ) {
    res.status( 403 );
    res.render( 'error', { message: "You must sign in before joining a game", error: {} });
  } else {
    next()
  }
})

app.use('/', routes);
app.use('/users', users);
app.use('/private', private);
app.use('/game', game);

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
