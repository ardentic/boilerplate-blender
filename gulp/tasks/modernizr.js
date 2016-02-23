
import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import modernizr from 'gulp-modernizr';

import utils from '../utils';
import config from '../config';

let sources = config.modernizr.src.map(source => './' + source);

gulp.task('modernizr', () => {
  return gulp.src(sources)
    .on('error', utils.handleError)
    .pipe(modernizr(config.modernizr.args))
    .pipe(gulpif(config.production, uglify()))
    .pipe(concat('modernizr-custom.js'))
    .pipe(gulp.dest(config.modernizr.dest));
});
