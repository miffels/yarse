'use strict'

FatSecret = require '../../../../src/client/api/fatsecret/FatSecret'
Kitchen = require '../../../../src/client/model/kitchen/Kitchen'
KitchenIngredient = require '../../../../src/client/model/ingredient/KitchenIngredient'

describe 'FatSecret', ->
	fatSecret = null;
	kitchen = null;
	beforeEach ->
		fatSecret = new FatSecret
		kitchen = new Kitchen
		kitchen.addIngredient(new KitchenIngredient({name: '1'}))
		kitchen.addIngredient(new KitchenIngredient({name: '2'}))
	
	describe '#buildSearchStringFrom', ->
    it 'should build a search string using the ingredients in the kitchen, separated by commas', ->
      fatSecret.buildSearchStringFrom(kitchen.attributes.ingredients).should.equal '1,2'