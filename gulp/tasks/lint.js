
import gulp from 'gulp';
import path from 'path';
import eslint from 'gulp-eslint';
import notifier from 'node-notifier';

import config from '../config';
import { handleError } from '../utils';

let lint = () => {
  return gulp.src(config.lint.src)
    .pipe(eslint())
    .on('error', handleError)
    .pipe(eslint.format('stylish'));
};

let handleResults = (results) => {
  if (results.errorCount > 0) {
    notifier.notify({
      title: 'Blender',
      message: 'Linting errors: ' + results.errorCount,
      icon: path.join(require.resolve('gulp-notify'), '..', 'assets', 'gulp-error.png'),
      sound: 'Frog'
    });
  }
};

gulp.task('lint', () => {
  return lint().pipe(eslint.results(handleResults));
});

gulp.task('test-lint', () => {
  return lint().pipe(eslint.failAfterError());
});
