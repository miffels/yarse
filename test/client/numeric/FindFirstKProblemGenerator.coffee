'use strict'

FindFirstKProblemGenerator = require '../../../src/client/numeric/FindFirstKProblemGenerator'
RecipeList = require '../../../src/client/model/recipe/RecipeList'
Recipe = require '../../../src/client/model/recipe/Recipe'

describe 'FindFirstKProblemGenerator', ->
	recipes = null
	beforeEach ->
		recipes = new RecipeList([new Recipe({rating: 3}), new Recipe({rating: 4}), new Recipe({rating: 1})])
	k = 2;
	problemGenerator = null
	beforeEach ->
		problemGenerator = new FindFirstKProblemGenerator
	describe '#using', ->
		it 'should generate a proper problem with an array of recipes', ->
			sortingProblem = problemGenerator.generateProblemForFirst(k).using recipes
			sortingProblem.objectiveFunction.should.eql [-3, -4, -1]
			sortingProblem.inequalityConstraint.leftHandSide.should.eql [[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]]
			sortingProblem.inequalityConstraint.rightHandSide.should.eql [1, 1, 1, 0, 0, 0]
			sortingProblem.equalityConstraint.leftHandSide.should.eql [[1, 1, 1]]
			sortingProblem.equalityConstraint.rightHandSide.should.eql [k]