var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const name = ( req.session.user && req.session.user.name ) ||  "";
  res.render('index', { title: 'Express', name: name });
});

module.exports = router;
