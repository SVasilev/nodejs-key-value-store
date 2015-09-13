'use strict';

/* global __dirname */

/* global describe */
/* global it */
/* global beforeEach */

var assert = require('assert');
var CliPromptBuilder = require('../../kvstore-cli/CliPromptBuilder');
var testUtils = require('../testUtils');
var cliPromptBuilder, cliPrompt;

describe('CliPromptBuilder', function() {
  beforeEach(function() {
    cliPromptBuilder = new CliPromptBuilder();
    cliPrompt = cliPromptBuilder.build();
  });

  describe('build', function() {
    it('builds new cliPrompt', function() {
      cliPromptBuilder = new CliPromptBuilder();
      cliPromptBuilder.build();
    });
  });

  describe('usage', function() {
    it('recognizes if the command is unknown', function() {
      var commandExecutionResult = testUtils.executeCliCommand(cliPrompt, 'dummy');
      assert(/Unknown command \'dummy\'/.test(commandExecutionResult));
    });

    it('writes new line if enter is pressed', function() {
      var commandExecutionResult = testUtils.executeCliCommand(cliPrompt, '');
      assert(/newLine$/.test('newLine' + commandExecutionResult));
    });

    it('displays help for the cli interface', function() {
      var commandExecutionResult = testUtils.executeCliCommand(cliPrompt, '--help');
      assert(/NOTE: Command line interface is .* whitespaces./.test(commandExecutionResult));
    });

    it('displays help for a certain command', function() {
      var commandExecutionResult = testUtils.executeCliCommand(cliPrompt, 'createspace help');
      assert(/createspace <name>/.test(commandExecutionResult));
    });

    it('executes a valid command', function() {
      var commandExecutionResult = testUtils.executeCliCommand(cliPrompt, 'createspace');
      assert(/Type \'createspace help\' to see the manual/.test(commandExecutionResult));
    });
  });
});