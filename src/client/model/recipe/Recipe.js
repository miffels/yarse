'use strict';

var Model = require('../Model');

var Recipe = Model.extend({
	typeName: 'Recipe',
	defaults: {
		name: null
	}
});

module.exports = Recipe;