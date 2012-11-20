'use strict'

Constraint = require '../../../src/client/numeric/Constraint'
LinearProblem = require '../../../src/client/numeric/LinearProblem'
LinearSolver = require '../../../src/client/numeric/LinearSolver'

describe 'LinearSolver', ->
	minimizationFunction = [-3, -4, -5]
	inequalityConstraint = new Constraint([[1,0,0],[0,1,0],[0,0,1],[-1,0,0],[0,-1,0],[0,0,-1]], [2,2,2,0,0,0])
	equalityConstraint = new Constraint([[1,1,1]], [3])
	linearProblem = new LinearProblem(minimizationFunction, inequalityConstraint, equalityConstraint)
	linearSolver = new LinearSolver
	it 'should have the method solve', ->
		linearSolver.should.have.property 'solve'
	describe '#solve', ->
		it 'should solve properly', ->
			linearSolver.solve(linearProblem).should.eql [0, 1, 2]