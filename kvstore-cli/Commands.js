'use strict';

module.exports = Commands;

function Commands(kvStore, availableCommands) {
  this.kvStoreInstance = kvStore;
  this.availableCommands = availableCommands;
}

Commands.prototype.displayHelp = function(key) {
  console.log(this.availableCommands[key].description);
};

Commands.prototype.createspace = function(name, otherDirs) {
  if (name === 'help') {
    this.displayHelp('createspace');
  }
  else {
    if(name) console.log('rmdir %s', name);
    if (otherDirs) {
      otherDirs.split().forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  }
};