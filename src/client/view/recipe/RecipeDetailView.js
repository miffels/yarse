'use strict';

var JadeView = require('../JadeView');
var $ = require('jquery');

var RecipeDetailView = JadeView.extend({
	typeName: 'RecipeDetailView',
	folder: 'recipe/',
	recipe: null,
	initial: true,
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.recipe = this.options;
		this.jadeParameters.recipe = this.recipe.attributes;
	},
	
	render: function() {
		this.jadeParameters.id = this.id;
		//JadeView.prototype.render.apply(this, arguments);
		$('#'+this.id).html(this.html());
		if(this.initial) {
			$('#' + this.id).modal({backdrop: true, show: false});
			this.initial = false;
		}
	}
});

module.exports = RecipeDetailView;