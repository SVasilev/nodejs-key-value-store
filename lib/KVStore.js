'use strict';

/* global __dirname */

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Space = require('./Space');

module.exports = KVStore;

function KVStore(name) {
	assert(name, 'Missing first argument of the constructor');
	assert(typeof name === 'string', 'First argument must be string');

  // If the system crashed or was interupted last time.
  var fileLocation = path.join(__dirname, '\data.csh');
  var readData = '';

  if (fs.existsSync(fileLocation)) {
    readData = fs.readFileSync(fileLocation, 'utf8');
    _.extend(this, JSON.parse(readData));
    fs.unlinkSync(fileLocation);
  }
  else {
  	this.name = name;
  	this.spaces = {};
    this.spaces['default'] = new Space();
    this.workingSpace = 'default';
  }
}

KVStore.prototype.createSpace = function(name) {
	assert(name, 'Missing first argument');
	assert(typeof name === 'string', 'Name property should be a string.');

  if (this.spaces[name]) {
    console.log('Space with name \'' + name + '\' already exists.');
  }
	else {
    this.spaces[name] = new Space();
  }
};

KVStore.prototype.getSpaces = function() {
  return this.spaces;
};

KVStore.prototype.use = function(spacename) {
  assert(spacename, 'use method expects a spacename.');
  
  if (_.contains(Object.keys(this.spaces), spacename)) {
    this.workingSpace = spacename;
  }
  else {
    console.log('Provided spacename \'' + spacename + '\' does not exist.');
  }
};

KVStore.prototype.getWorkingSpace = function() {
  return this.workingSpace;
};

KVStore.prototype.showKeys = function(spacename) {
  var validSpace = this._validateSpace(spacename);
  if (validSpace) {
    return Object.keys(this.spaces[validSpace].pairs);
  }
};

KVStore.prototype.showValues = function(spacename) {
  var validSpace = this._validateSpace(spacename);
  if (validSpace) {
    var values = [];
    var space = this.spaces[validSpace].pairs;
    Object.keys(space).forEach(function(key) {
      values.push(space[key]);
    });
    return values;
  }
};

KVStore.prototype._validateSpace = function(spacename) {
  if (!spacename) {
    spacename = this.workingSpace;
  }
  else {
    if (!this.spaces[spacename]) {
      console.log('Space \'' + spacename + '\' does not exist in the key-value store.');
      return;
    }
  }
  return spacename;
};

KVStore.prototype.set = function(key, value, spacename) {
  var validSpace = this._validateSpace(spacename);
  if (validSpace) {
    this.spaces[validSpace].set(key, value);
  }
};

KVStore.prototype.get = function(key, spacename) { // THIS THROWS AN ERROR WHILE TESTED FROM THE CLI?!?
  var validSpace = this._validateSpace(spacename);
  if (validSpace) {
    return this.spaces[validSpace].get(key);
  }
};

KVStore.prototype.deleteSpace = function(spacename) {
  assert(spacename, 'deleteSpace method expects a spacename.');
  
  if (_.contains(Object.keys(this.spaces), spacename)) {
    delete this.spaces[spacename];
  }
  else {
    console.log('Provided spacename \'' + spacename + '\' does not exist.');
  }
};

KVStore.prototype.exportDatabase = function exportDatabase(filePath) {
  fs.writeFileSync(filePath, JSON.stringify(this));
};

KVStore.prototype.importDatabase;

KVStore.prototype.dropDatabase = function() {
  var spaces = this.spaces;
  Object.keys(spaces).forEach(function(key) {
    delete spaces[key];
  });
};

KVStore.prototype.log;