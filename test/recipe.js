'use strict';

var Recipe;

Recipe = require('../src/recipe');

describe('Recipe', function() {
  return describe('#Recipe', function() {
    var recipe, recipeName;
    recipe = null;
    recipeName = 'Bohnenspeck';
    return it('should have a name', function() {
      recipe = new Recipe(recipeName);
      recipe.should.have.property('name');
      return recipe.name.should.equal(recipeName);
    });
  });
});
