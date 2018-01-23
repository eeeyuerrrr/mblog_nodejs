var User = require('../models/user');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/',function (req, res) {
        res.render('home',{
            title: '首页',
            user:User.getCurrentUser(req),
            error:flash.error(req),
            success:flash.success(req)
        });
    });
}