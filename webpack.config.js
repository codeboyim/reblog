var webpack = require('webpack');

module.exports = {
    entry: {
        main: './app/main.js'
    },
    output: {
        path: __dirname + '/public/js/',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'jsx'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=expanded'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'lib', 'lib/vendors', 'app'],
        alias: {
            'globals': __dirname + '/app/globals'
        }
    },
    externals: [
        {
            parse: 'Parse'
        }
    ],
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            Parse: 'parse'
        })
    ]
};