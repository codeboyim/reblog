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
                debug: true
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: webpackConfig.output.publicPath
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
                    loadPath: ['lib/vendors/foundation/scss/', 'app'],
                    trace: true,
                    compass: true
                },
                files: {
                    'public/css/site.css': ['src/scss/site.scss', 'app/**/*.scss']
                }
            }
        },
        watch: {
            app: {
                files: ['app/**/*', 'src/**/*'],
                tasks: ['webpack:build-dev'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['src/scss/*.scss', 'app/**/*.scss'],
                tasks: ['newer:sass:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.registerTask('default', ['webpack-dev-server:start']);
};