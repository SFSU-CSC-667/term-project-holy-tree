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
    }
  }
}

module.exports = user;
