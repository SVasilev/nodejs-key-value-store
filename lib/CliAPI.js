'use strict';

var cliUtils = require('./cliUtils');

function commandHelp(line, cliParser) {
	var commandManual;
	if(commandManual = cliUtils.getCommandManual(line)) {
		console.info('\n' + commandManual);
		return;
	}
	cliParser.showHelp();
}

module.exports = {
	commandHelp: commandHelp
}