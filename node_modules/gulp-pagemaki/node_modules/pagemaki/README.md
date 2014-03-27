![Sushi image by Benjamin Ang and Threadless](http://25.media.tumblr.com/tumblr_lrxx1h20581qzv89bo1_500.jpg)  
_Illustration credit: Benjamin Ang/Threadless_

pagemaki
=============

Pagemaki is a very basic static page generation library, meant to convert a combination of static content files with meta data (very much like basic Jekyll) and templated layout files into static HTML files that work for GitHub Pages hosting and other static HTML web servers.

_Note: If you use gulp, be sure to checkout the [gulp-pagemaki plugin](https://github.com/jasonrhodes/gulp-pagemaki)_

[Jump right to the method API &raquo;](API.md)

## More of this shit? Why?

I built pagemaki because I needed to get quick little sites up on GitHub Pages but I still wanted to use CommonJS and Browserify, Sass for CSS, and let gulp do my builds so that I don't have to repeat template boilerplate.

This library doesn't do much out of the box--you have to set it up to do what you want.

## Quick Start

Assume you have a file structure something like this:

```
gulpfile.js
package.json
public/
src/
  sass/
  js/
  pages/
    index.html
    dir/
      subpage.html
```

You can easily write a gulp task to stream your sass and js to be compiled and dropped into some 'assets' folder in your public folder, but if you want to manage those pages easily, tough.

With pagemaki, you can tell your build system to take everything in the src/pages directory and copy it over to your public folder, too, keeping the folder structure intact. You can also use layout templates and jekyll-like YAML variables in your page files, like so:

```
# src/pages/index.html

---
title: Homepage
layout: default
---
# My Homepage
```

Create a new pagemaki and parse this file (currently, by default content is unparsed but you can pass in a content parser function to convert Markdown, for instance, as seen below):

```javascript
var maker = new Pagemaki({
  contentParse: function (string) {
    return myFavoriteMarkdownParser.parse(string);
  }
});

maker.parse(fs.readFileSync("src/pages/index.html"), function (err, parsed) {
  console.log(parsed);
});
```

Would print the following:

```javascript
{
  options: {
    title: "Homepage",
    layout: "default"
  },
  content: "<h1>My Homepage</h1>"
}
```

Whereas you can also tell pagemaki to "make" a page, too, which parses and then attempts to drop the content into the layout described in the options. So if you had a `layouts/default.html` file like this:

```underscore
<html>
  <head>
    <title><%= page.title || "Untitled" %></title>
  </head>
  <body>
    <%= content %>
  </body>
</html>
```

Then when you ran the make function:

```javascript
var maker = new Pagemaki({
  contentParse: function (string) {
    return myFavoriteMarkdownParser.parse(string);
  }
});

maker.make(fs.readFileSync("src/pages/index.html"), function (err, made) {
  console.log(made);
});
```

Results:

```html
<html>
  <head>
    <title>Homepage</title>
  </head>
  <body>
    <h1>My Homepage</h1>
  </body>
</html>
```

## API

[Visit the method API &raquo;](API.md)
