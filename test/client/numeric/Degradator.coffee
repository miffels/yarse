'use strict'

Degradator = require '../../../src/client/numeric/Degradator'

describe 'Degradator', ->
  degradator = null
  recipes = [1, 2, 0, 1, 4, 0, 3, 4, 9]
  
  beforeEach ->
    degradator = new Degradator
  
  it 'should have the method degradedRecipes', ->
    degradator.should.have.property 'degradedRecipes'
  it 'should have the method classify', ->
    degradator.should.have.property 'classify'
  it 'should have the method calculateMali', ->
    degradator.should.have.property 'calculateMali'
  
  describe '#classify', ->
    it 'should classify correctly', ->
      JSON.stringify(degradator.classify(recipes)).should.eql '[[8],[4,7],[6],[1],[0,3],[2,5]]'
  describe '#calculateMali', ->
    it 'should calculate the mali per class correctly', ->
      clusters = degradator.classify(recipes)
      degradator.calculateMali(clusters).should.eql [0,0,1,1,1,2]
  describe '#degradetedRecipes', ->
    it 'should degradate recipes properly', ->
      degradator.degradedRecipes(recipes).should.eql [0, 1, -2, -1, 4, -3, 2, 3, 9]