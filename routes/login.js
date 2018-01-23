module.exports = function(app){
    app.get('/login',function (req, res) {
        res.render('login',{
            title: '登录',
            user:User.getCurrentUser(req),
            error:flash.error(req),
            success:flash.success(req)
        });
    });
}