const user = db => {
  return {
    findByUID: uid => {
      return db.one( "SELECT * FROM users WHERE uid = $1", [ uid ] );
    },

    findByID: id => {
      return db.one( "SELECT * FROM users WHERE id = $1", [ id ] );
    },

    create: data => {
      return db.one(
        "INSERT INTO users (name, uid, profile_pic, rank) VALUES($1, $2, $3, $4) RETURNING name, id",
        [ data.name, data.uid, data.profile_pic, data.rank ]
      );
    },

    alreadyInGame: user_id => {
      return db.one(
       "SELECT game_id FROM user_game ug JOIN game g ON ug.game_id = g.id WHERE g.finished = $1 AND ug.user_id = $2;",
       [ false, user_id ]
     ).then( data => data.game_id );
    }
  }
}

module.exports = user;
