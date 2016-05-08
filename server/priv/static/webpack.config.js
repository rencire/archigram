/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src/js');
var dir_styles = path.resolve(__dirname, 'src/stylesheets');
var dir_html = path.resolve(__dirname, 'src/html');
var dir_build = path.resolve(__dirname, 'build');

// How does webpack allow js to import css files without specifiying path?
module.exports = {
    entry: path.join(dir_js, 'main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js,
            },
            {
                loader: 'style-loader!css-loader', 
                test: dir_styles,
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.css'],
        root: [path.join(__dirname, './src')]
    }
};
