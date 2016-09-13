
import gutil from 'gulp-util';

const globalSettings = {
  production: gutil.env.production || process.env.NODE_ENV === 'production' || false
};

const taskSettings = {
  stylus: {
    src: 'assets/styles/main.styl',
    dest: 'public/styles',
    search: 'assets/styles/**/*.{css,styl}'
  },

  scripts: {
    src: ['assets/scripts/main.js'],
    dest: 'public/scripts'
  },

  fonts: {
    src: 'assets/fonts/**/*',
    dest: 'public/fonts',
    search: 'assets/fonts/**/*'
  },

  images: {
    src: 'assets/images/**/*',
    dest: 'public/images',
    search: 'assets/images/**/*'
  },

  eslint: {
    src: [
      'assets/scripts/**/*.{js,jsx}',
      'gulp/**/*.{js,jsx}'
    ],
    search: [
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

export { taskSettings, globalSettings };
