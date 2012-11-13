'use strict';

/*
 * Inspired by https://gist.github.com/807712
 */

var fs = require('fs');

function rmdir(directory) {
	var files = read(directory);
	files && remove(files, directory);
};

function read(directory) {
	try {
		return fs.readdirSync(directory);
	}
	catch(error) {
		if(error.errno !== 34) { // ENOENT, no such directory
			throw e;
		} else {
			console.warn('Warning (module rmdir): Directory ' + directory + ' does not exist and will be skipped.');
		}
	}
}

function remove(files, directory) {
	for(var index in files) {
		unlink(directory + '/' + files[index]);
	}
	fs.rmdirSync(directory);
}

function unlink(file) {
	if (fs.statSync(file).isFile()) {
		console.log('Unlinking ' + file);
		fs.unlinkSync(file);
	} else {
		console.log('Removing ' + file);
		rmdir(file);
	}
}
		
module.exports = rmdir;