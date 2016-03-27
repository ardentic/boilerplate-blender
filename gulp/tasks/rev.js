
import gulp from 'gulp';
import del from 'rev-del';
import rev from 'gulp-rev';

import config from '../config';

let revision = () => {
  return gulp
    .src(config.rev.src, { base: config.rev.base })
    .pipe(gulp.dest(config.rev.dest))
    .pipe(rev())
    .pipe(gulp.dest(config.rev.dest))
    .pipe(rev.manifest())
    .pipe(del({ dest: config.rev.dest }))
    .pipe(gulp.dest(config.rev.dest));
};

gulp.task('rev', () => revision());

gulp.task('rev-build', [
  'fonts',
  'eslint',
  'images',
  'stylus',
  'modernizr',
  'browserify'
], () => revision());

gulp.task('rev-watch', [
  'fonts',
  'eslint',
  'images',
  'stylus',
  'watchify',
  'modernizr'
], () => revision());
