'use strict';


var webpackConfig = {
  devtool: 'inline-source-map',
  module: {
    loaders: require('./webpack.config.js').module.loaders
  },
  resolve: require('./webpack.config.js').resolve
};


module.exports = function (config) {
  config.set({
    browsers: ['Chrome' ],
    autoWatch: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack' ]
    },
    reporters: [ 'spec' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ]
  });
};
