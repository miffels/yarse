'use strict'

Recipe = require '../../../src/client/recipe/Recipe'

describe 'Recipe', ->
  describe '#Recipe', ->
    recipe = null
    recipeName = 'Bohnenspeck'

    it 'should have a name', ->
      recipe = new Recipe recipeName
      recipe.should.have.property 'name'
      recipe.name.should.equal recipeName