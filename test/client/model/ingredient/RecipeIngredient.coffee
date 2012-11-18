'use strict'

RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'
should = require 'should'

describe 'RecipeIngredient', ->
  ingredient = null
  beforeEach ->
    ingredient = new RecipeIngredient({transientData: {name: 'name'}})
  
  describe '#RecipeIngredient', ->
    it 'should not maintain transient data in its persistable attributes', ->
      should.not.exist(ingredient.get('transientData'));
    it 'should move transient attributes to another property', ->
      ingredient.getTransient('name').should.equal 'name'