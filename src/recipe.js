'use strict';

if(typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function() {
	function Recipe(name) {
		this.name = name;
	}
	
	return Recipe;
});