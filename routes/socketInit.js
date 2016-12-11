const models = require('../models/models')

const socketInit = io => {

  const MAX_PLAYERS = 3;
  const user_sockets = {};

  const subscribeUser = ( user_id, game_id ) => {
    let player_count, user;
    return models.game.incrementPlayerCount( game_id )
      .then( count => { player_count = count; })
      .then( _ => models.user.findByID( user_id ))
      .then( user_data => { user = user_data; })
      .then( _ => ({ player_count, user }));
  }

  const notify_individial_user = ( user_id ) => {
    io.sockets.connected[ user_sockets[user_id] ]
      .emit('game starting', { time: 20, phase: 'Night', role: 'Villager', user_id: user_id });
      // get the role information from an object
  }

  io.on('connection', socket => {
    socket.on('subscribe to game', subscription => {
      const game_id = subscription.game_id;
      const user_id = subscription.user_id;

      if ( !user_sockets.hasOwnProperty( user_id ) ) {
        user_sockets[user_id] = socket.id;
      }

      socket.join( game_id );

      subscribeUser( user_id, game_id )
        .then( args => {
          io.to( game_id ).emit('player joined', { player_count: args.player_count, name: args.user.name, profile_pic: args.user.profile_pic, user_id: args.user.id });
          io.to( game_id ).emit('chat message', { message: `${args.user.name} has joined the game`, name: 'GAME' });
          if( args.player_count == MAX_PLAYERS ) {
            models.game.getUsers( game_id )
              .then( users => { users.forEach( user => notify_individial_user( user.id ))})
          }
        })
        .catch( error => { console.log(error) });
    });

    socket.on('chat message', data => {
      console.log(data);
      io.to(data.game_id).emit('chat message', {
        message: data.message,
        name: data.name
      });
    });
  });
};

module.exports = socketInit;
