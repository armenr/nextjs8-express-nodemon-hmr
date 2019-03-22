const BabiliPlugin = require('babili-webpack-plugin');
const withPlugins = require('next-compose-plugins');

module.exports = {
  publicRuntimeConfig: {
    url: process.env.URL
  },
  serverRuntimeConfig: {
    url: process.env.SERVER_SIDE_URL || process.env.URL,
    armen: 'Test'
  },
  webpack(config, { dev }) {
    // remove Uglify plugin
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'UglifyJsPlugin';
    });

    if (!dev) {
      // add Babili plugin
      config.plugins.push(new BabiliPlugin());
    }

    return config;
  }
};
