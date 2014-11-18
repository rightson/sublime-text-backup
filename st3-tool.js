#!/usr/bin/env node

var path = require('path');
var util = require('util');
var actions = require('./lib/actions');

if (process.argv.length < 3) {
	console.log('Sublime Text 3 Backup Tool\n');
	console.log('Usage:\n  node %s <ACTION> <PATH>\n', path.basename(process.argv[1]));
	console.log('<ACTION>:');
	console.log('  backup:      back packages to given <PATH>.');
	console.log("  restore:     restore packages from <PATH> to options.st3 package location.");
	console.log("  relink:      create symbolic link (backup packages) from <PATH> to options.st3's package location.");
	console.log("  status:      check if options.st3 package is linked symbolically.");
	console.log('<PATH>:');
	console.log('  destination location');
	return;
}

var PKG_LOC = path.join(process.env['HOME'], 'Library', 'Application Support');
var options = {
	action: process.argv[2],
	path: process.argv[3],
	st3: path.join(PKG_LOC, 'Sublime Text 3'),
	st3_bak: util.format(PKG_LOC, 'Sublime Text 3', '%s.tar.gz')
};

console.log('Configurations:');
console.log(options);

if (options.action !== 'status' && options.path === undefined) {
	return console.log("Error: please specify PATH");
}

switch (options.action) {
	case 'backup':
		return actions.backup(options.st3, path.resolve(options.path), options.st3_bak);
	case 'restore':
		return actions.restore(path.resolve(options.path), options.st3, options.st3_bak);
	case 'relink':
		return actions.relink(path.resolve(options.path), options.st3);
	case 'status':
		return console.log(actions.status(options.st3));
	default:
		return actions.test();
}
