var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var PORT = 3300;

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client?path=http://127.0.0.1:' + PORT + '/__webpack_hmr',
        './src/scripts/entry'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/bundle.js',
        publicPath: 'http://127.0.0.1:' + PORT + '/static/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'Webpack', contentImage: path.join(__dirname, 'webpack.png')}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: [path.join(__dirname, '../src'), path.join(__dirname, '../config'), ]
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass',
            include: path.join(__dirname, '../src')
        },
        {
            test: /\.(ttf|eot|svg|woff|woff2|png|jpg|gif)$/,
            loader: 'null',
            include: path.join(__dirname, '../src')
        }]
    }
};
