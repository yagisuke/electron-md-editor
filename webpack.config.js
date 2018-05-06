const path = require('path')

module.exports = { 
    target: 'electron-renderer',
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    entry: {
        'main/index': './src/main/index.js',
        'renderer/app': './src/renderer/app.js',
        'renderer/pdf': './src/renderer/pdf.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'source-map'
}