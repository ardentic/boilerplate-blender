
import gulp from 'gulp';
import gutil from 'gulp-util';
import portfinder from 'portfinder';
import browserSync from 'browser-sync';
import connect from 'gulp-connect-php';

gulp.task('php', () => {
  let serverPort = gutil.env.port || 8000;
  let proxyPort = 9000;

  portfinder.basePort = proxyPort;

  portfinder.getPort((error, port) => {
    let settings = {
      hostname: '0.0.0.0',
      base: gutil.env.base || '.',
      keepalive: false,
      port: port
    };

    browserSync({
      proxy: `0.0.0.0:${port}`,
      port: serverPort,
      open: false
    });

    connect.server(settings);
  });
});
