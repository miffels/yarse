'use strict'

IdentityMatrix = require '../../../src/client/numeric/IdentityMatrix'

describe 'LinearProblem', ->
	identityMatrix = new IdentityMatrix(2);
	it 'should be created correctly', ->
		identityMatrix[0][0].should.equal 1
		identityMatrix[0][1].should.equal 0
		identityMatrix[1][0].should.equal 0
		identityMatrix[1][1].should.equal 1