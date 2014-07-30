module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: ['lib/vendors/foundation/scss/'],
                    trace: true,
                    compass: true
                },
                files: {
                    'public/css/site.css': ['src/scss/site.scss']
                }
            }
        },
        watch: {
            files: ['public/scss/*.scss'],
            tasks: ['newer:sass:dev'],
            options: {
                spawn: false

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['sass:dev', 'watch']);
};