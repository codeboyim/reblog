var webpack = require('webpack'),
    bourbon = require('node-bourbon'),
    neat = require('node-neat'),
    path = require('path');

module.exports = {
    cache: true,
    entry: {
        main: './src/app/main.js'
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
            loaders: ['react-hot', 'jsx?harmony&insertPragma=React.DOM']
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' +
                (bourbon.includePaths.concat(neat.includePaths))
        }],
        noParse: [
            /showdown\.js/
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'lib', 'app'],
    },
    externals: [{
        xmlhttprequest: 'XMLHttpRequest'
    }],
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            Parse: 'parse',
            React: 'react/addons'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
