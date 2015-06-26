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
                            'Responsa\n' +
                            '*/\n',
                    paths: [ './examples/node_modules/nib', './examples/node_modules/responsa' ],
                    import: [ 'nib', 'responsa' ],
                },
                files: {
                    'css/app.css': 'stylus/app.styl'
                }
            }
        },

        watch: {
            scripts: {
                files: ['stylus/app.styl'],
                tasks: ['stylus']
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['stylus', 'watch']);

};
