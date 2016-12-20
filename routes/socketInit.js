const models = require('../models/models');
const game_config = require('../config/game_config');
const gamestate = require('../models/gamestate');
const user_sockets = require('../models/user_sockets');

const socketInit = io => {
  const MAX_PLAYERS = process.env.MAX_PLAYERS || 4;
  const GAME_STATES = {};

  const config = game_config[ MAX_PLAYERS ];
  const user_sockets = new user_socktes();

  const getSubscriptionData = ( user_id, game_id ) => {
    let player_count, user;
    return models.game.getPlayerCount( game_id )
      .then( count => { player_count = count; })
      .then( _ => models.user.findByID( user_id ))
      .then( user_data => { user = user_data; })
      .then( _ => ({ player_count, user }));
  }

  const notify_individial_user_night_time = ( user, game_id ) => {
    user.phase = 'NIGHT';
    user.duration = config['night_duration'];
    user_socket = user_sockets.getUserSocket( user.id, game_id );

    io.sockets.connected[ user_socket ].emit( 'night phase starting', user );
  }

  const notify_vote_phase_starting = ( game_id ) => {
    setTimeout( () => {
      io.to( game_id ).emit( 'voting phase starting', { duration: config['voting_duration'] });
      setTimeout( () => {
        performVoteActions( game_id );
      }, ( config['voting_duration'] + 2 ) * 1000 );
    }, ( config['day_duration'] + 2 ) * 1000 );
  }

  const performNightActions = ( game_id ) => {
    let gamestate = GAME_STATES[ game_id ];

    models.game.collectNightActions( game_id )
      .then( gamestate.performNightActions.bind( gamestate ) )
      .then( user_roles => {
        user_roles.forEach( user_role => {
          notify_individial_user_daytime( user_role, game_id );
          models.game.updateUserGameRecord( user_role, game_id );
        });
      })
      .then( _ => { notify_vote_phase_starting( game_id ) });
  }

  const notify_individial_user_daytime = ( user, game_id ) => {
    user.phase = 'DAY';
    user.duration = config['day_duration'];
    user_socket = user_sockets.getUserSocket( user.id, game_id );

    io.sockets.connected[ user_socket ].emit( 'day phase starting', user );
  }

  const performVoteActions = ( game_id ) => {
    let gamestate = GAME_STATES[ game_id ];

    models.game.collectVoteActions( game_id )
      .then( gamestate.performVoteActions.bind( gamestate ) ) // returns voting results
      .then( results => { io.to( game_id ).emit( 'voting phase ended', results ) })
      .then( _ => models.game.setFinished( game_id ) );
  }

  io.on('connection', socket => {
    socket.on('subscribe to game', subscription => {
      const game_id = subscription.game_id;
      const user_id = subscription.user_id;

      user_sockets.setUserSocket( user_id, game_id, socket.id );
      socket.join( game_id );

      getSubscriptionData( user_id, game_id )
        .then( args => {
          io.to( game_id ).emit('player joined', { player_count: args.player_count, name: args.user.name, profile_pic: args.user.profile_pic, id: args.user.id });
          io.to( game_id ).emit('chat message', { message: `${args.user.name} has joined the game`, name: 'GAME' });

          /* LAUNCHES THE GAME */
          if( args.player_count == MAX_PLAYERS ) {
            models.game.getUsers( game_id )
              .then( users => {
                GAME_STATES[ game_id ] = new gamestate( config.roles, config.order, users );
                GAME_STATES[ game_id ].assignUserRoles().forEach( ( user_role ) => {
                  models.game.updateUserGameRecord( user_role, game_id )
                    .then( user => { notify_individial_user_night_time( user, game_id ) })
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

    socket.on('player vote', data => {
      console.log(data);
      models.game.updateVoteAction(data);
    });


  });
};

module.exports = socketInit;
