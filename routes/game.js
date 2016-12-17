const express = require('express');
const router = express.Router();
const models = require('../models/models');

/* Join a game room*/
router.get('/join', (req, res, next) => {
  if( req.session.user.id ) {
    models.user.alreadyInGame( req.session.user.id )
      .then( game_id => { console.log('GAME ID ', game_id); res.redirect( `/game/${game_id}` ) })
      .catch( error => { next(); } );
  } else {
    next();
  }
});

router.get('/join', function(req, res, next) {
  models.game.findAvailable()
    .catch( models.game.create )
    .then( game_id => models.game.addUser( game_id, req.session.user.id ))
    .then( game_id => res.redirect( `/game/${game_id}` ))
});

/* GET join game. */
router.get('/:id', function(req, res, next) {
    models.game.getUsers(req.params.id)
    .then( users => {
        console.log( "RENDERING: ", users )
        res.render( 'game', { game_id: req.params.id, user_id: req.session.user.id, name: req.session.user.name, users: users })
    });
});

module.exports = router;
