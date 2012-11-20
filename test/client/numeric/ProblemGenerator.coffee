'use strict'

ProblemGenerator = require '../../../src/client/numeric/ProblemGenerator'

describe 'ProblemGenerator', ->
	problemGenerator = null
	
	beforeEach ->
		problemGenerator = new ProblemGenerator
		
	it 'should have the method generateProblemForFirst', ->
		problemGenerator.should.have.property 'generateProblemForFirst'
	it 'should have the method using', ->
		problemGenerator.should.have.property 'using'