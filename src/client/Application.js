'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var FatSecret = require('./api/fatsecret/FatSecret');
var BackboneMapper = require('./api/mapping/BackboneMapper');

var FindFirstKProblemGenerator = require('./numeric/FindFirstKProblemGenerator');
var LinearSolver = require('./numeric/LinearSolver');

var RecipeList = require('./model/recipe/RecipeList');

function Application() {
	var Kitchen = require('./model/kitchen/Kitchen');
	this.kitchen = new Kitchen();
	
	this.fatSecret = new FatSecret();
	this.mapper = new BackboneMapper();
	this.callId = 0;
	
	this.problemGenerator = new FindFirstKProblemGenerator();
	this.linearSolver = new LinearSolver();
	this.numberOfResults = 10;
	
	Backbone.Events.bind('kitchenChanged', this.onKitchenChange, this);
	Backbone.Events.bind('refresh', this.onKitchenChange, this);
}

Application.prototype.start = function() {
	this.loadCustomJQueryEvents();
	this.initializeUserInterface();
};

Application.prototype.loadCustomJQueryEvents = function() {
	$.event.special.remove = {
		remove: function(o) {
			if (o.handler) {
				o.handler();
			}
		}
	};
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
	if(this.kitchen.get('ingredients').length) {
		clearTimeout(this.currentQuery);
		this.currentQuery = setTimeout(Application.prototype.queryFatSecret.bind(this), 2000, ++this.callId);
		this.recipeListView.setLoading(true);
	} else {
		this.recipeListView.clear();
	}
};

Application.prototype.queryFatSecret = function(callId) {
	this.fatSecret.getRecipesFor(this.kitchen, this.onSearchResult.bind(this), callId);
};

Application.prototype.onSearchResult = function(results, callId) {
	if(callId < this.callId) { // Dismiss results if another call was started
		return;
	}
	this.recipes = this.mapper.mapRecipes(results);
	this.numberOfRecipes = this.recipes.length;
	this.recipesFetched = 0;
	
	this.recipes.each(function(recipe) {
		this.fatSecret.fetchRecipe(recipe.get('id'), function(result, callId) {
			this.onDetailData(result, recipe, callId);
		}.bind(this), callId);
	}.bind(this));
};

Application.prototype.onDetailData = function(result, recipe, callId) {
	if(callId < this.callId) { // Dismiss results if another call was started
		return;
	}
	if(result.error) {
		this.numberOfRecipes--;
	} else {
		var recipeData = this.mapper.mapRecipes(result).models[0].attributes;
		recipeData['kitchen'] = this.kitchen;
		for(var key in recipeData) {
			recipe.set(key, recipeData[key]);
		}
		recipe.calculateKitchenOverlap();
		this.recipesFetched++;
		console.log('Fetched recipe id ' + recipe.get('id') + ' (' + this.recipesFetched + ' out of ' + this.numberOfRecipes + ')');
	}
	
	if(this.recipesFetched === this.numberOfRecipes) {
		this.loadingFinished();
	}
};

Application.prototype.loadingFinished = function() {
	console.log('Loading finished.');
	this.recipeListView.setLoading(false);
	var recipes = this.bestRecipesUsingSort();
	this.recipeListView.addItems(recipes);
	this.recipeListView.render();
};

Application.prototype.bestRecipesUsingLP = function() {
	var problem = this.problemGenerator.generateProblemForFirst(this.numberOfResults).using(this.recipes);
	var solution = this.linearSolver.solve(problem);
	var bestRecipes = new RecipeList();
	solution.forEach(function(isGood, index) {
		if(isGood) {
			bestRecipes.add(this.recipes.models[index]);
		}
	}.bind(this));
	return bestRecipes;
};

Application.prototype.bestRecipesUsingSort = function() {
	return new RecipeList(this.recipes.models.sort(function(a, b){
		return a.score()-b.score();
	}).slice(-this.numberOfResults).reverse());
};

module.exports = Application;