'use strict';
var $ = require('jquery');

$(document).ready(function() {
	var BodyView = require('../client/view/BodyView');
	var NavigationBar = require('../client/view/NavigationBar');

	var bodyView = new BodyView();
	var navigationBar = new NavigationBar();
	
	bodyView.render();
	navigationBar.render();
});