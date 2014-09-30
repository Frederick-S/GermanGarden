module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            css: {
                src: 'css/style.css',
                dest: 'css/style.min.css'
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
    grunt.registerTask('default', ['cssmin:css', 'uglify:js']);
};
