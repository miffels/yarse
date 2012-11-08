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
		items: [{
				"href": "1",
				"text": "Tab 1",
				"content": "This is tab Number One!"
			}, {
				"href": "2",
				"text": "Tab 2",
				"content": "This is tab Number Two!"
			}, {
				"href": "3",
				"text": "Tab 3",
				"content": "This is tab Number Three!"
			}
		]
	});
	$('body').append(html);
	$('#myTab a:first').tab('show');
  }
});

module.exports = NavigationBar;