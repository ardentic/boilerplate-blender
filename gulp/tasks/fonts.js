
import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../config';
import { handleError } from '../utils';

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .on('error', handleError);
});
