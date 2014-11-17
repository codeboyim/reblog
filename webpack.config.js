var webpack = require('webpack'),
    path = require('path'),
    neatPath = path.join(__dirname, 'bower_components/neat/app/assets/stylesheets'),
    bourbonPath = path.join(__dirname, 'bower_components/bourbon/dist'),
    faPath = path.join(__dirname, 'node_modules/font-awesome/scss'),
    appPath = path.join(__dirname, 'src/app');

module.exports = {
    cache: true,
    entry: {
        main: ['webpack/hot/dev-server', './src/app/main.js']
    },
    output: {
        path: path.join(__dirname, 'dist/scripts/'),
        publicPath: '/scripts/',
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
            loader: 'style!css',
        }, {
            test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?imagePath=/assets/images&includePaths[]=' + [neatPath, bourbonPath, faPath, appPath].join('&includePaths[]=')
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
            Parse: 'parse',
            React: 'react/addons'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {}
};
