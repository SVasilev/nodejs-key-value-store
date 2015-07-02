'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.createspace = function(name) {
  undefined.noSuchProperty;
};

Commands.prototype.set = function(a, b, c) {
  console.log(a, b, c);
};