
import gulp from 'gulp';
import gutil from 'gulp-util';
import portfinder from 'portfinder';
import browserSync from 'browser-sync';
import connect from 'gulp-connect-php';

gulp.task('php', () => {
  const serverPort = gutil.env.port || process.env.PORT || 8000;
  const proxyPort = 9000;

  portfinder.basePort = proxyPort;

  portfinder.getPort((error, port) => {
    const settings = {
      hostname: '0.0.0.0',
      base: gutil.env.documentRoot || process.env.DOCUMENT_ROOT || '.',
      keepalive: false,
      port
    };

    browserSync({
      proxy: `0.0.0.0:${port}`,
      port: serverPort,
      open: false
    });

    connect.server(settings);
  });
});
