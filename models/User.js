const user = db => {
  return {
    findByUID: uid => {
      return db.one( "SELECT * FROM users WHERE uid = $1", [ uid ] );
    },

    create: data => {
      return db.one(
        "INSERT INTO users (name, uid, profile_pic, rank) VALUES($1, $2, $3, $4) RETURNING name, id",
        [ data.name, data.uid, data.profile_pic, data.rank ]
      );
    },

    associateWithLobby: ( lobby_id, user_id ) => {
      return db.none(
        "INSERT INTO user_lobbies (lobby_id, user_id) VALUES($1, $2);",
        [ lobby_id, user_id ]
      ).then( _ => lobby_id );
    },

    alreadyInLobby: ( lobby_id, user_id ) => {
      return db.one(
        "SELECT lobby_id FROM user_lobbies WHERE lobby_id = $1 AND user_id = $2",
        [ lobby_id, user_id ],
        data => data.lobby_id
      )
    }
  }
}

module.exports = user;
