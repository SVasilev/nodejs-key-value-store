'use strict';

/* global __dirname */

/* global describe */
/* global it */

var assert = require('assert');
var Commands = require('../../kvstore-cli/Commands');
var KVStore  = require('../../lib/KVstore');
var CommandParserBuilder = require('../../kvstore-cli/CommandParserBuilder');
var kvStoreImpl, availableCommands, commandParserBuilder;

describe('CommandParserBuilder', function() {
  describe('constructor', function() {
    it('should throw if no first argument provided', function() {
      assert.throws(function() {
		    commandParserBuilder = new CommandParserBuilder();
		  }, /Missing first .* constructor/);
    });
    
    it('should throw if no second argument provided', function() {
      assert.throws(function() {
		    commandParserBuilder = new CommandParserBuilder(42);
		  }, /Missing second .* constructor/);
    });
    
    it('creates a CommandParserBuilder', function() {
      kvStoreImpl = new KVStore('main');
      availableCommands = require('../../kvstore-cli/availableCommands');
      
		  commandParserBuilder = new CommandParserBuilder(kvStoreImpl, availableCommands);
      assert(commandParserBuilder.commands);
    });
  });
  
  describe('build', function() {
   it('should throw if no first argument provided', function() {
      assert.throws(function() {
        kvStoreImpl = new KVStore('main');
        availableCommands = require('../../kvstore-cli/availableCommands');
        
        delete Commands.prototype['set'];
        
  		  commandParserBuilder = new CommandParserBuilder(kvStoreImpl, availableCommands);
        commandParserBuilder.build();
      }, 'Missing function \'set\' in Commands.prototype');
    });
  });
});