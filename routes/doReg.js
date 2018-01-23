var crypto = require('crypto');
var User = require('../models/user');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.post('/doReg', checkLoginState.shouldNotLogin);

    app.post('/doReg',function(req, res){
        if( req.body['password-repeat'] != req.body['password'] ){
            flash.setErrorInfo(req,'两次输入的口令不一致');
            return res.redirect('/reg');
        }

        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser = new User({
            name: req.body.username,
            password: password
        });

        User.get(newUser.name, function(err, user){
            if(user){
                err = '用户名已存在';
            }
            if(err){
                flash.setErrorInfo(req,err);
                return res.redirect('/reg');
            }

            newUser.save(function (err) {
                if(err){
                    flash.setErrorInfo(req,err);
                    return res.redirect('/reg');
                }
            });
            User.setCurrentUser(req,newUser);
            flash.setErrorInfo(req,err);
            res.redirect('/');
        });
    });
}