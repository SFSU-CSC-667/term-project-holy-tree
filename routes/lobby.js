const express = require('express');
const router = express.Router();
const db = require('../db');
const Lobby = require('../models/Lobby');

/* Join a lobby room*/
router.get('/join', function(req, res, next) {
    lobby = new Lobby();

    lobby.findAvailable()
        .then( lobby_id => { 
            if (lobby_id) {
                res.redirect( `/lobby/${lobby_id}` );   
            } else {
                lobby.create()
                    .then( id => { res.redirect( `/lobby/${id}` ); })
                    .catch( error => { console.log( error ) });
            }   
        })
        .catch( error => {
            console.log(error);
        });
});

/* GET join lobby. */
router.get('/:id', function(req, res, next) {
    res.render( 'lobby', { lobby_id: req.params.id, user_name: req.session.user.name } );
});

module.exports = router;
