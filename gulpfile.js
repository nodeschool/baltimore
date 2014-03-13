 var gulp = require("gulp")
  , gutil = require("gulp-util")
  , browserify = require("gulp-browserify")
  , sass = require("gulp-ruby-sass")
  , jshint = require("gulp-jshint")
  , stylish = require('jshint-stylish')
  , notify = require("gulp-notify")
  , path = require("path")
  , $$ = {}

// globs and build directories
$$ = {
  scripts: {
    all: "./src/**/*.js",
    lint: ["./src/js/**/*.js", "!./src/js/vendor/**/*.js"],
    watch: ["./src/js/**/*.js", "./src/js/app/templates/**/*.html", "!./src/js/vendor/**/*.js"],
    build: ["./src/js/main.js"]
  },
  styles: {
    all: ["./src/sass/**/*.sass", "./src/sass/**/*.scss", "./src/sass/**/*.css"],
    build: ["./src/sass/*.sass", "./src/sass/*.scss", "./src/sass/*.css"]
  }
};

$$.buildDir = path.join(process.cwd(), "assets");


/** ========================================================================
 *
 * TASK DEFINITIONS
 * 
 */

gulp.task("default", ["scripts", "styles"]);

gulp.task("scripts", ["jshint"], function () {
  
  return gulp.src($$.scripts.build)
    .pipe(browserify({
      debug: !gutil.env.production,
      transform: ["node-underscorify"]
    }))
    .pipe(gulp.dest($$.buildDir));

});

gulp.task("jshint", function () {

  return gulp.src($$.scripts.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("styles", function () {

  return gulp.src($$.styles.build)
    .pipe(sass())
    .pipe(gulp.dest($$.buildDir));

});

gulp.task("watch", ["scripts", "styles"], function () {

  gulp.watch($$.scripts.watch, ["scripts"]);
  gulp.watch($$.styles.all, ["styles"]);
  
});