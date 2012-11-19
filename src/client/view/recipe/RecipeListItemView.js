'use strict';

var JadeView = require('../JadeView');
var RecipeDetailView = require('./RecipeDetailView');

var RecipeListItemView = JadeView.extend({
	id: 'recipe',
	typeName: 'RecipeListItemView',
	folder: 'recipe/',
	recipe: null,
	detailView: null,
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.recipe = this.options;
		this.setJadeParameters();
		this.detailView = new RecipeDetailView(this.recipe);
	},
	
	setJadeParameters: function() {
		this.jadeParameters.recipe = this.recipe.attributes;
	},
	
	render: function() {
		this.jadeParameters.id = this.id;
		JadeView.prototype.render.apply(this, arguments);
		this.detailView.render();
	}
});

module.exports = RecipeListItemView;