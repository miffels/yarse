'use strict';

var JadeListView = require('../JadeListView');
var RecipeListItemView = require('./RecipeListItemView');
var KitchenView = require('../kitchen/KitchenView');
var RecipeList = require('../../model/recipe/RecipeList');

var $ = require('jquery');
var spin = require('../../../../lib/spin');
//$.fn.spin = spin;

var RecipeListView = JadeListView.extend({
	id: 'recipes',
	typeName: 'RecipeListView',
	folder: 'recipe/',
	lineType: RecipeListItemView,
	dataType: RecipeList,
	kitchenView: null,
	spinnerId: 'recipeListSpinner',
	contentId: 'recipeListContent',
	
	initialize: function() {
		JadeListView.prototype.initialize.apply(this, arguments);
		this.kitchenView = new KitchenView({kitchen: this.options.kitchen});
	},
	
	render: function() {
		this.jadeParameters.spinnerId = this.spinnerId;
		this.jadeParameters.contentId = this.contentId;
		JadeListView.prototype.render.apply(this, arguments);
		this.kitchenView.$el = this.$('#selectedIngredients');
		this.kitchenView.render();
	},
	
	setLoading: function(loading) {
		if(loading) {
			this.clear();
			$('#' + this.contentId).addClass('hidden');
			$('#' + this.spinnerId).removeClass('hidden');
			$('#' + this.spinnerId).spin({left: 0, top: 0});
		} else {
			$('#' + this.contentId).removeClass('hidden');
			$('#' + this.spinnerId).addClass('hidden');
			$('#' + this.spinnerId).spin(false);
		}
	},
	
	setSubviewID: function(subview) {
		var view = JadeListView.prototype.setSubviewID.apply(this, arguments);
		view.detailView.id =  view.id + 'Detail';
		return view;
	}
});

module.exports = RecipeListView;