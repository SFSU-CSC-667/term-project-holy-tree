const roles =
{
    'villager':
    {
        'title': 'Villager',
        'night': 'You are a regular villager with no special powers. Sleep tight.',
        'day': 'You are a regular villager. Find a werewolf.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action':''
    },
    'seer':
    {
        'title': 'Seer',
        'night': 'You are the Seer. Select another player to see their role.',
        'day': 'You saw that #username# is a #role#',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    },
    'werewolf':
    {
        'title': 'Werewolf',
        'night': 'You are a Werewolf. Stay hidden and cause confusion.',
        'day': 'You saw that #username# is the other werewolf.',
        'day_alt': 'You are the only werewolf. Last night you peeked in an empty house and saw the #role# was out of town.',
        'win': 'You win if the villagers fail to kill any werewolves.',
        'action': ''
    },
    'robber':
    {
        'title': 'Robber',
        'night': 'You are the Robber. Choose another player and swap roles with them.',
        'day': 'You stole #username#\'s role last night. You are now a #role#',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    },
    'insomniac':
    {
        'title': 'Insomniac',
        'night': 'You are the Insomniac. You will see your role after everyone has gone to sleep.',
        'day': 'Before finally drifting off to sleep, you saw that you were the #role#.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': ''
    },
    'hunter':
    {
        'title': 'Hunter',
        'night': 'You are the Hunter. If you are killed during voting, the player you voted for also dies.',
        'day': 'You are the Hunter. If you are killed during voting, the player you voted for also dies.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': ''
    },
    'tanner':
    {
        'title': 'Tanner',
        'night': 'You are the Tanner. You are really sad and hope the villagers vote to kill you.',
        'day': 'You are the Tanner. You are really sad and hope the villagers vote to kill you.',
        'win': 'You win if the villagers vote to kill you.',
        'action': ''
    },
    'curator':
    {
        'title': 'Curator',
        'night': 'You are the Curator. Select a player to give them a random item from your collection.',
        'day': 'You gave #username# an item from your collection.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    }
}

module.exports = roles;
