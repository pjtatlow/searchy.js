'use strict';

var gulp = require('gulp'), 
    rename = require('gulp-rename'),
    uglify_js = require('gulp-uglify'),
    uglify_css = require('gulp-uglifycss'),
    sass = require('gulp-sass');

gulp.task('build',function() {
    gulp
    .src('src/searchy.js')
    .pipe(uglify_js())
    .pipe(rename('searchy.min.js'))
    .pipe(gulp.dest('dist/'));

    gulp
    .src('src/searchy.scss')
    .pipe(sass())
    .pipe(uglify_css())
    .pipe(rename('searchy.min.css'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('default',['build'])

