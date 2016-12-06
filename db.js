'use strict';

const promise = require('bluebird');
const options = { promiseLib: promise };
const connection = process.env.DATABASE_URL
const pgp = require('pg-promise')(options);
const db = pgp(connection);

module.exports = db
