const { src, dest, parallel, watch, series } = require('gulp');
const Uglify = require('gulp-uglify');

const { promisify } = require('util');
// return promisify(gulp.series(func))();

const Sass = require('gulp-sass');
Sass.compiler = require('node-sass');

const NwBuilder = require('nw-builder');
const nw = new NwBuilder({
    files: './path/to/nwfiles/**/**', // use the glob format
    platforms: [/*'osx64', 'win32', */'win64'],
    version: '0.1.0'
});
nw.on('log',  console.log);

function devWatch(cb) {
    nw.run().then(function () {
        console.log('all done!');
    }).catch(function (error) {
        console.error(error);
    });

    cb();
}


// function html() {
//     return src('src/templates/*.html')
//       .pipe(dest('build/templates'))
// }

// function css() {
//     return src('client/templates/*.scss')
//       .pipe(Sass())
//       .pipe(dest('build/css'))
// }

// function nw() {
//     return src('client/templates/*.less')
//       .pipe(less())
//       .pipe(minifyCSS())
//       .pipe(dest('build/css'))
// }

// function js() {
//     return src('src/js/*.mjs', { sourcemaps: true })
//         .pipe(Uglify())
//         .pipe(concat('app.mjs'))
//         .pipe(dest('build/js', { sourcemaps: true }))
// }

// GulpWatch(['src/*.*', '/package.json'], function(callback) {

//     callback();
// });

// exports.default = parallel(html, css, js, nw);
exports.default = series(devWatch);
