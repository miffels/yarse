'use strict';

var JadeListView = require('../JadeListView');
var Ingredient = require('../../model/ingredient/Ingredient');
var IngredientList = require('../../model/ingredient/IngredientList');
var IngredientCategory = require('../../model/ingredient/IngredientCategory');
var IngredientCategoryList = require('../../model/ingredient/IngredientCategoryList');
var IngredientCategoryView = require('./IngredientCategoryView');
var Kitchen = require('../../model/kitchen/Kitchen');

require('../../util/String');

var IngredientsView = JadeListView.extend({
	id: 'ingredients',
	typeName: 'IngredientsView',
	folder: 'ingredient/',
	lineType: IngredientCategoryView,
	dataType: IngredientCategoryList,
	kitchen: null,
	
	initialize: function() {
		JadeListView.prototype.initialize.apply(this, arguments);
		this.kitchen = new Kitchen({kitchenView: this});
		this.loadIngredients();
		this.jadeParameters.kitchen = this.kitchen;
	},
	
	setSubviewID: function(view) {
		return view;
	},
	
	loadIngredients: function() {
		this.data = this.categories(require('./ingredients.json'));
		this.data.each(this.addView);
	},
	
	categories: function(categories) {
		var ingredientCategories = new IngredientCategoryList();
		for(var key in categories) {
			ingredientCategories.add(new IngredientCategory({
				name: key.nominalize(),
				data: this.list(categories[key], key)
			}));
		}
		return ingredientCategories;
	},
	
	list: function(category, name) {
		var ingredientList = new IngredientList();
		for(var i in category) {
			ingredientList.add(new Ingredient({
				kitchen: this.kitchen,
				name: category[i].nominalize(),
				imageUrl: 'img/' + name + '/' + category[i] + '.jpg'
			}));
		}
		return ingredientList;
	}
});

module.exports = IngredientsView;