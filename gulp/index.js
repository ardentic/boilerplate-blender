
import gulp from 'gulp';
import requireDir from 'require-dir';

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['watchify'], () => {
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/styles/**/*'], ['stylint']);
  gulp.watch(['assets/scripts/**/*'], ['eslint']);
});

gulp.task('server', [
  'php',
  'watch'
]);

gulp.task('test', [
  'test-eslint',
  'test-stylint'
]);

gulp.task('default', [
  'fonts',
  'eslint',
  'images',
  'stylus',
  'stylint',
  'modernizr',
  'browserify'
]);
