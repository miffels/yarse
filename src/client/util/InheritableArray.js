'use strict';

/**
 * Use like InheritableArray.call(this, arguments).inherit(subclass);
 */
function InheritableArray() {
	var instance = Object.create(InheritableArray.prototype);
	instance = (Array.apply(instance, arguments) || instance);
	this.injectMethods(instance, this.constructor);
	return instance;
}

InheritableArray.prototype = [];
InheritableArray.prototype.constructor = InheritableArray;

InheritableArray.prototype.injectMethods = function(instance, cls) {
	for(var method in cls.prototype) {
		if(cls.prototype.hasOwnProperty(method)) {
			instance[method] = cls.prototype[method];
		}
	}
};

InheritableArray.prototype.each = function(callback) {
	for(var i = 0; i < this.length; i++) {
		if(typeof callback === 'function') {
				callback(i, this[i]);
		}
	}
};

InheritableArray.prototype.logEach = function() {
	this.each(function(index, value) {
		console.log(JSON.stringify(value) + ' at ' + index);
	});
};

InheritableArray.prototype.toString = function() {
	var string = '[';
	this.each(function(index, value) {
		if(index > 0) {
			string += ',';
		}
		string += value;
	});
	string += ']';
	return string;
};

module.exports = InheritableArray;