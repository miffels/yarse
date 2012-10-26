'use strict';
var $ = require('jquery');

console.log('Querying Google.')
$.ajax({url:'http://www.google.de/'})
	.done(function(data) {
		console.log('Done.');
		console.log(data);
	})
	.always(function() {
		console.log('In always');
	})
	.fail(function(error) {
		console.log('Failure.');
		console.log(error.responseText);
	});
