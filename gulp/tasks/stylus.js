
import gulp from 'gulp';
import gulpif from 'gulp-if';
import stylus from 'gulp-stylus';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import mqpacker from 'css-mqpacker';
import { reload } from 'browser-sync';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import fontWeights from 'postcss-font-weights';

import config from '../config';
import { handleError } from '../utils';

gulp.task('stylus', () => {
  const settings = {
    stylus: {
      'compress': false,
      'include css': true,

      'paths': [
        'node_modules'
      ],

      'import': [
        'normalize.css/normalize.css',
        '@ardentic/stylus-jiggers/jiggers',
        '@ardentic/stylus-mq/mq'
      ]
    },

    processors: [
      autoprefixer({ browsers: ['last 5 versions', '> 1%', 'ie 9'] }),
      mqpacker({ sort: true }),
      fontWeights()
    ]
  };

  return gulp
    .src(config.stylus.src)
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(stylus(settings.stylus))
    .on('error', handleError)
    .pipe(postcss(settings.processors))
    .on('error', handleError)
    .pipe(gulpif(config.production, cssnano()))
    .pipe(gulpif(!config.production, sourcemaps.write('.')))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(filter('**/*.css'))
    .pipe(reload({ stream: true }));
});

gulp.task('watch-stylus', () => {
  return gulp.watch(['assets/styles/**/*'], ['stylus']);
});
