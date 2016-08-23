
require('dotenv').config({ silent: true });

const gulp = require('gulp');
const requireDir = require('require-dir');

// Load gulp tasks
requireDir('./tasks');

gulp.task('watch', ['watchify'], () => {
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/scripts/**/*'], ['eslint']);
});

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
