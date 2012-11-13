'use strict';

var Collection = require('../Collection');
var Ingredient = require('./Ingredient');

var IngredientList = Collection.extend({
	typeName: 'IngredientList',
	model: Ingredient
});

module.exports = IngredientList;