
'use strict';

var config = require('../config'),
  utils = require('../utils'),
  gulp = require('gulp'),
  changed = require('gulp-changed');

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
    .on('error', utils.handleError);
});
