var gulp      = require('gulp'),
	concat    = require('gulp-concat'),
	uglify    = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	htmlmin   = require('gulp-htmlmin');
gulp.task('min', function() {
	gulp.src(['src/jquery-3.1.1.js', 'src/mousetrap.js', 'src/unsplash-source.js', 'src/script.js']).pipe(concat('scripts.js')).pipe(gulp.dest('src/'));
	gulp.src('src/scripts.js').pipe(uglify()).pipe(gulp.dest('dist/'));
	gulp.src('src/style.css').pipe(uglifycss()).pipe(gulp.dest('dist/'));
	gulp.src('src/index.html').pipe(htmlmin({collapseWhitespace: true, removeComments: true})).pipe(gulp.dest('dist/'));
});
