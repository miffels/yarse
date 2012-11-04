'use strict';

module.exports = function(grunt) {

  require('should');
  require('coffee-script');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');
  
  // Project configuration.
  grunt.initConfig({
    pkg : '<json:package.json>',
    webpack: {
      client: {
        src: "src/main.js",
        dest: "webpack/main.js"
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
      'src/client/uti/**/*.js']
    },
    watch : {
      files : ['grunt.js', 'src/**/*.js', 'test/**/*.coffee'],
      tasks : ['lint', 'simplemocha']
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
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint simplemocha webpack watch');
};