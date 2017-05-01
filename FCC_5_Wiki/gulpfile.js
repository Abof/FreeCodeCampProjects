var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

var scssSrcGlob = 'src/scss/**/*.scss';
var cssSrcGlob = 'src/css/**/*.css';
var jsxSrcGlob = 'src/jsx/**/*.jsx';
var jsSrcGlob = 'src/js/**/*.js';
var htmlSrcGlob = 'src/**/*.html';
var distDir = 'dist';

// SASS PREPROCESSING
gulp.task('sass', function(){
  return gulp.src(scssSrcGlob)
    .pipe(sass())
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.reload({
        stream: true
    }))
});

// JSX PROCESSING
gulp.task('babel', function(){
  return gulp.src(jsxSrcGlob)
    .pipe(babel())
    .pipe(gulp.dest(distDir))
    .pipe(browserSync.reload({
        stream: true
    }))
});

// COPYING REST OF THE FILES
gulp.task('copy-html', function(){
    return gulp.src(htmlSrcGlob)
        .pipe(gulp.dest(distDir))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('copy-js', function(){
    return gulp.src(jsSrcGlob)
        .pipe(gulp.dest(distDir))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('copy-css', function(){
    return gulp.src(cssSrcGlob)
        .pipe(gulp.dest(distDir))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// BUILD TASK
gulp.task('build', function(cb){
    runSequence(['sass', 'babel', 'copy-html', 'copy-js', 'copy-css'], cb);
});

// BROWSER-IN-SYNC
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: distDir
    },
  })
});


// WATCHERS
gulp.task('watch', ['browserSync', 'build'], function(){
  gulp.watch(scssSrcGlob, ['sass']);
  gulp.watch(jsxSrcGlob, ['babel']);
  gulp.watch(jsSrcGlob, ['copy-js']);
  gulp.watch(cssSrcGlob, ['copy-css']);
  gulp.watch(htmlSrcGlob, ['copy-html']);
})
