'use strict'

Recipe = require '../src/recipe'

describe 'Recipe', ->
  describe '#Recipe', ->
    recipe = null
    recipeName = 'Bohnenspeck'

    it 'should have a name', ->
      recipe = new Recipe recipeName
      recipe.should.have.property 'name'
      recipe.name.should.equal recipeName