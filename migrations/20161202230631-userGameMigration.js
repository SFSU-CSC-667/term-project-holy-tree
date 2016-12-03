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

exports.up = function(db, callback) {
  db.createTable('user_game', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: 'int',
    game_id: 'int',
    role: 'string',
    item: 'string',
    vote: 'int'
  }, callback);
};

exports.down = function(db,callback) {
  db.dropTable('user_game', callback);
};

exports._meta = {
  "version": 1
};