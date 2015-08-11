
var gulp = require('gulp'),
  changed = require('gulp-changed');

var utils = require('../utils'),
  config = require('../config');

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
    .on('error', utils.handleError);
});
