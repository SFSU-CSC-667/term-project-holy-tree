'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callBack) {
	db.addColumn('users', 'profile_pic', {type: 'string'}, callBack)
  db.addColumn('users', 'uid', {type: 'string'}, callBack)
  db.addColumn('users', 'rank', {type: 'int'}, callBack)
  db.addColumn('users', 'created_at', {type: 'date'}, callBack)
};

exports.down = function(db, callBack) {
	db.removeColumn('users', 'profile_pic', callBack)
};

exports._meta = {
  "version": 1
};
