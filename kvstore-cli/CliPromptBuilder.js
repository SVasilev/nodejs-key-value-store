/* global __dirname */
/* global process */
'use strict';

var path = require('path');
var KVStore  = require('../lib/KVstore');
var CliPrompt = require('readline');
var CommandParserBuilder = require('./CommandParserBuilder');

var kvStoreImpl = new KVStore('main');
var availableCommands = require('./availableCommands');
var commandParserBuilder = new CommandParserBuilder(kvStoreImpl, availableCommands);
var commandParser = commandParserBuilder.build();

var parseUtils = require('./parseUtils');
availableCommands = parseUtils.prettifyCommandManuals(availableCommands);

function onLineInput(line) {
  line = parseUtils.formatCommandLine(line);
  var command = line[0];
  var firstArgument = line[1];
  var commands = commandParserBuilder.commands;
  var parseArgs;
  
  // If the command is valid
  if(parseUtils.isCommandValid(commands, command)) {
    // Special case for detailed command manual
    if (firstArgument === 'help' && !parseUtils.isDefaultCommand(command)) {
      commands.displayHelp(command);
    }
  	else {
      parseArgs = ['node', path.join(__dirname, 'kvstore-cli.js')].concat(line);
      commandParser.parse(parseArgs);
    }
  }
  else {
    parseUtils.unknownCommand(command);
  }
	this.prompt();
};

function onExit() {
  console.log('Have a great day!');
  process.exit(0);
}

module.exports = CliPromptBuilder;

function CliPromptBuilder() {
  this.cliPrompt = CliPrompt.createInterface(process.stdin, process.stdout);
}

CliPromptBuilder.prototype.build = function() {
  this.cliPrompt
    .on('line', onLineInput)
    .on('close', onExit)
    .setPrompt('kvs> ');

  return this.cliPrompt;
};