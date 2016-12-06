const db = require('../db');
const lobby = require('./lobby.js')(db);
const user = require('./user.js')(db);

module.exports = { lobby, user }
