# nodejs-key-value-store
Very brief example of a Key-value Store written in Nodejs, including an interactive Command line interface. The project is for the BigData course in Sofia University.

# Installation
Run `npm install nodejs-key-value-store`

# Running tests
Run `npm test` in the root directory of the project.

# Features
* Creating and using spaces.
* Importing and exporting the database.
* Handles system crash.

# Future features
* Should log actions to a log file.

# Command line inteface
The command line interface can be started by executing `node kvstore-cli.js`.
Command line interface is case-insensitive and it removes all unnecessary whitespaces.

How the command line interface should be used:<br />
You can type --help or -h to see all the available commands.<br />
The command arguments marked with <> are mandatory, while the command arguments marked with [] are optional.<br />
You can also see detailed manual for a specific command by typing: 'help'.<br />

# License
MIT