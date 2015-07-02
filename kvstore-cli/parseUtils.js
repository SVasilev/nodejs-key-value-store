'use strict';

var _ = require('underscore');

function prettifyCommandManuals(availableCommands) {
  Object.keys(availableCommands).forEach(function(key) {
    // Insert syntax of the command and additional spaces.
    var currentCommand = availableCommands[key];
    currentCommand.description = currentCommand.syntax + '\n\n' +
                                 '  ' + currentCommand.description;

    // Insert new lines if the description is too long.
    var newDescription = currentCommand.description.split(' ');
    var linesNumber = newDescription.length / 10;
    
    Array.apply(null, Array(parseInt(linesNumber.toString())))
    .map(function(_, i) {
      return i * 20;
    }).forEach(function(index) {
      newDescription.splice(index, 0, '\n ');
    });
    
    currentCommand.description = newDescription.join(' ');
  });
  return availableCommands;
}

function isCommandValid(commands, command) {
  return commands.availableCommands[command] || isDefaultCommand(command);
}

function isDefaultCommand(command) {
  // The commands bellow have their default implementation from the command-parser module.
  var defaultCommands = ['-V', '--version', '-h', '--help'];
  return _.contains(defaultCommands, command);
}

function formatCommandLine(line) {
  return line.replace(/\s+/g, ' ').trim().replace(/, /g, ',').toLowerCase().split(' ');
}

function unknownCommand(command) {
  console.log('Unknown command \'' + command + '\'. Type --help to list all available commands.');
}

module.exports = {
  prettifyCommandManuals: prettifyCommandManuals,
  isCommandValid: isCommandValid,
  isDefaultCommand: isDefaultCommand,
	formatCommandLine: formatCommandLine,
  unknownCommand: unknownCommand
};