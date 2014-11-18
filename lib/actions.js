var path = require('path');
var util = require('util');
var targz = require('tar.gz');
var utils = require('./utils');
var Sublime3Packages = require('./subl');

exports.backup = function (src, dest, bak) {
	var source = new Sublime3Packages(src);
	var target = new Sublime3Packages(dest);

	if (utils.fileExists(bak)) {
		return console.log('Sublime Text 3 has been backup!');
	}

	console.log('Creating backup file...');
	new targz().compress(src, bak, function(err){
	    if (err) {
	        throw err;
	    }
	    console.log('Backup file is saved to %s', bak);

	    source.moveTo(target);
		target.symlinkTo(source);

		console.log('Backup completed!');
	});
};

exports.restore = function (src, dest, bak) {
	if (!utils.fileExists(dest)) {
		throw util.format('source "%s" does not exist', src);
	}

	var source = new Sublime3Packages(src);
	var target = new Sublime3Packages(dest);

	target.wipeSymblokcLinks();
	source.moveTo(target);
	utils.fileDelete(bak);
	utils.fileDelete(src);
	console.log('Restore completed!');
};

exports.relink = function (src, dest) {
	if (!utils.fileExists(src)) {
		throw util.format('source "%s" does not exist', src);
	}

	var source = new Sublime3Packages(src);
	var target = new Sublime3Packages(dest);

	target.wipeSymblokcLinks();
	source.symlinkTo(target);
};

exports.test = function () {
	console.log('Invalid <ACTION>');
};
