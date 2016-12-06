const db = require('../db');

class User {
    constructor () {
    }

    findByUID ( uid ) {
      return db.one( "SELECT * FROM users WHERE uid = $1", [ uid ] );
    }

    create ( userData ) {
      return db.one(
        "INSERT INTO users (name, uid, profile_pic, rank) VALUES($1, $2, $3, $4) RETURNING name, id",
        [ userData.name, userData.uid, userData.profile_pic, userData.rank ]
      );
    }

    joinLobby ( data ) {
      return db.one(
        "INSERT INTO user_lobbies (lobby_id, user_id) VALUES($1, $2) RETURNING lobby_id",
        [ data.lobby_id, data.user_id ]
      )
    }
}

module.exports = User;
