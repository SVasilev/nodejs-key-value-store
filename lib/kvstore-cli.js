'use strict';

var readline = require('readline');
var cli = readline.createInterface(process.stdin, process.stdout);
var cliUtils = require('./cliUtils');
var cliAPI = require('./cliAPI');
var cliParser = cliUtils.initParser();

cli.setPrompt('kvs> ');
cli.prompt();

cli.on('line', function(line) {
	var command = cliUtils.getCommand(line);
	var args;
	switch (command) {
		case 'createspace':
			args = cliParser.parse(line.replace(/, /g, ',').replace(/key/g, '-S').split(' '));
			break;
		case 'help':
			cliAPI.commandHelp(line, cliParser);
			break;
		default:
			console.log('Unknown command \'' + command + '\'.Type \'help\' to see all valid commands.');
			break;
	}
	console.info(args);
	cli.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});