var gulp = require("gulp");
var gutil = require("gulp-util");
var browserify = require("gulp-browserify");
var sass = require("gulp-ruby-sass");
var jshint = require("gulp-jshint");
var stylish = require('jshint-stylish');
var notify = require("gulp-notify");
var path = require("path");
var marked = require("marked");
var maki = require("gulp-pagemaki");
var fs = require("fs");
var yaml = require("js-yaml");
var moment = require("moment");
var _ = require("lodash");

// Markdown options for content parsing later
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false
});

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
  statics: ["./src/statics/**/*"]
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
      globals: prepareGlobals(),
      templatesDir: path.join(__dirname, "src", "layouts"),
      contentParse: function (string, extension) {
        if (extension.toLowerCase() === "markdown" || extension.toLowerCase() === "md") {
          return marked(string);
        } else {
          return string;
        }
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

gulp.task("statics", function () {

  return gulp.src(paths.statics)
    .pipe(gulp.dest(path.join(paths.buildDir)));

});

gulp.task("watch", ["scripts", "styles", "pages", "statics"], function () {

  gulp.watch(paths.scripts.watch, ["scripts"]);
  gulp.watch(paths.styles.all, ["styles"]);
  gulp.watch(paths.pages, ["pages"]);
  gulp.watch(paths.statics, ["statics"]);

});

function prepareGlobals() {
  var globals = yaml.safeLoad(fs.readFileSync("./config.yml", { encoding: "utf-8" }));
  if (!globals.site) {
    throw new Error('global config not loaded');
  }
  globals.site.upcoming = prepareUpcoming(globals);
  return globals;
}

function prepareUpcoming(globals) {
  var upcoming = globals.site.events[0];
  var start = moment(upcoming.start);
  var end = moment(upcoming.end);

  upcoming.pretty = {
    date: start.format('dddd, M/D'),
    time: start.format('ha') + ' to ' + end.format('ha')
  };
  return upcoming;
}
