const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    entry: path.join(__dirname, './client/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist'),
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
              },
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
              },
        ]
    }
}