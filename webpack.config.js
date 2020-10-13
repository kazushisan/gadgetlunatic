const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "inline-source-map",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "static/"),
    filename: `js/${isProduction ? "[hash]." : ""}bundle.js`,
    publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${isProduction ? "[hash]." : ""}bundle.css`,
    }),
    new ManifestPlugin({
      fileName: "../data/manifest.json",
    }),
  ],
  devServer: {
    port: 1314,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: !isProduction,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProduction,
              postcssOptions: {
                plugins: ["cssnano", ["autoprefixer", { grid: true }]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets/",
        },
      },
    ],
  },
};
