'use strict'

KitchenIngredientList = require '../../../../src/client/model/ingredient/KitchenIngredientList'
KitchenIngredient = require '../../../../src/client/model/ingredient/KitchenIngredient'

describe 'RecipeIngredientList', ->
  ingredientList = null
  ingredients = null
  beforeEach ->
    ingredients = [new KitchenIngredient, new KitchenIngredient, new KitchenIngredient]
    ingredients[0].set('name', '00')
    ingredients[1].set('name', '01')
    ingredients[2].set('name', '02')
    ingredientList = new KitchenIngredientList(ingredients)
  
  describe '#filterByName', ->
    it 'should return the ingredients whose name contains a name specififed in the filter', ->
      ingredientList.filterByName(['1', '02', 'some name that is definitely not contained']).models.should.eql [ingredients[1], ingredients[2]]