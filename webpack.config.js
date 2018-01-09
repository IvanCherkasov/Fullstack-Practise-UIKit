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
        uikit: './uikit/bundle',
        input: './pages/input/index',
        other: './pages/other/index',
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
            uikit: path.resolve(__dirname, './source/uikit/bundle.ts'),
        },
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }, {
            test: /\.(ts|tsx)$/,
            loader: 'awesome-typescript-loader',
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
            test: /\.(ttf|eot|woff|woff2|otf)$/,
            loader: 'file-loader?name=[path][name].[ext]',
        }],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/index.pug`,
            filename: `${PATHS.build}/index.html`,
            chunks: ['main', 'uikit'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/input/index.pug`,
            filename: `${PATHS.build}/input/index.html`,
            chunks: ['main', 'uikit', 'input'],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.source}/pages/other/index.pug`,
            filename: `${PATHS.build}/other/index.html`,
            chunks: ['main', 'uikit', 'other'],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin({
            filename: '[name].style.css', // [name] - chunk name
            allChunks: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'uikit',
        }),
    ],
    resolveLoader: {
        alias: {
            'to-raw-loader': path.resolve(__dirname, './source/utils/to-raw-loader.js'),
            'export-from-loader': path.resolve(__dirname, './source/utils/export-from-loader.js'),
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
            'export-from-loader': path.resolve(__dirname, './source/utils/export-from-loader.js'),
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
