var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var MongoStore = require('connect-mongo');
var settings = require('./settings');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser());
// app.use(express.session({
//     secret: settings.cookieSecret,
//     store: new MongoStore({
//         db: settings.db
//     })
// }));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.png')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(partials()); //使用模板
//dynamic helper 视图助手
app.use(function(req, res, next){
    res.locals.headers = req.headers;
    res.locals.inspect = function (obj) {
        return util.inspect(obj);
    };
    next();
});

//=================================================================
var test = require('./routes/test');
var index = require('./routes/index');
var user = require('./routes/user');
var reg = require('./routes/reg');
var doReg = require('./routes/doReg');
var login = require('./routes/login');
var doLogin = require('./routes/doLogin');
var logout = require('./routes/logout');
var post = require('./routes/post');
//=================================================================
app.use('/test',test);
app.use('/', index);
app.use('/user', user);
app.use('/reg',reg);
app.use('/doReg',doReg);
app.use('/login',login);
app.use('/doLogin',doLogin);
app.use('/logout',logout);
app.use('/post',post);
//=================================================================


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
