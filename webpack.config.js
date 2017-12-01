const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build'),
};

const mainModule = {
    context: PATHS.source,
    entry: {
        main: './index',
        slider: './pages/slider/index',
        button: './pages/button/index',
        'radial-progress': './pages/radial-progress/index',
        'arrow-button': './pages/arrow-button/index',
        stages: './pages/stages/index',
        'input-text': './pages/input-text/index',
        textarea: './pages/textarea/index',
        toggle: './pages/toggle/index',
        'progress-bar': './pages/progress-bar/index',
        tickbox: './pages/tickbox/index',
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }, {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
        }, {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                pretty: true,
            },
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
            }),
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader'],
            }),
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader?name=pic/[name].[ext]&limit=4096',
        }, {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=[path][name].[ext]',
        }],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/index.pug`,
            filename: `${PATHS.build}/index.html`,
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/slider/index.pug`,
            filename: `${PATHS.build}/slider/index.html`,
            chunks: ['slider'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/button/index.pug`,
            filename: `${PATHS.build}/button/index.html`,
            chunks: ['button'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/radial-progress/index.pug`,
            filename: `${PATHS.build}/radial-progress/index.html`,
            chunks: ['radial-progress'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/arrow-button/index.pug`,
            filename: `${PATHS.build}/arrow-button/index.html`,
            chunks: ['arrow-button'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/stages/index.pug`,
            filename: `${PATHS.build}/stages/index.html`,
            chunks: ['stages'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/input-text/index.pug`,
            filename: `${PATHS.build}/input-text/index.html`,
            chunks: ['input-text'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/textarea/index.pug`,
            filename: `${PATHS.build}/textarea/index.html`,
            chunks: ['textarea'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/toggle/index.pug`,
            filename: `${PATHS.build}/toggle/index.html`,
            chunks: ['toggle'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/progress-bar/index.pug`,
            filename: `${PATHS.build}/progress-bar/index.html`,
            chunks: ['progress-bar'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/tickbox/index.pug`,
            filename: `${PATHS.build}/tickbox/index.html`,
            chunks: ['tickbox'],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin('style.css'),
    ],
    resolveLoader: {
        alias: {
            'to-raw-loader': path.resolve(__dirname, './source/utils/to-raw-loader.js'),
        },
    },
    node: {
        fs: 'empty',
    },
};

const UIKIT_PATHS = {
    source: path.join(__dirname, './source/uikit'),
    build: path.join(__dirname, './source/uikit'),
};

const uikitModule = {
    context: UIKIT_PATHS.source,
    entry: {
        index: './bundle',
    },
    output: {
        path: UIKIT_PATHS.build,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
            }),
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader'],
            }),
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin('style.css'),
    ],
    resolveLoader: {
        alias: {
            'to-raw-loader': path.resolve(__dirname, './source/utils/to-raw-loader.js'),
        },
    },
    node: {
        fs: 'empty',
    },
};

const TESTS_PATHS = {
    source: path.join(__dirname, './tests/source'),
    build: path.join(__dirname, './tests/build'),
};

const testsModule = {
    context: TESTS_PATHS.source,
    entry: {
        index: './index',
    },
    output: {
        path: TESTS_PATHS.build,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
};

module.exports = [
    mainModule,
];
