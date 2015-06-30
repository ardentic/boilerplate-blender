
'use strict';

var config = require('../config'),
  utils = require('../utils'),
  gulp = require('gulp'),
  changed = require('gulp-changed');

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .on('error', utils.handleError);
});
