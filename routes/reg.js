var User = require('../models/user');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/reg',function (req, res) {
        res.render('reg',{
            title: '用户注册',
            user:User.getCurrentUser(req),
            error:flash.error(req),
            success:flash.success(req)
        });
    });
}