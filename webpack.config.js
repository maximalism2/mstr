var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require('common-chunk-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  // devtool: 'source-map',
  devtool: 'eval',
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './clients_source/index'],
  },
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  // resolve: {
  //   extensions: ['', '.jsx', '.js', '.json'],
  //   modulesDirectories: [
  //     'node_modules',
  //     path.resolve(__dirname, './node_modules')
  //   ]
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
  ],
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'clients_source')
    }]
  }
};
