'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.createspace = function(name) {
  this.kvStoreInstance.createSpace(name);
};

Commands.prototype.set = function(a, b, c) {
  console.log(a, b, c);
};