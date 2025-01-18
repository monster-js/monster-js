const path = require('path');

module.exports = {
  entry: './src/index.ts', // Your main file
  output: {
    filename: 'index.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd', // Makes the library compatible with both Node.js and browser
    globalObject: 'this', // Fixes an issue for UMD in the browser
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};