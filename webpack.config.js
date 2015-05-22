module.exports = {
  entry: ['./app/main.jsx'],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
