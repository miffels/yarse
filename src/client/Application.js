'use strict';

/*global require:true */
require = require('enhanced-require')(module, {
	recursive: true
});
var Backbone = require('backbone');
var $ = require('jquery');
var FatSecret = require('./api/fatsecret/FatSecret');
var BackboneMapper = require('./api/mapping/BackboneMapper');

function Application() {
	var Kitchen = require('./model/kitchen/Kitchen');
	this.kitchen = new Kitchen();
	this.fatSecret = new FatSecret();
	this.mapper = new BackboneMapper();
	this.callId = 0;
	Backbone.Events.bind('kitchenChanged', this.onKitchenChange, this);
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
	
	var recipeListView = new RecipeListView();
	this.recipeListView = recipeListView;
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
	clearTimeout(this.currentQuery);
	this.currentQuery = setTimeout(Application.prototype.queryFatSecret.bind(this), 2000, ++this.callId);
	this.recipeListView.setLoading(true);
};

Application.prototype.queryFatSecret = function(callId) {
	this.fatSecret.getRecipesFor(this.kitchen, this.onSearchResult.bind(this), callId);
};

Application.prototype.onSearchResult = function(results, callId) {
	if(callId < this.callId) { // Dismiss results if another call was started
		return;
	}
	this.recipeListView.setLoading(false);
	var recipes = this.mapper.mapRecipes(results);
	this.recipeListView.addItems(recipes);
	this.recipeListView.render();
	
	var recipe = recipes.models[0];
	this.fatSecret.fetchRecipe(recipe.get('id'), function(result, callId) {
		this.onDetailData(result, recipe, callId);
	}.bind(this), callId);
};

Application.prototype.onDetailData = function(result, recipe, callId) {
	if(callId < this.callId) { // Dismiss results if another call was started
		return;
	}
	var recipeData = this.mapper.mapRecipes(result).models[0].attributes;
	recipe.set(recipeData);
	this.recipeListView.dataViewMap[recipe].render();
};

module.exports = Application;