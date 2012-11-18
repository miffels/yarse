'use strict';

/*global require:true */
require = require('enhanced-require')(module, {
	recursive: true
});
var Backbone = require('backbone');
var $ = require('jquery');
var FatSecret = require('./api/fatsecret/FatSecret');

function Application() {
	var Kitchen = require('./model/kitchen/Kitchen');
	this.kitchen = new Kitchen();
	this.fatSecret = new FatSecret();
	Backbone.Events.bind('kitchenChanged', this.onKitchenChange);
}

Application.prototype.start = function() {
	this.initializeUserInterface();
};

Application.prototype.initializeUserInterface = function() {
	var BodyView = require('./view/common/BodyView');
	var bodyView = new BodyView();
	
	this.initializeIngredientDatabase();
	
	bodyView.addSubview(this.buildNavigationBar());
	bodyView.addSubview(this.buildRecipeList());
	bodyView.addSubview(this.buildIngredientsGrid());
	
	bodyView.render();
	
	this.enableTooltips();
};

Application.prototype.initializeIngredientDatabase = function() {
	var IngredientLoader = require('./model/ingredient/IngredientLoader');
	window.localStorage.clear();
	new IngredientLoader().loadToLocalStore();
};

Application.prototype.buildNavigationBar = function() {
	var NavigationBar = require('./view/common/NavigationBar');
	var navigationBar = new NavigationBar({
			jadeParameters: require('./viewData.json')
	});
	return navigationBar;
};

Application.prototype.buildRecipeList = function() {
	var RecipeListView = require('./view/recipe/RecipeListView');
	var Recipe = require('./model/recipe/Recipe');
	var RecipeList = require('./model/recipe/RecipeList');
	
	var recipeList = new RecipeList([
		new Recipe({name: 'Mashed Potatos', kitchen:this.kitchen}),
		new Recipe({name: 'Krautsalad', kitchen:this.kitchen}),
		new Recipe({name: 'DeliSoup', kitchen:this.kitchen})
	]);
	var recipeListView = new RecipeListView({
		data: recipeList
	});
	return recipeListView;
};

Application.prototype.buildIngredientsGrid = function() {
	var IngredientsView = require('./view/ingredient/IngredientsView');
	var ingredientsView = new IngredientsView();
	return ingredientsView;
};

Application.prototype.enableTooltips = function() {
	$('[rel=tooltip]').tooltip();
};

Application.prototype.onKitchenChange = function(kitchen) {
	console.log('Kitchen changed, we\'d better load the recipes now!');
};

module.exports = Application;