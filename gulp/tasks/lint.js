
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
      quotes: [1, 'single']
    }
  };

  return gulp.src(config.lint.src)
    .pipe(eslint(settings))
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
    .on('error', utils.handleError);
});
