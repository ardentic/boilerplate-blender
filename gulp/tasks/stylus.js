
const gulp = require('gulp');
const gulpif = require('gulp-if');
const stylus = require('gulp-stylus');
const filter = require('gulp-filter');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const mqpacker = require('css-mqpacker');
const { reload } = require('browser-sync');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fontWeights = require('postcss-font-weights');

const config = require('../config');
const { handleError } = require('../utils');

gulp.task('stylus', () => {
  let settings = {
    stylus: {
      compress: false,
      'include css': true,

      paths: [
        'node_modules'
      ],

      import: [
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
    .src(config.styles.src)
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(stylus(settings.stylus))
    .on('error', handleError)
    .pipe(postcss(settings.processors))
    .on('error', handleError)
    .pipe(gulpif(config.production, cssnano()))
    .pipe(gulpif(!config.production, sourcemaps.write('.')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(filter('**/*.css'))
    .pipe(reload({ stream: true }));
});
