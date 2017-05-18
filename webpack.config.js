var path = require('path');
//  Must have absolute path for entry file.
module.exports = {
  entry: "./app/assets/javascripts/lib/pong.js",
  output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: "bundle.js"
  },

};
