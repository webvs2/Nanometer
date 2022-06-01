// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const purgecssWebpackPlugin = require("purgecss-webpack-plugin");

const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const isProduction = true
console.log('process.env.NODE_ENV ',process.env.NODE_ENV )
// process.env.NODE_ENV == "production";
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const stylesHandler = isProduction ?
	MiniCssExtractPlugin.loader :
	"style-loader";

const config = {
	mode: 'production',
	entry: {
		main: ['./src/style.scss', "./src/main.js"],
	},

	output: {
		publicPath: './',
		library: 'Message',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		open: true,
		host: "localhost",
		hot:true
	},
	plugins: [
		// new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
		// new MiniCssExtractPlugin(),
		new ResourceHintWebpackPlugin(),
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.BannerPlugin('Pengpeng')
	],
	module: {
		rules: [{
				test: /\.(js|jsx)$/i,
				loader: "babel-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				// use: stylesSeparation.concat(["postcss-loader", "sass-loader"]),
				use: [stylesHandler, 'css-loader', "postcss-loader", "sass-loader"],
				// use: stylesSeparation,
			},
			{
				test: /\.css$/i,
				// use: stylesSeparation.concat(["postcss-loader"]),
				// use: stylesSeparation,
				use: [stylesHandler, 'css-loader', "postcss-loader"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
};

module.exports = () => {
	// process.env.NODE_ENV
	// console.log('isProduction', isProduction, process.env)
	if (isProduction) {
		config.mode = "production";
		// new MiniCssExtractPlugin(),
		config.plugins.push(new MiniCssExtractPlugin(),
			new BundleAnalyzerPlugin(),
		);
	} else {
		config.mode = "development";
		config.plugins.push(
				new webpack.HotModuleReplacementPlugin(),
		)

	}
	return config;
};
