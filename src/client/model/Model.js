'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
		typeName: 'Generic Model',
		
		toString: function() {
			return this.typeName;
		}
});

module.exports = Model;