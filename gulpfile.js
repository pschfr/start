var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var htmlmin   = require('gulp-htmlmin');
gulp.task('minify', function() {
	gulp.src('src/script.js').pipe(uglify()).pipe(gulp.dest('dist/'));
	gulp.src('src/style.css').pipe(uglifycss()).pipe(gulp.dest('dist/'));
	gulp.src('src/index.html').pipe(htmlmin({collapseWhitespace: true, removeComments: true})).pipe(gulp.dest('dist/'));
});
