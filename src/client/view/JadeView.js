'use strict';

/*global require:true */
require = require('enhanced-require')(module);

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Kitchen = require('../model/kitchen/Kitchen');
require('../util/String');

Backbone.setDomLibrary($);

var JadeView = Backbone.View.extend({

	template: null,
	folder: '',
	templatePath: null,
	jadeParameters: null,
	subviews: null,
	typeName: 'Generic JadeView',
	events: null,
	
	initialize: function() {
		_.bindAll(this);
		this.subviews = [];
		this.events = this.events || {};
		
		this.loadTemplate();
		this.loadJadeParameters();
		
		this.constructor.toString = function() {
			return this.typeName;
		};
	},
	
	loadTemplate: function() {
		this.verifyTemplatePath();
		
		this.template = require(this.templatePath);
	},
	
	verifyTemplatePath: function() {
		this.templatePath = this.templatePath || './' + this.folder + 'template/' + this.typeName + '.jade';
		if(typeof this.templatePath !== 'string' || !this.templatePath.endsWith('.jade')) {
			throw new Error(this.templatePath + ' is not a template file path and therefore cannot be bound to JadeView.');
		}
	},
	
	loadJadeParameters: function() {
		this.jadeParameters = this.options.jadeParameters || {};
		this.jadeParameters.pretty = true;
		if(this.id) {
			this.jadeParameters.id = this.id;
		}
	},
	
	render: function() {
		this.bindToDOM();
		
		this.$el.html(this.html());
		
		this.rebindEvents();
		
		this.renderSubviews();
		
		return this;
	},
	
	bindToDOM: function() {
		// Looks hacky, but this binds the view to the DOM
		// using its ID when the view was created prior to the DOM
		if(!this.isBound()) {
			this.$el = $('#' + this.id);
		}
	},
	
	isBound: function() {
		return this.$el.context === $('document').context;
	},
	
	html: function() {
		return this.template(this.jadeParameters);
	},
	
	renderSubviews: function() {
		console.log('Rendering subviews (' + this.subviews.length + ') of ' + this.typeName + ' (id: ' + this.id + ')');
		this.subviews.forEach(function(subview) {
			subview.render();
		});
	},
	
	addSubview: function(subview) {
		if(!subview instanceof JadeView) {
			throw new Error('Only JadeViews can be added to another JadeView. Instead, received ' + subview ? 'a ' + subview.prototype.constructor.name : subview);
		}
		if(subview === this) {
			throw new Error('Cannot add a JadeView to itself.');
		}
		this.subviews.push(subview);
	},
	
	toString: function() {
		return '[' + this.typeName + ' object]';
	},
	
	addEvents: function(events) {
		this.delegateEvents(_.extend(_.clone(this.events), events));
	},
	
	rebindEvents: function() {
		this.undelegateEvents(this.events);
		this.delegateEvents(this.events);
	}
});

module.exports = JadeView;