var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    util = require('gulp-util'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    path = require('path');
    //livereload = require('gulp-livereload');
    //babelify = require("babelify");

//gulp
  // performs magic
//   .task('browserify', function(){
//     gulp.src('src/js/main.js')
//       .pipe(plumber())
//       .pipe(
//         browserify({ 
//           transform: [babelify], 
//           extensions: ['.jsx'],
//           debug: false 
//         })
//       )
//       .pipe(concat('main.js'))
//       .pipe(plumber.stop())
//       .pipe(gulp.dest('build/js'))
//       .pipe(livereload());
//   })
//   .task('production',function() {
//     connect.server({
//       root: ['./build'],
//       port: process.env.PORT || 5000, // localhost:5000
//       livereload: false
//     });
//   })
  //uglifies the JS for deployment
//   .task('uglify',function(){
//     gulp.src('build/js/main.js')
//       .pipe(uglify())
//       .pipe(gulp.dest('build/js'));
//   })

  // moves source files to build
  gulp.task('copy', function(){
     gulp
      .src('src/assets/**/*.*')
      .pipe(gulp.dest('public/assets'));
   
     gulp
      .src('src/img/**/*.*')
      .pipe(gulp.dest('public/img'));
  })
  
  // local development server
  .task('connect', function(){
    connect.server({
      root: ['build'],
      port: '8003',
      base: 'http://localhost',
      //livereload: true
    });
  })

  //compile css
  .task('sass', function() {
    gulp.src('src/css/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/css/'));
      console.log('gulp sass finished');
  })
 
  // build the application
  .task('default', ['sass', 'copy', 'connect'])
  .task('onchange', ['sass', 'copy'])

  .task('build',['sass','copy'])
  // watch for source changes
  .task('watch', ['default'], function(){
    //livereload.listen();
    gulp.watch(['src/css/*.scss'], ['onchange']);
  });
