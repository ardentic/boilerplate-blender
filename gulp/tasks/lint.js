
'use strict';

var config = require('../config'),
  utils = require('../utils'),
  gulp = require('gulp'),
  eslint = require('gulp-eslint');

gulp.task('lint', function () {
  var settings = {
    env: {
      browser: true,
      node: true
    },

    rules: {
      'quotes': [2, 'single'],
      'camelcase': [1, { 'properties': 'always' }],
      'space-before-function-paren': [2, 'always'],
      'space-after-keywords': [2, 'always'],
      'space-before-blocks': [2, 'always'],
      'space-in-parens': [2, 'never'],
      'no-multiple-empty-lines': [2, { max: 1 }],
      'object-curly-spacing': [2, 'always'],
      'dot-location': [2, 'property'],
      'no-else-return': [2, 'always'],
      'no-param-reassign': [2, 'always'],
      'no-self-compare': [2, 'always'],
      'radix': [2, 'always'],
      'handle-callback-err': [2, 'always'],
      'brace-style': [2, '1tbs'],
      'no-lonely-if': [2, 'always'],
      'max-len': [2, 115, 2],
      'no-plusplus': [2, 'always']
    }
  };

  return gulp.src(config.lint.src)
    .pipe(eslint(settings))
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
    .on('error', utils.handleError);
});
