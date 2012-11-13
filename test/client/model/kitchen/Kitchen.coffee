'use strict'

Kitchen = require '../../../../src/client/model/kitchen/Kitchen'
IngredientList = require '../../../../src/client/model/ingredient/IngredientList'
Ingredient = require '../../../../src/client/model/ingredient/Ingredient'

describe 'Kitchen', ->
  kitchen = null
  ingredient = null
  ingredients = null
  beforeEach ->
    ingredient = new Ingredient
    ingredients = new IngredientList([ingredient])
    kitchen = new Kitchen({ingredients: ingredients})

  it 'should have ingredients in it', ->
    kitchen.attributes.should.have.property 'ingredients'
  describe '#Kitchen', ->

    it 'should not accept null values as ingredient lists', ->
      new Kitchen({ingredients: null}).attributes.ingredients.should.be.ok
    it 'should accept ingredient lists', ->
      new Kitchen({ingredients: ingredients}).attributes.ingredients.should.equal ingredients
  describe '#addIngredient', ->
    it 'should add an ingredient to the kitchen', ->
      kitchen.addIngredient(new Ingredient)
      ingredients.length.should.equal 2
  describe '#removeIngredient', ->
    it 'should remove an ingredient from the kitchen', ->
      kitchen.removeIngredient(ingredient)
      ingredients.length.should.equal 0