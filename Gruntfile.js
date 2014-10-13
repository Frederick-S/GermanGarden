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
                    'js/gm.min.js': ['js/gm.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('css', 'cssmin:css');
    grunt.registerTask('js', 'uglify:js');
    grunt.registerTask('default', ['cssmin:css', 'uglify:js']);
};
