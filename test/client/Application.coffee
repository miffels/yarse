Application = require '../../src/client/Application'
Recipe = require '../../src/client/model/recipe/Recipe'
RecipeList = require '../../src/client/model/recipe/RecipeList'

describe 'Application', ->
	application = null
	beforeEach ->
		application = new Application
		application.recipes = new RecipeList
		recipe = new Recipe
		recipe.score = -> return 2
		application.recipes.add recipe
		recipe = new Recipe
		recipe.score = -> return 1
		application.recipes.add recipe
		
	describe '#bestRecipesUsingSort', ->
		it 'should sort the recipes and return the best k', ->
			application.numberOfResults = 1
			recipes = application.bestRecipesUsingSort()
			recipes.length.should.equal 1
			recipes.models[0].score().should.equal 2
			
		it 'should sort the recipes and return all if k > recipes.length', ->
			application.numberOfResults = 10
			recipes = application.bestRecipesUsingSort()
			recipes.length.should.equal 2
			recipes.models[0].score().should.equal 1
			recipes.models[1].score().should.equal 2