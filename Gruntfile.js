/* jslint node: true */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", { loose: "all" }]
          ]
        },

        files: {
            // if the source file has an extension of es6 then
            // we change the name of the source file accordingly.
            // The result file's extension is always .js
            "./build/app.js": ["./app.js", "./components/*.js"]
          }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          //{expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          //{expand: true, src: ['bower_components/owl.carousel/src/**'], dest: 'shared/vendors/owl.carousel'},

          // makes all src relative to cwd
          {expand: true, cwd: 'bower_components/', src: ['owl.carousel/src/**'], dest: 'shared/vendors'},

          // flattens results to a single level
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
    },

    jshint: {
      options: {
        esnext: true
      },
      all: [
        'Gruntfile.js',
        'app.js',
        'components/*.js'
      ]
    },

    stylus: {
      compile: {
        options: {
          banner: '/*\n' +
            '/* React Commerce\n' +
            '*/\n',
          paths: [ './node_modules/nib', './node_modules/responsa', './node_modules/rupture' ],
          import: [ 'nib', 'responsa', 'rupture' ],
        },
        files: {
          'shared/css/app.css': 'assets/stylus/app.styl'
        }
      }
    },

    watch: {
      scripts: {
        files: ['assets/stylus/*.styl', './components/*.js', './app.js'],
        tasks: ['stylus', 'browserify']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['stylus', 'browserify', 'jshint', 'watch']);
  grunt.registerTask('init', ['copy']);

};
