gulp-pagemaki
=============

Gulp plugin to pipe vinyl file objects and transform them into static HTML pages


## Usage

```javascript
var maki = require("gulp-pagemaki");
var path = require("path");

gulp.task('statics', function () {
	
	return gulp.src("./src/pages/**/*.html")
		.pipe(maki({
			templateDir: path.join(__dirname, "src", "layouts")
		}))
		.pipe(gulp.dest("./public"));

});
```

This takes a folder structure that looks like this:

```
gulpfile.js
node_modules/
package.json
public/
src/
	js/
	layouts/
		default.html
	pages/
		about/
			index.html
		index.html
	sass/
```

And will take all of the `.html` files in src/pages, run them them through 
the pagemaki parser to find Yaml metadata similar to Jekyll, then use that 
to find which layout to load from your layout directory that you passed in
the gulpfile above. 

Once it finds the layout, it drops the content part of each file into the 
`<%= content %>` tag in the layout and makes the rest of the variables available 
to that layout as js vars.

When the parsing and compiling is done, it writes each file, in its preserved
folder structure, to the public folder. Now you're building your static HTML
files with gulp just like your sass, browserified scripts, etc.

## Sample files

`src/pages/index.html`

```
---
layout: default
title: My Homepage
---
# Hello from my homepage
```

`src/layouts/default.html`

```
<html>
  <head>
    <title><%= page.title %></title>
  </head>
  <body>
  	<%= content %>
	</body>
</html>
```

After `gulp statics` runs...  

`public/index.html`

```
<html>
  <head>
    <title>My Homepage</title>
  </head>
  <body>
  	<h1>Hello from my homepage</h1>
	</body>
</html>
```
