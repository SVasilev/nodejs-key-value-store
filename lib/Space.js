'use strict';

module.exports = Space;

function Space() {
  this.pairs = {};
}

Space.prototype.set = function(key, value) {
  if (this.pairs[key]) {
    console.log('WARNING: Key with name \'' + key + '\' was overriden.');
  }
  this.pairs[key] = value;
};

Space.prototype.get = function(key) {
  if (this.pairs[key]) {
    return this.pairs[key];
  }
  console.log('INFO: Key with name \'' + key + '\' does not exist.');
};