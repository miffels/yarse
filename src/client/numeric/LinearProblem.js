'use strict';

function LinearProblem(objectiveFunction, inequalityConstraint, equalityConstraint) {
	this.objectiveFunction = objectiveFunction;
	this.equalityConstraint = equalityConstraint;
	this.inequalityConstraint = inequalityConstraint;
}

module.exports = LinearProblem;