
const gulp = require('gulp');
const requireDir = require('require-dir');

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', [
  'watchify',
  'watch-fonts',
  'watch-images',
  'watch-stylus',
  'watch-eslint'
]);

gulp.task('server', [
  'php',
  'watch'
]);

gulp.task('test', [
  'test-eslint'
]);

gulp.task('build', [
  'fonts',
  'eslint',
  'images',
  'stylus',
  'modernizr',
  'browserify'
]);

gulp.task('default', [
  'build'
]);
