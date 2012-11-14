'use strict';

/*global require:true */
require = require('enhanced-require')(module, {
	recursive: true
});

//require('./sample/backbone');
var IngredientList = require('./client/model/ingredient/IngredientList');

var ingredients = new IngredientList();

window.localStorage.clear();