const game_config =
{
    1: {
        roles: ['curator'],
        order: ['curator'],
        night_duration: 5,
        voting_duration: 5,
        day_duration: 5
    },
    2: {
        roles: ['werewolf', 'seer', 'villager'],
        order: ['werewolf', 'seer'],
        night_duration: 15,
        voting_duration: 15,
        day_duration: 15
    },
    3: {
        roles: ['werewolf', 'werewolf', 'seer', 'villager', 'villager'],
        order: ['werewolf', 'seer'],
        night_duration: 15,
        voting_duration: 15,
        day_duration: 140
    },
    4: {
        roles: ['werewolf', 'werewolf', 'seer', 'curator', 'robber'],
        order: ['werewolf', 'seer', 'robber', 'curator'],
        night_duration: process.env.NIGHT_DURATION || 60,
        voting_duration: process.env.VOTING_DURATION || 60,
        day_duration: process.env.DAY_DURATION || 60 
    }
}

module.exports = game_config;
