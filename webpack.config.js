'use strict';
const path = require('path');
const webpack  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
}

module.exports = {
    context: PATHS.source,
    entry: {
        main: './index',
        slider: './pages/slider/index',
        button: './pages/button/index'
    },
    output:{
        path: PATHS.build,
        filename: '[name].js'
    },

    module: {
        loaders:[{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true
            }
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        },{
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader']
            })
        },{
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader?name=pic/[name].[ext]&limit=4096'
        },{
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug',
            filename: PATHS.build + '/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: PATHS.source + '/pages/slider/index.pug',
            filename: PATHS.build + '/slider/index.html',
            chunks: ['slider']
        }),
        new HtmlWebpackPlugin({
            template: PATHS.source + '/pages/button/index.pug',
            filename: PATHS.build + '/button/index.html',
            chunks: ['button']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin('style.css')
    ],

    resolveLoader:{
        alias:{
            'to-raw-loader': path.resolve(__dirname, './source/utils/to-raw-loader.js')
        }
    }
}