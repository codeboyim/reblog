module.exports = function(grunt) {
    var webpackConfig = require('./webpack.config.js');

    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            'build': {
                // plugins: webpackConfig.plugins.concat(
                //     new webpack.DefinePlugin({}),
                //     new webpack.optimize.DedupePlugin(),
                //     new webpack.optimize.UglifyJsPlugin()
                // )
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
                publicPath: webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: 'eval',
                    debug: true
                },
                contentBase: 'src/'
            }
        }

    });

    grunt.registerTask('default', ['webpack-dev-server:start']);
};
