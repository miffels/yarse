'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var LocalStorage = require('./Backbone.localStorage');
require('../util/String');

var Collection = Backbone.Collection.extend({
	typeName: 'Generic Model',
	localStorage: null,
		
	initialize: function() {
		_.bindAll(this);
		this.localStorage = new LocalStorage(this.typeNameWithoutListAffix());
			
		this.constructor.toString = function() {
			return this.typeName;
		};
	},
		
	typeNameWithoutListAffix: function() {
		return this.typeName.endsWith('List') ? this.typeName.substring(0, this.typeName.length - 4) : this.typeName;
	},
		
	toString: function() {
		return '[' + this.typeName + ' object]';
	}
});

module.exports = Collection;