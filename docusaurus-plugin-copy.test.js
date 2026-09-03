const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const plugin = require('./docusaurus-plugin-copy');

const context = { siteDir: '/site' };

test('name', () => {
  const instance = plugin(context, {});
  assert.equal(instance.name, 'docusaurus-plugin-copy');
});

test('applies default options when none are given', () => {
  const instance = plugin(context, {});
  assert.deepEqual(instance.getPathsToWatch(), [
    '/site/docs/**/*.{png,jpg,jpeg,svg}'
  ]);
});

test('resolves the content path against context.siteDir and options.path', () => {
  const instance = plugin(context, { path: 'static/assets', include: ['**/*.png'] });
  assert.deepEqual(instance.getPathsToWatch(), ['/site/static/assets/**/*.png']);
});

test('supports multiple include patterns', () => {
  const instance = plugin(context, {
    path: 'docs',
    include: ['**/*.png', '**/*.pdf']
  });
  assert.deepEqual(instance.getPathsToWatch(), [
    '/site/docs/**/*.png',
    '/site/docs/**/*.pdf'
  ]);
});

test('configureWebpack registers a CopyPlugin with one pattern per include entry', () => {
  const instance = plugin(context, {
    path: 'docs',
    include: ['**/*.png', '**/*.pdf']
  });
  const { plugins } = instance.configureWebpack();
  assert.equal(plugins.length, 1);
  assert.deepEqual(plugins[0].patterns, [
    { from: '/site/docs/**/*.png', context: '' },
    { from: '/site/docs/**/*.pdf', context: '' }
  ]);
});

test('configureWebpack forwards the context option to every pattern', () => {
  const instance = plugin(context, {
    path: 'docs',
    include: ['**/*.png'],
    context: path.join('/site', 'src')
  });
  const { plugins } = instance.configureWebpack();
  assert.deepEqual(plugins[0].patterns, [
    { from: '/site/docs/**/*.png', context: '/site/src' }
  ]);
});
