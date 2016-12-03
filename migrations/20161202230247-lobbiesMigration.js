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
  db.createTable('lobbies', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    visible: {type: 'boolean'},
    player_count: {type: 'int'},
    create_at: {type: 'date'},
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('lobbies', callback);
};

exports._meta = {
  "version": 1
};