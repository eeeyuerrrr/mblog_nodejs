var loginRouter = require('./login');
var homeRouter = require('./home');
var regRouter = require('./reg');
var doRegRouter = require('./doReg');
var testRouter = require('./test');

module.exports = function(app){

  testRouter(app);
  homeRouter(app);
  loginRouter(app);
  regRouter(app);
  doRegRouter(app);

};
