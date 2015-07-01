'use strict';

var _ = require('underscore');
var path = require('path');
var CliPrompt = require('readline');
var CommandParserBuilder = require('./CommandParserBuilder');

var parseUtils = require('./parseUtils');
var commandParserBuilder = new CommandParserBuilder();
var commandParser = commandParserBuilder.build();

// The commands bellow have their default implementation from the command-parser module.
var defaultCommands = ['-v', '--version', '-h', '--help'];

function onLineInput(line) {
  line = parseUtils.formatCommandLine(line);
  var pathToExecutable;
  var command = line[0];
  
  if(commandParserBuilder.commands.availableCommands[command] || _.contains(defaultCommands, command)) {
  	pathToExecutable = ['node', path.join( __dirname, 'kvstore-cli.js')]
  	.concat(line);
  	commandParser.parse(pathToExecutable);
  }
  else {
    console.log('Unknown command \'' + command + '\'. Type --help to list all available commands.');
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