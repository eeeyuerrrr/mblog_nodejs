var User = require('../models/user');
var Post = require('../models/post');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/',function (req, res) {

        Post.get(null, function (err, posts) {
           if( err ){
               posts = [];
           }
            res.render('home',{
                title: '首页',
                posts: posts
            });
        });
    });
}