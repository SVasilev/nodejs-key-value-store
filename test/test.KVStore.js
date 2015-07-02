'use strict';

/* global describe */
/* global it */

var assert = require('assert');
var Space = require('../lib/Space.js');
var KVStore = require('..');
var types = require('../lib/datatypes');
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
        kvstore.createSpace({name: 42});
		  }, /Name property .* a string/);
    });
    
    it('creates new space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('dummy');
      
      // TODO: use getSpaces() method;
      assert(kvstore.spaces['dummy']);
    });
  });
  
  describe('put method', function() {
    it('should throw if you try to put value in non existing space', function() {
      assert.throws(function() {
        kvstore = new KVStore('myStore');
        kvstore.set('movie', ['Perl Harbor', 1997], [true, 'Fox', 'Stephen']);
      }, /Space 'movie' does not .* store/);
    });
  });
});