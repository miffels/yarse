'use strict'

Kitchen = require '../../../../src/client/model/kitchen/Kitchen'
KitchenIngredientList = require '../../../../src/client/model/ingredient/KitchenIngredientList'
KitchenIngredient = require '../../../../src/client/model/ingredient/KitchenIngredient'

describe 'Kitchen', ->
  kitchen = null
  ingredient = null
  ingredients = null
  beforeEach ->
    ingredient = new KitchenIngredient
    ingredients = new KitchenIngredientList([ingredient])
    kitchen = new Kitchen({ingredients: ingredients})
    kitchen.attributes.kitchenView = {'render': ->}

  it 'should have ingredients in it', ->
    kitchen.attributes.should.have.property 'ingredients'
  describe '#Kitchen', ->

    it 'should not accept null values as ingredient lists', ->
      new Kitchen({ingredients: null}).attributes.ingredients.should.be.ok
    it 'should accept ingredient lists', ->
      new Kitchen({ingredients: ingredients}).attributes.ingredients.should.equal ingredients
  describe '#addIngredient', ->
    it 'should add an ingredient to the kitchen', ->
      kitchen.addIngredient(new KitchenIngredient)
      ingredients.length.should.equal 2
  describe '#removeIngredient', ->
    it 'should remove an ingredient from the kitchen', ->
      kitchen.removeIngredient(ingredient)
      ingredients.length.should.equal 0