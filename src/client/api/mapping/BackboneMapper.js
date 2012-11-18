'use strict';

var RecipeMapper = require('./RecipeMapper');
var Recipe = require('../../model/recipe/Recipe');
var RecipeList = require('../../model/recipe/RecipeList');
var RecipeIngredientList = require('../../model/ingredient/RecipeIngredientList');

/**
 * @class BackboneMapper
 * @param {RecipeMapper} [recipeMapper] The {@link RecipeMapper} that is used for turning the {@link FatSecret} API return values into Backbone model data
 * @param {RecipeList} [knownIngredients]
 */
function BackboneMapper(recipeMapper, knownIngredients) {
	this.recipeMapper = recipeMapper || new RecipeMapper();
	this.knownIngredients = knownIngredients || new RecipeIngredientList();
	if(!knownIngredients) {
		this.knownIngredients.fetch();
	}
}

/**
 * Takes the result data from the {@link FatSecret} API implementation and turns it into a {@link RecipeList}. A {@link RecipeMapper} is used
 * to turn that data into an array of {@link Recipe} attribute sets, from which then the corresponding {@link Recipe} (and {@link RecipeIngredientList},
 * if applicable) instances are created. Data of already known ingredients will be update and new instances will be created and stored via Backbone.
 * The mapping of single instances is delegated to {@link BackboneMappper#mapRecipe}.
 *
 * @param {Object} rawData Result data from {@link FatSecret#fetchRecipe} or {@link FatSecret#getRecipesFor}
 * @returns {RecipeList} A RecipeList containing the {@link Recipe} instances that were described in the input data
 */
BackboneMapper.prototype.mapRecipes = function(rawData) {
	var recipeAttributes = this.recipeMapper.mapRecipes(rawData);
	var recipeList = new RecipeList();
	
	recipeAttributes.forEach(function(recipeData) {
		recipeList.add(this.mapRecipe(recipeData));
	}.bind(this));
	
	return recipeList;
};

/**
 * Creates a single recipe instance from a single set of {@link FatSecret} recipe data. {@see BackboneMapper#mapRecipes}
 *
 * @param {Object} recipeData A single data set from the {@link FatSecret} recipe data, previously mapped by a {@link RecipeMapper}
 * @returns {Recipe} The recipeData applied to a {@link Recipe} instance, with its ingredients mapped to an {@link RecipeIngredientList}
 */
BackboneMapper.prototype.mapRecipe = function(recipeData) {
	recipeData.ingredients = this.mapIngredients(recipeData.ingredients);
	
	return new Recipe(recipeData);
};

/**
 * Turns the raw ingredient data of a single recipe as it is returned by a {@link RecipeMapper} into an{@link RecipeIngredientList}. Already known
 * ingredients (i.e. those stored in the data store) are loaded and their transient data set, others are newly created. {@see BackboneMapper#mapRecipe}
 *
 * @param {Object} ingredients The raw ingredient data of a single recipe as it is returned by a {@link RecipeMapper}
 * @returns {IngredientList} A list of ingredients, built from the data in the ingredients parameter and the locally stored data
 */
BackboneMapper.prototype.mapIngredients = function(ingredientsData) {
	if(!ingredientsData) { // FatSecret#getRecipesFor does not return ingredients, but #fetchRecipe does
		return;
	}
	
	var recipeIngredientIds = this.getIdsFromIngredientsData(ingredientsData);
	var knownIngredientsInRecipe = this.knownIngredients.filterById(recipeIngredientIds);
	
	return this.createIngredientList(ingredientsData, knownIngredientsInRecipe);
};

/**
 * Iterates through a list of raw {@link RecipeIngredient} data and returns an array containing their IDs.
 *
 * @param {Array} ingredientsData An array containing raw {@link RecipeIngredient} data.
 * @returns {Array} An array containing the ids extracted from the ingredientsData parameter
 */
BackboneMapper.prototype.getIdsFromIngredientsData = function(ingredientsData) {
	var ingredientIds = [];
	ingredientsData.forEach(function(ingredientData) {
		ingredientIds.push(ingredientsData.id);
	}.bind(this));
	return ingredientIds;
};

/**
 * Creates a {@link RecipeIngredientList} from an array of ingredient data as it is returned by a {@link RecipeMapper}. Unknown (not previously persisted)
 * {@link RecipeIngredient} instances are created and have their non-transient data persited; those contained in the knownIngredientsInRecipe
 * {@link RecipeIngredientList} parameter only have their transient data set instead.
 *
 * @param {Array} ingredientsData The raw ingredient data as it is returned by a {@link RecipeMapper}
 * @param {RecipeIngredientList} knownIngredientsInRecipe A {@link RecipeIngredientList} containing the persistent data of ingredients in the recipe that were persisted in a previous call
 * @returns {IngredientList} A list containing a number of {@link Ingredient}s of a single recipe, built from the ingredientsData parameter
 */
BackboneMapper.prototype.createIngredientList = function(ingredientsData, knownIngredientsInRecipe) {
	var ingredientsInRecipe = new RecipeIngredientList();
	ingredientsData.forEach(function(ingredientData) {
		var knownIngredient = knownIngredientsInRecipe.filterById(ingredientData.id);
		if(knownIngredient.length) {
			knownIngredient = knownIngredient.models[0]; // filterById always returns a RecipeIngredientList
			knownIngredient.setTransient(ingredientData);
			ingredientsInRecipe.add(knownIngredient);
		} else {
			ingredientsInRecipe.create(ingredientData);
		}
	});
	return ingredientsInRecipe;
};

module.exports = BackboneMapper;