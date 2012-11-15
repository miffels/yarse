'use strict';

var FatSecret = require('../client/api/fatsecret/FatSecret');
var Kitchen = require('../client/model/kitchen/Kitchen');
var KitchenIngredient = require('../client/model/ingredient/KitchenIngredient');
var KitchenIngredientList = require('../client/model/ingredient/KitchenIngredientList');

var fatSecret = new FatSecret();

// 25794 Balsamic Salmon
// 182046 Risotto


fatSecret.getRecipesFor(new Kitchen({
	ingredients: new KitchenIngredientList([
		new KitchenIngredient({name: 'risotto'})
	])
}), console.log);

// fatSecret.fetchRecipe(25794, function(result) {
	// console.log(JSON.stringify(result, null, '  '));
// });