'use strict';

var assert = require('assert');
var Space = require('./Space');

module.exports = KVStore;

function throwIfSpaceNotExist(space) {
	assert(this.spaces[space], 'Space \'' + space + '\' does not exist in the key-value store');
}

function KVStore(name) {
	assert(name, 'Missing first argument of the constructor');
	assert(typeof name === 'string', 'First argument must be string');
	
	this.name = name;
	this.spaces = {};
}

KVStore.prototype.createSpace = function(name) {
	assert(name, 'Missing first argument');
	assert(typeof name === 'string', 'Name property should be a string');
	
	this.spaces[name] = new Space(name);
};

KVStore.prototype.get;
KVStore.prototype.search;
KVStore.prototype.handleCrash;

KVStore.prototype.set = function(space, key, value) {
	throwIfSpaceNotExist.call(this, space);
	this.spaces[space].set(key, value);
};