'use strict'

BackboneMapper = require '../../../../src/client/api/mapping/BackboneMapper'
RecipeIngredientList = require '../../../../src/client/model/ingredient/RecipeIngredientList'
RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'
LocalStorage = require '../../../../src/client/model/Backbone.localStorage'

describe 'BackboneMapper', ->
	mapper = null
	recipeSearchData1 = null
	recipeSearchData2 = null
	recipesSearchData = null
	knownIngredients = null
	ingredientsSearchData = null
	beforeEach ->
		recipeSearchData1 = {description: 'description1', id: 'id1', name: 'name1'}
		recipeSearchData2 = {description: 'description2', id: 'id2', name: 'name2'}
		recipesSearchData = [recipeSearchData1, recipeSearchData2]
		ingredientsSearchData = [{id: '1'}, {id: '2'}, {id: '3'}]
		mapper = new BackboneMapper({
			mapRecipes: (rawData) ->
				rawData
		})
		knownIngredients = new RecipeIngredientList()
		knownIngredients.add(new RecipeIngredient({id: '1'}))
		
	describe '#getIdsFromIngredientsData', ->
		it 'should extract the ids of ingredients from a an array of RecipeMapper ingredient data', ->
			mapper.getIdsFromIngredientsData(ingredientsSearchData).should.eql ['1', '2', '3']
		
	describe '#createIngredientList', ->
		it 'should add new ingredients to the local storage and not those that it assumes are known', ->
			knownIngredientsInRecipe = new RecipeIngredientList([new RecipeIngredient({id: '1'})])
			ingredients = mapper.createIngredientList(ingredientsSearchData, knownIngredientsInRecipe)
			ingredients.length.should.equal 3
			ingredients.fetch()
			ingredients.length.should.equal 2
	
	describe '#mapRecipes', ->
		it 'should the RecipeMapper data into Backbone models', ->
			model = mapper.mapRecipes([recipeSearchData1]).models[0]
			model.get('description').should.equal 'description1'
			model.get('id').should.equal 'id1'
			model.get('name').should.equal 'name1'
		
		it 'should share ingredient instances between recipes', ->
			recipesSearchData[0].ingredients = [{id: '1'}, {id: '3'}]
			recipesSearchData[1].ingredients = [{id: '1'}, {id: '2'}]
			recipes = mapper.mapRecipes(recipesSearchData).models
			ingredients1 = recipes[0].attributes.ingredients.models
			ingredients2 = recipes[1].attributes.ingredients.models
			ingredients1[0].should.equal ingredients2[0]
			ingredients1[1].should.not.equal ingredients2[1]