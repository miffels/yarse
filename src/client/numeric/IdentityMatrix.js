'use strict';

var Matrix = require('./Matrix');

function IdentityMatrix(size) {
	return Matrix.apply(this).initialize(size);
}

IdentityMatrix.prototype = new Matrix();
IdentityMatrix.prototype.constructor = IdentityMatrix;

IdentityMatrix.prototype.initialize = function(size) {
	if(size < 1) {
		throw new Error('Cannot generate identity matrices of size 0 or lower');
	}
	for(var i = 0; i < size; i++) {
		this[i] = [];
		for(var j = 0; j < size; j++) {
			if(i === j) {
				this[i][j] = 1;
			} else {
				this[i][j] = 0;
			}
		}
	}
	return this;
};

module.exports = IdentityMatrix;
