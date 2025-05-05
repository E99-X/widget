const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your React entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.js',  // Output the bundled widget as widget.js
    libraryTarget: 'umd',   // Make the module globally accessible
    globalObject: 'this',   // Ensure compatibility with various environments
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Use Babel to transpile JS/JSX files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // React preset for JSX
          },
        },
      },
      {
        test: /\.css$/,  // Match .css files
        use: ['style-loader', 'css-loader'],  // Inject CSS into the DOM using style-loader
      },
      {
        test: /\.svg$/,  // Match .svg files
        use: ['file-loader'],  // Use file-loader to process SVG files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve .js and .jsx file extensions
  },
  mode: 'production',  // Production mode for optimized build
  devServer: {
    contentBase: path.join(__dirname, 'dist'),  // Serve the dist directory where widget.js is located
    port: 3001,  // Choose a port (can be 3000 or any other unused port)
    hot: true,  // Enable hot reloading for development
    headers: {
      'Access-Control-Allow-Origin': '*',  // Enable CORS for external access
    },
  },
};
