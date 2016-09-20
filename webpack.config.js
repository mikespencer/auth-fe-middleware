module.exports = {
  entry: {
    index: './src/index'
  },

  output: {
    path: 'dist',
    filename: '[name].js',
    publicPath: 'dist',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  target: 'node',

  resolve: {
    extensions: ['', '.js']
  }
}
