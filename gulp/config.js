
const gutil = require('gulp-util');

module.exports = {
  production: gutil.env.production || process.env.NODE_ENV === 'production' || false,

  styles: {
    src: 'assets/styles/main.styl',
    dest: 'public/styles'
  },

  scripts: {
    src: ['assets/scripts/main.js'],
    dest: 'public/scripts'
  },

  fonts: {
    src: 'assets/fonts/**/*',
    dest: 'public/fonts'
  },

  images: {
    src: 'assets/images/**/*',
    dest: 'public/images'
  },

  eslint: {
    src: [
      'assets/scripts/**/*.{js,jsx}',
      'gulp/**/*.{js,jsx}'
    ]
  },

  modernizr: {
    src: ['assets/scripts/**/*'],
    dest: 'public/scripts/vendor',
    args: {
      options: [
        'html5shiv',
        'setClasses'
      ]
    }
  },

  clean: {
    src: [
      'public/styles',
      'public/scripts',
      'public/fonts',
      'public/images'
    ]
  }
};
