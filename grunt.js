'use strict';

module.exports = function(grunt) {

	require('should');
	require('coffee-script');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-jade');
	grunt.loadNpmTasks('grunt-webpack');
	
	// Project configuration.
	grunt.initConfig({
		pkg : '<json:package.json>',
		webpack: {
			client: {
				src: "src/main.js",
				dest: "webpack/main.js"
			},
			amd: {
				jQuery: true,
				Backbone: true
			}
		},
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
			'src/server/**/*.js',
			'src/sample/**/*.js',
			'src/client/fatsecret/**/*.js',
			'src/client/numeric/**/*.js',
			'src/client/recipe/**/*.js',
			'src/client/util/**/*.js',
			'src/client/view/**/*.js',
			'src/*.js']
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
					trailing : true
			}
		},
		jade : {
				node : {
						src: ['src/client/view/index.jade'],
						dest: './',
						wrapper : {
								node : true,
								dependencies : 'runtime'
						}
				}
		},
		watch : {
			files : ['grunt.js', 'src/**/*.js', 'test/**/*.coffee'],
			tasks : ['lint', 'simplemocha']
		}
	});

	// Default task.
	// watch removed temporarily due to permission restrictions
	grunt.registerTask('default', 'lint simplemocha');
};