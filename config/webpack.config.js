const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

const PATHS = {
  src: path.join(__dirname, "../src"),
  build: path.join(__dirname, "../build"),
  components: path.join(__dirname, "../src/components"),
  assets: path.join(__dirname, "../src/assets"),
  pages: path.join(__dirname, "../src/pages"),
};

module.exports = {
  entry: {
    app: `${PATHS.src}/static/index.js`,
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
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/static/index.html`,
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

    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
        //css scoup
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },

          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },

              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "cssnano"],
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },

      {
        //css global
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },

          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "cssnano"],
              },
            },
          },
        ],
        exclude: /\.module\.css$/,
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },

          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "cssnano"],
              },
            },
          },
        ],
        include: /\.module\.scss$/,
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "cssnano"],
              },
            },
          },
        ],
        exclude: /\.module\.scss$/,
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
