var User = require('../models/user');
var Post = require('../models/post');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.get('/user/:user', checkLoginState.shouldLogin);

    app.get('/user/:user',function (req, res) {
        var username = req.params.user;
        User.get(username, function(err, user){
            if( !user ){
                err = '用户不存在';
            }
            if(err){
               flash.setErrorInfo(req, err);
               return res.redirect('/');
            }

            Post.get( username , function (err, posts) {
                if(err){
                    flash.setErrorInfo(req, err);
                    return res.redirect('/');
                }
                res.render('user',{
                   title: username,
                   posts: posts
                });
            });

        });
    });
}