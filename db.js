const connection = process.env.DATABASE_URL

const pgp = require('pg-promise')()

const db = pgp(connection)

module.exports = { db }
