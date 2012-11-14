'use strict'

FatSecret = require '../../../src/client/fatsecret/FatSecret'
Kitchen = require '../../../src/client/model/kitchen/Kitchen'
KitchenIngredient = require '../../../src/client/model/ingredient/KitchenIngredient'

describe 'FatSecret', ->
	fatSecret = null;
	kitchen = null;
	beforeEach ->
		fatSecret = new FatSecret
		kitchen = new Kitchen
		kitchen.addIngredient(new KitchenIngredient({name: '1'}))
		kitchen.addIngredient(new KitchenIngredient({name: '2'}))
	
	describe '#buildSearchStringFrom', ->
    it 'should build a search string using the ingredients in the kitchen, separated by spaces', ->
      fatSecret.buildSearchStringFrom(kitchen.attributes.ingredients).should.equal '1 2'
  
  describe '#map', ->
    it 'should map the attributes of a remote entity to a local object', ->
      fatSecret.map({remote_id: '1'}, {'remote_id': 'id'}).should.eql {id: '1'}
  
  describe '#mapAll', ->
    it 'should map the attributes of several remote entities to local objects', ->
      fatSecret.mapAll([{remote_id: '1'}, {remote_id: '2'}], {'remote_id': 'id'}).should.eql [{id: '1'}, {id: '2'}]