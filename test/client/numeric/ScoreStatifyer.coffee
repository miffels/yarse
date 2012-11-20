'use strict'

Recipe = require '../../../src/client/model/recipe/Recipe'
RecipeList = require '../../../src/client/model/recipe/RecipeList'
ScoreStatifyer = require '../../../src/client/numeric/ScoreStatifyer'

describe 'RecipeList', ->
	scoreStatifyer = null
	recipeList = null
	beforeEach ->
		recipeList = new RecipeList([new Recipe({rating: 1}), new Recipe({rating: 2}), new Recipe({rating: 3})])
		scoreStatifyer = new ScoreStatifyer
	describe '#score', ->
		it 'should return an array of the score values of its recipes', ->
			scoreStatifyer.statify(recipeList).should.eql [1, 2, 3]