const db = require('../db');
const game = require('./game.js')(db);
const user = require('./user.js')(db);

module.exports = { game, user }
