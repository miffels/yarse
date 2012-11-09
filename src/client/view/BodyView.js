'use strict';

var JadeView = require('./JadeView');

var BodyView = JadeView.extend({
	
	el: 'body',
	templatePath: './template/body.jade'
	
});

module.exports = BodyView;