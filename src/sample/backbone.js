'use strict';
var $ = require('jquery');

$(document).ready(function() {
	var TestView = require('./client/view/TestView');

	var testView = new TestView();
	
	testView.render();
});