'use strict';

/*global require:true */
require = require('enhanced-require')(module);

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
require('../util/String');

Backbone.setDomLibrary($);

var JadeView = Backbone.View.extend({
	
	// No need for requiring these in sub classes anymore
	$: $,
	_: _,
	template: null,
	templatePath: null,
	jadeParameters: {},
	
	initialize: function() {
		if(!this.templatePath) {
			throw new Error("JadeView has no template bound to it.");
		}
		if(typeof this.templatePath !== 'string' || !this.templatePath.endsWith('.jade')) {
			throw new Error(this.templatePath + " is not a template file path and therefore cannot be bound to JadeView.");
		}
		
		this.template = require(this.templatePath);
		
		this.jadeParameters = this.options.jadeParameters || {};
		this.jadeParameters['pretty'] = true;
		
		this._.bindAll(this, 'render', 'html');
	},
	
	render: function() {
		this.$el.append(this.html());
	},
	
	html: function() {
		return this.template(this.jadeParameters);
	}
});

module.exports = JadeView;