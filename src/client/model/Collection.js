'use strict';

var Backbone = require('backbone');

var Collection = Backbone.Collection.extend({
		typeName: 'Generic Model',
		
		toString: function() {
			return this.typeName;
		}
});

module.exports = Collection;