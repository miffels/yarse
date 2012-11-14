'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Model = Backbone.Model.extend({
		typeName: 'Generic Model',
		
		initialize: function() {
			_.bindAll(this);
		},
		
		toString: function() {
			return this.typeName;
		}
});

module.exports = Model;