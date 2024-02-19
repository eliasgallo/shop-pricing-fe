/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config()

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./src/images/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.png'],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@images': path.resolve(__dirname, './src/images/'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@customHooks': path.resolve(__dirname, './src/customHooks/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
}
