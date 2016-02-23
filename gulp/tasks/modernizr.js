
import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import modernizr from 'gulp-modernizr';

import config from '../config';
import { handleError } from '../utils';

let sources = config.modernizr.src.map(source => './' + source);

gulp.task('modernizr', () => {
  return gulp.src(sources)
    .on('error', handleError)
    .pipe(modernizr(config.modernizr.args))
    .pipe(gulpif(config.production, uglify()))
    .pipe(concat('modernizr-custom.js'))
    .pipe(gulp.dest(config.modernizr.dest));
});
