'use strict';
//require = require('enhanced-require')(module);
var LinearSolver = require('./client/numeric/LinearSolver');
var LinearProblem = require('./client/numeric/LinearProblem');
var Constraint = require('./client/numeric/Constraint');
var numeric = require('../lib/numeric');

var potatoScore = 7;
var milkScore = 5;
var stockScore = -3;

var kitchen = {
	milk: 1000,
	potatos: 500,
	stock: 400
};
var mashedPotatos = {
	milk: 200,
	potatos: 600
};
var potatoSoup = {
	potatos: 400,
	stock: 500
};

// >
// > Und da wir binär programmieren:
// >
// > 3. x_1 >= 0
// > 4. x_2 >= 0
// > 5. y_1 >= 0
// > 6. y_2 >= 0
// > 7. y_3 >= 0
// > 8. y_4 >= 0
// > 9. x_1 <= 1
// > 10. x_2 <= 1
// > 11. y_1 <= 1
// > 12. y_2 <= 1
// > 13. y_3 <= 1
// > 14. y_4 <= 1

var objectiveFunction = [-1, -1, -7, 3.75, -5.8, -5];
var inequalityConstraint = new Constraint(
	[
		// > 1. y_1 + y_2 <= 2 x_1
		// > 2. y_3 + y_4 <= 2 x_2
		[-2, 0, 1, 1, 0, 0],
		[0, -2, 0, 0, 1, 1],
		// x_i, y_i <= 1
		[1, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0],
		[0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 1],
		// x_i, y_i >= 0
		[-1, 0, 0, 0, 0, 0],
		[0, -1, 0, 0, 0, 0],
		[0, 0, -1, 0, 0, 0],
		[0, 0, 0, -1, 0, 0],
		[0, 0, 0, 0, -1, 0],
		[0, 0, 0, 0, 0, -1],
		// x_i <= y_i
		[1, 0, -1, 0, 0, 0],
		[1, 0, 0, -1, 0, 0],
		[0, 1, 0, 0, -1, 0],
		[0, 1, 0, 0, 0, -1]
	],
	[
		[0],
		[0],
		[1],
		[1],
		[1],
		[1],
		[1],
		[1],
		[0],
		[0],
		[0],
		[0],
		[0],
		[0],
		[0],
		[0],
		[0],
		[0]
	]
);
var equalityConstraint = new Constraint(
	[
		// maximum 1 recipe
		[1, 1, 0, 0, 0, 0]
	],
	[
		[1]
	]
);
var problem = new LinearProblem(objectiveFunction, inequalityConstraint, equalityConstraint);
var solver = new LinearSolver();

console.log(solver.solve(problem));