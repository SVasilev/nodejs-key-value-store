'use strict';

var assert = require('assert');
var Space = require('../lib/Space.js');
var KVStore = require('..');
var types = require('../lib/datatypes');
var options, space, kvstore;

describe('Space', function() {
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
  });
  
  describe('createSpace', function() {
    it('should throw if no argument provided', function() {
      assert.throws(function() {
		    kvstore = new KVStore('myStore');
        kvstore.createSpace();
		  }, /Missing first/);
    });
    
    it('should throw if first element of the constructor is not object', function() {
      assert.throws(function() {
		    kvstore = new KVStore('myStore');
        kvstore.createSpace(42);
		  }, /First argument .* object/);
    });
    
    it('should throw if constructor parameter does not have properties name and key', function() {
		  kvstore = new KVStore('myStore');
      assert.throws(function() {
        kvstore.createSpace({});
		  }, /Missing name/);
      assert.throws(function() {
        kvstore.createSpace({name: 'movies'});
		  }, /Missing key/);
    });
    
    it('should throw if required properties of the constructor parameter does not match types', function() {
      assert.throws(function() {
		    kvstore = new KVStore('myStore');
        kvstore.createSpace({name: 42});
		  }, /Name property .* a string/);
    });
    
    it('creates new space', function() {
      options = {
      	name: 'movies',
      	key: [['title', types.STRING], ['year', types.INTEGER]],
      	attributes: [['incolor', types.BOOLEAN], ['studio', types.STRING], ['movieStar', types.STRING]]
      };
      kvstore = new KVStore('myStore');
      kvstore.createSpace(options);
    });
  });
  
  describe('put', function() {
    
  });
});