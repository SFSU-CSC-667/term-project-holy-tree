const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', ( req, res, next ) => {
  if ( req.session.user ) {
    const name = req.session.user.name ||  "";
    res.render('index', { title: 'Werewolf', name: name });
  } else {
    res.render('login')
  }
});

module.exports = router;
