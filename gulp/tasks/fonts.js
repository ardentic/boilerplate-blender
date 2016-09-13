
import gulp from 'gulp';
import changed from 'gulp-changed';

import { handleError } from '../utils';
import { taskSettings } from '../config';

gulp.task('fonts', () => {
  return gulp.src(taskSettings.fonts.src)
    .pipe(changed(taskSettings.fonts.dest))
    .pipe(gulp.dest(taskSettings.fonts.dest))
    .on('error', handleError);
});

gulp.task('watch-fonts', () => {
  return gulp.watch(['assets/fonts/**/*'], ['fonts']);
});
