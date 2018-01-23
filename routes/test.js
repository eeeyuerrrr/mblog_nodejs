var User = require('../models/user');
var flash = require('../helper/flash');

module.exports = function(app){
    app.get('/test',function (req, res) {
        res.render('test',{
            title:'test',
            msg:''
        });
    });
}


