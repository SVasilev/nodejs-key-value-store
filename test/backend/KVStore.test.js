'use strict';

/* global __dirname */

/* global describe */
/* global it */

var fs = require('fs');
var assert = require('assert');
var KVStore = require('../..');
var testUtils = require('../testUtils');
var kvstore;

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
      assert(kvstore.getSpaces());
    });

    it('restores its state if it crashed or was interupted last time', function() {
      kvstore = new KVStore('myStore');
      assert(Object.keys(kvstore.getSpaces()).length === 1); // Because we always have one default space

      var pathToCrash = __dirname + '../../../lib/data.csh';
      fs.writeFileSync(pathToCrash, '{"name":"main","spaces":{"default":{"pairs":{}},"a":{"pairs":{}},"b":{"pairs":{}}}}');

      kvstore = new KVStore('myStore');
      assert(Object.keys(kvstore.getSpaces()).length === 3);
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
      var consoleLog = testUtils.catchConsoleOutput(function() {
        kvstore = new KVStore('myStore');
        kvstore.createSpace('dummy');
        kvstore.createSpace('dummy');
      });

      assert(consoleLog === 'Space with name \'dummy\' already exists.');
    });

    it('creates new space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('dummy');

      assert(kvstore.getSpaces()['dummy']);
    });
  });

  describe('set method', function() {
    it('should log if you try to set value from non existing space', function() {
      var consoleLog = testUtils.catchConsoleOutput(function() {
        kvstore = new KVStore('myStore');
        kvstore.set('key', 42, 'sandbox');
      });

      assert(/Space \'sandbox\' does not .* store/.test(consoleLog));
    });

    it('allows setting key value pair to the current workingSpace', function() {
      kvstore = new KVStore('myStore');
      kvstore.set('key', 42);

      assert(kvstore.getSpaces()['default'].pairs.key === 42);

      // TODO: change the space to mySpace with the command use when it is implemented.
    });

    it('allows setting key value pair with provided space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      kvstore.set('key', 42, 'mySpace');

      assert(kvstore.getSpaces()['mySpace'].pairs.key === 42);
    });
  });

  describe('get method', function() {
    it('should log if you try to get value from non existing space', function() {
      var consoleLog = testUtils.catchConsoleOutput(function() {
        kvstore = new KVStore('myStore');
        kvstore.get('key', 'sandbox');
      });

      assert(/Space \'sandbox\' does not .* store/.test(consoleLog));
    });

    it('allows getting value from key in the current workingSpace', function() {
      kvstore = new KVStore('myStore');
      kvstore.set('key', 42);

      assert(kvstore.get('key') === 42);

      // TODO: change the space to mySpace with the command use when it is implemented.
    });

    it('allows getting value for key with provided space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      kvstore.set('key', 42, 'mySpace');

      assert(kvstore.get('key', 'mySpace') === 42);
    });
  });

});