require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// region Options

const isDev = process.env.APP_ENV === "development";

console.log(process.env.APP_ENV);

const output_path = isDev
    ? path.resolve(__dirname, "build")
    : path.resolve(__dirname, "dist");

// endregion

module.exports = {
    context: path.resolve(__dirname),

    mode: isDev ? "development" : "production",

    entry: {
        main: "./src/js/index"
    },

    output: {
        path: output_path,
        publicPath: "/",
        filename: "js/[name].js"
    },
    
    devtool: isDev ? "inline-source-map" : "source-map",

    devServer: {
        contentBase: "./build",
        watchContentBase: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|dist|build)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.scss$/, /\.css$/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: isDev ? false : true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                  }
            },
            {
                test: /\.(pdf|jpe?g|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "images/[hash]-[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
    },

    plugins: [
        new CleanWebpackPlugin(["build", "dist"]),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new HtmlWebpackPlugin({
            title: "My App timbioz",
            filename: "index.html",
            template: "src/views/webpack_templates/index.html",
            hash: true,
            minify: {
                html5: true
            }
        })
    ]
};
