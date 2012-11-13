'use strict';

var JadeListView = require('../JadeListView');
var IngredientView = require('./IngredientView');
var IngredientList = require('../../model/ingredient/IngredientList');

var IngredientCategoryView = JadeListView.extend({
	id: 'ingredientCategory',
	typeName: 'IngredientCategoryView',
	folder: 'ingredient/',
	lineType: IngredientView,
	dataType: IngredientList,
	
	initialize: function() {
		JadeListView.prototype.initialize.apply(this, arguments);
		this.id = this.options.attributes.name;
	},
	
	setSubviewID: function(view) {
		return view;
	}
});

module.exports = IngredientCategoryView;