const webpack = require("webpack");
const path = require("path");

module.exports = {
	devtool: 'source-map',	
	mode: 'none',	
	entry: {
		'script.js': "./src/script.js"
	},

	output: {
		path: path.resolve(__dirname, "./js"),
    		filename: "[name]"
  	}


}

