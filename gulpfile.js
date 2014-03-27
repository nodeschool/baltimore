 var gulp = require("gulp")
  , gutil = require("gulp-util")
  , browserify = require("gulp-browserify")
  , sass = require("gulp-ruby-sass")
  , jshint = require("gulp-jshint")
  , stylish = require('jshint-stylish')
  , notify = require("gulp-notify")
  , path = require("path")
  , maki = require("gulp-pagemaki")

// globs and build directories
var paths = {
  scripts: {
    all: "./src/**/*.js",
    lint: ["./src/js/**/*.js", "!./src/js/vendor/**/*.js"],
    watch: ["./src/js/**/*.js", "./src/js/app/templates/**/*.html", "!./src/js/vendor/**/*.js"],
    build: ["./src/js/main.js"]
  },
  styles: {
    all: ["./src/sass/**/*.sass", "./src/sass/**/*.scss", "./src/sass/**/*.css"],
    build: ["./src/sass/*.sass", "./src/sass/*.scss", "./src/sass/*.css"]
  },
  pages: ["./src/pages/**/*"],
  images: ["./src/images/**/*"]
};

paths.buildDir = path.join(process.cwd(), "assets");


/** ========================================================================
 *
 * TASK DEFINITIONS
 * 
 */

gulp.task("default", ["scripts", "styles"]);

gulp.task("pages", function () {

  return gulp.src(paths.pages)
    .pipe(maki({
      templatesDir: path.join(__dirname, "src", "layouts"),
      contentParse: function (string) {
        return string;
      }
    }))
    .pipe(gulp.dest("."));

})

gulp.task("scripts", ["jshint"], function () {
  
  return gulp.src(paths.scripts.build)
    .pipe(browserify({
      debug: !gutil.env.production,
      transform: ["node-underscorify"]
    }))
    .pipe(gulp.dest(paths.buildDir));

});

gulp.task("jshint", function () {

  return gulp.src(paths.scripts.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("styles", function () {

  return gulp.src(paths.styles.build)
    .pipe(sass())
    .pipe(gulp.dest(paths.buildDir));

});

gulp.task("images", function () {

  return gulp.src(paths.images)
    .pipe(gulp.dest(path.join(paths.buildDir, "images")));
})

gulp.task("watch", ["scripts", "styles", "pages"], function () {

  gulp.watch(paths.scripts.watch, ["scripts"]);
  gulp.watch(paths.styles.all, ["styles"]);
  gulp.watch(paths.pages, ["pages"]);
  
});