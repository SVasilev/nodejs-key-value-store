'use strict';

/* global __dirname */

/* global describe */
/* global it */

var assert = require('assert');
var CliPromptBuilder = require('../../kvstore-cli/CliPromptBuilder');
var utils = require('../utils');
var cliPromptBuilder, cliPrompt;

describe('CliPromptBuilder', function() {  
  describe('build', function() {
    it('builds new cliPrompt', function() {
      cliPromptBuilder = new CliPromptBuilder();
      cliPromptBuilder.build();
    });
    
    it('it regognizes if the command is unknown', function() {
      cliPromptBuilder = new CliPromptBuilder();
      cliPrompt = cliPromptBuilder.build();
      
      var consoleLog = utils.catchConsoleOutput(function() {
        cliPrompt._events.line.call(cliPrompt, 'dummy');
      });
      
      assert(/Unknown command \'dummy\'/.test(consoleLog));
    });
    
    it('writes new line if enter is pressed', function() {
      cliPromptBuilder = new CliPromptBuilder();
      cliPrompt = cliPromptBuilder.build();
      
      var consoleLog = utils.catchConsoleOutput(function() {
        cliPrompt._events.line.call(cliPrompt, '');
      });
      
      assert(/newLine$/.test('newLine' + consoleLog));
    });
  });
});