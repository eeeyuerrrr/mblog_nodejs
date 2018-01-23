var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.render('index', { title: '发表' });
});

module.exports = router;
