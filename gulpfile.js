var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
// var nodeInspector = require('gulp-node-inspector');



gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('images', function () {
    gulp.src('images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images/'));
});

// gulp.task('styles', function () {
//     return gulp.src(['./public/styles/scss/**/*.scss', '!./public/styles/scss/partials/**'])
//         .pipe(sourcemaps.init({ largeFile: true }))
//         .pipe(sass({
//             outputStyle: 'compressed',
//             sourceMap: true
//         }).on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         // .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest('./public/styles/css/'))
//         .pipe(browserSync.reload({ stream: true }))
// });

gulp.task('styles', function () {
    return gulp.src('app/public/scss/main.scss')
        .pipe(sass({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/public/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
    return gulp.src('public/js/partials/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream())
});

gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        // ignore: ["" + __dirname + "/public/**/*.*"],
        // ignore: ["" + __dirname + "/static/**/*.*"],
        ext: 'js'
        // env: {
        //     'NODE_ENV': 'development'
        // }
        // , exec: 'node-inspector & node --debug'
    })
});
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 4000,
        notify: false,
    });
});
gulp.task('prefix', () =>
    gulp.src('/public/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('/public/main.css'))
);

gulp.task('no-wifi', ['nodemon'], function () {
    gulp.watch("public/scss/**/*.scss", ['styles']);
    gulp.watch("public/js/partials/*.js", ['scripts']);
    gulp.watch("views/**/*.pug");
});

gulp.task('serve', ['nodemon', 'browser-sync'], function () {
    gulp.watch("public/css/**/*.css", ['styles']);
    gulp.watch("public/js/partials/*.js", ['scripts', 'bs-reload']);
    gulp.watch("views/**/*.pug", ['bs-reload']);
    // gulp.watch(config.jade.watch, ['jade', browserSync.reload]);
});