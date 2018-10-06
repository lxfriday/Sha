const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: './src/sha.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //   },
      //   exclude: [/node_modules/],
      //   enforce: 'pre', // 强制最先使用eslint-loader处理
      // },
    ],
  },
};
