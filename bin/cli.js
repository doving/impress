#!/usr/bin/env node

'use strict';

require('colors');

var fs = require('fs'),
    //path = require('path'),
    ncp = require('ncp').ncp,
    readline = require('readline');
    //exec = require('child_process').exec,
    //spawn = require('child_process').spawn,
    //async = require('async');

// var isWin = !!process.platform.match(/^win/);

ncp.limit = 16;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var impressPath = 'c:/dropbox/projects/impress',
    applicationsDir = impressPath + '/applications',
    curDir = process.cwd();
    //current = path.dirname(__filename.replace(/\\/g, '/'));
    //parent = path.basename(path.dirname(current));

global.applications = [];

function doExit() {
  rl.close();
}

function showHelp() {
  console.log(
    'Syntax:\n'+
    '  impress list\n'+
    '  impress add [path]\n'+
    '  impress remove [name]\n'+
    '  impress new [name]'
  );
  doExit();
}

function notInstalled() {
  console.log('  Error: not installed as a service (globally)'.red.bold);
  process.exit(0);
}

var commands = {
  list: function() {
    console.log('  Applications: ');
    var i;
    for (i = 0; i < applications.length; i++) console.log('    ' + applications[i].green.bold);
    doExit();
  },
  add: function() {
    function doInput() {
      rl.question("Enter application name: ", function(answer) {
        if (applications.indexOf(answer) === -1) {
          applicationName = answer;
          doAdd();
          doExit();
        } else {
          console.log('Application "' +answer+ '" already exists');
          doInput();
        }
      });
    }

    function doAdd() {
      var applicationPath = applicationsDir + '/' + applicationName,
          applicationLink = applicationPath + '/' + 'application.link';
      fs.mkdirSync(applicationPath);
      fs.writeFileSync(applicationLink, curDir);
      console.log('Application "' +applicationName+ '" added with link to: ' + curDir);
      doExit();
    }

    var applicationName = process.argv[3];
    if (applicationName) doAdd(); else doInput();
  },
  remove: function() {
    doExit();
  },
  new: function() {
    doExit();
  }
};

console.log('Impress Application Server CLI'.bold);

if (!fs.existsSync(impressPath)) notInstalled();
else {
  applications = fs.readdirSync(applicationsDir);
  if (process.argv.length < 3) showHelp();
  else {
    var commandName = process.argv[2],
        command = commands[commandName];
    if (!command) showHelp();
    else command();
  }
}
