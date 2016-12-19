const game_config =
{
    1: {
        roles: ['insomniac'],
        order: ['insomniac'],
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
        roles: ['werewolf', 'werewolf', 'seer', 'villager', 'villager', 'villager'],
        order: ['seer'],
        night_duration: 15,
        voting_duration: 15,
        day_duration: 180
    }
}

module.exports = game_config;
