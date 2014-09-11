module.exports = {
    entry: {
        main: ['./app/main.js'],
        home: ['./app/home']
    },
    output: {
        path: __dirname + '/public/js/',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=expanded'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'lib/vendors']
    },
    externals: [
        {
            parse: 'Parse'            
        }
    ],
    plugins: []
};