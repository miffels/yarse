'use strict';

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.nominalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};