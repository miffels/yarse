'use strict';

define('main-client', ['jquery', 'recipe'], function($, Recipe) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
	var recipe = new Recipe("Stuff");
	alert(recipe.name);
});