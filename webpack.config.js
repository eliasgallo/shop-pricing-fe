/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config();

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  output: { publicPath: '/' },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./src/images/[name].[ext]'
      }
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".png"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],
  devServer: {
    // static: { directory: path.join(__dirname, "public") },
    // port: 3000,
    historyApiFallback: true,
  },
};
