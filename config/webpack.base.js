const path = require("path")
const webpack = require("webpack")
const config = require("./config");
const publicPath = config.publicPath;
const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = function(env){
	return{
		entry:{
			main:path.resolve(__dirname,"../src/main.js"),
		},
		// externals: {
		// 	'react': 'React',
		//   },
		output: {
			path:path.resolve(__dirname,"../dist"),
            sourceMapFilename: "[name].js.map",
            filename:"[name].js",
            publicPath,
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
            modules: [path.join(__dirname, "../src"), "node_modules"]
        },
        module:{
			loaders:[
				{
					test:/\.jsx?$/,
					use:["babel-loader"],
				},
				{
					test: /\.md$/,
					use: [
						{
							loader: "html-loader"
						},
						{
							loader: "markdown-loader",
							options: {
								pedantic: true,
								renderer
							}
						}
					]
				},
				{ 
					test: /\.(png|jpg|gif)$/, 
					use: ["url-loader?limit=20000&name=images/[hash:16].[ext]"], 
					exclude: "/node_modules/" 
				},
				{ 
					test: /\.scss$/, 
					use: ["style-loader","css-loader?modules","postcss-loader","sass-loader"], 
					exclude: ["/node_modules/",path.resolve(__dirname,"../static")]
				},
				{ 
					test: /\.scss$/, 
					use: ["style-loader","css-loader","postcss-loader","sass-loader"], 
					include: [path.resolve(__dirname,"../static")]
				},
				{
					test: /\.css$/,
					use: [{ loader: "style-loader" }, { loader: "css-loader" }],
				  //   include: [path.resolve(__dirname, "../src")]
				  },
				  {
					test: /\.less$/,
					use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "less-loader" }],
				    include: [path.resolve(__dirname, '../node_modules'),path.resolve(__dirname, '../src')]
				  }
			],
		},
	}
}