'use strict';
var $ = require('jquery');

$(document).ready(function() {
	var BodyView = require('../client/view/common/BodyView');
	var NavigationBar = require('../client/view/common/NavigationBar');
	var RecipeListView = require('../client/view/recipe/RecipeListView');
	var Recipe = require('../client/model/recipe/Recipe');
	var RecipeList = require('../client/model/recipe/RecipeList');
	var IngredientsView = require('../client/view/ingredient/IngredientsView');
	var IngredientCategoryView = require('../client/view/ingredient/IngredientsView');
	var Ingredient = require('../client/model/ingredient/Ingredient');
	var IngredientList = require('../client/model/ingredient/IngredientList');
	var IngredientCategory = require('../client/model/ingredient/IngredientCategory');
	var IngredientCategoryList = require('../client/model/ingredient/IngredientCategoryList');
	
	var navigationBarContents = {
				pageTitle: 'yarse',
				items: [
					{
						href: 'ingredients',
						text: 'Ingredients',
						content: 'Ingredient grid goes here!'
					},{
						href: 'recipes',
						text: 'Recipes',
						content: 'Recipe search result list goes here!'
					},{
						href: 'about',
						text: 'About',
						content: 'Project meta info goes here!'
					}
				]
	};

	var bodyView = new BodyView();
	var navigationBar = new NavigationBar({
			jadeParameters: navigationBarContents
	});
	
	var recipeList = new RecipeList([new Recipe({name: "Mashed Potatos"}), new Recipe({name: "Krautsalad"}), new Recipe({name: "DeliSoup"})]);
	var recipeListView = new RecipeListView({
		data: recipeList
	});
	
	var ingredientsView = new IngredientsView();
	
	bodyView.addSubview(navigationBar);
	bodyView.addSubview(recipeListView);
	bodyView.addSubview(ingredientsView);
	
	bodyView.render();
	
	$('[rel=tooltip]').tooltip();
	
	/*
	recipeList.clear();
	
	recipeList.addItem(new Recipe());
	
	recipeList.render();
	*/
	
});