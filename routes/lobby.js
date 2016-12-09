const express = require('express');
const router = express.Router();
const models = require('../models/models');

/* Join a lobby room*/
router.get('/join', function(req, res, next) {
  models.lobby.findAvailable()
    .catch( models.lobby.create )
    .then ( id => models.user.alreadyInLobby( id, req.session.user.id )
      .catch( _ => models.user.associateWithLobby( id, req.session.user.id ))
    )
    .catch( id => models.user.associateWithLobby( id, req.session.user.id ))
    .then ( id => res.redirect( `/lobby/${id}` ))
});

/* GET join lobby. */
router.get('/:id', function(req, res, next) {
    res.render( 'lobby', { lobby_id: req.params.id, user_name: req.session.user.name } );
});

module.exports = router;
