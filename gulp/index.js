
require('dotenv').config({ silent: true });
require('babel-core/register');

var gulp = require('gulp'),
  requireDir = require('require-dir');

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['watchify'], function () {
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/scripts/**/*'], ['lint']);
});

gulp.task('default', ['stylus', 'fonts', 'images', 'lint', 'modernizr', 'browserify']);
