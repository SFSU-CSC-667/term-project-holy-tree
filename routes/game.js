const express = require('express');
const router = express.Router();
const models = require('../models/models');

/* Join a game room*/
router.get('/join', function(req, res, next) {
  models.game.findAvailable()
    .catch( models.game.create )
    .then( game_id => models.game.addUser( game_id, req.session.user.id ))
    .then( game_id => res.redirect( `/game/${game_id}` ))
});

/* GET join game. */
router.get('/:id', function(req, res, next) {
    res.render( 'game', { game_id: req.params.id, user_name: req.session.user.name } );
});

module.exports = router;
