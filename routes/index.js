var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        layout: 'baseLayout',
        title: 'home'
    });
});

module.exports = router;
