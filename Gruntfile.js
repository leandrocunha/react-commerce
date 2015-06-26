/* jslint node: true */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

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

		babel: {
	    options: {
	      sourceMap: true
	    },
	    dist: {
	      files: {
	        "build/app.js": "app.js"
	      }
	    }
	  },

		browserify: {
		  dist: {
		    files: {
		      'build/app.js': ['build/app.js'],
		    }
		  }
		},

		watch: {
			scripts: {
				files: ['assets/stylus/*.styl'],
				tasks: ['stylus']
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['stylus', 'babel', 'browserify', 'watch']);

};
