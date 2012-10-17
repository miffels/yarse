'use strict';
var requirejs = require('requirejs');

requirejs.config({
	baseUrl : './',
    nodeRequire : require
});

requirejs(['./recipe.js'], function (Recipe) {
});