var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, 'client/index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dist.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
   })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.json$/,
      loaders: [ 'json' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.less$/,
      loader: "style!css!less",
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}
