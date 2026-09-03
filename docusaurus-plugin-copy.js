const path = require('path');

module.exports = function(context, opts) {
  const DEFAULT_OPTIONS = {
    include: ['**/*.{png,jpg,jpeg,svg}'],
    context: '',
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

    configureWebpack(_config, _isServer, { currentBundler }) {
      const { context } = options;
      const CopyPlugin =
        currentBundler?.name === 'rspack'
          ? currentBundler.instance.CopyRspackPlugin
          : require('copy-webpack-plugin');
      return {
        plugins: [
          new CopyPlugin(patterns.map(pattern => {
            return {
              from: pattern,
              context
            };
          }))
        ]
      };
    }
  };
};
