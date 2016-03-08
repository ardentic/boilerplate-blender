
import gulp from 'gulp';
import requireDir from 'require-dir';

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['watchify'], () => {
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/scripts/**/*'], ['lint']);
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/styles/**/*'], ['stylint']);
});

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
