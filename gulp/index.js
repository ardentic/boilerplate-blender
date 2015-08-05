
'use strict';

var dotenv = require('dotenv'),
  gulp = require('gulp'),
  requireDir = require('require-dir');

// Load .env and fail silently
dotenv.config({ silent: true });

// Load additional gulp task
requireDir('./tasks');

gulp.task('watch', ['watchify'], function () {
  gulp.watch(['assets/styles/**/*'], ['stylus']);
  gulp.watch(['assets/images/**/*'], ['images']);
  gulp.watch(['assets/fonts/**/*'], ['fonts']);
  gulp.watch(['assets/scripts/**/*'], ['lint']);
});

gulp.task('default', ['stylus', 'fonts', 'images', 'lint', 'modernizr', 'browserify']);
