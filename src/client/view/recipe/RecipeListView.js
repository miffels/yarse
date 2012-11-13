'use strict';

var JadeListView = require('../JadeListView');
var RecipeListItemView = require('./RecipeListItemView');
var RecipeList = require('../../model/recipe/RecipeList');

var RecipeListView = JadeListView.extend({
	id: 'recipes',
	typeName: 'RecipeListView',
	folder: 'recipe/',
	lineType: RecipeListItemView,
	dataType: RecipeList
});

module.exports = RecipeListView;