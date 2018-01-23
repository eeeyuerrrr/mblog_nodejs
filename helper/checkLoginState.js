var User = require('../models/user');
var flash = require('./flash');

module.exports = {
    shouldLogin: function (req, res, next) {
        if (!User.getCurrentUser(req)) {
            flash.setErrorInfo(req, '未登录');
            res.redirect('/login');
        }
        next();
    },
    shouldNotLogin: function (req, res, next) {
       if( User.getCurrentUser(req)){
           flash.setErrorInfo(req,'已登录');
           res.redirect('/');
       }
        next();
    }
};