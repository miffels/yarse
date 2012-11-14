'use strict';
var $ = require('jquery');

$(document).ready(function() {
	var BodyView = require('../client/view/common/BodyView');
	var NavigationBar = require('../client/view/common/NavigationBar');
	var RecipeListView = require('../client/view/recipe/RecipeListView');
	var Recipe = require('../client/model/recipe/Recipe');
	var RecipeList = require('../client/model/recipe/RecipeList');
	var IngredientsView = require('../client/view/ingredient/IngredientsView');
	var IngredientLoader = require('../client/model/ingredient/IngredientLoader');
	var Kitchen = require('../client/model/kitchen/Kitchen');
	
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
	
	var kitchen = new Kitchen();
	
	var recipeList = new RecipeList([new Recipe({name: "Mashed Potatos"}), new Recipe({name: "Krautsalad"}), new Recipe({name: "DeliSoup"})]);
	var recipeListView = new RecipeListView({
		kitchen: kitchen,
		data: recipeList
	});
	
	var ingredientsView = new IngredientsView({
		kitchen: kitchen,
		data: new IngredientLoader().loadIngredients(kitchen)
	});
	
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