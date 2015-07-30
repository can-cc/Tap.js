var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var pkg = require('./package.json');

var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');


gulp.task('connect', function(){
  connect.server({
    root: "app",
    host: "0.0.0.0",
    port: 8989,
    livereload: true
  });
});

gulp.task('connect:html', function() {
  gulp.src('app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('connect:css', function() {
  gulp.src('app/css/**/*.css')
    .pipe(connect.reload());
});


gulp.task('connect:watch', function() {
  gulp.watch(['app/**/*.html'], ['connect:html']);
  gulp.watch(['app/css/**/*.css'], [ 'connect:css']);
  gulp.watch(['app/js/**/*.js'], [ 'connect:html']);
});



gulp.task('serve',
          ['connect',
           'connect:html',
           'connect:css',
           'connect:watch'
          ]);
