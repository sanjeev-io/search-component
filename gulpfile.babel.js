import { src, dest, watch, series, parallel } from 'gulp';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import yargs from 'yargs';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
//import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import del from 'del';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import info from './package.json';
import replace from 'gulp-replace';
import tailwindcss from 'tailwindcss';

const PRODUCTION = yargs.argv.prod;

// Define path variables for src and dist.
const paths = {
  src: 'src/**/*',
  srcImages: 'src/images/**/*.{jpg,jpeg,png,svg,gif}',
  srcFonts: 'src/fonts/**/*',
  srcJS: 'src/js/*.js',
  srcSCSS: 'src/**/*.scss',

  config: './tailwind.config.js',

  dist: 'dist',
  distImages: 'dist/images/',
  distFonts: 'dist/fonts/**/*',
  distJS: 'dist/js/*.js',
  distCSS: 'dist/**/*.css'
};

// Styles task to compile scss, autoprefixer, source map etc.
export const styles = () => {
  return (
    src(paths.srcSCSS)
      .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
      .pipe(
        gulpif(
          !PRODUCTION,
          sass({
            outputStyle: 'compact', // set to 'compact' for sourcemaps to work.
            indentType: 'tab',
            indentWidth: 1
          }).on('error', sass.logError)
        )
      )
      .pipe(
        gulpif(
          PRODUCTION,
          sass({
            outputStyle: 'expanded', // Should be for expanded for theme packages.
            indentType: 'tab',
            indentWidth: 1
          }).on('error', sass.logError)
        )
      )
      .pipe(postcss([tailwindcss(paths.config), autoprefixer(['last 3 versions'])]))
      //.pipe(gulpif(PRODUCTION, cleanCss({compatibility: "ie10"}))) // Uncomment and use for themes.waituk.com
      .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
      .pipe(dest(paths.dist))
      .pipe(server.stream())
  );
};

// Image Minify
export const images = () => {
  return src(paths.srcImages)
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest(paths.distImages));
};

// Copy all src files except images, js and scsss
export const copy = () => {
  //return src(paths.src, !paths.srcImages, !paths.srcJS, !paths.srcSCSS).pipe(dest('dist'));
  return src(['src/**/*', '!src/{images,styles}', '!src/{images,styles}/**/*']).pipe(dest('dist'));
};

// Delete dist folder
export const clean = () => del(['dist']);

// Webpack scripts task for js
export const scripts = () => {
  return src('src/js/bundle.js')
    .pipe(named())
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: '[name].js'
        }
      })
    )
    .pipe(dest('dist/js'));
};

// Browsersync
const server = browserSync.create();

export const serve = done => {
  server.init({
    server: './',
    port: 4000
  });
  done();
};

export const reload = done => {
  server.reload();
  done();
};

// Watch tasks
export const watchForChanges = () => {
  watch(paths.srcSCSS, styles);
  watch(paths.srcImages, series(images, reload));
  watch(['src/**/*', '!src/{images,js,styles}', '!src/{images,js,styles}/**/*'], series(copy, reload));
  watch('src/js/**/*.js', series(scripts, reload));
  watch(['**/*.php', '**/*.html'], reload);
};

export const dev = series(clean, parallel(styles, images, copy, scripts), serve, watchForChanges);
export const build = series(clean, parallel(styles, images, copy, scripts), compress);
export default dev;
