var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var env = require('./config/env.json');
var expressValidation = require('express-validation');
var CustomError = require('./class/customError');

// Routers
var index = require('./routes/index');
var apiUserRouter = require('./api/entities/users/routes/userRouter');
var apiPolicieRouter = require('./api/entities/policies/routes/policieRouter');

// Enviroment
var enviroment = process.env.ENVIROMENT || 'development';
var constantsEnv = env[enviroment];
process.env.PORT = constantsEnv.PORT

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/user', apiUserRouter);
app.use('/api/policie', apiPolicieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // specific for validation errors
  if (err instanceof expressValidation.ValidationError) {
    var errorCustom = new CustomError('invalidParams');
    errorCustom.errors = err.errors;
    return res.status(errorCustom.httpStatusCode).json(errorCustom);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
