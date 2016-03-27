
import gutil from 'gulp-util';

export default {
  production: gutil.env.production || process.env.NODE_ENV === 'production' || false,

  styles: {
    src: 'assets/styles/main.styl',
    dest: 'public/styles'
  },

  scripts: {
    src: ['assets/scripts/main.js'],
    paths: ['assets/scripts'],
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

  rev: {
    src: [
      'public/**/*.{css,js}',
      '!public/build/**/*'
    ],

    dest: 'public/build',

    base: 'public'
  },

  clean: {
    src: [
      'public/fonts',
      'public/build',
      'public/images',
      'public/styles',
      'public/scripts'
    ]
  }
};
