
import gulp from 'gulp';
import requireDir from 'require-dir';

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['watchify'], () => {
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/scripts/**/*'], ['lint']);
});

gulp.task('test', [
  'test-lint'
]);

gulp.task('default', [
  'lint',
  'fonts',
  'images',
  'stylus',
  'modernizr',
  'browserify'
]);
