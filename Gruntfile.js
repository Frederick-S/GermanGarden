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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('css', ['clean:css', 'cssmin:css']);
    grunt.registerTask('js', ['clean:js', 'uglify:js']);
    grunt.registerTask('default', ['clean', 'cssmin:css', 'uglify:js']);
};
