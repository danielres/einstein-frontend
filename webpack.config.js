var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: {
    app: './app/main.jsx',
    vendors: [
      'faker', 'lodash', 'reflux', 'react', 'react-intl',
      'react-bootstrap', 'intl', 'react-router',
      'react-router-bootstrap', 'superagent'
    ],
    bootstrap: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
      './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
      './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
      './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
      './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  },
  output: {
    path:     './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: [node_modules_dir], loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'file-loader?name=css/[name].[ext]' },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
