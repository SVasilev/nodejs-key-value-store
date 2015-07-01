'use strict';

var CliPromptBuilder = require('./CliPromptBuilder');
var cliPrompt = new CliPromptBuilder().build();

// Start the Command Line Interface (cli)
cliPrompt.prompt();