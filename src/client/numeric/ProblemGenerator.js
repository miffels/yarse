'use strict';

var LinearProblem = require('./LinearProblem');
var IdentityMatrix = require('./IdentityMatrix');
var Constraint = require('./Constraint');
var Cluster = require('./Cluster');

function ProblemGenerator() {
	this.k = 0;
}

ProblemGenerator.prototype.generateProblemForFirst = function(k) {
	this.k = k;
	return this;
};

ProblemGenerator.prototype.using = function(recipes) {
	return this.generateSortingProblem(this.degradatedRecipes(recipes));
};

ProblemGenerator.prototype.generateSortingProblem = function (recipes) {
	return new LinearProblem(
		this.generateMinimizationFunction(recipes),
		this.generateInequalityConstraint(recipes),
		this.generateEqualityConstraint(recipes)
	);
};

ProblemGenerator.prototype.generateMinimizationFunction = function(recipes) {
	var minimizationFunction = [];
	for(var i = 0; i < recipes.length; i++) {
		var recipe = recipes[i];
		minimizationFunction.push(-recipe.score);
	}
	return minimizationFunction;
};

ProblemGenerator.prototype.generateInequalityConstraint = function(recipes) {
	var numberOfRecipes = recipes.length;
	
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

ProblemGenerator.prototype.classify = function(recipes) {
	var clusters = {};
	
	for(var i = 0; i < recipes.length; i++) {
		var score = recipes[i].score;
		var cluster = this.clusterFor(score, clusters);
		cluster.push(i);
	}
	
	return this.sortClusters(clusters);
};

ProblemGenerator.prototype.clusterFor = function(score, clusters) {
	var cluster = clusters[score];
	
	if(typeof cluster === 'undefined') {
			cluster = new Cluster();
			cluster.clusterClass = score;
			clusters[score] = cluster;
	}
	
	return cluster;
};

ProblemGenerator.prototype.sortClusters = function(clusters) {
	var clustersAr = [];
	
	for(var clusterClass in clusters) {
		clustersAr.push(clusters[clusterClass]);
	}
	
	return clustersAr.reverse();
};

ProblemGenerator.prototype.calculateMali = function (clusters) {
	var mali = [];
	var malus = 0;
	
	for(var i = 0; i < clusters.length; i++) {
		var minimum = clusters[i].score - clusters[i].length + 1;
		mali[i] = malus;
		malus += (clusters[i].length - 1);
		if(i < clusters.length - 1) {
			if(clusters[i+1].clusterClass < minimum) {
				malus = 0;
			}
		}
	}
	
	return mali;
};

ProblemGenerator.prototype.degradatedRecipes = function(recipes) {
	var clusters = this.classify(recipes);
	var mali = this.calculateMali(clusters);
	var result = recipes.slice(0);
	this.degradate(result, clusters, mali);
	return result;
};

ProblemGenerator.prototype.degradate = function(recipes, clusters, mali) {
	var count = 0;
	for(var i = 0; i < mali.length; i++) {
		var cluster = clusters[i];
		var malus = mali[i];
		for(var j = 0; j < cluster.length; j++) {
			recipes[cluster[j]].score -= malus;
			malus++;
			count++;
		}
	}
};

ProblemGenerator.prototype.generateInequalityConstraintRightHandSide = function(numberOfRecipes) {
	throw new Error('Abstract Method');
};

ProblemGenerator.prototype.generateEqualityConstraint = function(recipes) {
	var numberOfRecipes = recipes.length;
	
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