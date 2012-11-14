'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Model = Backbone.Model.extend({
	typeName: 'Generic Model',
		
	initialize: function() {
		_.bindAll(this);
		
		this.constructor.toString = function() {
			return this.typeName;
		};
	},
		
	toString: function() {
		return '[' + this.typeName + ' object]';
	}
});

module.exports = Model;