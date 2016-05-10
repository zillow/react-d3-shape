'use strict';

var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var cached = require('gulp-cached');
var changed = require('gulp-changed');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var del = require('del');

var argv = require('yargs')
    .default('reporter', 'spec')
    .default('grep', null)
    .argv;

var libDir = 'lib/';
var jsFiles = 'src/**/*.js';
var testFiles = 'test/**/test-*.js';
var lessFiles = 'src/**/*.less';

gulp.task('clean', clean);
gulp.task('lint', lint);
gulp.task('test', ['lint'], runTests);
gulp.task('test:clean', ['clean', 'lint'], runTests);
gulp.task('test:only', runTests);

gulp.task('copy-less', runCopyLess);
gulp.task('copy-less:clean', ['test:clean'], runCopyLess);

gulp.task('babel', ['copy-less'], runBabel);
gulp.task('babel:clean', ['test:clean'], runBabel);

gulp.task('build', ['copy-less:clean', 'babel:clean']);

gulp.task('watch', ['babel'], function () {
    gulp.watch([jsFiles], ['babel']);
    gulp.watch([lessFiles], ['copy-less']);
    gulp.watch([testFiles], ['test']);
});

gulp.task('default', ['watch']);

function clean() {
    return del(libDir);
}

function lint() {
    return gulp.src([jsFiles, testFiles])
        .pipe(cached('eslint'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(eslint.result(expungeCached));
}

function expungeCached(result) {
    if (result.warningCount > 0 || result.errorCount > 0) {
        delete cached.caches.eslint[path.resolve(result.filePath)];
    }
}

function runTests() {
    require('babel-register')({
        only: [
            path.resolve('src/**'),
            path.resolve('test/**')
        ]
    });

    // avoid blowing up when less files are required
    require.extensions['.less'] = function noop() {};

    return gulp.src(testFiles, {read: false})
        .pipe(mocha({
            require: ['./test/_common.js'],
            reporter: argv.reporter,
            grep: argv.grep
        }));
}

function runCopyLess() {
    return gulp.src(lessFiles)
        .pipe(changed(libDir))
        .pipe(gulp.dest(libDir));
}

function runBabel() {
    return gulp.src(jsFiles)
        .pipe(changed(libDir))
        .pipe(babel())
        .pipe(gulp.dest(libDir));
}
