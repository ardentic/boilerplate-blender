
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
const DefaultRegistry = require('undertaker-registry');

const { handleError } = require('../utils');
const { globalSettings, taskSettings } = require('../config');

class StylusTasksRegistry extends DefaultRegistry {
  init (gulp) {
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
        .src(taskSettings.stylus.src)
        .pipe(gulpif(!globalSettings.production, sourcemaps.init()))
        .pipe(stylus(settings.stylus))
        .on('error', handleError)
        .pipe(postcss(settings.processors))
        .on('error', handleError)
        .pipe(gulpif(globalSettings.production, cssnano()))
        .pipe(gulpif(!globalSettings.production, sourcemaps.write('.')))
        .pipe(gulp.dest(taskSettings.stylus.dest))
        .pipe(filter('**/*.css'))
        .pipe(reload({ stream: true }));
    });

    gulp.task('watch-stylus', () => {
      return gulp.watch(taskSettings.stylus.search, gulp.series('stylus'));
    });
  }
}

module.exports = new StylusTasksRegistry();
