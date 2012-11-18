'use strict';

var JadeView = require('../JadeView');

var RecipeListItemView = JadeView.extend({
	id: 'recipe',
	typeName: 'RecipeListItemView',
	folder: 'recipe/',
	recipe: null,
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.recipe = this.options;
		this.setJadeParameters();
	},
	
	setJadeParameters: function() {
		this.jadeParameters.recipe = this.recipe.attributes;
		console.log(this.jadeParameters.recipe);
	}
});

module.exports = RecipeListItemView;