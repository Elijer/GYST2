var gulp = require('gulp');
var cp = require('child_process');
var codeclimate = require('gulp-codeclimate-reporter');

gulp.task('codeclimate', function() {
  if (process.version.indexOf('v4') > -1) {
    gulp.src('coverage/lcov.info', { read: false })
      .pipe(codeclimate({
        token: 'ce1e78802b997805b038aa27e37366dc208a3f0d4afe59d0fb00719a942133a8'
      }));
  }
});

