
'use strict';

var gulp = require('gulp'),
  requireDir = require('require-dir');

requireDir('./tasks');

gulp.task('watch', ['watchify'], function () {
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/scripts/**/*', 'gulp/**/*'], ['lint']);
});

gulp.task('default', ['stylus', 'fonts', 'images', 'lint', 'modernizr', 'browserify']);
