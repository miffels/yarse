'use strict'

ProblemGenerator = require '../../../src/client/numeric/ProblemGenerator'

describe 'ProblemGenerator', ->
	problemGenerator = null
	recipes = [
		{'score': 1},
		{'score': 2},
		{'score': 0},
		{'score': 1},
		{'score': 4},
		{'score': 0},
		{'score': 3},
		{'score': 4},
		{'score': 9}
	]
	
	beforeEach ->
		problemGenerator = new ProblemGenerator
		
	it 'should have the method generateProblemForFirst', ->
		problemGenerator.should.have.property 'generateProblemForFirst'
	it 'should have the method using', ->
		problemGenerator.should.have.property 'using'
	it 'should have the method classify', ->
		problemGenerator.should.have.property 'classify'
	it 'should have the method calculateMali', ->
		problemGenerator.should.have.property 'calculateMali'
	
	describe '#classify', ->
		it 'should classify correctly', ->
			JSON.stringify(problemGenerator.classify(recipes)).should.eql '[[8],[4,7],[6],[1],[0,3],[2,5]]';
	describe '#calculateMali', ->
		it 'should calculate the mali per lass correctly', ->
			clusters = problemGenerator.classify(recipes)
			problemGenerator.calculateMali(clusters).should.eql [0,0,1,1,1,2]
	describe '#degradetedRecipes', ->
		it 'should degradate recipes properly', ->
			problemGenerator.degradatedRecipes(recipes).should.eql [{"score":0},{"score":1},{"score":-2},{"score":-1},{"score":4},{"score":-3},{"score":2},{"score":3},{"score":9}]