var User = require('../models/user');
var Post = require('../models/post');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.post('/post',checkLoginState.shouldLogin);

    app.post('/post',function (req, res) {
        var currentUser = User.getCurrentUser(req);
        var post = new Post(currentUser.name, req.body.post );
        post.save(function(err, post){
            if(err){
                flash.setErrorInfo(req,err);
                return res.redirect('/');
            }
            flash.setSuccessInfo(req, '发表成功');
            res.redirect('/user/'+currentUser.name);
        });
    });

}