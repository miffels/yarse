'use strict';

var ProblemGenerator = require('./ProblemGenerator');

function FindFirstKProblemGenerator() {
	ProblemGenerator.apply(this);
}

FindFirstKProblemGenerator.prototype = new ProblemGenerator();
FindFirstKProblemGenerator.prototype.constructor = FindFirstKProblemGenerator;

FindFirstKProblemGenerator.prototype.generateInequalityConstraintRightHandSide = function(numberOfRecipes) {
	var constraintRightHandSide = [];
	
	for(var i = 0; i < numberOfRecipes; i++) {
		constraintRightHandSide[i] = 1;
		constraintRightHandSide[i + numberOfRecipes] = 0;
	}
	
	return constraintRightHandSide;
};

FindFirstKProblemGenerator.prototype.generateEqualityConstraintRightHandSide = function(numberOfRecipes) {
	var constraintRightHandSide = [];
	
	constraintRightHandSide[0] = this.k;
	
	return constraintRightHandSide;
};

module.exports = FindFirstKProblemGenerator;