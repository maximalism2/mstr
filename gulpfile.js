'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const scsslint = require('gulp-scss-lint');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config');
const webpackProductionConfig = require('./webpack.production.config');


const lintScss = [
  './public/styles/scss/site/*.scss',
  './public/styles/scss/mixins/*.scss',
  './public/styles/scss/typography/*.scss',
  './public/styles/scss/variables/*.scss',
  './public/styles/scss/main.scss'
];

gulp.task('lint:scss', () => {
  return gulp.src(lintScss)
    .pipe(scsslint({
      config: './scsslint.yml'
    }));
});

gulp.task('build:css', ['lint:scss'], () => {
  return gulp.src('./public/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/styles/css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./public/styles/css'))
});

gulp.task('sass:watch', () => {
  gulp.watch('./public/styles/**/*.scss', ['build:css']);
});

gulp.task('webpack', () => {
  webpack(webpackProductionConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
  })
});

gulp.task('webpack-dev-server', (cb) => {
  let compiler = webpack(webpackConfig);

  new webpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: __dirname + '/public',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      '/': {
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    }
  }).listen(8000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:8000');
  });
});

gulp.task('default', ['build:css', 'webpack']);
gulp.task('hot', ['sass:watch', 'webpack-dev-server']);
