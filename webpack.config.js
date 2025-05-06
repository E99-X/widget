// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.js',
    library: 'TokenSaleWidget',
    libraryTarget: 'window',
    libraryExport: 'default',   // ← exposes your default export as window.TokenSaleWidget
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // babel-loader will now pick up babel.config.json automatically
        },
      },
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.svg$/, use: ['file-loader'] },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/index.html', to: 'index.html' }
      ]
    })
  ],
  resolve: { extensions: ['.js','.jsx'] },
  mode: 'development',     // switch to 'production' when ready
  devtool: 'source-map',
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 3001,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
