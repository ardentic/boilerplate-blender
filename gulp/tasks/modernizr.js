
const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const modernizr = require('gulp-modernizr');

const config = require('../config');
const { handleError } = require('../utils');

let sources = config.modernizr.src.map(source => './' + source);

gulp.task('modernizr', () => {
  return gulp.src(sources)
    .on('error', handleError)
    .pipe(modernizr(config.modernizr.args))
    .pipe(gulpif(config.production, uglify()))
    .pipe(concat('modernizr-custom.js'))
    .pipe(gulp.dest(config.modernizr.dest));
});
