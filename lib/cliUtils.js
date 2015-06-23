'use strict';

var commandManuals = {
	createspace: 'createspace <name> <[[<key1>, <type>], [<key2> <type>], ...]> <<[[<field1>, <type>], [<field2> <type>], ...]>>\n',
	other: 'SHOULD EXPAND THIS...\n'
};

function getCommand(commandLine) {
	return commandLine.trim().split(' ')[0];
}

function getCommandManual(commandLine) {
	var command = commandLine.trim().split(' ')[1];
  return commandManuals[command];
}

function initParser() {
	return require('node-getopt').create([
	  ['s' , ''                    , 'short option.'],
	  [''  , 'long'                , 'long option.'],
	  ['S' , 'short-with-arg=ARG'  , 'option with argument'],
	  ['L' , 'long-with-arg=ARG'   , 'long option with argument'],
	  [''  , 'color[=COLOR]'       , 'COLOR is optional'],
	  ['m' , 'multi-with-arg=ARG+' , 'multiple option with argument'],
	  [''  , 'no-comment'],
	  ['h' , 'help'                , 'display this help'],
	  ['v' , 'version'             , 'show version']
	])
	.bindHelp()
	.setHelp(
		'\n--- List of commands ---\n' +
		[''].concat(Object.keys(commandManuals)).reduce(function(previousValue, currentValue) {
		  return previousValue + commandManuals[currentValue];
		}) +
		'Arguments surrounded with <> are mandatory, arguments surrounded with <<>> are optional.\n'
	);
}

module.exports = {
	getCommand: getCommand,
	getCommandManual: getCommandManual,
	initParser: initParser
};