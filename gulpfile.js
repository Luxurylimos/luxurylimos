var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    gulp.src('sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./docs/css/'))
        .pipe(browserSync.stream());
});
gulp.task('html', function(){
    gulp.src('*.html')
        .pipe(gulp.dest('./docs/'));
});
gulp.task('img', function() {
    gulp.src('img/*.jpg')
        .pipe(gulp.dest('./docs/img/'));
});


gulp.task('browser-sync', ['styles', 'html', 'img'], function(){
    browserSync.init({
        server: "./docs" ,
        routes: {
        "/luxurylimos": "docs"
        }
    });

    gulp.watch('img/*.jpg', ['img']);
    gulp.watch('*.html', ['html']).on('change', browserSync.reload);
    gulp.watch('sass/**/*.sass', ['styles']);
});

gulp.task('default',['browser-sync']);