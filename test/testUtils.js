function catchConsoleOutput(executeFunction) {
  var oldConsole = console.log;
  var log = '';
  console.log = function() {
    log = arguments[0].toString();
  };

  executeFunction();

  console.log = oldConsole;
  return log;
}

function executeCliCommand(cliPrompt, command) {
  return this.catchConsoleOutput(function() {
    cliPrompt._events.line.call(cliPrompt, command);
  });
}

module.exports = {
  catchConsoleOutput: catchConsoleOutput,
  executeCliCommand: executeCliCommand
};