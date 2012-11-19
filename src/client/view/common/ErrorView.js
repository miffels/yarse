'use strict';

var JadeView = require('../JadeView');

var ErrorView = JadeView.extend({
	id: 'error',
	folder: 'common/',
	typeName: 'ErrorView',
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.jadeParameters.message = this.options.message;
	}
});

module.exports = ErrorView;