const db = require('../db');
const game_class = require('./game.js');
const game = new game_class(db);
const user = require('./user.js')(db);

module.exports = { game, user }
