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
        night_duration: 20,
        voting_duration: 20,
        day_duration: 60
    }
}

module.exports = game_config;
