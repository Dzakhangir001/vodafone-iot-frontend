const webpack = require('webpack');

function applyVueSvgLoader(svgRule) {
  const svgVue = svgRule.oneOf('vue').resourceQuery(/vue/);
  svgVue.use('babel-loader').loader('babel-loader');
  svgVue
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
    .options({
      svgo: {
        plugins: [{ removeViewBox: false }, { prefixIds: { prefixClassNames: false } }],
      },
    });

  const svgDefault = svgRule.oneOf('default');
  for (const [name, use] of Object.entries(svgRule.uses.entries())) {
    svgDefault.use(name).merge(use.toConfig());
  }

  svgRule.uses.clear();
}

function applyGraphQlLoader(gqlRule) {
  gqlRule
    .test(/\.gql$/)
    .exclude.add(/node_modules/)
    .end()
    .use('graphql')
    .loader(require.resolve('graphql-tag/loader'));
}

module.exports = {
  lintOnSave: false,
  publicPath: process.env.PUBLIC_PATH || '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import '@/styles/artifacts.scss';`,
      },
    },
  },
  chainWebpack(config) {
    config.devtool('source-map');

    config.resolve.alias.set('@@', __dirname);
    config.resolve.alias.set('@core', `${__dirname}/src/features/core`);
    config.resolve.alias.set('lodash', 'lodash-es');

    config.module
      .rule('storysource')
      .test(/\.stories\.tsx?$/)
      .pre()
      .use('storysource')
      .loader(require.resolve('@storybook/addon-storysource/loader'))
      .options({ parser: 'typescript' });

    applyVueSvgLoader(config.module.rule('svg'));
    applyGraphQlLoader(config.module.rule('graphql'));

    config
      .plugin('ignore-moment-locales')
      .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/])
      .before('extract-css');
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ['ignore-moment-locales'],
    },
  },
};
