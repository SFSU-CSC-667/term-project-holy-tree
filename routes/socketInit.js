const models = require('../models/models');
const game_config = require('../game_config');
const roles = require('../roles');


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

  const notify_individial_user = ( user ) => {
    io.sockets.connected[ user_sockets[user.id] ]
      .emit('game starting',
        {
          role: { 
            title: user.role, 
            description: 'Some role description.', 
            supplementary: null, 
            item: null, 
            muted: false 
          }, 
          phase: 'NIGHT', 
          duration: game_config[MAX_PLAYERS]['night_duration'] 
        }
      );
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
            models.game.setup( game_id, game_config[MAX_PLAYERS]['roles'] )
              .then( users => { users.forEach( user => notify_individial_user( user ))})


            // models.game.getUsers( game_id )
            //   .then( users => { users.forEach( user => notify_individial_user( user.id ))})
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
