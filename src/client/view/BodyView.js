'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.setDomLibrary($);

var BodyView = Backbone.View.extend({
  
  initialize: function() {
    this.template = require('./template/body.jade');
  },
  
  render: function() {
    var html = this.template({pretty:true});
	$('body').append(html);
  }
});

module.exports = BodyView;