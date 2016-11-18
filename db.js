'use strict';

var promise = require('bluebird');
var options = {
  promiseLib: promise
};
const connection = process.env.DATABASE_URL
const pgp = require('pg-promise')(options);
const db = pgp(connection);

// db.any("SELECT name from users where id=16", [true])
// 	.then(function (data){
//   	console.log("DATA: ", data )
// 	})
// 	.catch(function (error){
//     console.error('error running database\n', error);
//  	});

// this will insert 'john doe' and 8 into the db
// db.none("INSERT INTO users(name,rank) VALUES($1, $2)", ['john doe', 8])
//   .then(function () {
//   console.log('database INSERT successful!!');
//   })
//   .catch(function (error) {
//     console.log('nothing is stored into database!!\n\n', error);
//
//   });


module.exports = db
