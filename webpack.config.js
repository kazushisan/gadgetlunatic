const path = require("path")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = env => {
	const isProduction = Boolean(env && env.production)
	console.log('Production: ', isProduction)

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		entry: path.resolve(__dirname, "src/js/index.js"),
		output: {
			path: path.resolve(__dirname, "static/js"),
			filename: 'bundle.js'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "../css/bundle.css"
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
								sourceMap: !isProduction
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: !isProduction,
								plugins: [
									cssnano({preset: 'default'}),
									autoprefixer({grid: true})
								]
							  }
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: !isProduction
							}
						}
					]
				},
				{
					test:  /\.(png|jpg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						outputPath: '../assets/'
					}
				}
			]
		}
	}
}