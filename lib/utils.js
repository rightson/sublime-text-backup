var path = require('path');
var fs = require('fs');
var util = require('util');
var mkdirp = require('mkdirp').sync;

var fileExists = exports.fileExists = function (file) {
	return fs.existsSync(file);
}

var fileMove = exports.fileMove = function (src, dst) {
	if (!fs.existsSync(src)) {
		throw util.format('Error: source location "%s" does not exist!', src);
	}

	mkdirp(dst);

	console.log('Move %s to %s', src, dst);
	fs.renameSync(src, dst);
}

var fileDelete = exports.fileDelete = function (file) {
	if (fileExists(file)) {
		try {
			fs.unlinkSync(file);
		} catch (err) {
			console.log('Warning: cannot remove file "%s"', file);
		}
	}
}

var createSymlink = exports.createSymlink = function (src, dst) {
	if (!fs.existsSync(src)) {
		throw util.format('Error: source location "%s" does not exist!', src);
	}

	console.log('Symbolic link "%s" to "%s" is created', src, dst);
	fs.symlinkSync(src, dst);
}

var isSymbolicLink = exports.isSymbolicLink = function (file) {
	if (!fs.existsSync(file)) {
		return false;
	}
	var stat = fs.lstatSync(file)
	return stat.isSymbolicLink();
}

var deleteSymbolicLink = exports.deleteSymbolicLink = function (file) {
	if (isSymbolicLink(file)) {
		fs.unlinkSync(file);
	}
}

var resolveSymbolicLink = exports.resolveSymbolicLink = function (file) {
	if (!fs.existsSync(file)) {
		return false;
	}

	if (isSymbolicLink(file)) {
		return fs.readlinkSync(file);
	}
}
