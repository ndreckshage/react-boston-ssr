var webpack = require('webpack');

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:3001`,
    'webpack/hot/only-dev-server',
    './src/client.jsx'
  ],
  output: {
    path: `${__dirname}/build/`,
    filename: 'client.js',
    publicPath: '/build/'
  },
  externals: [{
    // see lib/react -- skipping this will make it so webpack doesnt bring in an extra, unnecessary react version
    "react/dist/react.min": true
  }],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'src'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', '6to5-loader'], exclude: /node_modules/ }
    ]
  }
};
