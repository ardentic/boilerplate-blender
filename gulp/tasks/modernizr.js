
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  modernizr = require('gulp-modernizr');

var utils = require('../utils'),
  config = require('../config');

gulp.task('modernizr', function () {
  gulp.src('./' + config.modernizr.src)
    .on('error', utils.handleError)
    .pipe(concat('modernizr-custom.js'))
    .pipe(modernizr('modernizr-custom.js', config.modernizr.args))
    .pipe(gulpif(config.production, uglify()))
    .pipe(gulp.dest(config.modernizr.dest));
});
