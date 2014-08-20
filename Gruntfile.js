module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: ['lib/vendors/foundation/scss/', 'app'],
                    trace: true,
                    compass: true
                },
                files: {
                    'public/css/site.css': ['src/scss/site.scss', 'app/**/*.scss', '!app/app.scss']
                }
            }
        },
        watch: {
            files: ['src/scss/*.scss', 'app/**/*.scss'],
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