'use strict';

var process = require('process')
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {

  var env = process.env.REVERBD_ENV || 'dev';

  var paths = [
      path.join(conf.paths.src, '/env/' + env + '.js'),
      path.join(conf.paths.src, '/app/**/*.js')
  ];

  return gulp.src(paths, {base: conf.paths.src})
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size())
});
