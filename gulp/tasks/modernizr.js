
import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import modernizr from 'gulp-modernizr';

import { handleError } from '../utils';
import { globalSettings, taskSettings } from '../config';

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
