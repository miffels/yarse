'use strict';

var ProblemGenerator = require('./ProblemGenerator');

function SortFirstKProblemGenerator() {
	ProblemGenerator.apply(this);
}

SortFirstKProblemGenerator.prototype = new ProblemGenerator();
SortFirstKProblemGenerator.prototype.constructor = SortFirstKProblemGenerator;

SortFirstKProblemGenerator.prototype.generateInequalityConstraintRightHandSide = function(numberOfRecipes) {
	var constraintRightHandSide = [];
	
	for(var i = 0; i < numberOfRecipes; i++) {
		constraintRightHandSide[i] = this.k;
		constraintRightHandSide[i + numberOfRecipes] = 0;
	}
	
	return constraintRightHandSide;
};

SortFirstKProblemGenerator.prototype.generateEqualityConstraintRightHandSide = function(numberOfRecipes) {
	var constraintRightHandSide = [];
	
	constraintRightHandSide[0] = this.k*(this.k+1)/2;
	
	return constraintRightHandSide;
};


module.exports = SortFirstKProblemGenerator;