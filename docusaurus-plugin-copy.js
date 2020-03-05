const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function(context, opts) {
  const DEFAULT_OPTIONS = {
    include: ['**/*.{png,jpg,jpeg,svg}'],
    path: 'docs'
  };

  const options = {
    ...DEFAULT_OPTIONS,
    ...opts
  };

  const contentPath = path.resolve(context.siteDir, options.path);
  const { include = [] } = options;
  const patterns = include.map(pattern => `${contentPath}/${pattern}`);

  return {
    name: 'docusaurus-plugin-copy',
    getPathsToWatch() {
      return [...patterns];
    },

    configureWebpack() {
      return {
        plugins: [
          new CopyPlugin(patterns.map(pattern => {
            return { from: pattern };
          }))
        ]
      };
    }
  };
};