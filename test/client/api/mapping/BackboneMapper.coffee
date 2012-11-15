'use strict'

BackboneMapper = require '../../../../src/client/api/mapping/BackboneMapper'

describe 'BackboneMapper', ->
  mapper = null
  recipeSearchData = null
  beforeEach ->
    recipeSearchData = [{description: 'description', id: 'id', name: 'name'}]
    mapper = new BackboneMapper({
      mapRecipes: (rawData) ->
        rawData
    })
  
  describe '#mapRecipes', ->
    it 'should the RecipeMapper data into Backbone models', ->
      model = mapper.mapRecipes(recipeSearchData).models[0]
      model.get('description').should.equal 'description'
      model.get('id').should.equal 'id'
      model.get('name').should.equal 'name'