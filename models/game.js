const underscore = require('underscore');

class Game {

  constructor ( db ) {
    this.db = db;
    this.MAX_PLAYERS = 2;
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

  getPlayerCount ( game_id ) {
      return this.db.one(
        "SELECT COUNT(*) FROM user_game WHERE game_id = $1;",
        [ game_id ],
        data => data.count
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

  updateUserGameRecord ( user, game_id ) {
      return this.db.any(
        "UPDATE user_game SET role = $1, item = $2 WHERE user_id = $3 AND game_id = $4;",
        [ user.role, user.item, user.id, game_id ]
      ).then( _ => user );
  }

  updateNightAction ( action ) {
    return this.db.none(
      "UPDATE user_game SET nightaction_target = $1 WHERE user_id = $2 AND game_id = $3;",
      [ action.target, action.id, action.game_id ]
    );
  }

  collectNightActions ( game_id ) {
    return this.db.any(
      "SELECT user_id, role, nightaction_target FROM user_game WHERE game_id = $1;",
      [ game_id ]
    ).then( actions => actions.map( action => ({id: action.user_id, role: action.role, target: action.nightaction_target  } )));
  }

}

module.exports = Game;
