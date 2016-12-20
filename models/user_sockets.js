class UserSocktes {
  constructor () {
    this.sockets = {};
  }

  getUserSocket ( user_id, game_id ) {
    return this.sockets[`${game_id}_${user_id}`];
  }

  setUserSocket ( user_id, game_id, socket_id ) {
    if ( !this.sockets[`${game_id}_${user_id}`] ) {
      this.sockets[`${game_id}_${user_id}`] = socket_id;
    }
  }
}

module.exports = UserSocktes;
