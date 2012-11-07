'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.setDomLibrary($);

var TestView = Backbone.View.extend({
  
  initialize: function() {
    this.template = require('./template/test.jade');
  },
  
  render: function() {
    var html = this.template({
		pretty: true,
		pageTitle: 'Some Title',
		items: ['foo', 'bar', 'baz']
	});
	$('#testView').append(html);
  }
});

module.exports = TestView;