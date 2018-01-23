var User = require('../models/user');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.get('/login',checkLoginState.shouldNotLogin);

    app.get('/login',function (req, res) {
        res.render('login',{
            title: '登录'
        });
    });

}