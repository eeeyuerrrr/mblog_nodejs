var User = require('../models/user');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.get('/post',checkLoginState.shouldLogin);

    app.get('/post',function (req, res) {
        res.render('post', {
            title: '登录'
        });
    });

}