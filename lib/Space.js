'use strict';

var assert = require('assert');

module.exports = Space;

function Space(options) {
	this.name = options.name;
	this.key  = options.key;
	this.attributes = options.attributes;
};

Space.prototype.put = function(key, value) {
	
};

Space.prototype.get = function(key) {
	
};