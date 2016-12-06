const db = require('../db');

class Lobby {

    constructor () {
    }

    findAvailable () {
      return db.one(
        "SELECT id FROM lobbies WHERE visible = $1 and player_count < $2 LIMIT 1;",
        [true, Lobby.MAX_PLAYERS]
      )
    }

    create () {
      return db.one(
        "INSERT INTO lobbies (visible, player_count) VALUES ($1, $2) RETURNING id;",
        [true, 0]
      )
    }

    static get MAX_PLAYERS () {
        return 3;
    }

}

module.exports = Lobby;
