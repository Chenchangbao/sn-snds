var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');


var config = {};

// entry
config.entry = {
    vendor: [
        'jquery/dist/jquery',
        'babel-polyfill',
        'admin-lte/bootstrap/js/bootstrap',
        'admin-lte/dist/js/app'
    ],
    ng: [
        'angular', 'ui-router', 'angular-sanitize', 'ui-router/release/ng1/stateEvents'
    ],
    app: [
        'main'
    ]
};

// output
config.output = {
    filename: '[name].bundle.js',
    path: './dist',
    publicPath: ''
};

// module
config.module = {
    loaders: [
        { test: /\.less$/, loader: 'style!css!less' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.(eot(\?.*)?|woff(\?.*)?|ttf(\?.*)?|svg(\?.*)?|woff2(\?.*)?)$/, loader: "file?limit=1024&name=fonts/[name].[ext]" },
        { test: /\.(md|markdown)$/, loader: "html!markdown" },
        { test: /\.html/, exclude: /(node_modules)/, loader: 'html-loader' },
        { test: /\.(png|jpg)$/, loader: 'url?name=images/[name].[ext]' },
        { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel', query: { presets: ['es2015'] } }
        // {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    ]
};

// plugins
config.plugins = [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'INCLUDE_ALL_MODULES': function includeAllModulesGlobalFn(modulesArray, application) {
            modulesArray.forEach(function executeModuleIncludesFn(moduleFn) {
                moduleFn(application);
            });
        },
        ENVIRONMENT: JSON.stringify(nodeEnvironment)
    }),
    new CopyWebpackPlugin([
        { from: './src', to: './' }
    ], {
            ignore: ['*.js', 'index.html']
        }),
    new CopyWebpackPlugin([
        { from: './src/lib', to: './lib' }
    ]),
    new ngAnnotatePlugin({ add: true }),
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery" }),
    new webpack.ProvidePlugin({ echarts: "echarts", "window.echarts": "echarts" }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html'), inject: 'body' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'ng', fileName: 'angular.js', minChunks: 3 }),
];

// resolve
config.resolve = {
    extensions: ['', '.js', '.json', '.coffee'],
    modulesDirectories: ['node_modules', 'src']
};

// devtool
var nodeEnvironment = process.env.NODE_ENV;


config.plugins.push(
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
);
config.devtool = 'eval';
config.devServer = {
    port: 9983,
    host: 'localhost',
    historyApiFallback: true,
    stats: {
        chunkModules: false,
        colors: true
    },
    proxy: [{
        context: ['/authStatus', '/snds/'],
        // path: ['authStatus','instances'],
        target: 'http://10.24.75.229:7009',
        secure: false
    }],
    contentBase: './src'
};
config.cache = true;

module.exports = config;