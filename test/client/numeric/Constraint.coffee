'use strict'

Constraint = require '../../../src/client/numeric/Constraint'

describe 'Constraint', ->
  someArray = [1, 2, 7];
  constraint = new Constraint(someArray, someArray)
  it 'should have a left hand side and right hand side of the same length', ->
    -> new Constraint([], [1])
    .should.throw
  it 'should have a left hand side', ->
    constraint.should.have.property 'leftHandSide'
    constraint.leftHandSide.should.equal someArray
  it 'should have a right hand side', ->
    constraint.should.have.property 'rightHandSide'
    constraint.rightHandSide.should.equal someArray