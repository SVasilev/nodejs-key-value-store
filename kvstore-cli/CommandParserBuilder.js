'use strict';

var Commands = require('./Commands');
var commandParser = require('../kvstore-cli/command-parser');

module.exports = CommandParserBuilder;

function CommandParserBuilder(kvStoreInstance, availableCommands) {
  this.commands = new Commands(kvStoreInstance, availableCommands);
}

CommandParserBuilder.prototype.build = function() {
  var command;
  
  commandParser.version('0.0.1');
  Object.keys(this.commands.availableCommands).forEach(function (key) {
    command = this.commands.availableCommands[key];
    commandParser
      .command(command.syntax)
      .action(Commands.prototype[key]);
  }, this);
  
  return commandParser;
};