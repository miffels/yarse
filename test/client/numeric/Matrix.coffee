'use strict'

Matrix = require '../../../src/client/numeric/Matrix'

describe 'Matrix', ->
	matrix = null;
	beforeEach ->
		matrix = new Matrix([1])
	
	it 'should have the method multiplyWith', ->
		matrix.should.have.property 'multiplyWith'
	it 'should have the method append', ->
		matrix.should.have.property 'append'
	
	describe '#multiplyWith', ->
		it 'should not multiplay with matrices other than mxn if it is mxm', ->
			(-> matrix.multiplyWith([]))
			.should.throw()
		it 'should multiply correctly', ->
			matrix[0].should.eql [1]
			matrix.multiplyWith(-2)[0].should.eql [-2]
	
	describe '#append', ->
		it 'should append one matrix to another', ->
			matrix1 = new Matrix();
			matrix2 = new Matrix();
			matrix1[0] = 1;
			matrix2[0] = 2;
			matrix1.append(matrix2).should.eql [1, 2]
