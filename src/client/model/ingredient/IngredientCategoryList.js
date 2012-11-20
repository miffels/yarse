'use strict';

var Collection = require('../Collection');
var IngredientCategory = require('./IngredientCategory');

var IngredientCategoryList = Collection.extend({
	typeName: 'IngredientCategoryList',
	model: IngredientCategory
});

module.exports = IngredientCategoryList;