
import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../config';
import { handleError } from '../utils';

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
    .on('error', handleError);
});

gulp.task('watch-images', () => {
  return gulp.watch(['assets/images/**/*'], ['images']);
});
