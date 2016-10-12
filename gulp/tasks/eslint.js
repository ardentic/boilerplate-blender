
const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const notifier = require('node-notifier');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

const lint = () => {
  return gulp.src(taskSettings.eslint.src)
    .pipe(eslint())
    .on('error', handleError)
    .pipe(eslint.format('stylish'));
};

const handleResults = (results) => {
  if (results.errorCount > 0) {
    notifier.notify({
      title: 'Blender',
      message: `Linting errors: ${results.errorCount}`,
      icon: path.join(require.resolve('gulp-notify'), '..', 'assets', 'gulp-error.png'),
      sound: 'Frog'
    });
  }
};

gulp.task('eslint', () => {
  return lint().pipe(eslint.results(handleResults));
});

gulp.task('test-eslint', () => {
  return lint().pipe(eslint.failAfterError());
});

gulp.task('watch-eslint', () => {
  return gulp.watch(taskSettings.eslint.search, ['eslint']);
});
