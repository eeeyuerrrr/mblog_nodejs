var User = require('../models/user');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/logout',function (req, res) {
        res.render('logout',{
            title: '登出',
            user:User.getCurrentUser(req),
            error:flash.error(req),
            success:flash.success(req)
        });
    });
}