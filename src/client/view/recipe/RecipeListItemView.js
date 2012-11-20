'use strict';

var JadeView = require('../JadeView');
var RecipeDetailView = require('./RecipeDetailView');

var RecipeListItemView = JadeView.extend({
	id: 'recipe',
	typeName: 'RecipeListItemView',
	folder: 'recipe/',
	recipe: null,
	detailView: null,
	viewed: false,
	updated: false,
	events: {
		'click .row.recipe': 'onView',
		'click .choose': 'onChoose',
		'hide': 'onDismiss',
		'remove': 'onRemove'
	},
	
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
		
		if(this.recipe.get('ingredients')) {
			this.updated = true;
		}
		console.log('rendered recipe with score ' + this.recipe.score());
	},
	
	onView: function() {
		if(this.recipe.get('ingredients')) {
			this.recipe.view();
			this.viewed = true;
		}
	},
	
	onDismiss: function() {
		if(this.recipe.get('ingredients')) {
			this.recipe.dismiss();
		}
	},
	
	onChoose: function() {
		if(this.recipe.get('ingredients')) {
			this.recipe.choose();
			this.recipe.revokeDismissal();
		}
	},
	
	onRemove: function() {
		if(this.updated && !this.viewed) {
			this.recipe.ignore();
		}
	}
});

module.exports = RecipeListItemView;