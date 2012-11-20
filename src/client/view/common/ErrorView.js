'use strict';

var JadeView = require('../JadeView');
var $ = require('jquery');

var ErrorView = JadeView.extend({
	id: 'error',
	folder: 'common/',
	typeName: 'ErrorView',
	
	initialize: function() {
		JadeView.prototype.initialize.apply(this, arguments);
		this.jadeParameters.message = this.options.message;
	},
	
	render: function() {
		JadeView.prototype.render.apply(this, arguments);
		$('#alert').addClass('in');
	}
});

module.exports = ErrorView;