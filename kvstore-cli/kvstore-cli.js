'use strict';

var path = require('path');
var commandParser = require('../kvstore-cli/command-parser');
var cliPrompt = require('readline')
.createInterface(process.stdin, process.stdout);

// TODO: availableCommands should be JSON object

var availableCommands = {
  'createspace': {
    syntax: 'createspace <name> [otherDirs...]',
    executionFuntion: function() {},
    description: 'create space description: ---'
  }
};

function onLineInput(line) {
  
  // TODO: if (line not in availableCommands) then output commandUnknown
  
	var asdf = ['node', path.join( __dirname, 'kvstore-cli.js')]
	.concat(line.trim().split(' '));
	
	commandParser.parse(asdf);
	this.prompt();
};

function onExit() {
  console.log('Have a great day!');
  process.exit(0);
}

/*
 * How it should be used:
 * --help, -h -> outputs the help
 * --version, -V -> outputs the version
 * <command> help -> special case
 */

// Configurations

// TODO:

// function bindCommands(commandParser) {
//   for(var element in Object.keys(availableCommands)) {
//     commandParser.command(element.syntax).action(element.executionFunction);
//   }
// }

// Usage: bindCommands(commandParser);

commandParser
  .version('0.0.1')
  .command('createspace <name> [otherDirs...]')
  .action(function(name, otherDirs) {
    if(name === 'help') { console.log('create space description: ---'); return; }
    if(name) console.log('rmdir %s', name);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  })
    // .command('search [query]', 'search with optional query')
    // .command('list', 'list packages installed')
    // .command('publish', 'publish the package');

cliPrompt
  .on('line', onLineInput)
  .on('close', onExit)
  .setPrompt('kvs> ');

// Start the Command Line Interface(cli)
cliPrompt.prompt();