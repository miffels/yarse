'use strict';

var JadeView = require('../JadeView');

var BodyView = JadeView.extend({
	el: 'body',
	folder: 'common/',
	typeName: 'BodyView'
});

module.exports = BodyView;