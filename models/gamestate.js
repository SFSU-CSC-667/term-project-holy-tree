const artifacts = require('../config/artifacts');
const role_definitions = require('../config/roles');
const underscore = require('underscore');

class Gamestate {

  constructor ( roles, order, users ) {
    this.roles = underscore.shuffle(roles);
    this.order = order;
    this.users = users;
    this.user_roles = [];
    this.votes = {};
  }

  assignUserRoles ( ) {
    this.users.forEach ( ( user ) => {
      let role = this.roles.pop();
      this.user_roles.push(
          {
            id: user.id,
            name: user.name,
            role: role,
            displayRole: role,
            description: role_definitions[role].description,
            supplementary: '',
            win: role_definitions[role].win,
            action: role_definitions[role].action,
            artifact: null,
            muted: false
          });
    } );

    return this.user_roles;
  }

  updateUserAttributes( id, attributes ) {
    let index = this.user_roles.findIndex( ( user ) => user.id == id );
    this.user_roles[index] = underscore.extend( this.user_roles[index], attributes );
  }

  getUserById ( id ) {
    return this.user_roles.filter( (user) => user.id == id )[0];
  }

  assignArtifactToUser ( user, artifact ) {
    switch ( artifact ) {

      case 'claw' :
        this.updateUserAttributes( user.id, {
          role: 'werewolf',
          displayRole: 'werewolf',
          description: `The Curator gave you an artifact that has turned you into a Werewolf. Stay hidden.`,
          win: role_definitions['werewolf'].win,
          artifact: artifact
        });
        break;

      case 'cudgel':
        this.updateUserAttributes( user.id, {
          role: 'tanner',
          description: `The Curator gave you an artifact that has turned you into a Tanner.`,
          win: role_definitions['tanner'].win,
          artifact: artifact
        });
        break;

      case 'brand':
        this.updateUserAttributes( user.id, {
          role: 'villager',
          description: `The Curator gave you an artifact that has turned you into a Villager.`,
          win: role_definitions['villager'].win,
          artifact: artifact
        });
        break;

      case 'void':
        this.updateUserAttributes( user.id, {
          description: `The Curator gave you an artifact that fizzled a bit and seemed to have no effect.`,
          artifact: artifact
        });
        break;
    }
  }

  // [{id, role, target}, {id, role, target}, ]
  performNightActions( actions ) {
    this.order.forEach( ( role ) => {
      this.processNightAction( role, actions.filter( ( action ) => action.role == role )[0] );
    });
    return this.user_roles;
  }

  // role, { id: 1, role: role, target: [2,3] }
  processNightAction( role, action ) {
    console.log(`${role} called with action ` + JSON.stringify(action));
    switch ( role ) {
      case 'werewolf':
        let wolves = this.user_roles.filter( user => user.role == 'werewolf' );
        if ( wolves.length == 1 ) {
          this.updateUserAttributes( wolves[0].id, { supplementary: `You are the only werewolf. You manage to look at a random unassigned card and see a ${this.roles[0]}.` } );
          break;
        }
        if ( wolves.length == 2 ) {
          this.updateUserAttributes( wolves[0].id, { supplementary: `The other werewolf is ${wolves[1].name}.` } );
          this.updateUserAttributes( wolves[1].id, { supplementary: `The other werewolf is ${wolves[0].name}.` } );
        }
        break;

      case 'seer':
        if ( action && action.target ) {
          let target_user = this.getUserById(action.target);
          this.updateUserAttributes( action.id, { supplementary: `You saw that ${ target_user.name } was a ${ target_user.role }` } );
        }
        break;

      case 'robber':
        if( action && action.target ) {
          let target_user = this.getUserById(action.target);
          this.updateUserAttributes( action.id, {
            role: target_user.role,
            displayRole: target_user.role,
            description: role_definitions[target_user.role].description,
            supplementary: `You stole ${target_user.name}'s role and are now a ${target_user.role}` ,
            win: role_definitions[target_user.role].win
          });

          this.updateUserAttributes( target_user.id, { role: 'robber' } );
        }
        break;

      case 'insomniac':
        if ( action ) {
          let insomniac = this.getUserById( action.id );
          this.updateUserAttributes( action.id, { supplementary: `Before you went to sleep you saw that you were the ${insomniac.role}` } );
        }
        break;

      case 'curator':
        if ( action && action.target ) {
          let target_user = this.getUserById(action.target);
          let artifact = underscore.shuffle(Object.keys(artifacts))[0];
          this.assignArtifactToUser (target_user, artifact);
          this.updateUserAttributes( action.id, { supplementary: `You gave a random artifact from your collection to ${target_user.name}.` } );
        }
        break;
    }

  }

  // Array [{userid, role, vote}, {userid, role, vote}, ]
  performVoteActions ( votes ) {

    // Yes this is n^2, but c'mon - we only have a few players
    votes.forEach( (vote, index, array) => {
      let votes_for_user = array.filter( i => i.vote == vote.id ).length;
      underscore.extend(array[index], {'votes_against': votes_for_user });
    });

    votes = votes.sort( (a,b) => a.votes_against < b.votes_against );

    let dead_players = votes.filter( vote => vote.votes_against == votes[0].votes_against );

    /* SPECIAL HUNTER ACTION */
    let hunter_in_dead = dead_players.filter ( dead => dead.role == 'hunter' );
    // Hunter is dead and target is not dead
    if ( hunter_in_dead.length > 0 && dead_players.indexOf( dead => dead.id == hunter_in_dead[0].vote ) == -1 ) {
      // Make dead
      dead_players.push( votes.filter( vote => vote.id == hunter_in_dead[0].vote )[0] );
    }

    // Mark dead players as dead
    votes.forEach( (vote, index, array) => { 
        array[index]['status'] = ( dead_players.filter( dead => dead.id == vote.id ).length == 0  ) ? 'Alive' : 'Dead' 
      });

    // for each player, add win / lose based on role and the items in dead
    votes.forEach ( (vote, index, array) => {
      switch ( vote.role ) {
        case 'villager':
        case 'seer':
        case 'robber':
        case 'curator':
        case 'insomniac':
        case 'hunter':
          array[index]['outcome'] = (dead_players.filter( dead => dead.role == 'werewolf' ).length > 0) ? 'WIN' : 'LOSE';
          break;

        case 'tanner':
          array[index]['outcome'] = (dead_players.filter( dead => dead.id == vote.id ).length > 0) ? 'WIN' : 'LOSE';
          break;

        case 'werewolf':
          array[index]['outcome'] = (dead_players.filter( dead => dead.role == 'werewolf' ).length == 0) ? 'WIN' : 'LOSE';
          break;
      }
    });

    return {'players': votes};
  }

}

module.exports = Gamestate;
