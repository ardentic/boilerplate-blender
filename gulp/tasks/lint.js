
'use strict';

var config = require('../config'),
  utils = require('../utils'),
  gulp = require('gulp'),
  eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src(config.lint.src)
    .pipe(eslint())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
    .on('error', utils.handleError);
});
