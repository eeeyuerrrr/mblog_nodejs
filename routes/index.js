var testRouter = require('./test');
var loginRouter = require('./login');
var homeRouter = require('./home');
var regRouter = require('./reg');
var doRegRouter = require('./doReg');
var doLoginRouter = require('./doLogin');
var logOutRouter = require('./logout');
var postRouter = require('./post');
var userRouter = require('./user');


module.exports = function(app){

  testRouter(app);
  homeRouter(app);
  loginRouter(app);
  doLoginRouter(app);
  regRouter(app);
  doRegRouter(app);
  logOutRouter(app);
  postRouter(app);
  userRouter(app);

};
