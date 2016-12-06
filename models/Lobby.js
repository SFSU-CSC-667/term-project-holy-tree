const lobby = db => {
  const MAX_PLAYERS = 3;
  return {
    findAvailable: () => {
      return db.one(
        "SELECT id FROM lobbies WHERE visible = $1 and player_count < $2 ORDER BY id ASC LIMIT 1;",
        [true, MAX_PLAYERS],
        data => data.id
      )
    },

    create: () => {
      return db.one(
        "INSERT INTO lobbies (visible, player_count) VALUES ($1, $2) RETURNING id;",
        [true, 0],
        data => data.id
      )
    },

    incrementPlayerCount: lobby_id => {
      return db.one(
        "UPDATE lobbies SET player_count = player_count + 1 WHERE id = $1 RETURNING player_count;",
        [lobby_id],
        data => data.player_count
      )
    },

    hasMember: data => {
      return db.one(
        "SELECT * FROM user_lobbies WHERE user_id = $1 and lobby_id = $2",
        [ data.user_id, data.lobby_id ]
      );
    }
  }
}

module.exports = lobby;
