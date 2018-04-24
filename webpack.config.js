const path = require('path')
const webpack = require('webpack')

module.exports = { 
    target: 'electron-main',
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
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    entry: {
        'main/index': './src/main/index.js',
        'renderer/app': './src/renderer/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'source-map'
}