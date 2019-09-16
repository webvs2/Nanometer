const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: './'

	},
	devtool: 'inline-source-map',

	module: {
		rules: [{
			test: /\.scss/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}]
	},
	plugins: [
         new webpack.BannerPlugin('Pengpeng')

	]

}