'use strict'

RecipeIngredientList = require '../../../../src/client/model/ingredient/RecipeIngredientList'
RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'

describe 'RecipeIngredientList', ->
	ingredientList = null
	ingredients = null
	beforeEach ->
		ingredients = [new RecipeIngredient, new RecipeIngredient, new RecipeIngredient]
		ingredients[0].set('id', '0')
		ingredients[1].set('id', '1')
		ingredients[2].set('id', '2')
		ingredients[0].setTransient({'name': '00'})
		ingredients[1].setTransient({'name': '01'})
		ingredients[2].setTransient({'name': '02'})
		ingredientList = new RecipeIngredientList(ingredients)
	
	describe '#filterById', ->
		it 'should return the ingredients specified by the filter', ->
			ingredientList.filterById(['0', '2', 'some id that is definitely not contained']).models.should.eql [ingredients[0], ingredients[2]]
	
	describe '#filterByName', ->
		it 'should return the ingredients whose name contains a name specififed in the filter', ->
			ingredientList.filterByName(['1', '02', 'some name that is definitely not contained']).models.should.eql [ingredients[1], ingredients[2]]