
const gulp = require('gulp');

const cleanTasks = require('./tasks/clean');
const fontsTasks = require('./tasks/fonts');
const imagesTasks = require('./tasks/images');
const eslintTasks = require('./tasks/eslint');
const stylusTasks = require('./tasks/stylus');
const modernizrTasks = require('./tasks/modernizr');
const browserifyTasks = require('./tasks/browserify');
const connectPHPTasks = require('./tasks/connect-php');

gulp.registry(cleanTasks);
gulp.registry(fontsTasks);
gulp.registry(imagesTasks);
gulp.registry(eslintTasks);
gulp.registry(stylusTasks);
gulp.registry(modernizrTasks);
gulp.registry(browserifyTasks);
gulp.registry(connectPHPTasks);

gulp.task('watch',
  gulp.parallel(
    'watchify',
    'watch-fonts',
    'watch-images',
    'watch-stylus',
    'watch-eslint'
  )
);

gulp.task('server',
  gulp.parallel(
    'connect-php',
    'watch'
  )
);

gulp.task('test',
  gulp.parallel(
    'test-eslint'
  )
);

gulp.task('build',
  gulp.parallel(
    'fonts',
    'images',
    'stylus',
    'modernizr',
    'browserify'
  )
);

gulp.task('default',
  gulp.series(
    'build'
  )
);
