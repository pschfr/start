var gulp      = require('gulp'),
	sass      = require('gulp-sass')
	concat    = require('gulp-concat'),
	uglify    = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	htmlmin   = require('gulp-htmlmin');
gulp.task('default', function() {
	// Concatenates third-party and my JS together
	gulp.src(['src/vendor/jquery-3.1.1.slim.js', 'src/vendor/mousetrap.js', 'src/vendor/unsplash-source.js', 'src/script.js']).pipe(concat('scripts.js')).pipe(gulp.dest('src/'));
	// Minifies JS, moves to dist
	gulp.src('src/scripts.js').pipe(uglify()).pipe(gulp.dest('dist/'));
	// Compiles CSS from Sass partials
	gulp.src('src/style.sass').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('src/'));
	// Minifies CSS, moves to dist
	gulp.src('src/style.css').pipe(uglifycss()).pipe(gulp.dest('dist/'));
	// Minifies HTML, moves to dist
	gulp.src('src/index.html').pipe(htmlmin({collapseWhitespace: true, removeComments: true})).pipe(gulp.dest('dist/'));
});
