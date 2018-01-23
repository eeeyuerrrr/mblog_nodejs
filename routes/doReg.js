var crypto = require('crypto');
var User = require('../models/user');

module.exports = function(app){
    app.post('/doReg',function(req, res){
        if( req.body['password-repeat'] != req.body['password'] ){
            req.flash('error','两次输入的口令不一致');
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
                req.flash('error',err);
                return res.redirect('/reg');
            }

            newUser.save(function (err) {
                if(err){
                    req.flash('error',err);
                    return res.redirect('/reg');
                }
            });
            User.setCurrentUser(req,newUser);
            req.flash('success','注册成功');
            res.redirect('/');
        });
    });
}