'use strict';

var Commands = require('./Commands');
var KVStore  = require('../lib/KVstore');
var commandParser = require('../kvstore-cli/command-parser');

module.exports = CommandParserBuilder;

function CommandParserBuilder() {
  this.commands = new Commands(new KVStore('main'), require('./availableCommands'));
}

CommandParserBuilder.prototype.build = function() {
  var command;
  
  commandParser.version('0.0.1');
  Object.keys(this.commands.availableCommands).forEach(function (key) {
    command = this.commands.availableCommands[key];
    commandParser
      .command(command.syntax)
      .action(this.commands.createspace.bind(this.commands));
  }, this);
  
  return commandParser;
};