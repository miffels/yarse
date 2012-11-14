'use strict';

var JadeListView = require('../JadeListView');
var IngredientCategoryList = require('../../model/ingredient/IngredientCategoryList');
var IngredientCategoryView = require('./IngredientCategoryView');

require('../../util/String');

var IngredientsView = JadeListView.extend({
	id: 'ingredients',
	typeName: 'IngredientsView',
	folder: 'ingredient/',
	lineType: IngredientCategoryView,
	dataType: IngredientCategoryList,
	
	initialize: function() {
		this.data = new this.dataType();
		this.data.fetch();
		JadeListView.prototype.initialize.apply(this, arguments);
	},
	
	setSubviewID: function(view) {
		return view;
	}
});

module.exports = IngredientsView;