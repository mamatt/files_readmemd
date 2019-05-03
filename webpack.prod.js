const webpack = require("webpack");
const path = require("path");

module.exports = {
	devtool: 'source-map',	
	mode: 'production',	
	entry: {
		'script.js': "./src/script.js"
	},

	output: {
		path: path.resolve(__dirname, "./js"),
    		filename: "[name]"
  	},

	node: {
	fs: 'empty'
	}
}

