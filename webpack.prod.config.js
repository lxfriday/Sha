const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
});
