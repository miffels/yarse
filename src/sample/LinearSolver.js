'use strict';

var FindFirstKProblemGenerator = require('../client/numeric/FindFirstKProblemGenerator');
var LinearSolver = require('../client/numeric/LinearSolver');
var problemGenerator = new FindFirstKProblemGenerator();
var linearSolver = new LinearSolver();


var recipes = [
        {'score': 1},
        {'score': 2},
        {'score': 0},
        {'score': 1},
        {'score': 4},
        {'score': 0},
        {'score': 3},
        {'score': 4},
        {'score': 9}
  ];

var problem = problemGenerator.generateProblemForFirst(5).using(recipes);
var solution = linearSolver.solve(problem);

console.log(solution);