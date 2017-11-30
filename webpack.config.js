const webpack = require('webpack');
const path = require('path');
const ENTRY = "./src/VisualBuilderBase.ts";
// const regex = path.normalize(ENTRY).replace(/\\/g, '\\\\').replace(/\./g, '\\.');

module.exports = {
    entry: ENTRY,
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    externals: {
    },
    module: {
        loaders: [
           {
                test:[],
                loader: "script-loader!uglify",
                exclude: [
                    /\/node_modules/
                 ]
            },
            {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
                  exclude: [
                    /\/node_modules/
                 ]
             },
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};