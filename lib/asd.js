'use strict';

var spawnSync = require('spawn-sync');

console.log('before');
var result = spawnSync('node',
                       ['kvstore-cli-install.js', '--help'],
                       {input: 'write this to stdin'});
console.log('laina');

process.stdout.write(result.stdout);

console.log('after');