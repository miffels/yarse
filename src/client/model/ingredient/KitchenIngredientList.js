'use strict';

var KitchenIngredient = require('./KitchenIngredient');
var IngredientList = require('./IngredientList');

var KitchenIngredientList = IngredientList.extend({
	typeName: 'KitchenIngredientList',
	model: KitchenIngredient
});

module.exports = KitchenIngredientList;