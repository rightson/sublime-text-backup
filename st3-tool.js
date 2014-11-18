#!/usr/bin/env node

var path = require('path');
var util = require('util');
var actions = require('./lib/actions');

if (process.argv.length < 3) {
	console.log('Sublime Text 3 Backup Tool\n');
	console.log('Usage:\n  node %s <ACTION> <PATH>\n', path.basename(process.argv[1]));
	console.log('<ACTION>:');
	console.log('  backup:      back packages to given <PATH>.');
	console.log("  restore:     restore packages from <PATH> to ST3 package location.");
	console.log("  relink:      create symbolic link (backup packages) from <PATH> to ST3's package location.");
	console.log("  status:      check if ST3 package is linked symbolically.");
	console.log('<PATH>:');
	console.log('  destination location');
	return;
}

var ROOT = path.join(process.env['HOME'], 'Library', 'Application Support');
var ST3 = path.join(ROOT, 'Sublime Text 3');
var BAK = util.format('%s.tar.gz', ST3);

console.log('Configurations:');
console.log('  ST3=%s', ST3);
console.log('  ACTION=%s', process.argv[2]);
console.log('  PATH=%s', process.argv[3]);


switch (process.argv[2]) {
	case 'backup':
		return actions.backup(ST3, path.resolve(process.argv[3]), BAK);
	case 'restore':
		return actions.restore(path.resolve(process.argv[3]), ST3, BAK);
	case 'relink':
		return actions.relink(path.resolve(process.argv[3]), ST3);
	case 'status':
		return actions.status(ST3);
	default:
		return actions.test();
}
