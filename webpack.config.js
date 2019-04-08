const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/script.js",

  mode: 'none', 

  output: {
    path: path.resolve(__dirname, "./js"),
    filename: "script.js",
  },
}

module.exports = config;
