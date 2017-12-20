const path = require('path');

module.exports = {
  entry: './demo/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'react-waypoint-decorator': path.resolve(__dirname, '../index.js'),
    },
  },
};
