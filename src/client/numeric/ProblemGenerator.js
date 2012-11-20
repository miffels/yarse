'use strict';

var LinearProblem = require('./LinearProblem');
var IdentityMatrix = require('./IdentityMatrix');
var Constraint = require('./Constraint');
var Degradator = require('./Degradator');
var ScoreStatifyer = require('./ScoreStatifyer');

function ProblemGenerator() {
	this.k = 0;
}

ProblemGenerator.prototype.generateProblemForFirst = function(k) {
	this.k = k;
	return this;
};

ProblemGenerator.prototype.using = function(recipes) {
	return this.generateSortingProblem(this.degradedRecipes(this.statifiedRecipes(recipes)));
};

ProblemGenerator.prototype.statifiedRecipes = function(recipes) {
	return new ScoreStatifyer().statify(recipes);
};

ProblemGenerator.prototype.degradedRecipes = function(scores) {
	return new Degradator().degradedRecipes(scores);
};

ProblemGenerator.prototype.generateSortingProblem = function (scores) {
	return new LinearProblem(
		this.generateObjectiveFunction(scores),
		this.generateInequalityConstraint(scores),
		this.generateEqualityConstraint(scores)
	);
};

ProblemGenerator.prototype.generateObjectiveFunction = function(scores) {
	var objectiveFunction = [];
	scores.forEach(function(score) {
		objectiveFunction.push(-score);
	});
	return objectiveFunction;
};

ProblemGenerator.prototype.generateInequalityConstraint = function(scores) {
	var numberOfRecipes = scores.length;
	
	var constraintLeftHandSide = this.generateInequalityConstraintLeftHandSide(numberOfRecipes);
	var constraintRightHandSide = this.generateInequalityConstraintRightHandSide(numberOfRecipes);
	
	return new Constraint(constraintLeftHandSide, constraintRightHandSide);
};

ProblemGenerator.prototype.generateInequalityConstraintLeftHandSide = function(numberOfRecipes) {
	var constraintLeftHandSide = [];
	
	var identityMatrix = new IdentityMatrix(numberOfRecipes);
	var negativeIdentityMatrix = identityMatrix.multiplyWith(-1);
	constraintLeftHandSide = identityMatrix.append(negativeIdentityMatrix);
	
	return constraintLeftHandSide;
};

ProblemGenerator.prototype.generateInequalityConstraintRightHandSide = function(numberOfRecipes) {
	throw new Error('Abstract Method');
};

ProblemGenerator.prototype.generateEqualityConstraint = function(scores) {
	var numberOfRecipes = scores.length;
	
	var constraintLeftHandSide = this.generateEqualityConstraintLeftHandSide(numberOfRecipes);
	var constraintRightHandSide = this.generateEqualityConstraintRightHandSide();
	
	return new Constraint(constraintLeftHandSide, constraintRightHandSide);
};

ProblemGenerator.prototype.generateEqualityConstraintLeftHandSide = function(numberOfRecipes) {
	var constraintLeftHandSide = [[]];
	
	for(var i = 0; i < numberOfRecipes; i++) {
		constraintLeftHandSide[0][i] = 1;
	}
	
	return constraintLeftHandSide;
};

ProblemGenerator.prototype.generateEqualityConstraintRightHandSide = function() {
	throw new Error('Abstract Method');
};

module.exports = ProblemGenerator;