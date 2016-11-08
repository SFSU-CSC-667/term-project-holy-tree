const connection = { database: 'werewolf' }

const pgp = require('pg-promise')()

const db = pgp(connection)

module.exports = { db }
