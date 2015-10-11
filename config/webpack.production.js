var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        scripts: './src/scripts/entry'
    },
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'scripts/bundle-' + new Date().getTime() + '.js',
        publicPath: '/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js']
    },
    plugins: [
        new Clean(['../static']),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('styles/bundle-' + new Date().getTime() + '.css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader!sass"),
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|png|jpg|gif)$/,
                loader: 'file?name=[path][name].[ext]&context=./src',
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
