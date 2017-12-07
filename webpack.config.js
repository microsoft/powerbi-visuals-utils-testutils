const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const path = require('path');
const ENTRY = "./src/index.ts";
// const regex = path.normalize(ENTRY).replace(/\\/g, '\\\\').replace(/\./g, '\\.');

module.exports = {
    entry: ENTRY,
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                  loader: "script-loader!uglify",
                  options: {
                  }
                }
              },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
              }
            }
          }
        ]
      },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    plugins: [
    ]
};