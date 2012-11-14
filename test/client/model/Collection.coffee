'use strict'

Model = require '../../../src/client/model/Model'
Collection = require '../../../src/client/model/Collection'

SomeModel = Model.extend({
  typeName: 'SomeModel'
})
SomeCollection = Collection.extend({
  typeName: 'SomeModelList'
})

describe 'Collection', ->
  model = null
  collection = null
  beforeEach ->
    model = new SomeModel
    collection = new SomeCollection
  
  it 'should share the localStorage with its corresponding model', ->
    collection.localStorage.name.should.equal model.localStorage.name
