var webpack = require('webpack');

module.exports = {
    entry: {
        main: ['webpack/hot/dev-server', 'script!parse', './app/main.js']

    },
    output: {
        path: __dirname + '/public/js/',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /showdown\.js$/,
                loader: 'imports?exports=>undefined'
            },
            {
                test: /\.js$|\.jsx$/,
                loaders: ['react-hot', 'jsx?harmony&insertPragma=React.DOM']
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=expanded'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ],
        noParse: [
            /showdown\.js/
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'lib/vendors', 'app'],
        alias: {
            'globals$': __dirname + '/app/globals',
            'shared': __dirname + '/app/_shared',
            'css': __dirname + '/public/css',
            'images': __dirname + '/public/img',
            'moment$': __dirname + '/lib/moment',
            'datetimepicker$': __dirname + '/lib/datetimepicker'
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
            Parse: 'parse',
            globals: 'globals',
            React: 'react'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {
        'fs': 'empty'
    }
};