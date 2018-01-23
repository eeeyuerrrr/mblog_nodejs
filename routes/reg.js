var User = require('../models/user');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.get('/reg', checkLoginState.shouldNotLogin);

    app.get('/reg',function (req, res) {
        res.render('reg',{
            title: '用户注册',
            user:User.getCurrentUser(req),
            error:flash.getErrorInfo(req),
            success:flash.getSuccessInfo(req)
        });
    });

}