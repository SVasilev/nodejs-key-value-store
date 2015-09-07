'use strict';

/* global __dirname */

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Space = require('./Space');

module.exports = KVStore;

function logIfSpaceNotExist(spaces, space) {

}

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
	assert(typeof name === 'string', 'Name property should be a string');

  if (this.spaces[name]) {
    console.log('Space with name \'' + name + '\' already exists.');
  }
	else {
    this.spaces[name] = new Space();
  }
};

KVStore.prototype.search;

KVStore.prototype.set = function(key, value, spacename) {
  if (!spacename) {
    spacename = 'default';
  }
  else {
    if (!this.spaces[spacename]) {
      console.log('Space \'' + spacename + '\' does not exist in the key-value store');
      return;
    }
  }
  this.spaces[spacename].set(key, value);
};

KVStore.prototype.get = function(key, spacename) {
  if (!spacename) {
    spacename = 'default';
  }
  else {
    if (!this.spaces[spacename]) {
      console.log('Space \'' + spacename + '\' does not exist in the key-value store');
      return;
    }
  }
  return this.spaces[spacename].get(key);
};

KVStore.prototype.exportDatabase = function exportDatabase(filePath) {
  fs.writeFileSync(filePath, JSON.stringify(this));
};