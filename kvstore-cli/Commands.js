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
};

Commands.prototype.workingspace = function() {
  console.log(this.kvStoreInstance.getWorkingSpace());
};

Commands.prototype.showkeys = function(spacename) {
  var keys = this.kvStoreInstance.showKeys(spacename);
  var prettifiedOutput = keys.toString().split(',').join('\n');
  console.log(prettifiedOutput);
};

Commands.prototype.showvalues = function(spacename) {
  var values = this.kvStoreInstance.showValues(spacename);
  var prettifiedOutput = values.toString().split(',').join('\n');
  console.log(prettifiedOutput);
};

Commands.prototype.set = function(key, value, spacename) {
  this.kvStoreInstance.set(key, value, spacename);
};

Commands.prototype.get = function(key, spacename) {
  var value = this.kvStoreInstance.get(key, spacename);
  if (value) {
    console.log(value);
  }
};

Commands.prototype.deletespace = function(spacename) {
  this.kvStoreInstance.deleteSpace(spacename);
};

Commands.prototype.export = function(filePath) {
  this.kvStoreInstance.export(filePath);
};

Commands.prototype.import = function(filePath) {
  this.kvStoreInstance.import(filePath);
};

Commands.prototype.dropdatabase = function() {
  this.kvStoreInstance.dropDatabase();
};

Commands.prototype.log = function() {};