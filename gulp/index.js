
import gulp from 'gulp';
import requireDir from 'require-dir';

import config from './config';

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['rev-watch'], () => {
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);

  gulp.watch(config.eslint.src, ['eslint']);
  gulp.watch(config.rev.src, ['rev']);
});

gulp.task('test', [
  'test-eslint'
]);

gulp.task('default', ['rev-build']);
