var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  // devtool: 'source-map',
  devtool: 'eval',
  entry: {
    home:['webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './app/home'],
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
      include: path.join(__dirname, './app')
    }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
    }
    ]
  },
  toolbox: {
    theme: path.join(__dirname, 'app/toolbox-theme.scss')
  },
  postcss: [autoprefixer]
};
