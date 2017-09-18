var less_dir = ['./src/less/rapid-screensaver.less'],
	css_dir = './dist/css/';

var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    rename = require("gulp-rename"),
    watch = require('gulp-watch'),
    autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]}),
    cleancss = new LessPluginCleanCSS({ advanced: true, keepSpecialComments: 0 });

/*Default Task*/
gulp.task('default', ['less']);

/*Watch Task*/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(html_dir, ['bootlint']);
    gulp.watch(less_dir, ['less']);
    gulp.watch(js_dir, ['js-build-dev', 'jshint']);
});

/*Compile LESS*/
gulp.task('less', ['less-main', 'less-minify']);

gulp.task('less-main', function() {
    return gulp.src(less_dir)
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ],
          plugins: [autoprefix]
        })).pipe(livereload())
        .pipe(rename('rapid-screensaver.css'))
        .pipe(gulp.dest(css_dir));
});

gulp.task('less-minify', function() {
    return gulp.src(less_dir)
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ],
          plugins: [cleancss, autoprefix]
        })).pipe(livereload())
        .pipe(rename('rapid-screensaver.min.css'))
        .pipe(gulp.dest(css_dir));
});

