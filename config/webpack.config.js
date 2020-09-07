const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  build: path.join(__dirname, "../build"),
  components: path.join(__dirname, "../src/components"),
  assets: path.join(__dirname, "../src/assets"),
  pages: path.join(__dirname, "../src/pages"),
};

module.exports = {
  entry: {
    app: `${PATHS.src}/index.js`,
  },
  output: {
    path: PATHS.build,
    filename: "bundle.js",
    publicPath: "/",
  },
  stats: "minimal",
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
    }),
    new CleanTerminalPlugin({
      message: `dev server running on http://local:3030`,
      onlyInWatchMode: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(PATHS.src, "assets"), to: path.join("..", "build") },
      ],
    }),
  ],

  module: {
    rules: [
      {
        // Fonts
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        // images / icons
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        //js
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        //React
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        //css
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        //scss
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  resolve: {
    modules: [path.resolve("node_modules"), "node_modules"],
    extensions: [".js", ".jsx", ".json", ".html"],
    alias: {
      "@components": PATHS.components,
      "@pages": PATHS.pages,
      "@assets": PATHS.assets,
      "~": PATHS.src,
    },
  },
};
