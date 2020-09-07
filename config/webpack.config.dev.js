const path = require("path");
const config = require("./webpack.config.js");

config.devServer = {
  contentBase: path.join(__dirname, "../build"),
  compress: true,
  port: 3030,
  historyApiFallback: true,
  noInfo: true,
};

config.devtool = "inline-source-map";

module.exports = config;
