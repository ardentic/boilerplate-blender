
const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const notifier = require('node-notifier');

const config = require('../config');
const { handleError } = require('../utils');

let lint = () => {
  return gulp.src(config.eslint.src)
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

gulp.task('eslint', () => {
  return lint().pipe(eslint.results(handleResults));
});

gulp.task('test-eslint', () => {
  return lint().pipe(eslint.failAfterError());
});
