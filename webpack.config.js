const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      root: 'ReactWaypointDecorator',
      amd: 'react-waypoint-decorator',
      commonjs: 'react-waypoint-decorator',
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'react',
  },
};
