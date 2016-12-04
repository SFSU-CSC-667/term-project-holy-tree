const express = require('express');
const router = express.Router();
const db = require('../db');
const Lobby = require('../models/Lobby');

/* Join a lobby room*/
router.get('/join', function(req, res, next) {
    lobby = new Lobby();

    lobby.findAvailable()
        .then( data => {  res.redirect( `/lobby/${data.id}` ); }) 
        .catch( error => {
            lobby.create()
                .then( id => { res.redirect( `/lobby/${id}` ); })
                .catch( error => { console.log( error ) });
        });
});

/* GET join lobby. */
router.get('/:id', function(req, res, next) {
    res.render( 'lobby', { lobby_id: req.params.id } );
});

module.exports = router;
