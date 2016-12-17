const models = require('../models/models');
const game_config = require('../config/game_config');
const gamestate = require('../models/gamestate');

const socketInit = io => {

  const MAX_PLAYERS = 2;
  const USER_SOCKETS = {};
  const GAME_STATES = {};

  const getSubscriptionData = ( user_id, game_id ) => {
    let player_count, user;
    return models.game.getPlayerCount( game_id )
      .then( count => { player_count = count; })
      .then( _ => models.user.findByID( user_id ))
      .then( user_data => { user = user_data; })
      .then( _ => ({ player_count, user }));
  }

  const notify_individial_user_night_time = ( user ) => {
    user.phase = 'NIGHT';
    user.duration = game_config[MAX_PLAYERS]['night_duration'];
    user_socket = USER_SOCKETS[user.id];

    io.sockets.connected[ user_socket ].emit( 'night phase starting', user );
  }

  const notify_individial_user_daytime = ( user ) => {
    user.phase = 'DAY';
    user.duration = game_config[MAX_PLAYERS]['day_duration'];
    user_socket = USER_SOCKETS[user.id];

    io.sockets.connected[ user_socket ].emit( 'day phase starting', user );
  }

  const performNightActions = ( game_id ) => {
    let gamestate = GAME_STATES[ game_id ];

    models.game.collectNightActions( game_id )
      .then( gamestate.performNightActions.bind( gamestate ) )
      .then( user_roles => { user_roles.forEach( notify_individial_user_daytime ) });
      .then( _ => {
        setTimeout(
          () => {
            io.to( game_id ).emit( 'voting phase starting', { duration: game_config[MAX_PLAYERS]['voting_duration'] })
          },
          ( game_config[MAX_PLAYERS]['day_duration'] + 2 ) * 1000
        )
      });
  }

  io.on('connection', socket => {
    socket.on('subscribe to game', subscription => {
      const game_id = subscription.game_id;
      const user_id = subscription.user_id;

      if ( !USER_SOCKETS[ user_id ] ) {
        USER_SOCKETS[user_id] = socket.id;
      }

      socket.join( game_id );

      getSubscriptionData( user_id, game_id )
        .then( args => {
          io.to( game_id ).emit('player joined', { player_count: args.player_count, name: args.user.name, profile_pic: args.user.profile_pic, id: args.user.id });
          io.to( game_id ).emit('chat message', { message: `${args.user.name} has joined the game`, name: 'GAME' });

          /* LAUNCHES THE GAME */
          if( args.player_count == MAX_PLAYERS ) {
            let config = game_config[ MAX_PLAYERS ];
            models.game.getUsers( game_id )
              .then( users => {
                GAME_STATES[ game_id ] = new gamestate( config.roles, config.order, users );
                GAME_STATES[ game_id ].assignUserRoles().forEach( ( user_role ) => {
                  models.game.updateUserGameRecord( user_role, game_id )
                    .then( notify_individial_user_night_time )
                    .catch( error => console.log(error) )
                })
              }).then( _ => {
                setTimeout(
                  () => { performNightActions( game_id ) },
                  ( config['night_duration'] + 2 ) * 1000
                )
              });
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

    socket.on('night action', data => {
      console.log(data);
      models.game.updateNightAction( data );
    });


  });
};

module.exports = socketInit;
