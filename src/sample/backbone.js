'use strict';
var $ = require('jquery');

$(document).ready(function() {
	var BodyView = require('../client/view/BodyView');
	var NavigationBar = require('../client/view/NavigationBar');

	var bodyView = new BodyView();
	var navigationBar = new NavigationBar({
		jadeParameters: {
			pageTitle: 'yarse',
			items: [
				{
					href: 'ingredients',
					text: 'Ingredients',
					content: 'Ingredient grid goes here!'
				},{
					href: 'recipes',
					text: 'Recipes',
					content: 'Recipe search result list goes here!'
				},{
					href: 'about',
					text: 'About',
					content: 'Project meta info goes here!'
				}
			]
		}
	});
	
	bodyView.render();
	navigationBar.render();
});