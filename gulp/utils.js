
import notify from 'gulp-notify';
import { globalSettings } from './config';

export const handleError = function (error) {
  if (!globalSettings.production) {
    notify.onError({
      title: 'Blender',
      message: '<%= error.message %>'
    })(error);
  }

  this.emit('end');
};
