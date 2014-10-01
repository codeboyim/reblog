module.exports = function (grunt) {
    var webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js');

    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({}),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                )
            },
            'build-dev': {
                devtool: 'sourcemap',
                debug: true,
                watch: true
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: webpackConfig.output.publicPath,
                port: 7593
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: 'eval',
                    debug: true
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: ['lib/vendors/foundation/scss/', 'app', 'src/scss/'],
                    trace: true,
                    compass: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/scss',
                        src: '**/*.scss',
                        dest: 'public/css',
                        ext: '.css'
                    },
                    {
                        expand: true,
                        cwd: 'app',
                        src: '**/*.scss',
                        dest: 'app',
                        ext: '.css'
                    }
                ]
            }
        },
        watch: {
            //            webpack: {
            //                files: ['app/**/*', 'src/**/*'],
            //                tasks: ['webpack:build-dev'],
            //                options: {
            //                    spawn: false
            //                }
            //            },
            sass: {
                files: ['src/scss/*.scss', 'app/**/*.scss'],
                tasks: ['newer:sass:dev'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['watch', 'webpack-dev-server:start'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });


    grunt.registerTask('default', ['newer:sass:dev', 'concurrent:target']);
};