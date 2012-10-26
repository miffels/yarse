'use strict';

module.exports = function(grunt) {

  require('should');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-coffee');
  
  // Project configuration.
  grunt.initConfig({
    pkg : '<json:package.json>',
    webpack: {
      client: {
        src: "src/main.js",
        dest: "webpack/main.js"
      }
    },
    coffee: {
      app: {
        src: ['test/**/*.coffee'],
        dest: './',
        options: {
            bare: true,
            preserve_dirs: true
        }
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.js',
        options: {
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'min'
        }
      }
    },
    lint: {
      all : ['grunt.js', 'src/**/*.js']
    },
    watch : {
      files : ['grunt.js', 'src/**/*.js', 'test/**/*.coffee'],
      tasks : ['lint', 'coffee', 'simplemocha']
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
  grunt.registerTask('default', 'lint coffee simplemocha webpack watch');
};