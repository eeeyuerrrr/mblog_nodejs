var User = require('../models/user');
var flash = require('../helper/flash');
var crypto = require('crypto');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.post('/doLogin',checkLoginState.shouldNotLogin);

    app.post('/doLogin',function (req, res) {
        var username = req.body['username'];

        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body['password']).digest('base64');

        User.get(username, function(err, user){
            if( !user ){
                err = '用户不存在';
            }else if( user.password !== password){
                err = '密码错误';
            }
            if(err){
                flash.setErrorInfo(req,err);
                return res.redirect('/login');
            }
            User.setCurrentUser(req,user);
            flash.setSuccessInfo(req,'登录成功');
            res.redirect('/');
        });
    });

}