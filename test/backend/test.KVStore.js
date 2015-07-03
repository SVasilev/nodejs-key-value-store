'use strict';

/* global __dirname */

/* global describe */
/* global it */

var fs = require('fs');
var assert = require('assert');
var Space = require('../../lib/Space.js');
var KVStore = require('../..');
var utils = require('../utils');
var space, kvstore;

describe('KVStore', function() {
  describe('constructor', function() {
    it('should throw if no argument provided', function() {
      assert.throws(function() {
		    kvstore = new KVStore();
		  }, /Missing first/);
    });
    
    it('should throw if first element of the constructor is not string', function() {
      assert.throws(function() {
		    kvstore = new KVStore(42);
		  }, /First argument .* string/);
    });
    
    it('creates a key-value store', function() {
		  kvstore = new KVStore('myStore');
      assert(kvstore.spaces);
    });
    
    it('restores its state if it crashed or was interupted last time', function() {
      kvstore = new KVStore('myStore');
      assert(Object.keys(kvstore.spaces).length === 0);
      
      var pathToLib = __dirname + '../../../lib/data.csh';
      fs.writeFileSync(pathToLib, '{"name":"main","spaces":{"a":{"pairs":{}},"b":{"pairs":{}}}}');
      
      kvstore = new KVStore('myStore');
      assert(Object.keys(kvstore.spaces).length === 2);
    });
  });
  
  describe('createSpace method', function() {
    it('should throw if no argument provided', function() {
      assert.throws(function() {
		    kvstore = new KVStore('myStore');
        kvstore.createSpace();
		  }, /Missing first/);
    });
    
    it('should throw if required properties of the constructor parameter does not match types', function() {
      assert.throws(function() {
		    kvstore = new KVStore('myStore');
        kvstore.createSpace(42);
		  }, /Name property .* a string/);
    });
    
    it('logs message if we try to create space which already exists', function() {
      var consoleLog = utils.catchConsoleOutput(function() {
        kvstore = new KVStore('myStore');
        kvstore.createSpace('dummy');
        kvstore.createSpace('dummy');
      });
      
      assert(consoleLog === 'Space with name \'dummy\' already exists.');
    });
    
    it('creates new space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('dummy');
      
      // TODO: use getSpaces() method;
      assert(kvstore.spaces['dummy']);
    });
  });
  
  describe('set method', function() {
    it('should throw if you try to set value in non existing space', function() {
      assert.throws(function() {
        kvstore = new KVStore('myStore');
        kvstore.set('movie', ['Perl Harbor', 1997], [true, 'Fox', 'Stephen']);
      }, /Space 'movie' does not .* store/);
    });
  });
});