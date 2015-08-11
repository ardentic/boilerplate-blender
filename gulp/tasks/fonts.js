
var gulp = require('gulp'),
  changed = require('gulp-changed');

var utils = require('../utils'),
  config = require('../config');

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .on('error', utils.handleError);
});
