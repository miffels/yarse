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
	
	setSubviewID: function(view) {
		return view;
	}
});

module.exports = IngredientsView;