'use strict';

module.exports = function(grunt) {
	
	require('should');
	require('coffee-script');
		
	grunt.loadNpmTasks('grunt-simple-mocha');
	
	// Project configuration.
	grunt.initConfig({
		pkg : '<json:package.json>',
		simplemocha: {
			all: {
				src: 'test/**/*.coffee',
				options: {
					timeout: 3000,
					ignoreLeaks: true,
					ui: 'bdd',
					reporter: 'min'
				}
			}
		},
		lint: {
			all : ['grunt.js',
			'src//**/*.js']
		},
		jshint : {
			options : {
				globalstrict : true,
		
					laxcomma : true,
					laxbreak : true,
					loopfunc: true,
					sub : true,
		
					node : true,
					browser : true,
		
					curly : true,
					eqeqeq : true,
					forin : false,
					undef : true,
					immed : true,
					latedef : true,
					newcap : true,
					noarg : true,
					nonew : true,
					trailing : true,
					quotmark: true
			}
		},
		watch : {
			files : ['grunt.js', 'src/**/*.js', 'test/**/*.coffee'],
			tasks : ['lint', 'simplemocha']
		}
	});

	grunt.registerTask('default', 'lint simplemocha watch');
};