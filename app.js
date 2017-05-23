var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var area = require('./routes/area');
var instructor = require('./routes/instructor');
//var users = require('./routes/users');

var app = express();

var dateString = new Date().toUTCString(); // just like to know start time

console.log('Starting server at ' + dateString); // print out start time to console

// get coursedata
try {
    console.log('Attempting to read course data.');
    var coursedata = require('./Courses.json');
} catch(err) {
    console.error('could not find course data.');
    process.exit(1);
}

var coursekeys = Object.keys(coursedata);

area.coursedata = coursedata;
area.coursekeys = coursekeys;
instructor.coursedata = coursedata;
instructor.coursekeys = coursekeys;

// view engine setup
app.set('appName', 'course searcher');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/courses/instructor', instructor);
app.use('/courses/area', area);
//app.use('/users', users);

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


module.exports = app;
