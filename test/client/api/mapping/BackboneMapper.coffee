'use strict'

BackboneMapper = require '../../../../src/client/api/mapping/BackboneMapper'
RecipeIngredientList = require '../../../../src/client/model/ingredient/RecipeIngredientList'
RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'

describe 'BackboneMapper', ->
  mapper = null
  recipeSearchData = null
  knownIngredients = null
  ingredientsSearchData = null
  beforeEach ->
    recipeSearchData = [{description: 'description', id: 'id', name: 'name'}]
    ingredientsSearchData = [{id: '1'}, {id: '2'}, {id: '3'}]
    mapper = new BackboneMapper({
      mapRecipes: (rawData) ->
        rawData
    })
    knownIngredients = new RecipeIngredientList()
    knownIngredients.add(new RecipeIngredient({id: '1'}))
  
  describe '#mapRecipes', ->
    it 'should the RecipeMapper data into Backbone models', ->
      model = mapper.mapRecipes(recipeSearchData).models[0]
      model.get('description').should.equal 'description'
      model.get('id').should.equal 'id'
      model.get('name').should.equal 'name'
      
  describe '#createIngredientList', ->
    it 'should add new ingredients to the local storage and not those that it assumes are known', ->
      knownIngredientsInRecipe = new RecipeIngredientList([new RecipeIngredient({id: '1'})])
      ingredients = mapper.createIngredientList(ingredientsSearchData, knownIngredientsInRecipe)
      ingredients.length.should.eql 3
      ingredients.fetch()
      ingredients.length.should.equal 2