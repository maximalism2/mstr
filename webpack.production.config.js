var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  context: __dirname,
  entry: {
    app: './clients_source',
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      // There is not need to run the loader through
      // vendors
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: 2,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      LANG: JSON.stringify('ua')
    }),
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js', Infinity),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
