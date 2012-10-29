'use strict'

SortFirstKProblemGenerator = require '../../../src/client/numeric/SortFirstKProblemGenerator'

describe 'SortFirstKProblemGenerator', ->
  recipes = [
    {"score": 3},
    {"score": 4},
    {"score": 1}
  ];
  k = 2;
  problemGenerator = null
  beforeEach ->
    problemGenerator = new SortFirstKProblemGenerator
  describe '#using', ->
    it 'should generate a proper problem with an array of recipes', ->
      sortingProblem = problemGenerator.generateProblemForFirst(k).using recipes
      sortingProblem.minimizationFunction.should.eql [-3, -4, -1]
      sortingProblem.inequalityConstraint.leftHandSide.should.eql [[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]]
      sortingProblem.inequalityConstraint.rightHandSide.should.eql [k, k, k, 0, 0, 0] #1
      sortingProblem.equalityConstraint.leftHandSide.should.eql [[1, 1, 1]]
      sortingProblem.equalityConstraint.rightHandSide.should.eql [3] #1