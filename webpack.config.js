var webpack = require('webpack'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths,
    path = require('path');

module.exports = {
    cache: true,
    entry: {
        main: ['webpack/hot/dev-server', './src/app/main.js']
    },
    output: {
        path: path.join(__dirname, 'dist/scripts'),
        publicPath: '/scripts',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            //     test: /showdown\.js$/,
            //     loader: 'imports?exports=>undefined'
            // }, {
            test: /\.js$|\.jsx$/,
            loaders: ['react-hot', 'jsx?harmony']
        }, {
            test: /parse-latest.js$/,
            loader: 'exports?exports.Parse'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?includePaths[]=' + neat.join('&includePaths[]=')
        }],
        noParse: []
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'bower_components', 'app'],
    },
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
        fs: 'null'
    }],
    plugins: [
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery',
            // _: 'underscore',
            // Backbone: 'backbone',
            Parse: 'parse',
            React: 'react/addons'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {}
};
