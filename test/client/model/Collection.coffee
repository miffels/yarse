'use strict'

Collection = require '../../../src/client/model/Collection'

SomeCollection = Collection.extend({
	typeName: 'SomeModelList'
})

describe 'Collection', ->
	model = null
	collection = null
	beforeEach ->
		collection = new SomeCollection
	
	it 'should strip the "List" affix from its name in order to create a local storage', ->
		collection.localStorage.name.should.equal 'SomeModel'
