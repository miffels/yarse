'use strict';
var Recipe = require('./recipe');
var numericjs = require('../lib/numeric-1.2.3.min.js');

// LP test: Production domain
// Given there are three products and they sell for $2, 3 or 8 respectively
var productPrices = [2, 3, 8];
// However, producing them costs $1, 2 or 5 respectively
var productCosts = [1, 3, 5]; // <= 300
// And we need at least 50 units in sum of product 1 and 2
var constraintNumbers = [1, 1, 0]; // >= 50
// Furthermore, producing them lasts 2, 4 or 5 hours respectively and we have but 400 available
var constraintTime = [2, 4, 5]; // = 400
// And we cannot just dissasemble the products, hence they all must be >= 0


var recipe = new Recipe("Stuff");