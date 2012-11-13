'use strict';

var Model = require('../Model');

var Ingredient = Model.extend({
	typeName: 'Ingredient',
	defaults: {
		name: null,
		imageUrl: null,
		kitchen: null
	}
});

module.exports = Ingredient;