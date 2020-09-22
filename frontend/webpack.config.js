const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: "file-loader",
                exclude: /node_modules/,
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                },
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: 'src/index.html'
        }
    )],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: "/",
        host: "127.0.0.1",
        overlay: true,
        port: 8080,
        stats: "errors-only",
        historyApiFallback: true,
    },
}