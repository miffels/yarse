'use strict';

function LinearProblem(minimizationFunction, inequalityConstraint, equalityConstraint) {
	this.minimizationFunction = minimizationFunction;
	this.equalityConstraint = equalityConstraint;
	this.inequalityConstraint = inequalityConstraint;
}

module.exports = LinearProblem;