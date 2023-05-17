const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    client: {
      logging: 'info',
      overlay: true,
    },
    compress: true,
    open: true,
    static: './build',
  },
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.module.(scss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules:{
                localIdentName: '[folder]__[local]--[hash:base64:5]'
              }
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(css)$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
});
