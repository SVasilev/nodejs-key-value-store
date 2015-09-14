'use strict';

var assert = require('assert');
var Commands = require('./Commands');
var commandParser = require('../kvstore-cli/command-parser');

module.exports = CommandParserBuilder;

function CommandParserBuilder(kvStore, availableCommands) {
  assert(kvStore, 'Missing first argument of the constructor');
  assert(availableCommands, 'Missing second argument of the constructor');

  this.commands = new Commands(kvStore, availableCommands);
}

CommandParserBuilder.prototype.build = function() {
  commandParser.version('0.0.1');
  Object.keys(this.commands.availableCommands).forEach(function (key) {
    var command = this.commands.availableCommands[key];
    var implFunction = this.commands[key];

    assert(implFunction, 'Missing function \'' + key + '\' in Commands.prototype');
    commandParser
      .command(command.syntax)
      .action(implFunction.bind(this.commands));
  }, this);

  return commandParser;
};