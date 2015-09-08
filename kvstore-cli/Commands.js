'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.createspace = function(name) {
  this.kvStoreInstance.createSpace(name);
};

Commands.prototype.showspaces = function() {
  var spaces = Object.keys(this.kvStoreInstance.getSpaces());
  var prettifiedOutput = spaces.toString().split(',').join('\n');
  console.log(prettifiedOutput);
};

Commands.prototype.use = function(spacename) {
  this.kvStoreInstance.use(spacename);
}

Commands.prototype.set = function(key, value, space) {
  this.kvStoreInstance.set(key, value, space);
};

Commands.prototype.get = function(key, space) {
  console.log(this.kvStoreInstance.get(key, space));
};