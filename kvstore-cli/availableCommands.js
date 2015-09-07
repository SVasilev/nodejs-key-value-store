'use strict';

module.exports = {
  'createspace': {
    syntax: 'createspace <name>',
    description: 'Creates space with the given name in the root space.'
  },
  // 'showspaces': {
  //   syntax: 'showspaces',
  //   description: 'Lists all available spaces in the Key-Value Store.'
  // },
  // 'use': {
  //   syntax: 'use <spacename>',
  //   description: 'Changes the working space to the one that is provided ' +
  //                'as \'spacename\'. If the provided spacename does not ' +
  //                'exist error is thrown.'
  // },
  // 'workingspace': {
  //   syntax: 'workingspace',
  //   description: 'Prints the current working space. You can switch ' +
  //                'workingspaces with the command \'use\'. For additional ' +
  //                'help about \'use\', type \'use help\'.'
  // },
  // 'showkeys': {
  //   syntax: 'showkeys [spacename]',
  //   description: 'Lists all the keys for the provided \'spacename\' ' +
  //                'If no argument is given the keys for the current ' +
  //                'workingspace are listed.'
  // },
  // 'showvalues': {
  //   syntax: 'showvalues [spacename]',
  //   description: 'Lists all the values for the provided \'spacename\' ' +
  //                'If no argument is given the values for the current ' +
  //                'workingspace are listed.'
  // },
  'set': {
    syntax: 'set <key> <value> [spacename]',
    description: 'Binds key with the provided value. If spacename is ' +
                 'provided, then the key is set in the provided spacename. ' +
                 'Otherwise the key is set in the current workingspace.'
  },
  'get': {
    syntax: 'get <key> [spacename]',
    description: 'Searches for value the given key. If such a value is ' +
                 'found, it is returned as output. If spacename is provided ' +
                 'then the key is searched in the provided spacename. ' +
                 'Otherwise the key is searched in the current workingspace.'
  },
  // 'deletespace': {
  //   syntax: 'deletespace <name>',
  //   description: 'Deletes space with the given name. Beware, using this ' +
  //                'command will delete all the keys in the space. This change ' +
  //                'cannot be rewinded.'
  // },
  // 'exportdatabase': {
  //   syntax: 'exportdatabase <filePath>',
  //   description: 'Exports the current database state. The exported result ' +
  //                'will be written in the given filePath. Provided filePath ' +
  //                'should contain the exportation unit name. If the current ' +
  //                'command line user does not have permissions to write in ' +
  //                'the given filePath then the process is aborted.'
  // },
  // 'importdatabase': {
  //   syntax: 'importdatabase <filePath>',
  //   description: 'Imports the current required database. The importation ' +
  //                'unit will be read from the given filePath. Provided filePath ' +
  //                'should contain the unit name. If the current command line ' +
  //                'user does not have permissions to read from the given ' +
  //                'filePath then the process is aborted.'
  // }
  // 'dropdatabase': {
  //   syntax: 'dropdatabase',
  //   description: 'Drops all the created spaces. Beware, this command ' +
  //                'cannot be reverted.'
  // }
  // 'log': {
  //   syntax: 'log',
  //   description: 'Outputs the command history. The history is kept from ' +
  //                'the beginning of the current started Command Line Interface'
  // }
};