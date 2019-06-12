const webpack = require("webpack");
const path = require("path");

module.exports = {
	devtool: 'source-map',	
	mode: 'none',	
	entry: {
		'main.js': "./src/main.js",
		'config.js': "./src/config.js"
	},

	output: {
		path: path.resolve(__dirname, "./js"),
    		filename: "[name]"
	  },
	  
	  node: {
		fs: 'empty'
	  }


}

