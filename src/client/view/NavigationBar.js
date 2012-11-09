'use strict';

var JadeView = require('./JadeView');

var NavigationBar = JadeView.extend({
	
	el: 'body',
	templatePath: './template/navbar.jade',
	
	render: function() {
		JadeView.prototype.render.apply(this);
		this.$('#navigationBar a:first').tab('show');
	}
});

module.exports = NavigationBar;