'use strict';

function createSpace(name, key, value) {
	
}

function commandHelp(commandManual, showFullHelp) {
	commandManual ? console.info('\n' + commandManual) : showFullHelp();
}

function commandNotFound(command) {
	console.log('Unknown command \'' + command + '\'. Type \'help\' to see all valid commands.');
}

module.exports = {
	commandHelp: commandHelp,
	commandNotFound: commandNotFound
};