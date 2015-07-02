'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.displayHelp = function(key) {
  console.log(this.availableCommands[key].description);
};

Commands.prototype.createspace = function(name) {
  console.log('rmdir %s', name);
};

Commands.prototype.set = function(a, b, c) {
  console.log(a, b, c);
};