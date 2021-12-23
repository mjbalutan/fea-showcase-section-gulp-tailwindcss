const { src, dest, series, watch } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('gulp-browserify');
const inlineFonts  = require('gulp-inline-fonts');

function styles() {

    const tailwindcss = require('tailwindcss'); 

    return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css'))
    .pipe(postcss([
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        require('cssnano')
    ]))
    .pipe(concat('main.css'))
    .pipe(dest('dist/css'))
}

function scripts() {
    return src([
        'src/js/components/**/*.js',
        'src/js/index.js',
    ])
    .pipe(plumber())
    .pipe(babel({
        presets: [
            [
                "@babel/env"
            ]
        ]
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'));
}

function html() {
    return src('src/**/*.html')
        .pipe(dest('dist/'));
}

function images() {
    return src('src/**/*.+(png|jpg|gif)')
        .pipe(changed('dist'))
        .pipe(imagemin())
        .pipe(dest('dist'));
}

function bundle() {
    return src('./dist/js/main.min.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(dest('./dist/js'))
}

function fonts() {
    return src(['src/fonts/CenturyGothic/*'])
      .pipe(inlineFonts({ name: 'CenturyGothic' }))
      .pipe(dest('dist/fonts/'));
}

exports.build = series(styles, scripts, html, images, fonts, bundle);

exports.watch = function() {

    watch('src/**/*.js', series(scripts, bundle));
    watch('src/**/*.scss', series(styles));
    watch('src/**/*.html', series(html));
    watch('src/**/*.+(png|jpg|gif)', series(images));
    watch('src/**/*.+(ttf|otf)', series(fonts));

}