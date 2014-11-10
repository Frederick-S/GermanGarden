module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            js: {
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            }
        },
        clean: {
            css: ["css/*.min.css"],
            js: ["js/*.min.js"]
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/echojs/dist/echo.min.js'],
                        dest: 'js/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('css', ['clean:css', 'cssmin:css']);
    grunt.registerTask('js', ['clean:js', 'uglify:js']);
    grunt.registerTask('default', ['clean', 'copy', 'cssmin:css', 'uglify:js']);
};
