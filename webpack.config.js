module.exports = {
    entry: {
        main: ['./src/js/main.js'],
        app: './app/main.js'

    },
    output: {
        path: __dirname + '/public/js/',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        modulesDirectories: ['node_modules', 'lib/vendors']

    },
    externals: [
        {
            parse: 'Parse'
        }
    ],
    plugins: []
};