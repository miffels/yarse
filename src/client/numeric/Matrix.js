'use strict';

var InheritableArray = require('../util/InheritableArray');

function Matrix() {
	return InheritableArray.apply(this, arguments);
}

Matrix.prototype = new InheritableArray();
Matrix.prototype.constructor = Matrix;

Matrix.prototype.multiplyWith = function(factor) {
	if(factor instanceof Array) {
		if(factor.length !== this[0].length) {
			throw new Error('Cannot multiply ' + this.length + 'x' + this[0].length + ' with ' + factor.length + 'x' + factor[0].length + ' matrices.');
		} else {
			throw new Error('Matrix multiplication not implemented.');
		}
	}
	var copy = new Matrix();
	for(var i = 0; i < this.length; i++) {
		copy[i] = [];
		for(var j = 0; j < this.length; j++) {
			var result = this[i][j] * factor;
			copy[i][j] = this[i][j] * factor;
		}
	}
	return copy;
};

Matrix.prototype.append = function(otherMatrix) {
	if(!(otherMatrix instanceof Matrix || otherMatrix instanceof Array)) {
		throw new Error('Cannot append objects other than matrices or arrays to matrices.');
	}
	if(otherMatrix.length === 0 && this.length === 0) {
		return [];
	}
	if(otherMatrix[0].length !== this[0].length) {
		throw new Error('Cannot merge matrices of different width.');
	}
	return this.concat(otherMatrix);
};

module.exports = Matrix;