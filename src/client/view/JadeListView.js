'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var JadeView = require('./JadeView');

/*global $ */

var JadeListView = JadeView.extend({
	
	data: null,
	dataType: null,
	lineType: null,
	dataViewMap: null,
	typeName: 'Generic JadeListView',
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		_.bindAll(this);
		
		this.initializeData();
		this.initializeLineType();
	},
	
	initializeData: function() {
		if(!this.dataType) {
			throw new Error(this.typeName + ' requires a subtype of Backbone.Collection as dataType.');
		}
		
		this.data = this.options.data || this.data || new this.dataType();
		
		if(!(this.data instanceof Backbone.Collection)) {
			if(this.data instanceof Array) {
				this.data = new this.dataType(this.data);
			} else {
				throw new Error(this.typeName + ' requires an instance of Backbone.Collection as data but got ' + (this.data ?
				'instance of ' + this.data.constructor :
				this.data));
			}
		}
		
		this.dataViewMap = {};
		this.data.each(this.addView);
		this.data.bind('add', this.addView);
		this.data.bind('remove', this.removeView);
		this.data.bind('reset', this.removeViews);
	},
	
	initializeLineType: function() {
		/*this.lineType = this.options.lineType || this.lineType;
		if(!this.lineType || !(this.lineType.prototype instanceof JadeView)) {
			throw new Error('JadeListView requires a subtype of JadeView as lineType but got ' + (this.lineType ?
				' type ' : '') + this.lineType);
		}*/
	},
	
	addItem: function(item) {
		console.log(item);
		this.data.add(item);
	},
	
	addView: function(item) {
		var view = this.setSubviewID(new this.lineType(item));
		this.addSubview(view);
		this.dataViewMap[item] = view;
	},
	
	setSubviewID: function(subview) {
		subview.id += this.subviews.length;
		return subview;
	},
	
	removeItem: function(item) {
		this.data.remove(item);
	},
	
	clear: function() {
		this.data.reset();
	},
	
	removeView: function(item) {
		var view = this.subviews.pop(this.dataViewMap[item]);
		if(this.isBound()) {
			$('#' + view.id).remove();
		}
		delete this.dataViewMap[item];
	},
	
	removeViews: function() {
		this.subviews.forEach(function(subview) {
			if(this.isBound()) {
				$('#' + subview.id).remove();
			}
		}.bind(this));
		this.subviews.length = 0;
		this.dataViewMap = {};
	},
	
	render: function() {
		this.jadeParameters.subviews = this.subviews;
		this.jadeParameters.data = this.data;
		JadeView.prototype.render.apply(this);
	}
});

JadeListView.toString = function() {return 'JadeListView';};

module.exports = JadeListView;