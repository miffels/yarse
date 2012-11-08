'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.setDomLibrary($);

var NavigationBar = Backbone.View.extend({
  
  initialize: function() {
    this.template = require('./template/navbar.jade');
  },
  
  render: function() {
    var html = this.template({
		pretty: true,
		pageTitle: "yarse",
		items: [{
				"href": "ingredients",
				"text": "Ingredients",
				"content": "A grid of ingredients goes here!"
			}, {
				"href": "recipes",
				"text": "Recipes",
				"content": "This tab contains a list of recipes found!"
			}, {
				"href": "about",
				"text": "About",
				"content": "Some info on this project!"
			}
		]
	});
	$('body').append(html);
	$('#navigationBar a:first').tab('show');
  }
});

module.exports = NavigationBar;