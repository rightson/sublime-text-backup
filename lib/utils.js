var path = require('path');
var fs = require('fs');
var util = require('util');
var mkdirp = require('mkdirp').sync;

module.exports = {
	fileExists: fileExists,
	fileMove: fileMove,
	fileDelete: fileDelete,
	isSymbolicLink: isSymbolicLink,
	createSymlink: createSymlink,
	deleteSymbolicLink: deleteSymbolicLink,
};

function fileExists (file) {
	return fs.existsSync(file);
}

function fileMove (src, dst) {
	if (!fs.existsSync(src)) {
		throw util.format('Error: source location "%s" does not exist!', src);
	}

	mkdirp(dst);

	console.log('Move %s to %s', src, dst);
	fs.renameSync(src, dst);
}

function fileDelete (file) {
	if (fileExists(file)) {
		try {
			fs.unlinkSync(file);
		} catch (err) {
			console.log('Warning: cannot remove file "%s"', file);
		}
	}
}

function createSymlink (src, dst) {
	if (!fs.existsSync(src)) {
		throw util.format('Error: source location "%s" does not exist!', src);
	}

	console.log('Symbolic link "%s" to "%s" is created', src, dst);
	fs.symlinkSync(src, dst);
}

function isSymbolicLink (file) {
	if (!fs.existsSync(file)) {
		return false;
	}
	var stat = fs.lstatSync(file)
	return stat.isSymbolicLink();
}

function deleteSymbolicLink (file) {
	if (isSymbolicLink(file)) {
		fs.unlinkSync(file);
	}
}
