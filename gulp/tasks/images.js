
import gulp from 'gulp';
import changed from 'gulp-changed';

import { handleError } from '../utils';
import { taskSettings } from '../config';

gulp.task('images', () => {
  return gulp.src(taskSettings.images.src)
    .pipe(changed(taskSettings.images.dest))
    .pipe(gulp.dest(taskSettings.images.dest))
    .on('error', handleError);
});

gulp.task('watch-images', () => {
  return gulp.watch(taskSettings.images.search, ['images']);
});
