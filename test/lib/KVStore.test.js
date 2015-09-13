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
      assert.equal(Object.keys(kvstore.getSpaces()).length, 1); // Because we always have one default space

      var pathToCrash = __dirname + '../../../lib/data.csh';
      fs.writeFileSync(pathToCrash, '{"name":"main","spaces":{"default":{"pairs":{}},"a":{"pairs":{}},"b":{"pairs":{}}}}');

      kvstore = new KVStore('myStore');
      assert.equal(Object.keys(kvstore.getSpaces()).length, 3);
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

      assert.equal(consoleLog, 'Space with name \'dummy\' already exists.');
    });

    it('creates new space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('dummy');

      assert(kvstore.getSpaces()['dummy']);
    });
  });
  
  describe('getSpaces method', function() {
    if('returns current spaces', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('dummy');
  
      assert.equal(Object.keys(kvstore.getSpaces()).toString(), 'default,dummy');
    });
  });
  
  describe('use method', function() {
    it('throws if no spacename provided', function() {
      assert.throws(function() {
        kvstore = new KVStore('myStore');
        kvstore.use();
      }, /use method expects a spacename./);
    });
    
    it('logs if provided spacename does not exist', function() {
      var consoleLog = testUtils.catchConsoleOutput(function() {
        kvstore = new KVStore('myStore');
        kvstore.use('nonexistingSpace');
      });

      assert(/Provided spacename .* does not exist./.test(consoleLog));
    });
    
    it('should allow to switch to a different space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      assert.equal(kvstore.getWorkingSpace(), 'default');
      kvstore.use('mySpace');
      assert.equal(kvstore.getWorkingSpace(), 'mySpace');
    });
  });
  
  describe('getWorkingSpace method', function() {
    it('should show the current working space', function() {
      kvstore = new KVStore('myStore');
      assert.equal(kvstore.getWorkingSpace(), 'default');
    });
  });
  
  describe('showKeys method', function() {
    it('returns the keys from a space correctly', function() {
      kvstore = new KVStore('myStore');
      kvstore.set('key', 42);
      assert.equal(kvstore.showKeys().toString(), 'key');
      kvstore.createSpace('mySpace');
      kvstore.set('myKey', 42, 'mySpace');
      kvstore.use('mySpace');
      assert.equal(kvstore.showKeys().toString(), 'myKey');
      assert.equal(kvstore.showKeys('default').toString(), 'key');
    });
  });
  
  describe('showValues method', function() {
    it('returns the values from a space correctly', function() {
      kvstore = new KVStore('myStore');
      kvstore.set('key', 42);
      assert.equal(kvstore.showValues().toString(), 42);
      kvstore.createSpace('mySpace');
      kvstore.set('myKey', 52, 'mySpace');
      kvstore.use('mySpace');
      assert.equal(kvstore.showValues().toString(), 52);
      assert.equal(kvstore.showValues('default').toString(), 42);
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
      assert.equal(kvstore.getSpaces()['default'].pairs.key, 42);
      
      kvstore.createSpace('mySpace');
      kvstore.use('mySpace');
      kvstore.set('key', 52);
      assert.equal(kvstore.getSpaces()['mySpace'].pairs.key, 52);
    });

    it('allows setting key value pair with provided space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      kvstore.set('key', 42, 'mySpace');

      assert.equal(kvstore.getSpaces()['mySpace'].pairs.key, 42);
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
      assert.equal(kvstore.get('key'), 42);
      
      kvstore.createSpace('mySpace');
      kvstore.set('key', 52, 'mySpace');
      kvstore.use('mySpace');
      assert.equal(kvstore.get('key'), 52);
    });

    it('allows getting value for key with provided space', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      kvstore.set('key', 42, 'mySpace');

      assert.equal(kvstore.get('key', 'mySpace'), 42);
    });
  });

  describe('deleteSpace method', function() {
    it('deletes a space correctly', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      kvstore.set('key', 42, 'mySpace');
      assert.equal(Object.keys(kvstore.getSpaces()).toString(), 'default,mySpace');
      kvstore.deleteSpace('mySpace');
      assert.equal(Object.keys(kvstore.getSpaces()).toString(), 'default');
    });
  })
  
  describe('export method', function() {
    it('throws if no filePath provided', function() {
      assert.throws(function() {
        kvstore = new KVStore('myStore');
        kvstore.export();
      }, /export method expects a filePath/);
    });
  });
  
  describe('import method', function() {
    it('throws if no filePath provided', function() {
      assert.throws(function() {
        kvstore = new KVStore('myStore');
        kvstore.import();
      }, /import method expects a filePath/);
    });
  });

  describe('dropDatabase method', function() {
    it('deletes all spaces except of default', function() {
      kvstore = new KVStore('myStore');
      kvstore.createSpace('mySpace');
      assert.equal(Object.keys(kvstore.getSpaces()).toString(), 'default,mySpace');
      kvstore.dropDatabase();
      assert.equal(Object.keys(kvstore.getSpaces()).toString(), 'default');
    });
  });
});