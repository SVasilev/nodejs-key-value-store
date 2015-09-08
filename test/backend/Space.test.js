/* global __dirname */

/* global describe */
/* global it */
/* global beforeEach */

var assert = require('assert');
var Space = require('../../lib/Space.js');
var testUtils = require('../testUtils');
var space;

describe('Space', function() {
  beforeEach(function() {
    space = new Space();
  });
  
  describe('set', function() {
    it('should allow setting a value', function() {
      space.set('key', 42);
      assert(space.pairs.key === 42);
    })
    
    it('should allow to set value to an already existing key and should log a warning', function() {
      var consoleLog = testUtils.catchConsoleOutput(function() {
        space.set('key', 32);
        space.set('key', 42);
      });

      assert(/WARNING: Key with name \'key\' was overriden./.test(consoleLog));
      assert(space.pairs.key === 42);
    });
	});
  
  describe('get', function() {
    it('should allow getting a value', function() {
      space.set('key', 42);
      assert(space.get('key') === 42);
    })
    
    it('should log a warning if value to the given key is missing', function() {
      var consoleLog = testUtils.catchConsoleOutput(function() {
        space.get('key');
      });

      assert(/INFO: Key with name \'key'\ does not exist./.test(consoleLog));
    });
	});
});