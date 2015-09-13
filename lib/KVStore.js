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
  var filePath = path.join(__dirname, '\data.csh');

  if (fs.existsSync(filePath)) {
    this._import(filePath);
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

KVStore.prototype.get = function(key, spacename) {
  var validSpace = this._validateSpace(spacename);
  if (validSpace) {
    return this.spaces[validSpace].get(key);
  }
};

KVStore.prototype.deleteSpace = function(spacename) {
  assert(spacename, 'deleteSpace method expects a spacename.');
  
  if (_.contains(Object.keys(this.spaces), spacename)) {
    delete this.spaces[spacename];
    if (spacename === this.workingSpace) {
      this.workingSpace = 'default';
    }
  }
  else {
    console.log('Provided spacename \'' + spacename + '\' does not exist.');
  }
};

KVStore.prototype.export = function(filePath) {
  assert(filePath, 'export method expects a filePath');
  
  fs.writeFileSync(filePath, JSON.stringify(this));
};

KVStore.prototype._import = function(filePath) {
  var readData = fs.readFileSync(filePath, 'utf8');
  _.extend(this, JSON.parse(readData));
  for (var key in this.spaces) {
    var pairs = this.spaces[key].pairs;
    this.spaces[key] = new Space();
    this.spaces[key].pairs = pairs;
  }
  fs.unlinkSync(filePath);
};

KVStore.prototype.import = function(filePath) {
  assert(filePath, 'import method expects a filePath');
  
  if (fs.existsSync(filePath)) {
    this._import(filePath);
  }
};

KVStore.prototype.dropDatabase = function() {
  var spaces = this.spaces;
  Object.keys(spaces).forEach(function(key) {
    if(key !== 'default') {
      delete spaces[key];
    }
  });
};