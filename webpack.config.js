const webpack = require('webpack');
const path = require('path');
const ENTRY = "./src/VisualBuilderBase.ts";
const regex = path.normalize(ENTRY).replace(/\\/g, '\\\\').replace(/\./g, '\\.');

module.exports = {
    node: {
        fs: 'empty'
      },
    entry: ENTRY,
    devtool:'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    externals: {
    },
    module: {
        loaders: [
            {
                test:[],
                loader: "script-loader!uglify"
            },
            {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
             },
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
};