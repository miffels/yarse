'use strict';

var Collection = require('../Collection');
var KitchenIngredient = require('./KitchenIngredient');

var KitchenIngredientList = Collection.extend({
	typeName: 'KitchenIngredientList',
	model: KitchenIngredient
});

module.exports = KitchenIngredientList;