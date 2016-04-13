/**
 * Created by HelenYin on 2016/3/1.
 */
var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel?presets[]=react,presets[]=es2015'
        },
        {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        },
        {
            test: /\.scss$/, // Only .css files
            loader: 'style!css!sass' // Run both loaders
        }
        ]
    }
};

module.exports = config;