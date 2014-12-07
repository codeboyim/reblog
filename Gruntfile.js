module.exports = function(grunt) {
    var webpackConfig = require('./webpack.config.js'),
        webpack = require('webpack');


    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-build-control');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            'build': {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        'process.env': {
                            'NODE_ENV': JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: false
                    })
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
                publicPath: '/' + webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: 'eval',
                    debug: true
                },
                contentBase: 'src/',
                hot: true
            }
        },
        clean: {
            build: {
                src: ['release/']
            }
        },
        copy: {
            build: {
                files: {
                    'release/index.html': ['src/index.html']
                }
            }
        },
        buildcontrol: {
            options: {
                dir: 'release',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            github: {
                options: {
                    remote: 'git@github.com:codeboyim/reblog.git',
                    branch: 'gh-pages'
                }
            }
        }


    });

    grunt.registerTask('default', ['webpack-dev-server:start']);
    grunt.registerTask('build', ['clean:build', 'webpack:build', 'copy:build']);
    grunt.registerTask('deploy', ['buildcontrol']);
};
