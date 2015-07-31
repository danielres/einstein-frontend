module.exports = {
  entry: [
    './app/main.jsx',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
    './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
    './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'
  ],
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
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'file-loader?name=css/[name].[ext]' },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  }
};
