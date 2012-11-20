'use strict';

var Collection = require('../Collection');
var Recipe = require('./Recipe');

var RecipeList = Collection.extend({
	typeName: 'RecipeList',
	model: Recipe
});

module.exports = RecipeList;