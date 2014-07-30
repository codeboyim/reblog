module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: ['lib/vendors/foundation/scss/'],
                    trace:true
                },
                files: {
                    'public/css/site.css': ['public/scss/site.scss', 'public/scss/_settings.scss']
                }
            }
        },
        watch: {
            dev: {
                files: ['public/scss/site.scss'],
                tasks: ['sass:dev'],
                options: {
                    spawn: false
                    
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['newer:sass:dev', 'watch']);
};