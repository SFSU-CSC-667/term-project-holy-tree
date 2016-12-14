const models = require('../models/models');
const game_config = require('../game_config');
const roles = require('../roles');


const socketInit = io => {

  const MAX_PLAYERS = 3;
  const user_sockets = {};

  const getSubscriptionData = ( user_id, game_id ) => {
    let player_count, user;
    return models.game.getPlayerCount( game_id )
      .then( count => { player_count = count; })
      .then( _ => models.user.findByID( user_id ))
      .then( user_data => { user = user_data; })
      .then( _ => ({ player_count, user }));
  }

  const notify_individial_user = ( user ) => {
    let user_socket = user_sockets[ user.user_id ];
    let user_role = roles[ user.role ];
    io.sockets.connected[ user_socket ]
      .emit('game starting',
        {
          role: {
            title: user_role.title,
            description: user_role.night,
            win: user_role.win,
            actions: user_role.actions,
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

      getSubscriptionData( user_id, game_id )
        .then( args => {
          io.to( game_id ).emit('player joined', { player_count: args.player_count, name: args.user.name, profile_pic: args.user.profile_pic, user_id: args.user.id });
          io.to( game_id ).emit('chat message', { message: `${args.user.name} has joined the game`, name: 'GAME' });

          if( args.player_count == MAX_PLAYERS ) {
            models.game.setup( game_id, game_config[MAX_PLAYERS]['roles'] )
              .then( users => { users.forEach( user => { user.then( notify_individial_user )})})
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
