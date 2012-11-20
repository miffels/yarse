'use strict';

var Constraint = require('./client/numeric/Constraint');
var LinearProblem = require('./client/numeric/LinearProblem');
var LinearSolver = require('./client/numeric/LinearSolver');
/*
var of = [21, 8, 7];
var ic = new Constraint([
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1],
	[-1, 0, 0],
	[0, -1, 0],
	[0, 0, -1],
	[1, 1, 1]],
	[1, 1, 1, 0, 0, 0, 3, -3]);
var ec = new Constraint([
	[1, 1, 1]],
	[3]);
*/
var of = [1, 2, 3];
var ic = new Constraint([[-1,0,0],[0,-1,0],[0,0,-1],[1,0,0],[0,1,0],[0,0,1]], [0, 0, 0, 1, 1, 1]);
var ec = new Constraint([[1, 1, 1]], [3]);

var problem = new LinearProblem(of, ic, ec);

var solver = new LinearSolver();
console.log(solver.solve(problem));
