'use strict'

RecipeIngredientList = require '../../../../src/client/model/ingredient/RecipeIngredientList'
RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'

describe 'RecipeIngredientList', ->
  ingredientList = null
  ingredients = null
  beforeEach ->
    ingredients = [new RecipeIngredient, new RecipeIngredient, new RecipeIngredient]
    ingredients[0].id = '0'
    ingredients[1].id = '1'
    ingredients[2].id = '2'
    ingredientList = new RecipeIngredientList(ingredients)
  
  describe '#filterById', ->
    it 'should return the ingredients specified by the filter', ->
      ingredientList.filterById(['0', '2', 'some id that is definitely not contained']).models.should.eql [ingredients[0], ingredients[2]]