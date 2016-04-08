var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  // devtool: 'source-map',
  devtool: 'eval',
  entry: {
    app: ['webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './clients_source/'],
  },
  output: {
    path: path.join(__dirname, '/public/js'),
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
  plugins: [
    new ExtractTextPlugin('../styles/[name].css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
  ],
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
      include: path.join(__dirname, 'clients_source')
    }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&postcss!sass?sourceMap'),
        include: path.join(__dirname, './public/styles')
    }]
  }
};
