'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.createspace = function(name) {
  this.kvStoreInstance.createSpace(name);
};

Commands.prototype.set = function(key, value, space) {
  this.kvStoreInstance.set(key, value, space);
};

Commands.prototype.get = function(key, space) {
  this.kvStoreInstance.get(key, space);
};