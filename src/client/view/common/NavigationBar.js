'use strict';

var JadeView = require('../JadeView');

var NavigationBar = JadeView.extend({
	id: 'navigationBar',
	folder: 'common/',
	typeName: 'NavigationBar'
});

module.exports = NavigationBar;