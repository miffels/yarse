'use strict'

Recipe = require '../../../../src/client/model/recipe/Recipe'

describe 'Recipe', ->
  describe '#Recipe', ->
    recipe = null
    recipeName = 'Bohnenspeck'

    it 'should have a name', ->
      recipe = new Recipe {name: recipeName}
      recipe.attributes.should.have.property 'name'
      recipe.attributes.name.should.equal recipeName