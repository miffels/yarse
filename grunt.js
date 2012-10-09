'use strict';

module.exports = function(grunt) {

  require('should');
  grunt.loadNpmTasks('grunt-simple-mocha');
  
  // Project configuration.
  grunt.initConfig({
    pkg : '<json:package.json>',
    simplemocha: {
      all: {
        src: 'test/**/*.coffee',
        options: {
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    },
    lint: {
      all : ['grunt.js', 'src/**/*.js', 'test/**/*.js']
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
  grunt.registerTask('default', 'lint simplemocha watch');
};