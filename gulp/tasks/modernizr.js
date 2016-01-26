
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  modernizr = require('gulp-modernizr');

var utils = require('../utils'),
  config = require('../config');

var sources = config.modernizr.src
  .map(source => './' + source);

gulp.task('modernizr', function () {
  return gulp.src(sources)
    .on('error', utils.handleError)
    .pipe(modernizr(config.modernizr.args))
    .pipe(gulpif(config.production, uglify()))
    .pipe(concat('modernizr-custom.js'))
    .pipe(gulp.dest(config.modernizr.dest));
});
