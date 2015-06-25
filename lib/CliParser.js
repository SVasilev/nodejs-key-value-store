'use strict';

module.exports = new CliParser();

function CliParser() {
	this.availableCommands = {
		createspace: 'createspace <name> <[[<key1>, <type>], [<key2> <type>], ...]> <<[[<field1>, <type>], [<field2> <type>], ...]>>\n',
		help: 'help <<CommandName>>\n'
	};
}

CliParser.prototype.getCommandFromPrompt = function(commandLine) {
	return commandLine.trim().split(' ')[0];
};

CliParser.prototype.showFullHelpPage = function() {
	var fullHelp =
		'\n--- List of commands ---\n' +
		[''].concat(Object.keys(this.availableCommands))
		.reduce(function(previousValue, currentValue) {
		  return previousValue + this.availableCommands[currentValue];
		}) +
		'Arguments surrounded with <> are mandatory, ' +
		'arguments surrounded with <<>> are optional.\n';

	return fullHelp;
};

CliParser.prototype.optimizeCommand = function(line) {
	var cliArguments = line.trim().replace(/, /g, ',').replace(/key/, '-s').split(' ');
};

CliParser.prototype.getCommandManPage = function(commandLine) {
	var command = commandLine.trim().split(' ')[1];
  return this.availableCommands[command];
};