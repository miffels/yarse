'use strict';

var JadeListView = require('../JadeListView');
var KitchenIngredientView = require('./KitchenIngredientView');
var KitchenIngredientList = require('../../model/ingredient/KitchenIngredientList');

var IngredientCategoryView = JadeListView.extend({
	id: 'ingredientCategory',
	typeName: 'IngredientCategoryView',
	folder: 'ingredient/',
	lineType: KitchenIngredientView,
	dataType: KitchenIngredientList,
	
	initialize: function() {
		JadeListView.prototype.initialize.apply(this, arguments);
		this.id = this.options.attributes.name;
	},
	
	setSubviewID: function(view) {
		return view;
	}
});

module.exports = IngredientCategoryView;