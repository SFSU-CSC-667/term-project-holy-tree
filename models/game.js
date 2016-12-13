const underscore = require('underscore');

class Game {

  constructor ( db ) {
    this.db = db;
    this.MAX_PLAYERS = 3;
  }

  findAvailable () {
      return this.db.one(
        "SELECT id FROM games WHERE visible = $1 and player_count < $2 ORDER BY id ASC LIMIT 1;",
        [true, this.MAX_PLAYERS],
        data => data.id
      ).bind( this );
  }

  create () {
      return this.db.one(
        "INSERT INTO games (visible, player_count) VALUES ($1, $2) RETURNING id;",
        [true, 0],
        data => data.id
      ).bind( this );
  }

  incrementPlayerCount ( game_id ) {
      return this.db.one(
        "UPDATE games SET player_count = player_count + 1 WHERE id = $1 RETURNING player_count;",
        [game_id],
        data => data.player_count
      );
   }

   hasUser ( game_id, user_id ) {
      return this.db.one(
        "SELECT * FROM user_game WHERE user_id = $1 and game_id = $2",
        [ user_id, game_id ]
      );
  }

  addUser ( game_id, user_id ) {
      return this.db.none(
        "INSERT INTO user_game (game_id, user_id) VALUES($1, $2);",
        [ game_id, user_id ]
      ).then( _ => game_id );
  }

  getUsers ( game_id ) {
      return this.db.any(
          "SELECT DISTINCT users.id, users.name, users.profile_pic FROM user_game JOIN users on user_game.user_id = users.id WHERE game_id = $1;",
          [ game_id ]
        );
    }

  setUserGameRole ( user_id, role ) {
      return this.db.one(
        "UPDATE user_game SET role = $1 WHERE user_id = $2 RETURNING user_id, role;",
        [ role, user_id ]
      );
  }

  setup ( game_id, roles ) {
      return this.getUsers( game_id )
        .then( users => underscore.shuffle( users ) )
        .then( shuffled => shuffled.map( (user, i) => this.setUserGameRole(user,roles[i])));
  }

}

module.exports = Game;
