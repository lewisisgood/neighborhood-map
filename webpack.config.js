const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {test: /\.(html)$/, use: {loader: 'html-loader', options: {removeComments: false}}},
      {test: /\.css$/, use: [{loader: MiniCssExtractPlugin.loader},'css-loader']},
      {test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,loader: 'url-loader',options: {limit: 10000}}
    ]
  },
  plugins: [
	new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      filename: "[name].css",
	      chunkFilename: "[id].css"
	    }),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'template.html',
    favicon: 'img/favicon.png'
	})
  ]
};