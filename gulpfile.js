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
var express = require("express");
var argv = require('yargs').argv;

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
  pages: {
    build: ["./src/pages/**/*"],
    watch: ["./src/pages/**/*", "./config.yml"]
  },
  statics: ["./src/statics/**/*"]
};

paths.buildDir = path.join(process.cwd(), "assets");


/** ========================================================================
 *
 * TASK DEFINITIONS
 *
 */

gulp.task("default", ["serve"]);
gulp.task("build", ["scripts", "styles", "pages", "statics"]);

gulp.task("pages", function () {

  return gulp.src(paths.pages.build)
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

gulp.task("watch", ["build"], function () {

  gulp.watch(paths.scripts.watch, ["scripts"]);
  gulp.watch(paths.styles.all, ["styles"]);
  gulp.watch(paths.pages.watch, ["pages"]);
  gulp.watch(paths.statics, ["statics"]);

});

gulp.task("serve", ["watch"], function () {
  var app = express();
  app.use(express.static("."));
  app.use("/baltimore", express.static("."));
  var server = app.listen(argv.port || 4000, function () {
    console.log("\n*****************\nServer listening on port " + server.address().port);
  });
});

function prepareGlobals() {
  var globals = yaml.safeLoad(fs.readFileSync("./config.yml", { encoding: "utf-8" }));
  if (!globals.site) {
    throw new Error('global config not loaded');
  }
  globals.site.upcoming = prepareUpcoming(globals);
  globals.site.future = prepareEvents(globals.site.events);
  return globals;
}

function formatDates(start, end) {
  var startDate = moment(start)
    , endDate = moment(end);

  return {
    date: startDate.format('dddd, M/D'),
    time: startDate.format('ha') + ' to ' + endDate.format('ha')
  };
}

function prepareEvents(events) {
  return _.map(events, function(event) {
    event.pretty = formatDates(event.start, event.end);
    return event;
  });

}

function prepareUpcoming(globals) {
  var upcoming = globals.site.events.shift();

  upcoming.pretty = formatDates(upcoming.start, upcoming.end);
  upcoming.workshops = prepareEventWorkshops(upcoming, globals.workshops);
  upcoming.sponsors = prepareEventSponsors(upcoming, globals.sponsors);
  return upcoming;
}

/**
 * Translate a workshop string into the full workshop object
 *
 */
function prepareEventWorkshops(event, workshops) {
  return _.map(event.workshops, function(w) {
    return _.find(workshops, 'name', w);
  });
}

function prepareEventSponsors(event, sponsors) {
  return _.map(event.sponsors, function(s) {
    return _.find(sponsors, 'name', s);
  });
}
