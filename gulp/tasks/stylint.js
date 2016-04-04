
import gulp from 'gulp';
import stylint from 'gulp-stylint';

import config from '../config';
import { handleError } from '../utils';

let lint = () => {
  return gulp.src(config.stylint.src)
    .pipe(stylint({ reporter: 'stylint-stylish' }))
    .on('error', handleError)
    .pipe(stylint.reporter());
};

gulp.task('stylint', () => {
  return lint();
});

gulp.task('test-stylint', () => {
  return lint().pipe(stylint.reporter('fail'));
});
