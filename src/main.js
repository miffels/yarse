'use strict';

/*global require:true */
require = require('enhanced-require')(module);

var $ = require('jquery');
var Application = require('./client/Application');

$(document).ready(function() {
	new Application().start();
});