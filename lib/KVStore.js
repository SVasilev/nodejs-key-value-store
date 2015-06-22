'use strict';

var assert = require('assert');
var Space = require('./Space');

module.exports = KVStore;

function throwIfSpaceNotExist(space) {
	assert(this.spaces[space], 'Space ' + space + ' does not exist in the key-value store');
}

function KVStore(name) {
	assert(name, 'Missing first argument of the constructor');
	assert(typeof name === 'string', 'First argument must be string');
	
	this.name = name;
	this.spaces = {};
}

KVStore.prototype.createSpace = function(options) {
	assert(options, 'Missing first argument');
	assert(typeof options === 'object', 'First argument must be and object');
	assert(options.name, 'Missing name property of the first argument');
	assert(typeof options.name === 'string', 'Name property should be a string');
	assert(options.key, 'Missing key property of the first argument');
	
	this.spaces[options.name] = new Space(options);
};

KVStore.prototype.get;
KVStore.prototype.search;

KVStore.prototype.put = function(space, key, value) {
	throwIfSpaceNotExist(space);
	this.spaces[space].put(key, value);
};