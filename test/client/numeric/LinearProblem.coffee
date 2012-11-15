'use strict'

LinearProblem = require '../../../src/client/numeric/LinearProblem'
Constraint = require '../../../src/client/numeric/Constraint'

describe 'LinearProblem', ->
	someArray = [1, 2, 7];
	constraint = new Constraint([], [])
	linearProblem = null
	beforeEach ->
		linearProblem = new LinearProblem(someArray, constraint, constraint);
	it 'should have a minimization function', ->
		linearProblem.should.have.property 'objectiveFunction'
		linearProblem.objectiveFunction.should.equal someArray
	it 'should have an inequalityConstraint', ->
		linearProblem.should.have.property 'inequalityConstraint'
		linearProblem.inequalityConstraint.should.equal constraint
	it 'should have an equalityConstraint', ->
		linearProblem.should.have.property 'equalityConstraint'
		linearProblem.equalityConstraint.should.equal constraint