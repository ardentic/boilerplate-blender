
var gulp = require('gulp'),
  eslint = require('gulp-eslint');

var utils = require('../utils'),
  config = require('../config');

gulp.task('lint', function () {
  return gulp.src(config.lint.src)
    .pipe(eslint())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
    .on('error', utils.handleError);
});
