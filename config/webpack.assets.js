var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

module.exports = {
    entry: {
        assets: './src/scripts/entry-assets'
    },
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'assets-log',
        publicPath: '/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js']
    },
    plugins: [
        new Clean(['../static/images']),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
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
