const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	entry: {
		'main': "./src/main.js",
		'config': "./src/config.js"
	},
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        jsonpFunction: "webpackJsonpFileReadmeMD"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(js|vue)$/,
				use: 'eslint-loader',
				enforce: 'pre',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					name: '[name].[ext]?[hash]',
					limit: 8192,
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new StyleLintPlugin(),
	],
	resolve: {
		extensions: ['*', '.js', '.vue'],
		symlinks: false,
	},

	node: {
		fs: 'empty'
	  }
	  
}
