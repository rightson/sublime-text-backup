# Sublime Text Backup Tool
A lightweight tool for Mac OSX users to backup sublime text 3 settings with minimal efforts.

This tool can help you copy st3 settings to a specific path (like Dropbox or Google Drive).
If you like simple command line tool, this will be your good friend!

### Reventing the wheel?
Since Sublimall is shutdown in Nov, 2014, I created this simple tool for saving my life.

### Prerequisites

NodeJS

### Installation

`$ npm i`

### Usage
`./st3-tool.js <ACTION> <PATH>`

ACTION:

	backup:      back packages to given <PATH>.
	restore:     restore packages from <PATH> to ST3's package location.
	relink:      create symbolic link (backup packages) from <PATH> to ST3's package location.
	status:      check if ST3 package is linked symbolically.

PATH:

	destination location

### Principles
This tool will backup sublime text 3 settings to a specific folder (ex: sub-dirs in Dropbox or Google Drive).
It will then create a symbolic link pointing to the original package location.


### Author
Scott Chen (rightson)