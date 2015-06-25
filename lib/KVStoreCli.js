'use strict';

var path = require('path');
var readline = require('readline');
var cliParser = require('./CliParser');
var cliAPI = require('./cliAPI');

var program = require('commander');

program
  .version('0.0.1')
  .command('install [name]', 'install one or more packages')
  .command('search [query]', 'search with optional query')
  .command('list', 'list packages installed')
  .command('publish', 'publish the package');

module.exports = KVStoreCli;

function KVStoreCli() {
	this.cli = readline.createInterface(process.stdin, process.stdout);
	this.cli.setPrompt('kvs> ');
	this.availableCommands = {
		createspace: 'createspace <name> <[[<key1>, <type>], [<key2> <type>], ...]> <<[[<field1>, <type>], [<field2> <type>], ...]>>\n',
		help: 'help <<CommandName>>\n'
	};
}

KVStoreCli.prototype.onLineInput = function(line) {
	// var command = cliParser.getCommandFromPrompt(line);
	// var args, commandManPage, fullHelpPage;
	// switch (command) {
	// 	case 'createspace':
	// 		//args = cliParser.parse(cliUtils.optimizeCommand(line));
	// 		args = cliParser.parse(line.trim().split(' '));
	// 		break;
	// 	case 'help':
	// 		program.parse(line);
	// 		// commandManPage = cliParser.getCommandManPage(line);
	// 		// fullHelpPage = cliParser.showFullHelpPage;
	// 		// cliAPI.commandHelp(commandManPage, fullHelpPage);
	// 		break;
	// 	default:
	// 		cliAPI.commandNotFound(command);
	// 		break;
	// }
	// console.info(args);
	
	//[ 'node', 'D:\\Programming\\Javascript\\BigDataProject\\nodejs-key-value-store\\lib\\tryCommander.js', 'install', 'asd' ]
	
	var asdf = ['node',path.join( __dirname, 'kvstore-cli.js')]
	.concat(line.trim().split(' '));
	
	console.log();
	
	program.parse(asdf);
	
	this.cli.prompt();
};

KVStoreCli.prototype.onExit = function() {
  console.log('Have a great day!');
  process.exit(0);
}

KVStoreCli.prototype.startConsole = function() {
	this.cli.on('line', this.onLineInput.bind(this)).on('close', this.onExit);
	this.cli.prompt();
}