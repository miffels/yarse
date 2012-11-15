'use strict';

var Constraint = require('./Constraint');
var LinearProblem = require('./LinearProblem');

function LinearSolver(numeric) {
	this.numeric = numeric ? numeric : require('../../../lib/numeric');
	this.epsilon = 1e-2;
}

LinearSolver.prototype.solve = function(linearProblem) {
	if(!(linearProblem instanceof LinearProblem)) {
		throw new Error('Argument of type ' + linearProblem.constructor.name + ' ist not a LinearProblem');
	}
	var solution = this.numeric.solveLP(
		linearProblem.objectiveFunction,
		linearProblem.inequalityConstraint.leftHandSide,
		linearProblem.inequalityConstraint.rightHandSide,
		linearProblem.equalityConstraint.leftHandSide,
		linearProblem.equalityConstraint.rightHandSide);
	if(solution.message !== '') {
		throw new Error('Problem could not be solved: ' + solution.message);
	}
	return this.numeric.trunc(solution.solution, this.epsilon);
};

module.exports = LinearSolver;