const role_data = require('../config/roles');
const artifacts = require('../config/artifacts');
const role_definitions = require('../config/roles');
const underscore = require('underscore');

class Gamestate {

  constructor ( roles, order, users ) {
    this.roles = underscore.shuffle(roles);             // ['wolf', 'seer']
    this.order = order;                                 // ['seer']
    this.users = users;                                 // [{id: 1, name: 'brook'}


    this.user_roles = [];                                // { id, name, role, description, supplementary, win, actions, artifact, muted }
    this.actions = {};                                  // [{id: 1, target: [2,3]}, ]
    this.votes = {};                                    // [{id: 1, vote: 4}, ]

  }

  assignUserRoles ( ) {
    this.users.forEach ( ( user ) => {
      let role = this.roles.pop();
      this.user_roles.push(
          {
            id: user.id,
            name: user.name,
            role: role,
            description: role_definitions[role].description,
            supplementary: "",
            win: role_definitions[role].win,
            actions: role_definitions[role],
            artifact: null,
            muted: false
          });
    } );

    return this.user_roles;
  }

  updateUserRole ( id, role ) {
    let index = this.user_roles.find( ( user ) => user.id == id );
    this.user_roles[index].role = role;
  }

  updateUserAttributes( id, attributes ) {
    let index = this.user_roles.find( ( user ) => user.id == id );
    this.user_roles[index] = underscore.extend( this.user_roles[index], attributes );
  }

  getUserById ( id ) {
    return this.user_roles.filter( (user) => user.id == id )[0];
  }

  setSupplementaryText ( id, text ) {
    let index = this.user_roles.find( ( user ) => user.id == id );
    this.user_roles[index].supplementary = text;
  }

  assignArtifactToUser ( user, artifact ) {
    switch ( artifact ) {

      case 'claw' :
        this.updateUserAttributes( user.id, {
          role: 'werewolf',
          description: `The Curator's artifact has turned you into a Werewolf.`,
          win: role_definitions['werewolf'].win,
          artifact: artifact
        });
        break;

      case 'cudgel':
        this.updateUserAttributes( user.id, {
          role: 'tanner',
          description: `The Curator's artifact has turned you into a Tanner.`,
          win: role_definitions['tanner'].win,
          artifact: artifact
        });
        break;

      case 'brand':
        this.updateUserAttributes( user.id, {
          role: 'tanner',
          description: `The Curator's artifact has turned you into a Tanner.`,
          win: role_definitions['tanner'].win,
          artifact: artifact
        });
        break;

      case 'mask':
        this.updateUserAttributes( user.id, {
          description: `The Curator's artifact has muted you.`,
          artifact: artifact,
          muted: true
        });
        break;

      case 'void':
        this.updateUserAttributes( user.id, {
          description: `The Curator's artifact does nothing.`,
          artifact: artifact
        });
        break;
    }
  }

  // [{id, role, target} ]
  performNightActions ( actions ) {
    this.order.forEach( ( role ) => {
      this.processNightAction( role, this.actions.filter( ( action ) => action.role == role ) );  // There's no guarantee the user submitted an action
    });
  }

  processNightAction( role, action ) {
    let players = this.user_roles.filter( ( user ) => user.role == role );
    if ( players ) { return; }

    switch ( role ) {

      case 'werewolf':
        if ( players.length == 1 ) {
          this.setSupplementaryText( players[0].id, `You are the only werewolf. You manage to look at a random unassigned card and see a ${this.role[0]}.` );
        } else {
          this.setSupplementaryText( players[0].id, `The other werewolf is ${players[1].name}.`);
          this.setSupplementaryText( players[1].id, `The other werewolf is ${players[0].name}.`);
        }
        break;

      case 'seer':
        let seer = players[0];
        if ( action ) {
          let target_user = this.getUserById(action.target[0]);
          this.setSupplementaryText( seer.id, `You saw that ${ target_user.name } was a ${ target_user.role }` );
        }
        break;

      case 'robber':
        let robber = players[0];
        if( action ) {
          let target_user = this.getUserById(action.target[0]);
          this.updateUserRole( robber.id, target_user.role );
          this.updateUserRole( target_user.id, 'robber' );
          this.setSupplementaryText( robber.id, `You stole ${ target_user.name }'s identity and are now a ${ target_user.role }.`);
        }
        // Assign target role to player
        // Assign robber role to target
        // Update player text with current role
        break;

      case 'troublemaker':
        let troublemaker = players[0];
        if( action ) {
          let target_user_1 = this.getUserById(action.target[0]);
          let target_user_2 = this.getUserById(action.target[1]);

          this.updateUserRole( target_user_1.id, target_user_2.role );
          this.updateUserRole( target_user_2.id, target_user_1.role );
          this.setSupplementaryText( troublemaker.id, `You swapped ${ target_user_1.name }'s and ${ target_user_2.name }'s roles.`);
        }
        break;

      case 'insomniac':
        let insomniac = players[0];
        if ( action ) {
          this.setSupplementaryText( insomniac.id, `Before you went to sleep you saw that you were the ${insomniac.role}`);
        }
        break;

      case 'curator':
        let curator = players[0];
        if ( action ) {
          let target_user = this.getUserById(action.target[0]);
          let artifact = underscore.shuffle(Object.keys(artifacts))[0];
          this.assignArtifactToUser (target_user, artifact);
          this.setSupplementaryText(curator.id, `You gave a random artifact from your collection to ${target_user.name}.`);
        }
        break;

      default: break;

    }

  }

}

module.exports = Gamestate;
