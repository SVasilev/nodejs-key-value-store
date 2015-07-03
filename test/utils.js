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

module.exports = {
  catchConsoleOutput: catchConsoleOutput
};