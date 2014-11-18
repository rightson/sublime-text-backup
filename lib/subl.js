var path = require('path');
var utils = require('./utils');

module.exports = function Sublime3Packages (basedir) {
	var pkgs = path.join(basedir, 'Packages');
	var ipkgs = path.join(basedir, 'Installed Packages');

	return {
		getPackages: function() {
			return {
				pkgs: pkgs,
				ipkgs: ipkgs
			}
		},
		exists: function () {
			return utils.fileExists(pkgs) && utils.fileExists(ipkgs);
		},
		moveTo: function (dest) {
			utils.fileMove(pkgs, dest.getPackages().pkgs);
			utils.fileMove(ipkgs, dest.getPackages().ipkgs);
		},
		symlinkTo: function (dest) {
			utils.deleteSymbolicLink(dest.getPackages().pkgs)
			utils.deleteSymbolicLink(dest.getPackages().ipkgs)

			utils.createSymlink(pkgs, dest.getPackages().pkgs);
			utils.createSymlink(ipkgs, dest.getPackages().ipkgs);
		},
		wipeSymblokcLinks: function () {
			utils.deleteSymbolicLink(pkgs);
			utils.deleteSymbolicLink(ipkgs);
		},
		containsSymblokcLink: function () {
			return utils.isSymbolicLink(pkgs) || utils.isSymbolicLink(pkgs);
		}
	}
};
