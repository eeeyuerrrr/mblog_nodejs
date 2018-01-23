var User = require('../models/user');
var flash = require('../helper/flash');
var checkLoginState = require('../helper/checkLoginState');

module.exports = function(app){

    app.get('/login',checkLoginState.shouldLogin);

    app.get('/logout',function (req, res) {
        User.clearCurrentUser(req);
        flash.setSuccessInfo(req,'登出成功');
        res.redirect('/');
    });

}