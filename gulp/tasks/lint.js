
import gulp from 'gulp';
import path from 'path';
import eslint from 'gulp-eslint';
import notifier from 'node-notifier';

import utils from '../utils';
import config from '../config';

let lint = () => {
  return gulp.src(config.lint.src)
    .pipe(eslint())
    .on('error', utils.handleError)
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

gulp.task('lint', () => lint().pipe(eslint.results(handleResults)));
gulp.task('test-lint', () => lint().pipe(eslint.failAfterError()));
