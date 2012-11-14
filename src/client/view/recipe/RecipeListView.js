'use strict';

var JadeListView = require('../JadeListView');
var RecipeListItemView = require('./RecipeListItemView');
var KitchenView = require('../kitchen/KitchenView');
var RecipeList = require('../../model/recipe/RecipeList');

var RecipeListView = JadeListView.extend({
	id: 'recipes',
	typeName: 'RecipeListView',
	folder: 'recipe/',
	lineType: RecipeListItemView,
	dataType: RecipeList,
	kitchenView: null,
	
	initialize: function() {
		JadeListView.prototype.initialize.apply(this, arguments);
		this.kitchenView = new KitchenView({kitchen: this.options.kitchen});
	},
	
	render: function() {
		JadeListView.prototype.render.apply(this, arguments);
		this.kitchenView.render();
	}
});

module.exports = RecipeListView;