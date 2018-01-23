var User = require('../models/user');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/test',function (req, res) {
        req.flash('error','this is a test error');
        // res.redirect('/');
        res.render('test',{
            title:'test',
            msg:'',
            user:User.getCurrentUser(req),
            error:flash.error(req),
            success:flash.success(req)
        });
    });
}


