'use strict';
require = require('enhanced-require')(module);

var webpack = require('webpack');
var webpackFormatOutput = require('webpack/lib/formatOutput');
var fs = require('fs');

/* just a little helper to keep everything clean and tidy */

var rmdir = require('./lib/rmdir');

console.log('cleaning output directory...');
rmdir('static');

/**********************************************************/

console.log('compiling javascript...');
webpack(__dirname, "./src/main.js", {
	"output": "static/[hash].js",
	"publicPrefix": "static/",
	"watch": false,
	"workers": true,
	"maxChunks": 5,
	"preLoaders": [
		{
			"test": "\\.js$",
			"include": "lib",
			"exclude": ["jam", "web_modules", "node_modules"],
			"loader": "jshint"
		}
	],
	"amd": {
		"jQuery": true,
		"Backbone": true
	},
	"i18n": {
		"locales": ["en"]
	},
	"jshint": {
		"failOnHint": true,
		"globalstrict" : true,
		"laxcomma" : true,
		"laxbreak" : true,
		"loopfunc": true,
		"sub" : true,
		"node" : true,
		"browser" : true,
		"curly" : true,
		"eqeqeq" : true,
		"forin" : false,
		"undef" : true,
		"immed" : true,
		"latedef" : true,
		"newcap" : true,
		"noarg" : true,
		"nonew" : true,
		"trailing" : true,
		"devel": true,
		"es5": true,
		"camelcase": true,
		"regexp": true,
		"unused": true,
	}
}, function(err, result) {
	if(err) throw err;
	var hash = result.hash;
	var raw = webpackFormatOutput(result, {colors: false, context: __dirname});
	var pretty = webpackFormatOutput(result, {colors: true, context: __dirname});
	console.log(pretty);
	console.log('compiling index.jade...');
	fs.writeFile('index.html', require('./src/client/view/template/index.jade')({output: raw, hash: hash}), 'utf-8', function(err) {
		if(err) throw err;
		console.log('Ok');
	});
});