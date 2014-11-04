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
                // (bourbon.includePaths.concat(neat.includePaths)).concat([])
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?includePaths[]=' + neat.join('&includePaths[]=') 
                // (bourbon.includePaths.concat(neat.includePaths)).concat([])
        }],
        noParse: []
    },
    resolve: {
        alias: {},
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'app'],
    },
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
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
    ]
};
