
const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const modernizr = require('gulp-modernizr');

const { handleError } = require('../utils');
const { globalSettings, taskSettings } = require('../config');

const sources = taskSettings.modernizr.src.map((source) => {
  return `./${source}`;
});

gulp.task('modernizr', () => {
  return gulp.src(sources)
    .on('error', handleError)
    .pipe(modernizr(taskSettings.modernizr.args))
    .pipe(gulpif(globalSettings.production, uglify()))
    .pipe(concat('modernizr-custom.js'))
    .pipe(gulp.dest(taskSettings.modernizr.dest));
});
