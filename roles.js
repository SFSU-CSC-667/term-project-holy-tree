const roles =
{
    'villager':
    {
        'title': 'Villager',
        'description': 'You are a regular villager with no special powers.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action':''
    },
    'seer':
    {
        'title': 'Seer',
        'description': 'You are the Seer. Select another player to see their role.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    },
    'werewolf':
    {
        'title': 'Werewolf',
        'description': 'You are a Werewolf. Stay hidden.',
        'win': 'You win if the villagers fail to kill any werewolves.',
        'action': ''
    },
    'robber':
    {
        'title': 'Robber',
        'description': 'You are the Robber. Choose another player and swap roles with them.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    },
    'insomniac':
    {
        'title': 'Insomniac',
        'description': 'You are the Insomniac. You will see your role after everyone else has gone to sleep.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': ''
    },
    'hunter':
    {
        'title': 'Hunter',
        'description': 'You are the Hunter. If you are killed during voting, the player you voted for also dies.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': ''
    },
    'tanner':
    {
        'title': 'Tanner',
        'description': 'You are the Tanner. You are really sad and hope the villagers vote to kill you.',
        'win': 'You win if the villagers vote to kill you.',
        'action': ''
    },
    'curator':
    {
        'title': 'Curator',
        'description': 'You are the Curator. Select a player to give them a random item from your collection.',
        'win': 'You win if the villagers successfully kill a werewolf.',
        'action': 'select-one'
    }
}

module.exports = roles;
