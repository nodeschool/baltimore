# Pagemaki API

Mostly, you have a [**constructor**](#constructor) to create individual pagemaki objects with different options, [**parse**](#pagemakiparse) to find options and content, and **make** to compile templates and return the complete HTML pages.

## Constructor  
### `var maki = new Pagemaki(options)`

Constructor function sets up the Pagemaki instance you'll use for 'parsing' input files and 'making' output files.

The options object has the following available options:

---

**optionsCheck** _(boolean)_  
default: true

Set to false if you don't want Pagemaki to look for options content in the input files.

---

**optionsDelimiter** _(string)_  
default: "---"

If you're parsing options, you can set the regex delimiter to whatever you want. Anything _between_ the delimiters will be passed to the `optionsParse` function. 
 
_Note: If you want to use JSON, you can't use `{` as a delimiter since the delimiters are stripped from the options string before it's passed to_ `optionsParse`

---

**optionsParse** _(function)_
```javascript
// default
function (string) {
  return yaml.safeLoad(string);
}
```

Pass in a custom parsing function that takes a string and returns an options object. `options.layout` needs to be set if you're going to use the `make` function available in Pagemaki, but if you only want to use `parse`, you can pass back any kind of object you want.

---

**contentParse** _(function)_
```javascript
// default
function (string) {
  return string;
}
```

Pass in a custom content-parsing function that takes a string and returns a template-parsed string. Very useful for dropping page content into an outer layout. By default, it just passes the string back but if you want to parse for markdown, do that here.

> TODO: Make this function able to parse in different ways according to a file's .extension

---

**templatesDir** _(string)_  
default: path.join(process.cwd(), "src", "layouts")

Where Pagemaki can find the layout templates accessed by the `layout` option, which has to be returned as a string with the key of 'layout' in the options object that is returned by `optionsParse`

---

**templateCompile** _(function)_
```javascript
// default
function (string) {
  return _.template(string);
}
```

Pass in a custom template compiling function that takes a template string, compiles it, and returns a function with a signature of fn({})

---

**templateData** _(object)_  
default: {}

Any data passed in here will be passed along to every template (don't use 'content', 'page', or 'layout' as they will be overwritten)

> TODO: Maybe put these in a nested object to avoid overwrite problems with content, page, layout, etc.


## Pagemaki.parse  
### `maki.parse(string, callback)`

Parses a string looking for options between the `optionsDelimiter` and returns an object with 'options' and 'content' keys. The callback will be given two parameters, an error if any exists and a 'parsed' object. `parsed.options` will be an object pulled from the options written into the file, and `parsed.content` will be everything else in the file, passed through the `contentParse` function.

So with this index.html file:
```
---
layout: default
title: My title
---
<a href="http://notrobotic.com">A link</a>
```

```javascript
maki.parse(fs.readFileSync("src/index.html"), function (err, parsed) {
  console.log(parsed);
});

// Outputs, by default:
{
  options: {
    layout: "default",
    title: "huh"
  },
  content: "<a href=\"http://notrobotic.com\">A link</a>"
}
```

_Remember: if you pass a custom `contentParse` function, you can use syntaxes like Markdown or Jade here._

