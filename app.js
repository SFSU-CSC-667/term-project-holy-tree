var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exphbs  = require('express-handlebars');

require('dotenv').config({ silent: true });

var routes = require('./routes/index');
var users = require('./routes/users');
var private = require('./routes/private');
var lobby = require('./routes/lobby');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db').db;

app.set('db', db);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
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

//  Register Partials
exphbs.registerPartial('navbar', '{{navbar}}');

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
  var err = new Error('Not Found');
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
