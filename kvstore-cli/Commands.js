'use strict';

var availableCommands = require('./availableCommands');

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.createspace = function(name, otherDirs) {
  if(name === 'help') { console.log(this.availableCommands.createspace); return; }
  if(name) console.log('rmdir %s', name);
  if (otherDirs) {
    otherDirs.forEach(function (oDir) {
      console.log('rmdir %s', oDir);
    });
  }
}