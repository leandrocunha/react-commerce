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

		watch: {
			scripts: {
				files: ['assets/stylus/*.styl'],
				tasks: ['stylus']
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['stylus', 'browserify', 'watch']);

};
