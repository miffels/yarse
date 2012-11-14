'use strict';

var JadeView = require('../JadeView');

var RecipeListItemView = JadeView.extend({
	id: 'recipe',
	typeName: 'RecipeListItemView',
	folder: 'recipe/',
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.jadeParameters.recipe = this.options.attributes;
		this.jadeParameters.ingredientsFromKitchen = this.options.ingredientsFromKitchen();
	}
});

module.exports = RecipeListItemView;