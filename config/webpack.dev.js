const path = require("path");
const webpack = require("webpack")
const ip = require('ip');
const webpackMerge = require("webpack-merge");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");

const baseConfig = require("./webpack.base.js");
const config = require("./config");
const port = config.port;

module.exports = function(env){
	const host = ip.address();
	console.log(`Server is listening at: http://${host}:${config.port}`);
	return webpackMerge(baseConfig(env),{
		entry:[
		    "react-hot-loader/patch",
	        `webpack-dev-server/client?http://${host}:` + port,
			path.resolve(__dirname,"../src/main.js"),
		],
	    devtool: "cheap-eval-source-map",
		plugins:[
			new webpack.HotModuleReplacementPlugin(),
			new webpack.LoaderOptionsPlugin({
				options:{
					postcss(){
						return[precss, autoprefixer];
					}
				}
			})
		],
		devServer:{
			hot:true,
			port:config.port,
			host,
			historyApiFallback:true,
		}
	})
}