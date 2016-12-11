const models = require('../models/models')

const subscribeUser = ( user_id, game_id ) => {
  let player_count, user;

  return models.game.incrementPlayerCount( game_id )
    .then( count => { player_count = count; })
    .then( _ => models.user.findByID( user_id ))
    .then( user_data => { user = user_data; })
    .then( _ => ({ player_count, user }));
}

const socketInit = io => {
  io.on('connection', socket => {

    // Socket.io Intializations and Config
    socket.on('subscribe to game', subscription => {
      socket.join( subscription.game_id );

      subscribeUser( subscription.user_id, subscription.game_id )
        .then( args => {
            console.log(args);
            io.to(subscription.game_id).emit('player joined', { player_count: args.player_count, name: args.user.name, profile_pic: args.user.profile_pic, user_id: args.user.id });
            io.to(subscription.game_id).emit('chat message', { message: `${args.user.name} has joined the game`, name: 'GAME' });
        })
        .catch( error => { console.log(error) });
    })

    socket.on('chat message', data => {
      io.to(data.game).emit('chat message', {
        message: data.message,
        name: data.name
      });
    });
  });
};

module.exports = socketInit;
