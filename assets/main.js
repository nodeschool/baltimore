(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require("./vendor/jquery");

var irc = $(".irc");
var lines = irc.children("p");
var current = 0;

lines.css("opacity", 0);

// function nextLine() {
// 	var next = lines.get(line++);
// 	$(next).show();
// 	setTimeout(function () {
// 		nextLine();
// 	}, 1500);
// }

// nextLine();

function checkLines(offset, height) {
	var viewportBottom = offset + height;
	lines.each(function (i, line) {
		var $line = $(line);
		var elBottom = $line.offset().top + $line.height() + 100;

		if (elBottom < viewportBottom) {
			$line.css("opacity", 1);
			// console.log('yes to ' + i);
		}
	});
}

console.log($(lines.get(0)).offset().top);

$(window).on("scroll", function (e) {

	// console.log($(window).scrollTop() + $(window).height());
	checkLines($(window).scrollTop(), $(window).height());

});

// lines.each(function (i, line) {

// 	console.log(i, $(line).offset().top);

// });
},{"./vendor/jquery":2}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */

(function( global, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // For CommonJS and CommonJS-like environments where a proper window is present,
    // execute the factory and get jQuery
    // For environments that do not inherently posses a window with a document
    // (such as Node.js), expose a jQuery-making factory as module.exports
    // This accentuates the need for the creation of a real window
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info
    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "jQuery requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
  version = "1.11.0",

  // Define a local copy of jQuery
  jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init( selector, context );
  },

  // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

  // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/,
  rdashAlpha = /-([\da-z])/gi,

  // Used by jQuery.camelCase as callback to replace()
  fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
  };

jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: version,

  constructor: jQuery,

  // Start with an empty selector
  selector: "",

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function() {
    return slice.call( this );
  },

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {
    return num != null ?

      // Return a 'clean' array
      ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

      // Return just the object
      slice.call( this );
  },

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems ) {

    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(), elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
  },

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.)
  each: function( callback, args ) {
    return jQuery.each( this, callback, args );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map(this, function( elem, i ) {
      return callback.call( elem, i, elem );
    }));
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ) );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  eq: function( i ) {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
  },

  end: function() {
    return this.prevObject || this.constructor(null);
  },

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: deletedIds.sort,
  splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
  var src, copyIsArray, copy, name, options, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

jQuery.extend({
  // Unique for each copy of jQuery on the page
  expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function( msg ) {
    throw new Error( msg );
  },

  noop: function() {},

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968).
  isFunction: function( obj ) {
    return jQuery.type(obj) === "function";
  },

  isArray: Array.isArray || function( obj ) {
    return jQuery.type(obj) === "array";
  },

  isWindow: function( obj ) {
    /* jshint eqeqeq: false */
    return obj != null && obj == obj.window;
  },

  isNumeric: function( obj ) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    return obj - parseFloat( obj ) >= 0;
  },

  isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
      return false;
    }
    return true;
  },

  isPlainObject: function( obj ) {
    var key;

    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
      return false;
    }

    try {
      // Not own constructor property must be Object
      if ( obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
      }
    } catch ( e ) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }

    // Support: IE<9
    // Handle iteration over inherited properties before own properties.
    if ( support.ownLast ) {
      for ( key in obj ) {
        return hasOwn.call( obj, key );
      }
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for ( key in obj ) {}

    return key === undefined || hasOwn.call( obj, key );
  },

  type: function( obj ) {
    if ( obj == null ) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[ toString.call(obj) ] || "object" :
      typeof obj;
  },

  // Evaluates a script in a global context
  // Workarounds based on findings by Jim Driscoll
  // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
  globalEval: function( data ) {
    if ( data && jQuery.trim( data ) ) {
      // We use execScript on Internet Explorer
      // We use an anonymous function so that context is window
      // rather than jQuery in Firefox
      ( window.execScript || function( data ) {
        window[ "eval" ].call( window, data );
      } )( data );
    }
  },

  // Convert dashed to camelCase; used by the css and data modules
  // Microsoft forgot to hump their vendor prefix (#9572)
  camelCase: function( string ) {
    return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
  },

  nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },

  // args is for internal usage only
  each: function( obj, callback, args ) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj );

    if ( args ) {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.apply( obj[ i ], args );

          if ( value === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      }
    }

    return obj;
  },

  // Use native String.trim function wherever possible
  trim: trim && !trim.call("\uFEFF\xA0") ?
    function( text ) {
      return text == null ?
        "" :
        trim.call( text );
    } :

    // Otherwise use our own trimming functionality
    function( text ) {
      return text == null ?
        "" :
        ( text + "" ).replace( rtrim, "" );
    },

  // results is for internal usage only
  makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
      if ( isArraylike( Object(arr) ) ) {
        jQuery.merge( ret,
          typeof arr === "string" ?
          [ arr ] : arr
        );
      } else {
        push.call( ret, arr );
      }
    }

    return ret;
  },

  inArray: function( elem, arr, i ) {
    var len;

    if ( arr ) {
      if ( indexOf ) {
        return indexOf.call( arr, elem, i );
      }

      len = arr.length;
      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

      for ( ; i < len; i++ ) {
        // Skip accessing in sparse arrays
        if ( i in arr && arr[ i ] === elem ) {
          return i;
        }
      }
    }

    return -1;
  },

  merge: function( first, second ) {
    var len = +second.length,
      j = 0,
      i = first.length;

    while ( j < len ) {
      first[ i++ ] = second[ j++ ];
    }

    // Support: IE<9
    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
    if ( len !== len ) {
      while ( second[j] !== undefined ) {
        first[ i++ ] = second[ j++ ];
      }
    }

    first.length = i;

    return first;
  },

  grep: function( elems, callback, invert ) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
      callbackInverse = !callback( elems[ i ], i );
      if ( callbackInverse !== callbackExpect ) {
        matches.push( elems[ i ] );
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike( elems ),
      ret = [];

    // Go through the array, translating each of the items to their new values
    if ( isArray ) {
      for ( ; i < length; i++ ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }

    // Go through every key on the object,
    } else {
      for ( i in elems ) {
        value = callback( elems[ i ], i, arg );

        if ( value != null ) {
          ret.push( value );
        }
      }
    }

    // Flatten any nested arrays
    return concat.apply( [], ret );
  },

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function( fn, context ) {
    var args, proxy, tmp;

    if ( typeof context === "string" ) {
      tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
      return undefined;
    }

    // Simulated bind
    args = slice.call( arguments, 2 );
    proxy = function() {
      return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  },

  now: function() {
    return +( new Date() );
  },

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
  var length = obj.length,
    type = jQuery.type( obj );

  if ( type === "function" || jQuery.isWindow( obj ) ) {
    return false;
  }

  if ( obj.nodeType === 1 && length ) {
    return true;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
  support,
  Expr,
  getText,
  isXML,
  compile,
  outermostContext,
  sortInput,
  hasDuplicate,

  // Local document vars
  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  // Instance-specific data
  expando = "sizzle" + -(new Date()),
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(),
  tokenCache = createCache(),
  compilerCache = createCache(),
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
    }
    return 0;
  },

  // General-purpose constants
  strundefined = typeof undefined,
  MAX_NEGATIVE = 1 << 31,

  // Instance methods
  hasOwn = ({}).hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  // Use a stripped-down indexOf if we can't use a native one
  indexOf = arr.indexOf || function( elem ) {
    var i = 0,
      len = this.length;
    for ( ; i < len; i++ ) {
      if ( this[i] === elem ) {
        return i;
      }
    }
    return -1;
  },

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

  // Regular expressions

  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",
  // http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

  // Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace( "w", "w#" ),

  // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
  attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

  // Prefer arguments quoted,
  //   then not containing pseudos/brackets,
  //   then attribute selectors/non-parenthetical expressions,
  //   then anything else
  // These preferences are here to reduce the number of selectors
  //   needing tokenize in the PSEUDO preFilter
  pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

  rpseudo = new RegExp( pseudos ),
  ridentifier = new RegExp( "^" + identifier + "$" ),

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
    "ATTR": new RegExp( "^" + attributes ),
    "PSEUDO": new RegExp( "^" + pseudos ),
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
      "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
      "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    // For use in libraries implementing .is()
    // We use this for POS matching in `select`
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
      whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  },

  rinputs = /^(?:input|select|textarea|button)$/i,
  rheader = /^h\d$/i,

  rnative = /^[^{]+\{\s*\[native \w/,

  // Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  rsibling = /[+~]/,
  rescape = /'|\\/g,

  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  funescape = function( _, escaped, escapedWhitespace ) {
    var high = "0x" + escaped - 0x10000;
    // NaN means non-codepoint
    // Support: Firefox
    // Workaround erroneous numeric interpretation of +"0x"
    return high !== high || escapedWhitespace ?
      escaped :
      high < 0 ?
        // BMP codepoint
        String.fromCharCode( high + 0x10000 ) :
        // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  };

// Optimize for push.apply( _, NodeList )
try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes )),
    preferredDoc.childNodes
  );
  // Support: Android<4.0
  // Detect silently failing push.apply
  arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
  push = { apply: arr.length ?

    // Leverage slice if possible
    function( target, els ) {
      push_native.apply( target, slice.call(els) );
    } :

    // Support: IE<9
    // Otherwise append directly
    function( target, els ) {
      var j = target.length,
        i = 0;
      // Can't trust NodeList.length
      while ( (target[j++] = els[i++]) ) {}
      target.length = j - 1;
    }
  };
}

function Sizzle( selector, context, results, seed ) {
  var match, elem, m, nodeType,
    // QSA vars
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
    setDocument( context );
  }

  context = context || document;
  results = results || [];

  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
    return [];
  }

  if ( documentIsHTML && !seed ) {

    // Shortcuts
    if ( (match = rquickExpr.exec( selector )) ) {
      // Speed-up: Sizzle("#ID")
      if ( (m = match[1]) ) {
        if ( nodeType === 9 ) {
          elem = context.getElementById( m );
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document (jQuery #6963)
          if ( elem && elem.parentNode ) {
            // Handle the case where IE, Opera, and Webkit return items
            // by name instead of ID
            if ( elem.id === m ) {
              results.push( elem );
              return results;
            }
          } else {
            return results;
          }
        } else {
          // Context is not a document
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
            contains( context, elem ) && elem.id === m ) {
            results.push( elem );
            return results;
          }
        }

      // Speed-up: Sizzle("TAG")
      } else if ( match[2] ) {
        push.apply( results, context.getElementsByTagName( selector ) );
        return results;

      // Speed-up: Sizzle(".CLASS")
      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
        push.apply( results, context.getElementsByClassName( m ) );
        return results;
      }
    }

    // QSA path
    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType === 9 && selector;

      // qSA works strangely on Element-rooted queries
      // We can work around this by specifying an extra ID on the root
      // and working up from there (Thanks to Andrew Dupont for the technique)
      // IE 8 doesn't work on object elements
      if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
        groups = tokenize( selector );

        if ( (old = context.getAttribute("id")) ) {
          nid = old.replace( rescape, "\\$&" );
        } else {
          context.setAttribute( "id", nid );
        }
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ) {
          groups[i] = nid + toSelector( groups[i] );
        }
        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
        newSelector = groups.join(",");
      }

      if ( newSelector ) {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector )
          );
          return results;
        } catch(qsaError) {
        } finally {
          if ( !old ) {
            context.removeAttribute("id");
          }
        }
      }
    }
  }

  // All others
  return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *  deleting the oldest entry
 */
function createCache() {
  var keys = [];

  function cache( key, value ) {
    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
    if ( keys.push( key + " " ) > Expr.cacheLength ) {
      // Only keep the most recent entries
      delete cache[ keys.shift() ];
    }
    return (cache[ key + " " ] = value);
  }
  return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
  fn[ expando ] = true;
  return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
  var div = document.createElement("div");

  try {
    return !!fn( div );
  } catch (e) {
    return false;
  } finally {
    // Remove from its parent by default
    if ( div.parentNode ) {
      div.parentNode.removeChild( div );
    }
    // release memory in IE
    div = null;
  }
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
  var arr = attrs.split("|"),
    i = attrs.length;

  while ( i-- ) {
    Expr.attrHandle[ arr[i] ] = handler;
  }
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ) -
      ( ~a.sourceIndex || MAX_NEGATIVE );

  // Use IE sourceIndex if available on both nodes
  if ( diff ) {
    return diff;
  }

  // Check if b follows a
  if ( cur ) {
    while ( (cur = cur.nextSibling) ) {
      if ( cur === b ) {
        return -1;
      }
    }
  }

  return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return name === "input" && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
  return function( elem ) {
    var name = elem.nodeName.toLowerCase();
    return (name === "input" || name === "button") && elem.type === type;
  };
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
  return markFunction(function( argument ) {
    argument = +argument;
    return markFunction(function( seed, matches ) {
      var j,
        matchIndexes = fn( [], seed.length, argument ),
        i = matchIndexes.length;

      // Match elements found at the specified indexes
      while ( i-- ) {
        if ( seed[ (j = matchIndexes[i]) ] ) {
          seed[j] = !(matches[j] = seed[j]);
        }
      }
    });
  });
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
  return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
  // documentElement is verified for cases where it doesn't yet exist
  // (such as loading iframes in IE - #4833)
  var documentElement = elem && (elem.ownerDocument || elem).documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
  var hasCompare,
    doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  // If no document and documentElement is available, return
  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
    return document;
  }

  // Set our document
  document = doc;
  docElem = doc.documentElement;

  // Support tests
  documentIsHTML = !isXML( doc );

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent !== parent.top ) {
    // IE11 does not have attachEvent, so all must suffer
    if ( parent.addEventListener ) {
      parent.addEventListener( "unload", function() {
        setDocument();
      }, false );
    } else if ( parent.attachEvent ) {
      parent.attachEvent( "onunload", function() {
        setDocument();
      });
    }
  }

  /* Attributes
  ---------------------------------------------------------------------- */

  // Support: IE<8
  // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
  support.attributes = assert(function( div ) {
    div.className = "i";
    return !div.getAttribute("className");
  });

  /* getElement(s)By*
  ---------------------------------------------------------------------- */

  // Check if getElementsByTagName("*") returns only elements
  support.getElementsByTagName = assert(function( div ) {
    div.appendChild( doc.createComment("") );
    return !div.getElementsByTagName("*").length;
  });

  // Check if getElementsByClassName can be trusted
  support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

    // Support: Safari<4
    // Catch class over-caching
    div.firstChild.className = "i";
    // Support: Opera<10
    // Catch gEBCN failure to find non-leading classes
    return div.getElementsByClassName("i").length === 2;
  });

  // Support: IE<10
  // Check if getElementById returns elements by name
  // The broken getElementById methods don't pick up programatically-set names,
  // so use a roundabout getElementsByName test
  support.getById = assert(function( div ) {
    docElem.appendChild( div ).id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
  });

  // ID find and filter
  if ( support.getById ) {
    Expr.find["ID"] = function( id, context ) {
      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
        var m = context.getElementById( id );
        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        return m && m.parentNode ? [m] : [];
      }
    };
    Expr.filter["ID"] = function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        return elem.getAttribute("id") === attrId;
      };
    };
  } else {
    // Support: IE6/7
    // getElementById is not reliable as a find shortcut
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ) {
      var attrId = id.replace( runescape, funescape );
      return function( elem ) {
        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
        return node && node.value === attrId;
      };
    };
  }

  // Tag
  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ) {
      if ( typeof context.getElementsByTagName !== strundefined ) {
        return context.getElementsByTagName( tag );
      }
    } :
    function( tag, context ) {
      var elem,
        tmp = [],
        i = 0,
        results = context.getElementsByTagName( tag );

      // Filter out possible comments
      if ( tag === "*" ) {
        while ( (elem = results[i++]) ) {
          if ( elem.nodeType === 1 ) {
            tmp.push( elem );
          }
        }

        return tmp;
      }
      return results;
    };

  // Class
  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
      return context.getElementsByClassName( className );
    }
  };

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

  // QSA and matchesSelector support

  // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
  rbuggyMatches = [];

  // qSa(:focus) reports false when true (Chrome 21)
  // We allow this because of a bug in IE8/9 that throws an error
  // whenever `document.activeElement` is accessed on an iframe
  // So, we allow :focus to pass through QSA all the time to avoid the IE error
  // See http://bugs.jquery.com/ticket/13378
  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
    // Build QSA regex
    // Regex strategy adopted from Diego Perini
    assert(function( div ) {
      // Select is set to empty string on purpose
      // This is to test IE's treatment of not explicitly
      // setting a boolean content attribute,
      // since its presence should be enough
      // http://bugs.jquery.com/ticket/12359
      div.innerHTML = "<select t=''><option selected=''></option></select>";

      // Support: IE8, Opera 10-12
      // Nothing should be selected when empty strings follow ^= or $= or *=
      if ( div.querySelectorAll("[t^='']").length ) {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
      }

      // Support: IE8
      // Boolean attributes and "value" are not treated correctly
      if ( !div.querySelectorAll("[selected]").length ) {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
      }

      // Webkit/Opera - :checked should return selected option elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":checked").length ) {
        rbuggyQSA.push(":checked");
      }
    });

    assert(function( div ) {
      // Support: Windows 8 Native Apps
      // The type and name attributes are restricted during .innerHTML assignment
      var input = doc.createElement("input");
      input.setAttribute( "type", "hidden" );
      div.appendChild( input ).setAttribute( "name", "D" );

      // Support: IE8
      // Enforce case-sensitivity of name attribute
      if ( div.querySelectorAll("[name=d]").length ) {
        rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
      }

      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":enabled").length ) {
        rbuggyQSA.push( ":enabled", ":disabled" );
      }

      // Opera 10-11 does not throw on post-comma invalid pseudos
      div.querySelectorAll("*,:x");
      rbuggyQSA.push(",.*:");
    });
  }

  if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector) )) ) {

    assert(function( div ) {
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node (IE 9)
      support.disconnectedMatch = matches.call( div, "div" );

      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call( div, "[s!='']:x" );
      rbuggyMatches.push( "!=", pseudos );
    });
  }

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  /* Contains
  ---------------------------------------------------------------------- */
  hasCompare = rnative.test( docElem.compareDocumentPosition );

  // Element contains another
  // Purposefully does not implement inclusive descendent
  // As in, an element does not contain itself
  contains = hasCompare || rnative.test( docElem.contains ) ?
    function( a, b ) {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ) :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
      ));
    } :
    function( a, b ) {
      if ( b ) {
        while ( (b = b.parentNode) ) {
          if ( b === a ) {
            return true;
          }
        }
      }
      return false;
    };

  /* Sorting
  ---------------------------------------------------------------------- */

  // Document order sorting
  sortOrder = hasCompare ?
  function( a, b ) {

    // Flag for duplicate removal
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    // Sort on method existence if only one input has compareDocumentPosition
    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
    if ( compare ) {
      return compare;
    }

    // Calculate position if both inputs belong to the same document
    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
      a.compareDocumentPosition( b ) :

      // Otherwise we know they are disconnected
      1;

    // Disconnected nodes
    if ( compare & 1 ||
      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

      // Choose the first element that is related to our preferred document
      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
        return -1;
      }
      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
        return 1;
      }

      // Maintain original order
      return sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
    }

    return compare & 4 ? -1 : 1;
  } :
  function( a, b ) {
    // Exit early if the nodes are identical
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    // Parentless nodes are either documents or disconnected
    if ( !aup || !bup ) {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;

    // If the nodes are siblings, we can do a quick check
    } else if ( aup === bup ) {
      return siblingCheck( a, b );
    }

    // Otherwise we need full lists of their ancestors for comparison
    cur = a;
    while ( (cur = cur.parentNode) ) {
      ap.unshift( cur );
    }
    cur = b;
    while ( (cur = cur.parentNode) ) {
      bp.unshift( cur );
    }

    // Walk down the tree looking for a discrepancy
    while ( ap[i] === bp[i] ) {
      i++;
    }

    return i ?
      // Do a sibling check if the nodes have a common ancestor
      siblingCheck( ap[i], bp[i] ) :

      // Otherwise nodes in our document sort first
      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  };

  return doc;
};

Sizzle.matches = function( expr, elements ) {
  return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  // Make sure that attribute selectors are quoted
  expr = expr.replace( rattributeQuotes, "='$1']" );

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

    try {
      var ret = matches.call( elem, expr );

      // IE 9's matchesSelector returns false on disconnected nodes
      if ( ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11 ) {
        return ret;
      }
    } catch(e) {}
  }

  return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
  // Set document vars if needed
  if ( ( context.ownerDocument || context ) !== document ) {
    setDocument( context );
  }
  return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ) !== document ) {
    setDocument( elem );
  }

  var fn = Expr.attrHandle[ name.toLowerCase() ],
    // Don't get fooled by Object.prototype properties (jQuery #13807)
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
      fn( elem, name, !documentIsHTML ) :
      undefined;

  return val !== undefined ?
    val :
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ) :
      (val = elem.getAttributeNode(name)) && val.specified ?
        val.value :
        null;
};

Sizzle.error = function( msg ) {
  throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // Unless we *know* we can detect duplicates, assume their presence
  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 );
  results.sort( sortOrder );

  if ( hasDuplicate ) {
    while ( (elem = results[i++]) ) {
      if ( elem === results[ i ] ) {
        j = duplicates.push( i );
      }
    }
    while ( j-- ) {
      results.splice( duplicates[ j ], 1 );
    }
  }

  // Clear input after sorting to release objects
  // See https://github.com/jquery/sizzle/pull/225
  sortInput = null;

  return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ) {
    // If no nodeType, this is expected to be an array
    while ( (node = elem[i++]) ) {
      // Do not traverse comment nodes
      ret += getText( node );
    }
  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    // Use textContent for elements
    // innerText usage removed for consistency of new lines (jQuery #11153)
    if ( typeof elem.textContent === "string" ) {
      return elem.textContent;
    } else {
      // Traverse its children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        ret += getText( elem );
      }
    }
  } else if ( nodeType === 3 || nodeType === 4 ) {
    return elem.nodeValue;
  }
  // Do not include comment or processing instruction nodes

  return ret;
};

Expr = Sizzle.selectors = {

  // Can be adjusted by the user
  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {},

  find: {},

  relative: {
    ">": { dir: "parentNode", first: true },
    " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true },
    "~": { dir: "previousSibling" }
  },

  preFilter: {
    "ATTR": function( match ) {
      match[1] = match[1].replace( runescape, funescape );

      // Move the given value to match[3] whether quoted or unquoted
      match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

      if ( match[2] === "~=" ) {
        match[3] = " " + match[3] + " ";
      }

      return match.slice( 0, 4 );
    },

    "CHILD": function( match ) {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...)
        2 what (child|of-type)
        3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
        4 xn-component of xn+y argument ([+-]?\d*n|)
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase();

      if ( match[1].slice( 0, 3 ) === "nth" ) {
        // nth-* requires argument
        if ( !match[3] ) {
          Sizzle.error( match[0] );
        }

        // numeric x and y parameters for Expr.filter.CHILD
        // remember that false/true cast respectively to 0/1
        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
        match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

      // other types prohibit arguments
      } else if ( match[3] ) {
        Sizzle.error( match[0] );
      }

      return match;
    },

    "PSEUDO": function( match ) {
      var excess,
        unquoted = !match[5] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ) ) {
        return null;
      }

      // Accept quoted arguments as-is
      if ( match[3] && match[4] !== undefined ) {
        match[2] = match[4];

      // Strip excess characters from unquoted arguments
      } else if ( unquoted && rpseudo.test( unquoted ) &&
        // Get excess from tokenize (recursively)
        (excess = tokenize( unquoted, true )) &&
        // advance to the next closing parenthesis
        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

        // excess is a negative index
        match[0] = match[0].slice( 0, excess );
        match[2] = unquoted.slice( 0, excess );
      }

      // Return only captures needed by the pseudo filter method (type and argument)
      return match.slice( 0, 3 );
    }
  },

  filter: {

    "TAG": function( nodeNameSelector ) {
      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
      return nodeNameSelector === "*" ?
        function() { return true; } :
        function( elem ) {
          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
    },

    "CLASS": function( className ) {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
        classCache( className, function( elem ) {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
        });
    },

    "ATTR": function( name, operator, check ) {
      return function( elem ) {
        var result = Sizzle.attr( elem, name );

        if ( result == null ) {
          return operator === "!=";
        }
        if ( !operator ) {
          return true;
        }

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ) === 0 :
          operator === "*=" ? check && result.indexOf( check ) > -1 :
          operator === "$=" ? check && result.slice( -check.length ) === check :
          operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
          false;
      };
    },

    "CHILD": function( type, what, argument, first, last ) {
      var simple = type.slice( 0, 3 ) !== "nth",
        forward = type.slice( -4 ) !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        // Shortcut for :nth-*(n)
        function( elem ) {
          return !!elem.parentNode;
        } :

        function( elem, context, xml ) {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(),
            useCache = !xml && !ofType;

          if ( parent ) {

            // :(first|last|only)-(child|of-type)
            if ( simple ) {
              while ( dir ) {
                node = elem;
                while ( (node = node[ dir ]) ) {
                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                    return false;
                  }
                }
                // Reverse direction for :only-* (if we haven't yet done so)
                start = dir = type === "only" && !start && "nextSibling";
              }
              return true;
            }

            start = [ forward ? parent.firstChild : parent.lastChild ];

            // non-xml :nth-child(...) stores cache data on `parent`
            if ( forward && useCache ) {
              // Seek `elem` from a previously-cached index
              outerCache = parent[ expando ] || (parent[ expando ] = {});
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) ) {

                // When found, cache indexes on `parent` and break
                if ( node.nodeType === 1 && ++diff && node === elem ) {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
                }
              }

            // Use previously-cached element index if available
            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
              diff = cache[1];

            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
            } else {
              // Use the same loop as above to seek `elem` from the start
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0) || start.pop()) ) {

                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                  // Cache the index of each encountered element
                  if ( useCache ) {
                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                  }

                  if ( node === elem ) {
                    break;
                  }
                }
              }
            }

            // Incorporate the offset, then check against cycle size
            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 );
          }
        };
    },

    "PSEUDO": function( pseudo, argument ) {
      // pseudo-class names are case-insensitive
      // http://www.w3.org/TR/selectors/#pseudo-classes
      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
      // Remember that setFilters inherits from pseudos
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo );

      // The user may use createPseudo to indicate that
      // arguments are needed to create the filter function
      // just as Sizzle does
      if ( fn[ expando ] ) {
        return fn( argument );
      }

      // But maintain support for old signatures
      if ( fn.length > 1 ) {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
          markFunction(function( seed, matches ) {
            var idx,
              matched = fn( seed, argument ),
              i = matched.length;
            while ( i-- ) {
              idx = indexOf.call( seed, matched[i] );
              seed[ idx ] = !( matches[ idx ] = matched[i] );
            }
          }) :
          function( elem ) {
            return fn( elem, 0, args );
          };
      }

      return fn;
    }
  },

  pseudos: {
    // Potentially complex pseudos
    "not": markFunction(function( selector ) {
      // Trim the selector passed to compile
      // to avoid treating leading and trailing
      // spaces as combinators
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ) );

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ) {
          var elem,
            unmatched = matcher( seed, null, xml, [] ),
            i = seed.length;

          // Match elements unmatched by `matcher`
          while ( i-- ) {
            if ( (elem = unmatched[i]) ) {
              seed[i] = !(matches[i] = elem);
            }
          }
        }) :
        function( elem, context, xml ) {
          input[0] = elem;
          matcher( input, null, xml, results );
          return !results.pop();
        };
    }),

    "has": markFunction(function( selector ) {
      return function( elem ) {
        return Sizzle( selector, elem ).length > 0;
      };
    }),

    "contains": markFunction(function( text ) {
      return function( elem ) {
        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
      };
    }),

    // "Whether an element is represented by a :lang() selector
    // is based solely on the element's language value
    // being equal to the identifier C,
    // or beginning with the identifier C immediately followed by "-".
    // The matching of C against the element's language value is performed case-insensitively.
    // The identifier C does not have to be a valid language name."
    // http://www.w3.org/TR/selectors/#lang-pseudo
    "lang": markFunction( function( lang ) {
      // lang value must be a valid identifier
      if ( !ridentifier.test(lang || "") ) {
        Sizzle.error( "unsupported lang: " + lang );
      }
      lang = lang.replace( runescape, funescape ).toLowerCase();
      return function( elem ) {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

            elemLang = elemLang.toLowerCase();
            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
          }
        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
        return false;
      };
    }),

    // Miscellaneous
    "target": function( elem ) {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ) === elem.id;
    },

    "root": function( elem ) {
      return elem === docElem;
    },

    "focus": function( elem ) {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
    },

    // Boolean properties
    "enabled": function( elem ) {
      return elem.disabled === false;
    },

    "disabled": function( elem ) {
      return elem.disabled === true;
    },

    "checked": function( elem ) {
      // In CSS3, :checked should return both checked and selected elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      var nodeName = elem.nodeName.toLowerCase();
      return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
    },

    "selected": function( elem ) {
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }

      return elem.selected === true;
    },

    // Contents
    "empty": function( elem ) {
      // http://www.w3.org/TR/selectors/#empty-pseudo
      // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
      //   but not by others (comment: 8; processing instruction: 7; etc.)
      // nodeType < 6 works because attributes (2) do not appear as children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
        if ( elem.nodeType < 6 ) {
          return false;
        }
      }
      return true;
    },

    "parent": function( elem ) {
      return !Expr.pseudos["empty"]( elem );
    },

    // Element/input types
    "header": function( elem ) {
      return rheader.test( elem.nodeName );
    },

    "input": function( elem ) {
      return rinputs.test( elem.nodeName );
    },

    "button": function( elem ) {
      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === "button" || name === "button";
    },

    "text": function( elem ) {
      var attr;
      return elem.nodeName.toLowerCase() === "input" &&
        elem.type === "text" &&

        // Support: IE<8
        // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
    },

    // Position-in-collection
    "first": createPositionalPseudo(function() {
      return [ 0 ];
    }),

    "last": createPositionalPseudo(function( matchIndexes, length ) {
      return [ length - 1 ];
    }),

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
      return [ argument < 0 ? argument + length : argument ];
    }),

    "even": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 0;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "odd": createPositionalPseudo(function( matchIndexes, length ) {
      var i = 1;
      for ( ; i < length; i += 2 ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    }),

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ) {
        matchIndexes.push( i );
      }
      return matchIndexes;
    })
  }
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
  Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ) {
    return parseOnly ? 0 : cached.slice( 0 );
  }

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ) {

    // Comma and first run
    if ( !matched || (match = rcomma.exec( soFar )) ) {
      if ( match ) {
        // Don't consume trailing commas as valid
        soFar = soFar.slice( match[0].length ) || soFar;
      }
      groups.push( (tokens = []) );
    }

    matched = false;

    // Combinators
    if ( (match = rcombinators.exec( soFar )) ) {
      matched = match.shift();
      tokens.push({
        value: matched,
        // Cast descendant combinators to space
        type: match[0].replace( rtrim, " " )
      });
      soFar = soFar.slice( matched.length );
    }

    // Filters
    for ( type in Expr.filter ) {
      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ))) ) {
        matched = match.shift();
        tokens.push({
          value: matched,
          type: type,
          matches: match
        });
        soFar = soFar.slice( matched.length );
      }
    }

    if ( !matched ) {
      break;
    }
  }

  // Return the length of the invalid excess
  // if we're just parsing
  // Otherwise, throw an error or return tokens
  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ) :
      // Cache the tokens
      tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ) {
    selector += tokens[i].value;
  }
  return selector;
}

function addCombinator( matcher, combinator, base ) {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    // Check against closest ancestor/preceding element
    function( elem, context, xml ) {
      while ( (elem = elem[ dir ]) ) {
        if ( elem.nodeType === 1 || checkNonElements ) {
          return matcher( elem, context, xml );
        }
      }
    } :

    // Check against all ancestor/preceding elements
    function( elem, context, xml ) {
      var oldCache, outerCache,
        newCache = [ dirruns, doneName ];

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if ( xml ) {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            if ( matcher( elem, context, xml ) ) {
              return true;
            }
          }
        }
      } else {
        while ( (elem = elem[ dir ]) ) {
          if ( elem.nodeType === 1 || checkNonElements ) {
            outerCache = elem[ expando ] || (elem[ expando ] = {});
            if ( (oldCache = outerCache[ dir ]) &&
              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

              // Assign to newCache so results back-propagate to previous elements
              return (newCache[ 2 ] = oldCache[ 2 ]);
            } else {
              // Reuse newcache so results back-propagate to previous elements
              outerCache[ dir ] = newCache;

              // A match means we're done; a fail means we have to keep checking
              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                return true;
              }
            }
          }
        }
      }
    };
}

function elementMatcher( matchers ) {
  return matchers.length > 1 ?
    function( elem, context, xml ) {
      var i = matchers.length;
      while ( i-- ) {
        if ( !matchers[i]( elem, context, xml ) ) {
          return false;
        }
      }
      return true;
    } :
    matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ) {
    if ( (elem = unmatched[i]) ) {
      if ( !filter || filter( elem, context, xml ) ) {
        newUnmatched.push( elem );
        if ( mapped ) {
          map.push( i );
        }
      }
    }
  }

  return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  if ( postFilter && !postFilter[ expando ] ) {
    postFilter = setMatcher( postFilter );
  }
  if ( postFinder && !postFinder[ expando ] ) {
    postFinder = setMatcher( postFinder, postSelector );
  }
  return markFunction(function( seed, results, context, xml ) {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      // Get initial elements from seed or context
      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

      // Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && ( seed || !selector ) ?
        condense( elems, preMap, preFilter, context, xml ) :
        elems,

      matcherOut = matcher ?
        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

          // ...intermediate processing is necessary
          [] :

          // ...otherwise use results directly
          results :
        matcherIn;

    // Find primary matches
    if ( matcher ) {
      matcher( matcherIn, matcherOut, context, xml );
    }

    // Apply postFilter
    if ( postFilter ) {
      temp = condense( matcherOut, postMap );
      postFilter( temp, [], context, xml );

      // Un-match failing elements by moving them back to matcherIn
      i = temp.length;
      while ( i-- ) {
        if ( (elem = temp[i]) ) {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
        }
      }
    }

    if ( seed ) {
      if ( postFinder || preFilter ) {
        if ( postFinder ) {
          // Get the final matcherOut by condensing this intermediate into postFinder contexts
          temp = [];
          i = matcherOut.length;
          while ( i-- ) {
            if ( (elem = matcherOut[i]) ) {
              // Restore matcherIn since elem is not yet a final match
              temp.push( (matcherIn[i] = elem) );
            }
          }
          postFinder( null, (matcherOut = []), temp, xml );
        }

        // Move matched elements from seed to results to keep them synchronized
        i = matcherOut.length;
        while ( i-- ) {
          if ( (elem = matcherOut[i]) &&
            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

            seed[temp] = !(results[temp] = elem);
          }
        }
      }

    // Add elements to results, through postFinder if defined
    } else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ) :
          matcherOut
      );
      if ( postFinder ) {
        postFinder( null, results, matcherOut, xml );
      } else {
        push.apply( results, matcherOut );
      }
    }
  });
}

function matcherFromTokens( tokens ) {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    // The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator( function( elem ) {
      return elem === checkContext;
    }, implicitRelative, true ),
    matchAnyContext = addCombinator( function( elem ) {
      return indexOf.call( checkContext, elem ) > -1;
    }, implicitRelative, true ),
    matchers = [ function( elem, context, xml ) {
      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
        (checkContext = context).nodeType ?
          matchContext( elem, context, xml ) :
          matchAnyContext( elem, context, xml ) );
    } ];

  for ( ; i < len; i++ ) {
    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
    } else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

      // Return special upon seeing a positional matcher
      if ( matcher[ expando ] ) {
        // Find the next relative operator (if any) for proper handling
        j = ++i;
        for ( ; j < len; j++ ) {
          if ( Expr.relative[ tokens[j].type ] ) {
            break;
          }
        }
        return setMatcher(
          i > 1 && elementMatcher( matchers ),
          i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
          ).replace( rtrim, "$1" ),
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ) ),
          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
          j < len && toSelector( tokens )
        );
      }
      matchers.push( matcher );
    }
  }

  return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  var bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, outermost ) {
      var elem, j, matcher,
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        setMatched = [],
        contextBackup = outermostContext,
        // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
        // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
        len = elems.length;

      if ( outermost ) {
        outermostContext = context !== document && context;
      }

      // Add elements passing elementMatchers directly to results
      // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
      // Support: IE<9, Safari
      // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
        if ( byElement && elem ) {
          j = 0;
          while ( (matcher = elementMatchers[j++]) ) {
            if ( matcher( elem, context, xml ) ) {
              results.push( elem );
              break;
            }
          }
          if ( outermost ) {
            dirruns = dirrunsUnique;
          }
        }

        // Track unmatched elements for set filters
        if ( bySet ) {
          // They will have gone through all possible matchers
          if ( (elem = !matcher && elem) ) {
            matchedCount--;
          }

          // Lengthen the array for every element, matched or not
          if ( seed ) {
            unmatched.push( elem );
          }
        }
      }

      // Apply set filters to unmatched elements
      matchedCount += i;
      if ( bySet && i !== matchedCount ) {
        j = 0;
        while ( (matcher = setMatchers[j++]) ) {
          matcher( unmatched, setMatched, context, xml );
        }

        if ( seed ) {
          // Reintegrate element matches to eliminate the need for sorting
          if ( matchedCount > 0 ) {
            while ( i-- ) {
              if ( !(unmatched[i] || setMatched[i]) ) {
                setMatched[i] = pop.call( results );
              }
            }
          }

          // Discard index placeholder values to get only actual matches
          setMatched = condense( setMatched );
        }

        // Add matches to results
        push.apply( results, setMatched );

        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ) > 1 ) {

          Sizzle.uniqueSort( results );
        }
      }

      // Override manipulation of globals by nested matchers
      if ( outermost ) {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      }

      return unmatched;
    };

  return bySet ?
    markFunction( superMatcher ) :
    superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ) {
    // Generate a function of recursive functions that can be used to check each element
    if ( !group ) {
      group = tokenize( selector );
    }
    i = group.length;
    while ( i-- ) {
      cached = matcherFromTokens( group[i] );
      if ( cached[ expando ] ) {
        setMatchers.push( cached );
      } else {
        elementMatchers.push( cached );
      }
    }

    // Cache the compiled function
    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
  }
  return cached;
};

function multipleContexts( selector, contexts, results ) {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ) {
    Sizzle( selector, contexts[i], results );
  }
  return results;
}

function select( selector, context, results, seed ) {
  var i, tokens, token, type, find,
    match = tokenize( selector );

  if ( !seed ) {
    // Try to minimize operations if there is only one group
    if ( match.length === 1 ) {

      // Take a shortcut and set the context if the root selector is an ID
      tokens = match[0] = match[0].slice( 0 );
      if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
          support.getById && context.nodeType === 9 && documentIsHTML &&
          Expr.relative[ tokens[1].type ] ) {

        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
        if ( !context ) {
          return results;
        }
        selector = selector.slice( tokens.shift().value.length );
      }

      // Fetch a seed set for right-to-left matching
      i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
      while ( i-- ) {
        token = tokens[i];

        // Abort if we hit a combinator
        if ( Expr.relative[ (type = token.type) ] ) {
          break;
        }
        if ( (find = Expr.find[ type ]) ) {
          // Search, expanding context for leading sibling combinators
          if ( (seed = find(
            token.matches[0].replace( runescape, funescape ),
            rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
          )) ) {

            // If seed is empty or no tokens remain, we can return early
            tokens.splice( i, 1 );
            selector = seed.length && toSelector( tokens );
            if ( !selector ) {
              push.apply( results, seed );
              return results;
            }

            break;
          }
        }
      }
    }
  }

  // Compile and execute a filtering function
  // Provide `match` to avoid retokenization if we modified the selector above
  compile( selector, match )(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ) && testContext( context.parentNode ) || context
  );
  return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
  // Should return 1, but returns 4 (following)
  return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href") === "#" ;
}) ) {
  addHandle( "type|href|height|width", function( elem, name, isXML ) {
    if ( !isXML ) {
      return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
    }
  });
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" );
  return div.firstChild.getAttribute( "value" ) === "";
}) ) {
  addHandle( "value", function( elem, name, isXML ) {
    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
      return elem.defaultValue;
    }
  });
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
  return div.getAttribute("disabled") == null;
}) ) {
  addHandle( booleans, function( elem, name, isXML ) {
    var val;
    if ( !isXML ) {
      return elem[ name ] === true ? name.toLowerCase() :
          (val = elem.getAttributeNode( name )) && val.specified ?
          val.value :
        null;
    }
  });
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
  if ( jQuery.isFunction( qualifier ) ) {
    return jQuery.grep( elements, function( elem, i ) {
      /* jshint -W018 */
      return !!qualifier.call( elem, i, elem ) !== not;
    });

  }

  if ( qualifier.nodeType ) {
    return jQuery.grep( elements, function( elem ) {
      return ( elem === qualifier ) !== not;
    });

  }

  if ( typeof qualifier === "string" ) {
    if ( risSimple.test( qualifier ) ) {
      return jQuery.filter( qualifier, elements, not );
    }

    qualifier = jQuery.filter( qualifier, elements );
  }

  return jQuery.grep( elements, function( elem ) {
    return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
  });
}

jQuery.filter = function( expr, elems, not ) {
  var elem = elems[ 0 ];

  if ( not ) {
    expr = ":not(" + expr + ")";
  }

  return elems.length === 1 && elem.nodeType === 1 ?
    jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
    jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
      return elem.nodeType === 1;
    }));
};

jQuery.fn.extend({
  find: function( selector ) {
    var i,
      ret = [],
      self = this,
      len = self.length;

    if ( typeof selector !== "string" ) {
      return this.pushStack( jQuery( selector ).filter(function() {
        for ( i = 0; i < len; i++ ) {
          if ( jQuery.contains( self[ i ], this ) ) {
            return true;
          }
        }
      }) );
    }

    for ( i = 0; i < len; i++ ) {
      jQuery.find( selector, self[ i ], ret );
    }

    // Needed because $( selector, context ) becomes $( context ).find( selector )
    ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
  },
  filter: function( selector ) {
    return this.pushStack( winnow(this, selector || [], false) );
  },
  not: function( selector ) {
    return this.pushStack( winnow(this, selector || [], true) );
  },
  is: function( selector ) {
    return !!winnow(
      this,

      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test( selector ) ?
        jQuery( selector ) :
        selector || [],
      false
    ).length;
  }
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

  // Use the correct document accordingly with window argument (sandbox)
  document = window.document,

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

  init = jQuery.fn.init = function( selector, context ) {
    var match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if ( !selector ) {
      return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
      if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];

      } else {
        match = rquickExpr.exec( selector );
      }

      // Match html or make sure no context is specified for #id
      if ( match && (match[1] || !context) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[1] ) {
          context = context instanceof jQuery ? context[0] : context;

          // scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge( this, jQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ) );

          // HANDLE: $(html, props)
          if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
            for ( match in context ) {
              // Properties of context are called as methods if possible
              if ( jQuery.isFunction( this[ match ] ) ) {
                this[ match ]( context[ match ] );

              // ...and otherwise set as attributes
              } else {
                this.attr( match, context[ match ] );
              }
            }
          }

          return this;

        // HANDLE: $(#id)
        } else {
          elem = document.getElementById( match[2] );

          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ) {
            // Handle the case where IE and Opera return items
            // by name instead of ID
            if ( elem.id !== match[2] ) {
              return rootjQuery.find( selector );
            }

            // Otherwise, we inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
          }

          this.context = document;
          this.selector = selector;
          return this;
        }

      // HANDLE: $(expr, $(...))
      } else if ( !context || context.jquery ) {
        return ( context || rootjQuery ).find( selector );

      // HANDLE: $(expr, context)
      // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor( context ).find( selector );
      }

    // HANDLE: $(DOMElement)
    } else if ( selector.nodeType ) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( jQuery.isFunction( selector ) ) {
      return typeof rootjQuery.ready !== "undefined" ?
        rootjQuery.ready( selector ) :
        // Execute immediately if ready is not present
        selector( jQuery );
    }

    if ( selector.selector !== undefined ) {
      this.selector = selector.selector;
      this.context = selector.context;
    }

    return jQuery.makeArray( selector, this );
  };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
  // methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };

jQuery.extend({
  dir: function( elem, dir, until ) {
    var matched = [],
      cur = elem[ dir ];

    while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
      if ( cur.nodeType === 1 ) {
        matched.push( cur );
      }
      cur = cur[dir];
    }
    return matched;
  },

  sibling: function( n, elem ) {
    var r = [];

    for ( ; n; n = n.nextSibling ) {
      if ( n.nodeType === 1 && n !== elem ) {
        r.push( n );
      }
    }

    return r;
  }
});

jQuery.fn.extend({
  has: function( target ) {
    var i,
      targets = jQuery( target, this ),
      len = targets.length;

    return this.filter(function() {
      for ( i = 0; i < len; i++ ) {
        if ( jQuery.contains( this, targets[i] ) ) {
          return true;
        }
      }
    });
  },

  closest: function( selectors, context ) {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
        jQuery( selectors, context || this.context ) :
        0;

    for ( ; i < l; i++ ) {
      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
        // Always skip document fragments
        if ( cur.nodeType < 11 && (pos ?
          pos.index(cur) > -1 :

          // Don't pass non-elements to Sizzle
          cur.nodeType === 1 &&
            jQuery.find.matchesSelector(cur, selectors)) ) {

          matched.push( cur );
          break;
        }
      }
    }

    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
  },

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ) {

    // No argument, return index in parent
    if ( !elem ) {
      return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
    }

    // index in selector
    if ( typeof elem === "string" ) {
      return jQuery.inArray( this[0], jQuery( elem ) );
    }

    // Locate the position of the desired element
    return jQuery.inArray(
      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem, this );
  },

  add: function( selector, context ) {
    return this.pushStack(
      jQuery.unique(
        jQuery.merge( this.get(), jQuery( selector, context ) )
      )
    );
  },

  addBack: function( selector ) {
    return this.add( selector == null ?
      this.prevObject : this.prevObject.filter(selector)
    );
  }
});

function sibling( cur, dir ) {
  do {
    cur = cur[ dir ];
  } while ( cur && cur.nodeType !== 1 );

  return cur;
}

jQuery.each({
  parent: function( elem ) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  parents: function( elem ) {
    return jQuery.dir( elem, "parentNode" );
  },
  parentsUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "parentNode", until );
  },
  next: function( elem ) {
    return sibling( elem, "nextSibling" );
  },
  prev: function( elem ) {
    return sibling( elem, "previousSibling" );
  },
  nextAll: function( elem ) {
    return jQuery.dir( elem, "nextSibling" );
  },
  prevAll: function( elem ) {
    return jQuery.dir( elem, "previousSibling" );
  },
  nextUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "nextSibling", until );
  },
  prevUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "previousSibling", until );
  },
  siblings: function( elem ) {
    return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
  },
  children: function( elem ) {
    return jQuery.sibling( elem.firstChild );
  },
  contents: function( elem ) {
    return jQuery.nodeName( elem, "iframe" ) ?
      elem.contentDocument || elem.contentWindow.document :
      jQuery.merge( [], elem.childNodes );
  }
}, function( name, fn ) {
  jQuery.fn[ name ] = function( until, selector ) {
    var ret = jQuery.map( this, fn, until );

    if ( name.slice( -5 ) !== "Until" ) {
      selector = until;
    }

    if ( selector && typeof selector === "string" ) {
      ret = jQuery.filter( selector, ret );
    }

    if ( this.length > 1 ) {
      // Remove duplicates
      if ( !guaranteedUnique[ name ] ) {
        ret = jQuery.unique( ret );
      }

      // Reverse order for parents* and prev-derivatives
      if ( rparentsprev.test( name ) ) {
        ret = ret.reverse();
      }
    }

    return this.pushStack( ret );
  };
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
  var object = optionsCache[ options ] = {};
  jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
    object[ flag ] = true;
  });
  return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:     will ensure the callback list can only be fired once (like a Deferred)
 *
 *  memory:     will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred)
 *
 *  unique:     will ensure a callback can only be added once (no duplicate in the list)
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

  // Convert options from String-formatted to Object-formatted if needed
  // (we check in cache first)
  options = typeof options === "string" ?
    ( optionsCache[ options ] || createOptions( options ) ) :
    jQuery.extend( {}, options );

  var // Flag to know if list is currently firing
    firing,
    // Last fire value (for non-forgettable lists)
    memory,
    // Flag to know if list was already fired
    fired,
    // End of the loop when firing
    firingLength,
    // Index of currently firing callback (modified by remove if needed)
    firingIndex,
    // First callback to fire (used internally by add and fireWith)
    firingStart,
    // Actual callback list
    list = [],
    // Stack of fire calls for repeatable lists
    stack = !options.once && [],
    // Fire callbacks
    fire = function( data ) {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for ( ; list && firingIndex < firingLength; firingIndex++ ) {
        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
          memory = false; // To prevent further calls using add
          break;
        }
      }
      firing = false;
      if ( list ) {
        if ( stack ) {
          if ( stack.length ) {
            fire( stack.shift() );
          }
        } else if ( memory ) {
          list = [];
        } else {
          self.disable();
        }
      }
    },
    // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function() {
        if ( list ) {
          // First, we save the current length
          var start = list.length;
          (function add( args ) {
            jQuery.each( args, function( _, arg ) {
              var type = jQuery.type( arg );
              if ( type === "function" ) {
                if ( !options.unique || !self.has( arg ) ) {
                  list.push( arg );
                }
              } else if ( arg && arg.length && type !== "string" ) {
                // Inspect recursively
                add( arg );
              }
            });
          })( arguments );
          // Do we need to add the callbacks to the
          // current firing batch?
          if ( firing ) {
            firingLength = list.length;
          // With memory, if we're not firing then
          // we should call right away
          } else if ( memory ) {
            firingStart = start;
            fire( memory );
          }
        }
        return this;
      },
      // Remove a callback from the list
      remove: function() {
        if ( list ) {
          jQuery.each( arguments, function( _, arg ) {
            var index;
            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
              list.splice( index, 1 );
              // Handle firing indexes
              if ( firing ) {
                if ( index <= firingLength ) {
                  firingLength--;
                }
                if ( index <= firingIndex ) {
                  firingIndex--;
                }
              }
            }
          });
        }
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function( fn ) {
        return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
      },
      // Remove all callbacks from the list
      empty: function() {
        list = [];
        firingLength = 0;
        return this;
      },
      // Have the list do nothing anymore
      disable: function() {
        list = stack = memory = undefined;
        return this;
      },
      // Is it disabled?
      disabled: function() {
        return !list;
      },
      // Lock the list in its current state
      lock: function() {
        stack = undefined;
        if ( !memory ) {
          self.disable();
        }
        return this;
      },
      // Is it locked?
      locked: function() {
        return !stack;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ) {
        if ( list && ( !fired || stack ) ) {
          args = args || [];
          args = [ context, args.slice ? args.slice() : args ];
          if ( firing ) {
            stack.push( args );
          } else {
            fire( args );
          }
        }
        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function() {
        self.fireWith( this, arguments );
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function() {
        return !!fired;
      }
    };

  return self;
};


jQuery.extend({

  Deferred: function( func ) {
    var tuples = [
        // action, add listener, listener list, final state
        [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
        [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
        [ "notify", "progress", jQuery.Callbacks("memory") ]
      ],
      state = "pending",
      promise = {
        state: function() {
          return state;
        },
        always: function() {
          deferred.done( arguments ).fail( arguments );
          return this;
        },
        then: function( /* fnDone, fnFail, fnProgress */ ) {
          var fns = arguments;
          return jQuery.Deferred(function( newDefer ) {
            jQuery.each( tuples, function( i, tuple ) {
              var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
              // deferred[ done | fail | progress ] for forwarding actions to newDefer
              deferred[ tuple[1] ](function() {
                var returned = fn && fn.apply( this, arguments );
                if ( returned && jQuery.isFunction( returned.promise ) ) {
                  returned.promise()
                    .done( newDefer.resolve )
                    .fail( newDefer.reject )
                    .progress( newDefer.notify );
                } else {
                  newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                }
              });
            });
            fns = null;
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function( obj ) {
          return obj != null ? jQuery.extend( obj, promise ) : promise;
        }
      },
      deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    jQuery.each( tuples, function( i, tuple ) {
      var list = tuple[ 2 ],
        stateString = tuple[ 3 ];

      // promise[ done | fail | progress ] = list.add
      promise[ tuple[1] ] = list.add;

      // Handle state
      if ( stateString ) {
        list.add(function() {
          // state = [ resolved | rejected ]
          state = stateString;

        // [ reject_list | resolve_list ].disable; progress_list.lock
        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
      }

      // deferred[ resolve | reject | notify ]
      deferred[ tuple[0] ] = function() {
        deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
        return this;
      };
      deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }

    // All done!
    return deferred;
  },

  // Deferred helper
  when: function( subordinate /* , ..., subordinateN */ ) {
    var i = 0,
      resolveValues = slice.call( arguments ),
      length = resolveValues.length,

      // the count of uncompleted subordinates
      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

      // Update function for both resolve and progress values
      updateFunc = function( i, contexts, values ) {
        return function( value ) {
          contexts[ i ] = this;
          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
          if ( values === progressValues ) {
            deferred.notifyWith( contexts, values );

          } else if ( !(--remaining) ) {
            deferred.resolveWith( contexts, values );
          }
        };
      },

      progressValues, progressContexts, resolveContexts;

    // add listeners to Deferred subordinates; treat others as resolved
    if ( length > 1 ) {
      progressValues = new Array( length );
      progressContexts = new Array( length );
      resolveContexts = new Array( length );
      for ( ; i < length; i++ ) {
        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
          resolveValues[ i ].promise()
            .done( updateFunc( i, resolveContexts, resolveValues ) )
            .fail( deferred.reject )
            .progress( updateFunc( i, progressContexts, progressValues ) );
        } else {
          --remaining;
        }
      }
    }

    // if we're not waiting on anything, resolve the master
    if ( !remaining ) {
      deferred.resolveWith( resolveContexts, resolveValues );
    }

    return deferred.promise();
  }
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
  // Add the callback
  jQuery.ready.promise().done( fn );

  return this;
};

jQuery.extend({
  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See #6781
  readyWait: 1,

  // Hold (or release) the ready event
  holdReady: function( hold ) {
    if ( hold ) {
      jQuery.readyWait++;
    } else {
      jQuery.ready( true );
    }
  },

  // Handle when the DOM is ready
  ready: function( wait ) {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
      return;
    }

    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    if ( !document.body ) {
      return setTimeout( jQuery.ready );
    }

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ) {
      return;
    }

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] );

    // Trigger any bound ready events
    if ( jQuery.fn.trigger ) {
      jQuery( document ).trigger("ready").off("ready");
    }
  }
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
  if ( document.addEventListener ) {
    document.removeEventListener( "DOMContentLoaded", completed, false );
    window.removeEventListener( "load", completed, false );

  } else {
    document.detachEvent( "onreadystatechange", completed );
    window.detachEvent( "onload", completed );
  }
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
  // readyState === "complete" is good enough for us to call the dom ready in oldIE
  if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
    detach();
    jQuery.ready();
  }
}

jQuery.ready.promise = function( obj ) {
  if ( !readyList ) {

    readyList = jQuery.Deferred();

    // Catch cases where $(document).ready() is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( document.readyState === "complete" ) {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout( jQuery.ready );

    // Standards-based browsers support DOMContentLoaded
    } else if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", completed, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", completed, false );

    // If IE event model is used
    } else {
      // Ensure firing before onload, maybe late but safe also for iframes
      document.attachEvent( "onreadystatechange", completed );

      // A fallback to window.onload, that will always work
      window.attachEvent( "onload", completed );

      // If IE and not a frame
      // continually check to see if the document is ready
      var top = false;

      try {
        top = window.frameElement == null && document.documentElement;
      } catch(e) {}

      if ( top && top.doScroll ) {
        (function doScrollCheck() {
          if ( !jQuery.isReady ) {

            try {
              // Use the trick by Diego Perini
              // http://javascript.nwbox.com/IEContentLoaded/
              top.doScroll("left");
            } catch(e) {
              return setTimeout( doScrollCheck, 50 );
            }

            // detach all dom ready events
            detach();

            // and execute any waiting functions
            jQuery.ready();
          }
        })();
      }
    }
  }
  return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
  break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
  // We need to execute this one support test ASAP because we need to know
  // if body.style.zoom needs to be set.

  var container, div,
    body = document.getElementsByTagName("body")[0];

  if ( !body ) {
    // Return for frameset docs that don't have a body
    return;
  }

  // Setup
  container = document.createElement( "div" );
  container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

  div = document.createElement( "div" );
  body.appendChild( container ).appendChild( div );

  if ( typeof div.style.zoom !== strundefined ) {
    // Support: IE<8
    // Check if natively block-level elements act like inline-block
    // elements when setting their display to 'inline' and giving
    // them layout
    div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

    if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
      // Prevent IE 6 from affecting layout for positioned elements #11048
      // Prevent IE from shrinking the body in IE 7 mode #12869
      // Support: IE<8
      body.style.zoom = 1;
    }
  }

  body.removeChild( container );

  // Null elements to avoid leaks in IE
  container = div = null;
});




(function() {
  var div = document.createElement( "div" );

  // Execute the test only if not already executed in another module.
  if (support.deleteExpando == null) {
    // Support: IE<9
    support.deleteExpando = true;
    try {
      delete div.test;
    } catch( e ) {
      support.deleteExpando = false;
    }
  }

  // Null elements to avoid leaks in IE.
  div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
  var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
    nodeType = +elem.nodeType || 1;

  // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
  return nodeType !== 1 && nodeType !== 9 ?
    false :

    // Nodes accept data unless otherwise specified; rejection can be conditional
    !noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ) {

    var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

    data = elem.getAttribute( name );

    if ( typeof data === "string" ) {
      try {
        data = data === "true" ? true :
          data === "false" ? false :
          data === "null" ? null :
          // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data :
          rbrace.test( data ) ? jQuery.parseJSON( data ) :
          data;
      } catch( e ) {}

      // Make sure we set the data so it isn't changed later
      jQuery.data( elem, key, data );

    } else {
      data = undefined;
    }
  }

  return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
  var name;
  for ( name in obj ) {

    // if the public data object is empty, the private is still empty
    if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
      continue;
    }
    if ( name !== "toJSON" ) {
      return false;
    }
  }

  return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
  if ( !jQuery.acceptData( elem ) ) {
    return;
  }

  var ret, thisCache,
    internalKey = jQuery.expando,

    // We have to handle DOM nodes and JS objects differently because IE6-7
    // can't GC object references properly across the DOM-JS boundary
    isNode = elem.nodeType,

    // Only DOM nodes need the global jQuery cache; JS object data is
    // attached directly to the object so GC can occur automatically
    cache = isNode ? jQuery.cache : elem,

    // Only defining an ID for JS objects if its cache already exists allows
    // the code to shortcut on the same path as a DOM node with no cache
    id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

  // Avoid doing any more work than we need to when trying to get data on an
  // object that has no data at all
  if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
    return;
  }

  if ( !id ) {
    // Only DOM nodes need a new unique ID for each element since their data
    // ends up in the global cache
    if ( isNode ) {
      id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
    } else {
      id = internalKey;
    }
  }

  if ( !cache[ id ] ) {
    // Avoid exposing jQuery metadata on plain JS objects when the object
    // is serialized using JSON.stringify
    cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
  }

  // An object can be passed to jQuery.data instead of a key/value pair; this gets
  // shallow copied over onto the existing cache
  if ( typeof name === "object" || typeof name === "function" ) {
    if ( pvt ) {
      cache[ id ] = jQuery.extend( cache[ id ], name );
    } else {
      cache[ id ].data = jQuery.extend( cache[ id ].data, name );
    }
  }

  thisCache = cache[ id ];

  // jQuery data() is stored in a separate object inside the object's internal data
  // cache in order to avoid key collisions between internal data and user-defined
  // data.
  if ( !pvt ) {
    if ( !thisCache.data ) {
      thisCache.data = {};
    }

    thisCache = thisCache.data;
  }

  if ( data !== undefined ) {
    thisCache[ jQuery.camelCase( name ) ] = data;
  }

  // Check for both converted-to-camel and non-converted data property names
  // If a data property was specified
  if ( typeof name === "string" ) {

    // First Try to find as-is property data
    ret = thisCache[ name ];

    // Test for null|undefined property data
    if ( ret == null ) {

      // Try to find the camelCased property
      ret = thisCache[ jQuery.camelCase( name ) ];
    }
  } else {
    ret = thisCache;
  }

  return ret;
}

function internalRemoveData( elem, name, pvt ) {
  if ( !jQuery.acceptData( elem ) ) {
    return;
  }

  var thisCache, i,
    isNode = elem.nodeType,

    // See jQuery.data for more information
    cache = isNode ? jQuery.cache : elem,
    id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

  // If there is already no cache entry for this object, there is no
  // purpose in continuing
  if ( !cache[ id ] ) {
    return;
  }

  if ( name ) {

    thisCache = pvt ? cache[ id ] : cache[ id ].data;

    if ( thisCache ) {

      // Support array or space separated string names for data keys
      if ( !jQuery.isArray( name ) ) {

        // try the string as a key before any manipulation
        if ( name in thisCache ) {
          name = [ name ];
        } else {

          // split the camel cased version by spaces unless a key with the spaces exists
          name = jQuery.camelCase( name );
          if ( name in thisCache ) {
            name = [ name ];
          } else {
            name = name.split(" ");
          }
        }
      } else {
        // If "name" is an array of keys...
        // When data is initially created, via ("key", "val") signature,
        // keys will be converted to camelCase.
        // Since there is no way to tell _how_ a key was added, remove
        // both plain key and camelCase key. #12786
        // This will only penalize the array argument path.
        name = name.concat( jQuery.map( name, jQuery.camelCase ) );
      }

      i = name.length;
      while ( i-- ) {
        delete thisCache[ name[i] ];
      }

      // If there is no data left in the cache, we want to continue
      // and let the cache object itself get destroyed
      if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
        return;
      }
    }
  }

  // See jQuery.data for more information
  if ( !pvt ) {
    delete cache[ id ].data;

    // Don't destroy the parent cache unless the internal data object
    // had been the only thing left in it
    if ( !isEmptyDataObject( cache[ id ] ) ) {
      return;
    }
  }

  // Destroy the cache
  if ( isNode ) {
    jQuery.cleanData( [ elem ], true );

  // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
  /* jshint eqeqeq: false */
  } else if ( support.deleteExpando || cache != cache.window ) {
    /* jshint eqeqeq: true */
    delete cache[ id ];

  // When all else fails, null
  } else {
    cache[ id ] = null;
  }
}

jQuery.extend({
  cache: {},

  // The following elements (space-suffixed to avoid Object.prototype collisions)
  // throw uncatchable exceptions if you attempt to set expando properties
  noData: {
    "applet ": true,
    "embed ": true,
    // ...but Flash objects (which have this classid) *can* handle expandos
    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
  },

  hasData: function( elem ) {
    elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
    return !!elem && !isEmptyDataObject( elem );
  },

  data: function( elem, name, data ) {
    return internalData( elem, name, data );
  },

  removeData: function( elem, name ) {
    return internalRemoveData( elem, name );
  },

  // For internal use only.
  _data: function( elem, name, data ) {
    return internalData( elem, name, data, true );
  },

  _removeData: function( elem, name ) {
    return internalRemoveData( elem, name, true );
  }
});

jQuery.fn.extend({
  data: function( key, value ) {
    var i, name, data,
      elem = this[0],
      attrs = elem && elem.attributes;

    // Special expections of .data basically thwart jQuery.access,
    // so implement the relevant behavior ourselves

    // Gets all values
    if ( key === undefined ) {
      if ( this.length ) {
        data = jQuery.data( elem );

        if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
          i = attrs.length;
          while ( i-- ) {
            name = attrs[i].name;

            if ( name.indexOf("data-") === 0 ) {
              name = jQuery.camelCase( name.slice(5) );

              dataAttr( elem, name, data[ name ] );
            }
          }
          jQuery._data( elem, "parsedAttrs", true );
        }
      }

      return data;
    }

    // Sets multiple values
    if ( typeof key === "object" ) {
      return this.each(function() {
        jQuery.data( this, key );
      });
    }

    return arguments.length > 1 ?

      // Sets one value
      this.each(function() {
        jQuery.data( this, key, value );
      }) :

      // Gets one value
      // Try to fetch any internally stored data first
      elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
  },

  removeData: function( key ) {
    return this.each(function() {
      jQuery.removeData( this, key );
    });
  }
});


jQuery.extend({
  queue: function( elem, type, data ) {
    var queue;

    if ( elem ) {
      type = ( type || "fx" ) + "queue";
      queue = jQuery._data( elem, type );

      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ) {
        if ( !queue || jQuery.isArray(data) ) {
          queue = jQuery._data( elem, type, jQuery.makeArray(data) );
        } else {
          queue.push( data );
        }
      }
      return queue || [];
    }
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      startLength = queue.length,
      fn = queue.shift(),
      hooks = jQuery._queueHooks( elem, type ),
      next = function() {
        jQuery.dequeue( elem, type );
      };

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
      startLength--;
    }

    if ( fn ) {

      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift( "inprogress" );
      }

      // clear up the last queue stop function
      delete hooks.stop;
      fn.call( elem, next, hooks );
    }

    if ( !startLength && hooks ) {
      hooks.empty.fire();
    }
  },

  // not intended for public consumption - generates a queueHooks object, or returns the current one
  _queueHooks: function( elem, type ) {
    var key = type + "queueHooks";
    return jQuery._data( elem, key ) || jQuery._data( elem, key, {
      empty: jQuery.Callbacks("once memory").add(function() {
        jQuery._removeData( elem, type + "queue" );
        jQuery._removeData( elem, key );
      })
    });
  }
});

jQuery.fn.extend({
  queue: function( type, data ) {
    var setter = 2;

    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
      setter--;
    }

    if ( arguments.length < setter ) {
      return jQuery.queue( this[0], type );
    }

    return data === undefined ?
      this :
      this.each(function() {
        var queue = jQuery.queue( this, type, data );

        // ensure a hooks for this queue
        jQuery._queueHooks( this, type );

        if ( type === "fx" && queue[0] !== "inprogress" ) {
          jQuery.dequeue( this, type );
        }
      });
  },
  dequeue: function( type ) {
    return this.each(function() {
      jQuery.dequeue( this, type );
    });
  },
  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  },
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default)
  promise: function( type, obj ) {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(),
      elements = this,
      i = this.length,
      resolve = function() {
        if ( !( --count ) ) {
          defer.resolveWith( elements, [ elements ] );
        }
      };

    if ( typeof type !== "string" ) {
      obj = type;
      type = undefined;
    }
    type = type || "fx";

    while ( i-- ) {
      tmp = jQuery._data( elements[ i ], type + "queueHooks" );
      if ( tmp && tmp.empty ) {
        count++;
        tmp.empty.add( resolve );
      }
    }
    resolve();
    return defer.promise( obj );
  }
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
  };



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  var i = 0,
    length = elems.length,
    bulk = key == null;

  // Sets many values
  if ( jQuery.type( key ) === "object" ) {
    chainable = true;
    for ( i in key ) {
      jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
    }

  // Sets one value
  } else if ( value !== undefined ) {
    chainable = true;

    if ( !jQuery.isFunction( value ) ) {
      raw = true;
    }

    if ( bulk ) {
      // Bulk operations run against the entire set
      if ( raw ) {
        fn.call( elems, value );
        fn = null;

      // ...except when executing function values
      } else {
        bulk = fn;
        fn = function( elem, key, value ) {
          return bulk.call( jQuery( elem ), value );
        };
      }
    }

    if ( fn ) {
      for ( ; i < length; i++ ) {
        fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
      }
    }
  }

  return chainable ?
    elems :

    // Gets
    bulk ?
      fn.call( elems ) :
      length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
  var fragment = document.createDocumentFragment(),
    div = document.createElement("div"),
    input = document.createElement("input");

  // Setup
  div.setAttribute( "className", "t" );
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

  // IE strips leading whitespace when .innerHTML is used
  support.leadingWhitespace = div.firstChild.nodeType === 3;

  // Make sure that tbody elements aren't automatically inserted
  // IE will insert them into empty tables
  support.tbody = !div.getElementsByTagName( "tbody" ).length;

  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

  // Makes sure cloning an html5 element does not cause problems
  // Where outerHTML is undefined, this still works
  support.html5Clone =
    document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

  // Check if a disconnected checkbox will retain its checked
  // value of true after appended to the DOM (IE6/7)
  input.type = "checkbox";
  input.checked = true;
  fragment.appendChild( input );
  support.appendChecked = input.checked;

  // Make sure textarea (and checkbox) defaultValue is properly cloned
  // Support: IE6-IE11+
  div.innerHTML = "<textarea>x</textarea>";
  support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

  // #11217 - WebKit loses check when the name is after the checked attribute
  fragment.appendChild( div );
  div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
  // old WebKit doesn't clone checked state correctly in fragments
  support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

  // Support: IE<9
  // Opera does not clone events (and typeof div.attachEvent === undefined).
  // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
  support.noCloneEvent = true;
  if ( div.attachEvent ) {
    div.attachEvent( "onclick", function() {
      support.noCloneEvent = false;
    });

    div.cloneNode( true ).click();
  }

  // Execute the test only if not already executed in another module.
  if (support.deleteExpando == null) {
    // Support: IE<9
    support.deleteExpando = true;
    try {
      delete div.test;
    } catch( e ) {
      support.deleteExpando = false;
    }
  }

  // Null elements to avoid leaks in IE.
  fragment = div = input = null;
})();


(function() {
  var i, eventName,
    div = document.createElement( "div" );

  // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
  for ( i in { submit: true, change: true, focusin: true }) {
    eventName = "on" + i;

    if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
      // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
      div.setAttribute( eventName, "t" );
      support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
    }
  }

  // Null elements to avoid leaks in IE.
  div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
  rkeyEvent = /^key/,
  rmouseEvent = /^(?:mouse|contextmenu)|click/,
  rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
  return true;
}

function returnFalse() {
  return false;
}

function safeActiveElement() {
  try {
    return document.activeElement;
  } catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

  global: {},

  add: function( elem, types, handler, data, selector ) {
    var tmp, events, t, handleObjIn,
      special, eventHandle, handleObj,
      handlers, type, namespaces, origType,
      elemData = jQuery._data( elem );

    // Don't attach events to noData or text/comment nodes (but allow plain objects)
    if ( !elemData ) {
      return;
    }

    // Caller can pass in an object of custom data in lieu of the handler
    if ( handler.handler ) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
    }

    // Make sure that the handler has a unique ID, used to find/remove it later
    if ( !handler.guid ) {
      handler.guid = jQuery.guid++;
    }

    // Init the element's event structure and main handler, if this is the first
    if ( !(events = elemData.events) ) {
      events = elemData.events = {};
    }
    if ( !(eventHandle = elemData.handle) ) {
      eventHandle = elemData.handle = function( e ) {
        // Discard the second event of a jQuery.event.trigger() and
        // when an event is called after a page has unloaded
        return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
          jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
          undefined;
      };
      // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
      eventHandle.elem = elem;
    }

    // Handle multiple events separated by a space
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // There *must* be a type, no attaching namespace-only handlers
      if ( !type ) {
        continue;
      }

      // If event changes its type, use the special event handlers for the changed type
      special = jQuery.event.special[ type ] || {};

      // If selector defined, determine special event api type, otherwise given type
      type = ( selector ? special.delegateType : special.bindType ) || type;

      // Update special based on newly reset type
      special = jQuery.event.special[ type ] || {};

      // handleObj is passed to all event handlers
      handleObj = jQuery.extend({
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
        namespace: namespaces.join(".")
      }, handleObjIn );

      // Init the event handler queue if we're the first
      if ( !(handlers = events[ type ]) ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener/attachEvent if the special events handler returns false
        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
          // Bind the global event handler to the element
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

          } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
          }
        }
      }

      if ( special.add ) {
        special.add.call( elem, handleObj );

        if ( !handleObj.handler.guid ) {
          handleObj.handler.guid = handler.guid;
        }
      }

      // Add to the element's handler list, delegates in front
      if ( selector ) {
        handlers.splice( handlers.delegateCount++, 0, handleObj );
      } else {
        handlers.push( handleObj );
      }

      // Keep track of which events have ever been used, for event optimization
      jQuery.event.global[ type ] = true;
    }

    // Nullify elem to prevent memory leaks in IE
    elem = null;
  },

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, selector, mappedTypes ) {
    var j, handleObj, tmp,
      origCount, t, events,
      special, handlers, type,
      namespaces, origType,
      elemData = jQuery.hasData( elem ) && jQuery._data( elem );

    if ( !elemData || !(events = elemData.events) ) {
      return;
    }

    // Once for each type.namespace in types; type may be omitted
    types = ( types || "" ).match( rnotwhite ) || [ "" ];
    t = types.length;
    while ( t-- ) {
      tmp = rtypenamespace.exec( types[t] ) || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ).split( "." ).sort();

      // Unbind all events (on this namespace, if provided) for the element
      if ( !type ) {
        for ( type in events ) {
          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
        }
        continue;
      }

      special = jQuery.event.special[ type ] || {};
      type = ( selector ? special.delegateType : special.bindType ) || type;
      handlers = events[ type ] || [];
      tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

      // Remove matching events
      origCount = j = handlers.length;
      while ( j-- ) {
        handleObj = handlers[ j ];

        if ( ( mappedTypes || origType === handleObj.origType ) &&
          ( !handler || handler.guid === handleObj.guid ) &&
          ( !tmp || tmp.test( handleObj.namespace ) ) &&
          ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
          handlers.splice( j, 1 );

          if ( handleObj.selector ) {
            handlers.delegateCount--;
          }
          if ( special.remove ) {
            special.remove.call( elem, handleObj );
          }
        }
      }

      // Remove generic event handler if we removed something and no more handlers exist
      // (avoids potential for endless recursion during removal of special event handlers)
      if ( origCount && !handlers.length ) {
        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
          jQuery.removeEvent( elem, type, elemData.handle );
        }

        delete events[ type ];
      }
    }

    // Remove the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ) ) {
      delete elemData.handle;

      // removeData also checks for emptiness and clears the expando if empty
      // so use it instead of delete
      jQuery._removeData( elem, "events" );
    }
  },

  trigger: function( event, data, elem, onlyHandlers ) {
    var handle, ontype, cur,
      bubbleType, special, tmp, i,
      eventPath = [ elem || document ],
      type = hasOwn.call( event, "type" ) ? event.type : event,
      namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

    cur = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
      return;
    }

    if ( type.indexOf(".") >= 0 ) {
      // Namespaced trigger; create a regexp to match event type in handle()
      namespaces = type.split(".");
      type = namespaces.shift();
      namespaces.sort();
    }
    ontype = type.indexOf(":") < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    event = event[ jQuery.expando ] ?
      event :
      new jQuery.Event( type, typeof event === "object" && event );

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ?
      new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
      null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if ( !event.target ) {
      event.target = elem;
    }

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
      [ event ] :
      jQuery.makeArray( data, [ event ] );

    // Allow special events to draw outside the lines
    special = jQuery.event.special[ type ] || {};
    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
      return;
    }

    // Determine event propagation path in advance, per W3C events spec (#9951)
    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

      bubbleType = special.delegateType || type;
      if ( !rfocusMorph.test( bubbleType + type ) ) {
        cur = cur.parentNode;
      }
      for ( ; cur; cur = cur.parentNode ) {
        eventPath.push( cur );
        tmp = cur;
      }

      // Only add window if we got to document (e.g., not plain obj or detached DOM)
      if ( tmp === (elem.ownerDocument || document) ) {
        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
      }
    }

    // Fire handlers on the event path
    i = 0;
    while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;

      // jQuery handler
      handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
      if ( handle ) {
        handle.apply( cur, data );
      }

      // Native handler
      handle = ontype && cur[ ontype ];
      if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
        event.result = handle.apply( cur, data );
        if ( event.result === false ) {
          event.preventDefault();
        }
      }
    }
    event.type = type;

    // If nobody prevented the default action, do it now
    if ( !onlyHandlers && !event.isDefaultPrevented() ) {

      if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
        jQuery.acceptData( elem ) ) {

        // Call a native DOM method on the target with the same name name as the event.
        // Can't use an .isFunction() check here because IE6/7 fails that test.
        // Don't do default actions on window, that's where global variables be (#6170)
        if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

          // Don't re-trigger an onFOO event when we call its FOO() method
          tmp = elem[ ontype ];

          if ( tmp ) {
            elem[ ontype ] = null;
          }

          // Prevent re-triggering of the same event, since we already bubbled it above
          jQuery.event.triggered = type;
          try {
            elem[ type ]();
          } catch ( e ) {
            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
          }
          jQuery.event.triggered = undefined;

          if ( tmp ) {
            elem[ ontype ] = tmp;
          }
        }
      }
    }

    return event.result;
  },

  dispatch: function( event ) {

    // Make a writable jQuery.Event from the native event object
    event = jQuery.event.fix( event );

    var i, ret, handleObj, matched, j,
      handlerQueue = [],
      args = slice.call( arguments ),
      handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
      special = jQuery.event.special[ event.type ] || {};

    // Use the fix-ed jQuery.Event rather than the (read-only) native event
    args[0] = event;
    event.delegateTarget = this;

    // Call the preDispatch hook for the mapped type, and let it bail if desired
    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
      return;
    }

    // Determine handlers
    handlerQueue = jQuery.event.handlers.call( this, event, handlers );

    // Run delegates first; they may want to stop propagation beneath us
    i = 0;
    while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
      event.currentTarget = matched.elem;

      j = 0;
      while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

        // Triggered event must either 1) have no namespace, or
        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

          event.handleObj = handleObj;
          event.data = handleObj.data;

          ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
              .apply( matched.elem, args );

          if ( ret !== undefined ) {
            if ( (event.result = ret) === false ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }

    // Call the postDispatch hook for the mapped type
    if ( special.postDispatch ) {
      special.postDispatch.call( this, event );
    }

    return event.result;
  },

  handlers: function( event, handlers ) {
    var sel, handleObj, matches, i,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;

    // Find delegate handlers
    // Black-hole SVG <use> instance trees (#13180)
    // Avoid non-left-click bubbling in Firefox (#3861)
    if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

      /* jshint eqeqeq: false */
      for ( ; cur != this; cur = cur.parentNode || this ) {
        /* jshint eqeqeq: true */

        // Don't check non-elements (#13208)
        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
        if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
          matches = [];
          for ( i = 0; i < delegateCount; i++ ) {
            handleObj = handlers[ i ];

            // Don't conflict with Object.prototype properties (#13203)
            sel = handleObj.selector + " ";

            if ( matches[ sel ] === undefined ) {
              matches[ sel ] = handleObj.needsContext ?
                jQuery( sel, this ).index( cur ) >= 0 :
                jQuery.find( sel, this, null, [ cur ] ).length;
            }
            if ( matches[ sel ] ) {
              matches.push( handleObj );
            }
          }
          if ( matches.length ) {
            handlerQueue.push({ elem: cur, handlers: matches });
          }
        }
      }
    }

    // Add the remaining (directly-bound) handlers
    if ( delegateCount < handlers.length ) {
      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
    }

    return handlerQueue;
  },

  fix: function( event ) {
    if ( event[ jQuery.expando ] ) {
      return event;
    }

    // Create a writable copy of the event object and normalize some properties
    var i, prop, copy,
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[ type ];

    if ( !fixHook ) {
      this.fixHooks[ type ] = fixHook =
        rmouseEvent.test( type ) ? this.mouseHooks :
        rkeyEvent.test( type ) ? this.keyHooks :
        {};
    }
    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

    event = new jQuery.Event( originalEvent );

    i = copy.length;
    while ( i-- ) {
      prop = copy[ i ];
      event[ prop ] = originalEvent[ prop ];
    }

    // Support: IE<9
    // Fix target property (#1925)
    if ( !event.target ) {
      event.target = originalEvent.srcElement || document;
    }

    // Support: Chrome 23+, Safari?
    // Target should not be a text node (#504, #13143)
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    // Support: IE<9
    // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
    event.metaKey = !!event.metaKey;

    return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
  },

  // Includes some event props shared by KeyEvent and MouseEvent
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

  fixHooks: {},

  keyHooks: {
    props: "char charCode key keyCode".split(" "),
    filter: function( event, original ) {

      // Add which for key events
      if ( event.which == null ) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }

      return event;
    }
  },

  mouseHooks: {
    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
    filter: function( event, original ) {
      var body, eventDoc, doc,
        button = original.button,
        fromElement = original.fromElement;

      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && original.clientX != null ) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Add relatedTarget, if necessary
      if ( !event.relatedTarget && fromElement ) {
        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
      }

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      if ( !event.which && button !== undefined ) {
        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
      }

      return event;
    }
  },

  special: {
    load: {
      // Prevent triggered image.load events from bubbling to window.load
      noBubble: true
    },
    focus: {
      // Fire native event if possible so blur/focus sequence is correct
      trigger: function() {
        if ( this !== safeActiveElement() && this.focus ) {
          try {
            this.focus();
            return false;
          } catch ( e ) {
            // Support: IE<9
            // If we error on focus to hidden element (#1486, #12518),
            // let .trigger() run the handlers
          }
        }
      },
      delegateType: "focusin"
    },
    blur: {
      trigger: function() {
        if ( this === safeActiveElement() && this.blur ) {
          this.blur();
          return false;
        }
      },
      delegateType: "focusout"
    },
    click: {
      // For checkbox, fire native event so checked state will be right
      trigger: function() {
        if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
          this.click();
          return false;
        }
      },

      // For cross-browser consistency, don't fire native .click() on links
      _default: function( event ) {
        return jQuery.nodeName( event.target, "a" );
      }
    },

    beforeunload: {
      postDispatch: function( event ) {

        // Even when returnValue equals to undefined Firefox will still show alert
        if ( event.result !== undefined ) {
          event.originalEvent.returnValue = event.result;
        }
      }
    }
  },

  simulate: function( type, elem, event, bubble ) {
    // Piggyback on a donor event to simulate a different one.
    // Fake originalEvent to avoid donor's stopPropagation, but if the
    // simulated event prevents default then we do the same on the donor.
    var e = jQuery.extend(
      new jQuery.Event(),
      event,
      {
        type: type,
        isSimulated: true,
        originalEvent: {}
      }
    );
    if ( bubble ) {
      jQuery.event.trigger( e, null, elem );
    } else {
      jQuery.event.dispatch.call( elem, e );
    }
    if ( e.isDefaultPrevented() ) {
      event.preventDefault();
    }
  }
};

jQuery.removeEvent = document.removeEventListener ?
  function( elem, type, handle ) {
    if ( elem.removeEventListener ) {
      elem.removeEventListener( type, handle, false );
    }
  } :
  function( elem, type, handle ) {
    var name = "on" + type;

    if ( elem.detachEvent ) {

      // #8545, #7054, preventing memory leaks for custom events in IE6-8
      // detachEvent needed property on element, by name of that event, to properly expose it to GC
      if ( typeof elem[ name ] === strundefined ) {
        elem[ name ] = null;
      }

      elem.detachEvent( name, handle );
    }
  };

jQuery.Event = function( src, props ) {
  // Allow instantiation without the 'new' keyword
  if ( !(this instanceof jQuery.Event) ) {
    return new jQuery.Event( src, props );
  }

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = src.defaultPrevented ||
        src.defaultPrevented === undefined && (
        // Support: IE < 9
        src.returnValue === false ||
        // Support: Android < 4.0
        src.getPreventDefault && src.getPreventDefault() ) ?
      returnTrue :
      returnFalse;

  // Event type
  } else {
    this.type = src;
  }

  // Put explicitly provided properties onto the event object
  if ( props ) {
    jQuery.extend( this, props );
  }

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || jQuery.now();

  // Mark it as fixed
  this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,

  preventDefault: function() {
    var e = this.originalEvent;

    this.isDefaultPrevented = returnTrue;
    if ( !e ) {
      return;
    }

    // If preventDefault exists, run it on the original event
    if ( e.preventDefault ) {
      e.preventDefault();

    // Support: IE
    // Otherwise set the returnValue property of the original event to false
    } else {
      e.returnValue = false;
    }
  },
  stopPropagation: function() {
    var e = this.originalEvent;

    this.isPropagationStopped = returnTrue;
    if ( !e ) {
      return;
    }
    // If stopPropagation exists, run it on the original event
    if ( e.stopPropagation ) {
      e.stopPropagation();
    }

    // Support: IE
    // Set the cancelBubble property of the original event to true
    e.cancelBubble = true;
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = returnTrue;
    this.stopPropagation();
  }
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, function( orig, fix ) {
  jQuery.event.special[ orig ] = {
    delegateType: fix,
    bindType: fix,

    handle: function( event ) {
      var ret,
        target = this,
        related = event.relatedTarget,
        handleObj = event.handleObj;

      // For mousenter/leave call the handler if related is outside the target.
      // NB: No relatedTarget if the mouse left/entered the browser window
      if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply( this, arguments );
        event.type = fix;
      }
      return ret;
    }
  };
});

// IE submit delegation
if ( !support.submitBubbles ) {

  jQuery.event.special.submit = {
    setup: function() {
      // Only need this for delegated form submit events
      if ( jQuery.nodeName( this, "form" ) ) {
        return false;
      }

      // Lazy-add a submit handler when a descendant form may potentially be submitted
      jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
        // Node name check avoids a VML-related crash in IE (#9807)
        var elem = e.target,
          form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
        if ( form && !jQuery._data( form, "submitBubbles" ) ) {
          jQuery.event.add( form, "submit._submit", function( event ) {
            event._submit_bubble = true;
          });
          jQuery._data( form, "submitBubbles", true );
        }
      });
      // return undefined since we don't need an event listener
    },

    postDispatch: function( event ) {
      // If form was submitted by the user, bubble the event up the tree
      if ( event._submit_bubble ) {
        delete event._submit_bubble;
        if ( this.parentNode && !event.isTrigger ) {
          jQuery.event.simulate( "submit", this.parentNode, event, true );
        }
      }
    },

    teardown: function() {
      // Only need this for delegated form submit events
      if ( jQuery.nodeName( this, "form" ) ) {
        return false;
      }

      // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
      jQuery.event.remove( this, "._submit" );
    }
  };
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

  jQuery.event.special.change = {

    setup: function() {

      if ( rformElems.test( this.nodeName ) ) {
        // IE doesn't fire change on a check/radio until blur; trigger it on click
        // after a propertychange. Eat the blur-change in special.change.handle.
        // This still fires onchange a second time for check/radio after blur.
        if ( this.type === "checkbox" || this.type === "radio" ) {
          jQuery.event.add( this, "propertychange._change", function( event ) {
            if ( event.originalEvent.propertyName === "checked" ) {
              this._just_changed = true;
            }
          });
          jQuery.event.add( this, "click._change", function( event ) {
            if ( this._just_changed && !event.isTrigger ) {
              this._just_changed = false;
            }
            // Allow triggered, simulated change events (#11500)
            jQuery.event.simulate( "change", this, event, true );
          });
        }
        return false;
      }
      // Delegated event; lazy-add a change handler on descendant inputs
      jQuery.event.add( this, "beforeactivate._change", function( e ) {
        var elem = e.target;

        if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
          jQuery.event.add( elem, "change._change", function( event ) {
            if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
              jQuery.event.simulate( "change", this.parentNode, event, true );
            }
          });
          jQuery._data( elem, "changeBubbles", true );
        }
      });
    },

    handle: function( event ) {
      var elem = event.target;

      // Swallow native change events from checkbox/radio, we already triggered them above
      if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
        return event.handleObj.handler.apply( this, arguments );
      }
    },

    teardown: function() {
      jQuery.event.remove( this, "._change" );

      return !rformElems.test( this.nodeName );
    }
  };
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
  jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

    // Attach a single capturing handler on the document while someone wants focusin/focusout
    var handler = function( event ) {
        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
      };

    jQuery.event.special[ fix ] = {
      setup: function() {
        var doc = this.ownerDocument || this,
          attaches = jQuery._data( doc, fix );

        if ( !attaches ) {
          doc.addEventListener( orig, handler, true );
        }
        jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
      },
      teardown: function() {
        var doc = this.ownerDocument || this,
          attaches = jQuery._data( doc, fix ) - 1;

        if ( !attaches ) {
          doc.removeEventListener( orig, handler, true );
          jQuery._removeData( doc, fix );
        } else {
          jQuery._data( doc, fix, attaches );
        }
      }
    };
  });
}

jQuery.fn.extend({

  on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
    var type, origFn;

    // Types can be a map of types/handlers
    if ( typeof types === "object" ) {
      // ( types-Object, selector, data )
      if ( typeof selector !== "string" ) {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for ( type in types ) {
        this.on( type, selector, data, types[ type ], one );
      }
      return this;
    }

    if ( data == null && fn == null ) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if ( fn == null ) {
      if ( typeof selector === "string" ) {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if ( fn === false ) {
      fn = returnFalse;
    } else if ( !fn ) {
      return this;
    }

    if ( one === 1 ) {
      origFn = fn;
      fn = function( event ) {
        // Can use an empty set, since event contains the info
        jQuery().off( event );
        return origFn.apply( this, arguments );
      };
      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
    }
    return this.each( function() {
      jQuery.event.add( this, types, fn, data, selector );
    });
  },
  one: function( types, selector, data, fn ) {
    return this.on( types, selector, data, fn, 1 );
  },
  off: function( types, selector, fn ) {
    var handleObj, type;
    if ( types && types.preventDefault && types.handleObj ) {
      // ( event )  dispatched jQuery.Event
      handleObj = types.handleObj;
      jQuery( types.delegateTarget ).off(
        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
        handleObj.selector,
        handleObj.handler
      );
      return this;
    }
    if ( typeof types === "object" ) {
      // ( types-object [, selector] )
      for ( type in types ) {
        this.off( type, selector, types[ type ] );
      }
      return this;
    }
    if ( selector === false || typeof selector === "function" ) {
      // ( types [, fn] )
      fn = selector;
      selector = undefined;
    }
    if ( fn === false ) {
      fn = returnFalse;
    }
    return this.each(function() {
      jQuery.event.remove( this, types, fn, selector );
    });
  },

  trigger: function( type, data ) {
    return this.each(function() {
      jQuery.event.trigger( type, data, this );
    });
  },
  triggerHandler: function( type, data ) {
    var elem = this[0];
    if ( elem ) {
      return jQuery.event.trigger( type, data, elem, true );
    }
  }
});


function createSafeFragment( document ) {
  var list = nodeNames.split( "|" ),
    safeFrag = document.createDocumentFragment();

  if ( safeFrag.createElement ) {
    while ( list.length ) {
      safeFrag.createElement(
        list.pop()
      );
    }
  }
  return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
    "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
  rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
  rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
  rleadingWhitespace = /^\s+/,
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
  rtagName = /<([\w:]+)/,
  rtbody = /<tbody/i,
  rhtml = /<|&#?\w+;/,
  rnoInnerhtml = /<(?:script|style|link)/i,
  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
  rscriptType = /^$|\/(?:java|ecma)script/i,
  rscriptTypeMasked = /^true\/(.*)/,
  rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

  // We have to close these tags to support XHTML (#13200)
  wrapMap = {
    option: [ 1, "<select multiple='multiple'>", "</select>" ],
    legend: [ 1, "<fieldset>", "</fieldset>" ],
    area: [ 1, "<map>", "</map>" ],
    param: [ 1, "<object>", "</object>" ],
    thead: [ 1, "<table>", "</table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
    // unless wrapped in a div with non-breaking characters in front of it.
    _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
  },
  safeFragment = createSafeFragment( document ),
  fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
  var elems, elem,
    i = 0,
    found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
      typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
      undefined;

  if ( !found ) {
    for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
      if ( !tag || jQuery.nodeName( elem, tag ) ) {
        found.push( elem );
      } else {
        jQuery.merge( found, getAll( elem, tag ) );
      }
    }
  }

  return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
    jQuery.merge( [ context ], found ) :
    found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
  if ( rcheckableType.test( elem.type ) ) {
    elem.defaultChecked = elem.checked;
  }
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
  return jQuery.nodeName( elem, "table" ) &&
    jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

    elem.getElementsByTagName("tbody")[0] ||
      elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
    elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
  elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
  return elem;
}
function restoreScript( elem ) {
  var match = rscriptTypeMasked.exec( elem.type );
  if ( match ) {
    elem.type = match[1];
  } else {
    elem.removeAttribute("type");
  }
  return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
  var elem,
    i = 0;
  for ( ; (elem = elems[i]) != null; i++ ) {
    jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
  }
}

function cloneCopyEvent( src, dest ) {

  if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
    return;
  }

  var type, i, l,
    oldData = jQuery._data( src ),
    curData = jQuery._data( dest, oldData ),
    events = oldData.events;

  if ( events ) {
    delete curData.handle;
    curData.events = {};

    for ( type in events ) {
      for ( i = 0, l = events[ type ].length; i < l; i++ ) {
        jQuery.event.add( dest, type, events[ type ][ i ] );
      }
    }
  }

  // make the cloned public data object a copy from the original
  if ( curData.data ) {
    curData.data = jQuery.extend( {}, curData.data );
  }
}

function fixCloneNodeIssues( src, dest ) {
  var nodeName, e, data;

  // We do not need to do anything for non-Elements
  if ( dest.nodeType !== 1 ) {
    return;
  }

  nodeName = dest.nodeName.toLowerCase();

  // IE6-8 copies events bound via attachEvent when using cloneNode.
  if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
    data = jQuery._data( dest );

    for ( e in data.events ) {
      jQuery.removeEvent( dest, e, data.handle );
    }

    // Event data gets referenced instead of copied if the expando gets copied too
    dest.removeAttribute( jQuery.expando );
  }

  // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
  if ( nodeName === "script" && dest.text !== src.text ) {
    disableScript( dest ).text = src.text;
    restoreScript( dest );

  // IE6-10 improperly clones children of object elements using classid.
  // IE10 throws NoModificationAllowedError if parent is null, #12132.
  } else if ( nodeName === "object" ) {
    if ( dest.parentNode ) {
      dest.outerHTML = src.outerHTML;
    }

    // This path appears unavoidable for IE9. When cloning an object
    // element in IE9, the outerHTML strategy above is not sufficient.
    // If the src has innerHTML and the destination does not,
    // copy the src.innerHTML into the dest.innerHTML. #10324
    if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
      dest.innerHTML = src.innerHTML;
    }

  } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
    // IE6-8 fails to persist the checked state of a cloned checkbox
    // or radio button. Worse, IE6-7 fail to give the cloned element
    // a checked appearance if the defaultChecked value isn't also set

    dest.defaultChecked = dest.checked = src.checked;

    // IE6-7 get confused and end up setting the value of a cloned
    // checkbox/radio button to an empty string instead of "on"
    if ( dest.value !== src.value ) {
      dest.value = src.value;
    }

  // IE6-8 fails to return the selected option to the default selected
  // state when cloning options
  } else if ( nodeName === "option" ) {
    dest.defaultSelected = dest.selected = src.defaultSelected;

  // IE6-8 fails to set the defaultValue to the correct value when
  // cloning other types of input fields
  } else if ( nodeName === "input" || nodeName === "textarea" ) {
    dest.defaultValue = src.defaultValue;
  }
}

jQuery.extend({
  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    var destElements, node, clone, i, srcElements,
      inPage = jQuery.contains( elem.ownerDocument, elem );

    if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
      clone = elem.cloneNode( true );

    // IE<=8 does not properly clone detached, unknown element nodes
    } else {
      fragmentDiv.innerHTML = elem.outerHTML;
      fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
    }

    if ( (!support.noCloneEvent || !support.noCloneChecked) &&
        (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
      destElements = getAll( clone );
      srcElements = getAll( elem );

      // Fix all IE cloning issues
      for ( i = 0; (node = srcElements[i]) != null; ++i ) {
        // Ensure that the destination node is not null; Fixes #9587
        if ( destElements[i] ) {
          fixCloneNodeIssues( node, destElements[i] );
        }
      }
    }

    // Copy the events from the original to the clone
    if ( dataAndEvents ) {
      if ( deepDataAndEvents ) {
        srcElements = srcElements || getAll( elem );
        destElements = destElements || getAll( clone );

        for ( i = 0; (node = srcElements[i]) != null; i++ ) {
          cloneCopyEvent( node, destElements[i] );
        }
      } else {
        cloneCopyEvent( elem, clone );
      }
    }

    // Preserve script evaluation history
    destElements = getAll( clone, "script" );
    if ( destElements.length > 0 ) {
      setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
    }

    destElements = srcElements = node = null;

    // Return the cloned set
    return clone;
  },

  buildFragment: function( elems, context, scripts, selection ) {
    var j, elem, contains,
      tmp, tag, tbody, wrap,
      l = elems.length,

      // Ensure a safe fragment
      safe = createSafeFragment( context ),

      nodes = [],
      i = 0;

    for ( ; i < l; i++ ) {
      elem = elems[ i ];

      if ( elem || elem === 0 ) {

        // Add nodes directly
        if ( jQuery.type( elem ) === "object" ) {
          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

        // Convert non-html into a text node
        } else if ( !rhtml.test( elem ) ) {
          nodes.push( context.createTextNode( elem ) );

        // Convert html into DOM nodes
        } else {
          tmp = tmp || safe.appendChild( context.createElement("div") );

          // Deserialize a standard representation
          tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
          wrap = wrapMap[ tag ] || wrapMap._default;

          tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while ( j-- ) {
            tmp = tmp.lastChild;
          }

          // Manually add leading whitespace removed by IE
          if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
            nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
          }

          // Remove IE's autoinserted <tbody> from table fragments
          if ( !support.tbody ) {

            // String was a <table>, *may* have spurious <tbody>
            elem = tag === "table" && !rtbody.test( elem ) ?
              tmp.firstChild :

              // String was a bare <thead> or <tfoot>
              wrap[1] === "<table>" && !rtbody.test( elem ) ?
                tmp :
                0;

            j = elem && elem.childNodes.length;
            while ( j-- ) {
              if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
                elem.removeChild( tbody );
              }
            }
          }

          jQuery.merge( nodes, tmp.childNodes );

          // Fix #12392 for WebKit and IE > 9
          tmp.textContent = "";

          // Fix #12392 for oldIE
          while ( tmp.firstChild ) {
            tmp.removeChild( tmp.firstChild );
          }

          // Remember the top-level container for proper cleanup
          tmp = safe.lastChild;
        }
      }
    }

    // Fix #11356: Clear elements from fragment
    if ( tmp ) {
      safe.removeChild( tmp );
    }

    // Reset defaultChecked for any radios and checkboxes
    // about to be appended to the DOM in IE 6/7 (#8060)
    if ( !support.appendChecked ) {
      jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
    }

    i = 0;
    while ( (elem = nodes[ i++ ]) ) {

      // #4087 - If origin and destination elements are the same, and this is
      // that element, do not do anything
      if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
        continue;
      }

      contains = jQuery.contains( elem.ownerDocument, elem );

      // Append to fragment
      tmp = getAll( safe.appendChild( elem ), "script" );

      // Preserve script evaluation history
      if ( contains ) {
        setGlobalEval( tmp );
      }

      // Capture executables
      if ( scripts ) {
        j = 0;
        while ( (elem = tmp[ j++ ]) ) {
          if ( rscriptType.test( elem.type || "" ) ) {
            scripts.push( elem );
          }
        }
      }
    }

    tmp = null;

    return safe;
  },

  cleanData: function( elems, /* internal */ acceptData ) {
    var elem, type, id, data,
      i = 0,
      internalKey = jQuery.expando,
      cache = jQuery.cache,
      deleteExpando = support.deleteExpando,
      special = jQuery.event.special;

    for ( ; (elem = elems[i]) != null; i++ ) {
      if ( acceptData || jQuery.acceptData( elem ) ) {

        id = elem[ internalKey ];
        data = id && cache[ id ];

        if ( data ) {
          if ( data.events ) {
            for ( type in data.events ) {
              if ( special[ type ] ) {
                jQuery.event.remove( elem, type );

              // This is a shortcut to avoid jQuery.event.remove's overhead
              } else {
                jQuery.removeEvent( elem, type, data.handle );
              }
            }
          }

          // Remove cache only if it was not already removed by jQuery.event.remove
          if ( cache[ id ] ) {

            delete cache[ id ];

            // IE does not allow us to delete expando properties from nodes,
            // nor does it have a removeAttribute function on Document nodes;
            // we must handle all of these cases
            if ( deleteExpando ) {
              delete elem[ internalKey ];

            } else if ( typeof elem.removeAttribute !== strundefined ) {
              elem.removeAttribute( internalKey );

            } else {
              elem[ internalKey ] = null;
            }

            deletedIds.push( id );
          }
        }
      }
    }
  }
});

jQuery.fn.extend({
  text: function( value ) {
    return access( this, function( value ) {
      return value === undefined ?
        jQuery.text( this ) :
        this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
    }, null, value, arguments.length );
  },

  append: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.appendChild( elem );
      }
    });
  },

  prepend: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
        var target = manipulationTarget( this, elem );
        target.insertBefore( elem, target.firstChild );
      }
    });
  },

  before: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this );
      }
    });
  },

  after: function() {
    return this.domManip( arguments, function( elem ) {
      if ( this.parentNode ) {
        this.parentNode.insertBefore( elem, this.nextSibling );
      }
    });
  },

  remove: function( selector, keepData /* Internal Use Only */ ) {
    var elem,
      elems = selector ? jQuery.filter( selector, this ) : this,
      i = 0;

    for ( ; (elem = elems[i]) != null; i++ ) {

      if ( !keepData && elem.nodeType === 1 ) {
        jQuery.cleanData( getAll( elem ) );
      }

      if ( elem.parentNode ) {
        if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
          setGlobalEval( getAll( elem, "script" ) );
        }
        elem.parentNode.removeChild( elem );
      }
    }

    return this;
  },

  empty: function() {
    var elem,
      i = 0;

    for ( ; (elem = this[i]) != null; i++ ) {
      // Remove element nodes and prevent memory leaks
      if ( elem.nodeType === 1 ) {
        jQuery.cleanData( getAll( elem, false ) );
      }

      // Remove any remaining nodes
      while ( elem.firstChild ) {
        elem.removeChild( elem.firstChild );
      }

      // If this is a select, ensure that it displays empty (#12336)
      // Support: IE<9
      if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
        elem.options.length = 0;
      }
    }

    return this;
  },

  clone: function( dataAndEvents, deepDataAndEvents ) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map(function() {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    });
  },

  html: function( value ) {
    return access( this, function( value ) {
      var elem = this[ 0 ] || {},
        i = 0,
        l = this.length;

      if ( value === undefined ) {
        return elem.nodeType === 1 ?
          elem.innerHTML.replace( rinlinejQuery, "" ) :
          undefined;
      }

      // See if we can take a shortcut and just use innerHTML
      if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
        ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
        ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
        !wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

        value = value.replace( rxhtmlTag, "<$1></$2>" );

        try {
          for (; i < l; i++ ) {
            // Remove element nodes and prevent memory leaks
            elem = this[i] || {};
            if ( elem.nodeType === 1 ) {
              jQuery.cleanData( getAll( elem, false ) );
              elem.innerHTML = value;
            }
          }

          elem = 0;

        // If using innerHTML throws an exception, use the fallback method
        } catch(e) {}
      }

      if ( elem ) {
        this.empty().append( value );
      }
    }, null, value, arguments.length );
  },

  replaceWith: function() {
    var arg = arguments[ 0 ];

    // Make the changes, replacing each context element with the new content
    this.domManip( arguments, function( elem ) {
      arg = this.parentNode;

      jQuery.cleanData( getAll( this ) );

      if ( arg ) {
        arg.replaceChild( elem, this );
      }
    });

    // Force removal if there was no new content (e.g., from empty arguments)
    return arg && (arg.length || arg.nodeType) ? this : this.remove();
  },

  detach: function( selector ) {
    return this.remove( selector, true );
  },

  domManip: function( args, callback ) {

    // Flatten any nested arrays
    args = concat.apply( [], args );

    var first, node, hasScripts,
      scripts, doc, fragment,
      i = 0,
      l = this.length,
      set = this,
      iNoClone = l - 1,
      value = args[0],
      isFunction = jQuery.isFunction( value );

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( isFunction ||
        ( l > 1 && typeof value === "string" &&
          !support.checkClone && rchecked.test( value ) ) ) {
      return this.each(function( index ) {
        var self = set.eq( index );
        if ( isFunction ) {
          args[0] = value.call( this, index, self.html() );
        }
        self.domManip( args, callback );
      });
    }

    if ( l ) {
      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
      first = fragment.firstChild;

      if ( fragment.childNodes.length === 1 ) {
        fragment = first;
      }

      if ( first ) {
        scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
        hasScripts = scripts.length;

        // Use the original fragment for the last item instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).
        for ( ; i < l; i++ ) {
          node = fragment;

          if ( i !== iNoClone ) {
            node = jQuery.clone( node, true, true );

            // Keep references to cloned scripts for later restoration
            if ( hasScripts ) {
              jQuery.merge( scripts, getAll( node, "script" ) );
            }
          }

          callback.call( this[i], node, i );
        }

        if ( hasScripts ) {
          doc = scripts[ scripts.length - 1 ].ownerDocument;

          // Reenable scripts
          jQuery.map( scripts, restoreScript );

          // Evaluate executable scripts on first document insertion
          for ( i = 0; i < hasScripts; i++ ) {
            node = scripts[ i ];
            if ( rscriptType.test( node.type || "" ) &&
              !jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

              if ( node.src ) {
                // Optional AJAX dependency, but won't run scripts if not present
                if ( jQuery._evalUrl ) {
                  jQuery._evalUrl( node.src );
                }
              } else {
                jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
              }
            }
          }
        }

        // Fix #11809: Avoid leaking memory
        fragment = first = null;
      }
    }

    return this;
  }
});

jQuery.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
}, function( name, original ) {
  jQuery.fn[ name ] = function( selector ) {
    var elems,
      i = 0,
      ret = [],
      insert = jQuery( selector ),
      last = insert.length - 1;

    for ( ; i <= last; i++ ) {
      elems = i === last ? this : this.clone(true);
      jQuery( insert[i] )[ original ]( elems );

      // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
      push.apply( ret, elems.get() );
    }

    return this.pushStack( ret );
  };
});


var iframe,
  elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
  var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

    // getDefaultComputedStyle might be reliably used only on attached element
    display = window.getDefaultComputedStyle ?

      // Use of this method is a temporary fix (more like optmization) until something better comes along,
      // since it was removed from specification and supported only in FF
      window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

  // We don't have any data stored on the element,
  // so use "detach" method as fast way to get rid of the element
  elem.detach();

  return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
  var doc = document,
    display = elemdisplay[ nodeName ];

  if ( !display ) {
    display = actualDisplay( nodeName, doc );

    // If the simple way fails, read from inside an iframe
    if ( display === "none" || !display ) {

      // Use the already-created iframe if possible
      iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
      doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

      // Support: IE
      doc.write();
      doc.close();

      display = actualDisplay( nodeName, doc );
      iframe.detach();
    }

    // Store the correct default display
    elemdisplay[ nodeName ] = display;
  }

  return display;
}


(function() {
  var a, shrinkWrapBlocksVal,
    div = document.createElement( "div" ),
    divReset =
      "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
      "display:block;padding:0;margin:0;border:0";

  // Setup
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName( "a" )[ 0 ];

  a.style.cssText = "float:left;opacity:.5";

  // Make sure that element opacity exists
  // (IE uses filter instead)
  // Use a regex to work around a WebKit issue. See #5145
  support.opacity = /^0.5/.test( a.style.opacity );

  // Verify style float existence
  // (IE uses styleFloat instead of cssFloat)
  support.cssFloat = !!a.style.cssFloat;

  div.style.backgroundClip = "content-box";
  div.cloneNode( true ).style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  // Null elements to avoid leaks in IE.
  a = div = null;

  support.shrinkWrapBlocks = function() {
    var body, container, div, containerStyles;

    if ( shrinkWrapBlocksVal == null ) {
      body = document.getElementsByTagName( "body" )[ 0 ];
      if ( !body ) {
        // Test fired too early or in an unsupported environment, exit.
        return;
      }

      containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
      container = document.createElement( "div" );
      div = document.createElement( "div" );

      body.appendChild( container ).appendChild( div );

      // Will be changed later if needed.
      shrinkWrapBlocksVal = false;

      if ( typeof div.style.zoom !== strundefined ) {
        // Support: IE6
        // Check if elements with layout shrink-wrap their children
        div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
        div.innerHTML = "<div></div>";
        div.firstChild.style.width = "5px";
        shrinkWrapBlocksVal = div.offsetWidth !== 3;
      }

      body.removeChild( container );

      // Null elements to avoid leaks in IE.
      body = container = div = null;
    }

    return shrinkWrapBlocksVal;
  };

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
  rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
  getStyles = function( elem ) {
    return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
  };

  curCSS = function( elem, name, computed ) {
    var width, minWidth, maxWidth, ret,
      style = elem.style;

    computed = computed || getStyles( elem );

    // getPropertyValue is only needed for .css('filter') in IE9, see #12537
    ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

    if ( computed ) {

      if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
        ret = jQuery.style( elem, name );
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
      // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
      // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
      if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;

        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;

        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    // Support: IE
    // IE returns zIndex value as an integer.
    return ret === undefined ?
      ret :
      ret + "";
  };
} else if ( document.documentElement.currentStyle ) {
  getStyles = function( elem ) {
    return elem.currentStyle;
  };

  curCSS = function( elem, name, computed ) {
    var left, rs, rsLeft, ret,
      style = elem.style;

    computed = computed || getStyles( elem );
    ret = computed ? computed[ name ] : undefined;

    // Avoid setting ret to empty string here
    // so we don't default to auto
    if ( ret == null && style && style[ name ] ) {
      ret = style[ name ];
    }

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    // but not position css attributes, as those are proportional to the parent element instead
    // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
    if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

      // Remember the original values
      left = style.left;
      rs = elem.runtimeStyle;
      rsLeft = rs && rs.left;

      // Put in the new values to get a computed value out
      if ( rsLeft ) {
        rs.left = elem.currentStyle.left;
      }
      style.left = name === "fontSize" ? "1em" : ret;
      ret = style.pixelLeft + "px";

      // Revert the changed values
      style.left = left;
      if ( rsLeft ) {
        rs.left = rsLeft;
      }
    }

    // Support: IE
    // IE returns zIndex value as an integer.
    return ret === undefined ?
      ret :
      ret + "" || "auto";
  };
}




function addGetHookIf( conditionFn, hookFn ) {
  // Define the hook, we'll check on the first run if it's really needed.
  return {
    get: function() {
      var condition = conditionFn();

      if ( condition == null ) {
        // The test was not ready at this point; screw the hook this time
        // but check again when needed next time.
        return;
      }

      if ( condition ) {
        // Hook not needed (or it's not possible to use it due to missing dependency),
        // remove it.
        // Since there are no other hooks for marginRight, remove the whole object.
        delete this.get;
        return;
      }

      // Hook needed; redefine it so that the support test is not executed again.

      return (this.get = hookFn).apply( this, arguments );
    }
  };
}


(function() {
  var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
    pixelPositionVal, reliableMarginRightVal,
    div = document.createElement( "div" ),
    containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
    divReset =
      "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
      "display:block;padding:0;margin:0;border:0";

  // Setup
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName( "a" )[ 0 ];

  a.style.cssText = "float:left;opacity:.5";

  // Make sure that element opacity exists
  // (IE uses filter instead)
  // Use a regex to work around a WebKit issue. See #5145
  support.opacity = /^0.5/.test( a.style.opacity );

  // Verify style float existence
  // (IE uses styleFloat instead of cssFloat)
  support.cssFloat = !!a.style.cssFloat;

  div.style.backgroundClip = "content-box";
  div.cloneNode( true ).style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  // Null elements to avoid leaks in IE.
  a = div = null;

  jQuery.extend(support, {
    reliableHiddenOffsets: function() {
      if ( reliableHiddenOffsetsVal != null ) {
        return reliableHiddenOffsetsVal;
      }

      var container, tds, isSupported,
        div = document.createElement( "div" ),
        body = document.getElementsByTagName( "body" )[ 0 ];

      if ( !body ) {
        // Return for frameset docs that don't have a body
        return;
      }

      // Setup
      div.setAttribute( "className", "t" );
      div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

      container = document.createElement( "div" );
      container.style.cssText = containerStyles;

      body.appendChild( container ).appendChild( div );

      // Support: IE8
      // Check if table cells still have offsetWidth/Height when they are set
      // to display:none and there are still other visible table cells in a
      // table row; if so, offsetWidth/Height are not reliable for use when
      // determining if an element has been hidden directly using
      // display:none (it is still safe to use offsets if a parent element is
      // hidden; don safety goggles and see bug #4512 for more information).
      div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
      tds = div.getElementsByTagName( "td" );
      tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
      isSupported = ( tds[ 0 ].offsetHeight === 0 );

      tds[ 0 ].style.display = "";
      tds[ 1 ].style.display = "none";

      // Support: IE8
      // Check if empty table cells still have offsetWidth/Height
      reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

      body.removeChild( container );

      // Null elements to avoid leaks in IE.
      div = body = null;

      return reliableHiddenOffsetsVal;
    },

    boxSizing: function() {
      if ( boxSizingVal == null ) {
        computeStyleTests();
      }
      return boxSizingVal;
    },

    boxSizingReliable: function() {
      if ( boxSizingReliableVal == null ) {
        computeStyleTests();
      }
      return boxSizingReliableVal;
    },

    pixelPosition: function() {
      if ( pixelPositionVal == null ) {
        computeStyleTests();
      }
      return pixelPositionVal;
    },

    reliableMarginRight: function() {
      var body, container, div, marginDiv;

      // Use window.getComputedStyle because jsdom on node.js will break without it.
      if ( reliableMarginRightVal == null && window.getComputedStyle ) {
        body = document.getElementsByTagName( "body" )[ 0 ];
        if ( !body ) {
          // Test fired too early or in an unsupported environment, exit.
          return;
        }

        container = document.createElement( "div" );
        div = document.createElement( "div" );
        container.style.cssText = containerStyles;

        body.appendChild( container ).appendChild( div );

        // Check if div with explicit width and no margin-right incorrectly
        // gets computed margin-right based on width of container. (#3333)
        // Fails in WebKit before Feb 2011 nightlies
        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
        marginDiv = div.appendChild( document.createElement( "div" ) );
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";

        reliableMarginRightVal =
          !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

        body.removeChild( container );
      }

      return reliableMarginRightVal;
    }
  });

  function computeStyleTests() {
    var container, div,
      body = document.getElementsByTagName( "body" )[ 0 ];

    if ( !body ) {
      // Test fired too early or in an unsupported environment, exit.
      return;
    }

    container = document.createElement( "div" );
    div = document.createElement( "div" );
    container.style.cssText = containerStyles;

    body.appendChild( container ).appendChild( div );

    div.style.cssText =
      "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
        "position:absolute;display:block;padding:1px;border:1px;width:4px;" +
        "margin-top:1%;top:1%";

    // Workaround failing boxSizing test due to offsetWidth returning wrong value
    // with some non-1 values of body zoom, ticket #13543
    jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
      boxSizingVal = div.offsetWidth === 4;
    });

    // Will be changed later if needed.
    boxSizingReliableVal = true;
    pixelPositionVal = false;
    reliableMarginRightVal = true;

    // Use window.getComputedStyle because jsdom on node.js will break without it.
    if ( window.getComputedStyle ) {
      pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
      boxSizingReliableVal =
        ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
    }

    body.removeChild( container );

    // Null elements to avoid leaks in IE.
    div = body = null;
  }

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
  var ret, name,
    old = {};

  // Remember the old values, and insert the new ones
  for ( name in options ) {
    old[ name ] = elem.style[ name ];
    elem.style[ name ] = options[ name ];
  }

  ret = callback.apply( elem, args || [] );

  // Revert the old values
  for ( name in options ) {
    elem.style[ name ] = old[ name ];
  }

  return ret;
};


var
    ralpha = /alpha\([^)]*\)/i,
  ropacity = /opacity\s*=\s*([^)]*)/,

  // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
  rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssNormalTransform = {
    letterSpacing: 0,
    fontWeight: 400
  },

  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

  // shortcut for names that are not vendor prefixed
  if ( name in style ) {
    return name;
  }

  // check for vendor prefixed names
  var capName = name.charAt(0).toUpperCase() + name.slice(1),
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ) {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ) {
      return name;
    }
  }

  return origName;
}

function showHide( elements, show ) {
  var display, elem, hidden,
    values = [],
    index = 0,
    length = elements.length;

  for ( ; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }

    values[ index ] = jQuery._data( elem, "olddisplay" );
    display = elem.style.display;
    if ( show ) {
      // Reset the inline display of this element to learn if it is
      // being hidden by cascaded rules or not
      if ( !values[ index ] && display === "none" ) {
        elem.style.display = "";
      }

      // Set elements which have been overridden with display: none
      // in a stylesheet to whatever the default browser style is
      // for such an element
      if ( elem.style.display === "" && isHidden( elem ) ) {
        values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
      }
    } else {

      if ( !values[ index ] ) {
        hidden = isHidden( elem );

        if ( display && display !== "none" || !hidden ) {
          jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
        }
      }
    }
  }

  // Set the display of most of the elements in a second loop
  // to avoid the constant reflow
  for ( index = 0; index < length; index++ ) {
    elem = elements[ index ];
    if ( !elem.style ) {
      continue;
    }
    if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
      elem.style.display = show ? values[ index ] || "" : "none";
    }
  }

  return elements;
}

function setPositiveNumber( elem, value, subtract ) {
  var matches = rnumsplit.exec( value );
  return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
    value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
  var i = extra === ( isBorderBox ? "border" : "content" ) ?
    // If we already have the right measurement, avoid augmentation
    4 :
    // Otherwise initialize for horizontal or vertical properties
    name === "width" ? 1 : 0,

    val = 0;

  for ( ; i < 4; i += 2 ) {
    // both box models exclude margin, so add it if we want it
    if ( extra === "margin" ) {
      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
    }

    if ( isBorderBox ) {
      // border-box includes padding, so remove it if we want content
      if ( extra === "content" ) {
        val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
      }

      // at this point, extra isn't border nor margin, so remove border
      if ( extra !== "margin" ) {
        val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    } else {
      // at this point, extra isn't content, so add padding
      val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

      // at this point, extra isn't content nor padding, so add border
      if ( extra !== "padding" ) {
        val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
      }
    }
  }

  return val;
}

function getWidthOrHeight( elem, name, extra ) {

  // Start with offset property, which is equivalent to the border-box value
  var valueIsBorderBox = true,
    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
    styles = getStyles( elem ),
    isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

  // some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
  if ( val <= 0 || val == null ) {
    // Fall back to computed then uncomputed css if necessary
    val = curCSS( elem, name, styles );
    if ( val < 0 || val == null ) {
      val = elem.style[ name ];
    }

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val) ) {
      return val;
    }

    // we need the check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ) || 0;
  }

  // use the active box-sizing model to add/subtract irrelevant styles
  return ( val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || ( isBorderBox ? "border" : "content" ),
      valueIsBorderBox,
      styles
    )
  ) + "px";
}

jQuery.extend({
  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ) {
        if ( computed ) {
          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity" );
          return ret === "" ? "1" : ret;
        }
      }
    }
  },

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    // normalize float css property
    "float": support.cssFloat ? "cssFloat" : "styleFloat"
  },

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ) {
    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = jQuery.camelCase( name ),
      style = elem.style;

    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // Check if we're setting a value
    if ( value !== undefined ) {
      type = typeof value;

      // convert relative number strings (+= or -=) to relative numbers. #7345
      if ( type === "string" && (ret = rrelNum.exec( value )) ) {
        value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
        // Fixes bug #9237
        type = "number";
      }

      // Make sure that null and NaN values aren't set. See: #7116
      if ( value == null || value !== value ) {
        return;
      }

      // If a number was passed in, add 'px' to the (except for certain CSS properties)
      if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
        value += "px";
      }

      // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
      // but it would mean to define eight (for every problematic property) identical functions
      if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
        style[ name ] = "inherit";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

        // Support: IE
        // Swallow errors from 'invalid' CSS values (#5509)
        try {
          // Support: Chrome, Safari
          // Setting style to blank string required to delete "style: x !important;"
          style[ name ] = "";
          style[ name ] = value;
        } catch(e) {}
      }

    } else {
      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
        return ret;
      }

      // Otherwise just get the value from the style object
      return style[ name ];
    }
  },

  css: function( elem, name, extra, styles ) {
    var num, val, hooks,
      origName = jQuery.camelCase( name );

    // Make sure that we're working with the right name
    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks ) {
      val = hooks.get( elem, true, extra );
    }

    // Otherwise, if a way to get the computed value exists, use that
    if ( val === undefined ) {
      val = curCSS( elem, name, styles );
    }

    //convert "normal" to computed value
    if ( val === "normal" && name in cssNormalTransform ) {
      val = cssNormalTransform[ name ];
    }

    // Return, converting to number if forced or a qualifier was provided and val looks numeric
    if ( extra === "" || extra ) {
      num = parseFloat( val );
      return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
    }
    return val;
  }
});

jQuery.each([ "height", "width" ], function( i, name ) {
  jQuery.cssHooks[ name ] = {
    get: function( elem, computed, extra ) {
      if ( computed ) {
        // certain elements can have dimension info if we invisibly show them
        // however, it must have a current display style that would benefit from this
        return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
          jQuery.swap( elem, cssShow, function() {
            return getWidthOrHeight( elem, name, extra );
          }) :
          getWidthOrHeight( elem, name, extra );
      }
    },

    set: function( elem, value, extra ) {
      var styles = extra && getStyles( elem );
      return setPositiveNumber( elem, value, extra ?
        augmentWidthOrHeight(
          elem,
          name,
          extra,
          support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
          styles
        ) : 0
      );
    }
  };
});

if ( !support.opacity ) {
  jQuery.cssHooks.opacity = {
    get: function( elem, computed ) {
      // IE uses filters for opacity
      return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
        ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
        computed ? "1" : "";
    },

    set: function( elem, value ) {
      var style = elem.style,
        currentStyle = elem.currentStyle,
        opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
        filter = currentStyle && currentStyle.filter || style.filter || "";

      // IE has trouble with opacity if it does not have layout
      // Force it by setting the zoom level
      style.zoom = 1;

      // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
      // if value === "", then remove inline opacity #12685
      if ( ( value >= 1 || value === "" ) &&
          jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
          style.removeAttribute ) {

        // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
        // if "filter:" is present at all, clearType is disabled, we want to avoid this
        // style.removeAttribute is IE Only, but so apparently is this code path...
        style.removeAttribute( "filter" );

        // if there is no filter style applied in a css rule or unset inline opacity, we are done
        if ( value === "" || currentStyle && !currentStyle.filter ) {
          return;
        }
      }

      // otherwise, set new filter values
      style.filter = ralpha.test( filter ) ?
        filter.replace( ralpha, opacity ) :
        filter + " " + opacity;
    }
  };
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
  function( elem, computed ) {
    if ( computed ) {
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      // Work around by temporarily setting element display to inline-block
      return jQuery.swap( elem, { "display": "inline-block" },
        curCSS, [ elem, "marginRight" ] );
    }
  }
);

// These hooks are used by animate to expand properties
jQuery.each({
  margin: "",
  padding: "",
  border: "Width"
}, function( prefix, suffix ) {
  jQuery.cssHooks[ prefix + suffix ] = {
    expand: function( value ) {
      var i = 0,
        expanded = {},

        // assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [ value ];

      for ( ; i < 4; i++ ) {
        expanded[ prefix + cssExpand[ i ] + suffix ] =
          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
      }

      return expanded;
    }
  };

  if ( !rmargin.test( prefix ) ) {
    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  }
});

jQuery.fn.extend({
  css: function( name, value ) {
    return access( this, function( elem, name, value ) {
      var styles, len,
        map = {},
        i = 0;

      if ( jQuery.isArray( name ) ) {
        styles = getStyles( elem );
        len = name.length;

        for ( ; i < len; i++ ) {
          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
        }

        return map;
      }

      return value !== undefined ?
        jQuery.style( elem, name, value ) :
        jQuery.css( elem, name );
    }, name, value, arguments.length > 1 );
  },
  show: function() {
    return showHide( this, true );
  },
  hide: function() {
    return showHide( this );
  },
  toggle: function( state ) {
    if ( typeof state === "boolean" ) {
      return state ? this.show() : this.hide();
    }

    return this.each(function() {
      if ( isHidden( this ) ) {
        jQuery( this ).show();
      } else {
        jQuery( this ).hide();
      }
    });
  }
});


function Tween( elem, options, prop, end, easing ) {
  return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
  constructor: Tween,
  init: function( elem, options, prop, end, easing, unit ) {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing || "swing";
    this.options = options;
    this.start = this.now = this.cur();
    this.end = end;
    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
  },
  cur: function() {
    var hooks = Tween.propHooks[ this.prop ];

    return hooks && hooks.get ?
      hooks.get( this ) :
      Tween.propHooks._default.get( this );
  },
  run: function( percent ) {
    var eased,
      hooks = Tween.propHooks[ this.prop ];

    if ( this.options.duration ) {
      this.pos = eased = jQuery.easing[ this.easing ](
        percent, this.options.duration * percent, 0, 1, this.options.duration
      );
    } else {
      this.pos = eased = percent;
    }
    this.now = ( this.end - this.start ) * eased + this.start;

    if ( this.options.step ) {
      this.options.step.call( this.elem, this.now, this );
    }

    if ( hooks && hooks.set ) {
      hooks.set( this );
    } else {
      Tween.propHooks._default.set( this );
    }
    return this;
  }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
  _default: {
    get: function( tween ) {
      var result;

      if ( tween.elem[ tween.prop ] != null &&
        (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
        return tween.elem[ tween.prop ];
      }

      // passing an empty string as a 3rd parameter to .css will automatically
      // attempt a parseFloat and fallback to a string if the parse fails
      // so, simple values such as "10px" are parsed to Float.
      // complex values such as "rotate(1rad)" are returned as is.
      result = jQuery.css( tween.elem, tween.prop, "" );
      // Empty strings, null, undefined and "auto" are converted to 0.
      return !result || result === "auto" ? 0 : result;
    },
    set: function( tween ) {
      // use step hook for back compat - use cssHook if its there - use .style if its
      // available and use plain properties where available
      if ( jQuery.fx.step[ tween.prop ] ) {
        jQuery.fx.step[ tween.prop ]( tween );
      } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
      } else {
        tween.elem[ tween.prop ] = tween.now;
      }
    }
  }
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  set: function( tween ) {
    if ( tween.elem.nodeType && tween.elem.parentNode ) {
      tween.elem[ tween.prop ] = tween.now;
    }
  }
};

jQuery.easing = {
  linear: function( p ) {
    return p;
  },
  swing: function( p ) {
    return 0.5 - Math.cos( p * Math.PI ) / 2;
  }
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
  fxNow, timerId,
  rfxtypes = /^(?:toggle|show|hide)$/,
  rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
  rrun = /queueHooks$/,
  animationPrefilters = [ defaultPrefilter ],
  tweeners = {
    "*": [ function( prop, value ) {
      var tween = this.createTween( prop, value ),
        target = tween.cur(),
        parts = rfxnum.exec( value ),
        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

        // Starting value computation is required for potential unit mismatches
        start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
          rfxnum.exec( jQuery.css( tween.elem, prop ) ),
        scale = 1,
        maxIterations = 20;

      if ( start && start[ 3 ] !== unit ) {
        // Trust units reported by jQuery.css
        unit = unit || start[ 3 ];

        // Make sure we update the tween properties later on
        parts = parts || [];

        // Iteratively approximate from a nonzero starting point
        start = +target || 1;

        do {
          // If previous iteration zeroed out, double until we get *something*
          // Use a string for doubling factor so we don't accidentally see scale as unchanged below
          scale = scale || ".5";

          // Adjust and apply
          start = start / scale;
          jQuery.style( tween.elem, prop, start + unit );

        // Update scale, tolerating zero or NaN from tween.cur()
        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
      }

      // Update tween properties
      if ( parts ) {
        start = tween.start = +start || +target || 0;
        tween.unit = unit;
        // If a +=/-= token was provided, we're doing a relative animation
        tween.end = parts[ 1 ] ?
          start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
          +parts[ 2 ];
      }

      return tween;
    } ]
  };

// Animations created synchronously will run synchronously
function createFxNow() {
  setTimeout(function() {
    fxNow = undefined;
  });
  return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
  var which,
    attrs = { height: type },
    i = 0;

  // if we include width, step value is 1 to do all cssExpand values,
  // if we don't include width, step value is 2 to skip over Left and Right
  includeWidth = includeWidth ? 1 : 0;
  for ( ; i < 4 ; i += 2 - includeWidth ) {
    which = cssExpand[ i ];
    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  }

  if ( includeWidth ) {
    attrs.opacity = attrs.width = type;
  }

  return attrs;
}

function createTween( value, prop, animation ) {
  var tween,
    collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
    index = 0,
    length = collection.length;
  for ( ; index < length; index++ ) {
    if ( (tween = collection[ index ].call( animation, prop, value )) ) {

      // we're done with this property
      return tween;
    }
  }
}

function defaultPrefilter( elem, props, opts ) {
  /* jshint validthis: true */
  var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
    anim = this,
    orig = {},
    style = elem.style,
    hidden = elem.nodeType && isHidden( elem ),
    dataShow = jQuery._data( elem, "fxshow" );

  // handle queue: false promises
  if ( !opts.queue ) {
    hooks = jQuery._queueHooks( elem, "fx" );
    if ( hooks.unqueued == null ) {
      hooks.unqueued = 0;
      oldfire = hooks.empty.fire;
      hooks.empty.fire = function() {
        if ( !hooks.unqueued ) {
          oldfire();
        }
      };
    }
    hooks.unqueued++;

    anim.always(function() {
      // doing this makes sure that the complete handler will be called
      // before this completes
      anim.always(function() {
        hooks.unqueued--;
        if ( !jQuery.queue( elem, "fx" ).length ) {
          hooks.empty.fire();
        }
      });
    });
  }

  // height/width overflow pass
  if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
    // Make sure that nothing sneaks out
    // Record all 3 overflow attributes because IE does not
    // change the overflow attribute when overflowX and
    // overflowY are set to the same value
    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    // Set display property to inline-block for height/width
    // animations on inline elements that are having width/height animated
    display = jQuery.css( elem, "display" );
    dDisplay = defaultDisplay( elem.nodeName );
    if ( display === "none" ) {
      display = dDisplay;
    }
    if ( display === "inline" &&
        jQuery.css( elem, "float" ) === "none" ) {

      // inline-level elements accept inline-block;
      // block-level elements need to be inline with layout
      if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
        style.display = "inline-block";
      } else {
        style.zoom = 1;
      }
    }
  }

  if ( opts.overflow ) {
    style.overflow = "hidden";
    if ( !support.shrinkWrapBlocks() ) {
      anim.always(function() {
        style.overflow = opts.overflow[ 0 ];
        style.overflowX = opts.overflow[ 1 ];
        style.overflowY = opts.overflow[ 2 ];
      });
    }
  }

  // show/hide pass
  for ( prop in props ) {
    value = props[ prop ];
    if ( rfxtypes.exec( value ) ) {
      delete props[ prop ];
      toggle = toggle || value === "toggle";
      if ( value === ( hidden ? "hide" : "show" ) ) {

        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
          hidden = true;
        } else {
          continue;
        }
      }
      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
    }
  }

  if ( !jQuery.isEmptyObject( orig ) ) {
    if ( dataShow ) {
      if ( "hidden" in dataShow ) {
        hidden = dataShow.hidden;
      }
    } else {
      dataShow = jQuery._data( elem, "fxshow", {} );
    }

    // store state if its toggle - enables .stop().toggle() to "reverse"
    if ( toggle ) {
      dataShow.hidden = !hidden;
    }
    if ( hidden ) {
      jQuery( elem ).show();
    } else {
      anim.done(function() {
        jQuery( elem ).hide();
      });
    }
    anim.done(function() {
      var prop;
      jQuery._removeData( elem, "fxshow" );
      for ( prop in orig ) {
        jQuery.style( elem, prop, orig[ prop ] );
      }
    });
    for ( prop in orig ) {
      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

      if ( !( prop in dataShow ) ) {
        dataShow[ prop ] = tween.start;
        if ( hidden ) {
          tween.end = tween.start;
          tween.start = prop === "width" || prop === "height" ? 1 : 0;
        }
      }
    }
  }
}

function propFilter( props, specialEasing ) {
  var index, name, easing, value, hooks;

  // camelCase, specialEasing and expand cssHook pass
  for ( index in props ) {
    name = jQuery.camelCase( index );
    easing = specialEasing[ name ];
    value = props[ index ];
    if ( jQuery.isArray( value ) ) {
      easing = value[ 1 ];
      value = props[ index ] = value[ 0 ];
    }

    if ( index !== name ) {
      props[ name ] = value;
      delete props[ index ];
    }

    hooks = jQuery.cssHooks[ name ];
    if ( hooks && "expand" in hooks ) {
      value = hooks.expand( value );
      delete props[ name ];

      // not quite $.extend, this wont overwrite keys already present.
      // also - reusing 'index' from above because we have the correct "name"
      for ( index in value ) {
        if ( !( index in props ) ) {
          props[ index ] = value[ index ];
          specialEasing[ index ] = easing;
        }
      }
    } else {
      specialEasing[ name ] = easing;
    }
  }
}

function Animation( elem, properties, options ) {
  var result,
    stopped,
    index = 0,
    length = animationPrefilters.length,
    deferred = jQuery.Deferred().always( function() {
      // don't match elem in the :animated selector
      delete tick.elem;
    }),
    tick = function() {
      if ( stopped ) {
        return false;
      }
      var currentTime = fxNow || createFxNow(),
        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
        temp = remaining / animation.duration || 0,
        percent = 1 - temp,
        index = 0,
        length = animation.tweens.length;

      for ( ; index < length ; index++ ) {
        animation.tweens[ index ].run( percent );
      }

      deferred.notifyWith( elem, [ animation, percent, remaining ]);

      if ( percent < 1 && length ) {
        return remaining;
      } else {
        deferred.resolveWith( elem, [ animation ] );
        return false;
      }
    },
    animation = deferred.promise({
      elem: elem,
      props: jQuery.extend( {}, properties ),
      opts: jQuery.extend( true, { specialEasing: {} }, options ),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function( prop, end ) {
        var tween = jQuery.Tween( elem, animation.opts, prop, end,
            animation.opts.specialEasing[ prop ] || animation.opts.easing );
        animation.tweens.push( tween );
        return tween;
      },
      stop: function( gotoEnd ) {
        var index = 0,
          // if we are going to the end, we want to run all the tweens
          // otherwise we skip this part
          length = gotoEnd ? animation.tweens.length : 0;
        if ( stopped ) {
          return this;
        }
        stopped = true;
        for ( ; index < length ; index++ ) {
          animation.tweens[ index ].run( 1 );
        }

        // resolve when we played the last frame
        // otherwise, reject
        if ( gotoEnd ) {
          deferred.resolveWith( elem, [ animation, gotoEnd ] );
        } else {
          deferred.rejectWith( elem, [ animation, gotoEnd ] );
        }
        return this;
      }
    }),
    props = animation.props;

  propFilter( props, animation.opts.specialEasing );

  for ( ; index < length ; index++ ) {
    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
    if ( result ) {
      return result;
    }
  }

  jQuery.map( props, createTween, animation );

  if ( jQuery.isFunction( animation.opts.start ) ) {
    animation.opts.start.call( elem, animation );
  }

  jQuery.fx.timer(
    jQuery.extend( tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    })
  );

  // attach callbacks from options
  return animation.progress( animation.opts.progress )
    .done( animation.opts.done, animation.opts.complete )
    .fail( animation.opts.fail )
    .always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
  tweener: function( props, callback ) {
    if ( jQuery.isFunction( props ) ) {
      callback = props;
      props = [ "*" ];
    } else {
      props = props.split(" ");
    }

    var prop,
      index = 0,
      length = props.length;

    for ( ; index < length ; index++ ) {
      prop = props[ index ];
      tweeners[ prop ] = tweeners[ prop ] || [];
      tweeners[ prop ].unshift( callback );
    }
  },

  prefilter: function( callback, prepend ) {
    if ( prepend ) {
      animationPrefilters.unshift( callback );
    } else {
      animationPrefilters.push( callback );
    }
  }
});

jQuery.speed = function( speed, easing, fn ) {
  var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
    complete: fn || !fn && easing ||
      jQuery.isFunction( speed ) && speed,
    duration: speed,
    easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
  };

  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

  // normalize opt.queue - true/undefined/null -> "fx"
  if ( opt.queue == null || opt.queue === true ) {
    opt.queue = "fx";
  }

  // Queueing
  opt.old = opt.complete;

  opt.complete = function() {
    if ( jQuery.isFunction( opt.old ) ) {
      opt.old.call( this );
    }

    if ( opt.queue ) {
      jQuery.dequeue( this, opt.queue );
    }
  };

  return opt;
};

jQuery.fn.extend({
  fadeTo: function( speed, to, easing, callback ) {

    // show any hidden elements after setting opacity to 0
    return this.filter( isHidden ).css( "opacity", 0 ).show()

      // animate to the value specified
      .end().animate({ opacity: to }, speed, easing, callback );
  },
  animate: function( prop, speed, easing, callback ) {
    var empty = jQuery.isEmptyObject( prop ),
      optall = jQuery.speed( speed, easing, callback ),
      doAnimation = function() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation( this, jQuery.extend( {}, prop ), optall );

        // Empty animations, or finishing resolves immediately
        if ( empty || jQuery._data( this, "finish" ) ) {
          anim.stop( true );
        }
      };
      doAnimation.finish = doAnimation;

    return empty || optall.queue === false ?
      this.each( doAnimation ) :
      this.queue( optall.queue, doAnimation );
  },
  stop: function( type, clearQueue, gotoEnd ) {
    var stopQueue = function( hooks ) {
      var stop = hooks.stop;
      delete hooks.stop;
      stop( gotoEnd );
    };

    if ( typeof type !== "string" ) {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
    }
    if ( clearQueue && type !== false ) {
      this.queue( type || "fx", [] );
    }

    return this.each(function() {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = jQuery._data( this );

      if ( index ) {
        if ( data[ index ] && data[ index ].stop ) {
          stopQueue( data[ index ] );
        }
      } else {
        for ( index in data ) {
          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
            stopQueue( data[ index ] );
          }
        }
      }

      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
          timers[ index ].anim.stop( gotoEnd );
          dequeue = false;
          timers.splice( index, 1 );
        }
      }

      // start the next in the queue if the last step wasn't forced
      // timers currently will call their complete callbacks, which will dequeue
      // but only if they were gotoEnd
      if ( dequeue || !gotoEnd ) {
        jQuery.dequeue( this, type );
      }
    });
  },
  finish: function( type ) {
    if ( type !== false ) {
      type = type || "fx";
    }
    return this.each(function() {
      var index,
        data = jQuery._data( this ),
        queue = data[ type + "queue" ],
        hooks = data[ type + "queueHooks" ],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;

      // enable finishing flag on private data
      data.finish = true;

      // empty the queue first
      jQuery.queue( this, type, [] );

      if ( hooks && hooks.stop ) {
        hooks.stop.call( this, true );
      }

      // look for any active animations, and finish them
      for ( index = timers.length; index--; ) {
        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
          timers[ index ].anim.stop( true );
          timers.splice( index, 1 );
        }
      }

      // look for any animations in the old queue and finish them
      for ( index = 0; index < length; index++ ) {
        if ( queue[ index ] && queue[ index ].finish ) {
          queue[ index ].finish.call( this );
        }
      }

      // turn off finishing flag
      delete data.finish;
    });
  }
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
  var cssFn = jQuery.fn[ name ];
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return speed == null || typeof speed === "boolean" ?
      cssFn.apply( this, arguments ) :
      this.animate( genFx( name, true ), speed, easing, callback );
  };
});

// Generate shortcuts for custom animations
jQuery.each({
  slideDown: genFx("show"),
  slideUp: genFx("hide"),
  slideToggle: genFx("toggle"),
  fadeIn: { opacity: "show" },
  fadeOut: { opacity: "hide" },
  fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return this.animate( props, speed, easing, callback );
  };
});

jQuery.timers = [];
jQuery.fx.tick = function() {
  var timer,
    timers = jQuery.timers,
    i = 0;

  fxNow = jQuery.now();

  for ( ; i < timers.length; i++ ) {
    timer = timers[ i ];
    // Checks the timer has not already been removed
    if ( !timer() && timers[ i ] === timer ) {
      timers.splice( i--, 1 );
    }
  }

  if ( !timers.length ) {
    jQuery.fx.stop();
  }
  fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
  jQuery.timers.push( timer );
  if ( timer() ) {
    jQuery.fx.start();
  } else {
    jQuery.timers.pop();
  }
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
  if ( !timerId ) {
    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
  }
};

jQuery.fx.stop = function() {
  clearInterval( timerId );
  timerId = null;
};

jQuery.fx.speeds = {
  slow: 600,
  fast: 200,
  // Default speed
  _default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
  time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
  type = type || "fx";

  return this.queue( type, function( next, hooks ) {
    var timeout = setTimeout( next, time );
    hooks.stop = function() {
      clearTimeout( timeout );
    };
  });
};


(function() {
  var a, input, select, opt,
    div = document.createElement("div" );

  // Setup
  div.setAttribute( "className", "t" );
  div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
  a = div.getElementsByTagName("a")[ 0 ];

  // First batch of tests.
  select = document.createElement("select");
  opt = select.appendChild( document.createElement("option") );
  input = div.getElementsByTagName("input")[ 0 ];

  a.style.cssText = "top:1px";

  // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
  support.getSetAttribute = div.className !== "t";

  // Get the style information from getAttribute
  // (IE uses .cssText instead)
  support.style = /top/.test( a.getAttribute("style") );

  // Make sure that URLs aren't manipulated
  // (IE normalizes it by default)
  support.hrefNormalized = a.getAttribute("href") === "/a";

  // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
  support.checkOn = !!input.value;

  // Make sure that a selected-by-default option has a working selected property.
  // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
  support.optSelected = opt.selected;

  // Tests for enctype support on a form (#6743)
  support.enctype = !!document.createElement("form").enctype;

  // Make sure that the options inside disabled selects aren't marked as disabled
  // (WebKit marks them as disabled)
  select.disabled = true;
  support.optDisabled = !opt.disabled;

  // Support: IE8 only
  // Check if we can trust getAttribute("value")
  input = document.createElement( "input" );
  input.setAttribute( "value", "" );
  support.input = input.getAttribute( "value" ) === "";

  // Check if an input maintains its value after becoming a radio
  input.value = "t";
  input.setAttribute( "type", "radio" );
  support.radioValue = input.value === "t";

  // Null elements to avoid leaks in IE.
  a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
  val: function( value ) {
    var hooks, ret, isFunction,
      elem = this[0];

    if ( !arguments.length ) {
      if ( elem ) {
        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
          return ret;
        }

        ret = elem.value;

        return typeof ret === "string" ?
          // handle most common string cases
          ret.replace(rreturn, "") :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
      }

      return;
    }

    isFunction = jQuery.isFunction( value );

    return this.each(function( i ) {
      var val;

      if ( this.nodeType !== 1 ) {
        return;
      }

      if ( isFunction ) {
        val = value.call( this, i, jQuery( this ).val() );
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";
      } else if ( typeof val === "number" ) {
        val += "";
      } else if ( jQuery.isArray( val ) ) {
        val = jQuery.map( val, function( value ) {
          return value == null ? "" : value + "";
        });
      }

      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
        this.value = val;
      }
    });
  }
});

jQuery.extend({
  valHooks: {
    option: {
      get: function( elem ) {
        var val = jQuery.find.attr( elem, "value" );
        return val != null ?
          val :
          jQuery.text( elem );
      }
    },
    select: {
      get: function( elem ) {
        var value, option,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one" || index < 0,
          values = one ? null : [],
          max = one ? index + 1 : options.length,
          i = index < 0 ?
            max :
            one ? index : 0;

        // Loop through all the selected options
        for ( ; i < max; i++ ) {
          option = options[ i ];

          // oldIE doesn't update selected after form reset (#2551)
          if ( ( option.selected || i === index ) &&
              // Don't return options that are disabled or in a disabled optgroup
              ( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

            // Get the specific value for the option
            value = jQuery( option ).val();

            // We don't need an array for one selects
            if ( one ) {
              return value;
            }

            // Multi-Selects return an array
            values.push( value );
          }
        }

        return values;
      },

      set: function( elem, value ) {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray( value ),
          i = options.length;

        while ( i-- ) {
          option = options[ i ];

          if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

            // Support: IE6
            // When new option element is added to select box we need to
            // force reflow of newly added node in order to workaround delay
            // of initialization properties
            try {
              option.selected = optionSet = true;

            } catch ( _ ) {

              // Will be executed only in IE6
              option.scrollHeight;
            }

          } else {
            option.selected = false;
          }
        }

        // Force browsers to behave consistently when non-matching value is set
        if ( !optionSet ) {
          elem.selectedIndex = -1;
        }

        return options;
      }
    }
  }
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
  jQuery.valHooks[ this ] = {
    set: function( elem, value ) {
      if ( jQuery.isArray( value ) ) {
        return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
      }
    }
  };
  if ( !support.checkOn ) {
    jQuery.valHooks[ this ].get = function( elem ) {
      // Support: Webkit
      // "" is returned instead of "on" if a value isn't specified
      return elem.getAttribute("value") === null ? "on" : elem.value;
    };
  }
});




var nodeHook, boolHook,
  attrHandle = jQuery.expr.attrHandle,
  ruseDefault = /^(?:checked|selected)$/i,
  getSetAttribute = support.getSetAttribute,
  getSetInput = support.input;

jQuery.fn.extend({
  attr: function( name, value ) {
    return access( this, jQuery.attr, name, value, arguments.length > 1 );
  },

  removeAttr: function( name ) {
    return this.each(function() {
      jQuery.removeAttr( this, name );
    });
  }
});

jQuery.extend({
  attr: function( elem, name, value ) {
    var hooks, ret,
      nType = elem.nodeType;

    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    // Fallback to prop when attributes are not supported
    if ( typeof elem.getAttribute === strundefined ) {
      return jQuery.prop( elem, name, value );
    }

    // All attributes are lowercase
    // Grab necessary hook if one is defined
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
      name = name.toLowerCase();
      hooks = jQuery.attrHooks[ name ] ||
        ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
    }

    if ( value !== undefined ) {

      if ( value === null ) {
        jQuery.removeAttr( elem, name );

      } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
        return ret;

      } else {
        elem.setAttribute( name, value + "" );
        return value;
      }

    } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
      return ret;

    } else {
      ret = jQuery.find.attr( elem, name );

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ?
        undefined :
        ret;
    }
  },

  removeAttr: function( elem, value ) {
    var name, propName,
      i = 0,
      attrNames = value && value.match( rnotwhite );

    if ( attrNames && elem.nodeType === 1 ) {
      while ( (name = attrNames[i++]) ) {
        propName = jQuery.propFix[ name ] || name;

        // Boolean attributes get special treatment (#10870)
        if ( jQuery.expr.match.bool.test( name ) ) {
          // Set corresponding property to false
          if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
            elem[ propName ] = false;
          // Support: IE<9
          // Also clear defaultChecked/defaultSelected (if appropriate)
          } else {
            elem[ jQuery.camelCase( "default-" + name ) ] =
              elem[ propName ] = false;
          }

        // See #9699 for explanation of this approach (setting first, then removal)
        } else {
          jQuery.attr( elem, name, "" );
        }

        elem.removeAttribute( getSetAttribute ? name : propName );
      }
    }
  },

  attrHooks: {
    type: {
      set: function( elem, value ) {
        if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
          // Setting the type on a radio button after the value resets the value in IE6-9
          // Reset value to default in case type is set after value during creation
          var val = elem.value;
          elem.setAttribute( "type", value );
          if ( val ) {
            elem.value = val;
          }
          return value;
        }
      }
    }
  }
});

// Hook for boolean attributes
boolHook = {
  set: function( elem, value, name ) {
    if ( value === false ) {
      // Remove boolean attributes when set to false
      jQuery.removeAttr( elem, name );
    } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
      // IE<8 needs the *property* name
      elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

    // Use defaultChecked and defaultSelected for oldIE
    } else {
      elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
    }

    return name;
  }
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

  var getter = attrHandle[ name ] || jQuery.find.attr;

  attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
    function( elem, name, isXML ) {
      var ret, handle;
      if ( !isXML ) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[ name ];
        attrHandle[ name ] = ret;
        ret = getter( elem, name, isXML ) != null ?
          name.toLowerCase() :
          null;
        attrHandle[ name ] = handle;
      }
      return ret;
    } :
    function( elem, name, isXML ) {
      if ( !isXML ) {
        return elem[ jQuery.camelCase( "default-" + name ) ] ?
          name.toLowerCase() :
          null;
      }
    };
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
  jQuery.attrHooks.value = {
    set: function( elem, value, name ) {
      if ( jQuery.nodeName( elem, "input" ) ) {
        // Does not return so that setAttribute is also used
        elem.defaultValue = value;
      } else {
        // Use nodeHook if defined (#1954); otherwise setAttribute is fine
        return nodeHook && nodeHook.set( elem, value, name );
      }
    }
  };
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

  // Use this for any attribute in IE6/7
  // This fixes almost every IE6/7 issue
  nodeHook = {
    set: function( elem, value, name ) {
      // Set the existing or create a new attribute node
      var ret = elem.getAttributeNode( name );
      if ( !ret ) {
        elem.setAttributeNode(
          (ret = elem.ownerDocument.createAttribute( name ))
        );
      }

      ret.value = value += "";

      // Break association with cloned elements by also using setAttribute (#9646)
      if ( name === "value" || value === elem.getAttribute( name ) ) {
        return value;
      }
    }
  };

  // Some attributes are constructed with empty-string values when not defined
  attrHandle.id = attrHandle.name = attrHandle.coords =
    function( elem, name, isXML ) {
      var ret;
      if ( !isXML ) {
        return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
          ret.value :
          null;
      }
    };

  // Fixing value retrieval on a button requires this module
  jQuery.valHooks.button = {
    get: function( elem, name ) {
      var ret = elem.getAttributeNode( name );
      if ( ret && ret.specified ) {
        return ret.value;
      }
    },
    set: nodeHook.set
  };

  // Set contenteditable to false on removals(#10429)
  // Setting to empty string throws an error as an invalid value
  jQuery.attrHooks.contenteditable = {
    set: function( elem, value, name ) {
      nodeHook.set( elem, value === "" ? false : value, name );
    }
  };

  // Set width and height to auto instead of 0 on empty string( Bug #8150 )
  // This is for removals
  jQuery.each([ "width", "height" ], function( i, name ) {
    jQuery.attrHooks[ name ] = {
      set: function( elem, value ) {
        if ( value === "" ) {
          elem.setAttribute( name, "auto" );
          return value;
        }
      }
    };
  });
}

if ( !support.style ) {
  jQuery.attrHooks.style = {
    get: function( elem ) {
      // Return undefined in the case of empty string
      // Note: IE uppercases css property names, but if we were to .toLowerCase()
      // .cssText, that would destroy case senstitivity in URL's, like in "background"
      return elem.style.cssText || undefined;
    },
    set: function( elem, value ) {
      return ( elem.style.cssText = value + "" );
    }
  };
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
  rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
  prop: function( name, value ) {
    return access( this, jQuery.prop, name, value, arguments.length > 1 );
  },

  removeProp: function( name ) {
    name = jQuery.propFix[ name ] || name;
    return this.each(function() {
      // try/catch handles cases where IE balks (such as removing a property on window)
      try {
        this[ name ] = undefined;
        delete this[ name ];
      } catch( e ) {}
    });
  }
});

jQuery.extend({
  propFix: {
    "for": "htmlFor",
    "class": "className"
  },

  prop: function( elem, name, value ) {
    var ret, hooks, notxml,
      nType = elem.nodeType;

    // don't get/set properties on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
      return;
    }

    notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

    if ( notxml ) {
      // Fix name and attach hooks
      name = jQuery.propFix[ name ] || name;
      hooks = jQuery.propHooks[ name ];
    }

    if ( value !== undefined ) {
      return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
        ret :
        ( elem[ name ] = value );

    } else {
      return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
        ret :
        elem[ name ];
    }
  },

  propHooks: {
    tabIndex: {
      get: function( elem ) {
        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
        // Use proper attribute retrieval(#12072)
        var tabindex = jQuery.find.attr( elem, "tabindex" );

        return tabindex ?
          parseInt( tabindex, 10 ) :
          rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
            0 :
            -1;
      }
    }
  }
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
  // href/src property should get the full normalized URL (#10299/#12915)
  jQuery.each([ "href", "src" ], function( i, name ) {
    jQuery.propHooks[ name ] = {
      get: function( elem ) {
        return elem.getAttribute( name, 4 );
      }
    };
  });
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
  jQuery.propHooks.selected = {
    get: function( elem ) {
      var parent = elem.parentNode;

      if ( parent ) {
        parent.selectedIndex;

        // Make sure that it also works with optgroups, see #5701
        if ( parent.parentNode ) {
          parent.parentNode.selectedIndex;
        }
      }
      return null;
    }
  };
}

jQuery.each([
  "tabIndex",
  "readOnly",
  "maxLength",
  "cellSpacing",
  "cellPadding",
  "rowSpan",
  "colSpan",
  "useMap",
  "frameBorder",
  "contentEditable"
], function() {
  jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
  jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
  addClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = typeof value === "string" && value;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).addClass( value.call( this, j, this.className ) );
      });
    }

    if ( proceed ) {
      // The disjunction here is for better compressibility (see removeClass)
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          " "
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
              cur += clazz + " ";
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = jQuery.trim( cur );
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  removeClass: function( value ) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = arguments.length === 0 || typeof value === "string" && value;

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( j ) {
        jQuery( this ).removeClass( value.call( this, j, this.className ) );
      });
    }
    if ( proceed ) {
      classes = ( value || "" ).match( rnotwhite ) || [];

      for ( ; i < len; i++ ) {
        elem = this[ i ];
        // This expression is here for better compressibility (see addClass)
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ).replace( rclass, " " ) :
          ""
        );

        if ( cur ) {
          j = 0;
          while ( (clazz = classes[j++]) ) {
            // Remove *all* instances
            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
              cur = cur.replace( " " + clazz + " ", " " );
            }
          }

          // only assign if different to avoid unneeded rendering.
          finalValue = value ? jQuery.trim( cur ) : "";
          if ( elem.className !== finalValue ) {
            elem.className = finalValue;
          }
        }
      }
    }

    return this;
  },

  toggleClass: function( value, stateVal ) {
    var type = typeof value;

    if ( typeof stateVal === "boolean" && type === "string" ) {
      return stateVal ? this.addClass( value ) : this.removeClass( value );
    }

    if ( jQuery.isFunction( value ) ) {
      return this.each(function( i ) {
        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
      });
    }

    return this.each(function() {
      if ( type === "string" ) {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ),
          classNames = value.match( rnotwhite ) || [];

        while ( (className = classNames[ i++ ]) ) {
          // check each className given, space separated list
          if ( self.hasClass( className ) ) {
            self.removeClass( className );
          } else {
            self.addClass( className );
          }
        }

      // Toggle whole class name
      } else if ( type === strundefined || type === "boolean" ) {
        if ( this.className ) {
          // store className if set
          jQuery._data( this, "__className__", this.className );
        }

        // If the element has a class name or if we're passed "false",
        // then remove the whole classname (if there was one, the above saved it).
        // Otherwise bring back whatever was previously saved (if anything),
        // falling back to the empty string if nothing was stored.
        this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
      }
    });
  },

  hasClass: function( selector ) {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for ( ; i < l; i++ ) {
      if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
        return true;
      }
    }

    return false;
  }
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ) {
    return arguments.length > 0 ?
      this.on( name, null, data, fn ) :
      this.trigger( name );
  };
});

jQuery.fn.extend({
  hover: function( fnOver, fnOut ) {
    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
  },

  bind: function( types, data, fn ) {
    return this.on( types, null, data, fn );
  },
  unbind: function( types, fn ) {
    return this.off( types, null, fn );
  },

  delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn );
  },
  undelegate: function( selector, types, fn ) {
    // ( namespace ) or ( selector, types [, fn] )
    return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
  }
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
  // Attempt to parse using the native JSON parser first
  if ( window.JSON && window.JSON.parse ) {
    // Support: Android 2.3
    // Workaround failure to string-cast null input
    return window.JSON.parse( data + "" );
  }

  var requireNonComma,
    depth = null,
    str = jQuery.trim( data + "" );

  // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
  // after removing valid tokens
  return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

    // Force termination if we see a misplaced comma
    if ( requireNonComma && comma ) {
      depth = 0;
    }

    // Perform no more replacements after returning to outermost depth
    if ( depth === 0 ) {
      return token;
    }

    // Commas must not follow "[", "{", or ","
    requireNonComma = open || comma;

    // Determine new depth
    // array/object open ("[" or "{"): depth += true - false (increment)
    // array/object close ("]" or "}"): depth += false - true (decrement)
    // other cases ("," or primitive): depth += true - true (numeric cast)
    depth += !close - !open;

    // Remove this token
    return "";
  }) ) ?
    ( Function( "return " + str ) )() :
    jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
  var xml, tmp;
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  try {
    if ( window.DOMParser ) { // Standard
      tmp = new DOMParser();
      xml = tmp.parseFromString( data, "text/xml" );
    } else { // IE
      xml = new ActiveXObject( "Microsoft.XMLDOM" );
      xml.async = "false";
      xml.loadXML( data );
    }
  } catch( e ) {
    xml = undefined;
  }
  if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};


var
  // Document location
  ajaxLocParts,
  ajaxLocation,

  rhash = /#.*$/,
  rts = /([?&])_=[^&]*/,
  rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
  // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  rnoContent = /^(?:GET|HEAD)$/,
  rprotocol = /^\/\//,
  rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},

  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
  ajaxLocation = location.href;
} catch( e ) {
  // Use the href attribute of an A element
  // since IE will modify it given document.location
  ajaxLocation = document.createElement( "a" );
  ajaxLocation.href = "";
  ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ) {

    if ( typeof dataTypeExpression !== "string" ) {
      func = dataTypeExpression;
      dataTypeExpression = "*";
    }

    var dataType,
      i = 0,
      dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

    if ( jQuery.isFunction( func ) ) {
      // For each dataType in the dataTypeExpression
      while ( (dataType = dataTypes[i++]) ) {
        // Prepend if requested
        if ( dataType.charAt( 0 ) === "+" ) {
          dataType = dataType.slice( 1 ) || "*";
          (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

        // Otherwise append
        } else {
          (structure[ dataType ] = structure[ dataType ] || []).push( func );
        }
      }
    }
  };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

  var inspected = {},
    seekingTransport = ( structure === transports );

  function inspect( dataType ) {
    var selected;
    inspected[ dataType ] = true;
    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
      if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
        options.dataTypes.unshift( dataTypeOrTransport );
        inspect( dataTypeOrTransport );
        return false;
      } else if ( seekingTransport ) {
        return !( selected = dataTypeOrTransport );
      }
    });
    return selected;
  }

  return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
  var deep, key,
    flatOptions = jQuery.ajaxSettings.flatOptions || {};

  for ( key in src ) {
    if ( src[ key ] !== undefined ) {
      ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
    }
  }
  if ( deep ) {
    jQuery.extend( true, target, deep );
  }

  return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
  var firstDataType, ct, finalDataType, type,
    contents = s.contents,
    dataTypes = s.dataTypes;

  // Remove auto dataType and get content-type in the process
  while ( dataTypes[ 0 ] === "*" ) {
    dataTypes.shift();
    if ( ct === undefined ) {
      ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
    }
  }

  // Check if we're dealing with a known content-type
  if ( ct ) {
    for ( type in contents ) {
      if ( contents[ type ] && contents[ type ].test( ct ) ) {
        dataTypes.unshift( type );
        break;
      }
    }
  }

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ) {
    finalDataType = dataTypes[ 0 ];
  } else {
    // Try convertible dataTypes
    for ( type in responses ) {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
        finalDataType = type;
        break;
      }
      if ( !firstDataType ) {
        firstDataType = type;
      }
    }
    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  }

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ) {
    if ( finalDataType !== dataTypes[ 0 ] ) {
      dataTypes.unshift( finalDataType );
    }
    return responses[ finalDataType ];
  }
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
  var conv2, current, conv, tmp, prev,
    converters = {},
    // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice();

  // Create converters map with lowercased keys
  if ( dataTypes[ 1 ] ) {
    for ( conv in s.converters ) {
      converters[ conv.toLowerCase() ] = s.converters[ conv ];
    }
  }

  current = dataTypes.shift();

  // Convert to each sequential dataType
  while ( current ) {

    if ( s.responseFields[ current ] ) {
      jqXHR[ s.responseFields[ current ] ] = response;
    }

    // Apply the dataFilter if provided
    if ( !prev && isSuccess && s.dataFilter ) {
      response = s.dataFilter( response, s.dataType );
    }

    prev = current;
    current = dataTypes.shift();

    if ( current ) {

      // There's only work to do if current dataType is non-auto
      if ( current === "*" ) {

        current = prev;

      // Convert response if prev dataType is non-auto and differs from current
      } else if ( prev !== "*" && prev !== current ) {

        // Seek a direct converter
        conv = converters[ prev + " " + current ] || converters[ "* " + current ];

        // If none found, seek a pair
        if ( !conv ) {
          for ( conv2 in converters ) {

            // If conv2 outputs current
            tmp = conv2.split( " " );
            if ( tmp[ 1 ] === current ) {

              // If prev can be converted to accepted input
              conv = converters[ prev + " " + tmp[ 0 ] ] ||
                converters[ "* " + tmp[ 0 ] ];
              if ( conv ) {
                // Condense equivalence converters
                if ( conv === true ) {
                  conv = converters[ conv2 ];

                // Otherwise, insert the intermediate dataType
                } else if ( converters[ conv2 ] !== true ) {
                  current = tmp[ 0 ];
                  dataTypes.unshift( tmp[ 1 ] );
                }
                break;
              }
            }
          }
        }

        // Apply converter (if not an equivalence)
        if ( conv !== true ) {

          // Unless errors are allowed to bubble, catch and return them
          if ( conv && s[ "throws" ] ) {
            response = conv( response );
          } else {
            try {
              response = conv( response );
            } catch ( e ) {
              return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
            }
          }
        }
      }
    }
  }

  return { state: "success", data: response };
}

jQuery.extend({

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {},
  etag: {},

  ajaxSettings: {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    throws: false,
    traditional: false,
    headers: {},
    */

    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
    },

    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
    },

    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
    },

    // Data converters
    // Keys separate source (or catchall "*") and destination types with a single space
    converters: {

      // Convert anything to text
      "* text": String,

      // Text to html (true = no transformation)
      "text html": true,

      // Evaluate text as a json expression
      "text json": jQuery.parseJSON,

      // Parse text as xml
      "text xml": jQuery.parseXML
    },

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend)
    flatOptions: {
      url: true,
      context: true
    }
  },

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function( target, settings ) {
    return settings ?

      // Building a settings object
      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

      // Extending ajaxSettings
      ajaxExtend( jQuery.ajaxSettings, target );
  },

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  ajaxTransport: addToPrefiltersOrTransports( transports ),

  // Main method
  ajax: function( url, options ) {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ) {
      options = url;
      url = undefined;
    }

    // Force options to be an object
    options = options || {};

    var // Cross-domain detection vars
      parts,
      // Loop variable
      i,
      // URL without anti-cache param
      cacheURL,
      // Response headers as string
      responseHeadersString,
      // timeout handle
      timeoutTimer,

      // To know if global events are to be dispatched
      fireGlobals,

      transport,
      // Response headers
      responseHeaders,
      // Create the final options object
      s = jQuery.ajaxSetup( {}, options ),
      // Callbacks context
      callbackContext = s.context || s,
      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
        jQuery( callbackContext ) :
        jQuery.event,
      // Deferreds
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery.Callbacks("once memory"),
      // Status-dependent callbacks
      statusCode = s.statusCode || {},
      // Headers (they are sent all at once)
      requestHeaders = {},
      requestHeadersNames = {},
      // The jqXHR state
      state = 0,
      // Default abort message
      strAbort = "canceled",
      // Fake xhr
      jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader: function( key ) {
          var match;
          if ( state === 2 ) {
            if ( !responseHeaders ) {
              responseHeaders = {};
              while ( (match = rheaders.exec( responseHeadersString )) ) {
                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
              }
            }
            match = responseHeaders[ key.toLowerCase() ];
          }
          return match == null ? null : match;
        },

        // Raw string
        getAllResponseHeaders: function() {
          return state === 2 ? responseHeadersString : null;
        },

        // Caches the header
        setRequestHeader: function( name, value ) {
          var lname = name.toLowerCase();
          if ( !state ) {
            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
            requestHeaders[ name ] = value;
          }
          return this;
        },

        // Overrides response content-type header
        overrideMimeType: function( type ) {
          if ( !state ) {
            s.mimeType = type;
          }
          return this;
        },

        // Status-dependent callbacks
        statusCode: function( map ) {
          var code;
          if ( map ) {
            if ( state < 2 ) {
              for ( code in map ) {
                // Lazy-add the new callback in a way that preserves old ones
                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
              }
            } else {
              // Execute the appropriate callbacks
              jqXHR.always( map[ jqXHR.status ] );
            }
          }
          return this;
        },

        // Cancel the request
        abort: function( statusText ) {
          var finalText = statusText || strAbort;
          if ( transport ) {
            transport.abort( finalText );
          }
          done( 0, finalText );
          return this;
        }
      };

    // Attach deferreds
    deferred.promise( jqXHR ).complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    // Handle falsy url in the settings object (#10093: consistency with old signature)
    // We also use the url parameter if available
    s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

    // Alias method option to type as per ticket #12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

    // A cross-domain request is in order when we have a protocol:host:port mismatch
    if ( s.crossDomain == null ) {
      parts = rurl.exec( s.url.toLowerCase() );
      s.crossDomain = !!( parts &&
        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
      );
    }

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ) {
      s.data = jQuery.param( s.data, s.traditional );
    }

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    // If request was aborted inside a prefilter, stop there
    if ( state === 2 ) {
      return jqXHR;
    }

    // We can fire global events as of now if asked to
    fireGlobals = s.global;

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ) {
      jQuery.event.trigger("ajaxStart");
    }

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type );

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    cacheURL = s.url;

    // More options handling for requests with no content
    if ( !s.hasContent ) {

      // If data is available, append data to url
      if ( s.data ) {
        cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
        // #9682: remove data so that it's not used in an eventual retry
        delete s.data;
      }

      // Add anti-cache in url if needed
      if ( s.cache === false ) {
        s.url = rts.test( cacheURL ) ?

          // If there is already a '_' parameter, set its value
          cacheURL.replace( rts, "$1_=" + nonce++ ) :

          // Otherwise add one to the end
          cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
      }
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ) {
      if ( jQuery.lastModified[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
      }
      if ( jQuery.etag[ cacheURL ] ) {
        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
      }
    }

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
      jqXHR.setRequestHeader( "Content-Type", s.contentType );
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
        s.accepts[ "*" ]
    );

    // Check for headers option
    for ( i in s.headers ) {
      jqXHR.setRequestHeader( i, s.headers[ i ] );
    }

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
      // Abort if not done already and return
      return jqXHR.abort();
    }

    // aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    for ( i in { success: 1, error: 1, complete: 1 } ) {
      jqXHR[ i ]( s[ i ] );
    }

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    // If no transport, we auto-abort
    if ( !transport ) {
      done( -1, "No Transport" );
    } else {
      jqXHR.readyState = 1;

      // Send global event
      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
      }
      // Timeout
      if ( s.async && s.timeout > 0 ) {
        timeoutTimer = setTimeout(function() {
          jqXHR.abort("timeout");
        }, s.timeout );
      }

      try {
        state = 1;
        transport.send( requestHeaders, done );
      } catch ( e ) {
        // Propagate exception as error if not done
        if ( state < 2 ) {
          done( -1, e );
        // Simply rethrow otherwise
        } else {
          throw e;
        }
      }
    }

    // Callback for when everything is done
    function done( status, nativeStatusText, responses, headers ) {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;

      // Called once
      if ( state === 2 ) {
        return;
      }

      // State is "done" now
      state = 2;

      // Clear timeout if it exists
      if ( timeoutTimer ) {
        clearTimeout( timeoutTimer );
      }

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used)
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status > 0 ? 4 : 0;

      // Determine if successful
      isSuccess = status >= 200 && status < 300 || status === 304;

      // Get response data
      if ( responses ) {
        response = ajaxHandleResponses( s, jqXHR, responses );
      }

      // Convert no matter what (that way responseXXX fields are always set)
      response = ajaxConvert( s, response, jqXHR, isSuccess );

      // If successful, handle type chaining
      if ( isSuccess ) {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {
          modified = jqXHR.getResponseHeader("Last-Modified");
          if ( modified ) {
            jQuery.lastModified[ cacheURL ] = modified;
          }
          modified = jqXHR.getResponseHeader("etag");
          if ( modified ) {
            jQuery.etag[ cacheURL ] = modified;
          }
        }

        // if no content
        if ( status === 204 || s.type === "HEAD" ) {
          statusText = "nocontent";

        // if not modified
        } else if ( status === 304 ) {
          statusText = "notmodified";

        // If we have data, let's convert it
        } else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
        }
      } else {
        // We extract error from statusText
        // then normalize statusText and status for non-aborts
        error = statusText;
        if ( status || !statusText ) {
          statusText = "error";
          if ( status < 0 ) {
            status = 0;
          }
        }
      }

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = ( nativeStatusText || statusText ) + "";

      // Success/Error
      if ( isSuccess ) {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
      } else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
      }

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode );
      statusCode = undefined;

      if ( fireGlobals ) {
        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
          [ jqXHR, s, isSuccess ? success : error ] );
      }

      // Complete
      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
        // Handle the global AJAX counter
        if ( !( --jQuery.active ) ) {
          jQuery.event.trigger("ajaxStop");
        }
      }
    }

    return jqXHR;
  },

  getJSON: function( url, data, callback ) {
    return jQuery.get( url, data, callback, "json" );
  },

  getScript: function( url, callback ) {
    return jQuery.get( url, undefined, callback, "script" );
  }
});

jQuery.each( [ "get", "post" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
  jQuery.fn[ type ] = function( fn ) {
    return this.on( type, fn );
  };
});


jQuery._evalUrl = function( url ) {
  return jQuery.ajax({
    url: url,
    type: "GET",
    dataType: "script",
    async: false,
    global: false,
    "throws": true
  });
};


jQuery.fn.extend({
  wrapAll: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapAll( html.call(this, i) );
      });
    }

    if ( this[0] ) {
      // The elements to wrap the target around
      var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

      if ( this[0].parentNode ) {
        wrap.insertBefore( this[0] );
      }

      wrap.map(function() {
        var elem = this;

        while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
          elem = elem.firstChild;
        }

        return elem;
      }).append( this );
    }

    return this;
  },

  wrapInner: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapInner( html.call(this, i) );
      });
    }

    return this.each(function() {
      var self = jQuery( this ),
        contents = self.contents();

      if ( contents.length ) {
        contents.wrapAll( html );

      } else {
        self.append( html );
      }
    });
  },

  wrap: function( html ) {
    var isFunction = jQuery.isFunction( html );

    return this.each(function(i) {
      jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
    });
  },

  unwrap: function() {
    return this.parent().each(function() {
      if ( !jQuery.nodeName( this, "body" ) ) {
        jQuery( this ).replaceWith( this.childNodes );
      }
    }).end();
  }
});


jQuery.expr.filters.hidden = function( elem ) {
  // Support: Opera <= 12.12
  // Opera reports offsetWidths and offsetHeights less than zero on some elements
  return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
    (!support.reliableHiddenOffsets() &&
      ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
  return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
  var name;

  if ( jQuery.isArray( obj ) ) {
    // Serialize array item.
    jQuery.each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {
        // Treat each array item as a scalar.
        add( prefix, v );

      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
      }
    });

  } else if ( !traditional && jQuery.type( obj ) === "object" ) {
    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {
    // Serialize scalar item.
    add( prefix, obj );
  }
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
  var prefix,
    s = [],
    add = function( key, value ) {
      // If value is a function, invoke it and return its value
      value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
      s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    };

  // Set traditional to true for jQuery <= 1.3.2 behavior.
  if ( traditional === undefined ) {
    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
  }

  // If an array was passed in, assume that it is an array of form elements.
  if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
    // Serialize the form elements
    jQuery.each( a, function() {
      add( this.name, this.value );
    });

  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], traditional, add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
  serialize: function() {
    return jQuery.param( this.serializeArray() );
  },
  serializeArray: function() {
    return this.map(function() {
      // Can add propHook for "elements" to filter or add form elements
      var elements = jQuery.prop( this, "elements" );
      return elements ? jQuery.makeArray( elements ) : this;
    })
    .filter(function() {
      var type = this.type;
      // Use .is(":disabled") so that fieldset[disabled] works
      return this.name && !jQuery( this ).is( ":disabled" ) &&
        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
        ( this.checked || !rcheckableType.test( type ) );
    })
    .map(function( i, elem ) {
      var val = jQuery( this ).val();

      return val == null ?
        null :
        jQuery.isArray( val ) ?
          jQuery.map( val, function( val ) {
            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
          }) :
          { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    }).get();
  }
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
  // Support: IE6+
  function() {

    // XHR cannot access local files, always use ActiveX for that case
    return !this.isLocal &&

      // Support: IE7-8
      // oldIE XHR does not support non-RFC2616 methods (#13240)
      // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
      // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
      // Although this check for six methods instead of eight
      // since IE also does not support "trace" and "connect"
      /^(get|post|head|put|delete|options)$/i.test( this.type ) &&

      createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;

var xhrId = 0,
  xhrCallbacks = {},
  xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
  jQuery( window ).on( "unload", function() {
    for ( var key in xhrCallbacks ) {
      xhrCallbacks[ key ]( undefined, true );
    }
  });
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

  jQuery.ajaxTransport(function( options ) {
    // Cross domain only allowed if supported through XMLHttpRequest
    if ( !options.crossDomain || support.cors ) {

      var callback;

      return {
        send: function( headers, complete ) {
          var i,
            xhr = options.xhr(),
            id = ++xhrId;

          // Open the socket
          xhr.open( options.type, options.url, options.async, options.username, options.password );

          // Apply custom fields if provided
          if ( options.xhrFields ) {
            for ( i in options.xhrFields ) {
              xhr[ i ] = options.xhrFields[ i ];
            }
          }

          // Override mime type if needed
          if ( options.mimeType && xhr.overrideMimeType ) {
            xhr.overrideMimeType( options.mimeType );
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if ( !options.crossDomain && !headers["X-Requested-With"] ) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }

          // Set headers
          for ( i in headers ) {
            // Support: IE<9
            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
            // request header to a null-value.
            //
            // To keep consistent with other XHR implementations, cast the value
            // to string and ignore `undefined`.
            if ( headers[ i ] !== undefined ) {
              xhr.setRequestHeader( i, headers[ i ] + "" );
            }
          }

          // Do send the request
          // This may raise an exception which is actually
          // handled in jQuery.ajax (so no try/catch here)
          xhr.send( ( options.hasContent && options.data ) || null );

          // Listener
          callback = function( _, isAbort ) {
            var status, statusText, responses;

            // Was never called and is aborted or complete
            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
              // Clean up
              delete xhrCallbacks[ id ];
              callback = undefined;
              xhr.onreadystatechange = jQuery.noop;

              // Abort manually if needed
              if ( isAbort ) {
                if ( xhr.readyState !== 4 ) {
                  xhr.abort();
                }
              } else {
                responses = {};
                status = xhr.status;

                // Support: IE<10
                // Accessing binary-data responseText throws an exception
                // (#11426)
                if ( typeof xhr.responseText === "string" ) {
                  responses.text = xhr.responseText;
                }

                // Firefox throws an exception when accessing
                // statusText for faulty cross-domain requests
                try {
                  statusText = xhr.statusText;
                } catch( e ) {
                  // We normalize with Webkit giving an empty statusText
                  statusText = "";
                }

                // Filter status for non standard behaviors

                // If the request is local and we have data: assume a success
                // (success with no data won't get notified, that's the best we
                // can do given current implementations)
                if ( !status && options.isLocal && !options.crossDomain ) {
                  status = responses.text ? 200 : 404;
                // IE - #1450: sometimes returns 1223 when it should be 204
                } else if ( status === 1223 ) {
                  status = 204;
                }
              }
            }

            // Call complete if needed
            if ( responses ) {
              complete( status, statusText, responses, xhr.getAllResponseHeaders() );
            }
          };

          if ( !options.async ) {
            // if we're in sync mode we fire the callback
            callback();
          } else if ( xhr.readyState === 4 ) {
            // (IE6 & IE7) if it's in cache and has been
            // retrieved directly we need to fire the callback
            setTimeout( callback );
          } else {
            // Add to the list of active xhr callbacks
            xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
          }
        },

        abort: function() {
          if ( callback ) {
            callback( undefined, true );
          }
        }
      };
    }
  });
}

// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch( e ) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject( "Microsoft.XMLHTTP" );
  } catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
  accepts: {
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /(?:java|ecma)script/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
    s.global = false;
  }
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

  // This transport only deals with cross domain requests
  if ( s.crossDomain ) {

    var script,
      head = document.head || jQuery("head")[0] || document.documentElement;

    return {

      send: function( _, callback ) {

        script = document.createElement("script");

        script.async = true;

        if ( s.scriptCharset ) {
          script.charset = s.scriptCharset;
        }

        script.src = s.url;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function( _, isAbort ) {

          if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;

            // Remove the script
            if ( script.parentNode ) {
              script.parentNode.removeChild( script );
            }

            // Dereference the script
            script = null;

            // Callback if not abort
            if ( !isAbort ) {
              callback( 200, "success" );
            }
          }
        };

        // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
        // Use native DOM manipulation to avoid our domManip AJAX trickery
        head.insertBefore( script, head.firstChild );
      },

      abort: function() {
        if ( script ) {
          script.onload( undefined, true );
        }
      }
    };
  }
});




var oldCallbacks = [],
  rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
    var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
    this[ callback ] = true;
    return callback;
  }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
      "url" :
      typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
    );

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
      s.jsonpCallback() :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ) {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
    } else if ( s.jsonp !== false ) {
      s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
    }

    // Use data converter to retrieve json after script execution
    s.converters["script json"] = function() {
      if ( !responseContainer ) {
        jQuery.error( callbackName + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function() {
      responseContainer = arguments;
    };

    // Clean-up function (fires after converters)
    jqXHR.always(function() {
      // Restore preexisting value
      window[ callbackName ] = overwritten;

      // Save back as free
      if ( s[ callbackName ] ) {
        // make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // save the callback name for future use
        oldCallbacks.push( callbackName );
      }

      // Call if it was a function and we have a response
      if ( responseContainer && jQuery.isFunction( overwritten ) ) {
        overwritten( responseContainer[ 0 ] );
      }

      responseContainer = overwritten = undefined;
    });

    // Delegate to script
    return "script";
  }
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  if ( typeof context === "boolean" ) {
    keepScripts = context;
    context = false;
  }
  context = context || document;

  var parsed = rsingleTag.exec( data ),
    scripts = !keepScripts && [];

  // Single tag
  if ( parsed ) {
    return [ context.createElement( parsed[1] ) ];
  }

  parsed = jQuery.buildFragment( [ data ], context, scripts );

  if ( scripts && scripts.length ) {
    jQuery( scripts ).remove();
  }

  return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
  if ( typeof url !== "string" && _load ) {
    return _load.apply( this, arguments );
  }

  var selector, response, type,
    self = this,
    off = url.indexOf(" ");

  if ( off >= 0 ) {
    selector = url.slice( off, url.length );
    url = url.slice( 0, off );
  }

  // If it's a function
  if ( jQuery.isFunction( params ) ) {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  } else if ( params && typeof params === "object" ) {
    type = "POST";
  }

  // If we have elements to modify, make the request
  if ( self.length > 0 ) {
    jQuery.ajax({
      url: url,

      // if "type" variable is undefined, then "GET" method will be used
      type: type,
      dataType: "html",
      data: params
    }).done(function( responseText ) {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

        // Otherwise use the full result
        responseText );

    }).complete( callback && function( jqXHR, status ) {
      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
    });
  }

  return this;
};




jQuery.expr.filters.animated = function( elem ) {
  return jQuery.grep(jQuery.timers, function( fn ) {
    return elem === fn.elem;
  }).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
  return jQuery.isWindow( elem ) ?
    elem :
    elem.nodeType === 9 ?
      elem.defaultView || elem.parentWindow :
      false;
}

jQuery.offset = {
  setOffset: function( elem, options, i ) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css( elem, "position" ),
      curElem = jQuery( elem ),
      props = {};

    // set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
      elem.style.position = "relative";
    }

    curOffset = curElem.offset();
    curCSSTop = jQuery.css( elem, "top" );
    curCSSLeft = jQuery.css( elem, "left" );
    calculatePosition = ( position === "absolute" || position === "fixed" ) &&
      jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

    // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    if ( calculatePosition ) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left;
    } else {
      curTop = parseFloat( curCSSTop ) || 0;
      curLeft = parseFloat( curCSSLeft ) || 0;
    }

    if ( jQuery.isFunction( options ) ) {
      options = options.call( elem, i, curOffset );
    }

    if ( options.top != null ) {
      props.top = ( options.top - curOffset.top ) + curTop;
    }
    if ( options.left != null ) {
      props.left = ( options.left - curOffset.left ) + curLeft;
    }

    if ( "using" in options ) {
      options.using.call( elem, props );
    } else {
      curElem.css( props );
    }
  }
};

jQuery.fn.extend({
  offset: function( options ) {
    if ( arguments.length ) {
      return options === undefined ?
        this :
        this.each(function( i ) {
          jQuery.offset.setOffset( this, options, i );
        });
    }

    var docElem, win,
      box = { top: 0, left: 0 },
      elem = this[ 0 ],
      doc = elem && elem.ownerDocument;

    if ( !doc ) {
      return;
    }

    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if ( !jQuery.contains( docElem, elem ) ) {
      return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if ( typeof elem.getBoundingClientRect !== strundefined ) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow( doc );
    return {
      top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
      left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
  },

  position: function() {
    if ( !this[ 0 ] ) {
      return;
    }

    var offsetParent, offset,
      parentOffset = { top: 0, left: 0 },
      elem = this[ 0 ];

    // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
    if ( jQuery.css( elem, "position" ) === "fixed" ) {
      // we assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect();
    } else {
      // Get *real* offsetParent
      offsetParent = this.offsetParent();

      // Get correct offsets
      offset = this.offset();
      if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
        parentOffset = offsetParent.offset();
      }

      // Add offsetParent borders
      parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
      parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
    }

    // Subtract parent offsets and element margins
    // note: when an element has margin: auto the offsetLeft and marginLeft
    // are the same in Safari causing offset.left to incorrectly be 0
    return {
      top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
    };
  },

  offsetParent: function() {
    return this.map(function() {
      var offsetParent = this.offsetParent || docElem;

      while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docElem;
    });
  }
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
  var top = /Y/.test( prop );

  jQuery.fn[ method ] = function( val ) {
    return access( this, function( elem, method, val ) {
      var win = getWindow( elem );

      if ( val === undefined ) {
        return win ? (prop in win) ? win[ prop ] :
          win.document.documentElement[ method ] :
          elem[ method ];
      }

      if ( win ) {
        win.scrollTo(
          !top ? val : jQuery( win ).scrollLeft(),
          top ? val : jQuery( win ).scrollTop()
        );

      } else {
        elem[ method ] = val;
      }
    }, method, val, arguments.length, null );
  };
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
  jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
    function( elem, computed ) {
      if ( computed ) {
        computed = curCSS( elem, prop );
        // if curCSS returns percentage, fallback to offset
        return rnumnonpx.test( computed ) ?
          jQuery( elem ).position()[ prop ] + "px" :
          computed;
      }
    }
  );
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
  jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
    // margin is only for outerHeight, outerWidth
    jQuery.fn[ funcName ] = function( margin, value ) {
      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

      return access( this, function( elem, type, value ) {
        var doc;

        if ( jQuery.isWindow( elem ) ) {
          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
          // isn't a whole lot we can do. See pull request at this URL for discussion:
          // https://github.com/jquery/jquery/pull/764
          return elem.document.documentElement[ "client" + name ];
        }

        // Get document width or height
        if ( elem.nodeType === 9 ) {
          doc = elem.documentElement;

          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
          // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
          return Math.max(
            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
            elem.body[ "offset" + name ], doc[ "offset" + name ],
            doc[ "client" + name ]
          );
        }

        return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css( elem, type, extra ) :

          // Set width or height on the element
          jQuery.style( elem, type, value, extra );
      }, type, chainable ? margin : undefined, chainable, null );
    };
  });
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
  return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
  define( "jquery", [], function() {
    return jQuery;
  });
}




var
  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$;

jQuery.noConflict = function( deep ) {
  if ( window.$ === jQuery ) {
    window.$ = _$;
  }

  if ( deep && window.jQuery === jQuery ) {
    window.jQuery = _jQuery;
  }

  return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
  window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamFzb24vd3d3L2JhbHRpbW9yZW5vZGVzY2hvb2wuZ2l0aHViLmlvL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFzb24vd3d3L2JhbHRpbW9yZW5vZGVzY2hvb2wuZ2l0aHViLmlvL3NyYy9qcy9mYWtlXzNiZTU3Y2I3LmpzIiwiL1VzZXJzL2phc29uL3d3dy9iYWx0aW1vcmVub2Rlc2Nob29sLmdpdGh1Yi5pby9zcmMvanMvdmVuZG9yL2pxdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSByZXF1aXJlKFwiLi92ZW5kb3IvanF1ZXJ5XCIpO1xuXG52YXIgaXJjID0gJChcIi5pcmNcIik7XG52YXIgbGluZXMgPSBpcmMuY2hpbGRyZW4oXCJwXCIpO1xudmFyIGN1cnJlbnQgPSAwO1xuXG5saW5lcy5jc3MoXCJvcGFjaXR5XCIsIDApO1xuXG4vLyBmdW5jdGlvbiBuZXh0TGluZSgpIHtcbi8vIFx0dmFyIG5leHQgPSBsaW5lcy5nZXQobGluZSsrKTtcbi8vIFx0JChuZXh0KS5zaG93KCk7XG4vLyBcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuLy8gXHRcdG5leHRMaW5lKCk7XG4vLyBcdH0sIDE1MDApO1xuLy8gfVxuXG4vLyBuZXh0TGluZSgpO1xuXG5mdW5jdGlvbiBjaGVja0xpbmVzKG9mZnNldCwgaGVpZ2h0KSB7XG5cdHZhciB2aWV3cG9ydEJvdHRvbSA9IG9mZnNldCArIGhlaWdodDtcblx0bGluZXMuZWFjaChmdW5jdGlvbiAoaSwgbGluZSkge1xuXHRcdHZhciAkbGluZSA9ICQobGluZSk7XG5cdFx0dmFyIGVsQm90dG9tID0gJGxpbmUub2Zmc2V0KCkudG9wICsgJGxpbmUuaGVpZ2h0KCkgKyAxMDA7XG5cblx0XHRpZiAoZWxCb3R0b20gPCB2aWV3cG9ydEJvdHRvbSkge1xuXHRcdFx0JGxpbmUuY3NzKFwib3BhY2l0eVwiLCAxKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCd5ZXMgdG8gJyArIGkpO1xuXHRcdH1cblx0fSk7XG59XG5cbmNvbnNvbGUubG9nKCQobGluZXMuZ2V0KDApKS5vZmZzZXQoKS50b3ApO1xuXG4kKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKGUpIHtcblxuXHQvLyBjb25zb2xlLmxvZygkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkpO1xuXHRjaGVja0xpbmVzKCQod2luZG93KS5zY3JvbGxUb3AoKSwgJCh3aW5kb3cpLmhlaWdodCgpKTtcblxufSk7XG5cbi8vIGxpbmVzLmVhY2goZnVuY3Rpb24gKGksIGxpbmUpIHtcblxuLy8gXHRjb25zb2xlLmxvZyhpLCAkKGxpbmUpLm9mZnNldCgpLnRvcCk7XG5cbi8vIH0pOyIsIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2MS4xMS4wXG4gKiBodHRwOi8vanF1ZXJ5LmNvbS9cbiAqXG4gKiBJbmNsdWRlcyBTaXp6bGUuanNcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMDUsIDIwMTQgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNC0wMS0yM1QyMTowMlpcbiAqL1xuXG4oZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuICBpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuICAgIC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgd2luZG93IGlzIHByZXNlbnQsXG4gICAgLy8gZXhlY3V0ZSB0aGUgZmFjdG9yeSBhbmQgZ2V0IGpRdWVyeVxuICAgIC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaW5oZXJlbnRseSBwb3NzZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XG4gICAgLy8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGpRdWVyeS1tYWtpbmcgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0c1xuICAgIC8vIFRoaXMgYWNjZW50dWF0ZXMgdGhlIG5lZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIHJlYWwgd2luZG93XG4gICAgLy8gZS5nLiB2YXIgalF1ZXJ5ID0gcmVxdWlyZShcImpxdWVyeVwiKSh3aW5kb3cpO1xuICAgIC8vIFNlZSB0aWNrZXQgIzE0NTQ5IGZvciBtb3JlIGluZm9cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG4gICAgICBmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG4gICAgICBmdW5jdGlvbiggdyApIHtcbiAgICAgICAgaWYgKCAhdy5kb2N1bWVudCApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhY3RvcnkoIHcgKTtcbiAgICAgIH07XG4gIH0gZWxzZSB7XG4gICAgZmFjdG9yeSggZ2xvYmFsICk7XG4gIH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBDYW4ndCBkbyB0aGlzIGJlY2F1c2Ugc2V2ZXJhbCBhcHBzIGluY2x1ZGluZyBBU1AuTkVUIHRyYWNlXG4vLyB0aGUgc3RhY2sgdmlhIGFyZ3VtZW50cy5jYWxsZXIuY2FsbGVlIGFuZCBGaXJlZm94IGRpZXMgaWZcbi8vIHlvdSB0cnkgdG8gdHJhY2UgdGhyb3VnaCBcInVzZSBzdHJpY3RcIiBjYWxsIGNoYWlucy4gKCMxMzMzNSlcbi8vIFN1cHBvcnQ6IEZpcmVmb3ggMTgrXG4vL1xuXG52YXIgZGVsZXRlZElkcyA9IFtdO1xuXG52YXIgc2xpY2UgPSBkZWxldGVkSWRzLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gZGVsZXRlZElkcy5jb25jYXQ7XG5cbnZhciBwdXNoID0gZGVsZXRlZElkcy5wdXNoO1xuXG52YXIgaW5kZXhPZiA9IGRlbGV0ZWRJZHMuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciB0cmltID0gXCJcIi50cmltO1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxudmFyXG4gIHZlcnNpb24gPSBcIjEuMTEuMFwiLFxuXG4gIC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG4gIGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICAvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcbiAgICAvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuICAgIHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG4gIH0sXG5cbiAgLy8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQIChoZXJlJ3MgbG9va2luZyBhdCB5b3UsIFNhZmFyaSA1LjAgYW5kIElFKVxuICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuICAvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcbiAgcm1zUHJlZml4ID0gL14tbXMtLyxcbiAgcmRhc2hBbHBoYSA9IC8tKFtcXGRhLXpdKS9naSxcblxuICAvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG4gIGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XG4gICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICB9O1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuICAvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG4gIGpxdWVyeTogdmVyc2lvbixcblxuICBjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG4gIC8vIFN0YXJ0IHdpdGggYW4gZW1wdHkgc2VsZWN0b3JcbiAgc2VsZWN0b3I6IFwiXCIsXG5cbiAgLy8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXG4gIGxlbmd0aDogMCxcblxuICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuICB9LFxuXG4gIC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1JcbiAgLy8gR2V0IHRoZSB3aG9sZSBtYXRjaGVkIGVsZW1lbnQgc2V0IGFzIGEgY2xlYW4gYXJyYXlcbiAgZ2V0OiBmdW5jdGlvbiggbnVtICkge1xuICAgIHJldHVybiBudW0gIT0gbnVsbCA/XG5cbiAgICAgIC8vIFJldHVybiBhICdjbGVhbicgYXJyYXlcbiAgICAgICggbnVtIDwgMCA/IHRoaXNbIG51bSArIHRoaXMubGVuZ3RoIF0gOiB0aGlzWyBudW0gXSApIDpcblxuICAgICAgLy8gUmV0dXJuIGp1c3QgdGhlIG9iamVjdFxuICAgICAgc2xpY2UuY2FsbCggdGhpcyApO1xuICB9LFxuXG4gIC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcbiAgLy8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG4gIHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG4gICAgLy8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcbiAgICB2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cbiAgICAvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpcztcbiAgICByZXQuY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuICAgIC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuICAvLyAoWW91IGNhbiBzZWVkIHRoZSBhcmd1bWVudHMgd2l0aCBhbiBhcnJheSBvZiBhcmdzLCBidXQgdGhpcyBpc1xuICAvLyBvbmx5IHVzZWQgaW50ZXJuYWxseS4pXG4gIGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjaywgYXJncyApIHtcbiAgICByZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrLCBhcmdzICk7XG4gIH0sXG5cbiAgbWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoIGVsZW0sIGksIGVsZW0gKTtcbiAgICB9KSk7XG4gIH0sXG5cbiAgc2xpY2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG4gIH0sXG5cbiAgZmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVxKCAwICk7XG4gIH0sXG5cbiAgbGFzdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXEoIC0xICk7XG4gIH0sXG5cbiAgZXE6IGZ1bmN0aW9uKCBpICkge1xuICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcbiAgICAgIGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1tqXSBdIDogW10gKTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcihudWxsKTtcbiAgfSxcblxuICAvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gIC8vIEJlaGF2ZXMgbGlrZSBhbiBBcnJheSdzIG1ldGhvZCwgbm90IGxpa2UgYSBqUXVlcnkgbWV0aG9kLlxuICBwdXNoOiBwdXNoLFxuICBzb3J0OiBkZWxldGVkSWRzLnNvcnQsXG4gIHNwbGljZTogZGVsZXRlZElkcy5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzcmMsIGNvcHlJc0FycmF5LCBjb3B5LCBuYW1lLCBvcHRpb25zLCBjbG9uZSxcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG4gICAgaSA9IDEsXG4gICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICBkZWVwID0gZmFsc2U7XG5cbiAgLy8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuICBpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuICAgIGRlZXAgPSB0YXJnZXQ7XG5cbiAgICAvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG4gICAgaSsrO1xuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG4gIGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24odGFyZ2V0KSApIHtcbiAgICB0YXJnZXQgPSB7fTtcbiAgfVxuXG4gIC8vIGV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuICBpZiAoIGkgPT09IGxlbmd0aCApIHtcbiAgICB0YXJnZXQgPSB0aGlzO1xuICAgIGktLTtcbiAgfVxuXG4gIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgIC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcbiAgICBpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG4gICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG4gICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuICAgICAgICBjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG4gICAgICAgIC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3BcbiAgICAgICAgaWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcbiAgICAgICAgaWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheShjb3B5KSkgKSApIHtcbiAgICAgICAgICBpZiAoIGNvcHlJc0FycmF5ICkge1xuICAgICAgICAgICAgY29weUlzQXJyYXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGpRdWVyeS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG4gICAgICAgICAgdGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG4gICAgICAgIC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgfSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gY29weTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgLy8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG4gIGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cbiAgLy8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcbiAgaXNSZWFkeTogdHJ1ZSxcblxuICBlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuICB9LFxuXG4gIG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cbiAgLy8gU2VlIHRlc3QvdW5pdC9jb3JlLmpzIGZvciBkZXRhaWxzIGNvbmNlcm5pbmcgaXNGdW5jdGlvbi5cbiAgLy8gU2luY2UgdmVyc2lvbiAxLjMsIERPTSBtZXRob2RzIGFuZCBmdW5jdGlvbnMgbGlrZSBhbGVydFxuICAvLyBhcmVuJ3Qgc3VwcG9ydGVkLiBUaGV5IHJldHVybiBmYWxzZSBvbiBJRSAoIzI5NjgpLlxuICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuICAgIHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImZ1bmN0aW9uXCI7XG4gIH0sXG5cbiAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiggb2JqICkge1xuICAgIHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImFycmF5XCI7XG4gIH0sXG5cbiAgaXNXaW5kb3c6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XG4gIH0sXG5cbiAgaXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuICAgIC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChudWxsfHRydWV8ZmFsc2V8XCJcIilcbiAgICAvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG4gICAgLy8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG4gICAgcmV0dXJuIG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApID49IDA7XG4gIH0sXG5cbiAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcbiAgICB2YXIgbmFtZTtcbiAgICBmb3IgKCBuYW1lIGluIG9iaiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgaXNQbGFpbk9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcbiAgICB2YXIga2V5O1xuXG4gICAgLy8gTXVzdCBiZSBhbiBPYmplY3QuXG4gICAgLy8gQmVjYXVzZSBvZiBJRSwgd2UgYWxzbyBoYXZlIHRvIGNoZWNrIHRoZSBwcmVzZW5jZSBvZiB0aGUgY29uc3RydWN0b3IgcHJvcGVydHkuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgRE9NIG5vZGVzIGFuZCB3aW5kb3cgb2JqZWN0cyBkb24ndCBwYXNzIHRocm91Z2gsIGFzIHdlbGxcbiAgICBpZiAoICFvYmogfHwgalF1ZXJ5LnR5cGUob2JqKSAhPT0gXCJvYmplY3RcIiB8fCBvYmoubm9kZVR5cGUgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuICAgICAgaWYgKCBvYmouY29uc3RydWN0b3IgJiZcbiAgICAgICAgIWhhc093bi5jYWxsKG9iaiwgXCJjb25zdHJ1Y3RvclwiKSAmJlxuICAgICAgICAhaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgXCJpc1Byb3RvdHlwZU9mXCIpICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAvLyBJRTgsOSBXaWxsIHRocm93IGV4Y2VwdGlvbnMgb24gY2VydGFpbiBob3N0IG9iamVjdHMgIzk4OTdcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgLy8gSGFuZGxlIGl0ZXJhdGlvbiBvdmVyIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy5cbiAgICBpZiAoIHN1cHBvcnQub3duTGFzdCApIHtcbiAgICAgIGZvciAoIGtleSBpbiBvYmogKSB7XG4gICAgICAgIHJldHVybiBoYXNPd24uY2FsbCggb2JqLCBrZXkgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcbiAgICAvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cbiAgICBmb3IgKCBrZXkgaW4gb2JqICkge31cblxuICAgIHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCB8fCBoYXNPd24uY2FsbCggb2JqLCBrZXkgKTtcbiAgfSxcblxuICB0eXBlOiBmdW5jdGlvbiggb2JqICkge1xuICAgIGlmICggb2JqID09IG51bGwgKSB7XG4gICAgICByZXR1cm4gb2JqICsgXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cbiAgICAgIGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwob2JqKSBdIHx8IFwib2JqZWN0XCIgOlxuICAgICAgdHlwZW9mIG9iajtcbiAgfSxcblxuICAvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuICAvLyBXb3JrYXJvdW5kcyBiYXNlZCBvbiBmaW5kaW5ncyBieSBKaW0gRHJpc2NvbGxcbiAgLy8gaHR0cDovL3dlYmxvZ3MuamF2YS5uZXQvYmxvZy9kcmlzY29sbC9hcmNoaXZlLzIwMDkvMDkvMDgvZXZhbC1qYXZhc2NyaXB0LWdsb2JhbC1jb250ZXh0XG4gIGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBkYXRhICkge1xuICAgIGlmICggZGF0YSAmJiBqUXVlcnkudHJpbSggZGF0YSApICkge1xuICAgICAgLy8gV2UgdXNlIGV4ZWNTY3JpcHQgb24gSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAgIC8vIFdlIHVzZSBhbiBhbm9ueW1vdXMgZnVuY3Rpb24gc28gdGhhdCBjb250ZXh0IGlzIHdpbmRvd1xuICAgICAgLy8gcmF0aGVyIHRoYW4galF1ZXJ5IGluIEZpcmVmb3hcbiAgICAgICggd2luZG93LmV4ZWNTY3JpcHQgfHwgZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIHdpbmRvd1sgXCJldmFsXCIgXS5jYWxsKCB3aW5kb3csIGRhdGEgKTtcbiAgICAgIH0gKSggZGF0YSApO1xuICAgIH1cbiAgfSxcblxuICAvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG4gIC8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3MilcbiAgY2FtZWxDYXNlOiBmdW5jdGlvbiggc3RyaW5nICkge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xuICB9LFxuXG4gIG5vZGVOYW1lOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfSxcblxuICAvLyBhcmdzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG4gIGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrLCBhcmdzICkge1xuICAgIHZhciB2YWx1ZSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuZ3RoID0gb2JqLmxlbmd0aCxcbiAgICAgIGlzQXJyYXkgPSBpc0FycmF5bGlrZSggb2JqICk7XG5cbiAgICBpZiAoIGFyZ3MgKSB7XG4gICAgICBpZiAoIGlzQXJyYXkgKSB7XG4gICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkoIG9ialsgaSBdLCBhcmdzICk7XG5cbiAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICggaSBpbiBvYmogKSB7XG4gICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5hcHBseSggb2JqWyBpIF0sIGFyZ3MgKTtcblxuICAgICAgICAgIGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAvLyBBIHNwZWNpYWwsIGZhc3QsIGNhc2UgZm9yIHRoZSBtb3N0IGNvbW1vbiB1c2Ugb2YgZWFjaFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIGlzQXJyYXkgKSB7XG4gICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICk7XG5cbiAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICggaSBpbiBvYmogKSB7XG4gICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKTtcblxuICAgICAgICAgIGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfSxcblxuICAvLyBVc2UgbmF0aXZlIFN0cmluZy50cmltIGZ1bmN0aW9uIHdoZXJldmVyIHBvc3NpYmxlXG4gIHRyaW06IHRyaW0gJiYgIXRyaW0uY2FsbChcIlxcdUZFRkZcXHhBMFwiKSA/XG4gICAgZnVuY3Rpb24oIHRleHQgKSB7XG4gICAgICByZXR1cm4gdGV4dCA9PSBudWxsID9cbiAgICAgICAgXCJcIiA6XG4gICAgICAgIHRyaW0uY2FsbCggdGV4dCApO1xuICAgIH0gOlxuXG4gICAgLy8gT3RoZXJ3aXNlIHVzZSBvdXIgb3duIHRyaW1taW5nIGZ1bmN0aW9uYWxpdHlcbiAgICBmdW5jdGlvbiggdGV4dCApIHtcbiAgICAgIHJldHVybiB0ZXh0ID09IG51bGwgP1xuICAgICAgICBcIlwiIDpcbiAgICAgICAgKCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG4gICAgfSxcblxuICAvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG4gIG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcbiAgICB2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuICAgIGlmICggYXJyICE9IG51bGwgKSB7XG4gICAgICBpZiAoIGlzQXJyYXlsaWtlKCBPYmplY3QoYXJyKSApICkge1xuICAgICAgICBqUXVlcnkubWVyZ2UoIHJldCxcbiAgICAgICAgICB0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cbiAgICAgICAgICBbIGFyciBdIDogYXJyXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwdXNoLmNhbGwoIHJldCwgYXJyICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuICAgIHZhciBsZW47XG5cbiAgICBpZiAoIGFyciApIHtcbiAgICAgIGlmICggaW5kZXhPZiApIHtcbiAgICAgICAgcmV0dXJuIGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG4gICAgICB9XG5cbiAgICAgIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgICBpID0gaSA/IGkgPCAwID8gTWF0aC5tYXgoIDAsIGxlbiArIGkgKSA6IGkgOiAwO1xuXG4gICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgLy8gU2tpcCBhY2Nlc3NpbmcgaW4gc3BhcnNlIGFycmF5c1xuICAgICAgICBpZiAoIGkgaW4gYXJyICYmIGFyclsgaSBdID09PSBlbGVtICkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9LFxuXG4gIG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcbiAgICB2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG4gICAgICBqID0gMCxcbiAgICAgIGkgPSBmaXJzdC5sZW5ndGg7XG5cbiAgICB3aGlsZSAoIGogPCBsZW4gKSB7XG4gICAgICBmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGorKyBdO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBXb3JrYXJvdW5kIGNhc3Rpbmcgb2YgLmxlbmd0aCB0byBOYU4gb24gb3RoZXJ3aXNlIGFycmF5bGlrZSBvYmplY3RzIChlLmcuLCBOb2RlTGlzdHMpXG4gICAgaWYgKCBsZW4gIT09IGxlbiApIHtcbiAgICAgIHdoaWxlICggc2Vjb25kW2pdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaisrIF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmlyc3QubGVuZ3RoID0gaTtcblxuICAgIHJldHVybiBmaXJzdDtcbiAgfSxcblxuICBncmVwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBpbnZlcnQgKSB7XG4gICAgdmFyIGNhbGxiYWNrSW52ZXJzZSxcbiAgICAgIG1hdGNoZXMgPSBbXSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgICAgY2FsbGJhY2tFeHBlY3QgPSAhaW52ZXJ0O1xuXG4gICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuICAgIC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBjYWxsYmFja0ludmVyc2UgPSAhY2FsbGJhY2soIGVsZW1zWyBpIF0sIGkgKTtcbiAgICAgIGlmICggY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCApIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH0sXG5cbiAgLy8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG4gIG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuICAgIHZhciB2YWx1ZSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgICAgaXNBcnJheSA9IGlzQXJyYXlsaWtlKCBlbGVtcyApLFxuICAgICAgcmV0ID0gW107XG5cbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuICAgIGlmICggaXNBcnJheSApIHtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuICAgICAgICBpZiAoIHZhbHVlICE9IG51bGwgKSB7XG4gICAgICAgICAgcmV0LnB1c2goIHZhbHVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoIGkgaW4gZWxlbXMgKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG4gICAgICAgIGlmICggdmFsdWUgIT0gbnVsbCApIHtcbiAgICAgICAgICByZXQucHVzaCggdmFsdWUgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcbiAgICByZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG4gIH0sXG5cbiAgLy8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG4gIGd1aWQ6IDEsXG5cbiAgLy8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG4gIC8vIGFyZ3VtZW50cy5cbiAgcHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcbiAgICB2YXIgYXJncywgcHJveHksIHRtcDtcblxuICAgIGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICB0bXAgPSBmblsgY29udGV4dCBdO1xuICAgICAgY29udGV4dCA9IGZuO1xuICAgICAgZm4gPSB0bXA7XG4gICAgfVxuXG4gICAgLy8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcbiAgICAvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuICAgIGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBTaW11bGF0ZWQgYmluZFxuICAgIGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDIgKTtcbiAgICBwcm94eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KCBjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KCBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSApICk7XG4gICAgfTtcblxuICAgIC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuICAgIHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xuXG4gICAgcmV0dXJuIHByb3h5O1xuICB9LFxuXG4gIG5vdzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICsoIG5ldyBEYXRlKCkgKTtcbiAgfSxcblxuICAvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcbiAgLy8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cbiAgc3VwcG9ydDogc3VwcG9ydFxufSk7XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlsaWtlKCBvYmogKSB7XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoLFxuICAgIHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cbiAgaWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIG9iai5ub2RlVHlwZSA9PT0gMSAmJiBsZW5ndGggKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuICAgIHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjEuMTAuMTZcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMTMgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNC0wMS0xM1xuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG4gIHN1cHBvcnQsXG4gIEV4cHIsXG4gIGdldFRleHQsXG4gIGlzWE1MLFxuICBjb21waWxlLFxuICBvdXRlcm1vc3RDb250ZXh0LFxuICBzb3J0SW5wdXQsXG4gIGhhc0R1cGxpY2F0ZSxcblxuICAvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG4gIHNldERvY3VtZW50LFxuICBkb2N1bWVudCxcbiAgZG9jRWxlbSxcbiAgZG9jdW1lbnRJc0hUTUwsXG4gIHJidWdneVFTQSxcbiAgcmJ1Z2d5TWF0Y2hlcyxcbiAgbWF0Y2hlcyxcbiAgY29udGFpbnMsXG5cbiAgLy8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuICBleHBhbmRvID0gXCJzaXp6bGVcIiArIC0obmV3IERhdGUoKSksXG4gIHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcbiAgZGlycnVucyA9IDAsXG4gIGRvbmUgPSAwLFxuICBjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcbiAgdG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG4gIGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuICBzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgICBpZiAoIGEgPT09IGIgKSB7XG4gICAgICBoYXNEdXBsaWNhdGUgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfSxcblxuICAvLyBHZW5lcmFsLXB1cnBvc2UgY29uc3RhbnRzXG4gIHN0cnVuZGVmaW5lZCA9IHR5cGVvZiB1bmRlZmluZWQsXG4gIE1BWF9ORUdBVElWRSA9IDEgPDwgMzEsXG5cbiAgLy8gSW5zdGFuY2UgbWV0aG9kc1xuICBoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuICBhcnIgPSBbXSxcbiAgcG9wID0gYXJyLnBvcCxcbiAgcHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcbiAgcHVzaCA9IGFyci5wdXNoLFxuICBzbGljZSA9IGFyci5zbGljZSxcbiAgLy8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGlmIHdlIGNhbid0IHVzZSBhIG5hdGl2ZSBvbmVcbiAgaW5kZXhPZiA9IGFyci5pbmRleE9mIHx8IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBpID0gMCxcbiAgICAgIGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgaWYgKCB0aGlzW2ldID09PSBlbGVtICkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuXG4gIGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG4gIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuICAvLyBXaGl0ZXNwYWNlIGNoYXJhY3RlcnMgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2VcbiAgd2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zeW50YXgvI2NoYXJhY3RlcnNcbiAgY2hhcmFjdGVyRW5jb2RpbmcgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcXFx4MDAtXFxcXHhhMF0pK1wiLFxuXG4gIC8vIExvb3NlbHkgbW9kZWxlZCBvbiBDU1MgaWRlbnRpZmllciBjaGFyYWN0ZXJzXG4gIC8vIEFuIHVucXVvdGVkIHZhbHVlIHNob3VsZCBiZSBhIENTUyBpZGVudGlmaWVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG4gIC8vIFByb3BlciBzeW50YXg6IGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuICBpZGVudGlmaWVyID0gY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZSggXCJ3XCIsIFwidyNcIiApLFxuXG4gIC8vIEFjY2VwdGFibGUgb3BlcmF0b3JzIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuICBhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKyB3aGl0ZXNwYWNlICtcbiAgICBcIiooPzooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfChcIiArIGlkZW50aWZpZXIgKyBcIil8KXwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIixcblxuICAvLyBQcmVmZXIgYXJndW1lbnRzIHF1b3RlZCxcbiAgLy8gICB0aGVuIG5vdCBjb250YWluaW5nIHBzZXVkb3MvYnJhY2tldHMsXG4gIC8vICAgdGhlbiBhdHRyaWJ1dGUgc2VsZWN0b3JzL25vbi1wYXJlbnRoZXRpY2FsIGV4cHJlc3Npb25zLFxuICAvLyAgIHRoZW4gYW55dGhpbmcgZWxzZVxuICAvLyBUaGVzZSBwcmVmZXJlbmNlcyBhcmUgaGVyZSB0byByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnNcbiAgLy8gICBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBQU0VVRE8gcHJlRmlsdGVyXG4gIHBzZXVkb3MgPSBcIjooXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKSg/OlxcXFwoKChbJ1xcXCJdKSgoPzpcXFxcXFxcXC58W15cXFxcXFxcXF0pKj8pXFxcXDN8KCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiICsgYXR0cmlidXRlcy5yZXBsYWNlKCAzLCA4ICkgKyBcIikqKXwuKilcXFxcKXwpXCIsXG5cbiAgLy8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuICBydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cbiAgcmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG4gIHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG4gIHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cbiAgcnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcbiAgcmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG4gIG1hdGNoRXhwciA9IHtcbiAgICBcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVwiICksXG4gICAgXCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcbiAgICBcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZy5yZXBsYWNlKCBcIndcIiwgXCJ3KlwiICkgKyBcIilcIiApLFxuICAgIFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcbiAgICBcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcbiAgICBcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuICAgICAgXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcbiAgICAgIFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuICAgIFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuICAgIC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuICAgIC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcbiAgICBcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuICAgICAgd2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG4gIH0sXG5cbiAgcmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG4gIHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cbiAgcm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cbiAgLy8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG4gIHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuICByc2libGluZyA9IC9bK35dLyxcbiAgcmVzY2FwZSA9IC8nfFxcXFwvZyxcblxuICAvLyBDU1MgZXNjYXBlcyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG4gIHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG4gIGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcbiAgICB2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuICAgIC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG4gICAgLy8gU3VwcG9ydDogRmlyZWZveFxuICAgIC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuICAgIHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cbiAgICAgIGVzY2FwZWQgOlxuICAgICAgaGlnaCA8IDAgP1xuICAgICAgICAvLyBCTVAgY29kZXBvaW50XG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuICAgICAgICAvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG4gIH07XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuICBwdXNoLmFwcGx5KFxuICAgIChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcbiAgICBwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuICApO1xuICAvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuICAvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG4gIGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcbiAgcHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG4gICAgLy8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcbiAgICBmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG4gICAgICBwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcbiAgICB9IDpcblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG4gICAgZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuICAgICAgdmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuICAgICAgICBpID0gMDtcbiAgICAgIC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuICAgICAgd2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuICAgICAgdGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcbiAgdmFyIG1hdGNoLCBlbGVtLCBtLCBub2RlVHlwZSxcbiAgICAvLyBRU0EgdmFyc1xuICAgIGksIGdyb3Vwcywgb2xkLCBuaWQsIG5ld0NvbnRleHQsIG5ld1NlbGVjdG9yO1xuXG4gIGlmICggKCBjb250ZXh0ID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBwcmVmZXJyZWREb2MgKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcbiAgfVxuXG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuICBpZiAoICFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBpZiAoIChub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGUpICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICggZG9jdW1lbnRJc0hUTUwgJiYgIXNlZWQgKSB7XG5cbiAgICAvLyBTaG9ydGN1dHNcbiAgICBpZiAoIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XG4gICAgICAvLyBTcGVlZC11cDogU2l6emxlKFwiI0lEXCIpXG4gICAgICBpZiAoIChtID0gbWF0Y2hbMV0pICkge1xuICAgICAgICBpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICAgIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICk7XG4gICAgICAgICAgLy8gQ2hlY2sgcGFyZW50Tm9kZSB0byBjYXRjaCB3aGVuIEJsYWNrYmVycnkgNC42IHJldHVybnNcbiAgICAgICAgICAvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50IChqUXVlcnkgIzY5NjMpXG4gICAgICAgICAgaWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSBJRSwgT3BlcmEsIGFuZCBXZWJraXQgcmV0dXJuIGl0ZW1zXG4gICAgICAgICAgICAvLyBieSBuYW1lIGluc3RlYWQgb2YgSURcbiAgICAgICAgICAgIGlmICggZWxlbS5pZCA9PT0gbSApIHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ29udGV4dCBpcyBub3QgYSBkb2N1bWVudFxuICAgICAgICAgIGlmICggY29udGV4dC5vd25lckRvY3VtZW50ICYmIChlbGVtID0gY29udGV4dC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXG4gICAgICAgICAgICBjb250YWlucyggY29udGV4dCwgZWxlbSApICYmIGVsZW0uaWQgPT09IG0gKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvLyBTcGVlZC11cDogU2l6emxlKFwiVEFHXCIpXG4gICAgICB9IGVsc2UgaWYgKCBtYXRjaFsyXSApIHtcbiAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIi5DTEFTU1wiKVxuICAgICAgfSBlbHNlIGlmICggKG0gPSBtYXRjaFszXSkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcbiAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUVNBIHBhdGhcbiAgICBpZiAoIHN1cHBvcnQucXNhICYmICghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XG4gICAgICBuaWQgPSBvbGQgPSBleHBhbmRvO1xuICAgICAgbmV3Q29udGV4dCA9IGNvbnRleHQ7XG4gICAgICBuZXdTZWxlY3RvciA9IG5vZGVUeXBlID09PSA5ICYmIHNlbGVjdG9yO1xuXG4gICAgICAvLyBxU0Egd29ya3Mgc3RyYW5nZWx5IG9uIEVsZW1lbnQtcm9vdGVkIHF1ZXJpZXNcbiAgICAgIC8vIFdlIGNhbiB3b3JrIGFyb3VuZCB0aGlzIGJ5IHNwZWNpZnlpbmcgYW4gZXh0cmEgSUQgb24gdGhlIHJvb3RcbiAgICAgIC8vIGFuZCB3b3JraW5nIHVwIGZyb20gdGhlcmUgKFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGUgdGVjaG5pcXVlKVxuICAgICAgLy8gSUUgOCBkb2Vzbid0IHdvcmsgb24gb2JqZWN0IGVsZW1lbnRzXG4gICAgICBpZiAoIG5vZGVUeXBlID09PSAxICYmIGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIiApIHtcbiAgICAgICAgZ3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cbiAgICAgICAgaWYgKCAob2xkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkgKSB7XG4gICAgICAgICAgbmlkID0gb2xkLnJlcGxhY2UoIHJlc2NhcGUsIFwiXFxcXCQmXCIgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCBuaWQgKTtcbiAgICAgICAgfVxuICAgICAgICBuaWQgPSBcIltpZD0nXCIgKyBuaWQgKyBcIiddIFwiO1xuXG4gICAgICAgIGkgPSBncm91cHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICBncm91cHNbaV0gPSBuaWQgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dDtcbiAgICAgICAgbmV3U2VsZWN0b3IgPSBncm91cHMuam9pbihcIixcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICggbmV3U2VsZWN0b3IgKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cyxcbiAgICAgICAgICAgIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2gocXNhRXJyb3IpIHtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoICFvbGQgKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEFsbCBvdGhlcnNcbiAgcmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gKiBAcmV0dXJucyB7RnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gKiAgcHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAqICBkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuICB2YXIga2V5cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNhY2hlKCBrZXksIHZhbHVlICkge1xuICAgIC8vIFVzZSAoa2V5ICsgXCIgXCIpIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZSBwcm90b3R5cGUgcHJvcGVydGllcyAoc2VlIElzc3VlICMxNTcpXG4gICAgaWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuICAgICAgLy8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXG4gICAgICBkZWxldGUgY2FjaGVbIGtleXMuc2hpZnQoKSBdO1xuICAgIH1cbiAgICByZXR1cm4gKGNhY2hlWyBrZXkgKyBcIiBcIiBdID0gdmFsdWUpO1xuICB9XG4gIHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAqL1xuZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcbiAgZm5bIGV4cGFuZG8gXSA9IHRydWU7XG4gIHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHRlc3RpbmcgdXNpbmcgYW4gZWxlbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGRpdiBhbmQgZXhwZWN0cyBhIGJvb2xlYW4gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCggZm4gKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oIGRpdiApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGZpbmFsbHkge1xuICAgIC8vIFJlbW92ZSBmcm9tIGl0cyBwYXJlbnQgYnkgZGVmYXVsdFxuICAgIGlmICggZGl2LnBhcmVudE5vZGUgKSB7XG4gICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZGl2ICk7XG4gICAgfVxuICAgIC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG4gICAgZGl2ID0gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICovXG5mdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuICB2YXIgYXJyID0gYXR0cnMuc3BsaXQoXCJ8XCIpLFxuICAgIGkgPSBhdHRycy5sZW5ndGg7XG5cbiAgd2hpbGUgKCBpLS0gKSB7XG4gICAgRXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcbiAgdmFyIGN1ciA9IGIgJiYgYSxcbiAgICBkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgKCB+Yi5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKSAtXG4gICAgICAoIH5hLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSApO1xuXG4gIC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuICBpZiAoIGRpZmYgKSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cblxuICAvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuICBpZiAoIGN1ciApIHtcbiAgICB3aGlsZSAoIChjdXIgPSBjdXIubmV4dFNpYmxpbmcpICkge1xuICAgICAgaWYgKCBjdXIgPT09IGIgKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIikgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcbiAgICBhcmd1bWVudCA9ICthcmd1bWVudDtcbiAgICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuICAgICAgdmFyIGosXG4gICAgICAgIG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG4gICAgICAgIGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG4gICAgICAvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoIHNlZWRbIChqID0gbWF0Y2hJbmRleGVzW2ldKSBdICkge1xuICAgICAgICAgIHNlZWRbal0gPSAhKG1hdGNoZXNbal0gPSBzZWVkW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuICByZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuICAvLyAoc3VjaCBhcyBsb2FkaW5nIGlmcmFtZXMgaW4gSUUgLSAjNDgzMylcbiAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKS5kb2N1bWVudEVsZW1lbnQ7XG4gIHJldHVybiBkb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiIDogZmFsc2U7XG59O1xuXG4vKipcbiAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gW2RvY10gQW4gZWxlbWVudCBvciBkb2N1bWVudCBvYmplY3QgdG8gdXNlIHRvIHNldCB0aGUgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqL1xuc2V0RG9jdW1lbnQgPSBTaXp6bGUuc2V0RG9jdW1lbnQgPSBmdW5jdGlvbiggbm9kZSApIHtcbiAgdmFyIGhhc0NvbXBhcmUsXG4gICAgZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jLFxuICAgIHBhcmVudCA9IGRvYy5kZWZhdWx0VmlldztcblxuICAvLyBJZiBubyBkb2N1bWVudCBhbmQgZG9jdW1lbnRFbGVtZW50IGlzIGF2YWlsYWJsZSwgcmV0dXJuXG4gIGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG5cbiAgLy8gU2V0IG91ciBkb2N1bWVudFxuICBkb2N1bWVudCA9IGRvYztcbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgLy8gU3VwcG9ydCB0ZXN0c1xuICBkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jICk7XG5cbiAgLy8gU3VwcG9ydDogSUU+OFxuICAvLyBJZiBpZnJhbWUgZG9jdW1lbnQgaXMgYXNzaWduZWQgdG8gXCJkb2N1bWVudFwiIHZhcmlhYmxlIGFuZCBpZiBpZnJhbWUgaGFzIGJlZW4gcmVsb2FkZWQsXG4gIC8vIElFIHdpbGwgdGhyb3cgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gYWNjZXNzaW5nIFwiZG9jdW1lbnRcIiB2YXJpYWJsZSwgc2VlIGpRdWVyeSAjMTM5MzZcbiAgLy8gSUU2LTggZG8gbm90IHN1cHBvcnQgdGhlIGRlZmF1bHRWaWV3IHByb3BlcnR5IHNvIHBhcmVudCB3aWxsIGJlIHVuZGVmaW5lZFxuICBpZiAoIHBhcmVudCAmJiBwYXJlbnQgIT09IHBhcmVudC50b3AgKSB7XG4gICAgLy8gSUUxMSBkb2VzIG5vdCBoYXZlIGF0dGFjaEV2ZW50LCBzbyBhbGwgbXVzdCBzdWZmZXJcbiAgICBpZiAoIHBhcmVudC5hZGRFdmVudExpc3RlbmVyICkge1xuICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXREb2N1bWVudCgpO1xuICAgICAgfSwgZmFsc2UgKTtcbiAgICB9IGVsc2UgaWYgKCBwYXJlbnQuYXR0YWNoRXZlbnQgKSB7XG4gICAgICBwYXJlbnQuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldERvY3VtZW50KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiBBdHRyaWJ1dGVzXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAvLyBTdXBwb3J0OiBJRTw4XG4gIC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllcyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcbiAgc3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiaVwiO1xuICAgIHJldHVybiAhZGl2LmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcbiAgfSk7XG5cbiAgLyogZ2V0RWxlbWVudChzKUJ5KlxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuICBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gICAgZGl2LmFwcGVuZENoaWxkKCBkb2MuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuICAgIHJldHVybiAhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG4gIH0pO1xuXG4gIC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgY2FuIGJlIHRydXN0ZWRcbiAgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApICYmIGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgIGRpdi5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2EnPjwvZGl2PjxkaXYgY2xhc3M9J2EgaSc+PC9kaXY+XCI7XG5cbiAgICAvLyBTdXBwb3J0OiBTYWZhcmk8NFxuICAgIC8vIENhdGNoIGNsYXNzIG92ZXItY2FjaGluZ1xuICAgIGRpdi5maXJzdENoaWxkLmNsYXNzTmFtZSA9IFwiaVwiO1xuICAgIC8vIFN1cHBvcnQ6IE9wZXJhPDEwXG4gICAgLy8gQ2F0Y2ggZ0VCQ04gZmFpbHVyZSB0byBmaW5kIG5vbi1sZWFkaW5nIGNsYXNzZXNcbiAgICByZXR1cm4gZGl2LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpXCIpLmxlbmd0aCA9PT0gMjtcbiAgfSk7XG5cbiAgLy8gU3VwcG9ydDogSUU8MTBcbiAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudEJ5SWQgcmV0dXJucyBlbGVtZW50cyBieSBuYW1lXG4gIC8vIFRoZSBicm9rZW4gZ2V0RWxlbWVudEJ5SWQgbWV0aG9kcyBkb24ndCBwaWNrIHVwIHByb2dyYW1hdGljYWxseS1zZXQgbmFtZXMsXG4gIC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuICBzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcbiAgICBkb2NFbGVtLmFwcGVuZENoaWxkKCBkaXYgKS5pZCA9IGV4cGFuZG87XG4gICAgcmV0dXJuICFkb2MuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvYy5nZXRFbGVtZW50c0J5TmFtZSggZXhwYW5kbyApLmxlbmd0aDtcbiAgfSk7XG5cbiAgLy8gSUQgZmluZCBhbmQgZmlsdGVyXG4gIGlmICggc3VwcG9ydC5nZXRCeUlkICkge1xuICAgIEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuICAgICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gc3RydW5kZWZpbmVkICYmIGRvY3VtZW50SXNIVE1MICkge1xuICAgICAgICB2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG4gICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG4gICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcbiAgICAgICAgcmV0dXJuIG0gJiYgbS5wYXJlbnROb2RlID8gW21dIDogW107XG4gICAgICB9XG4gICAgfTtcbiAgICBFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24oIGlkICkge1xuICAgICAgdmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XG4gICAgICB9O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gU3VwcG9ydDogSUU2LzdcbiAgICAvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgcmVsaWFibGUgYXMgYSBmaW5kIHNob3J0Y3V0XG4gICAgZGVsZXRlIEV4cHIuZmluZFtcIklEXCJdO1xuXG4gICAgRXhwci5maWx0ZXJbXCJJRFwiXSA9ICBmdW5jdGlvbiggaWQgKSB7XG4gICAgICB2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBzdHJ1bmRlZmluZWQgJiYgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG4gICAgICAgIHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIC8vIFRhZ1xuICBFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cbiAgICBmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuICAgICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkICkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG4gICAgICB9XG4gICAgfSA6XG4gICAgZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcbiAgICAgIHZhciBlbGVtLFxuICAgICAgICB0bXAgPSBbXSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuICAgICAgLy8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuICAgICAgaWYgKCB0YWcgPT09IFwiKlwiICkge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcbiAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICB0bXAucHVzaCggZWxlbSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gIC8vIENsYXNzXG4gIEV4cHIuZmluZFtcIkNMQVNTXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG4gICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICE9PSBzdHJ1bmRlZmluZWQgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcbiAgICB9XG4gIH07XG5cbiAgLyogUVNBL21hdGNoZXNTZWxlY3RvclxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgLy8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG4gIC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG4gIHJidWdneU1hdGNoZXMgPSBbXTtcblxuICAvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuICAvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3JcbiAgLy8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuICAvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuICAvLyBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcbiAgcmJ1Z2d5UVNBID0gW107XG5cbiAgaWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvYy5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xuICAgIC8vIEJ1aWxkIFFTQSByZWdleFxuICAgIC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcbiAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcbiAgICAgIC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2VcbiAgICAgIC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuICAgICAgLy8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG4gICAgICAvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuICAgICAgLy8gaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxzZWxlY3QgdD0nJz48b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiO1xuXG4gICAgICAvLyBTdXBwb3J0OiBJRTgsIE9wZXJhIDEwLTEyXG4gICAgICAvLyBOb3RoaW5nIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIGVtcHR5IHN0cmluZ3MgZm9sbG93IF49IG9yICQ9IG9yICo9XG4gICAgICBpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW3RePScnXVwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgICAgLy8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcbiAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG4gICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcbiAgICAgIC8vIFN1cHBvcnQ6IFdpbmRvd3MgOCBOYXRpdmUgQXBwc1xuICAgICAgLy8gVGhlIHR5cGUgYW5kIG5hbWUgYXR0cmlidXRlcyBhcmUgcmVzdHJpY3RlZCBkdXJpbmcgLmlubmVySFRNTCBhc3NpZ25tZW50XG4gICAgICB2YXIgaW5wdXQgPSBkb2MuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApLnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiRFwiICk7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgICAgLy8gRW5mb3JjZSBjYXNlLXNlbnNpdGl2aXR5IG9mIG5hbWUgYXR0cmlidXRlXG4gICAgICBpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoICkge1xuICAgICAgICByYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG4gICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGggKSB7XG4gICAgICAgIHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3NcbiAgICAgIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKTtcbiAgICAgIHJidWdneVFTQS5wdXNoKFwiLC4qOlwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICggKHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAobWF0Y2hlcyA9IGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKSApKSApIHtcblxuICAgIGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG4gICAgICAvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuICAgICAgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZGl2LCBcImRpdlwiICk7XG5cbiAgICAgIC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cbiAgICAgIC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcbiAgICAgIG1hdGNoZXMuY2FsbCggZGl2LCBcIltzIT0nJ106eFwiICk7XG4gICAgICByYnVnZ3lNYXRjaGVzLnB1c2goIFwiIT1cIiwgcHNldWRvcyApO1xuICAgIH0pO1xuICB9XG5cbiAgcmJ1Z2d5UVNBID0gcmJ1Z2d5UVNBLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lRU0Euam9pbihcInxcIikgKTtcbiAgcmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbihcInxcIikgKTtcblxuICAvKiBDb250YWluc1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIGhhc0NvbXBhcmUgPSBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gKTtcblxuICAvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcbiAgLy8gUHVycG9zZWZ1bGx5IGRvZXMgbm90IGltcGxlbWVudCBpbmNsdXNpdmUgZGVzY2VuZGVudFxuICAvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxuICBjb250YWlucyA9IGhhc0NvbXBhcmUgfHwgcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbnRhaW5zICkgP1xuICAgIGZ1bmN0aW9uKCBhLCBiICkge1xuICAgICAgdmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcbiAgICAgICAgYnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG4gICAgICByZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcbiAgICAgICAgYWRvd24uY29udGFpbnMgP1xuICAgICAgICAgIGFkb3duLmNvbnRhaW5zKCBidXAgKSA6XG4gICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XG4gICAgICApKTtcbiAgICB9IDpcbiAgICBmdW5jdGlvbiggYSwgYiApIHtcbiAgICAgIGlmICggYiApIHtcbiAgICAgICAgd2hpbGUgKCAoYiA9IGIucGFyZW50Tm9kZSkgKSB7XG4gICAgICAgICAgaWYgKCBiID09PSBhICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAvKiBTb3J0aW5nXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAvLyBEb2N1bWVudCBvcmRlciBzb3J0aW5nXG4gIHNvcnRPcmRlciA9IGhhc0NvbXBhcmUgP1xuICBmdW5jdGlvbiggYSwgYiApIHtcblxuICAgIC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG4gICAgaWYgKCBhID09PSBiICkge1xuICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cbiAgICB2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG4gICAgaWYgKCBjb21wYXJlICkge1xuICAgICAgcmV0dXJuIGNvbXBhcmU7XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIHBvc2l0aW9uIGlmIGJvdGggaW5wdXRzIGJlbG9uZyB0byB0aGUgc2FtZSBkb2N1bWVudFxuICAgIGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG4gICAgICBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG4gICAgICAvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcbiAgICAgIDE7XG5cbiAgICAvLyBEaXNjb25uZWN0ZWQgbm9kZXNcbiAgICBpZiAoIGNvbXBhcmUgJiAxIHx8XG4gICAgICAoIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSkgKSB7XG5cbiAgICAgIC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuICAgICAgaWYgKCBhID09PSBkb2MgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKCBiID09PSBkb2MgfHwgYi5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBiKSApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG4gICAgICByZXR1cm4gc29ydElucHV0ID9cbiAgICAgICAgKCBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZi5jYWxsKCBzb3J0SW5wdXQsIGIgKSApIDpcbiAgICAgICAgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG4gIH0gOlxuICBmdW5jdGlvbiggYSwgYiApIHtcbiAgICAvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG4gICAgaWYgKCBhID09PSBiICkge1xuICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBjdXIsXG4gICAgICBpID0gMCxcbiAgICAgIGF1cCA9IGEucGFyZW50Tm9kZSxcbiAgICAgIGJ1cCA9IGIucGFyZW50Tm9kZSxcbiAgICAgIGFwID0gWyBhIF0sXG4gICAgICBicCA9IFsgYiBdO1xuXG4gICAgLy8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcbiAgICBpZiAoICFhdXAgfHwgIWJ1cCApIHtcbiAgICAgIHJldHVybiBhID09PSBkb2MgPyAtMSA6XG4gICAgICAgIGIgPT09IGRvYyA/IDEgOlxuICAgICAgICBhdXAgPyAtMSA6XG4gICAgICAgIGJ1cCA/IDEgOlxuICAgICAgICBzb3J0SW5wdXQgP1xuICAgICAgICAoIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBhICkgLSBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYiApICkgOlxuICAgICAgICAwO1xuXG4gICAgLy8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcbiAgICB9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcbiAgICAgIHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuICAgIGN1ciA9IGE7XG4gICAgd2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuICAgICAgYXAudW5zaGlmdCggY3VyICk7XG4gICAgfVxuICAgIGN1ciA9IGI7XG4gICAgd2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuICAgICAgYnAudW5zaGlmdCggY3VyICk7XG4gICAgfVxuXG4gICAgLy8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcbiAgICB3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaSA/XG4gICAgICAvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3JcbiAgICAgIHNpYmxpbmdDaGVjayggYXBbaV0sIGJwW2ldICkgOlxuXG4gICAgICAvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3RcbiAgICAgIGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG4gICAgICBicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XG4gICAgICAwO1xuICB9O1xuXG4gIHJldHVybiBkb2M7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcbiAgcmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcbiAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG4gIGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcbiAgICBzZXREb2N1bWVudCggZWxlbSApO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG4gIGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuICBpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG4gICAgKCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuICAgICggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cbiAgICAgIC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcbiAgICAgIGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcbiAgICAgICAgICAvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuICAgICAgICAgIC8vIGZyYWdtZW50IGluIElFIDlcbiAgICAgICAgICBlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbZWxlbV0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG4gIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuICBpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcbiAgfVxuICByZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG4gIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuICBpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG4gICAgc2V0RG9jdW1lbnQoIGVsZW0gKTtcbiAgfVxuXG4gIHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG4gICAgdmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuICAgICAgZm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcbiAgICAgIHVuZGVmaW5lZDtcblxuICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuICAgIHZhbCA6XG4gICAgc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG4gICAgICBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcbiAgICAgICh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuICAgICAgICB2YWwudmFsdWUgOlxuICAgICAgICBudWxsO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcbiAgdGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG4gIHZhciBlbGVtLFxuICAgIGR1cGxpY2F0ZXMgPSBbXSxcbiAgICBqID0gMCxcbiAgICBpID0gMDtcblxuICAvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG4gIGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG4gIHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuICByZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG4gIGlmICggaGFzRHVwbGljYXRlICkge1xuICAgIHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuICAgICAgaWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG4gICAgICAgIGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKCBqLS0gKSB7XG4gICAgICByZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG4gIHNvcnRJbnB1dCA9IG51bGw7XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBub2RlLFxuICAgIHJldCA9IFwiXCIsXG4gICAgaSA9IDAsXG4gICAgbm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG4gIGlmICggIW5vZGVUeXBlICkge1xuICAgIC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG4gICAgd2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG4gICAgICAvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuICAgICAgcmV0ICs9IGdldFRleHQoIG5vZGUgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcbiAgICAvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG4gICAgLy8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1MylcbiAgICBpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuICAgICAgcmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuICAgICAgZm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG4gICAgICAgIHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcbiAgICByZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG4gIH1cbiAgLy8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG4gIC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuICBjYWNoZUxlbmd0aDogNTAsXG5cbiAgY3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cbiAgbWF0Y2g6IG1hdGNoRXhwcixcblxuICBhdHRySGFuZGxlOiB7fSxcblxuICBmaW5kOiB7fSxcblxuICByZWxhdGl2ZToge1xuICAgIFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG4gICAgXCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuICAgIFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcbiAgICBcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuICB9LFxuXG4gIHByZUZpbHRlcjoge1xuICAgIFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG4gICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cbiAgICAgIC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG4gICAgICBtYXRjaFszXSA9ICggbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cbiAgICAgIGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcbiAgICAgICAgbWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuICAgIH0sXG5cbiAgICBcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcbiAgICAgIC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuICAgICAgICAxIHR5cGUgKG9ubHl8bnRofC4uLilcbiAgICAgICAgMiB3aGF0IChjaGlsZHxvZi10eXBlKVxuICAgICAgICAzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuICAgICAgICA0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcbiAgICAgICAgNSBzaWduIG9mIHhuLWNvbXBvbmVudFxuICAgICAgICA2IHggb2YgeG4tY29tcG9uZW50XG4gICAgICAgIDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuICAgICAgICA4IHkgb2YgeS1jb21wb25lbnRcbiAgICAgICovXG4gICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcbiAgICAgICAgLy8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcbiAgICAgICAgaWYgKCAhbWF0Y2hbM10gKSB7XG4gICAgICAgICAgU2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG4gICAgICAgIC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcbiAgICAgICAgbWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcbiAgICAgICAgbWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG4gICAgICAvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcbiAgICAgIH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuICAgICAgICBTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9LFxuXG4gICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuICAgICAgdmFyIGV4Y2VzcyxcbiAgICAgICAgdW5xdW90ZWQgPSAhbWF0Y2hbNV0gJiYgbWF0Y2hbMl07XG5cbiAgICAgIGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG4gICAgICBpZiAoIG1hdGNoWzNdICYmIG1hdGNoWzRdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIG1hdGNoWzJdID0gbWF0Y2hbNF07XG5cbiAgICAgIC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG4gICAgICB9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcbiAgICAgICAgLy8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcbiAgICAgICAgKGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuICAgICAgICAvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcbiAgICAgICAgKGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cbiAgICAgICAgLy8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG4gICAgICAgIG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcbiAgICAgIHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuICAgIH1cbiAgfSxcblxuICBmaWx0ZXI6IHtcblxuICAgIFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuICAgICAgdmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuICAgICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG4gICAgICB2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuIHx8XG4gICAgICAgIChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcbiAgICAgICAgY2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBzdHJ1bmRlZmluZWQgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiICk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgPT0gbnVsbCApIHtcbiAgICAgICAgICByZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICFvcGVyYXRvciApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCArPSBcIlwiO1xuXG4gICAgICAgIHJldHVybiBvcGVyYXRvciA9PT0gXCI9XCIgPyByZXN1bHQgPT09IGNoZWNrIDpcbiAgICAgICAgICBvcGVyYXRvciA9PT0gXCIhPVwiID8gcmVzdWx0ICE9PSBjaGVjayA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiXj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID09PSAwIDpcbiAgICAgICAgICBvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwiJD1cIiA/IGNoZWNrICYmIHJlc3VsdC5zbGljZSggLWNoZWNrLmxlbmd0aCApID09PSBjaGVjayA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwifj1cIiA/ICggXCIgXCIgKyByZXN1bHQgKyBcIiBcIiApLmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG4gICAgICAgICAgb3BlcmF0b3IgPT09IFwifD1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgfHwgcmVzdWx0LnNsaWNlKCAwLCBjaGVjay5sZW5ndGggKyAxICkgPT09IGNoZWNrICsgXCItXCIgOlxuICAgICAgICAgIGZhbHNlO1xuICAgICAgfTtcbiAgICB9LFxuXG4gICAgXCJDSElMRFwiOiBmdW5jdGlvbiggdHlwZSwgd2hhdCwgYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuICAgICAgdmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcbiAgICAgICAgZm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuICAgICAgICBvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuICAgICAgcmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG4gICAgICAgIC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcbiAgICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgcmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuICAgICAgICB9IDpcblxuICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgIHZhciBjYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgZGlmZiwgbm9kZUluZGV4LCBzdGFydCxcbiAgICAgICAgICAgIGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG4gICAgICAgICAgICBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG4gICAgICAgICAgICBuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlO1xuXG4gICAgICAgICAgaWYgKCBwYXJlbnQgKSB7XG5cbiAgICAgICAgICAgIC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcbiAgICAgICAgICAgIGlmICggc2ltcGxlICkge1xuICAgICAgICAgICAgICB3aGlsZSAoIGRpciApIHtcbiAgICAgICAgICAgICAgICBub2RlID0gZWxlbTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuICAgICAgICAgICAgICAgICAgaWYgKCBvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZGlyID0gdHlwZSA9PT0gXCJvbmx5XCIgJiYgIXN0YXJ0ICYmIFwibmV4dFNpYmxpbmdcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcblxuICAgICAgICAgICAgLy8gbm9uLXhtbCA6bnRoLWNoaWxkKC4uLikgc3RvcmVzIGNhY2hlIGRhdGEgb24gYHBhcmVudGBcbiAgICAgICAgICAgIGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcbiAgICAgICAgICAgICAgLy8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG4gICAgICAgICAgICAgIG91dGVyQ2FjaGUgPSBwYXJlbnRbIGV4cGFuZG8gXSB8fCAocGFyZW50WyBleHBhbmRvIF0gPSB7fSk7XG4gICAgICAgICAgICAgIGNhY2hlID0gb3V0ZXJDYWNoZVsgdHlwZSBdIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlSW5kZXggPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsxXTtcbiAgICAgICAgICAgICAgZGlmZiA9IGNhY2hlWzBdID09PSBkaXJydW5zICYmIGNhY2hlWzJdO1xuICAgICAgICAgICAgICBub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG4gICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcbiAgICAgICAgICAgICAgICAoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG4gICAgICAgICAgICAgICAgaWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgb3V0ZXJDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHVzZUNhY2hlICYmIChjYWNoZSA9IChlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KSlbIHR5cGUgXSkgJiYgY2FjaGVbMF0gPT09IGRpcnJ1bnMgKSB7XG4gICAgICAgICAgICAgIGRpZmYgPSBjYWNoZVsxXTtcblxuICAgICAgICAgICAgLy8geG1sIDpudGgtY2hpbGQoLi4uKSBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuICAgICAgICAgICAgICAgIChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCAoIG9mVHlwZSA/IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6IG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJiArK2RpZmYgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICBpZiAoIHVzZUNhY2hlICkge1xuICAgICAgICAgICAgICAgICAgICAobm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSkpWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIGRpZmYgXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKCBub2RlID09PSBlbGVtICkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcbiAgICAgICAgICAgIGRpZmYgLT0gbGFzdDtcbiAgICAgICAgICAgIHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG4gICAgICAvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcbiAgICAgIC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG4gICAgICAvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG4gICAgICB2YXIgYXJncyxcbiAgICAgICAgZm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuICAgICAgICAgIFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cbiAgICAgIC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcbiAgICAgIC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG4gICAgICAvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG4gICAgICBpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG4gICAgICAgIHJldHVybiBmbiggYXJndW1lbnQgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG4gICAgICBpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgIGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuICAgICAgICByZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cbiAgICAgICAgICBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG4gICAgICAgICAgICB2YXIgaWR4LFxuICAgICAgICAgICAgICBtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG4gICAgICAgICAgICAgIGkgPSBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgICBpZHggPSBpbmRleE9mLmNhbGwoIHNlZWQsIG1hdGNoZWRbaV0gKTtcbiAgICAgICAgICAgICAgc2VlZFsgaWR4IF0gPSAhKCBtYXRjaGVzWyBpZHggXSA9IG1hdGNoZWRbaV0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSA6XG4gICAgICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcbiAgICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm47XG4gICAgfVxuICB9LFxuXG4gIHBzZXVkb3M6IHtcbiAgICAvLyBQb3RlbnRpYWxseSBjb21wbGV4IHBzZXVkb3NcbiAgICBcIm5vdFwiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgICAgLy8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcbiAgICAgIC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG4gICAgICAvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcbiAgICAgIHZhciBpbnB1dCA9IFtdLFxuICAgICAgICByZXN1bHRzID0gW10sXG4gICAgICAgIG1hdGNoZXIgPSBjb21waWxlKCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICkgKTtcblxuICAgICAgcmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XG4gICAgICAgIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgY29udGV4dCwgeG1sICkge1xuICAgICAgICAgIHZhciBlbGVtLFxuICAgICAgICAgICAgdW5tYXRjaGVkID0gbWF0Y2hlciggc2VlZCwgbnVsbCwgeG1sLCBbXSApLFxuICAgICAgICAgICAgaSA9IHNlZWQubGVuZ3RoO1xuXG4gICAgICAgICAgLy8gTWF0Y2ggZWxlbWVudHMgdW5tYXRjaGVkIGJ5IGBtYXRjaGVyYFxuICAgICAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICAgICAgaWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG4gICAgICAgICAgICAgIHNlZWRbaV0gPSAhKG1hdGNoZXNbaV0gPSBlbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pIDpcbiAgICAgICAgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcbiAgICAgICAgICBpbnB1dFswXSA9IGVsZW07XG4gICAgICAgICAgbWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuICAgICAgICAgIHJldHVybiAhcmVzdWx0cy5wb3AoKTtcbiAgICAgICAgfTtcbiAgICB9KSxcblxuICAgIFwiaGFzXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcbiAgICAgIH07XG4gICAgfSksXG5cbiAgICBcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggdGV4dCApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcbiAgICAgIH07XG4gICAgfSksXG5cbiAgICAvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3JcbiAgICAvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuICAgIC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG4gICAgLy8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cbiAgICAvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuICAgIFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuICAgICAgLy8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuICAgICAgaWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuICAgICAgICBTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG4gICAgICB9XG4gICAgICBsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciBlbGVtTGFuZztcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuICAgICAgICAgICAgZWxlbS5sYW5nIDpcbiAgICAgICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuICAgICAgICAgICAgZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgfSksXG5cbiAgICAvLyBNaXNjZWxsYW5lb3VzXG4gICAgXCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcbiAgICB9LFxuXG4gICAgXCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG4gICAgfSxcblxuICAgIFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLyBCb29sZWFuIHByb3BlcnRpZXNcbiAgICBcImVuYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2U7XG4gICAgfSxcblxuICAgIFwiZGlzYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgXCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuICAgICAgdmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcbiAgICB9LFxuXG4gICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcbiAgICAgIC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcbiAgICAgIGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG4gICAgfSxcblxuICAgIC8vIENvbnRlbnRzXG4gICAgXCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG4gICAgICAvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG4gICAgICAvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuICAgICAgLy8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuICAgICAgZm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG4gICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgXCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG4gICAgfSxcblxuICAgIC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcbiAgICBcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcbiAgICB9LFxuXG4gICAgXCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcbiAgICB9LFxuXG4gICAgXCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG4gICAgfSxcblxuICAgIFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBhdHRyO1xuICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG4gICAgICAgIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XG4gICAgICAgIC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG4gICAgICAgICggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuICAgIH0sXG5cbiAgICAvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG4gICAgXCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFsgMCBdO1xuICAgIH0pLFxuXG4gICAgXCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuICAgICAgcmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuICAgIH0pLFxuXG4gICAgXCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICByZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG4gICAgfSksXG5cbiAgICBcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcbiAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XG4gICAgfSksXG5cbiAgICBcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcbiAgICAgIHZhciBpID0gMTtcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcbiAgICB9KSxcblxuICAgIFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuICAgICAgdmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuICAgICAgZm9yICggOyAtLWkgPj0gMDsgKSB7XG4gICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgIH0pLFxuXG4gICAgXCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG4gICAgICB2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG4gICAgICBmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG4gICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xuICAgIH0pXG4gIH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG4gIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG4gIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbmZ1bmN0aW9uIHRva2VuaXplKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuICB2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcbiAgICBzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuICAgIGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuICBpZiAoIGNhY2hlZCApIHtcbiAgICByZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuICB9XG5cbiAgc29GYXIgPSBzZWxlY3RvcjtcbiAgZ3JvdXBzID0gW107XG4gIHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuICB3aGlsZSAoIHNvRmFyICkge1xuXG4gICAgLy8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuICAgIGlmICggIW1hdGNoZWQgfHwgKG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkpICkge1xuICAgICAgaWYgKCBtYXRjaCApIHtcbiAgICAgICAgLy8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcbiAgICAgICAgc29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICkgfHwgc29GYXI7XG4gICAgICB9XG4gICAgICBncm91cHMucHVzaCggKHRva2VucyA9IFtdKSApO1xuICAgIH1cblxuICAgIG1hdGNoZWQgPSBmYWxzZTtcblxuICAgIC8vIENvbWJpbmF0b3JzXG4gICAgaWYgKCAobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSkgKSB7XG4gICAgICBtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IG1hdGNoZWQsXG4gICAgICAgIC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxuICAgICAgICB0eXBlOiBtYXRjaFswXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuICAgICAgfSk7XG4gICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuICAgIH1cblxuICAgIC8vIEZpbHRlcnNcbiAgICBmb3IgKCB0eXBlIGluIEV4cHIuZmlsdGVyICkge1xuICAgICAgaWYgKCAobWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApKSAmJiAoIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxuICAgICAgICAobWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkpKSApIHtcbiAgICAgICAgbWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIG1hdGNoZXM6IG1hdGNoXG4gICAgICAgIH0pO1xuICAgICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggIW1hdGNoZWQgKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3NcbiAgLy8gaWYgd2UncmUganVzdCBwYXJzaW5nXG4gIC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuICByZXR1cm4gcGFyc2VPbmx5ID9cbiAgICBzb0Zhci5sZW5ndGggOlxuICAgIHNvRmFyID9cbiAgICAgIFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG4gICAgICAvLyBDYWNoZSB0aGUgdG9rZW5zXG4gICAgICB0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn1cblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuID0gdG9rZW5zLmxlbmd0aCxcbiAgICBzZWxlY3RvciA9IFwiXCI7XG4gIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcbiAgfVxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG4gIHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcbiAgICBjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBkaXIgPT09IFwicGFyZW50Tm9kZVwiLFxuICAgIGRvbmVOYW1lID0gZG9uZSsrO1xuXG4gIHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cbiAgICAvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcbiAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgd2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSA6XG5cbiAgICAvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcbiAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgdmFyIG9sZENhY2hlLCBvdXRlckNhY2hlLFxuICAgICAgICBuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuICAgICAgLy8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gZGlyIGNhY2hpbmdcbiAgICAgIGlmICggeG1sICkge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuICAgICAgICAgICAgaWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuICAgICAgICAgICAgb3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoZWxlbVsgZXhwYW5kbyBdID0ge30pO1xuICAgICAgICAgICAgaWYgKCAob2xkQ2FjaGUgPSBvdXRlckNhY2hlWyBkaXIgXSkgJiZcbiAgICAgICAgICAgICAgb2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuICAgICAgICAgICAgICAvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuICAgICAgICAgICAgICByZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcbiAgICAgICAgICAgICAgb3V0ZXJDYWNoZVsgZGlyIF0gPSBuZXdDYWNoZTtcblxuICAgICAgICAgICAgICAvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcbiAgICAgICAgICAgICAgaWYgKCAobmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcbiAgcmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgICB2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoICFtYXRjaGVyc1tpXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IDpcbiAgICBtYXRjaGVyc1swXTtcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcbiAgdmFyIGVsZW0sXG4gICAgbmV3VW5tYXRjaGVkID0gW10sXG4gICAgaSA9IDAsXG4gICAgbGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcbiAgICBtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICBpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcbiAgICAgIGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuICAgICAgICBuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuICAgICAgICBpZiAoIG1hcHBlZCApIHtcbiAgICAgICAgICBtYXAucHVzaCggaSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuICBpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcbiAgICBwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuICB9XG4gIGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuICAgIHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcbiAgfVxuICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG4gICAgdmFyIHRlbXAsIGksIGVsZW0sXG4gICAgICBwcmVNYXAgPSBbXSxcbiAgICAgIHBvc3RNYXAgPSBbXSxcbiAgICAgIHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cbiAgICAgIC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG4gICAgICBlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cbiAgICAgIC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuICAgICAgbWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG4gICAgICAgIGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcbiAgICAgICAgZWxlbXMsXG5cbiAgICAgIG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcbiAgICAgICAgcG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG4gICAgICAgICAgLy8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG4gICAgICAgICAgW10gOlxuXG4gICAgICAgICAgLy8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG4gICAgICAgICAgcmVzdWx0cyA6XG4gICAgICAgIG1hdGNoZXJJbjtcblxuICAgIC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG4gICAgaWYgKCBtYXRjaGVyICkge1xuICAgICAgbWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcbiAgICB9XG5cbiAgICAvLyBBcHBseSBwb3N0RmlsdGVyXG4gICAgaWYgKCBwb3N0RmlsdGVyICkge1xuICAgICAgdGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG4gICAgICBwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cbiAgICAgIC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cbiAgICAgIGkgPSB0ZW1wLmxlbmd0aDtcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICBpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG4gICAgICAgICAgbWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBzZWVkICkge1xuICAgICAgaWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcbiAgICAgICAgaWYgKCBwb3N0RmluZGVyICkge1xuICAgICAgICAgIC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuICAgICAgICAgIHRlbXAgPSBbXTtcbiAgICAgICAgICBpID0gbWF0Y2hlck91dC5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICBpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgKSB7XG4gICAgICAgICAgICAgIC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG4gICAgICAgICAgICAgIHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc3RGaW5kZXIoIG51bGwsIChtYXRjaGVyT3V0ID0gW10pLCB0ZW1wLCB4bWwgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG4gICAgICAgIGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgaWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICYmXG4gICAgICAgICAgICAodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mLmNhbGwoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuICAgICAgICAgICAgc2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLy8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoZXJPdXQgPSBjb25kZW5zZShcbiAgICAgICAgbWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG4gICAgICAgICAgbWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcbiAgICAgICAgICBtYXRjaGVyT3V0XG4gICAgICApO1xuICAgICAgaWYgKCBwb3N0RmluZGVyICkge1xuICAgICAgICBwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuICB2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuICAgIGxlbiA9IHRva2Vucy5sZW5ndGgsXG4gICAgbGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcbiAgICBpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuICAgIGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuICAgIC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG4gICAgbWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuICAgIH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcbiAgICBtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBpbmRleE9mLmNhbGwoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG4gICAgfSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuICAgIG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuICAgICAgcmV0dXJuICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG4gICAgICAgIChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG4gICAgICAgICAgbWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG4gICAgICAgICAgbWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuICAgIH0gXTtcblxuICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICBpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG4gICAgICBtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbaV0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbaV0ubWF0Y2hlcyApO1xuXG4gICAgICAvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuICAgICAgaWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG4gICAgICAgIC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuICAgICAgICBqID0gKytpO1xuICAgICAgICBmb3IgKCA7IGogPCBsZW47IGorKyApIHtcbiAgICAgICAgICBpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1tqXS50eXBlIF0gKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldE1hdGNoZXIoXG4gICAgICAgICAgaSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG4gICAgICAgICAgaSA+IDEgJiYgdG9TZWxlY3RvcihcbiAgICAgICAgICAgIC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG4gICAgICAgICAgICB0b2tlbnMuc2xpY2UoIDAsIGkgLSAxICkuY29uY2F0KHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9KVxuICAgICAgICAgICkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuICAgICAgICAgIG1hdGNoZXIsXG4gICAgICAgICAgaSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG4gICAgICAgICAgaiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKHRva2VucyA9IHRva2Vucy5zbGljZSggaiApKSApLFxuICAgICAgICAgIGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcbiAgdmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcbiAgICBieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcbiAgICBzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG4gICAgICB2YXIgZWxlbSwgaiwgbWF0Y2hlcixcbiAgICAgICAgbWF0Y2hlZENvdW50ID0gMCxcbiAgICAgICAgaSA9IFwiMFwiLFxuICAgICAgICB1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuICAgICAgICBzZXRNYXRjaGVkID0gW10sXG4gICAgICAgIGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuICAgICAgICAvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG4gICAgICAgIGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kW1wiVEFHXCJdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG4gICAgICAgIC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG4gICAgICAgIGRpcnJ1bnNVbmlxdWUgPSAoZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEpLFxuICAgICAgICBsZW4gPSBlbGVtcy5sZW5ndGg7XG5cbiAgICAgIGlmICggb3V0ZXJtb3N0ICkge1xuICAgICAgICBvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCAhPT0gZG9jdW1lbnQgJiYgY29udGV4dDtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcbiAgICAgIC8vIEtlZXAgYGlgIGEgc3RyaW5nIGlmIHRoZXJlIGFyZSBubyBlbGVtZW50cyBzbyBgbWF0Y2hlZENvdW50YCB3aWxsIGJlIFwiMDBcIiBiZWxvd1xuICAgICAgLy8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG4gICAgICAvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcbiAgICAgIGZvciAoIDsgaSAhPT0gbGVuICYmIChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICAgICAgaWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcbiAgICAgICAgICBqID0gMDtcbiAgICAgICAgICB3aGlsZSAoIChtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzW2orK10pICkge1xuICAgICAgICAgICAgaWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIG91dGVybW9zdCApIHtcbiAgICAgICAgICAgIGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcbiAgICAgICAgaWYgKCBieVNldCApIHtcbiAgICAgICAgICAvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG4gICAgICAgICAgaWYgKCAoZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0pICkge1xuICAgICAgICAgICAgbWF0Y2hlZENvdW50LS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuICAgICAgICAgIGlmICggc2VlZCApIHtcbiAgICAgICAgICAgIHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuICAgICAgbWF0Y2hlZENvdW50ICs9IGk7XG4gICAgICBpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcbiAgICAgICAgaiA9IDA7XG4gICAgICAgIHdoaWxlICggKG1hdGNoZXIgPSBzZXRNYXRjaGVyc1tqKytdKSApIHtcbiAgICAgICAgICBtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzZWVkICkge1xuICAgICAgICAgIC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcbiAgICAgICAgICBpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG4gICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgICAgICAgaWYgKCAhKHVubWF0Y2hlZFtpXSB8fCBzZXRNYXRjaGVkW2ldKSApIHtcbiAgICAgICAgICAgICAgICBzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG4gICAgICAgICAgc2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG4gICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuICAgICAgICAvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcbiAgICAgICAgaWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgKCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cbiAgICAgICAgICBTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuICAgICAgaWYgKCBvdXRlcm1vc3QgKSB7XG4gICAgICAgIGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuICAgICAgICBvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVubWF0Y2hlZDtcbiAgICB9O1xuXG4gIHJldHVybiBieVNldCA/XG4gICAgbWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG4gICAgc3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGdyb3VwIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuICB2YXIgaSxcbiAgICBzZXRNYXRjaGVycyA9IFtdLFxuICAgIGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuICBpZiAoICFjYWNoZWQgKSB7XG4gICAgLy8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG4gICAgaWYgKCAhZ3JvdXAgKSB7XG4gICAgICBncm91cCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuICAgIH1cbiAgICBpID0gZ3JvdXAubGVuZ3RoO1xuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgY2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoIGdyb3VwW2ldICk7XG4gICAgICBpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuICAgICAgICBzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cbiAgICBjYWNoZWQgPSBjb21waWxlckNhY2hlKCBzZWxlY3RvciwgbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkgKTtcbiAgfVxuICByZXR1cm4gY2FjaGVkO1xufTtcblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuID0gY29udGV4dHMubGVuZ3RoO1xuICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3QoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuICB2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcbiAgICBtYXRjaCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXG4gIGlmICggIXNlZWQgKSB7XG4gICAgLy8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXBcbiAgICBpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuICAgICAgLy8gVGFrZSBhIHNob3J0Y3V0IGFuZCBzZXQgdGhlIGNvbnRleHQgaWYgdGhlIHJvb3Qgc2VsZWN0b3IgaXMgYW4gSURcbiAgICAgIHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcbiAgICAgIGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcbiAgICAgICAgICBzdXBwb3J0LmdldEJ5SWQgJiYgY29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJlxuICAgICAgICAgIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sxXS50eXBlIF0gKSB7XG5cbiAgICAgICAgY29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xuICAgICAgICBpZiAoICFjb250ZXh0ICkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuICAgICAgfVxuXG4gICAgICAvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG4gICAgICBpID0gbWF0Y2hFeHByW1wibmVlZHNDb250ZXh0XCJdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcbiAgICAgIHdoaWxlICggaS0tICkge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgICAvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG4gICAgICAgIGlmICggRXhwci5yZWxhdGl2ZVsgKHR5cGUgPSB0b2tlbi50eXBlKSBdICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG4gICAgICAgICAgLy8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG4gICAgICAgICAgaWYgKCAoc2VlZCA9IGZpbmQoXG4gICAgICAgICAgICB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG4gICAgICAgICAgICByc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG4gICAgICAgICAgKSkgKSB7XG5cbiAgICAgICAgICAgIC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuICAgICAgICAgICAgdG9rZW5zLnNwbGljZSggaSwgMSApO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcbiAgICAgICAgICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uXG4gIC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcbiAgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkoXG4gICAgc2VlZCxcbiAgICBjb250ZXh0LFxuICAgICFkb2N1bWVudElzSFRNTCxcbiAgICByZXN1bHRzLFxuICAgIHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcbiAgKTtcbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZTwxNFxuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdjEgKSB7XG4gIC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuICByZXR1cm4gZGl2MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApICYgMTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIGRpdi5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbn0pICkge1xuICBhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgaWYgKCAhaXNYTUwgKSB7XG4gICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG4gIGRpdi5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSkgKSB7XG4gIGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgaWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG4gICAgICByZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG4gIHJldHVybiBkaXYuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcbn0pICkge1xuICBhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgdmFyIHZhbDtcbiAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgIHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgICh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgdmFsLnNwZWNpZmllZCA/XG4gICAgICAgICAgdmFsLnZhbHVlIDpcbiAgICAgICAgbnVsbDtcbiAgICB9XG4gIH0pO1xufVxuXG5yZXR1cm4gU2l6emxlO1xuXG59KSggd2luZG93ICk7XG5cblxuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcbmpRdWVyeS5leHByW1wiOlwiXSA9IGpRdWVyeS5leHByLnBzZXVkb3M7XG5qUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xuXG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cbnZhciByc2luZ2xlVGFnID0gKC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyk7XG5cblxuXG52YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xuXG4vLyBJbXBsZW1lbnQgdGhlIGlkZW50aWNhbCBmdW5jdGlvbmFsaXR5IGZvciBmaWx0ZXIgYW5kIG5vdFxuZnVuY3Rpb24gd2lubm93KCBlbGVtZW50cywgcXVhbGlmaWVyLCBub3QgKSB7XG4gIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xuICAgIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuICAgICAgLyoganNoaW50IC1XMDE4ICovXG4gICAgICByZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuICAgIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgcmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcbiAgICB9KTtcblxuICB9XG5cbiAgaWYgKCB0eXBlb2YgcXVhbGlmaWVyID09PSBcInN0cmluZ1wiICkge1xuICAgIGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuICAgIH1cblxuICAgIHF1YWxpZmllciA9IGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMgKTtcbiAgfVxuXG4gIHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiAoIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBxdWFsaWZpZXIgKSA+PSAwICkgIT09IG5vdDtcbiAgfSk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcbiAgdmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG4gIGlmICggbm90ICkge1xuICAgIGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG4gIH1cblxuICByZXR1cm4gZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuICAgIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXSA6XG4gICAgalF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuICAgIH0pKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgdmFyIGksXG4gICAgICByZXQgPSBbXSxcbiAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgbGVuID0gc2VsZi5sZW5ndGg7XG5cbiAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pICk7XG4gICAgfVxuXG4gICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcbiAgICB9XG5cbiAgICAvLyBOZWVkZWQgYmVjYXVzZSAkKCBzZWxlY3RvciwgY29udGV4dCApIGJlY29tZXMgJCggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yIClcbiAgICByZXQgPSB0aGlzLnB1c2hTdGFjayggbGVuID4gMSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0ICk7XG4gICAgcmV0LnNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IgKyBcIiBcIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcbiAgZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3codGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlKSApO1xuICB9LFxuICBub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSkgKTtcbiAgfSxcbiAgaXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gISF3aW5ub3coXG4gICAgICB0aGlzLFxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG4gICAgICAvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG4gICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cbiAgICAgICAgalF1ZXJ5KCBzZWxlY3RvciApIDpcbiAgICAgICAgc2VsZWN0b3IgfHwgW10sXG4gICAgICBmYWxzZVxuICAgICkubGVuZ3RoO1xuICB9XG59KTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cbiAgLy8gVXNlIHRoZSBjb3JyZWN0IGRvY3VtZW50IGFjY29yZGluZ2x5IHdpdGggd2luZG93IGFyZ3VtZW50IChzYW5kYm94KVxuICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblxuICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuICAvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG4gIC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuICBycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXG5cbiAgaW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuICAgIHZhciBtYXRjaCwgZWxlbTtcblxuICAgIC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuICAgIGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuICAgICAgaWYgKCBzZWxlY3Rvci5jaGFyQXQoMCkgPT09IFwiPFwiICYmIHNlbGVjdG9yLmNoYXJBdCggc2VsZWN0b3IubGVuZ3RoIC0gMSApID09PSBcIj5cIiAmJiBzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcbiAgICAgICAgLy8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcbiAgICAgICAgbWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG4gICAgICBpZiAoIG1hdGNoICYmIChtYXRjaFsxXSB8fCAhY29udGV4dCkgKSB7XG5cbiAgICAgICAgLy8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG4gICAgICAgIGlmICggbWF0Y2hbMV0gKSB7XG4gICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WzBdIDogY29udGV4dDtcblxuICAgICAgICAgIC8vIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcbiAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuICAgICAgICAgIGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcbiAgICAgICAgICAgIG1hdGNoWzFdLFxuICAgICAgICAgICAgY29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApICk7XG5cbiAgICAgICAgICAvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG4gICAgICAgICAgaWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWzFdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcbiAgICAgICAgICAgIGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG4gICAgICAgICAgICAgIC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcbiAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuICAgICAgICAgICAgICAgIHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuICAgICAgICAgICAgICAvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgLy8gSEFORExFOiAkKCNpZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWzJdICk7XG5cbiAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xuICAgICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcbiAgICAgICAgICBpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIElFIGFuZCBPcGVyYSByZXR1cm4gaXRlbXNcbiAgICAgICAgICAgIC8vIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuICAgICAgICAgICAgaWYgKCBlbGVtLmlkICE9PSBtYXRjaFsyXSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJvb3RqUXVlcnkuZmluZCggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBpbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgICAgICAgICAgdGhpc1swXSA9IGVsZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jb250ZXh0ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgIC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG4gICAgICB9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcbiAgICAgICAgcmV0dXJuICggY29udGV4dCB8fCByb290alF1ZXJ5ICkuZmluZCggc2VsZWN0b3IgKTtcblxuICAgICAgLy8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG4gICAgICAvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcbiAgICAgIH1cblxuICAgIC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuICAgIH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpc1swXSA9IHNlbGVjdG9yO1xuICAgICAgdGhpcy5sZW5ndGggPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG4gICAgLy8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG4gICAgfSBlbHNlIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHJvb3RqUXVlcnkucmVhZHkgIT09IFwidW5kZWZpbmVkXCIgP1xuICAgICAgICByb290alF1ZXJ5LnJlYWR5KCBzZWxlY3RvciApIDpcbiAgICAgICAgLy8gRXhlY3V0ZSBpbW1lZGlhdGVseSBpZiByZWFkeSBpcyBub3QgcHJlc2VudFxuICAgICAgICBzZWxlY3RvciggalF1ZXJ5ICk7XG4gICAgfVxuXG4gICAgaWYgKCBzZWxlY3Rvci5zZWxlY3RvciAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yLnNlbGVjdG9yO1xuICAgICAgdGhpcy5jb250ZXh0ID0gc2VsZWN0b3IuY29udGV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcbiAgfTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxudmFyIHJwYXJlbnRzcHJldiA9IC9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLFxuICAvLyBtZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuICBndWFyYW50ZWVkVW5pcXVlID0ge1xuICAgIGNoaWxkcmVuOiB0cnVlLFxuICAgIGNvbnRlbnRzOiB0cnVlLFxuICAgIG5leHQ6IHRydWUsXG4gICAgcHJldjogdHJ1ZVxuICB9O1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgZGlyOiBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcbiAgICB2YXIgbWF0Y2hlZCA9IFtdLFxuICAgICAgY3VyID0gZWxlbVsgZGlyIF07XG5cbiAgICB3aGlsZSAoIGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDkgJiYgKHVudGlsID09PSB1bmRlZmluZWQgfHwgY3VyLm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkoIGN1ciApLmlzKCB1bnRpbCApKSApIHtcbiAgICAgIGlmICggY3VyLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICBtYXRjaGVkLnB1c2goIGN1ciApO1xuICAgICAgfVxuICAgICAgY3VyID0gY3VyW2Rpcl07XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkO1xuICB9LFxuXG4gIHNpYmxpbmc6IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuICAgIHZhciByID0gW107XG5cbiAgICBmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuICAgICAgaWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG4gICAgICAgIHIucHVzaCggbiApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByO1xuICB9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcbiAgICB2YXIgaSxcbiAgICAgIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuICAgICAgbGVuID0gdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1tpXSApICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgY2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcbiAgICB2YXIgY3VyLFxuICAgICAgaSA9IDAsXG4gICAgICBsID0gdGhpcy5sZW5ndGgsXG4gICAgICBtYXRjaGVkID0gW10sXG4gICAgICBwb3MgPSBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApIHx8IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgP1xuICAgICAgICBqUXVlcnkoIHNlbGVjdG9ycywgY29udGV4dCB8fCB0aGlzLmNvbnRleHQgKSA6XG4gICAgICAgIDA7XG5cbiAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICBmb3IgKCBjdXIgPSB0aGlzW2ldOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcbiAgICAgICAgLy8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG4gICAgICAgIGlmICggY3VyLm5vZGVUeXBlIDwgMTEgJiYgKHBvcyA/XG4gICAgICAgICAgcG9zLmluZGV4KGN1cikgPiAtMSA6XG5cbiAgICAgICAgICAvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcbiAgICAgICAgICBjdXIubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgICAgIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvcihjdXIsIHNlbGVjdG9ycykpICkge1xuXG4gICAgICAgICAgbWF0Y2hlZC5wdXNoKCBjdXIgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZC5sZW5ndGggPiAxID8galF1ZXJ5LnVuaXF1ZSggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuICB9LFxuXG4gIC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW5cbiAgLy8gdGhlIG1hdGNoZWQgc2V0IG9mIGVsZW1lbnRzXG4gIGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuICAgIC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG4gICAgaWYgKCAhZWxlbSApIHtcbiAgICAgIHJldHVybiAoIHRoaXNbMF0gJiYgdGhpc1swXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuICAgIH1cblxuICAgIC8vIGluZGV4IGluIHNlbGVjdG9yXG4gICAgaWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiBqUXVlcnkuaW5BcnJheSggdGhpc1swXSwgalF1ZXJ5KCBlbGVtICkgKTtcbiAgICB9XG5cbiAgICAvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcbiAgICByZXR1cm4galF1ZXJ5LmluQXJyYXkoXG4gICAgICAvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcbiAgICAgIGVsZW0uanF1ZXJ5ID8gZWxlbVswXSA6IGVsZW0sIHRoaXMgKTtcbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soXG4gICAgICBqUXVlcnkudW5pcXVlKFxuICAgICAgICBqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG4gICAgICApXG4gICAgKTtcbiAgfSxcblxuICBhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cbiAgICAgIHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoc2VsZWN0b3IpXG4gICAgKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuICBkbyB7XG4gICAgY3VyID0gY3VyWyBkaXIgXTtcbiAgfSB3aGlsZSAoIGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDEgKTtcblxuICByZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCh7XG4gIHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuICB9LFxuICBwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcbiAgfSxcbiAgcGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuICB9LFxuICBuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG4gIH0sXG4gIHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG4gIH0sXG4gIG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcbiAgfSxcbiAgcHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcbiAgfSxcbiAgbmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcbiAgfSxcbiAgcHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG4gIH0sXG4gIHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4galF1ZXJ5LnNpYmxpbmcoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuICB9LFxuICBjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5zaWJsaW5nKCBlbGVtLmZpcnN0Q2hpbGQgKTtcbiAgfSxcbiAgY29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaWZyYW1lXCIgKSA/XG4gICAgICBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOlxuICAgICAgalF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG4gIH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcbiAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuICAgIHZhciByZXQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuICAgIGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuICAgICAgc2VsZWN0b3IgPSB1bnRpbDtcbiAgICB9XG5cbiAgICBpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCByZXQgKTtcbiAgICB9XG5cbiAgICBpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcbiAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzXG4gICAgICBpZiAoICFndWFyYW50ZWVkVW5pcXVlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldCA9IGpRdWVyeS51bmlxdWUoIHJldCApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuICAgICAgaWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuICAgICAgICByZXQgPSByZXQucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG4gIH07XG59KTtcbnZhciBybm90d2hpdGUgPSAoL1xcUysvZyk7XG5cblxuXG4vLyBTdHJpbmcgdG8gT2JqZWN0IG9wdGlvbnMgZm9ybWF0IGNhY2hlXG52YXIgb3B0aW9uc0NhY2hlID0ge307XG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzIGFuZCBzdG9yZSBpbiBjYWNoZVxuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcbiAgdmFyIG9iamVjdCA9IG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdID0ge307XG4gIGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG4gICAgb2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqICBvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKiAgICAgIHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICogIG9uY2U6ICAgICB3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICogIG1lbW9yeTogICAgIHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqICAgICAgICAgIGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqICAgICAgICAgIHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqICB1bmlxdWU6ICAgICB3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKiAgc3RvcE9uRmFsc2U6ICBpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuICAvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG4gIC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcbiAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cbiAgICAoIG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdIHx8IGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSApIDpcbiAgICBqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG4gIHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG4gICAgZmlyaW5nLFxuICAgIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcbiAgICBtZW1vcnksXG4gICAgLy8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcbiAgICBmaXJlZCxcbiAgICAvLyBFbmQgb2YgdGhlIGxvb3Agd2hlbiBmaXJpbmdcbiAgICBmaXJpbmdMZW5ndGgsXG4gICAgLy8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgcmVtb3ZlIGlmIG5lZWRlZClcbiAgICBmaXJpbmdJbmRleCxcbiAgICAvLyBGaXJzdCBjYWxsYmFjayB0byBmaXJlICh1c2VkIGludGVybmFsbHkgYnkgYWRkIGFuZCBmaXJlV2l0aClcbiAgICBmaXJpbmdTdGFydCxcbiAgICAvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuICAgIGxpc3QgPSBbXSxcbiAgICAvLyBTdGFjayBvZiBmaXJlIGNhbGxzIGZvciByZXBlYXRhYmxlIGxpc3RzXG4gICAgc3RhY2sgPSAhb3B0aW9ucy5vbmNlICYmIFtdLFxuICAgIC8vIEZpcmUgY2FsbGJhY2tzXG4gICAgZmlyZSA9IGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgbWVtb3J5ID0gb3B0aW9ucy5tZW1vcnkgJiYgZGF0YTtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGZpcmluZ0luZGV4ID0gZmlyaW5nU3RhcnQgfHwgMDtcbiAgICAgIGZpcmluZ1N0YXJ0ID0gMDtcbiAgICAgIGZpcmluZ0xlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICAgICAgZmlyaW5nID0gdHJ1ZTtcbiAgICAgIGZvciAoIDsgbGlzdCAmJiBmaXJpbmdJbmRleCA8IGZpcmluZ0xlbmd0aDsgZmlyaW5nSW5kZXgrKyApIHtcbiAgICAgICAgaWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBkYXRhWyAwIF0sIGRhdGFbIDEgXSApID09PSBmYWxzZSAmJiBvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuICAgICAgICAgIG1lbW9yeSA9IGZhbHNlOyAvLyBUbyBwcmV2ZW50IGZ1cnRoZXIgY2FsbHMgdXNpbmcgYWRkXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpcmluZyA9IGZhbHNlO1xuICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICBpZiAoIHN0YWNrICkge1xuICAgICAgICAgIGlmICggc3RhY2subGVuZ3RoICkge1xuICAgICAgICAgICAgZmlyZSggc3RhY2suc2hpZnQoKSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggbWVtb3J5ICkge1xuICAgICAgICAgIGxpc3QgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3RcbiAgICBzZWxmID0ge1xuICAgICAgLy8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuICAgICAgYWRkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICAgIC8vIEZpcnN0LCB3ZSBzYXZlIHRoZSBjdXJyZW50IGxlbmd0aFxuICAgICAgICAgIHZhciBzdGFydCA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgIChmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG4gICAgICAgICAgICBqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcbiAgICAgICAgICAgICAgdmFyIHR5cGUgPSBqUXVlcnkudHlwZSggYXJnICk7XG4gICAgICAgICAgICAgIGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgICAgICAgICAgIGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG4gICAgICAgICAgICAgICAgICBsaXN0LnB1c2goIGFyZyApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgICAgICAgICAvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgYWRkKCBhcmcgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoIGFyZ3VtZW50cyApO1xuICAgICAgICAgIC8vIERvIHdlIG5lZWQgdG8gYWRkIHRoZSBjYWxsYmFja3MgdG8gdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBmaXJpbmcgYmF0Y2g/XG4gICAgICAgICAgaWYgKCBmaXJpbmcgKSB7XG4gICAgICAgICAgICBmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAvLyBXaXRoIG1lbW9yeSwgaWYgd2UncmUgbm90IGZpcmluZyB0aGVuXG4gICAgICAgICAgLy8gd2Ugc2hvdWxkIGNhbGwgcmlnaHQgYXdheVxuICAgICAgICAgIH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcbiAgICAgICAgICAgIGZpcmluZ1N0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgICBmaXJlKCBtZW1vcnkgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgLy8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBsaXN0ICkge1xuICAgICAgICAgIGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcbiAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuICAgICAgICAgICAgICBpZiAoIGZpcmluZyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0xlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgIGZpcmluZ0xlbmd0aC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuICAgICAgICAgICAgICAgICAgZmlyaW5nSW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuICAgICAgLy8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG4gICAgICBoYXM6IGZ1bmN0aW9uKCBmbiApIHtcbiAgICAgICAgcmV0dXJuIGZuID8galF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6ICEhKCBsaXN0ICYmIGxpc3QubGVuZ3RoICk7XG4gICAgICB9LFxuICAgICAgLy8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsaXN0ID0gW107XG4gICAgICAgIGZpcmluZ0xlbmd0aCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIEhhdmUgdGhlIGxpc3QgZG8gbm90aGluZyBhbnltb3JlXG4gICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdCA9IHN0YWNrID0gbWVtb3J5ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICAvLyBJcyBpdCBkaXNhYmxlZD9cbiAgICAgIGRpc2FibGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICFsaXN0O1xuICAgICAgfSxcbiAgICAgIC8vIExvY2sgdGhlIGxpc3QgaW4gaXRzIGN1cnJlbnQgc3RhdGVcbiAgICAgIGxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCAhbWVtb3J5ICkge1xuICAgICAgICAgIHNlbGYuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIElzIGl0IGxvY2tlZD9cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhc3RhY2s7XG4gICAgICB9LFxuICAgICAgLy8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuICAgICAgZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuICAgICAgICBpZiAoIGxpc3QgJiYgKCAhZmlyZWQgfHwgc3RhY2sgKSApIHtcbiAgICAgICAgICBhcmdzID0gYXJncyB8fCBbXTtcbiAgICAgICAgICBhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuICAgICAgICAgIGlmICggZmlyaW5nICkge1xuICAgICAgICAgICAgc3RhY2sucHVzaCggYXJncyApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJlKCBhcmdzICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG4gICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIC8vIFRvIGtub3cgaWYgdGhlIGNhbGxiYWNrcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZVxuICAgICAgZmlyZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFmaXJlZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHJldHVybiBzZWxmO1xufTtcblxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuICBEZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG4gICAgdmFyIHR1cGxlcyA9IFtcbiAgICAgICAgLy8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGxpc3RlbmVyIGxpc3QsIGZpbmFsIHN0YXRlXG4gICAgICAgIFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVzb2x2ZWRcIiBdLFxuICAgICAgICBbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVqZWN0ZWRcIiBdLFxuICAgICAgICBbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm1lbW9yeVwiKSBdXG4gICAgICBdLFxuICAgICAgc3RhdGUgPSBcInBlbmRpbmdcIixcbiAgICAgIHByb21pc2UgPSB7XG4gICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGFsd2F5czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVmZXJyZWQuZG9uZSggYXJndW1lbnRzICkuZmFpbCggYXJndW1lbnRzICk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcbiAgICAgICAgICB2YXIgZm5zID0gYXJndW1lbnRzO1xuICAgICAgICAgIHJldHVybiBqUXVlcnkuRGVmZXJyZWQoZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuICAgICAgICAgICAgalF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuICAgICAgICAgICAgICB2YXIgZm4gPSBqUXVlcnkuaXNGdW5jdGlvbiggZm5zWyBpIF0gKSAmJiBmbnNbIGkgXTtcbiAgICAgICAgICAgICAgLy8gZGVmZXJyZWRbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSBmb3IgZm9yd2FyZGluZyBhY3Rpb25zIHRvIG5ld0RlZmVyXG4gICAgICAgICAgICAgIGRlZmVycmVkWyB0dXBsZVsxXSBdKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICAgICAgICAgICAgICBpZiAoIHJldHVybmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm5lZC5wcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuICAgICAgICAgICAgICAgICAgICAuZmFpbCggbmV3RGVmZXIucmVqZWN0IClcbiAgICAgICAgICAgICAgICAgICAgLnByb2dyZXNzKCBuZXdEZWZlci5ub3RpZnkgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbmV3RGVmZXJbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKCB0aGlzID09PSBwcm9taXNlID8gbmV3RGVmZXIucHJvbWlzZSgpIDogdGhpcywgZm4gPyBbIHJldHVybmVkIF0gOiBhcmd1bWVudHMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmbnMgPSBudWxsO1xuICAgICAgICAgIH0pLnByb21pc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuICAgICAgICAvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG4gICAgICAgIHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVmZXJyZWQgPSB7fTtcblxuICAgIC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcbiAgICBwcm9taXNlLnBpcGUgPSBwcm9taXNlLnRoZW47XG5cbiAgICAvLyBBZGQgbGlzdC1zcGVjaWZpYyBtZXRob2RzXG4gICAgalF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuICAgICAgdmFyIGxpc3QgPSB0dXBsZVsgMiBdLFxuICAgICAgICBzdGF0ZVN0cmluZyA9IHR1cGxlWyAzIF07XG5cbiAgICAgIC8vIHByb21pc2VbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSA9IGxpc3QuYWRkXG4gICAgICBwcm9taXNlWyB0dXBsZVsxXSBdID0gbGlzdC5hZGQ7XG5cbiAgICAgIC8vIEhhbmRsZSBzdGF0ZVxuICAgICAgaWYgKCBzdGF0ZVN0cmluZyApIHtcbiAgICAgICAgbGlzdC5hZGQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gc3RhdGUgPSBbIHJlc29sdmVkIHwgcmVqZWN0ZWQgXVxuICAgICAgICAgIHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cbiAgICAgICAgLy8gWyByZWplY3RfbGlzdCB8IHJlc29sdmVfbGlzdCBdLmRpc2FibGU7IHByb2dyZXNzX2xpc3QubG9ja1xuICAgICAgICB9LCB0dXBsZXNbIGkgXiAxIF1bIDIgXS5kaXNhYmxlLCB0dXBsZXNbIDIgXVsgMiBdLmxvY2sgKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVmZXJyZWRbIHJlc29sdmUgfCByZWplY3QgfCBub3RpZnkgXVxuICAgICAgZGVmZXJyZWRbIHR1cGxlWzBdIF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVmZXJyZWRbIHR1cGxlWzBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyBwcm9taXNlIDogdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfTtcbiAgICAgIGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuICAgIH0pO1xuXG4gICAgLy8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG4gICAgcHJvbWlzZS5wcm9taXNlKCBkZWZlcnJlZCApO1xuXG4gICAgLy8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxuICAgIGlmICggZnVuYyApIHtcbiAgICAgIGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XG4gICAgfVxuXG4gICAgLy8gQWxsIGRvbmUhXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuICB9LFxuXG4gIC8vIERlZmVycmVkIGhlbHBlclxuICB3aGVuOiBmdW5jdGlvbiggc3Vib3JkaW5hdGUgLyogLCAuLi4sIHN1Ym9yZGluYXRlTiAqLyApIHtcbiAgICB2YXIgaSA9IDAsXG4gICAgICByZXNvbHZlVmFsdWVzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG4gICAgICBsZW5ndGggPSByZXNvbHZlVmFsdWVzLmxlbmd0aCxcblxuICAgICAgLy8gdGhlIGNvdW50IG9mIHVuY29tcGxldGVkIHN1Ym9yZGluYXRlc1xuICAgICAgcmVtYWluaW5nID0gbGVuZ3RoICE9PSAxIHx8ICggc3Vib3JkaW5hdGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHN1Ym9yZGluYXRlLnByb21pc2UgKSApID8gbGVuZ3RoIDogMCxcblxuICAgICAgLy8gdGhlIG1hc3RlciBEZWZlcnJlZC4gSWYgcmVzb2x2ZVZhbHVlcyBjb25zaXN0IG9mIG9ubHkgYSBzaW5nbGUgRGVmZXJyZWQsIGp1c3QgdXNlIHRoYXQuXG4gICAgICBkZWZlcnJlZCA9IHJlbWFpbmluZyA9PT0gMSA/IHN1Ym9yZGluYXRlIDogalF1ZXJ5LkRlZmVycmVkKCksXG5cbiAgICAgIC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3IgYm90aCByZXNvbHZlIGFuZCBwcm9ncmVzcyB2YWx1ZXNcbiAgICAgIHVwZGF0ZUZ1bmMgPSBmdW5jdGlvbiggaSwgY29udGV4dHMsIHZhbHVlcyApIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICBjb250ZXh0c1sgaSBdID0gdGhpcztcbiAgICAgICAgICB2YWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcbiAgICAgICAgICBpZiAoIHZhbHVlcyA9PT0gcHJvZ3Jlc3NWYWx1ZXMgKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKCAhKC0tcmVtYWluaW5nKSApIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgcHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcblxuICAgIC8vIGFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcbiAgICBpZiAoIGxlbmd0aCA+IDEgKSB7XG4gICAgICBwcm9ncmVzc1ZhbHVlcyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG4gICAgICBwcm9ncmVzc0NvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcbiAgICAgIHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XG4gICAgICAgICAgcmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UoKVxuICAgICAgICAgICAgLmRvbmUoIHVwZGF0ZUZ1bmMoIGksIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApIClcbiAgICAgICAgICAgIC5mYWlsKCBkZWZlcnJlZC5yZWplY3QgKVxuICAgICAgICAgICAgLnByb2dyZXNzKCB1cGRhdGVGdW5jKCBpLCBwcm9ncmVzc0NvbnRleHRzLCBwcm9ncmVzc1ZhbHVlcyApICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLS1yZW1haW5pbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXG4gICAgaWYgKCAhcmVtYWluaW5nICkge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gIH1cbn0pO1xuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxudmFyIHJlYWR5TGlzdDtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuICAvLyBBZGQgdGhlIGNhbGxiYWNrXG4gIGpRdWVyeS5yZWFkeS5wcm9taXNlKCkuZG9uZSggZm4gKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuICAvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuICBpc1JlYWR5OiBmYWxzZSxcblxuICAvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG4gIC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG4gIHJlYWR5V2FpdDogMSxcblxuICAvLyBIb2xkIChvciByZWxlYXNlKSB0aGUgcmVhZHkgZXZlbnRcbiAgaG9sZFJlYWR5OiBmdW5jdGlvbiggaG9sZCApIHtcbiAgICBpZiAoIGhvbGQgKSB7XG4gICAgICBqUXVlcnkucmVhZHlXYWl0Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpRdWVyeS5yZWFkeSggdHJ1ZSApO1xuICAgIH1cbiAgfSxcblxuICAvLyBIYW5kbGUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG4gIHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuICAgIC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcbiAgICBpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgYm9keSBleGlzdHMsIGF0IGxlYXN0LCBpbiBjYXNlIElFIGdldHMgYSBsaXR0bGUgb3ZlcnplYWxvdXMgKHRpY2tldCAjNTQ0MykuXG4gICAgaWYgKCAhZG9jdW1lbnQuYm9keSApIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcbiAgICB9XG5cbiAgICAvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcbiAgICBqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cbiAgICAvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuICAgIGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBmdW5jdGlvbnMgYm91bmQsIHRvIGV4ZWN1dGVcbiAgICByZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG5cbiAgICAvLyBUcmlnZ2VyIGFueSBib3VuZCByZWFkeSBldmVudHNcbiAgICBpZiAoIGpRdWVyeS5mbi50cmlnZ2VyICkge1xuICAgICAgalF1ZXJ5KCBkb2N1bWVudCApLnRyaWdnZXIoXCJyZWFkeVwiKS5vZmYoXCJyZWFkeVwiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIENsZWFuLXVwIG1ldGhvZCBmb3IgZG9tIHJlYWR5IGV2ZW50c1xuICovXG5mdW5jdGlvbiBkZXRhY2goKSB7XG4gIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuZGV0YWNoRXZlbnQoIFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCApO1xuICAgIHdpbmRvdy5kZXRhY2hFdmVudCggXCJvbmxvYWRcIiwgY29tcGxldGVkICk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG4gIC8vIHJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiBpcyBnb29kIGVub3VnaCBmb3IgdXMgdG8gY2FsbCB0aGUgZG9tIHJlYWR5IGluIG9sZElFXG4gIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciB8fCBldmVudC50eXBlID09PSBcImxvYWRcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG4gICAgZGV0YWNoKCk7XG4gICAgalF1ZXJ5LnJlYWR5KCk7XG4gIH1cbn1cblxualF1ZXJ5LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbiggb2JqICkge1xuICBpZiAoICFyZWFkeUxpc3QgKSB7XG5cbiAgICByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgIC8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuICAgIC8vIHdlIG9uY2UgdHJpZWQgdG8gdXNlIHJlYWR5U3RhdGUgXCJpbnRlcmFjdGl2ZVwiIGhlcmUsIGJ1dCBpdCBjYXVzZWQgaXNzdWVzIGxpa2UgdGhlIG9uZVxuICAgIC8vIGRpc2NvdmVyZWQgYnkgQ2hyaXNTIGhlcmU6IGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjgyI2NvbW1lbnQ6MTVcbiAgICBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcbiAgICAgIC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuICAgICAgc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbiAgICAvLyBTdGFuZGFyZHMtYmFzZWQgYnJvd3NlcnMgc3VwcG9ydCBET01Db250ZW50TG9hZGVkXG4gICAgfSBlbHNlIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgIC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQsIGZhbHNlICk7XG5cbiAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcblxuICAgIC8vIElmIElFIGV2ZW50IG1vZGVsIGlzIHVzZWRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRW5zdXJlIGZpcmluZyBiZWZvcmUgb25sb2FkLCBtYXliZSBsYXRlIGJ1dCBzYWZlIGFsc28gZm9yIGlmcmFtZXNcbiAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCBjb21wbGV0ZWQgKTtcblxuICAgICAgLy8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcbiAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCggXCJvbmxvYWRcIiwgY29tcGxldGVkICk7XG5cbiAgICAgIC8vIElmIElFIGFuZCBub3QgYSBmcmFtZVxuICAgICAgLy8gY29udGludWFsbHkgY2hlY2sgdG8gc2VlIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkeVxuICAgICAgdmFyIHRvcCA9IGZhbHNlO1xuXG4gICAgICB0cnkge1xuICAgICAgICB0b3AgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID09IG51bGwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgfSBjYXRjaChlKSB7fVxuXG4gICAgICBpZiAoIHRvcCAmJiB0b3AuZG9TY3JvbGwgKSB7XG4gICAgICAgIChmdW5jdGlvbiBkb1Njcm9sbENoZWNrKCkge1xuICAgICAgICAgIGlmICggIWpRdWVyeS5pc1JlYWR5ICkge1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIHRyaWNrIGJ5IERpZWdvIFBlcmluaVxuICAgICAgICAgICAgICAvLyBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vSUVDb250ZW50TG9hZGVkL1xuICAgICAgICAgICAgICB0b3AuZG9TY3JvbGwoXCJsZWZ0XCIpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCBkb1Njcm9sbENoZWNrLCA1MCApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZXRhY2ggYWxsIGRvbSByZWFkeSBldmVudHNcbiAgICAgICAgICAgIGRldGFjaCgpO1xuXG4gICAgICAgICAgICAvLyBhbmQgZXhlY3V0ZSBhbnkgd2FpdGluZyBmdW5jdGlvbnNcbiAgICAgICAgICAgIGpRdWVyeS5yZWFkeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlYWR5TGlzdC5wcm9taXNlKCBvYmogKTtcbn07XG5cblxudmFyIHN0cnVuZGVmaW5lZCA9IHR5cGVvZiB1bmRlZmluZWQ7XG5cblxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBJdGVyYXRpb24gb3ZlciBvYmplY3QncyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgaXRzIG93blxudmFyIGk7XG5mb3IgKCBpIGluIGpRdWVyeSggc3VwcG9ydCApICkge1xuICBicmVhaztcbn1cbnN1cHBvcnQub3duTGFzdCA9IGkgIT09IFwiMFwiO1xuXG4vLyBOb3RlOiBtb3N0IHN1cHBvcnQgdGVzdHMgYXJlIGRlZmluZWQgaW4gdGhlaXIgcmVzcGVjdGl2ZSBtb2R1bGVzLlxuLy8gZmFsc2UgdW50aWwgdGhlIHRlc3QgaXMgcnVuXG5zdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgPSBmYWxzZTtcblxualF1ZXJ5KGZ1bmN0aW9uKCkge1xuICAvLyBXZSBuZWVkIHRvIGV4ZWN1dGUgdGhpcyBvbmUgc3VwcG9ydCB0ZXN0IEFTQVAgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3dcbiAgLy8gaWYgYm9keS5zdHlsZS56b29tIG5lZWRzIHRvIGJlIHNldC5cblxuICB2YXIgY29udGFpbmVyLCBkaXYsXG4gICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTtcblxuICBpZiAoICFib2R5ICkge1xuICAgIC8vIFJldHVybiBmb3IgZnJhbWVzZXQgZG9jcyB0aGF0IGRvbid0IGhhdmUgYSBib2R5XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gU2V0dXBcbiAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0Oi05OTk5cHg7bWFyZ2luLXRvcDoxcHhcIjtcblxuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICBpZiAoIHR5cGVvZiBkaXYuc3R5bGUuem9vbSAhPT0gc3RydW5kZWZpbmVkICkge1xuICAgIC8vIFN1cHBvcnQ6IElFPDhcbiAgICAvLyBDaGVjayBpZiBuYXRpdmVseSBibG9jay1sZXZlbCBlbGVtZW50cyBhY3QgbGlrZSBpbmxpbmUtYmxvY2tcbiAgICAvLyBlbGVtZW50cyB3aGVuIHNldHRpbmcgdGhlaXIgZGlzcGxheSB0byAnaW5saW5lJyBhbmQgZ2l2aW5nXG4gICAgLy8gdGhlbSBsYXlvdXRcbiAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOjA7bWFyZ2luOjA7d2lkdGg6MXB4O3BhZGRpbmc6MXB4O2Rpc3BsYXk6aW5saW5lO3pvb206MVwiO1xuXG4gICAgaWYgKCAoc3VwcG9ydC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0ID0gKCBkaXYub2Zmc2V0V2lkdGggPT09IDMgKSkgKSB7XG4gICAgICAvLyBQcmV2ZW50IElFIDYgZnJvbSBhZmZlY3RpbmcgbGF5b3V0IGZvciBwb3NpdGlvbmVkIGVsZW1lbnRzICMxMTA0OFxuICAgICAgLy8gUHJldmVudCBJRSBmcm9tIHNocmlua2luZyB0aGUgYm9keSBpbiBJRSA3IG1vZGUgIzEyODY5XG4gICAgICAvLyBTdXBwb3J0OiBJRTw4XG4gICAgICBib2R5LnN0eWxlLnpvb20gPSAxO1xuICAgIH1cbiAgfVxuXG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXG4gIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUVcbiAgY29udGFpbmVyID0gZGl2ID0gbnVsbDtcbn0pO1xuXG5cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cbiAgLy8gRXhlY3V0ZSB0aGUgdGVzdCBvbmx5IGlmIG5vdCBhbHJlYWR5IGV4ZWN1dGVkIGluIGFub3RoZXIgbW9kdWxlLlxuICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGRpdi50ZXN0O1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBkaXYgPSBudWxsO1xufSkoKTtcblxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhbiBvYmplY3QgY2FuIGhhdmUgZGF0YVxuICovXG5qUXVlcnkuYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgbm9EYXRhID0galF1ZXJ5Lm5vRGF0YVsgKGVsZW0ubm9kZU5hbWUgKyBcIiBcIikudG9Mb3dlckNhc2UoKSBdLFxuICAgIG5vZGVUeXBlID0gK2VsZW0ubm9kZVR5cGUgfHwgMTtcblxuICAvLyBEbyBub3Qgc2V0IGRhdGEgb24gbm9uLWVsZW1lbnQgRE9NIG5vZGVzIGJlY2F1c2UgaXQgd2lsbCBub3QgYmUgY2xlYXJlZCAoIzgzMzUpLlxuICByZXR1cm4gbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgP1xuICAgIGZhbHNlIDpcblxuICAgIC8vIE5vZGVzIGFjY2VwdCBkYXRhIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkOyByZWplY3Rpb24gY2FuIGJlIGNvbmRpdGlvbmFsXG4gICAgIW5vRGF0YSB8fCBub0RhdGEgIT09IHRydWUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc2lkXCIpID09PSBub0RhdGE7XG59O1xuXG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG4gIHJtdWx0aURhc2ggPSAvKFtBLVpdKS9nO1xuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuICAvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG4gIC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuICBpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG4gICAgdmFyIG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJDFcIiApLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblxuICAgIGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gZGF0YSA9PT0gXCJ0cnVlXCIgPyB0cnVlIDpcbiAgICAgICAgICBkYXRhID09PSBcImZhbHNlXCIgPyBmYWxzZSA6XG4gICAgICAgICAgZGF0YSA9PT0gXCJudWxsXCIgPyBudWxsIDpcbiAgICAgICAgICAvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuICAgICAgICAgICtkYXRhICsgXCJcIiA9PT0gZGF0YSA/ICtkYXRhIDpcbiAgICAgICAgICByYnJhY2UudGVzdCggZGF0YSApID8galF1ZXJ5LnBhcnNlSlNPTiggZGF0YSApIDpcbiAgICAgICAgICBkYXRhO1xuICAgICAgfSBjYXRjaCggZSApIHt9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIGtleSwgZGF0YSApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8vIGNoZWNrcyBhIGNhY2hlIG9iamVjdCBmb3IgZW1wdGluZXNzXG5mdW5jdGlvbiBpc0VtcHR5RGF0YU9iamVjdCggb2JqICkge1xuICB2YXIgbmFtZTtcbiAgZm9yICggbmFtZSBpbiBvYmogKSB7XG5cbiAgICAvLyBpZiB0aGUgcHVibGljIGRhdGEgb2JqZWN0IGlzIGVtcHR5LCB0aGUgcHJpdmF0ZSBpcyBzdGlsbCBlbXB0eVxuICAgIGlmICggbmFtZSA9PT0gXCJkYXRhXCIgJiYgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9ialtuYW1lXSApICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICggbmFtZSAhPT0gXCJ0b0pTT05cIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxEYXRhKCBlbGVtLCBuYW1lLCBkYXRhLCBwdnQgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG4gIGlmICggIWpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJldCwgdGhpc0NhY2hlLFxuICAgIGludGVybmFsS2V5ID0galF1ZXJ5LmV4cGFuZG8sXG5cbiAgICAvLyBXZSBoYXZlIHRvIGhhbmRsZSBET00gbm9kZXMgYW5kIEpTIG9iamVjdHMgZGlmZmVyZW50bHkgYmVjYXVzZSBJRTYtN1xuICAgIC8vIGNhbid0IEdDIG9iamVjdCByZWZlcmVuY2VzIHByb3Blcmx5IGFjcm9zcyB0aGUgRE9NLUpTIGJvdW5kYXJ5XG4gICAgaXNOb2RlID0gZWxlbS5ub2RlVHlwZSxcblxuICAgIC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgdGhlIGdsb2JhbCBqUXVlcnkgY2FjaGU7IEpTIG9iamVjdCBkYXRhIGlzXG4gICAgLy8gYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIG9iamVjdCBzbyBHQyBjYW4gb2NjdXIgYXV0b21hdGljYWxseVxuICAgIGNhY2hlID0gaXNOb2RlID8galF1ZXJ5LmNhY2hlIDogZWxlbSxcblxuICAgIC8vIE9ubHkgZGVmaW5pbmcgYW4gSUQgZm9yIEpTIG9iamVjdHMgaWYgaXRzIGNhY2hlIGFscmVhZHkgZXhpc3RzIGFsbG93c1xuICAgIC8vIHRoZSBjb2RlIHRvIHNob3J0Y3V0IG9uIHRoZSBzYW1lIHBhdGggYXMgYSBET00gbm9kZSB3aXRoIG5vIGNhY2hlXG4gICAgaWQgPSBpc05vZGUgPyBlbGVtWyBpbnRlcm5hbEtleSBdIDogZWxlbVsgaW50ZXJuYWxLZXkgXSAmJiBpbnRlcm5hbEtleTtcblxuICAvLyBBdm9pZCBkb2luZyBhbnkgbW9yZSB3b3JrIHRoYW4gd2UgbmVlZCB0byB3aGVuIHRyeWluZyB0byBnZXQgZGF0YSBvbiBhblxuICAvLyBvYmplY3QgdGhhdCBoYXMgbm8gZGF0YSBhdCBhbGxcbiAgaWYgKCAoIWlkIHx8ICFjYWNoZVtpZF0gfHwgKCFwdnQgJiYgIWNhY2hlW2lkXS5kYXRhKSkgJiYgZGF0YSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICggIWlkICkge1xuICAgIC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgYSBuZXcgdW5pcXVlIElEIGZvciBlYWNoIGVsZW1lbnQgc2luY2UgdGhlaXIgZGF0YVxuICAgIC8vIGVuZHMgdXAgaW4gdGhlIGdsb2JhbCBjYWNoZVxuICAgIGlmICggaXNOb2RlICkge1xuICAgICAgaWQgPSBlbGVtWyBpbnRlcm5hbEtleSBdID0gZGVsZXRlZElkcy5wb3AoKSB8fCBqUXVlcnkuZ3VpZCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IGludGVybmFsS2V5O1xuICAgIH1cbiAgfVxuXG4gIGlmICggIWNhY2hlWyBpZCBdICkge1xuICAgIC8vIEF2b2lkIGV4cG9zaW5nIGpRdWVyeSBtZXRhZGF0YSBvbiBwbGFpbiBKUyBvYmplY3RzIHdoZW4gdGhlIG9iamVjdFxuICAgIC8vIGlzIHNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnlcbiAgICBjYWNoZVsgaWQgXSA9IGlzTm9kZSA/IHt9IDogeyB0b0pTT046IGpRdWVyeS5ub29wIH07XG4gIH1cblxuICAvLyBBbiBvYmplY3QgY2FuIGJlIHBhc3NlZCB0byBqUXVlcnkuZGF0YSBpbnN0ZWFkIG9mIGEga2V5L3ZhbHVlIHBhaXI7IHRoaXMgZ2V0c1xuICAvLyBzaGFsbG93IGNvcGllZCBvdmVyIG9udG8gdGhlIGV4aXN0aW5nIGNhY2hlXG4gIGlmICggdHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICBpZiAoIHB2dCApIHtcbiAgICAgIGNhY2hlWyBpZCBdID0galF1ZXJ5LmV4dGVuZCggY2FjaGVbIGlkIF0sIG5hbWUgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVbIGlkIF0uZGF0YSA9IGpRdWVyeS5leHRlbmQoIGNhY2hlWyBpZCBdLmRhdGEsIG5hbWUgKTtcbiAgICB9XG4gIH1cblxuICB0aGlzQ2FjaGUgPSBjYWNoZVsgaWQgXTtcblxuICAvLyBqUXVlcnkgZGF0YSgpIGlzIHN0b3JlZCBpbiBhIHNlcGFyYXRlIG9iamVjdCBpbnNpZGUgdGhlIG9iamVjdCdzIGludGVybmFsIGRhdGFcbiAgLy8gY2FjaGUgaW4gb3JkZXIgdG8gYXZvaWQga2V5IGNvbGxpc2lvbnMgYmV0d2VlbiBpbnRlcm5hbCBkYXRhIGFuZCB1c2VyLWRlZmluZWRcbiAgLy8gZGF0YS5cbiAgaWYgKCAhcHZ0ICkge1xuICAgIGlmICggIXRoaXNDYWNoZS5kYXRhICkge1xuICAgICAgdGhpc0NhY2hlLmRhdGEgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzQ2FjaGUgPSB0aGlzQ2FjaGUuZGF0YTtcbiAgfVxuXG4gIGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuICAgIHRoaXNDYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApIF0gPSBkYXRhO1xuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIGJvdGggY29udmVydGVkLXRvLWNhbWVsIGFuZCBub24tY29udmVydGVkIGRhdGEgcHJvcGVydHkgbmFtZXNcbiAgLy8gSWYgYSBkYXRhIHByb3BlcnR5IHdhcyBzcGVjaWZpZWRcbiAgaWYgKCB0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuICAgIC8vIEZpcnN0IFRyeSB0byBmaW5kIGFzLWlzIHByb3BlcnR5IGRhdGFcbiAgICByZXQgPSB0aGlzQ2FjaGVbIG5hbWUgXTtcblxuICAgIC8vIFRlc3QgZm9yIG51bGx8dW5kZWZpbmVkIHByb3BlcnR5IGRhdGFcbiAgICBpZiAoIHJldCA9PSBudWxsICkge1xuXG4gICAgICAvLyBUcnkgdG8gZmluZCB0aGUgY2FtZWxDYXNlZCBwcm9wZXJ0eVxuICAgICAgcmV0ID0gdGhpc0NhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICkgXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gdGhpc0NhY2hlO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lLCBwdnQgKSB7XG4gIGlmICggIWpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRoaXNDYWNoZSwgaSxcbiAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxuXG4gICAgLy8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgY2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxuICAgIGlkID0gaXNOb2RlID8gZWxlbVsgalF1ZXJ5LmV4cGFuZG8gXSA6IGpRdWVyeS5leHBhbmRvO1xuXG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgbm8gY2FjaGUgZW50cnkgZm9yIHRoaXMgb2JqZWN0LCB0aGVyZSBpcyBub1xuICAvLyBwdXJwb3NlIGluIGNvbnRpbnVpbmdcbiAgaWYgKCAhY2FjaGVbIGlkIF0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCBuYW1lICkge1xuXG4gICAgdGhpc0NhY2hlID0gcHZ0ID8gY2FjaGVbIGlkIF0gOiBjYWNoZVsgaWQgXS5kYXRhO1xuXG4gICAgaWYgKCB0aGlzQ2FjaGUgKSB7XG5cbiAgICAgIC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBuYW1lcyBmb3IgZGF0YSBrZXlzXG4gICAgICBpZiAoICFqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuXG4gICAgICAgIC8vIHRyeSB0aGUgc3RyaW5nIGFzIGEga2V5IGJlZm9yZSBhbnkgbWFuaXB1bGF0aW9uXG4gICAgICAgIGlmICggbmFtZSBpbiB0aGlzQ2FjaGUgKSB7XG4gICAgICAgICAgbmFtZSA9IFsgbmFtZSBdO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gc3BsaXQgdGhlIGNhbWVsIGNhc2VkIHZlcnNpb24gYnkgc3BhY2VzIHVubGVzcyBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzXG4gICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcbiAgICAgICAgICBpZiAoIG5hbWUgaW4gdGhpc0NhY2hlICkge1xuICAgICAgICAgICAgbmFtZSA9IFsgbmFtZSBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBcIm5hbWVcIiBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG4gICAgICAgIC8vIFdoZW4gZGF0YSBpcyBpbml0aWFsbHkgY3JlYXRlZCwgdmlhIChcImtleVwiLCBcInZhbFwiKSBzaWduYXR1cmUsXG4gICAgICAgIC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxuICAgICAgICAvLyBTaW5jZSB0aGVyZSBpcyBubyB3YXkgdG8gdGVsbCBfaG93XyBhIGtleSB3YXMgYWRkZWQsIHJlbW92ZVxuICAgICAgICAvLyBib3RoIHBsYWluIGtleSBhbmQgY2FtZWxDYXNlIGtleS4gIzEyNzg2XG4gICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxuICAgICAgICBuYW1lID0gbmFtZS5jb25jYXQoIGpRdWVyeS5tYXAoIG5hbWUsIGpRdWVyeS5jYW1lbENhc2UgKSApO1xuICAgICAgfVxuXG4gICAgICBpID0gbmFtZS5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGktLSApIHtcbiAgICAgICAgZGVsZXRlIHRoaXNDYWNoZVsgbmFtZVtpXSBdO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIGxlZnQgaW4gdGhlIGNhY2hlLCB3ZSB3YW50IHRvIGNvbnRpbnVlXG4gICAgICAvLyBhbmQgbGV0IHRoZSBjYWNoZSBvYmplY3QgaXRzZWxmIGdldCBkZXN0cm95ZWRcbiAgICAgIGlmICggcHZ0ID8gIWlzRW1wdHlEYXRhT2JqZWN0KHRoaXNDYWNoZSkgOiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QodGhpc0NhY2hlKSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNlZSBqUXVlcnkuZGF0YSBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICBpZiAoICFwdnQgKSB7XG4gICAgZGVsZXRlIGNhY2hlWyBpZCBdLmRhdGE7XG5cbiAgICAvLyBEb24ndCBkZXN0cm95IHRoZSBwYXJlbnQgY2FjaGUgdW5sZXNzIHRoZSBpbnRlcm5hbCBkYXRhIG9iamVjdFxuICAgIC8vIGhhZCBiZWVuIHRoZSBvbmx5IHRoaW5nIGxlZnQgaW4gaXRcbiAgICBpZiAoICFpc0VtcHR5RGF0YU9iamVjdCggY2FjaGVbIGlkIF0gKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvLyBEZXN0cm95IHRoZSBjYWNoZVxuICBpZiAoIGlzTm9kZSApIHtcbiAgICBqUXVlcnkuY2xlYW5EYXRhKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXG4gIC8vIFVzZSBkZWxldGUgd2hlbiBzdXBwb3J0ZWQgZm9yIGV4cGFuZG9zIG9yIGBjYWNoZWAgaXMgbm90IGEgd2luZG93IHBlciBpc1dpbmRvdyAoIzEwMDgwKVxuICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuICB9IGVsc2UgaWYgKCBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gfHwgY2FjaGUgIT0gY2FjaGUud2luZG93ICkge1xuICAgIC8qIGpzaGludCBlcWVxZXE6IHRydWUgKi9cbiAgICBkZWxldGUgY2FjaGVbIGlkIF07XG5cbiAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgbnVsbFxuICB9IGVsc2Uge1xuICAgIGNhY2hlWyBpZCBdID0gbnVsbDtcbiAgfVxufVxuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgY2FjaGU6IHt9LFxuXG4gIC8vIFRoZSBmb2xsb3dpbmcgZWxlbWVudHMgKHNwYWNlLXN1ZmZpeGVkIHRvIGF2b2lkIE9iamVjdC5wcm90b3R5cGUgY29sbGlzaW9ucylcbiAgLy8gdGhyb3cgdW5jYXRjaGFibGUgZXhjZXB0aW9ucyBpZiB5b3UgYXR0ZW1wdCB0byBzZXQgZXhwYW5kbyBwcm9wZXJ0aWVzXG4gIG5vRGF0YToge1xuICAgIFwiYXBwbGV0IFwiOiB0cnVlLFxuICAgIFwiZW1iZWQgXCI6IHRydWUsXG4gICAgLy8gLi4uYnV0IEZsYXNoIG9iamVjdHMgKHdoaWNoIGhhdmUgdGhpcyBjbGFzc2lkKSAqY2FuKiBoYW5kbGUgZXhwYW5kb3NcbiAgICBcIm9iamVjdCBcIjogXCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIlxuICB9LFxuXG4gIGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIGVsZW0gPSBlbGVtLm5vZGVUeXBlID8galF1ZXJ5LmNhY2hlWyBlbGVtW2pRdWVyeS5leHBhbmRvXSBdIDogZWxlbVsgalF1ZXJ5LmV4cGFuZG8gXTtcbiAgICByZXR1cm4gISFlbGVtICYmICFpc0VtcHR5RGF0YU9iamVjdCggZWxlbSApO1xuICB9LFxuXG4gIGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuICAgIHJldHVybiBpbnRlcm5hbERhdGEoIGVsZW0sIG5hbWUsIGRhdGEgKTtcbiAgfSxcblxuICByZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICByZXR1cm4gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lICk7XG4gIH0sXG5cbiAgLy8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICBfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG4gICAgcmV0dXJuIGludGVybmFsRGF0YSggZWxlbSwgbmFtZSwgZGF0YSwgdHJ1ZSApO1xuICB9LFxuXG4gIF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICByZXR1cm4gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lLCB0cnVlICk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG4gICAgdmFyIGksIG5hbWUsIGRhdGEsXG4gICAgICBlbGVtID0gdGhpc1swXSxcbiAgICAgIGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cbiAgICAvLyBTcGVjaWFsIGV4cGVjdGlvbnMgb2YgLmRhdGEgYmFzaWNhbGx5IHRod2FydCBqUXVlcnkuYWNjZXNzLFxuICAgIC8vIHNvIGltcGxlbWVudCB0aGUgcmVsZXZhbnQgYmVoYXZpb3Igb3Vyc2VsdmVzXG5cbiAgICAvLyBHZXRzIGFsbCB2YWx1ZXNcbiAgICBpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgaWYgKCB0aGlzLmxlbmd0aCApIHtcbiAgICAgICAgZGF0YSA9IGpRdWVyeS5kYXRhKCBlbGVtICk7XG5cbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFqUXVlcnkuX2RhdGEoIGVsZW0sIFwicGFyc2VkQXR0cnNcIiApICkge1xuICAgICAgICAgIGkgPSBhdHRycy5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgICBuYW1lID0gYXR0cnNbaV0ubmFtZTtcblxuICAgICAgICAgICAgaWYgKCBuYW1lLmluZGV4T2YoXCJkYXRhLVwiKSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUuc2xpY2UoNSkgKTtcblxuICAgICAgICAgICAgICBkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJwYXJzZWRBdHRyc1wiLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLy8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcbiAgICBpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGF0YSggdGhpcywga2V5ICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDEgP1xuXG4gICAgICAvLyBTZXRzIG9uZSB2YWx1ZVxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGF0YSggdGhpcywga2V5LCB2YWx1ZSApO1xuICAgICAgfSkgOlxuXG4gICAgICAvLyBHZXRzIG9uZSB2YWx1ZVxuICAgICAgLy8gVHJ5IHRvIGZldGNoIGFueSBpbnRlcm5hbGx5IHN0b3JlZCBkYXRhIGZpcnN0XG4gICAgICBlbGVtID8gZGF0YUF0dHIoIGVsZW0sIGtleSwgalF1ZXJ5LmRhdGEoIGVsZW0sIGtleSApICkgOiB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMsIGtleSApO1xuICAgIH0pO1xuICB9XG59KTtcblxuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xuICAgIHZhciBxdWV1ZTtcblxuICAgIGlmICggZWxlbSApIHtcbiAgICAgIHR5cGUgPSAoIHR5cGUgfHwgXCJmeFwiICkgKyBcInF1ZXVlXCI7XG4gICAgICBxdWV1ZSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgdHlwZSApO1xuXG4gICAgICAvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXG4gICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgIGlmICggIXF1ZXVlIHx8IGpRdWVyeS5pc0FycmF5KGRhdGEpICkge1xuICAgICAgICAgIHF1ZXVlID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KGRhdGEpICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVldWUucHVzaCggZGF0YSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcXVldWUgfHwgW107XG4gICAgfVxuICB9LFxuXG4gIGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICAgIHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuICAgICAgc3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG4gICAgICBmbiA9IHF1ZXVlLnNoaWZ0KCksXG4gICAgICBob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuICAgICAgbmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuICAgICAgfTtcblxuICAgIC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcbiAgICBpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcbiAgICAgIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIHN0YXJ0TGVuZ3RoLS07XG4gICAgfVxuXG4gICAgaWYgKCBmbiApIHtcblxuICAgICAgLy8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuICAgICAgLy8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuICAgICAgaWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG4gICAgICAgIHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cbiAgICAgIGRlbGV0ZSBob29rcy5zdG9wO1xuICAgICAgZm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcbiAgICB9XG5cbiAgICBpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcbiAgICAgIGhvb2tzLmVtcHR5LmZpcmUoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gbm90IGludGVuZGVkIGZvciBwdWJsaWMgY29uc3VtcHRpb24gLSBnZW5lcmF0ZXMgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJucyB0aGUgY3VycmVudCBvbmVcbiAgX3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuICAgIHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG4gICAgcmV0dXJuIGpRdWVyeS5fZGF0YSggZWxlbSwga2V5ICkgfHwgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBrZXksIHtcbiAgICAgIGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIHR5cGUgKyBcInF1ZXVlXCIgKTtcbiAgICAgICAgalF1ZXJ5Ll9yZW1vdmVEYXRhKCBlbGVtLCBrZXkgKTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgcXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuICAgIHZhciBzZXR0ZXIgPSAyO1xuXG4gICAgaWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIGRhdGEgPSB0eXBlO1xuICAgICAgdHlwZSA9IFwiZnhcIjtcbiAgICAgIHNldHRlci0tO1xuICAgIH1cblxuICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcbiAgICAgIHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbMF0sIHR5cGUgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHRoaXMgOlxuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuICAgICAgICAvLyBlbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuICAgICAgICBqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVswXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG4gICAgICAgICAgalF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0sXG4gIGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuICAgIH0pO1xuICB9LFxuICBjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG4gIH0sXG4gIC8vIEdldCBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiBxdWV1ZXMgb2YgYSBjZXJ0YWluIHR5cGVcbiAgLy8gYXJlIGVtcHRpZWQgKGZ4IGlzIHRoZSB0eXBlIGJ5IGRlZmF1bHQpXG4gIHByb21pc2U6IGZ1bmN0aW9uKCB0eXBlLCBvYmogKSB7XG4gICAgdmFyIHRtcCxcbiAgICAgIGNvdW50ID0gMSxcbiAgICAgIGRlZmVyID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICBlbGVtZW50cyA9IHRoaXMsXG4gICAgICBpID0gdGhpcy5sZW5ndGgsXG4gICAgICByZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggISggLS1jb3VudCApICkge1xuICAgICAgICAgIGRlZmVyLnJlc29sdmVXaXRoKCBlbGVtZW50cywgWyBlbGVtZW50cyBdICk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICBpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgb2JqID0gdHlwZTtcbiAgICAgIHR5cGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgdG1wID0galF1ZXJ5Ll9kYXRhKCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcbiAgICAgIGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgdG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoIG9iaiApO1xuICB9XG59KTtcbnZhciBwbnVtID0gKC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvKS5zb3VyY2U7XG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuICAgIC8vIGlzSGlkZGVuIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG4gICAgLy8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG4gICAgZWxlbSA9IGVsIHx8IGVsZW07XG4gICAgcmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwibm9uZVwiIHx8ICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuICB9O1xuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBqUXVlcnkuYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuICB2YXIgaSA9IDAsXG4gICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxuICAgIGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuICAvLyBTZXRzIG1hbnkgdmFsdWVzXG4gIGlmICggalF1ZXJ5LnR5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuICAgIGNoYWluYWJsZSA9IHRydWU7XG4gICAgZm9yICggaSBpbiBrZXkgKSB7XG4gICAgICBqUXVlcnkuYWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVtpXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xuICAgIH1cblxuICAvLyBTZXRzIG9uZSB2YWx1ZVxuICB9IGVsc2UgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgIGNoYWluYWJsZSA9IHRydWU7XG5cbiAgICBpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcbiAgICAgIHJhdyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBidWxrICkge1xuICAgICAgLy8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG4gICAgICBpZiAoIHJhdyApIHtcbiAgICAgICAgZm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG4gICAgICAgIGZuID0gbnVsbDtcblxuICAgICAgLy8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVsayA9IGZuO1xuICAgICAgICBmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuICAgICAgICAgIHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggZm4gKSB7XG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgZm4oIGVsZW1zW2ldLCBrZXksIHJhdyA/IHZhbHVlIDogdmFsdWUuY2FsbCggZWxlbXNbaV0sIGksIGZuKCBlbGVtc1tpXSwga2V5ICkgKSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaGFpbmFibGUgP1xuICAgIGVsZW1zIDpcblxuICAgIC8vIEdldHNcbiAgICBidWxrID9cbiAgICAgIGZuLmNhbGwoIGVsZW1zICkgOlxuICAgICAgbGVuZ3RoID8gZm4oIGVsZW1zWzBdLCBrZXkgKSA6IGVtcHR5R2V0O1xufTtcbnZhciByY2hlY2thYmxlVHlwZSA9ICgvXig/OmNoZWNrYm94fHJhZGlvKSQvaSk7XG5cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gIC8vIFNldHVwXG4gIGRpdi5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NOYW1lXCIsIFwidFwiICk7XG4gIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPlwiO1xuXG4gIC8vIElFIHN0cmlwcyBsZWFkaW5nIHdoaXRlc3BhY2Ugd2hlbiAuaW5uZXJIVE1MIGlzIHVzZWRcbiAgc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSA9IGRpdi5maXJzdENoaWxkLm5vZGVUeXBlID09PSAzO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRib2R5IGVsZW1lbnRzIGFyZW4ndCBhdXRvbWF0aWNhbGx5IGluc2VydGVkXG4gIC8vIElFIHdpbGwgaW5zZXJ0IHRoZW0gaW50byBlbXB0eSB0YWJsZXNcbiAgc3VwcG9ydC50Ym9keSA9ICFkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwidGJvZHlcIiApLmxlbmd0aDtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBsaW5rIGVsZW1lbnRzIGdldCBzZXJpYWxpemVkIGNvcnJlY3RseSBieSBpbm5lckhUTUxcbiAgLy8gVGhpcyByZXF1aXJlcyBhIHdyYXBwZXIgZWxlbWVudCBpbiBJRVxuICBzdXBwb3J0Lmh0bWxTZXJpYWxpemUgPSAhIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJsaW5rXCIgKS5sZW5ndGg7XG5cbiAgLy8gTWFrZXMgc3VyZSBjbG9uaW5nIGFuIGh0bWw1IGVsZW1lbnQgZG9lcyBub3QgY2F1c2UgcHJvYmxlbXNcbiAgLy8gV2hlcmUgb3V0ZXJIVE1MIGlzIHVuZGVmaW5lZCwgdGhpcyBzdGlsbCB3b3Jrc1xuICBzdXBwb3J0Lmh0bWw1Q2xvbmUgPVxuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwibmF2XCIgKS5jbG9uZU5vZGUoIHRydWUgKS5vdXRlckhUTUwgIT09IFwiPDpuYXY+PC86bmF2PlwiO1xuXG4gIC8vIENoZWNrIGlmIGEgZGlzY29ubmVjdGVkIGNoZWNrYm94IHdpbGwgcmV0YWluIGl0cyBjaGVja2VkXG4gIC8vIHZhbHVlIG9mIHRydWUgYWZ0ZXIgYXBwZW5kZWQgdG8gdGhlIERPTSAoSUU2LzcpXG4gIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gIGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuICBmcmFnbWVudC5hcHBlbmRDaGlsZCggaW5wdXQgKTtcbiAgc3VwcG9ydC5hcHBlbmRDaGVja2VkID0gaW5wdXQuY2hlY2tlZDtcblxuICAvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuICAvLyBTdXBwb3J0OiBJRTYtSUUxMStcbiAgZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuICBzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcblxuICAvLyAjMTEyMTcgLSBXZWJLaXQgbG9zZXMgY2hlY2sgd2hlbiB0aGUgbmFtZSBpcyBhZnRlciB0aGUgY2hlY2tlZCBhdHRyaWJ1dGVcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRpdiApO1xuICBkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9J2NoZWNrZWQnIG5hbWU9J3QnLz5cIjtcblxuICAvLyBTdXBwb3J0OiBTYWZhcmkgNS4xLCBpT1MgNS4xLCBBbmRyb2lkIDQueCwgQW5kcm9pZCAyLjNcbiAgLy8gb2xkIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuICBzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cbiAgLy8gU3VwcG9ydDogSUU8OVxuICAvLyBPcGVyYSBkb2VzIG5vdCBjbG9uZSBldmVudHMgKGFuZCB0eXBlb2YgZGl2LmF0dGFjaEV2ZW50ID09PSB1bmRlZmluZWQpLlxuICAvLyBJRTktMTAgY2xvbmVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQsIGJ1dCB0aGV5IGRvbid0IHRyaWdnZXIgd2l0aCAuY2xpY2soKVxuICBzdXBwb3J0Lm5vQ2xvbmVFdmVudCA9IHRydWU7XG4gIGlmICggZGl2LmF0dGFjaEV2ZW50ICkge1xuICAgIGRpdi5hdHRhY2hFdmVudCggXCJvbmNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgc3VwcG9ydC5ub0Nsb25lRXZlbnQgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbGljaygpO1xuICB9XG5cbiAgLy8gRXhlY3V0ZSB0aGUgdGVzdCBvbmx5IGlmIG5vdCBhbHJlYWR5IGV4ZWN1dGVkIGluIGFub3RoZXIgbW9kdWxlLlxuICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcbiAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIGRpdi50ZXN0O1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBmcmFnbWVudCA9IGRpdiA9IGlucHV0ID0gbnVsbDtcbn0pKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgaSwgZXZlbnROYW1lLFxuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuICAvLyBTdXBwb3J0OiBJRTw5IChsYWNrIHN1Ym1pdC9jaGFuZ2UgYnViYmxlKSwgRmlyZWZveCAyMysgKGxhY2sgZm9jdXNpbiBldmVudClcbiAgZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgY2hhbmdlOiB0cnVlLCBmb2N1c2luOiB0cnVlIH0pIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBpO1xuXG4gICAgaWYgKCAhKHN1cHBvcnRbIGkgKyBcIkJ1YmJsZXNcIiBdID0gZXZlbnROYW1lIGluIHdpbmRvdykgKSB7XG4gICAgICAvLyBCZXdhcmUgb2YgQ1NQIHJlc3RyaWN0aW9ucyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vU2VjdXJpdHkvQ1NQKVxuICAgICAgZGl2LnNldEF0dHJpYnV0ZSggZXZlbnROYW1lLCBcInRcIiApO1xuICAgICAgc3VwcG9ydFsgaSArIFwiQnViYmxlc1wiIF0gPSBkaXYuYXR0cmlidXRlc1sgZXZlbnROYW1lIF0uZXhwYW5kbyA9PT0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRS5cbiAgZGl2ID0gbnVsbDtcbn0pKCk7XG5cblxudmFyIHJmb3JtRWxlbXMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYSkkL2ksXG4gIHJrZXlFdmVudCA9IC9ea2V5LyxcbiAgcm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfGNvbnRleHRtZW51KXxjbGljay8sXG4gIHJmb2N1c01vcnBoID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLFxuICBydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KSQvO1xuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuICBnbG9iYWw6IHt9LFxuXG4gIGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcbiAgICB2YXIgdG1wLCBldmVudHMsIHQsIGhhbmRsZU9iakluLFxuICAgICAgc3BlY2lhbCwgZXZlbnRIYW5kbGUsIGhhbmRsZU9iaixcbiAgICAgIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcbiAgICAgIGVsZW1EYXRhID0galF1ZXJ5Ll9kYXRhKCBlbGVtICk7XG5cbiAgICAvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuICAgIGlmICggIWVsZW1EYXRhICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuICAgIGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuICAgICAgaGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuICAgICAgaGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG4gICAgICBzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuICAgIGlmICggIWhhbmRsZXIuZ3VpZCApIHtcbiAgICAgIGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG4gICAgfVxuXG4gICAgLy8gSW5pdCB0aGUgZWxlbWVudCdzIGV2ZW50IHN0cnVjdHVyZSBhbmQgbWFpbiBoYW5kbGVyLCBpZiB0aGlzIGlzIHRoZSBmaXJzdFxuICAgIGlmICggIShldmVudHMgPSBlbGVtRGF0YS5ldmVudHMpICkge1xuICAgICAgZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzID0ge307XG4gICAgfVxuICAgIGlmICggIShldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSkgKSB7XG4gICAgICBldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuICAgICAgICAvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuICAgICAgICAvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG4gICAgICAgIHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBzdHJ1bmRlZmluZWQgJiYgKCFlIHx8IGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSkgP1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5kaXNwYXRjaC5hcHBseSggZXZlbnRIYW5kbGUuZWxlbSwgYXJndW1lbnRzICkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgIH07XG4gICAgICAvLyBBZGQgZWxlbSBhcyBhIHByb3BlcnR5IG9mIHRoZSBoYW5kbGUgZm4gdG8gcHJldmVudCBhIG1lbW9yeSBsZWFrIHdpdGggSUUgbm9uLW5hdGl2ZSBldmVudHNcbiAgICAgIGV2ZW50SGFuZGxlLmVsZW0gPSBlbGVtO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2VcbiAgICB0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbIFwiXCIgXTtcbiAgICB0ID0gdHlwZXMubGVuZ3RoO1xuICAgIHdoaWxlICggdC0tICkge1xuICAgICAgdG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbdF0gKSB8fCBbXTtcbiAgICAgIHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsxXTtcbiAgICAgIG5hbWVzcGFjZXMgPSAoIHRtcFsyXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG4gICAgICAvLyBUaGVyZSAqbXVzdCogYmUgYSB0eXBlLCBubyBhdHRhY2hpbmcgbmFtZXNwYWNlLW9ubHkgaGFuZGxlcnNcbiAgICAgIGlmICggIXR5cGUgKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBldmVudCBjaGFuZ2VzIGl0cyB0eXBlLCB1c2UgdGhlIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBjaGFuZ2VkIHR5cGVcbiAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG4gICAgICAvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcbiAgICAgIHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblxuICAgICAgLy8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cbiAgICAgIC8vIGhhbmRsZU9iaiBpcyBwYXNzZWQgdG8gYWxsIGV2ZW50IGhhbmRsZXJzXG4gICAgICBoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgb3JpZ1R5cGU6IG9yaWdUeXBlLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgICBndWlkOiBoYW5kbGVyLmd1aWQsXG4gICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICAgICAgbmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcbiAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oXCIuXCIpXG4gICAgICB9LCBoYW5kbGVPYmpJbiApO1xuXG4gICAgICAvLyBJbml0IHRoZSBldmVudCBoYW5kbGVyIHF1ZXVlIGlmIHdlJ3JlIHRoZSBmaXJzdFxuICAgICAgaWYgKCAhKGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0pICkge1xuICAgICAgICBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XG4gICAgICAgIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQgPSAwO1xuXG4gICAgICAgIC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIvYXR0YWNoRXZlbnQgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxuICAgICAgICBpZiAoICFzcGVjaWFsLnNldHVwIHx8IHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgLy8gQmluZCB0aGUgZ2xvYmFsIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgICBpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUsIGZhbHNlICk7XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKCBlbGVtLmF0dGFjaEV2ZW50ICkge1xuICAgICAgICAgICAgZWxlbS5hdHRhY2hFdmVudCggXCJvblwiICsgdHlwZSwgZXZlbnRIYW5kbGUgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCBzcGVjaWFsLmFkZCApIHtcbiAgICAgICAgc3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cbiAgICAgICAgaWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcbiAgICAgICAgICBoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG4gICAgICBpZiAoIHNlbGVjdG9yICkge1xuICAgICAgICBoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcbiAgICAgIH1cblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuICAgICAgalF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBOdWxsaWZ5IGVsZW0gdG8gcHJldmVudCBtZW1vcnkgbGVha3MgaW4gSUVcbiAgICBlbGVtID0gbnVsbDtcbiAgfSxcblxuICAvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcbiAgcmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcbiAgICB2YXIgaiwgaGFuZGxlT2JqLCB0bXAsXG4gICAgICBvcmlnQ291bnQsIHQsIGV2ZW50cyxcbiAgICAgIHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLFxuICAgICAgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG4gICAgICBlbGVtRGF0YSA9IGpRdWVyeS5oYXNEYXRhKCBlbGVtICkgJiYgalF1ZXJ5Ll9kYXRhKCBlbGVtICk7XG5cbiAgICBpZiAoICFlbGVtRGF0YSB8fCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuICAgIHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuICAgIHQgPSB0eXBlcy5sZW5ndGg7XG4gICAgd2hpbGUgKCB0LS0gKSB7XG4gICAgICB0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuICAgICAgdHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuICAgICAgbmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cbiAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuICAgICAgaWYgKCAhdHlwZSApIHtcbiAgICAgICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuICAgICAgdHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuICAgICAgaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcbiAgICAgIHRtcCA9IHRtcFsyXSAmJiBuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikgKyBcIihcXFxcLnwkKVwiICk7XG5cbiAgICAgIC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcbiAgICAgIG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGotLSApIHtcbiAgICAgICAgaGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuICAgICAgICBpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG4gICAgICAgICAgKCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcbiAgICAgICAgICAoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG4gICAgICAgICAgKCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuICAgICAgICAgIGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG4gICAgICAgICAgaWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG4gICAgICAgICAgICBzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuICAgICAgLy8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG4gICAgICBpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuICAgICAgICBpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8IHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuICAgICAgICAgIGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgZXZlbnRzWyB0eXBlIF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcbiAgICBpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcbiAgICAgIGRlbGV0ZSBlbGVtRGF0YS5oYW5kbGU7XG5cbiAgICAgIC8vIHJlbW92ZURhdGEgYWxzbyBjaGVja3MgZm9yIGVtcHRpbmVzcyBhbmQgY2xlYXJzIHRoZSBleHBhbmRvIGlmIGVtcHR5XG4gICAgICAvLyBzbyB1c2UgaXQgaW5zdGVhZCBvZiBkZWxldGVcbiAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZWxlbSwgXCJldmVudHNcIiApO1xuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyOiBmdW5jdGlvbiggZXZlbnQsIGRhdGEsIGVsZW0sIG9ubHlIYW5kbGVycyApIHtcbiAgICB2YXIgaGFuZGxlLCBvbnR5cGUsIGN1cixcbiAgICAgIGJ1YmJsZVR5cGUsIHNwZWNpYWwsIHRtcCwgaSxcbiAgICAgIGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuICAgICAgdHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcbiAgICAgIG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChcIi5cIikgOiBbXTtcblxuICAgIGN1ciA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG4gICAgLy8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcbiAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcbiAgICBpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCB0eXBlLmluZGV4T2YoXCIuXCIpID49IDAgKSB7XG4gICAgICAvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG4gICAgICBuYW1lc3BhY2VzID0gdHlwZS5zcGxpdChcIi5cIik7XG4gICAgICB0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuICAgICAgbmFtZXNwYWNlcy5zb3J0KCk7XG4gICAgfVxuICAgIG9udHlwZSA9IHR5cGUuaW5kZXhPZihcIjpcIikgPCAwICYmIFwib25cIiArIHR5cGU7XG5cbiAgICAvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcbiAgICBldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cbiAgICAgIGV2ZW50IDpcbiAgICAgIG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG4gICAgLy8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuICAgIGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuICAgIGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihcIi5cIik7XG4gICAgZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cbiAgICAgIG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKSA6XG4gICAgICBudWxsO1xuXG4gICAgLy8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG4gICAgZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmICggIWV2ZW50LnRhcmdldCApIHtcbiAgICAgIGV2ZW50LnRhcmdldCA9IGVsZW07XG4gICAgfVxuXG4gICAgLy8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuICAgIGRhdGEgPSBkYXRhID09IG51bGwgP1xuICAgICAgWyBldmVudCBdIDpcbiAgICAgIGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG4gICAgLy8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuICAgIGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuICAgIC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG4gICAgaWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuICAgICAgYnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG4gICAgICBpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuICAgICAgICBjdXIgPSBjdXIucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcbiAgICAgICAgZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuICAgICAgICB0bXAgPSBjdXI7XG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuICAgICAgaWYgKCB0bXAgPT09IChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpICkge1xuICAgICAgICBldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuICAgIGkgPSAwO1xuICAgIHdoaWxlICggKGN1ciA9IGV2ZW50UGF0aFtpKytdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuICAgICAgZXZlbnQudHlwZSA9IGkgPiAxID9cbiAgICAgICAgYnViYmxlVHlwZSA6XG4gICAgICAgIHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuICAgICAgLy8galF1ZXJ5IGhhbmRsZXJcbiAgICAgIGhhbmRsZSA9ICggalF1ZXJ5Ll9kYXRhKCBjdXIsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gJiYgalF1ZXJ5Ll9kYXRhKCBjdXIsIFwiaGFuZGxlXCIgKTtcbiAgICAgIGlmICggaGFuZGxlICkge1xuICAgICAgICBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuICAgICAgfVxuXG4gICAgICAvLyBOYXRpdmUgaGFuZGxlclxuICAgICAgaGFuZGxlID0gb250eXBlICYmIGN1clsgb250eXBlIF07XG4gICAgICBpZiAoIGhhbmRsZSAmJiBoYW5kbGUuYXBwbHkgJiYgalF1ZXJ5LmFjY2VwdERhdGEoIGN1ciApICkge1xuICAgICAgICBldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuICAgICAgICBpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBldmVudC50eXBlID0gdHlwZTtcblxuICAgIC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcbiAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG4gICAgICBpZiAoICghc3BlY2lhbC5fZGVmYXVsdCB8fCBzcGVjaWFsLl9kZWZhdWx0LmFwcGx5KCBldmVudFBhdGgucG9wKCksIGRhdGEgKSA9PT0gZmFsc2UpICYmXG4gICAgICAgIGpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cbiAgICAgICAgLy8gQ2FsbCBhIG5hdGl2ZSBET00gbWV0aG9kIG9uIHRoZSB0YXJnZXQgd2l0aCB0aGUgc2FtZSBuYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuICAgICAgICAvLyBDYW4ndCB1c2UgYW4gLmlzRnVuY3Rpb24oKSBjaGVjayBoZXJlIGJlY2F1c2UgSUU2LzcgZmFpbHMgdGhhdCB0ZXN0LlxuICAgICAgICAvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG4gICAgICAgIGlmICggb250eXBlICYmIGVsZW1bIHR5cGUgXSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cbiAgICAgICAgICAvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG4gICAgICAgICAgdG1wID0gZWxlbVsgb250eXBlIF07XG5cbiAgICAgICAgICBpZiAoIHRtcCApIHtcbiAgICAgICAgICAgIGVsZW1bIG9udHlwZSBdID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbGVtWyB0eXBlIF0oKTtcbiAgICAgICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgICAgIC8vIElFPDkgZGllcyBvbiBmb2N1cy9ibHVyIHRvIGhpZGRlbiBlbGVtZW50ICgjMTQ4NiwjMTI1MTgpXG4gICAgICAgICAgICAvLyBvbmx5IHJlcHJvZHVjaWJsZSBvbiB3aW5YUCBJRTggbmF0aXZlLCBub3QgSUU5IGluIElFOCBtb2RlXG4gICAgICAgICAgfVxuICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAoIHRtcCApIHtcbiAgICAgICAgICAgIGVsZW1bIG9udHlwZSBdID0gdG1wO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBldmVudC5yZXN1bHQ7XG4gIH0sXG5cbiAgZGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuICAgIC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuICAgIGV2ZW50ID0galF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKTtcblxuICAgIHZhciBpLCByZXQsIGhhbmRsZU9iaiwgbWF0Y2hlZCwgaixcbiAgICAgIGhhbmRsZXJRdWV1ZSA9IFtdLFxuICAgICAgYXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuICAgICAgaGFuZGxlcnMgPSAoIGpRdWVyeS5fZGF0YSggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcbiAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG4gICAgLy8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcbiAgICBhcmdzWzBdID0gZXZlbnQ7XG4gICAgZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG4gICAgLy8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuICAgIGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBoYW5kbGVyc1xuICAgIGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuICAgIC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKCAobWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuICAgICAgaiA9IDA7XG4gICAgICB3aGlsZSAoIChoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSkgJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cbiAgICAgICAgLy8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvclxuICAgICAgICAvLyAyKSBoYXZlIG5hbWVzcGFjZShzKSBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cbiAgICAgICAgaWYgKCAhZXZlbnQubmFtZXNwYWNlX3JlIHx8IGV2ZW50Lm5hbWVzcGFjZV9yZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cbiAgICAgICAgICBldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG4gICAgICAgICAgZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG4gICAgICAgICAgcmV0ID0gKCAoalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9KS5oYW5kbGUgfHwgaGFuZGxlT2JqLmhhbmRsZXIgKVxuICAgICAgICAgICAgICAuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG4gICAgICAgICAgaWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIGlmICggKGV2ZW50LnJlc3VsdCA9IHJldCkgPT09IGZhbHNlICkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG4gICAgaWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcbiAgICAgIHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50LnJlc3VsdDtcbiAgfSxcblxuICBoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcbiAgICB2YXIgc2VsLCBoYW5kbGVPYmosIG1hdGNoZXMsIGksXG4gICAgICBoYW5kbGVyUXVldWUgPSBbXSxcbiAgICAgIGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuICAgICAgY3VyID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgLy8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuICAgIC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXG4gICAgLy8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXG4gICAgaWYgKCBkZWxlZ2F0ZUNvdW50ICYmIGN1ci5ub2RlVHlwZSAmJiAoIWV2ZW50LmJ1dHRvbiB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpICkge1xuXG4gICAgICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xuICAgICAgZm9yICggOyBjdXIgIT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcbiAgICAgICAgLyoganNoaW50IGVxZXFlcTogdHJ1ZSAqL1xuXG4gICAgICAgIC8vIERvbid0IGNoZWNrIG5vbi1lbGVtZW50cyAoIzEzMjA4KVxuICAgICAgICAvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcbiAgICAgICAgaWYgKCBjdXIubm9kZVR5cGUgPT09IDEgJiYgKGN1ci5kaXNhYmxlZCAhPT0gdHJ1ZSB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpICkge1xuICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcbiAgICAgICAgICAgIGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cbiAgICAgICAgICAgIC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG4gICAgICAgICAgICBzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuICAgICAgICAgICAgaWYgKCBtYXRjaGVzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICBtYXRjaGVzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuICAgICAgICAgICAgICAgIGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID49IDAgOlxuICAgICAgICAgICAgICAgIGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIG1hdGNoZXNbIHNlbCBdICkge1xuICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goIGhhbmRsZU9iaiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgaGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcbiAgICBpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG4gICAgICBoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IHRoaXMsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBoYW5kbGVyUXVldWU7XG4gIH0sXG5cbiAgZml4OiBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgaWYgKCBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSApIHtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSB3cml0YWJsZSBjb3B5IG9mIHRoZSBldmVudCBvYmplY3QgYW5kIG5vcm1hbGl6ZSBzb21lIHByb3BlcnRpZXNcbiAgICB2YXIgaSwgcHJvcCwgY29weSxcbiAgICAgIHR5cGUgPSBldmVudC50eXBlLFxuICAgICAgb3JpZ2luYWxFdmVudCA9IGV2ZW50LFxuICAgICAgZml4SG9vayA9IHRoaXMuZml4SG9va3NbIHR5cGUgXTtcblxuICAgIGlmICggIWZpeEhvb2sgKSB7XG4gICAgICB0aGlzLmZpeEhvb2tzWyB0eXBlIF0gPSBmaXhIb29rID1cbiAgICAgICAgcm1vdXNlRXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5tb3VzZUhvb2tzIDpcbiAgICAgICAgcmtleUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMua2V5SG9va3MgOlxuICAgICAgICB7fTtcbiAgICB9XG4gICAgY29weSA9IGZpeEhvb2sucHJvcHMgPyB0aGlzLnByb3BzLmNvbmNhdCggZml4SG9vay5wcm9wcyApIDogdGhpcy5wcm9wcztcblxuICAgIGV2ZW50ID0gbmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXG4gICAgaSA9IGNvcHkubGVuZ3RoO1xuICAgIHdoaWxlICggaS0tICkge1xuICAgICAgcHJvcCA9IGNvcHlbIGkgXTtcbiAgICAgIGV2ZW50WyBwcm9wIF0gPSBvcmlnaW5hbEV2ZW50WyBwcm9wIF07XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUU8OVxuICAgIC8vIEZpeCB0YXJnZXQgcHJvcGVydHkgKCMxOTI1KVxuICAgIGlmICggIWV2ZW50LnRhcmdldCApIHtcbiAgICAgIGV2ZW50LnRhcmdldCA9IG9yaWdpbmFsRXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBDaHJvbWUgMjMrLCBTYWZhcmk/XG4gICAgLy8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0MylcbiAgICBpZiAoIGV2ZW50LnRhcmdldC5ub2RlVHlwZSA9PT0gMyApIHtcbiAgICAgIGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAvLyBGb3IgbW91c2Uva2V5IGV2ZW50cywgbWV0YUtleT09ZmFsc2UgaWYgaXQncyB1bmRlZmluZWQgKCMzMzY4LCAjMTEzMjgpXG4gICAgZXZlbnQubWV0YUtleSA9ICEhZXZlbnQubWV0YUtleTtcblxuICAgIHJldHVybiBmaXhIb29rLmZpbHRlciA/IGZpeEhvb2suZmlsdGVyKCBldmVudCwgb3JpZ2luYWxFdmVudCApIDogZXZlbnQ7XG4gIH0sXG5cbiAgLy8gSW5jbHVkZXMgc29tZSBldmVudCBwcm9wcyBzaGFyZWQgYnkgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnRcbiAgcHJvcHM6IFwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZXZlbnRQaGFzZSBtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIuc3BsaXQoXCIgXCIpLFxuXG4gIGZpeEhvb2tzOiB7fSxcblxuICBrZXlIb29rczoge1xuICAgIHByb3BzOiBcImNoYXIgY2hhckNvZGUga2V5IGtleUNvZGVcIi5zcGxpdChcIiBcIiksXG4gICAgZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXG4gICAgICAvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCApIHtcbiAgICAgICAgZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICB9LFxuXG4gIG1vdXNlSG9va3M6IHtcbiAgICBwcm9wczogXCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgZnJvbUVsZW1lbnQgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIHNjcmVlblggc2NyZWVuWSB0b0VsZW1lbnRcIi5zcGxpdChcIiBcIiksXG4gICAgZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuICAgICAgdmFyIGJvZHksIGV2ZW50RG9jLCBkb2MsXG4gICAgICAgIGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbixcbiAgICAgICAgZnJvbUVsZW1lbnQgPSBvcmlnaW5hbC5mcm9tRWxlbWVudDtcblxuICAgICAgLy8gQ2FsY3VsYXRlIHBhZ2VYL1kgaWYgbWlzc2luZyBhbmQgY2xpZW50WC9ZIGF2YWlsYWJsZVxuICAgICAgaWYgKCBldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCApIHtcbiAgICAgICAgZXZlbnREb2MgPSBldmVudC50YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBib2R5ID0gZXZlbnREb2MuYm9keTtcblxuICAgICAgICBldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoIGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XG4gICAgICAgIGV2ZW50LnBhZ2VZID0gb3JpZ2luYWwuY2xpZW50WSArICggZG9jICYmIGRvYy5zY3JvbGxUb3AgIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgIHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRUb3AgIHx8IGJvZHkgJiYgYm9keS5jbGllbnRUb3AgIHx8IDAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHJlbGF0ZWRUYXJnZXQsIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKCAhZXZlbnQucmVsYXRlZFRhcmdldCAmJiBmcm9tRWxlbWVudCApIHtcbiAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldCA9IGZyb21FbGVtZW50ID09PSBldmVudC50YXJnZXQgPyBvcmlnaW5hbC50b0VsZW1lbnQgOiBmcm9tRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuICAgICAgLy8gTm90ZTogYnV0dG9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyBkb24ndCB1c2UgaXRcbiAgICAgIGlmICggIWV2ZW50LndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICBldmVudC53aGljaCA9ICggYnV0dG9uICYgMSA/IDEgOiAoIGJ1dHRvbiAmIDIgPyAzIDogKCBidXR0b24gJiA0ID8gMiA6IDAgKSApICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gIH0sXG5cbiAgc3BlY2lhbDoge1xuICAgIGxvYWQ6IHtcbiAgICAgIC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcbiAgICAgIG5vQnViYmxlOiB0cnVlXG4gICAgfSxcbiAgICBmb2N1czoge1xuICAgICAgLy8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG4gICAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgICAgICAgIC8vIElmIHdlIGVycm9yIG9uIGZvY3VzIHRvIGhpZGRlbiBlbGVtZW50ICgjMTQ4NiwgIzEyNTE4KSxcbiAgICAgICAgICAgIC8vIGxldCAudHJpZ2dlcigpIHJ1biB0aGUgaGFuZGxlcnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG4gICAgfSxcbiAgICBibHVyOiB7XG4gICAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcbiAgICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuICAgIH0sXG4gICAgY2xpY2s6IHtcbiAgICAgIC8vIEZvciBjaGVja2JveCwgZmlyZSBuYXRpdmUgZXZlbnQgc28gY2hlY2tlZCBzdGF0ZSB3aWxsIGJlIHJpZ2h0XG4gICAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICYmIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgKSB7XG4gICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gRm9yIGNyb3NzLWJyb3dzZXIgY29uc2lzdGVuY3ksIGRvbid0IGZpcmUgbmF0aXZlIC5jbGljaygpIG9uIGxpbmtzXG4gICAgICBfZGVmYXVsdDogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBldmVudC50YXJnZXQsIFwiYVwiICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGJlZm9yZXVubG9hZDoge1xuICAgICAgcG9zdERpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cbiAgICAgICAgLy8gRXZlbiB3aGVuIHJldHVyblZhbHVlIGVxdWFscyB0byB1bmRlZmluZWQgRmlyZWZveCB3aWxsIHN0aWxsIHNob3cgYWxlcnRcbiAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQsIGJ1YmJsZSApIHtcbiAgICAvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmUuXG4gICAgLy8gRmFrZSBvcmlnaW5hbEV2ZW50IHRvIGF2b2lkIGRvbm9yJ3Mgc3RvcFByb3BhZ2F0aW9uLCBidXQgaWYgdGhlXG4gICAgLy8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXG4gICAgdmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuICAgICAgbmV3IGpRdWVyeS5FdmVudCgpLFxuICAgICAgZXZlbnQsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGlzU2ltdWxhdGVkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiB7fVxuICAgICAgfVxuICAgICk7XG4gICAgaWYgKCBidWJibGUgKSB7XG4gICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBqUXVlcnkuZXZlbnQuZGlzcGF0Y2guY2FsbCggZWxlbSwgZSApO1xuICAgIH1cbiAgICBpZiAoIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciA/XG4gIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG4gICAgaWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSwgZmFsc2UgKTtcbiAgICB9XG4gIH0gOlxuICBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuICAgIHZhciBuYW1lID0gXCJvblwiICsgdHlwZTtcblxuICAgIGlmICggZWxlbS5kZXRhY2hFdmVudCApIHtcblxuICAgICAgLy8gIzg1NDUsICM3MDU0LCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrcyBmb3IgY3VzdG9tIGV2ZW50cyBpbiBJRTYtOFxuICAgICAgLy8gZGV0YWNoRXZlbnQgbmVlZGVkIHByb3BlcnR5IG9uIGVsZW1lbnQsIGJ5IG5hbWUgb2YgdGhhdCBldmVudCwgdG8gcHJvcGVybHkgZXhwb3NlIGl0IHRvIEdDXG4gICAgICBpZiAoIHR5cGVvZiBlbGVtWyBuYW1lIF0gPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgICAgZWxlbVsgbmFtZSBdID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgZWxlbS5kZXRhY2hFdmVudCggbmFtZSwgaGFuZGxlICk7XG4gICAgfVxuICB9O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcbiAgLy8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG4gIGlmICggISh0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50KSApIHtcbiAgICByZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuICB9XG5cbiAgLy8gRXZlbnQgb2JqZWN0XG4gIGlmICggc3JjICYmIHNyYy50eXBlICkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcbiAgICB0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuICAgIC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG4gICAgLy8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG4gICAgdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuICAgICAgICBzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgLy8gU3VwcG9ydDogSUUgPCA5XG4gICAgICAgIHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgfHxcbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCA8IDQuMFxuICAgICAgICBzcmMuZ2V0UHJldmVudERlZmF1bHQgJiYgc3JjLmdldFByZXZlbnREZWZhdWx0KCkgKSA/XG4gICAgICByZXR1cm5UcnVlIDpcbiAgICAgIHJldHVybkZhbHNlO1xuXG4gIC8vIEV2ZW50IHR5cGVcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnR5cGUgPSBzcmM7XG4gIH1cblxuICAvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuICBpZiAoIHByb3BzICkge1xuICAgIGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG4gIH1cblxuICAvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuICB0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuICAvLyBNYXJrIGl0IGFzIGZpeGVkXG4gIHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG4gIGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXG4gIGlzUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcbiAgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXG4gIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcbiAgICBpZiAoICFlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHByZXZlbnREZWZhdWx0IGV4aXN0cywgcnVuIGl0IG9uIHRoZSBvcmlnaW5hbCBldmVudFxuICAgIGlmICggZS5wcmV2ZW50RGVmYXVsdCApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFN1cHBvcnQ6IElFXG4gICAgLy8gT3RoZXJ3aXNlIHNldCB0aGUgcmV0dXJuVmFsdWUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cbiAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcbiAgICBpZiAoICFlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBJZiBzdG9wUHJvcGFnYXRpb24gZXhpc3RzLCBydW4gaXQgb24gdGhlIG9yaWdpbmFsIGV2ZW50XG4gICAgaWYgKCBlLnN0b3BQcm9wYWdhdGlvbiApIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUVcbiAgICAvLyBTZXQgdGhlIGNhbmNlbEJ1YmJsZSBwcm9wZXJ0eSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQgdG8gdHJ1ZVxuICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgfSxcbiAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcbiAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59O1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3NcbmpRdWVyeS5lYWNoKHtcbiAgbW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcbiAgbW91c2VsZWF2ZTogXCJtb3VzZW91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuICBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuICAgIGRlbGVnYXRlVHlwZTogZml4LFxuICAgIGJpbmRUeXBlOiBmaXgsXG5cbiAgICBoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgIHZhciByZXQsXG4gICAgICAgIHRhcmdldCA9IHRoaXMsXG4gICAgICAgIHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuICAgICAgICBoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cbiAgICAgIC8vIEZvciBtb3VzZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cbiAgICAgIC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XG4gICAgICBpZiAoICFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkpICkge1xuICAgICAgICBldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuICAgICAgICByZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBmaXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfTtcbn0pO1xuXG4vLyBJRSBzdWJtaXQgZGVsZWdhdGlvblxuaWYgKCAhc3VwcG9ydC5zdWJtaXRCdWJibGVzICkge1xuXG4gIGpRdWVyeS5ldmVudC5zcGVjaWFsLnN1Ym1pdCA9IHtcbiAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBPbmx5IG5lZWQgdGhpcyBmb3IgZGVsZWdhdGVkIGZvcm0gc3VibWl0IGV2ZW50c1xuICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiZm9ybVwiICkgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gTGF6eS1hZGQgYSBzdWJtaXQgaGFuZGxlciB3aGVuIGEgZGVzY2VuZGFudCBmb3JtIG1heSBwb3RlbnRpYWxseSBiZSBzdWJtaXR0ZWRcbiAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiY2xpY2suX3N1Ym1pdCBrZXlwcmVzcy5fc3VibWl0XCIsIGZ1bmN0aW9uKCBlICkge1xuICAgICAgICAvLyBOb2RlIG5hbWUgY2hlY2sgYXZvaWRzIGEgVk1MLXJlbGF0ZWQgY3Jhc2ggaW4gSUUgKCM5ODA3KVxuICAgICAgICB2YXIgZWxlbSA9IGUudGFyZ2V0LFxuICAgICAgICAgIGZvcm0gPSBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApIHx8IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJidXR0b25cIiApID8gZWxlbS5mb3JtIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIGZvcm0gJiYgIWpRdWVyeS5fZGF0YSggZm9ybSwgXCJzdWJtaXRCdWJibGVzXCIgKSApIHtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCBmb3JtLCBcInN1Ym1pdC5fc3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgICAgIGV2ZW50Ll9zdWJtaXRfYnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBqUXVlcnkuX2RhdGEoIGZvcm0sIFwic3VibWl0QnViYmxlc1wiLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gcmV0dXJuIHVuZGVmaW5lZCBzaW5jZSB3ZSBkb24ndCBuZWVkIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgfSxcblxuICAgIHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgLy8gSWYgZm9ybSB3YXMgc3VibWl0dGVkIGJ5IHRoZSB1c2VyLCBidWJibGUgdGhlIGV2ZW50IHVwIHRoZSB0cmVlXG4gICAgICBpZiAoIGV2ZW50Ll9zdWJtaXRfYnViYmxlICkge1xuICAgICAgICBkZWxldGUgZXZlbnQuX3N1Ym1pdF9idWJibGU7XG4gICAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcInN1Ym1pdFwiLCB0aGlzLnBhcmVudE5vZGUsIGV2ZW50LCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVhcmRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gT25seSBuZWVkIHRoaXMgZm9yIGRlbGVnYXRlZCBmb3JtIHN1Ym1pdCBldmVudHNcbiAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImZvcm1cIiApICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBkZWxlZ2F0ZWQgaGFuZGxlcnM7IGNsZWFuRGF0YSBldmVudHVhbGx5IHJlYXBzIHN1Ym1pdCBoYW5kbGVycyBhdHRhY2hlZCBhYm92ZVxuICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgXCIuX3N1Ym1pdFwiICk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBJRSBjaGFuZ2UgZGVsZWdhdGlvbiBhbmQgY2hlY2tib3gvcmFkaW8gZml4XG5pZiAoICFzdXBwb3J0LmNoYW5nZUJ1YmJsZXMgKSB7XG5cbiAgalF1ZXJ5LmV2ZW50LnNwZWNpYWwuY2hhbmdlID0ge1xuXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIHJmb3JtRWxlbXMudGVzdCggdGhpcy5ub2RlTmFtZSApICkge1xuICAgICAgICAvLyBJRSBkb2Vzbid0IGZpcmUgY2hhbmdlIG9uIGEgY2hlY2svcmFkaW8gdW50aWwgYmx1cjsgdHJpZ2dlciBpdCBvbiBjbGlja1xuICAgICAgICAvLyBhZnRlciBhIHByb3BlcnR5Y2hhbmdlLiBFYXQgdGhlIGJsdXItY2hhbmdlIGluIHNwZWNpYWwuY2hhbmdlLmhhbmRsZS5cbiAgICAgICAgLy8gVGhpcyBzdGlsbCBmaXJlcyBvbmNoYW5nZSBhIHNlY29uZCB0aW1lIGZvciBjaGVjay9yYWRpbyBhZnRlciBibHVyLlxuICAgICAgICBpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwicHJvcGVydHljaGFuZ2UuX2NoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgICAgICBpZiAoIGV2ZW50Lm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lID09PSBcImNoZWNrZWRcIiApIHtcbiAgICAgICAgICAgICAgdGhpcy5fanVzdF9jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcImNsaWNrLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLl9qdXN0X2NoYW5nZWQgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcbiAgICAgICAgICAgICAgdGhpcy5fanVzdF9jaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGxvdyB0cmlnZ2VyZWQsIHNpbXVsYXRlZCBjaGFuZ2UgZXZlbnRzICgjMTE1MDApXG4gICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIFwiY2hhbmdlXCIsIHRoaXMsIGV2ZW50LCB0cnVlICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gRGVsZWdhdGVkIGV2ZW50OyBsYXp5LWFkZCBhIGNoYW5nZSBoYW5kbGVyIG9uIGRlc2NlbmRhbnQgaW5wdXRzXG4gICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcImJlZm9yZWFjdGl2YXRlLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGUgKSB7XG4gICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQ7XG5cbiAgICAgICAgaWYgKCByZm9ybUVsZW1zLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJiAhalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImNoYW5nZUJ1YmJsZXNcIiApICkge1xuICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIGVsZW0sIFwiY2hhbmdlLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzU2ltdWxhdGVkICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG4gICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggXCJjaGFuZ2VcIiwgdGhpcy5wYXJlbnROb2RlLCBldmVudCwgdHJ1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgdmFyIGVsZW0gPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIC8vIFN3YWxsb3cgbmF0aXZlIGNoYW5nZSBldmVudHMgZnJvbSBjaGVja2JveC9yYWRpbywgd2UgYWxyZWFkeSB0cmlnZ2VyZWQgdGhlbSBhYm92ZVxuICAgICAgaWYgKCB0aGlzICE9PSBlbGVtIHx8IGV2ZW50LmlzU2ltdWxhdGVkIHx8IGV2ZW50LmlzVHJpZ2dlciB8fCAoZWxlbS50eXBlICE9PSBcInJhZGlvXCIgJiYgZWxlbS50eXBlICE9PSBcImNoZWNrYm94XCIpICkge1xuICAgICAgICByZXR1cm4gZXZlbnQuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCBcIi5fY2hhbmdlXCIgKTtcblxuICAgICAgcmV0dXJuICFyZm9ybUVsZW1zLnRlc3QoIHRoaXMubm9kZU5hbWUgKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIENyZWF0ZSBcImJ1YmJsaW5nXCIgZm9jdXMgYW5kIGJsdXIgZXZlbnRzXG5pZiAoICFzdXBwb3J0LmZvY3VzaW5CdWJibGVzICkge1xuICBqUXVlcnkuZWFjaCh7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cbiAgICAvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIGZpeCwgZXZlbnQudGFyZ2V0LCBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApLCB0cnVlICk7XG4gICAgICB9O1xuXG4gICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGZpeCBdID0ge1xuICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG4gICAgICAgICAgYXR0YWNoZXMgPSBqUXVlcnkuX2RhdGEoIGRvYywgZml4ICk7XG5cbiAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XG4gICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgfVxuICAgICAgICBqUXVlcnkuX2RhdGEoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcbiAgICAgIH0sXG4gICAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcbiAgICAgICAgICBhdHRhY2hlcyA9IGpRdWVyeS5fZGF0YSggZG9jLCBmaXggKSAtIDE7XG5cbiAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XG4gICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcbiAgICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGRvYywgZml4ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBkb2MsIGZpeCwgYXR0YWNoZXMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblxuICBvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIC8qSU5URVJOQUwqLyBvbmUgKSB7XG4gICAgdmFyIHR5cGUsIG9yaWdGbjtcblxuICAgIC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuICAgIGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuICAgICAgLy8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcbiAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgICAvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG4gICAgICAgIHRoaXMub24oIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG4gICAgICAvLyAoIHR5cGVzLCBmbiApXG4gICAgICBmbiA9IHNlbGVjdG9yO1xuICAgICAgZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG4gICAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgLy8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcbiAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gKCB0eXBlcywgZGF0YSwgZm4gKVxuICAgICAgICBmbiA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICggZm4gPT09IGZhbHNlICkge1xuICAgICAgZm4gPSByZXR1cm5GYWxzZTtcbiAgICB9IGVsc2UgaWYgKCAhZm4gKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIG9uZSA9PT0gMSApIHtcbiAgICAgIG9yaWdGbiA9IGZuO1xuICAgICAgZm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuICAgICAgICBqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG4gICAgICAgIHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgICAgfTtcbiAgICAgIC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG4gICAgICBmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG4gICAgfSk7XG4gIH0sXG4gIG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG4gICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcbiAgfSxcbiAgb2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcbiAgICB2YXIgaGFuZGxlT2JqLCB0eXBlO1xuICAgIGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuICAgICAgLy8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuICAgICAgaGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuICAgICAgalF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcbiAgICAgICAgaGFuZGxlT2JqLm5hbWVzcGFjZSA/IGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6IGhhbmRsZU9iai5vcmlnVHlwZSxcbiAgICAgICAgaGFuZGxlT2JqLnNlbGVjdG9yLFxuICAgICAgICBoYW5kbGVPYmouaGFuZGxlclxuICAgICAgKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcbiAgICAgIC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG4gICAgICBmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuICAgICAgICB0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIC8vICggdHlwZXMgWywgZm5dIClcbiAgICAgIGZuID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCBmbiA9PT0gZmFsc2UgKSB7XG4gICAgICBmbiA9IHJldHVybkZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuICAgIH0pO1xuICB9LFxuXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuICAgIH0pO1xuICB9LFxuICB0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG4gICAgdmFyIGVsZW0gPSB0aGlzWzBdO1xuICAgIGlmICggZWxlbSApIHtcbiAgICAgIHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuICAgIH1cbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gY3JlYXRlU2FmZUZyYWdtZW50KCBkb2N1bWVudCApIHtcbiAgdmFyIGxpc3QgPSBub2RlTmFtZXMuc3BsaXQoIFwifFwiICksXG4gICAgc2FmZUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgaWYgKCBzYWZlRnJhZy5jcmVhdGVFbGVtZW50ICkge1xuICAgIHdoaWxlICggbGlzdC5sZW5ndGggKSB7XG4gICAgICBzYWZlRnJhZy5jcmVhdGVFbGVtZW50KFxuICAgICAgICBsaXN0LnBvcCgpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2FmZUZyYWc7XG59XG5cbnZhciBub2RlTmFtZXMgPSBcImFiYnJ8YXJ0aWNsZXxhc2lkZXxhdWRpb3xiZGl8Y2FudmFzfGRhdGF8ZGF0YWxpc3R8ZGV0YWlsc3xmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8XCIgK1xuICAgIFwiaGVhZGVyfGhncm91cHxtYXJrfG1ldGVyfG5hdnxvdXRwdXR8cHJvZ3Jlc3N8c2VjdGlvbnxzdW1tYXJ5fHRpbWV8dmlkZW9cIixcbiAgcmlubGluZWpRdWVyeSA9IC8galF1ZXJ5XFxkKz1cIig/Om51bGx8XFxkKylcIi9nLFxuICBybm9zaGltY2FjaGUgPSBuZXcgUmVnRXhwKFwiPCg/OlwiICsgbm9kZU5hbWVzICsgXCIpW1xcXFxzLz5dXCIsIFwiaVwiKSxcbiAgcmxlYWRpbmdXaGl0ZXNwYWNlID0gL15cXHMrLyxcbiAgcnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLFxuICBydGFnTmFtZSA9IC88KFtcXHc6XSspLyxcbiAgcnRib2R5ID0gLzx0Ym9keS9pLFxuICByaHRtbCA9IC88fCYjP1xcdys7LyxcbiAgcm5vSW5uZXJodG1sID0gLzwoPzpzY3JpcHR8c3R5bGV8bGluaykvaSxcbiAgLy8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG4gIHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcbiAgcnNjcmlwdFR5cGUgPSAvXiR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pLFxuICByc2NyaXB0VHlwZU1hc2tlZCA9IC9edHJ1ZVxcLyguKikvLFxuICByY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2csXG5cbiAgLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbiAgd3JhcE1hcCA9IHtcbiAgICBvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcbiAgICBsZWdlbmQ6IFsgMSwgXCI8ZmllbGRzZXQ+XCIsIFwiPC9maWVsZHNldD5cIiBdLFxuICAgIGFyZWE6IFsgMSwgXCI8bWFwPlwiLCBcIjwvbWFwPlwiIF0sXG4gICAgcGFyYW06IFsgMSwgXCI8b2JqZWN0PlwiLCBcIjwvb2JqZWN0PlwiIF0sXG4gICAgdGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuICAgIHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcbiAgICBjb2w6IFsgMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuICAgIHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuICAgIC8vIElFNi04IGNhbid0IHNlcmlhbGl6ZSBsaW5rLCBzY3JpcHQsIHN0eWxlLCBvciBhbnkgaHRtbDUgKE5vU2NvcGUpIHRhZ3MsXG4gICAgLy8gdW5sZXNzIHdyYXBwZWQgaW4gYSBkaXYgd2l0aCBub24tYnJlYWtpbmcgY2hhcmFjdGVycyBpbiBmcm9udCBvZiBpdC5cbiAgICBfZGVmYXVsdDogc3VwcG9ydC5odG1sU2VyaWFsaXplID8gWyAwLCBcIlwiLCBcIlwiIF0gOiBbIDEsIFwiWDxkaXY+XCIsIFwiPC9kaXY+XCIgIF1cbiAgfSxcbiAgc2FmZUZyYWdtZW50ID0gY3JlYXRlU2FmZUZyYWdtZW50KCBkb2N1bWVudCApLFxuICBmcmFnbWVudERpdiA9IHNhZmVGcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xuXG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuICB2YXIgZWxlbXMsIGVsZW0sXG4gICAgaSA9IDAsXG4gICAgZm91bmQgPSB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICkgOlxuICAgICAgdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKSA6XG4gICAgICB1bmRlZmluZWQ7XG5cbiAgaWYgKCAhZm91bmQgKSB7XG4gICAgZm9yICggZm91bmQgPSBbXSwgZWxlbXMgPSBjb250ZXh0LmNoaWxkTm9kZXMgfHwgY29udGV4dDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgaWYgKCAhdGFnIHx8IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgdGFnICkgKSB7XG4gICAgICAgIGZvdW5kLnB1c2goIGVsZW0gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeS5tZXJnZSggZm91bmQsIGdldEFsbCggZWxlbSwgdGFnICkgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIGpRdWVyeS5ub2RlTmFtZSggY29udGV4dCwgdGFnICkgP1xuICAgIGpRdWVyeS5tZXJnZSggWyBjb250ZXh0IF0sIGZvdW5kICkgOlxuICAgIGZvdW5kO1xufVxuXG4vLyBVc2VkIGluIGJ1aWxkRnJhZ21lbnQsIGZpeGVzIHRoZSBkZWZhdWx0Q2hlY2tlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gZml4RGVmYXVsdENoZWNrZWQoIGVsZW0gKSB7XG4gIGlmICggcmNoZWNrYWJsZVR5cGUudGVzdCggZWxlbS50eXBlICkgKSB7XG4gICAgZWxlbS5kZWZhdWx0Q2hlY2tlZCA9IGVsZW0uY2hlY2tlZDtcbiAgfVxufVxuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBNYW5pcHVsYXRpbmcgdGFibGVzIHJlcXVpcmVzIGEgdGJvZHlcbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcbiAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcbiAgICBqUXVlcnkubm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgP1xuXG4gICAgZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRib2R5XCIpWzBdIHx8XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKCBlbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpICkgOlxuICAgIGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG4gIGVsZW0udHlwZSA9IChqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInR5cGVcIiApICE9PSBudWxsKSArIFwiL1wiICsgZWxlbS50eXBlO1xuICByZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG4gIHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuICBpZiAoIG1hdGNoICkge1xuICAgIGVsZW0udHlwZSA9IG1hdGNoWzFdO1xuICB9IGVsc2Uge1xuICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKFwidHlwZVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbTtcbn1cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG4gIHZhciBlbGVtLFxuICAgIGkgPSAwO1xuICBmb3IgKCA7IChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgalF1ZXJ5Ll9kYXRhKCByZWZFbGVtZW50c1tpXSwgXCJnbG9iYWxFdmFsXCIgKSApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cbiAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkuaGFzRGF0YSggc3JjICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHR5cGUsIGksIGwsXG4gICAgb2xkRGF0YSA9IGpRdWVyeS5fZGF0YSggc3JjICksXG4gICAgY3VyRGF0YSA9IGpRdWVyeS5fZGF0YSggZGVzdCwgb2xkRGF0YSApLFxuICAgIGV2ZW50cyA9IG9sZERhdGEuZXZlbnRzO1xuXG4gIGlmICggZXZlbnRzICkge1xuICAgIGRlbGV0ZSBjdXJEYXRhLmhhbmRsZTtcbiAgICBjdXJEYXRhLmV2ZW50cyA9IHt9O1xuXG4gICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XG4gICAgICBmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG1ha2UgdGhlIGNsb25lZCBwdWJsaWMgZGF0YSBvYmplY3QgYSBjb3B5IGZyb20gdGhlIG9yaWdpbmFsXG4gIGlmICggY3VyRGF0YS5kYXRhICkge1xuICAgIGN1ckRhdGEuZGF0YSA9IGpRdWVyeS5leHRlbmQoIHt9LCBjdXJEYXRhLmRhdGEgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXhDbG9uZU5vZGVJc3N1ZXMoIHNyYywgZGVzdCApIHtcbiAgdmFyIG5vZGVOYW1lLCBlLCBkYXRhO1xuXG4gIC8vIFdlIGRvIG5vdCBuZWVkIHRvIGRvIGFueXRoaW5nIGZvciBub24tRWxlbWVudHNcbiAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIElFNi04IGNvcGllcyBldmVudHMgYm91bmQgdmlhIGF0dGFjaEV2ZW50IHdoZW4gdXNpbmcgY2xvbmVOb2RlLlxuICBpZiAoICFzdXBwb3J0Lm5vQ2xvbmVFdmVudCAmJiBkZXN0WyBqUXVlcnkuZXhwYW5kbyBdICkge1xuICAgIGRhdGEgPSBqUXVlcnkuX2RhdGEoIGRlc3QgKTtcblxuICAgIGZvciAoIGUgaW4gZGF0YS5ldmVudHMgKSB7XG4gICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoIGRlc3QsIGUsIGRhdGEuaGFuZGxlICk7XG4gICAgfVxuXG4gICAgLy8gRXZlbnQgZGF0YSBnZXRzIHJlZmVyZW5jZWQgaW5zdGVhZCBvZiBjb3BpZWQgaWYgdGhlIGV4cGFuZG8gZ2V0cyBjb3BpZWQgdG9vXG4gICAgZGVzdC5yZW1vdmVBdHRyaWJ1dGUoIGpRdWVyeS5leHBhbmRvICk7XG4gIH1cblxuICAvLyBJRSBibGFua3MgY29udGVudHMgd2hlbiBjbG9uaW5nIHNjcmlwdHMsIGFuZCB0cmllcyB0byBldmFsdWF0ZSBuZXdseS1zZXQgdGV4dFxuICBpZiAoIG5vZGVOYW1lID09PSBcInNjcmlwdFwiICYmIGRlc3QudGV4dCAhPT0gc3JjLnRleHQgKSB7XG4gICAgZGlzYWJsZVNjcmlwdCggZGVzdCApLnRleHQgPSBzcmMudGV4dDtcbiAgICByZXN0b3JlU2NyaXB0KCBkZXN0ICk7XG5cbiAgLy8gSUU2LTEwIGltcHJvcGVybHkgY2xvbmVzIGNoaWxkcmVuIG9mIG9iamVjdCBlbGVtZW50cyB1c2luZyBjbGFzc2lkLlxuICAvLyBJRTEwIHRocm93cyBOb01vZGlmaWNhdGlvbkFsbG93ZWRFcnJvciBpZiBwYXJlbnQgaXMgbnVsbCwgIzEyMTMyLlxuICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJvYmplY3RcIiApIHtcbiAgICBpZiAoIGRlc3QucGFyZW50Tm9kZSApIHtcbiAgICAgIGRlc3Qub3V0ZXJIVE1MID0gc3JjLm91dGVySFRNTDtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHBhdGggYXBwZWFycyB1bmF2b2lkYWJsZSBmb3IgSUU5LiBXaGVuIGNsb25pbmcgYW4gb2JqZWN0XG4gICAgLy8gZWxlbWVudCBpbiBJRTksIHRoZSBvdXRlckhUTUwgc3RyYXRlZ3kgYWJvdmUgaXMgbm90IHN1ZmZpY2llbnQuXG4gICAgLy8gSWYgdGhlIHNyYyBoYXMgaW5uZXJIVE1MIGFuZCB0aGUgZGVzdGluYXRpb24gZG9lcyBub3QsXG4gICAgLy8gY29weSB0aGUgc3JjLmlubmVySFRNTCBpbnRvIHRoZSBkZXN0LmlubmVySFRNTC4gIzEwMzI0XG4gICAgaWYgKCBzdXBwb3J0Lmh0bWw1Q2xvbmUgJiYgKCBzcmMuaW5uZXJIVE1MICYmICFqUXVlcnkudHJpbShkZXN0LmlubmVySFRNTCkgKSApIHtcbiAgICAgIGRlc3QuaW5uZXJIVE1MID0gc3JjLmlubmVySFRNTDtcbiAgICB9XG5cbiAgfSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuICAgIC8vIElFNi04IGZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3hcbiAgICAvLyBvciByYWRpbyBidXR0b24uIFdvcnNlLCBJRTYtNyBmYWlsIHRvIGdpdmUgdGhlIGNsb25lZCBlbGVtZW50XG4gICAgLy8gYSBjaGVja2VkIGFwcGVhcmFuY2UgaWYgdGhlIGRlZmF1bHRDaGVja2VkIHZhbHVlIGlzbid0IGFsc28gc2V0XG5cbiAgICBkZXN0LmRlZmF1bHRDaGVja2VkID0gZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XG5cbiAgICAvLyBJRTYtNyBnZXQgY29uZnVzZWQgYW5kIGVuZCB1cCBzZXR0aW5nIHRoZSB2YWx1ZSBvZiBhIGNsb25lZFxuICAgIC8vIGNoZWNrYm94L3JhZGlvIGJ1dHRvbiB0byBhbiBlbXB0eSBzdHJpbmcgaW5zdGVhZCBvZiBcIm9uXCJcbiAgICBpZiAoIGRlc3QudmFsdWUgIT09IHNyYy52YWx1ZSApIHtcbiAgICAgIGRlc3QudmFsdWUgPSBzcmMudmFsdWU7XG4gICAgfVxuXG4gIC8vIElFNi04IGZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkXG4gIC8vIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG4gIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcIm9wdGlvblwiICkge1xuICAgIGRlc3QuZGVmYXVsdFNlbGVjdGVkID0gZGVzdC5zZWxlY3RlZCA9IHNyYy5kZWZhdWx0U2VsZWN0ZWQ7XG5cbiAgLy8gSUU2LTggZmFpbHMgdG8gc2V0IHRoZSBkZWZhdWx0VmFsdWUgdG8gdGhlIGNvcnJlY3QgdmFsdWUgd2hlblxuICAvLyBjbG9uaW5nIG90aGVyIHR5cGVzIG9mIGlucHV0IGZpZWxkc1xuICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG4gICAgZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuICB9XG59XG5cbmpRdWVyeS5leHRlbmQoe1xuICBjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgIHZhciBkZXN0RWxlbWVudHMsIG5vZGUsIGNsb25lLCBpLCBzcmNFbGVtZW50cyxcbiAgICAgIGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cbiAgICBpZiAoIHN1cHBvcnQuaHRtbDVDbG9uZSB8fCBqUXVlcnkuaXNYTUxEb2MoZWxlbSkgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCBcIjxcIiArIGVsZW0ubm9kZU5hbWUgKyBcIj5cIiApICkge1xuICAgICAgY2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApO1xuXG4gICAgLy8gSUU8PTggZG9lcyBub3QgcHJvcGVybHkgY2xvbmUgZGV0YWNoZWQsIHVua25vd24gZWxlbWVudCBub2Rlc1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFnbWVudERpdi5pbm5lckhUTUwgPSBlbGVtLm91dGVySFRNTDtcbiAgICAgIGZyYWdtZW50RGl2LnJlbW92ZUNoaWxkKCBjbG9uZSA9IGZyYWdtZW50RGl2LmZpcnN0Q2hpbGQgKTtcbiAgICB9XG5cbiAgICBpZiAoICghc3VwcG9ydC5ub0Nsb25lRXZlbnQgfHwgIXN1cHBvcnQubm9DbG9uZUNoZWNrZWQpICYmXG4gICAgICAgIChlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExKSAmJiAhalF1ZXJ5LmlzWE1MRG9jKGVsZW0pICkge1xuXG4gICAgICAvLyBXZSBlc2NoZXcgU2l6emxlIGhlcmUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnM6IGh0dHA6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuICAgICAgZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuICAgICAgc3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuICAgICAgLy8gRml4IGFsbCBJRSBjbG9uaW5nIGlzc3Vlc1xuICAgICAgZm9yICggaSA9IDA7IChub2RlID0gc3JjRWxlbWVudHNbaV0pICE9IG51bGw7ICsraSApIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGRlc3RpbmF0aW9uIG5vZGUgaXMgbm90IG51bGw7IEZpeGVzICM5NTg3XG4gICAgICAgIGlmICggZGVzdEVsZW1lbnRzW2ldICkge1xuICAgICAgICAgIGZpeENsb25lTm9kZUlzc3Vlcyggbm9kZSwgZGVzdEVsZW1lbnRzW2ldICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG4gICAgaWYgKCBkYXRhQW5kRXZlbnRzICkge1xuICAgICAgaWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcbiAgICAgICAgc3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcbiAgICAgICAgZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuICAgICAgICBmb3IgKCBpID0gMDsgKG5vZGUgPSBzcmNFbGVtZW50c1tpXSkgIT0gbnVsbDsgaSsrICkge1xuICAgICAgICAgIGNsb25lQ29weUV2ZW50KCBub2RlLCBkZXN0RWxlbWVudHNbaV0gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcbiAgICBpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuICAgICAgc2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG4gICAgfVxuXG4gICAgZGVzdEVsZW1lbnRzID0gc3JjRWxlbWVudHMgPSBub2RlID0gbnVsbDtcblxuICAgIC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuICAgIHJldHVybiBjbG9uZTtcbiAgfSxcblxuICBidWlsZEZyYWdtZW50OiBmdW5jdGlvbiggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiApIHtcbiAgICB2YXIgaiwgZWxlbSwgY29udGFpbnMsXG4gICAgICB0bXAsIHRhZywgdGJvZHksIHdyYXAsXG4gICAgICBsID0gZWxlbXMubGVuZ3RoLFxuXG4gICAgICAvLyBFbnN1cmUgYSBzYWZlIGZyYWdtZW50XG4gICAgICBzYWZlID0gY3JlYXRlU2FmZUZyYWdtZW50KCBjb250ZXh0ICksXG5cbiAgICAgIG5vZGVzID0gW10sXG4gICAgICBpID0gMDtcblxuICAgIGZvciAoIDsgaSA8IGw7IGkrKyApIHtcbiAgICAgIGVsZW0gPSBlbGVtc1sgaSBdO1xuXG4gICAgICBpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuICAgICAgICAvLyBBZGQgbm9kZXMgZGlyZWN0bHlcbiAgICAgICAgaWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuICAgICAgICAgIGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuICAgICAgICAvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgfSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcbiAgICAgICAgICBub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuICAgICAgICAvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0bXAgPSB0bXAgfHwgc2FmZS5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICk7XG5cbiAgICAgICAgICAvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgdGFnID0gKHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSlbIDEgXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXG4gICAgICAgICAgdG1wLmlubmVySFRNTCA9IHdyYXBbMV0gKyBlbGVtLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApICsgd3JhcFsyXTtcblxuICAgICAgICAgIC8vIERlc2NlbmQgdGhyb3VnaCB3cmFwcGVycyB0byB0aGUgcmlnaHQgY29udGVudFxuICAgICAgICAgIGogPSB3cmFwWzBdO1xuICAgICAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICAgICAgdG1wID0gdG1wLmxhc3RDaGlsZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBNYW51YWxseSBhZGQgbGVhZGluZyB3aGl0ZXNwYWNlIHJlbW92ZWQgYnkgSUVcbiAgICAgICAgICBpZiAoICFzdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlICYmIHJsZWFkaW5nV2hpdGVzcGFjZS50ZXN0KCBlbGVtICkgKSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBybGVhZGluZ1doaXRlc3BhY2UuZXhlYyggZWxlbSApWzBdICkgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZW1vdmUgSUUncyBhdXRvaW5zZXJ0ZWQgPHRib2R5PiBmcm9tIHRhYmxlIGZyYWdtZW50c1xuICAgICAgICAgIGlmICggIXN1cHBvcnQudGJvZHkgKSB7XG5cbiAgICAgICAgICAgIC8vIFN0cmluZyB3YXMgYSA8dGFibGU+LCAqbWF5KiBoYXZlIHNwdXJpb3VzIDx0Ym9keT5cbiAgICAgICAgICAgIGVsZW0gPSB0YWcgPT09IFwidGFibGVcIiAmJiAhcnRib2R5LnRlc3QoIGVsZW0gKSA/XG4gICAgICAgICAgICAgIHRtcC5maXJzdENoaWxkIDpcblxuICAgICAgICAgICAgICAvLyBTdHJpbmcgd2FzIGEgYmFyZSA8dGhlYWQ+IG9yIDx0Zm9vdD5cbiAgICAgICAgICAgICAgd3JhcFsxXSA9PT0gXCI8dGFibGU+XCIgJiYgIXJ0Ym9keS50ZXN0KCBlbGVtICkgP1xuICAgICAgICAgICAgICAgIHRtcCA6XG4gICAgICAgICAgICAgICAgMDtcblxuICAgICAgICAgICAgaiA9IGVsZW0gJiYgZWxlbS5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggai0tICkge1xuICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggKHRib2R5ID0gZWxlbS5jaGlsZE5vZGVzW2pdKSwgXCJ0Ym9keVwiICkgJiYgIXRib2R5LmNoaWxkTm9kZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoIHRib2R5ICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG4gICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3IgV2ViS2l0IGFuZCBJRSA+IDlcbiAgICAgICAgICB0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3Igb2xkSUVcbiAgICAgICAgICB3aGlsZSAoIHRtcC5maXJzdENoaWxkICkge1xuICAgICAgICAgICAgdG1wLnJlbW92ZUNoaWxkKCB0bXAuZmlyc3RDaGlsZCApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyIGZvciBwcm9wZXIgY2xlYW51cFxuICAgICAgICAgIHRtcCA9IHNhZmUubGFzdENoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4ICMxMTM1NjogQ2xlYXIgZWxlbWVudHMgZnJvbSBmcmFnbWVudFxuICAgIGlmICggdG1wICkge1xuICAgICAgc2FmZS5yZW1vdmVDaGlsZCggdG1wICk7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgZGVmYXVsdENoZWNrZWQgZm9yIGFueSByYWRpb3MgYW5kIGNoZWNrYm94ZXNcbiAgICAvLyBhYm91dCB0byBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGluIElFIDYvNyAoIzgwNjApXG4gICAgaWYgKCAhc3VwcG9ydC5hcHBlbmRDaGVja2VkICkge1xuICAgICAgalF1ZXJ5LmdyZXAoIGdldEFsbCggbm9kZXMsIFwiaW5wdXRcIiApLCBmaXhEZWZhdWx0Q2hlY2tlZCApO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIHdoaWxlICggKGVsZW0gPSBub2Rlc1sgaSsrIF0pICkge1xuXG4gICAgICAvLyAjNDA4NyAtIElmIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gZWxlbWVudHMgYXJlIHRoZSBzYW1lLCBhbmQgdGhpcyBpc1xuICAgICAgLy8gdGhhdCBlbGVtZW50LCBkbyBub3QgZG8gYW55dGhpbmdcbiAgICAgIGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSAhPT0gLTEgKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cbiAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxuICAgICAgdG1wID0gZ2V0QWxsKCBzYWZlLmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuICAgICAgLy8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuICAgICAgaWYgKCBjb250YWlucyApIHtcbiAgICAgICAgc2V0R2xvYmFsRXZhbCggdG1wICk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcbiAgICAgIGlmICggc2NyaXB0cyApIHtcbiAgICAgICAgaiA9IDA7XG4gICAgICAgIHdoaWxlICggKGVsZW0gPSB0bXBbIGorKyBdKSApIHtcbiAgICAgICAgICBpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG4gICAgICAgICAgICBzY3JpcHRzLnB1c2goIGVsZW0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0bXAgPSBudWxsO1xuXG4gICAgcmV0dXJuIHNhZmU7XG4gIH0sXG5cbiAgY2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMsIC8qIGludGVybmFsICovIGFjY2VwdERhdGEgKSB7XG4gICAgdmFyIGVsZW0sIHR5cGUsIGlkLCBkYXRhLFxuICAgICAgaSA9IDAsXG4gICAgICBpbnRlcm5hbEtleSA9IGpRdWVyeS5leHBhbmRvLFxuICAgICAgY2FjaGUgPSBqUXVlcnkuY2FjaGUsXG4gICAgICBkZWxldGVFeHBhbmRvID0gc3VwcG9ydC5kZWxldGVFeHBhbmRvLFxuICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsO1xuXG4gICAgZm9yICggOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG4gICAgICBpZiAoIGFjY2VwdERhdGEgfHwgalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuICAgICAgICBpZCA9IGVsZW1bIGludGVybmFsS2V5IF07XG4gICAgICAgIGRhdGEgPSBpZCAmJiBjYWNoZVsgaWQgXTtcblxuICAgICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCBkYXRhLmV2ZW50cyApIHtcbiAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG4gICAgICAgICAgICAgIGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVtb3ZlIGNhY2hlIG9ubHkgaWYgaXQgd2FzIG5vdCBhbHJlYWR5IHJlbW92ZWQgYnkgalF1ZXJ5LmV2ZW50LnJlbW92ZVxuICAgICAgICAgIGlmICggY2FjaGVbIGlkIF0gKSB7XG5cbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVsgaWQgXTtcblxuICAgICAgICAgICAgLy8gSUUgZG9lcyBub3QgYWxsb3cgdXMgdG8gZGVsZXRlIGV4cGFuZG8gcHJvcGVydGllcyBmcm9tIG5vZGVzLFxuICAgICAgICAgICAgLy8gbm9yIGRvZXMgaXQgaGF2ZSBhIHJlbW92ZUF0dHJpYnV0ZSBmdW5jdGlvbiBvbiBEb2N1bWVudCBub2RlcztcbiAgICAgICAgICAgIC8vIHdlIG11c3QgaGFuZGxlIGFsbCBvZiB0aGVzZSBjYXNlc1xuICAgICAgICAgICAgaWYgKCBkZWxldGVFeHBhbmRvICkge1xuICAgICAgICAgICAgICBkZWxldGUgZWxlbVsgaW50ZXJuYWxLZXkgXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIGVsZW0ucmVtb3ZlQXR0cmlidXRlICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBpbnRlcm5hbEtleSApO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtWyBpbnRlcm5hbEtleSBdID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlZElkcy5wdXNoKCBpZCApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICB0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuICAgICAgICBqUXVlcnkudGV4dCggdGhpcyApIDpcbiAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggKCB0aGlzWzBdICYmIHRoaXNbMF0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApLmNyZWF0ZVRleHROb2RlKCB2YWx1ZSApICk7XG4gICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcbiAgfSxcblxuICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgaWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcHJlcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0YXJnZXQuZmlyc3RDaGlsZCApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGJlZm9yZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGFmdGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IsIGtlZXBEYXRhIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuICAgIHZhciBlbGVtLFxuICAgICAgZWxlbXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCB0aGlzICkgOiB0aGlzLFxuICAgICAgaSA9IDA7XG5cbiAgICBmb3IgKCA7IChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblxuICAgICAgaWYgKCAha2VlcERhdGEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtICkgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcbiAgICAgICAgICBzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuICAgICAgICB9XG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbSxcbiAgICAgIGkgPSAwO1xuXG4gICAgZm9yICggOyAoZWxlbSA9IHRoaXNbaV0pICE9IG51bGw7IGkrKyApIHtcbiAgICAgIC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcbiAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICkge1xuICAgICAgICBlbGVtLnJlbW92ZUNoaWxkKCBlbGVtLmZpcnN0Q2hpbGQgKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHNlbGVjdCwgZW5zdXJlIHRoYXQgaXQgZGlzcGxheXMgZW1wdHkgKCMxMjMzNilcbiAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgIGlmICggZWxlbS5vcHRpb25zICYmIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJzZWxlY3RcIiApICkge1xuICAgICAgICBlbGVtLm9wdGlvbnMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuICAgIGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG4gICAgZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcbiAgICB9KTtcbiAgfSxcblxuICBodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuICAgICAgdmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBsID0gdGhpcy5sZW5ndGg7XG5cbiAgICAgIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xuICAgICAgICAgIGVsZW0uaW5uZXJIVE1MLnJlcGxhY2UoIHJpbmxpbmVqUXVlcnksIFwiXCIgKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWUgaWYgd2UgY2FuIHRha2UgYSBzaG9ydGN1dCBhbmQganVzdCB1c2UgaW5uZXJIVE1MXG4gICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAhcm5vSW5uZXJodG1sLnRlc3QoIHZhbHVlICkgJiZcbiAgICAgICAgKCBzdXBwb3J0Lmh0bWxTZXJpYWxpemUgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCB2YWx1ZSApICApICYmXG4gICAgICAgICggc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSB8fCAhcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIHZhbHVlICkgKSAmJlxuICAgICAgICAhd3JhcE1hcFsgKHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0pWyAxIF0udG9Mb3dlckNhc2UoKSBdICkge1xuXG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKDsgaSA8IGw7IGkrKyApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgICAgICAgICAgZWxlbSA9IHRoaXNbaV0gfHwge307XG4gICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICAgICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW0gPSAwO1xuXG4gICAgICAgIC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICB9XG5cbiAgICAgIGlmICggZWxlbSApIHtcbiAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcbiAgICAgIH1cbiAgICB9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuICB9LFxuXG4gIHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJnID0gYXJndW1lbnRzWyAwIF07XG5cbiAgICAvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcbiAgICB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgYXJnID0gdGhpcy5wYXJlbnROb2RlO1xuXG4gICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuXG4gICAgICBpZiAoIGFyZyApIHtcbiAgICAgICAgYXJnLnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRm9yY2UgcmVtb3ZhbCBpZiB0aGVyZSB3YXMgbm8gbmV3IGNvbnRlbnQgKGUuZy4sIGZyb20gZW1wdHkgYXJndW1lbnRzKVxuICAgIHJldHVybiBhcmcgJiYgKGFyZy5sZW5ndGggfHwgYXJnLm5vZGVUeXBlKSA/IHRoaXMgOiB0aGlzLnJlbW92ZSgpO1xuICB9LFxuXG4gIGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZSggc2VsZWN0b3IsIHRydWUgKTtcbiAgfSxcblxuICBkb21NYW5pcDogZnVuY3Rpb24oIGFyZ3MsIGNhbGxiYWNrICkge1xuXG4gICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuICAgIGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cbiAgICB2YXIgZmlyc3QsIG5vZGUsIGhhc1NjcmlwdHMsXG4gICAgICBzY3JpcHRzLCBkb2MsIGZyYWdtZW50LFxuICAgICAgaSA9IDAsXG4gICAgICBsID0gdGhpcy5sZW5ndGgsXG4gICAgICBzZXQgPSB0aGlzLFxuICAgICAgaU5vQ2xvbmUgPSBsIC0gMSxcbiAgICAgIHZhbHVlID0gYXJnc1swXSxcbiAgICAgIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuICAgIC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuICAgIGlmICggaXNGdW5jdGlvbiB8fFxuICAgICAgICAoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaW5kZXggKSB7XG4gICAgICAgIHZhciBzZWxmID0gc2V0LmVxKCBpbmRleCApO1xuICAgICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XG4gICAgICAgICAgYXJnc1swXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZG9tTWFuaXAoIGFyZ3MsIGNhbGxiYWNrICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIGwgKSB7XG4gICAgICBmcmFnbWVudCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBhcmdzLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIHRoaXMgKTtcbiAgICAgIGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuICAgICAgaWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgZnJhZ21lbnQgPSBmaXJzdDtcbiAgICAgIH1cblxuICAgICAgaWYgKCBmaXJzdCApIHtcbiAgICAgICAgc2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuICAgICAgICBoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cbiAgICAgICAgLy8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbSBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcbiAgICAgICAgLy8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cbiAgICAgICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgIG5vZGUgPSBmcmFnbWVudDtcblxuICAgICAgICAgIGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG4gICAgICAgICAgICBub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cbiAgICAgICAgICAgIC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cbiAgICAgICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcbiAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoIHRoaXNbaV0sIG5vZGUsIGkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcbiAgICAgICAgICBkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG4gICAgICAgICAgLy8gUmVlbmFibGUgc2NyaXB0c1xuICAgICAgICAgIGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuICAgICAgICAgIC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cbiAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcbiAgICAgICAgICAgIG5vZGUgPSBzY3JpcHRzWyBpIF07XG4gICAgICAgICAgICBpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcbiAgICAgICAgICAgICAgIWpRdWVyeS5fZGF0YSggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJiBqUXVlcnkuY29udGFpbnMoIGRvYywgbm9kZSApICkge1xuXG4gICAgICAgICAgICAgIGlmICggbm9kZS5zcmMgKSB7XG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcbiAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5Lmdsb2JhbEV2YWwoICggbm9kZS50ZXh0IHx8IG5vZGUudGV4dENvbnRlbnQgfHwgbm9kZS5pbm5lckhUTUwgfHwgXCJcIiApLnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXggIzExODA5OiBBdm9pZCBsZWFraW5nIG1lbW9yeVxuICAgICAgICBmcmFnbWVudCA9IGZpcnN0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKHtcbiAgYXBwZW5kVG86IFwiYXBwZW5kXCIsXG4gIHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG4gIGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcbiAgaW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcbiAgcmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHZhciBlbGVtcyxcbiAgICAgIGkgPSAwLFxuICAgICAgcmV0ID0gW10sXG4gICAgICBpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG4gICAgICBsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDE7XG5cbiAgICBmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuICAgICAgZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUodHJ1ZSk7XG4gICAgICBqUXVlcnkoIGluc2VydFtpXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG4gICAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgY2FuIGFwcGx5IGpRdWVyeSBjb2xsZWN0aW9ucyBhcyBhcnJheXMsIGJ1dCBvbGRJRSBuZWVkcyBhIC5nZXQoKVxuICAgICAgcHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG4gIH07XG59KTtcblxuXG52YXIgaWZyYW1lLFxuICBlbGVtZGlzcGxheSA9IHt9O1xuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBhY3R1YWwgZGlzcGxheSBvZiBhIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5vZGVOYW1lIG9mIHRoZSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIERvY3VtZW50IG9iamVjdFxuICovXG4vLyBDYWxsZWQgb25seSBmcm9tIHdpdGhpbiBkZWZhdWx0RGlzcGxheVxuZnVuY3Rpb24gYWN0dWFsRGlzcGxheSggbmFtZSwgZG9jICkge1xuICB2YXIgZWxlbSA9IGpRdWVyeSggZG9jLmNyZWF0ZUVsZW1lbnQoIG5hbWUgKSApLmFwcGVuZFRvKCBkb2MuYm9keSApLFxuXG4gICAgLy8gZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgbWlnaHQgYmUgcmVsaWFibHkgdXNlZCBvbmx5IG9uIGF0dGFjaGVkIGVsZW1lbnRcbiAgICBkaXNwbGF5ID0gd2luZG93LmdldERlZmF1bHRDb21wdXRlZFN0eWxlID9cblxuICAgICAgLy8gVXNlIG9mIHRoaXMgbWV0aG9kIGlzIGEgdGVtcG9yYXJ5IGZpeCAobW9yZSBsaWtlIG9wdG1pemF0aW9uKSB1bnRpbCBzb21ldGhpbmcgYmV0dGVyIGNvbWVzIGFsb25nLFxuICAgICAgLy8gc2luY2UgaXQgd2FzIHJlbW92ZWQgZnJvbSBzcGVjaWZpY2F0aW9uIGFuZCBzdXBwb3J0ZWQgb25seSBpbiBGRlxuICAgICAgd2luZG93LmdldERlZmF1bHRDb21wdXRlZFN0eWxlKCBlbGVtWyAwIF0gKS5kaXNwbGF5IDogalF1ZXJ5LmNzcyggZWxlbVsgMCBdLCBcImRpc3BsYXlcIiApO1xuXG4gIC8vIFdlIGRvbid0IGhhdmUgYW55IGRhdGEgc3RvcmVkIG9uIHRoZSBlbGVtZW50LFxuICAvLyBzbyB1c2UgXCJkZXRhY2hcIiBtZXRob2QgYXMgZmFzdCB3YXkgdG8gZ2V0IHJpZCBvZiB0aGUgZWxlbWVudFxuICBlbGVtLmRldGFjaCgpO1xuXG4gIHJldHVybiBkaXNwbGF5O1xufVxuXG4vKipcbiAqIFRyeSB0byBkZXRlcm1pbmUgdGhlIGRlZmF1bHQgZGlzcGxheSB2YWx1ZSBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gbm9kZU5hbWVcbiAqL1xuZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkoIG5vZGVOYW1lICkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgZGlzcGxheSA9IGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdO1xuXG4gIGlmICggIWRpc3BsYXkgKSB7XG4gICAgZGlzcGxheSA9IGFjdHVhbERpc3BsYXkoIG5vZGVOYW1lLCBkb2MgKTtcblxuICAgIC8vIElmIHRoZSBzaW1wbGUgd2F5IGZhaWxzLCByZWFkIGZyb20gaW5zaWRlIGFuIGlmcmFtZVxuICAgIGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgfHwgIWRpc3BsYXkgKSB7XG5cbiAgICAgIC8vIFVzZSB0aGUgYWxyZWFkeS1jcmVhdGVkIGlmcmFtZSBpZiBwb3NzaWJsZVxuICAgICAgaWZyYW1lID0gKGlmcmFtZSB8fCBqUXVlcnkoIFwiPGlmcmFtZSBmcmFtZWJvcmRlcj0nMCcgd2lkdGg9JzAnIGhlaWdodD0nMCcvPlwiICkpLmFwcGVuZFRvKCBkb2MuZG9jdW1lbnRFbGVtZW50ICk7XG5cbiAgICAgIC8vIEFsd2F5cyB3cml0ZSBhIG5ldyBIVE1MIHNrZWxldG9uIHNvIFdlYmtpdCBhbmQgRmlyZWZveCBkb24ndCBjaG9rZSBvbiByZXVzZVxuICAgICAgZG9jID0gKCBpZnJhbWVbIDAgXS5jb250ZW50V2luZG93IHx8IGlmcmFtZVsgMCBdLmNvbnRlbnREb2N1bWVudCApLmRvY3VtZW50O1xuXG4gICAgICAvLyBTdXBwb3J0OiBJRVxuICAgICAgZG9jLndyaXRlKCk7XG4gICAgICBkb2MuY2xvc2UoKTtcblxuICAgICAgZGlzcGxheSA9IGFjdHVhbERpc3BsYXkoIG5vZGVOYW1lLCBkb2MgKTtcbiAgICAgIGlmcmFtZS5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZSB0aGUgY29ycmVjdCBkZWZhdWx0IGRpc3BsYXlcbiAgICBlbGVtZGlzcGxheVsgbm9kZU5hbWUgXSA9IGRpc3BsYXk7XG4gIH1cblxuICByZXR1cm4gZGlzcGxheTtcbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBhLCBzaHJpbmtXcmFwQmxvY2tzVmFsLFxuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSxcbiAgICBkaXZSZXNldCA9XG4gICAgICBcIi13ZWJraXQtYm94LXNpemluZzpjb250ZW50LWJveDstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveDtcIiArXG4gICAgICBcImRpc3BsYXk6YmxvY2s7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowXCI7XG5cbiAgLy8gU2V0dXBcbiAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG4gIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYVwiIClbIDAgXTtcblxuICBhLnN0eWxlLmNzc1RleHQgPSBcImZsb2F0OmxlZnQ7b3BhY2l0eTouNVwiO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGVsZW1lbnQgb3BhY2l0eSBleGlzdHNcbiAgLy8gKElFIHVzZXMgZmlsdGVyIGluc3RlYWQpXG4gIC8vIFVzZSBhIHJlZ2V4IHRvIHdvcmsgYXJvdW5kIGEgV2ViS2l0IGlzc3VlLiBTZWUgIzUxNDVcbiAgc3VwcG9ydC5vcGFjaXR5ID0gL14wLjUvLnRlc3QoIGEuc3R5bGUub3BhY2l0eSApO1xuXG4gIC8vIFZlcmlmeSBzdHlsZSBmbG9hdCBleGlzdGVuY2VcbiAgLy8gKElFIHVzZXMgc3R5bGVGbG9hdCBpbnN0ZWFkIG9mIGNzc0Zsb2F0KVxuICBzdXBwb3J0LmNzc0Zsb2F0ID0gISFhLnN0eWxlLmNzc0Zsb2F0O1xuXG4gIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcbiAgZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcbiAgc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBhID0gZGl2ID0gbnVsbDtcblxuICBzdXBwb3J0LnNocmlua1dyYXBCbG9ja3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9keSwgY29udGFpbmVyLCBkaXYsIGNvbnRhaW5lclN0eWxlcztcblxuICAgIGlmICggc2hyaW5rV3JhcEJsb2Nrc1ZhbCA9PSBudWxsICkge1xuICAgICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XG4gICAgICBpZiAoICFib2R5ICkge1xuICAgICAgICAvLyBUZXN0IGZpcmVkIHRvbyBlYXJseSBvciBpbiBhbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudCwgZXhpdC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXJTdHlsZXMgPSBcImJvcmRlcjowO3dpZHRoOjA7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDotOTk5OXB4XCI7XG4gICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICAgICAgLy8gV2lsbCBiZSBjaGFuZ2VkIGxhdGVyIGlmIG5lZWRlZC5cbiAgICAgIHNocmlua1dyYXBCbG9ja3NWYWwgPSBmYWxzZTtcblxuICAgICAgaWYgKCB0eXBlb2YgZGl2LnN0eWxlLnpvb20gIT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgICAgLy8gU3VwcG9ydDogSUU2XG4gICAgICAgIC8vIENoZWNrIGlmIGVsZW1lbnRzIHdpdGggbGF5b3V0IHNocmluay13cmFwIHRoZWlyIGNoaWxkcmVuXG4gICAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gZGl2UmVzZXQgKyBcIjt3aWR0aDoxcHg7cGFkZGluZzoxcHg7em9vbToxXCI7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxkaXY+PC9kaXY+XCI7XG4gICAgICAgIGRpdi5maXJzdENoaWxkLnN0eWxlLndpZHRoID0gXCI1cHhcIjtcbiAgICAgICAgc2hyaW5rV3JhcEJsb2Nrc1ZhbCA9IGRpdi5vZmZzZXRXaWR0aCAhPT0gMztcbiAgICAgIH1cblxuICAgICAgYm9keS5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cbiAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXG4gICAgICBib2R5ID0gY29udGFpbmVyID0gZGl2ID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hyaW5rV3JhcEJsb2Nrc1ZhbDtcbiAgfTtcblxufSkoKTtcbnZhciBybWFyZ2luID0gKC9ebWFyZ2luLyk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxuXG5cbnZhciBnZXRTdHlsZXMsIGN1ckNTUyxcbiAgcnBvc2l0aW9uID0gL14odG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KSQvO1xuXG5pZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xuICBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgICByZXR1cm4gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcbiAgfTtcblxuICBjdXJDU1MgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG4gICAgdmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcbiAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcblxuICAgIGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cbiAgICAvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG9ubHkgbmVlZGVkIGZvciAuY3NzKCdmaWx0ZXInKSBpbiBJRTksIHNlZSAjMTI1MzdcbiAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCBjb21wdXRlZCApIHtcblxuICAgICAgaWYgKCByZXQgPT09IFwiXCIgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG4gICAgICAgIHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuICAgICAgfVxuXG4gICAgICAvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG4gICAgICAvLyBDaHJvbWUgPCAxNyBhbmQgU2FmYXJpIDUuMCB1c2VzIFwiY29tcHV0ZWQgdmFsdWVcIiBpbnN0ZWFkIG9mIFwidXNlZCB2YWx1ZVwiIGZvciBtYXJnaW4tcmlnaHRcbiAgICAgIC8vIFNhZmFyaSA1LjEuNyAoYXQgbGVhc3QpIHJldHVybnMgcGVyY2VudGFnZSBmb3IgYSBsYXJnZXIgc2V0IG9mIHZhbHVlcywgYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVsc1xuICAgICAgLy8gdGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOiBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG4gICAgICBpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICAgIHdpZHRoID0gc3R5bGUud2lkdGg7XG4gICAgICAgIG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG4gICAgICAgIG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cbiAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG4gICAgICAgIHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG4gICAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgc3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcbiAgICAgICAgc3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0OiBJRVxuICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG4gICAgcmV0dXJuIHJldCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHJldCA6XG4gICAgICByZXQgKyBcIlwiO1xuICB9O1xufSBlbHNlIGlmICggZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmN1cnJlbnRTdHlsZSApIHtcbiAgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGVsZW0uY3VycmVudFN0eWxlO1xuICB9O1xuXG4gIGN1ckNTUyA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcbiAgICB2YXIgbGVmdCwgcnMsIHJzTGVmdCwgcmV0LFxuICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xuXG4gICAgY29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcbiAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkWyBuYW1lIF0gOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBBdm9pZCBzZXR0aW5nIHJldCB0byBlbXB0eSBzdHJpbmcgaGVyZVxuICAgIC8vIHNvIHdlIGRvbid0IGRlZmF1bHQgdG8gYXV0b1xuICAgIGlmICggcmV0ID09IG51bGwgJiYgc3R5bGUgJiYgc3R5bGVbIG5hbWUgXSApIHtcbiAgICAgIHJldCA9IHN0eWxlWyBuYW1lIF07XG4gICAgfVxuXG4gICAgLy8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xuICAgIC8vIGh0dHA6Ly9lcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwNy8wNy8yNy8xOC41NC4xNS8jY29tbWVudC0xMDIyOTFcblxuICAgIC8vIElmIHdlJ3JlIG5vdCBkZWFsaW5nIHdpdGggYSByZWd1bGFyIHBpeGVsIG51bWJlclxuICAgIC8vIGJ1dCBhIG51bWJlciB0aGF0IGhhcyBhIHdlaXJkIGVuZGluZywgd2UgbmVlZCB0byBjb252ZXJ0IGl0IHRvIHBpeGVsc1xuICAgIC8vIGJ1dCBub3QgcG9zaXRpb24gY3NzIGF0dHJpYnV0ZXMsIGFzIHRob3NlIGFyZSBwcm9wb3J0aW9uYWwgdG8gdGhlIHBhcmVudCBlbGVtZW50IGluc3RlYWRcbiAgICAvLyBhbmQgd2UgY2FuJ3QgbWVhc3VyZSB0aGUgcGFyZW50IGluc3RlYWQgYmVjYXVzZSBpdCBtaWdodCB0cmlnZ2VyIGEgXCJzdGFja2luZyBkb2xsc1wiIHByb2JsZW1cbiAgICBpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiAhcnBvc2l0aW9uLnRlc3QoIG5hbWUgKSApIHtcblxuICAgICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuICAgICAgbGVmdCA9IHN0eWxlLmxlZnQ7XG4gICAgICBycyA9IGVsZW0ucnVudGltZVN0eWxlO1xuICAgICAgcnNMZWZ0ID0gcnMgJiYgcnMubGVmdDtcblxuICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgaWYgKCByc0xlZnQgKSB7XG4gICAgICAgIHJzLmxlZnQgPSBlbGVtLmN1cnJlbnRTdHlsZS5sZWZ0O1xuICAgICAgfVxuICAgICAgc3R5bGUubGVmdCA9IG5hbWUgPT09IFwiZm9udFNpemVcIiA/IFwiMWVtXCIgOiByZXQ7XG4gICAgICByZXQgPSBzdHlsZS5waXhlbExlZnQgKyBcInB4XCI7XG5cbiAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgIHN0eWxlLmxlZnQgPSBsZWZ0O1xuICAgICAgaWYgKCByc0xlZnQgKSB7XG4gICAgICAgIHJzLmxlZnQgPSByc0xlZnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydDogSUVcbiAgICAvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZCA/XG4gICAgICByZXQgOlxuICAgICAgcmV0ICsgXCJcIiB8fCBcImF1dG9cIjtcbiAgfTtcbn1cblxuXG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuICAvLyBEZWZpbmUgdGhlIGhvb2ssIHdlJ2xsIGNoZWNrIG9uIHRoZSBmaXJzdCBydW4gaWYgaXQncyByZWFsbHkgbmVlZGVkLlxuICByZXR1cm4ge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29uZGl0aW9uID0gY29uZGl0aW9uRm4oKTtcblxuICAgICAgaWYgKCBjb25kaXRpb24gPT0gbnVsbCApIHtcbiAgICAgICAgLy8gVGhlIHRlc3Qgd2FzIG5vdCByZWFkeSBhdCB0aGlzIHBvaW50OyBzY3JldyB0aGUgaG9vayB0aGlzIHRpbWVcbiAgICAgICAgLy8gYnV0IGNoZWNrIGFnYWluIHdoZW4gbmVlZGVkIG5leHQgdGltZS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGNvbmRpdGlvbiApIHtcbiAgICAgICAgLy8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksXG4gICAgICAgIC8vIHJlbW92ZSBpdC5cbiAgICAgICAgLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIGhvb2tzIGZvciBtYXJnaW5SaWdodCwgcmVtb3ZlIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmdldDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblxuICAgICAgcmV0dXJuICh0aGlzLmdldCA9IGhvb2tGbikuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIH1cbiAgfTtcbn1cblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBhLCByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwsIGJveFNpemluZ1ZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsXG4gICAgcGl4ZWxQb3NpdGlvblZhbCwgcmVsaWFibGVNYXJnaW5SaWdodFZhbCxcbiAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG4gICAgY29udGFpbmVyU3R5bGVzID0gXCJib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6LTk5OTlweFwiLFxuICAgIGRpdlJlc2V0ID1cbiAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcbiAgICAgIFwiZGlzcGxheTpibG9jaztwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjBcIjtcblxuICAvLyBTZXR1cFxuICBkaXYuaW5uZXJIVE1MID0gXCIgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPScvYSc+YTwvYT48aW5wdXQgdHlwZT0nY2hlY2tib3gnLz5cIjtcbiAgYSA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJhXCIgKVsgMCBdO1xuXG4gIGEuc3R5bGUuY3NzVGV4dCA9IFwiZmxvYXQ6bGVmdDtvcGFjaXR5Oi41XCI7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgZWxlbWVudCBvcGFjaXR5IGV4aXN0c1xuICAvLyAoSUUgdXNlcyBmaWx0ZXIgaW5zdGVhZClcbiAgLy8gVXNlIGEgcmVnZXggdG8gd29yayBhcm91bmQgYSBXZWJLaXQgaXNzdWUuIFNlZSAjNTE0NVxuICBzdXBwb3J0Lm9wYWNpdHkgPSAvXjAuNS8udGVzdCggYS5zdHlsZS5vcGFjaXR5ICk7XG5cbiAgLy8gVmVyaWZ5IHN0eWxlIGZsb2F0IGV4aXN0ZW5jZVxuICAvLyAoSUUgdXNlcyBzdHlsZUZsb2F0IGluc3RlYWQgb2YgY3NzRmxvYXQpXG4gIHN1cHBvcnQuY3NzRmxvYXQgPSAhIWEuc3R5bGUuY3NzRmxvYXQ7XG5cbiAgZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuICBkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuICBzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG4gIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXG4gIGEgPSBkaXYgPSBudWxsO1xuXG4gIGpRdWVyeS5leHRlbmQoc3VwcG9ydCwge1xuICAgIHJlbGlhYmxlSGlkZGVuT2Zmc2V0czogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCAhPSBudWxsICkge1xuICAgICAgICByZXR1cm4gcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGFpbmVyLCB0ZHMsIGlzU3VwcG9ydGVkLFxuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJib2R5XCIgKVsgMCBdO1xuXG4gICAgICBpZiAoICFib2R5ICkge1xuICAgICAgICAvLyBSZXR1cm4gZm9yIGZyYW1lc2V0IGRvY3MgdGhhdCBkb24ndCBoYXZlIGEgYm9keVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNldHVwXG4gICAgICBkaXYuc2V0QXR0cmlidXRlKCBcImNsYXNzTmFtZVwiLCBcInRcIiApO1xuICAgICAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG5cbiAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gY29udGFpbmVyU3R5bGVzO1xuXG4gICAgICBib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKS5hcHBlbmRDaGlsZCggZGl2ICk7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IElFOFxuICAgICAgLy8gQ2hlY2sgaWYgdGFibGUgY2VsbHMgc3RpbGwgaGF2ZSBvZmZzZXRXaWR0aC9IZWlnaHQgd2hlbiB0aGV5IGFyZSBzZXRcbiAgICAgIC8vIHRvIGRpc3BsYXk6bm9uZSBhbmQgdGhlcmUgYXJlIHN0aWxsIG90aGVyIHZpc2libGUgdGFibGUgY2VsbHMgaW4gYVxuICAgICAgLy8gdGFibGUgcm93OyBpZiBzbywgb2Zmc2V0V2lkdGgvSGVpZ2h0IGFyZSBub3QgcmVsaWFibGUgZm9yIHVzZSB3aGVuXG4gICAgICAvLyBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGhhcyBiZWVuIGhpZGRlbiBkaXJlY3RseSB1c2luZ1xuICAgICAgLy8gZGlzcGxheTpub25lIChpdCBpcyBzdGlsbCBzYWZlIHRvIHVzZSBvZmZzZXRzIGlmIGEgcGFyZW50IGVsZW1lbnQgaXNcbiAgICAgIC8vIGhpZGRlbjsgZG9uIHNhZmV0eSBnb2dnbGVzIGFuZCBzZWUgYnVnICM0NTEyIGZvciBtb3JlIGluZm9ybWF0aW9uKS5cbiAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0YWJsZT48dHI+PHRkPjwvdGQ+PHRkPnQ8L3RkPjwvdHI+PC90YWJsZT5cIjtcbiAgICAgIHRkcyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0ZFwiICk7XG4gICAgICB0ZHNbIDAgXS5zdHlsZS5jc3NUZXh0ID0gXCJwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7ZGlzcGxheTpub25lXCI7XG4gICAgICBpc1N1cHBvcnRlZCA9ICggdGRzWyAwIF0ub2Zmc2V0SGVpZ2h0ID09PSAwICk7XG5cbiAgICAgIHRkc1sgMCBdLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgdGRzWyAxIF0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAvLyBTdXBwb3J0OiBJRThcbiAgICAgIC8vIENoZWNrIGlmIGVtcHR5IHRhYmxlIGNlbGxzIHN0aWxsIGhhdmUgb2Zmc2V0V2lkdGgvSGVpZ2h0XG4gICAgICByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwgPSBpc1N1cHBvcnRlZCAmJiAoIHRkc1sgMCBdLm9mZnNldEhlaWdodCA9PT0gMCApO1xuXG4gICAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuICAgICAgLy8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRS5cbiAgICAgIGRpdiA9IGJvZHkgPSBudWxsO1xuXG4gICAgICByZXR1cm4gcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsO1xuICAgIH0sXG5cbiAgICBib3hTaXppbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBib3hTaXppbmdWYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBib3hTaXppbmdWYWw7XG4gICAgfSxcblxuICAgIGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBib3hTaXppbmdSZWxpYWJsZVZhbDtcbiAgICB9LFxuXG4gICAgcGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIHBpeGVsUG9zaXRpb25WYWwgPT0gbnVsbCApIHtcbiAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuICAgIH0sXG5cbiAgICByZWxpYWJsZU1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBib2R5LCBjb250YWluZXIsIGRpdiwgbWFyZ2luRGl2O1xuXG4gICAgICAvLyBVc2Ugd2luZG93LmdldENvbXB1dGVkU3R5bGUgYmVjYXVzZSBqc2RvbSBvbiBub2RlLmpzIHdpbGwgYnJlYWsgd2l0aG91dCBpdC5cbiAgICAgIGlmICggcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9PSBudWxsICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xuICAgICAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYm9keVwiIClbIDAgXTtcbiAgICAgICAgaWYgKCAhYm9keSApIHtcbiAgICAgICAgICAvLyBUZXN0IGZpcmVkIHRvbyBlYXJseSBvciBpbiBhbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudCwgZXhpdC5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBjb250YWluZXJTdHlsZXM7XG5cbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggY29udGFpbmVyICkuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGRpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcbiAgICAgICAgLy8gZ2V0cyBjb21wdXRlZCBtYXJnaW4tcmlnaHQgYmFzZWQgb24gd2lkdGggb2YgY29udGFpbmVyLiAoIzMzMzMpXG4gICAgICAgIC8vIEZhaWxzIGluIFdlYktpdCBiZWZvcmUgRmViIDIwMTEgbmlnaHRsaWVzXG4gICAgICAgIC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuICAgICAgICBtYXJnaW5EaXYgPSBkaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuICAgICAgICBtYXJnaW5EaXYuc3R5bGUuY3NzVGV4dCA9IGRpdi5zdHlsZS5jc3NUZXh0ID0gZGl2UmVzZXQ7XG4gICAgICAgIG1hcmdpbkRpdi5zdHlsZS5tYXJnaW5SaWdodCA9IG1hcmdpbkRpdi5zdHlsZS53aWR0aCA9IFwiMFwiO1xuICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBcIjFweFwiO1xuXG4gICAgICAgIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWwgPVxuICAgICAgICAgICFwYXJzZUZsb2F0KCAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBtYXJnaW5EaXYsIG51bGwgKSB8fCB7fSApLm1hcmdpblJpZ2h0ICk7XG5cbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZWxpYWJsZU1hcmdpblJpZ2h0VmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY29tcHV0ZVN0eWxlVGVzdHMoKSB7XG4gICAgdmFyIGNvbnRhaW5lciwgZGl2LFxuICAgICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XG5cbiAgICBpZiAoICFib2R5ICkge1xuICAgICAgLy8gVGVzdCBmaXJlZCB0b28gZWFybHkgb3IgaW4gYW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQsIGV4aXQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGNvbnRhaW5lclN0eWxlcztcblxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID1cbiAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O1wiICtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MXB4O2JvcmRlcjoxcHg7d2lkdGg6NHB4O1wiICtcbiAgICAgICAgXCJtYXJnaW4tdG9wOjElO3RvcDoxJVwiO1xuXG4gICAgLy8gV29ya2Fyb3VuZCBmYWlsaW5nIGJveFNpemluZyB0ZXN0IGR1ZSB0byBvZmZzZXRXaWR0aCByZXR1cm5pbmcgd3JvbmcgdmFsdWVcbiAgICAvLyB3aXRoIHNvbWUgbm9uLTEgdmFsdWVzIG9mIGJvZHkgem9vbSwgdGlja2V0ICMxMzU0M1xuICAgIGpRdWVyeS5zd2FwKCBib2R5LCBib2R5LnN0eWxlLnpvb20gIT0gbnVsbCA/IHsgem9vbTogMSB9IDoge30sIGZ1bmN0aW9uKCkge1xuICAgICAgYm94U2l6aW5nVmFsID0gZGl2Lm9mZnNldFdpZHRoID09PSA0O1xuICAgIH0pO1xuXG4gICAgLy8gV2lsbCBiZSBjaGFuZ2VkIGxhdGVyIGlmIG5lZWRlZC5cbiAgICBib3hTaXppbmdSZWxpYWJsZVZhbCA9IHRydWU7XG4gICAgcGl4ZWxQb3NpdGlvblZhbCA9IGZhbHNlO1xuICAgIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWwgPSB0cnVlO1xuXG4gICAgLy8gVXNlIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIGJlY2F1c2UganNkb20gb24gbm9kZS5qcyB3aWxsIGJyZWFrIHdpdGhvdXQgaXQuXG4gICAgaWYgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSApIHtcbiAgICAgIHBpeGVsUG9zaXRpb25WYWwgPSAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKSB8fCB7fSApLnRvcCAhPT0gXCIxJVwiO1xuICAgICAgYm94U2l6aW5nUmVsaWFibGVWYWwgPVxuICAgICAgICAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKSB8fCB7IHdpZHRoOiBcIjRweFwiIH0gKS53aWR0aCA9PT0gXCI0cHhcIjtcbiAgICB9XG5cbiAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXG4gICAgZGl2ID0gYm9keSA9IG51bGw7XG4gIH1cblxufSkoKTtcblxuXG4vLyBBIG1ldGhvZCBmb3IgcXVpY2tseSBzd2FwcGluZyBpbi9vdXQgQ1NTIHByb3BlcnRpZXMgdG8gZ2V0IGNvcnJlY3QgY2FsY3VsYXRpb25zLlxualF1ZXJ5LnN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XG4gIHZhciByZXQsIG5hbWUsXG4gICAgb2xkID0ge307XG5cbiAgLy8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG4gIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcbiAgICBvbGRbIG5hbWUgXSA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcbiAgICBlbGVtLnN0eWxlWyBuYW1lIF0gPSBvcHRpb25zWyBuYW1lIF07XG4gIH1cblxuICByZXQgPSBjYWxsYmFjay5hcHBseSggZWxlbSwgYXJncyB8fCBbXSApO1xuXG4gIC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuXG52YXJcbiAgICByYWxwaGEgPSAvYWxwaGFcXChbXildKlxcKS9pLFxuICByb3BhY2l0eSA9IC9vcGFjaXR5XFxzKj1cXHMqKFteKV0qKS8sXG5cbiAgLy8gc3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZSBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcbiAgLy8gc2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG4gIHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcbiAgcm51bXNwbGl0ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSguKikkXCIsIFwiaVwiICksXG4gIHJyZWxOdW0gPSBuZXcgUmVnRXhwKCBcIl4oWystXSk9KFwiICsgcG51bSArIFwiKVwiLCBcImlcIiApLFxuXG4gIGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuICBjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG4gICAgbGV0dGVyU3BhY2luZzogMCxcbiAgICBmb250V2VpZ2h0OiA0MDBcbiAgfSxcblxuICBjc3NQcmVmaXhlcyA9IFsgXCJXZWJraXRcIiwgXCJPXCIsIFwiTW96XCIsIFwibXNcIiBdO1xuXG5cbi8vIHJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKCBzdHlsZSwgbmFtZSApIHtcblxuICAvLyBzaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuICBpZiAoIG5hbWUgaW4gc3R5bGUgKSB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICAvLyBjaGVjayBmb3IgdmVuZG9yIHByZWZpeGVkIG5hbWVzXG4gIHZhciBjYXBOYW1lID0gbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSksXG4gICAgb3JpZ05hbWUgPSBuYW1lLFxuICAgIGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCBpLS0gKSB7XG4gICAgbmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuICAgIGlmICggbmFtZSBpbiBzdHlsZSApIHtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcmlnTmFtZTtcbn1cblxuZnVuY3Rpb24gc2hvd0hpZGUoIGVsZW1lbnRzLCBzaG93ICkge1xuICB2YXIgZGlzcGxheSwgZWxlbSwgaGlkZGVuLFxuICAgIHZhbHVlcyA9IFtdLFxuICAgIGluZGV4ID0gMCxcbiAgICBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cbiAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcbiAgICBlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG4gICAgaWYgKCAhZWxlbS5zdHlsZSApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhbHVlc1sgaW5kZXggXSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKTtcbiAgICBkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5O1xuICAgIGlmICggc2hvdyApIHtcbiAgICAgIC8vIFJlc2V0IHRoZSBpbmxpbmUgZGlzcGxheSBvZiB0aGlzIGVsZW1lbnQgdG8gbGVhcm4gaWYgaXQgaXNcbiAgICAgIC8vIGJlaW5nIGhpZGRlbiBieSBjYXNjYWRlZCBydWxlcyBvciBub3RcbiAgICAgIGlmICggIXZhbHVlc1sgaW5kZXggXSAmJiBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IGVsZW1lbnRzIHdoaWNoIGhhdmUgYmVlbiBvdmVycmlkZGVuIHdpdGggZGlzcGxheTogbm9uZVxuICAgICAgLy8gaW4gYSBzdHlsZXNoZWV0IHRvIHdoYXRldmVyIHRoZSBkZWZhdWx0IGJyb3dzZXIgc3R5bGUgaXNcbiAgICAgIC8vIGZvciBzdWNoIGFuIGVsZW1lbnRcbiAgICAgIGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKCBlbGVtICkgKSB7XG4gICAgICAgIHZhbHVlc1sgaW5kZXggXSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGRlZmF1bHREaXNwbGF5KGVsZW0ubm9kZU5hbWUpICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKCAhdmFsdWVzWyBpbmRleCBdICkge1xuICAgICAgICBoaWRkZW4gPSBpc0hpZGRlbiggZWxlbSApO1xuXG4gICAgICAgIGlmICggZGlzcGxheSAmJiBkaXNwbGF5ICE9PSBcIm5vbmVcIiB8fCAhaGlkZGVuICkge1xuICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGhpZGRlbiA/IGRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXQgdGhlIGRpc3BsYXkgb2YgbW9zdCBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcFxuICAvLyB0byBhdm9pZCB0aGUgY29uc3RhbnQgcmVmbG93XG4gIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG4gICAgZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuICAgIGlmICggIWVsZW0uc3R5bGUgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKCAhc2hvdyB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiApIHtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IHNob3cgPyB2YWx1ZXNbIGluZGV4IF0gfHwgXCJcIiA6IFwibm9uZVwiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcbiAgdmFyIG1hdGNoZXMgPSBybnVtc3BsaXQuZXhlYyggdmFsdWUgKTtcbiAgcmV0dXJuIG1hdGNoZXMgP1xuICAgIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXG4gICAgTWF0aC5tYXgoIDAsIG1hdGNoZXNbIDEgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDIgXSB8fCBcInB4XCIgKSA6XG4gICAgdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcyApIHtcbiAgdmFyIGkgPSBleHRyYSA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApID9cbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cbiAgICA0IDpcbiAgICAvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG4gICAgbmFtZSA9PT0gXCJ3aWR0aFwiID8gMSA6IDAsXG5cbiAgICB2YWwgPSAwO1xuXG4gIGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcbiAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XG4gICAgaWYgKCBleHRyYSA9PT0gXCJtYXJnaW5cIiApIHtcbiAgICAgIHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBleHRyYSArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcbiAgICB9XG5cbiAgICBpZiAoIGlzQm9yZGVyQm94ICkge1xuICAgICAgLy8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG4gICAgICBpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcbiAgICAgICAgdmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxuICAgICAgaWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcbiAgICAgICAgdmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQsIHNvIGFkZCBwYWRkaW5nXG4gICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcbiAgICAgIGlmICggZXh0cmEgIT09IFwicGFkZGluZ1wiICkge1xuICAgICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApIHtcblxuICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxuICB2YXIgdmFsdWVJc0JvcmRlckJveCA9IHRydWUsXG4gICAgdmFsID0gbmFtZSA9PT0gXCJ3aWR0aFwiID8gZWxlbS5vZmZzZXRXaWR0aCA6IGVsZW0ub2Zmc2V0SGVpZ2h0LFxuICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuICAgIGlzQm9yZGVyQm94ID0gc3VwcG9ydC5ib3hTaXppbmcoKSAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG4gIC8vIHNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxuICAvLyBzdmcgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02NDkyODVcbiAgLy8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XG4gIGlmICggdmFsIDw9IDAgfHwgdmFsID09IG51bGwgKSB7XG4gICAgLy8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG4gICAgdmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcbiAgICBpZiAoIHZhbCA8IDAgfHwgdmFsID09IG51bGwgKSB7XG4gICAgICB2YWwgPSBlbGVtLnN0eWxlWyBuYW1lIF07XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cbiAgICBpZiAoIHJudW1ub25weC50ZXN0KHZhbCkgKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG4gICAgLy8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuICAgIHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJiAoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG4gICAgLy8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuICAgIHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG4gIH1cblxuICAvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuICByZXR1cm4gKCB2YWwgK1xuICAgIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuICAgICAgZWxlbSxcbiAgICAgIG5hbWUsXG4gICAgICBleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG4gICAgICB2YWx1ZUlzQm9yZGVyQm94LFxuICAgICAgc3R5bGVzXG4gICAgKVxuICApICsgXCJweFwiO1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgLy8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG4gIC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuICBjc3NIb29rczoge1xuICAgIG9wYWNpdHk6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAgIC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG4gICAgICAgICAgdmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcbiAgICAgICAgICByZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcbiAgY3NzTnVtYmVyOiB7XG4gICAgXCJjb2x1bW5Db3VudFwiOiB0cnVlLFxuICAgIFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcbiAgICBcImZvbnRXZWlnaHRcIjogdHJ1ZSxcbiAgICBcImxpbmVIZWlnaHRcIjogdHJ1ZSxcbiAgICBcIm9wYWNpdHlcIjogdHJ1ZSxcbiAgICBcIm9yZGVyXCI6IHRydWUsXG4gICAgXCJvcnBoYW5zXCI6IHRydWUsXG4gICAgXCJ3aWRvd3NcIjogdHJ1ZSxcbiAgICBcInpJbmRleFwiOiB0cnVlLFxuICAgIFwiem9vbVwiOiB0cnVlXG4gIH0sXG5cbiAgLy8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuICAvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG4gIGNzc1Byb3BzOiB7XG4gICAgLy8gbm9ybWFsaXplIGZsb2F0IGNzcyBwcm9wZXJ0eVxuICAgIFwiZmxvYXRcIjogc3VwcG9ydC5jc3NGbG9hdCA/IFwiY3NzRmxvYXRcIiA6IFwic3R5bGVGbG9hdFwiXG4gIH0sXG5cbiAgLy8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcbiAgc3R5bGU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEgKSB7XG4gICAgLy8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG4gICAgaWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG4gICAgdmFyIHJldCwgdHlwZSwgaG9va3MsXG4gICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcbiAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcblxuICAgIG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggc3R5bGUsIG9yaWdOYW1lICkgKTtcblxuICAgIC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cbiAgICAvLyBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCB2ZXJzaW9uXG4gICAgaG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcbiAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gICAgICAvLyBjb252ZXJ0IHJlbGF0aXZlIG51bWJlciBzdHJpbmdzICgrPSBvciAtPSkgdG8gcmVsYXRpdmUgbnVtYmVycy4gIzczNDVcbiAgICAgIGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAocmV0ID0gcnJlbE51bS5leGVjKCB2YWx1ZSApKSApIHtcbiAgICAgICAgdmFsdWUgPSAoIHJldFsxXSArIDEgKSAqIHJldFsyXSArIHBhcnNlRmxvYXQoIGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKSApO1xuICAgICAgICAvLyBGaXhlcyBidWcgIzkyMzdcbiAgICAgICAgdHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldC4gU2VlOiAjNzExNlxuICAgICAgaWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgJ3B4JyB0byB0aGUgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcbiAgICAgIGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiAmJiAhalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSApIHtcbiAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBGaXhlcyAjODkwOCwgaXQgY2FuIGJlIGRvbmUgbW9yZSBjb3JyZWN0bHkgYnkgc3BlY2lmaW5nIHNldHRlcnMgaW4gY3NzSG9va3MsXG4gICAgICAvLyBidXQgaXQgd291bGQgbWVhbiB0byBkZWZpbmUgZWlnaHQgKGZvciBldmVyeSBwcm9ibGVtYXRpYyBwcm9wZXJ0eSkgaWRlbnRpY2FsIGZ1bmN0aW9uc1xuICAgICAgaWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKFwiYmFja2dyb3VuZFwiKSA9PT0gMCApIHtcbiAgICAgICAgc3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcbiAgICAgIGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgKHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAvLyBTdXBwb3J0OiBJRVxuICAgICAgICAvLyBTd2FsbG93IGVycm9ycyBmcm9tICdpbnZhbGlkJyBDU1MgdmFsdWVzICgjNTUwOSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBTdXBwb3J0OiBDaHJvbWUsIFNhZmFyaVxuICAgICAgICAgIC8vIFNldHRpbmcgc3R5bGUgdG8gYmxhbmsgc3RyaW5nIHJlcXVpcmVkIHRvIGRlbGV0ZSBcInN0eWxlOiB4ICFpbXBvcnRhbnQ7XCJcbiAgICAgICAgICBzdHlsZVsgbmFtZSBdID0gXCJcIjtcbiAgICAgICAgICBzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG4gICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcbiAgICAgIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3RcbiAgICAgIHJldHVybiBzdHlsZVsgbmFtZSBdO1xuICAgIH1cbiAgfSxcblxuICBjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuICAgIHZhciBudW0sIHZhbCwgaG9va3MsXG4gICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuICAgIG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggZWxlbS5zdHlsZSwgb3JpZ05hbWUgKSApO1xuXG4gICAgLy8gZ2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvblxuICAgIC8vIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIHZlcnNpb25cbiAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG4gICAgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuICAgICAgdmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG4gICAgaWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcbiAgICBpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcbiAgICAgIHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuICAgIH1cblxuICAgIC8vIFJldHVybiwgY29udmVydGluZyB0byBudW1iZXIgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcbiAgICBpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuICAgICAgbnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG4gICAgICByZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgalF1ZXJ5LmlzTnVtZXJpYyggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuICBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG4gICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICAvLyBjZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cbiAgICAgICAgLy8gaG93ZXZlciwgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdCBmcm9tIHRoaXNcbiAgICAgICAgcmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPT09IDAgJiYgcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSA/XG4gICAgICAgICAgalF1ZXJ5LnN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG4gICAgICAgICAgfSkgOlxuICAgICAgICAgIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcbiAgICAgIHZhciBzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoIGVsZW0gKTtcbiAgICAgIHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIGV4dHJhID9cbiAgICAgICAgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG4gICAgICAgICAgZWxlbSxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGV4dHJhLFxuICAgICAgICAgIHN1cHBvcnQuYm94U2l6aW5nKCkgJiYgalF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICBzdHlsZXNcbiAgICAgICAgKSA6IDBcbiAgICAgICk7XG4gICAgfVxuICB9O1xufSk7XG5cbmlmICggIXN1cHBvcnQub3BhY2l0eSApIHtcbiAgalF1ZXJ5LmNzc0hvb2tzLm9wYWNpdHkgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICAvLyBJRSB1c2VzIGZpbHRlcnMgZm9yIG9wYWNpdHlcbiAgICAgIHJldHVybiByb3BhY2l0eS50ZXN0KCAoY29tcHV0ZWQgJiYgZWxlbS5jdXJyZW50U3R5bGUgPyBlbGVtLmN1cnJlbnRTdHlsZS5maWx0ZXIgOiBlbGVtLnN0eWxlLmZpbHRlcikgfHwgXCJcIiApID9cbiAgICAgICAgKCAwLjAxICogcGFyc2VGbG9hdCggUmVnRXhwLiQxICkgKSArIFwiXCIgOlxuICAgICAgICBjb21wdXRlZCA/IFwiMVwiIDogXCJcIjtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICB2YXIgc3R5bGUgPSBlbGVtLnN0eWxlLFxuICAgICAgICBjdXJyZW50U3R5bGUgPSBlbGVtLmN1cnJlbnRTdHlsZSxcbiAgICAgICAgb3BhY2l0eSA9IGpRdWVyeS5pc051bWVyaWMoIHZhbHVlICkgPyBcImFscGhhKG9wYWNpdHk9XCIgKyB2YWx1ZSAqIDEwMCArIFwiKVwiIDogXCJcIixcbiAgICAgICAgZmlsdGVyID0gY3VycmVudFN0eWxlICYmIGN1cnJlbnRTdHlsZS5maWx0ZXIgfHwgc3R5bGUuZmlsdGVyIHx8IFwiXCI7XG5cbiAgICAgIC8vIElFIGhhcyB0cm91YmxlIHdpdGggb3BhY2l0eSBpZiBpdCBkb2VzIG5vdCBoYXZlIGxheW91dFxuICAgICAgLy8gRm9yY2UgaXQgYnkgc2V0dGluZyB0aGUgem9vbSBsZXZlbFxuICAgICAgc3R5bGUuem9vbSA9IDE7XG5cbiAgICAgIC8vIGlmIHNldHRpbmcgb3BhY2l0eSB0byAxLCBhbmQgbm8gb3RoZXIgZmlsdGVycyBleGlzdCAtIGF0dGVtcHQgdG8gcmVtb3ZlIGZpbHRlciBhdHRyaWJ1dGUgIzY2NTJcbiAgICAgIC8vIGlmIHZhbHVlID09PSBcIlwiLCB0aGVuIHJlbW92ZSBpbmxpbmUgb3BhY2l0eSAjMTI2ODVcbiAgICAgIGlmICggKCB2YWx1ZSA+PSAxIHx8IHZhbHVlID09PSBcIlwiICkgJiZcbiAgICAgICAgICBqUXVlcnkudHJpbSggZmlsdGVyLnJlcGxhY2UoIHJhbHBoYSwgXCJcIiApICkgPT09IFwiXCIgJiZcbiAgICAgICAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgKSB7XG5cbiAgICAgICAgLy8gU2V0dGluZyBzdHlsZS5maWx0ZXIgdG8gbnVsbCwgXCJcIiAmIFwiIFwiIHN0aWxsIGxlYXZlIFwiZmlsdGVyOlwiIGluIHRoZSBjc3NUZXh0XG4gICAgICAgIC8vIGlmIFwiZmlsdGVyOlwiIGlzIHByZXNlbnQgYXQgYWxsLCBjbGVhclR5cGUgaXMgZGlzYWJsZWQsIHdlIHdhbnQgdG8gYXZvaWQgdGhpc1xuICAgICAgICAvLyBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgaXMgSUUgT25seSwgYnV0IHNvIGFwcGFyZW50bHkgaXMgdGhpcyBjb2RlIHBhdGguLi5cbiAgICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCBcImZpbHRlclwiICk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZmlsdGVyIHN0eWxlIGFwcGxpZWQgaW4gYSBjc3MgcnVsZSBvciB1bnNldCBpbmxpbmUgb3BhY2l0eSwgd2UgYXJlIGRvbmVcbiAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJcIiB8fCBjdXJyZW50U3R5bGUgJiYgIWN1cnJlbnRTdHlsZS5maWx0ZXIgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG90aGVyd2lzZSwgc2V0IG5ldyBmaWx0ZXIgdmFsdWVzXG4gICAgICBzdHlsZS5maWx0ZXIgPSByYWxwaGEudGVzdCggZmlsdGVyICkgP1xuICAgICAgICBmaWx0ZXIucmVwbGFjZSggcmFscGhhLCBvcGFjaXR5ICkgOlxuICAgICAgICBmaWx0ZXIgKyBcIiBcIiArIG9wYWNpdHk7XG4gICAgfVxuICB9O1xufVxuXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luUmlnaHQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5SaWdodCxcbiAgZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuICAgIGlmICggY29tcHV0ZWQgKSB7XG4gICAgICAvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcbiAgICAgIC8vIFdvcmsgYXJvdW5kIGJ5IHRlbXBvcmFyaWx5IHNldHRpbmcgZWxlbWVudCBkaXNwbGF5IHRvIGlubGluZS1ibG9ja1xuICAgICAgcmV0dXJuIGpRdWVyeS5zd2FwKCBlbGVtLCB7IFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiIH0sXG4gICAgICAgIGN1ckNTUywgWyBlbGVtLCBcIm1hcmdpblJpZ2h0XCIgXSApO1xuICAgIH1cbiAgfVxuKTtcblxuLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xualF1ZXJ5LmVhY2goe1xuICBtYXJnaW46IFwiXCIsXG4gIHBhZGRpbmc6IFwiXCIsXG4gIGJvcmRlcjogXCJXaWR0aFwiXG59LCBmdW5jdGlvbiggcHJlZml4LCBzdWZmaXggKSB7XG4gIGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XG4gICAgZXhwYW5kOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgICB2YXIgaSA9IDAsXG4gICAgICAgIGV4cGFuZGVkID0ge30sXG5cbiAgICAgICAgLy8gYXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXG4gICAgICAgIHBhcnRzID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUuc3BsaXQoXCIgXCIpIDogWyB2YWx1ZSBdO1xuXG4gICAgICBmb3IgKCA7IGkgPCA0OyBpKysgKSB7XG4gICAgICAgIGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cbiAgICAgICAgICBwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleHBhbmRlZDtcbiAgICB9XG4gIH07XG5cbiAgaWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcbiAgICBqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuICB9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICAgIHZhciBzdHlsZXMsIGxlbixcbiAgICAgICAgbWFwID0ge30sXG4gICAgICAgIGkgPSAwO1xuXG4gICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XG4gICAgICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuICAgICAgICBsZW4gPSBuYW1lLmxlbmd0aDtcblxuICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICBtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG4gICAgICAgIGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcbiAgICB9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG4gIH0sXG4gIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuICB9LFxuICB0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcbiAgICBpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG4gICAgICByZXR1cm4gc3RhdGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIGlzSGlkZGVuKCB0aGlzICkgKSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeSggdGhpcyApLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuICByZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xufVxualF1ZXJ5LlR3ZWVuID0gVHdlZW47XG5cblR3ZWVuLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFR3ZWVuLFxuICBpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IFwic3dpbmdcIjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLm5vdyA9IHRoaXMuY3VyKCk7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy51bml0ID0gdW5pdCB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKTtcbiAgfSxcbiAgY3VyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG4gICAgcmV0dXJuIGhvb2tzICYmIGhvb2tzLmdldCA/XG4gICAgICBob29rcy5nZXQoIHRoaXMgKSA6XG4gICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KCB0aGlzICk7XG4gIH0sXG4gIHJ1bjogZnVuY3Rpb24oIHBlcmNlbnQgKSB7XG4gICAgdmFyIGVhc2VkLFxuICAgICAgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xuXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMuZHVyYXRpb24gKSB7XG4gICAgICB0aGlzLnBvcyA9IGVhc2VkID0galF1ZXJ5LmVhc2luZ1sgdGhpcy5lYXNpbmcgXShcbiAgICAgICAgcGVyY2VudCwgdGhpcy5vcHRpb25zLmR1cmF0aW9uICogcGVyY2VudCwgMCwgMSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvcyA9IGVhc2VkID0gcGVyY2VudDtcbiAgICB9XG4gICAgdGhpcy5ub3cgPSAoIHRoaXMuZW5kIC0gdGhpcy5zdGFydCApICogZWFzZWQgKyB0aGlzLnN0YXJ0O1xuXG4gICAgaWYgKCB0aGlzLm9wdGlvbnMuc3RlcCApIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGVwLmNhbGwoIHRoaXMuZWxlbSwgdGhpcy5ub3csIHRoaXMgKTtcbiAgICB9XG5cbiAgICBpZiAoIGhvb2tzICYmIGhvb2tzLnNldCApIHtcbiAgICAgIGhvb2tzLnNldCggdGhpcyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KCB0aGlzICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5Ud2Vlbi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGUgPSBUd2Vlbi5wcm90b3R5cGU7XG5cblR3ZWVuLnByb3BIb29rcyA9IHtcbiAgX2RlZmF1bHQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIGlmICggdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdICE9IG51bGwgJiZcbiAgICAgICAgKCF0d2Vlbi5lbGVtLnN0eWxlIHx8IHR3ZWVuLmVsZW0uc3R5bGVbIHR3ZWVuLnByb3AgXSA9PSBudWxsKSApIHtcbiAgICAgICAgcmV0dXJuIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXTtcbiAgICAgIH1cblxuICAgICAgLy8gcGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG4gICAgICAvLyBhdHRlbXB0IGEgcGFyc2VGbG9hdCBhbmQgZmFsbGJhY2sgdG8gYSBzdHJpbmcgaWYgdGhlIHBhcnNlIGZhaWxzXG4gICAgICAvLyBzbywgc2ltcGxlIHZhbHVlcyBzdWNoIGFzIFwiMTBweFwiIGFyZSBwYXJzZWQgdG8gRmxvYXQuXG4gICAgICAvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzIGlzLlxuICAgICAgcmVzdWx0ID0galF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIiApO1xuICAgICAgLy8gRW1wdHkgc3RyaW5ncywgbnVsbCwgdW5kZWZpbmVkIGFuZCBcImF1dG9cIiBhcmUgY29udmVydGVkIHRvIDAuXG4gICAgICByZXR1cm4gIXJlc3VsdCB8fCByZXN1bHQgPT09IFwiYXV0b1wiID8gMCA6IHJlc3VsdDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuICAgICAgLy8gdXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQgLSB1c2UgY3NzSG9vayBpZiBpdHMgdGhlcmUgLSB1c2UgLnN0eWxlIGlmIGl0c1xuICAgICAgLy8gYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGVcbiAgICAgIGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcbiAgICAgICAgalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSggdHdlZW4gKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0uc3R5bGUgJiYgKCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHwgalF1ZXJ5LmNzc0hvb2tzWyB0d2Vlbi5wcm9wIF0gKSApIHtcbiAgICAgICAgalF1ZXJ5LnN0eWxlKCB0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCB0d2Vlbi5ub3cgKyB0d2Vlbi51bml0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTlcbi8vIFBhbmljIGJhc2VkIGFwcHJvYWNoIHRvIHNldHRpbmcgdGhpbmdzIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXG5Ud2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XG4gIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuICAgIGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAmJiB0d2Vlbi5lbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG4gICAgfVxuICB9XG59O1xuXG5qUXVlcnkuZWFzaW5nID0ge1xuICBsaW5lYXI6IGZ1bmN0aW9uKCBwICkge1xuICAgIHJldHVybiBwO1xuICB9LFxuICBzd2luZzogZnVuY3Rpb24oIHAgKSB7XG4gICAgcmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcbiAgfVxufTtcblxualF1ZXJ5LmZ4ID0gVHdlZW4ucHJvdG90eXBlLmluaXQ7XG5cbi8vIEJhY2sgQ29tcGF0IDwxLjggZXh0ZW5zaW9uIHBvaW50XG5qUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5cblxuXG52YXJcbiAgZnhOb3csIHRpbWVySWQsXG4gIHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuICByZnhudW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApLFxuICBycnVuID0gL3F1ZXVlSG9va3MkLyxcbiAgYW5pbWF0aW9uUHJlZmlsdGVycyA9IFsgZGVmYXVsdFByZWZpbHRlciBdLFxuICB0d2VlbmVycyA9IHtcbiAgICBcIipcIjogWyBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG4gICAgICB2YXIgdHdlZW4gPSB0aGlzLmNyZWF0ZVR3ZWVuKCBwcm9wLCB2YWx1ZSApLFxuICAgICAgICB0YXJnZXQgPSB0d2Vlbi5jdXIoKSxcbiAgICAgICAgcGFydHMgPSByZnhudW0uZXhlYyggdmFsdWUgKSxcbiAgICAgICAgdW5pdCA9IHBhcnRzICYmIHBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cbiAgICAgICAgLy8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcbiAgICAgICAgc3RhcnQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK3RhcmdldCApICYmXG4gICAgICAgICAgcmZ4bnVtLmV4ZWMoIGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHByb3AgKSApLFxuICAgICAgICBzY2FsZSA9IDEsXG4gICAgICAgIG1heEl0ZXJhdGlvbnMgPSAyMDtcblxuICAgICAgaWYgKCBzdGFydCAmJiBzdGFydFsgMyBdICE9PSB1bml0ICkge1xuICAgICAgICAvLyBUcnVzdCB1bml0cyByZXBvcnRlZCBieSBqUXVlcnkuY3NzXG4gICAgICAgIHVuaXQgPSB1bml0IHx8IHN0YXJ0WyAzIF07XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHVwZGF0ZSB0aGUgdHdlZW4gcHJvcGVydGllcyBsYXRlciBvblxuICAgICAgICBwYXJ0cyA9IHBhcnRzIHx8IFtdO1xuXG4gICAgICAgIC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgIHN0YXJ0ID0gK3RhcmdldCB8fCAxO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKlxuICAgICAgICAgIC8vIFVzZSBhIHN0cmluZyBmb3IgZG91YmxpbmcgZmFjdG9yIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG4gICAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCBcIi41XCI7XG5cbiAgICAgICAgICAvLyBBZGp1c3QgYW5kIGFwcGx5XG4gICAgICAgICAgc3RhcnQgPSBzdGFydCAvIHNjYWxlO1xuICAgICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgcHJvcCwgc3RhcnQgKyB1bml0ICk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcbiAgICAgICAgLy8gQW5kIGJyZWFraW5nIHRoZSBsb29wIGlmIHNjYWxlIGlzIHVuY2hhbmdlZCBvciBwZXJmZWN0LCBvciBpZiB3ZSd2ZSBqdXN0IGhhZCBlbm91Z2hcbiAgICAgICAgfSB3aGlsZSAoIHNjYWxlICE9PSAoc2NhbGUgPSB0d2Vlbi5jdXIoKSAvIHRhcmdldCkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0d2VlbiBwcm9wZXJ0aWVzXG4gICAgICBpZiAoIHBhcnRzICkge1xuICAgICAgICBzdGFydCA9IHR3ZWVuLnN0YXJ0ID0gK3N0YXJ0IHx8ICt0YXJnZXQgfHwgMDtcbiAgICAgICAgdHdlZW4udW5pdCA9IHVuaXQ7XG4gICAgICAgIC8vIElmIGEgKz0vLT0gdG9rZW4gd2FzIHByb3ZpZGVkLCB3ZSdyZSBkb2luZyBhIHJlbGF0aXZlIGFuaW1hdGlvblxuICAgICAgICB0d2Vlbi5lbmQgPSBwYXJ0c1sgMSBdID9cbiAgICAgICAgICBzdGFydCArICggcGFydHNbIDEgXSArIDEgKSAqIHBhcnRzWyAyIF0gOlxuICAgICAgICAgICtwYXJ0c1sgMiBdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHdlZW47XG4gICAgfSBdXG4gIH07XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGZ4Tm93ID0gdW5kZWZpbmVkO1xuICB9KTtcbiAgcmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG4gIHZhciB3aGljaCxcbiAgICBhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH0sXG4gICAgaSA9IDA7XG5cbiAgLy8gaWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuICAvLyBpZiB3ZSBkb24ndCBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG4gIGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xuICBmb3IgKCA7IGkgPCA0IDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuICAgIHdoaWNoID0gY3NzRXhwYW5kWyBpIF07XG4gICAgYXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XG4gIH1cblxuICBpZiAoIGluY2x1ZGVXaWR0aCApIHtcbiAgICBhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuICB9XG5cbiAgcmV0dXJuIGF0dHJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcbiAgdmFyIHR3ZWVuLFxuICAgIGNvbGxlY3Rpb24gPSAoIHR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIHR3ZWVuZXJzWyBcIipcIiBdICksXG4gICAgaW5kZXggPSAwLFxuICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgIGlmICggKHR3ZWVuID0gY29sbGVjdGlvblsgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIHByb3AsIHZhbHVlICkpICkge1xuXG4gICAgICAvLyB3ZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJlZmlsdGVyKCBlbGVtLCBwcm9wcywgb3B0cyApIHtcbiAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICB2YXIgcHJvcCwgdmFsdWUsIHRvZ2dsZSwgdHdlZW4sIGhvb2tzLCBvbGRmaXJlLCBkaXNwbGF5LCBkRGlzcGxheSxcbiAgICBhbmltID0gdGhpcyxcbiAgICBvcmlnID0ge30sXG4gICAgc3R5bGUgPSBlbGVtLnN0eWxlLFxuICAgIGhpZGRlbiA9IGVsZW0ubm9kZVR5cGUgJiYgaXNIaWRkZW4oIGVsZW0gKSxcbiAgICBkYXRhU2hvdyA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJmeHNob3dcIiApO1xuXG4gIC8vIGhhbmRsZSBxdWV1ZTogZmFsc2UgcHJvbWlzZXNcbiAgaWYgKCAhb3B0cy5xdWV1ZSApIHtcbiAgICBob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgXCJmeFwiICk7XG4gICAgaWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xuICAgICAgaG9va3MudW5xdWV1ZWQgPSAwO1xuICAgICAgb2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG4gICAgICBob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggIWhvb2tzLnVucXVldWVkICkge1xuICAgICAgICAgIG9sZGZpcmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaG9va3MudW5xdWV1ZWQrKztcblxuICAgIGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gZG9pbmcgdGhpcyBtYWtlcyBzdXJlIHRoYXQgdGhlIGNvbXBsZXRlIGhhbmRsZXIgd2lsbCBiZSBjYWxsZWRcbiAgICAgIC8vIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuICAgICAgYW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgIGhvb2tzLnVucXVldWVkLS07XG4gICAgICAgIGlmICggIWpRdWVyeS5xdWV1ZSggZWxlbSwgXCJmeFwiICkubGVuZ3RoICkge1xuICAgICAgICAgIGhvb2tzLmVtcHR5LmZpcmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBoZWlnaHQvd2lkdGggb3ZlcmZsb3cgcGFzc1xuICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcImhlaWdodFwiIGluIHByb3BzIHx8IFwid2lkdGhcIiBpbiBwcm9wcyApICkge1xuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG5vdGhpbmcgc25lYWtzIG91dFxuICAgIC8vIFJlY29yZCBhbGwgMyBvdmVyZmxvdyBhdHRyaWJ1dGVzIGJlY2F1c2UgSUUgZG9lcyBub3RcbiAgICAvLyBjaGFuZ2UgdGhlIG92ZXJmbG93IGF0dHJpYnV0ZSB3aGVuIG92ZXJmbG93WCBhbmRcbiAgICAvLyBvdmVyZmxvd1kgYXJlIHNldCB0byB0aGUgc2FtZSB2YWx1ZVxuICAgIG9wdHMub3ZlcmZsb3cgPSBbIHN0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WSBdO1xuXG4gICAgLy8gU2V0IGRpc3BsYXkgcHJvcGVydHkgdG8gaW5saW5lLWJsb2NrIGZvciBoZWlnaHQvd2lkdGhcbiAgICAvLyBhbmltYXRpb25zIG9uIGlubGluZSBlbGVtZW50cyB0aGF0IGFyZSBoYXZpbmcgd2lkdGgvaGVpZ2h0IGFuaW1hdGVkXG4gICAgZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG4gICAgZERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApO1xuICAgIGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG4gICAgICBkaXNwbGF5ID0gZERpc3BsYXk7XG4gICAgfVxuICAgIGlmICggZGlzcGxheSA9PT0gXCJpbmxpbmVcIiAmJlxuICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cbiAgICAgIC8vIGlubGluZS1sZXZlbCBlbGVtZW50cyBhY2NlcHQgaW5saW5lLWJsb2NrO1xuICAgICAgLy8gYmxvY2stbGV2ZWwgZWxlbWVudHMgbmVlZCB0byBiZSBpbmxpbmUgd2l0aCBsYXlvdXRcbiAgICAgIGlmICggIXN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCB8fCBkRGlzcGxheSA9PT0gXCJpbmxpbmVcIiApIHtcbiAgICAgICAgc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZS56b29tID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG4gICAgc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIGlmICggIXN1cHBvcnQuc2hyaW5rV3JhcEJsb2NrcygpICkge1xuICAgICAgYW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1ggPSBvcHRzLm92ZXJmbG93WyAxIF07XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9IG9wdHMub3ZlcmZsb3dbIDIgXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNob3cvaGlkZSBwYXNzXG4gIGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG4gICAgdmFsdWUgPSBwcm9wc1sgcHJvcCBdO1xuICAgIGlmICggcmZ4dHlwZXMuZXhlYyggdmFsdWUgKSApIHtcbiAgICAgIGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xuICAgICAgdG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xuICAgICAgaWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgZGF0YVNob3cgbGVmdCBvdmVyIGZyb20gYSBzdG9wcGVkIGhpZGUgb3Igc2hvdyBhbmQgd2UgYXJlIGdvaW5nIHRvIHByb2NlZWQgd2l0aCBzaG93LCB3ZSBzaG91bGQgcHJldGVuZCB0byBiZSBoaWRkZW5cbiAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcbiAgICBpZiAoIGRhdGFTaG93ICkge1xuICAgICAgaWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuICAgICAgICBoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFTaG93ID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCBcImZ4c2hvd1wiLCB7fSApO1xuICAgIH1cblxuICAgIC8vIHN0b3JlIHN0YXRlIGlmIGl0cyB0b2dnbGUgLSBlbmFibGVzIC5zdG9wKCkudG9nZ2xlKCkgdG8gXCJyZXZlcnNlXCJcbiAgICBpZiAoIHRvZ2dsZSApIHtcbiAgICAgIGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XG4gICAgfVxuICAgIGlmICggaGlkZGVuICkge1xuICAgICAgalF1ZXJ5KCBlbGVtICkuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbmltLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSggZWxlbSApLmhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhbmltLmRvbmUoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcHJvcDtcbiAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZWxlbSwgXCJmeHNob3dcIiApO1xuICAgICAgZm9yICggcHJvcCBpbiBvcmlnICkge1xuICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvciAoIHByb3AgaW4gb3JpZyApIHtcbiAgICAgIHR3ZWVuID0gY3JlYXRlVHdlZW4oIGhpZGRlbiA/IGRhdGFTaG93WyBwcm9wIF0gOiAwLCBwcm9wLCBhbmltICk7XG5cbiAgICAgIGlmICggISggcHJvcCBpbiBkYXRhU2hvdyApICkge1xuICAgICAgICBkYXRhU2hvd1sgcHJvcCBdID0gdHdlZW4uc3RhcnQ7XG4gICAgICAgIGlmICggaGlkZGVuICkge1xuICAgICAgICAgIHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0O1xuICAgICAgICAgIHR3ZWVuLnN0YXJ0ID0gcHJvcCA9PT0gXCJ3aWR0aFwiIHx8IHByb3AgPT09IFwiaGVpZ2h0XCIgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9wRmlsdGVyKCBwcm9wcywgc3BlY2lhbEVhc2luZyApIHtcbiAgdmFyIGluZGV4LCBuYW1lLCBlYXNpbmcsIHZhbHVlLCBob29rcztcblxuICAvLyBjYW1lbENhc2UsIHNwZWNpYWxFYXNpbmcgYW5kIGV4cGFuZCBjc3NIb29rIHBhc3NcbiAgZm9yICggaW5kZXggaW4gcHJvcHMgKSB7XG4gICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIGluZGV4ICk7XG4gICAgZWFzaW5nID0gc3BlY2lhbEVhc2luZ1sgbmFtZSBdO1xuICAgIHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG4gICAgaWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcbiAgICAgIGVhc2luZyA9IHZhbHVlWyAxIF07XG4gICAgICB2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcbiAgICB9XG5cbiAgICBpZiAoIGluZGV4ICE9PSBuYW1lICkge1xuICAgICAgcHJvcHNbIG5hbWUgXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuICAgIH1cblxuICAgIGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF07XG4gICAgaWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xuICAgICAgdmFsdWUgPSBob29rcy5leHBhbmQoIHZhbHVlICk7XG4gICAgICBkZWxldGUgcHJvcHNbIG5hbWUgXTtcblxuICAgICAgLy8gbm90IHF1aXRlICQuZXh0ZW5kLCB0aGlzIHdvbnQgb3ZlcndyaXRlIGtleXMgYWxyZWFkeSBwcmVzZW50LlxuICAgICAgLy8gYWxzbyAtIHJldXNpbmcgJ2luZGV4JyBmcm9tIGFib3ZlIGJlY2F1c2Ugd2UgaGF2ZSB0aGUgY29ycmVjdCBcIm5hbWVcIlxuICAgICAgZm9yICggaW5kZXggaW4gdmFsdWUgKSB7XG4gICAgICAgIGlmICggISggaW5kZXggaW4gcHJvcHMgKSApIHtcbiAgICAgICAgICBwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyBpbmRleCBdO1xuICAgICAgICAgIHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3BlY2lhbEVhc2luZ1sgbmFtZSBdID0gZWFzaW5nO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBBbmltYXRpb24oIGVsZW0sIHByb3BlcnRpZXMsIG9wdGlvbnMgKSB7XG4gIHZhciByZXN1bHQsXG4gICAgc3RvcHBlZCxcbiAgICBpbmRleCA9IDAsXG4gICAgbGVuZ3RoID0gYW5pbWF0aW9uUHJlZmlsdGVycy5sZW5ndGgsXG4gICAgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gZG9uJ3QgbWF0Y2ggZWxlbSBpbiB0aGUgOmFuaW1hdGVkIHNlbGVjdG9yXG4gICAgICBkZWxldGUgdGljay5lbGVtO1xuICAgIH0pLFxuICAgIHRpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggc3RvcHBlZCApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gTWF0aC5tYXgoIDAsIGFuaW1hdGlvbi5zdGFydFRpbWUgKyBhbmltYXRpb24uZHVyYXRpb24gLSBjdXJyZW50VGltZSApLFxuICAgICAgICAvLyBhcmNoYWljIGNyYXNoIGJ1ZyB3b24ndCBhbGxvdyB1cyB0byB1c2UgMSAtICggMC41IHx8IDAgKSAoIzEyNDk3KVxuICAgICAgICB0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG4gICAgICAgIHBlcmNlbnQgPSAxIC0gdGVtcCxcbiAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICBsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG4gICAgICAgIGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG4gICAgICB9XG5cbiAgICAgIGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSk7XG5cbiAgICAgIGlmICggcGVyY2VudCA8IDEgJiYgbGVuZ3RoICkge1xuICAgICAgICByZXR1cm4gcmVtYWluaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uIF0gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgYW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSh7XG4gICAgICBlbGVtOiBlbGVtLFxuICAgICAgcHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXG4gICAgICBvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7IHNwZWNpYWxFYXNpbmc6IHt9IH0sIG9wdGlvbnMgKSxcbiAgICAgIG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcbiAgICAgIG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcbiAgICAgIHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcbiAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICAgICAgdHdlZW5zOiBbXSxcbiAgICAgIGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuICAgICAgICB2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG4gICAgICAgICAgICBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG4gICAgICAgIGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcbiAgICAgICAgcmV0dXJuIHR3ZWVuO1xuICAgICAgfSxcbiAgICAgIHN0b3A6IGZ1bmN0aW9uKCBnb3RvRW5kICkge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgIC8vIGlmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuICAgICAgICAgIC8vIG90aGVyd2lzZSB3ZSBza2lwIHRoaXMgcGFydFxuICAgICAgICAgIGxlbmd0aCA9IGdvdG9FbmQgPyBhbmltYXRpb24udHdlZW5zLmxlbmd0aCA6IDA7XG4gICAgICAgIGlmICggc3RvcHBlZCApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWVcbiAgICAgICAgLy8gb3RoZXJ3aXNlLCByZWplY3RcbiAgICAgICAgaWYgKCBnb3RvRW5kICkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH0pLFxuICAgIHByb3BzID0gYW5pbWF0aW9uLnByb3BzO1xuXG4gIHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XG5cbiAgZm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG4gICAgcmVzdWx0ID0gYW5pbWF0aW9uUHJlZmlsdGVyc1sgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIGVsZW0sIHByb3BzLCBhbmltYXRpb24ub3B0cyApO1xuICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICBqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG4gIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFuaW1hdGlvbi5vcHRzLnN0YXJ0ICkgKSB7XG4gICAgYW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG4gIH1cblxuICBqUXVlcnkuZngudGltZXIoXG4gICAgalF1ZXJ5LmV4dGVuZCggdGljaywge1xuICAgICAgZWxlbTogZWxlbSxcbiAgICAgIGFuaW06IGFuaW1hdGlvbixcbiAgICAgIHF1ZXVlOiBhbmltYXRpb24ub3B0cy5xdWV1ZVxuICAgIH0pXG4gICk7XG5cbiAgLy8gYXR0YWNoIGNhbGxiYWNrcyBmcm9tIG9wdGlvbnNcbiAgcmV0dXJuIGFuaW1hdGlvbi5wcm9ncmVzcyggYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MgKVxuICAgIC5kb25lKCBhbmltYXRpb24ub3B0cy5kb25lLCBhbmltYXRpb24ub3B0cy5jb21wbGV0ZSApXG4gICAgLmZhaWwoIGFuaW1hdGlvbi5vcHRzLmZhaWwgKVxuICAgIC5hbHdheXMoIGFuaW1hdGlvbi5vcHRzLmFsd2F5cyApO1xufVxuXG5qUXVlcnkuQW5pbWF0aW9uID0galF1ZXJ5LmV4dGVuZCggQW5pbWF0aW9uLCB7XG4gIHR3ZWVuZXI6IGZ1bmN0aW9uKCBwcm9wcywgY2FsbGJhY2sgKSB7XG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcHJvcHMgKSApIHtcbiAgICAgIGNhbGxiYWNrID0gcHJvcHM7XG4gICAgICBwcm9wcyA9IFsgXCIqXCIgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcHMgPSBwcm9wcy5zcGxpdChcIiBcIik7XG4gICAgfVxuXG4gICAgdmFyIHByb3AsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcbiAgICAgIHByb3AgPSBwcm9wc1sgaW5kZXggXTtcbiAgICAgIHR3ZWVuZXJzWyBwcm9wIF0gPSB0d2VlbmVyc1sgcHJvcCBdIHx8IFtdO1xuICAgICAgdHdlZW5lcnNbIHByb3AgXS51bnNoaWZ0KCBjYWxsYmFjayApO1xuICAgIH1cbiAgfSxcblxuICBwcmVmaWx0ZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgcHJlcGVuZCApIHtcbiAgICBpZiAoIHByZXBlbmQgKSB7XG4gICAgICBhbmltYXRpb25QcmVmaWx0ZXJzLnVuc2hpZnQoIGNhbGxiYWNrICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFuaW1hdGlvblByZWZpbHRlcnMucHVzaCggY2FsbGJhY2sgKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5qUXVlcnkuc3BlZWQgPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgZm4gKSB7XG4gIHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcbiAgICBjb21wbGV0ZTogZm4gfHwgIWZuICYmIGVhc2luZyB8fFxuICAgICAgalF1ZXJ5LmlzRnVuY3Rpb24oIHNwZWVkICkgJiYgc3BlZWQsXG4gICAgZHVyYXRpb246IHNwZWVkLFxuICAgIGVhc2luZzogZm4gJiYgZWFzaW5nIHx8IGVhc2luZyAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24oIGVhc2luZyApICYmIGVhc2luZ1xuICB9O1xuXG4gIG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5vZmYgPyAwIDogdHlwZW9mIG9wdC5kdXJhdGlvbiA9PT0gXCJudW1iZXJcIiA/IG9wdC5kdXJhdGlvbiA6XG4gICAgb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgPyBqUXVlcnkuZnguc3BlZWRzWyBvcHQuZHVyYXRpb24gXSA6IGpRdWVyeS5meC5zcGVlZHMuX2RlZmF1bHQ7XG5cbiAgLy8gbm9ybWFsaXplIG9wdC5xdWV1ZSAtIHRydWUvdW5kZWZpbmVkL251bGwgLT4gXCJmeFwiXG4gIGlmICggb3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlICkge1xuICAgIG9wdC5xdWV1ZSA9IFwiZnhcIjtcbiAgfVxuXG4gIC8vIFF1ZXVlaW5nXG4gIG9wdC5vbGQgPSBvcHQuY29tcGxldGU7XG5cbiAgb3B0LmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0Lm9sZCApICkge1xuICAgICAgb3B0Lm9sZC5jYWxsKCB0aGlzICk7XG4gICAgfVxuXG4gICAgaWYgKCBvcHQucXVldWUgKSB7XG4gICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBvcHQ7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZmFkZVRvOiBmdW5jdGlvbiggc3BlZWQsIHRvLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXG4gICAgLy8gc2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKCBpc0hpZGRlbiApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuICAgICAgLy8gYW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG4gICAgICAuZW5kKCkuYW5pbWF0ZSh7IG9wYWNpdHk6IHRvIH0sIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG4gIH0sXG4gIGFuaW1hdGU6IGZ1bmN0aW9uKCBwcm9wLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcbiAgICB2YXIgZW1wdHkgPSBqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcCApLFxuICAgICAgb3B0YWxsID0galF1ZXJ5LnNwZWVkKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApLFxuICAgICAgZG9BbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3RcbiAgICAgICAgdmFyIGFuaW0gPSBBbmltYXRpb24oIHRoaXMsIGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wICksIG9wdGFsbCApO1xuXG4gICAgICAgIC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxuICAgICAgICBpZiAoIGVtcHR5IHx8IGpRdWVyeS5fZGF0YSggdGhpcywgXCJmaW5pc2hcIiApICkge1xuICAgICAgICAgIGFuaW0uc3RvcCggdHJ1ZSApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZG9BbmltYXRpb24uZmluaXNoID0gZG9BbmltYXRpb247XG5cbiAgICByZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG4gICAgICB0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuICAgICAgdGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuICB9LFxuICBzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcbiAgICB2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuICAgICAgdmFyIHN0b3AgPSBob29rcy5zdG9wO1xuICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XG4gICAgICBzdG9wKCBnb3RvRW5kICk7XG4gICAgfTtcblxuICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG4gICAgICBnb3RvRW5kID0gY2xlYXJRdWV1ZTtcbiAgICAgIGNsZWFyUXVldWUgPSB0eXBlO1xuICAgICAgdHlwZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuICAgICAgdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXF1ZXVlID0gdHJ1ZSxcbiAgICAgICAgaW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxuICAgICAgICB0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuICAgICAgICBkYXRhID0galF1ZXJ5Ll9kYXRhKCB0aGlzICk7XG5cbiAgICAgIGlmICggaW5kZXggKSB7XG4gICAgICAgIGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgKSB7XG4gICAgICAgICAgc3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoIGluZGV4IGluIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCAmJiBycnVuLnRlc3QoIGluZGV4ICkgKSB7XG4gICAgICAgICAgICBzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcbiAgICAgICAgaWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiAodHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSkgKSB7XG4gICAgICAgICAgdGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggZ290b0VuZCApO1xuICAgICAgICAgIGRlcXVldWUgPSBmYWxzZTtcbiAgICAgICAgICB0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHN0YXJ0IHRoZSBuZXh0IGluIHRoZSBxdWV1ZSBpZiB0aGUgbGFzdCBzdGVwIHdhc24ndCBmb3JjZWRcbiAgICAgIC8vIHRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2ggd2lsbCBkZXF1ZXVlXG4gICAgICAvLyBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZFxuICAgICAgaWYgKCBkZXF1ZXVlIHx8ICFnb3RvRW5kICkge1xuICAgICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmaW5pc2g6IGZ1bmN0aW9uKCB0eXBlICkge1xuICAgIGlmICggdHlwZSAhPT0gZmFsc2UgKSB7XG4gICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5kZXgsXG4gICAgICAgIGRhdGEgPSBqUXVlcnkuX2RhdGEoIHRoaXMgKSxcbiAgICAgICAgcXVldWUgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZVwiIF0sXG4gICAgICAgIGhvb2tzID0gZGF0YVsgdHlwZSArIFwicXVldWVIb29rc1wiIF0sXG4gICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG4gICAgICAgIGxlbmd0aCA9IHF1ZXVlID8gcXVldWUubGVuZ3RoIDogMDtcblxuICAgICAgLy8gZW5hYmxlIGZpbmlzaGluZyBmbGFnIG9uIHByaXZhdGUgZGF0YVxuICAgICAgZGF0YS5maW5pc2ggPSB0cnVlO1xuXG4gICAgICAvLyBlbXB0eSB0aGUgcXVldWUgZmlyc3RcbiAgICAgIGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgW10gKTtcblxuICAgICAgaWYgKCBob29rcyAmJiBob29rcy5zdG9wICkge1xuICAgICAgICBob29rcy5zdG9wLmNhbGwoIHRoaXMsIHRydWUgKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9vayBmb3IgYW55IGFjdGl2ZSBhbmltYXRpb25zLCBhbmQgZmluaXNoIHRoZW1cbiAgICAgIGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG4gICAgICAgIGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkge1xuICAgICAgICAgIHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIHRydWUgKTtcbiAgICAgICAgICB0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb2sgZm9yIGFueSBhbmltYXRpb25zIGluIHRoZSBvbGQgcXVldWUgYW5kIGZpbmlzaCB0aGVtXG4gICAgICBmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuICAgICAgICBpZiAoIHF1ZXVlWyBpbmRleCBdICYmIHF1ZXVlWyBpbmRleCBdLmZpbmlzaCApIHtcbiAgICAgICAgICBxdWV1ZVsgaW5kZXggXS5maW5pc2guY2FsbCggdGhpcyApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHR1cm4gb2ZmIGZpbmlzaGluZyBmbGFnXG4gICAgICBkZWxldGUgZGF0YS5maW5pc2g7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZWFjaChbIFwidG9nZ2xlXCIsIFwic2hvd1wiLCBcImhpZGVcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcbiAgdmFyIGNzc0ZuID0galF1ZXJ5LmZuWyBuYW1lIF07XG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuICAgIHJldHVybiBzcGVlZCA9PSBudWxsIHx8IHR5cGVvZiBzcGVlZCA9PT0gXCJib29sZWFuXCIgP1xuICAgICAgY3NzRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApIDpcbiAgICAgIHRoaXMuYW5pbWF0ZSggZ2VuRngoIG5hbWUsIHRydWUgKSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcbiAgfTtcbn0pO1xuXG4vLyBHZW5lcmF0ZSBzaG9ydGN1dHMgZm9yIGN1c3RvbSBhbmltYXRpb25zXG5qUXVlcnkuZWFjaCh7XG4gIHNsaWRlRG93bjogZ2VuRngoXCJzaG93XCIpLFxuICBzbGlkZVVwOiBnZW5GeChcImhpZGVcIiksXG4gIHNsaWRlVG9nZ2xlOiBnZW5GeChcInRvZ2dsZVwiKSxcbiAgZmFkZUluOiB7IG9wYWNpdHk6IFwic2hvd1wiIH0sXG4gIGZhZGVPdXQ6IHsgb3BhY2l0eTogXCJoaWRlXCIgfSxcbiAgZmFkZVRvZ2dsZTogeyBvcGFjaXR5OiBcInRvZ2dsZVwiIH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBwcm9wcyApIHtcbiAgalF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSggcHJvcHMsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG4gIH07XG59KTtcblxualF1ZXJ5LnRpbWVycyA9IFtdO1xualF1ZXJ5LmZ4LnRpY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRpbWVyLFxuICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXG4gICAgaSA9IDA7XG5cbiAgZnhOb3cgPSBqUXVlcnkubm93KCk7XG5cbiAgZm9yICggOyBpIDwgdGltZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIHRpbWVyID0gdGltZXJzWyBpIF07XG4gICAgLy8gQ2hlY2tzIHRoZSB0aW1lciBoYXMgbm90IGFscmVhZHkgYmVlbiByZW1vdmVkXG4gICAgaWYgKCAhdGltZXIoKSAmJiB0aW1lcnNbIGkgXSA9PT0gdGltZXIgKSB7XG4gICAgICB0aW1lcnMuc3BsaWNlKCBpLS0sIDEgKTtcbiAgICB9XG4gIH1cblxuICBpZiAoICF0aW1lcnMubGVuZ3RoICkge1xuICAgIGpRdWVyeS5meC5zdG9wKCk7XG4gIH1cbiAgZnhOb3cgPSB1bmRlZmluZWQ7XG59O1xuXG5qUXVlcnkuZngudGltZXIgPSBmdW5jdGlvbiggdGltZXIgKSB7XG4gIGpRdWVyeS50aW1lcnMucHVzaCggdGltZXIgKTtcbiAgaWYgKCB0aW1lcigpICkge1xuICAgIGpRdWVyeS5meC5zdGFydCgpO1xuICB9IGVsc2Uge1xuICAgIGpRdWVyeS50aW1lcnMucG9wKCk7XG4gIH1cbn07XG5cbmpRdWVyeS5meC5pbnRlcnZhbCA9IDEzO1xuXG5qUXVlcnkuZnguc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGltZXJJZCApIHtcbiAgICB0aW1lcklkID0gc2V0SW50ZXJ2YWwoIGpRdWVyeS5meC50aWNrLCBqUXVlcnkuZnguaW50ZXJ2YWwgKTtcbiAgfVxufTtcblxualF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJJbnRlcnZhbCggdGltZXJJZCApO1xuICB0aW1lcklkID0gbnVsbDtcbn07XG5cbmpRdWVyeS5meC5zcGVlZHMgPSB7XG4gIHNsb3c6IDYwMCxcbiAgZmFzdDogMjAwLFxuICAvLyBEZWZhdWx0IHNwZWVkXG4gIF9kZWZhdWx0OiA0MDBcbn07XG5cblxuLy8gQmFzZWQgb2ZmIG9mIHRoZSBwbHVnaW4gYnkgQ2xpbnQgSGVsZmVycywgd2l0aCBwZXJtaXNzaW9uLlxuLy8gaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xualF1ZXJ5LmZuLmRlbGF5ID0gZnVuY3Rpb24oIHRpbWUsIHR5cGUgKSB7XG4gIHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzWyB0aW1lIF0gfHwgdGltZSA6IHRpbWU7XG4gIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuICByZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSwgZnVuY3Rpb24oIG5leHQsIGhvb2tzICkge1xuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuICAgIGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuICAgIH07XG4gIH0pO1xufTtcblxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBhLCBpbnB1dCwgc2VsZWN0LCBvcHQsXG4gICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiICk7XG5cbiAgLy8gU2V0dXBcbiAgZGl2LnNldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiwgXCJ0XCIgKTtcbiAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG4gIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWyAwIF07XG5cbiAgLy8gRmlyc3QgYmF0Y2ggb2YgdGVzdHMuXG4gIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gIG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSApO1xuICBpbnB1dCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWyAwIF07XG5cbiAgYS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6MXB4XCI7XG5cbiAgLy8gVGVzdCBzZXRBdHRyaWJ1dGUgb24gY2FtZWxDYXNlIGNsYXNzLiBJZiBpdCB3b3Jrcywgd2UgbmVlZCBhdHRyRml4ZXMgd2hlbiBkb2luZyBnZXQvc2V0QXR0cmlidXRlIChpZTYvNylcbiAgc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUgPSBkaXYuY2xhc3NOYW1lICE9PSBcInRcIjtcblxuICAvLyBHZXQgdGhlIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gZ2V0QXR0cmlidXRlXG4gIC8vIChJRSB1c2VzIC5jc3NUZXh0IGluc3RlYWQpXG4gIHN1cHBvcnQuc3R5bGUgPSAvdG9wLy50ZXN0KCBhLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpICk7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgVVJMcyBhcmVuJ3QgbWFuaXB1bGF0ZWRcbiAgLy8gKElFIG5vcm1hbGl6ZXMgaXQgYnkgZGVmYXVsdClcbiAgc3VwcG9ydC5ocmVmTm9ybWFsaXplZCA9IGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIvYVwiO1xuXG4gIC8vIENoZWNrIHRoZSBkZWZhdWx0IGNoZWNrYm94L3JhZGlvIHZhbHVlIChcIlwiIG9uIFdlYktpdDsgXCJvblwiIGVsc2V3aGVyZSlcbiAgc3VwcG9ydC5jaGVja09uID0gISFpbnB1dC52YWx1ZTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBhIHNlbGVjdGVkLWJ5LWRlZmF1bHQgb3B0aW9uIGhhcyBhIHdvcmtpbmcgc2VsZWN0ZWQgcHJvcGVydHkuXG4gIC8vIChXZWJLaXQgZGVmYXVsdHMgdG8gZmFsc2UgaW5zdGVhZCBvZiB0cnVlLCBJRSB0b28sIGlmIGl0J3MgaW4gYW4gb3B0Z3JvdXApXG4gIHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cbiAgLy8gVGVzdHMgZm9yIGVuY3R5cGUgc3VwcG9ydCBvbiBhIGZvcm0gKCM2NzQzKVxuICBzdXBwb3J0LmVuY3R5cGUgPSAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLmVuY3R5cGU7XG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG9wdGlvbnMgaW5zaWRlIGRpc2FibGVkIHNlbGVjdHMgYXJlbid0IG1hcmtlZCBhcyBkaXNhYmxlZFxuICAvLyAoV2ViS2l0IG1hcmtzIHRoZW0gYXMgZGlzYWJsZWQpXG4gIHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG4gIHN1cHBvcnQub3B0RGlzYWJsZWQgPSAhb3B0LmRpc2FibGVkO1xuXG4gIC8vIFN1cHBvcnQ6IElFOCBvbmx5XG4gIC8vIENoZWNrIGlmIHdlIGNhbiB0cnVzdCBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuICBzdXBwb3J0LmlucHV0ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcblxuICAvLyBDaGVjayBpZiBhbiBpbnB1dCBtYWludGFpbnMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cbiAgaW5wdXQudmFsdWUgPSBcInRcIjtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG4gIHN1cHBvcnQucmFkaW9WYWx1ZSA9IGlucHV0LnZhbHVlID09PSBcInRcIjtcblxuICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxuICBhID0gaW5wdXQgPSBzZWxlY3QgPSBvcHQgPSBkaXYgPSBudWxsO1xufSkoKTtcblxuXG52YXIgcnJldHVybiA9IC9cXHIvZztcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuICAgIHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxuICAgICAgZWxlbSA9IHRoaXNbMF07XG5cbiAgICBpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuICAgICAgaWYgKCBlbGVtICkge1xuICAgICAgICBob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuICAgICAgICBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgXCJ2YWx1ZVwiICkpICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldCA9IGVsZW0udmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgP1xuICAgICAgICAgIC8vIGhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcbiAgICAgICAgICByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKSA6XG4gICAgICAgICAgLy8gaGFuZGxlIGNhc2VzIHdoZXJlIHZhbHVlIGlzIG51bGwvdW5kZWYgb3IgbnVtYmVyXG4gICAgICAgICAgcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcbiAgICAgIHZhciB2YWw7XG5cbiAgICAgIGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XG4gICAgICAgIHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuICAgICAgaWYgKCB2YWwgPT0gbnVsbCApIHtcbiAgICAgICAgdmFsID0gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG4gICAgICAgIHZhbCArPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuICAgICAgICB2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuICAgICAgLy8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcbiAgICAgIGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgdmFsSG9va3M6IHtcbiAgICBvcHRpb246IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsID9cbiAgICAgICAgICB2YWwgOlxuICAgICAgICAgIGpRdWVyeS50ZXh0KCBlbGVtICk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgb3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG4gICAgICAgICAgaW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgb25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIiB8fCBpbmRleCA8IDAsXG4gICAgICAgICAgdmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuICAgICAgICAgIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxuICAgICAgICAgIGkgPSBpbmRleCA8IDAgP1xuICAgICAgICAgICAgbWF4IDpcbiAgICAgICAgICAgIG9uZSA/IGluZGV4IDogMDtcblxuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG4gICAgICAgIGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuICAgICAgICAgIC8vIG9sZElFIGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuICAgICAgICAgIGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuICAgICAgICAgICAgICAvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG4gICAgICAgICAgICAgICggc3VwcG9ydC5vcHREaXNhYmxlZCA/ICFvcHRpb24uZGlzYWJsZWQgOiBvcHRpb24uZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT09IG51bGwgKSAmJlxuICAgICAgICAgICAgICAoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fCAhalF1ZXJ5Lm5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkgKSApIHtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuICAgICAgICAgICAgdmFsdWUgPSBqUXVlcnkoIG9wdGlvbiApLnZhbCgpO1xuXG4gICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuICAgICAgICAgICAgaWYgKCBvbmUgKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgICAgdmFyIG9wdGlvblNldCwgb3B0aW9uLFxuICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG4gICAgICAgICAgdmFsdWVzID0galF1ZXJ5Lm1ha2VBcnJheSggdmFsdWUgKSxcbiAgICAgICAgICBpID0gb3B0aW9ucy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCBpLS0gKSB7XG4gICAgICAgICAgb3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG4gICAgICAgICAgaWYgKCBqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+PSAwICkge1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTZcbiAgICAgICAgICAgIC8vIFdoZW4gbmV3IG9wdGlvbiBlbGVtZW50IGlzIGFkZGVkIHRvIHNlbGVjdCBib3ggd2UgbmVlZCB0b1xuICAgICAgICAgICAgLy8gZm9yY2UgcmVmbG93IG9mIG5ld2x5IGFkZGVkIG5vZGUgaW4gb3JkZXIgdG8gd29ya2Fyb3VuZCBkZWxheVxuICAgICAgICAgICAgLy8gb2YgaW5pdGlhbGl6YXRpb24gcHJvcGVydGllc1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gb3B0aW9uU2V0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBjYXRjaCAoIF8gKSB7XG5cbiAgICAgICAgICAgICAgLy8gV2lsbCBiZSBleGVjdXRlZCBvbmx5IGluIElFNlxuICAgICAgICAgICAgICBvcHRpb24uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG4gICAgICAgIGlmICggIW9wdGlvblNldCApIHtcbiAgICAgICAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuICBqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG4gICAgICAgIHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoZWxlbSkudmFsKCksIHZhbHVlICkgPj0gMCApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgaWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuICAgIGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgLy8gU3VwcG9ydDogV2Via2l0XG4gICAgICAvLyBcIlwiIGlzIHJldHVybmVkIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgdmFsdWUgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG4gICAgfTtcbiAgfVxufSk7XG5cblxuXG5cbnZhciBub2RlSG9vaywgYm9vbEhvb2ssXG4gIGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlLFxuICBydXNlRGVmYXVsdCA9IC9eKD86Y2hlY2tlZHxzZWxlY3RlZCkkL2ksXG4gIGdldFNldEF0dHJpYnV0ZSA9IHN1cHBvcnQuZ2V0U2V0QXR0cmlidXRlLFxuICBnZXRTZXRJbnB1dCA9IHN1cHBvcnQuaW5wdXQ7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuICB9LFxuXG4gIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuICAgIH0pO1xuICB9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG4gIGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICB2YXIgaG9va3MsIHJldCxcbiAgICAgIG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuICAgIC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcbiAgICBpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG4gICAgaWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcbiAgICB9XG5cbiAgICAvLyBBbGwgYXR0cmlidXRlcyBhcmUgbG93ZXJjYXNlXG4gICAgLy8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuICAgIGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdIHx8XG4gICAgICAgICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IG5vZGVIb29rICk7XG4gICAgfVxuXG4gICAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICBpZiAoIHZhbHVlID09PSBudWxsICkge1xuICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXG4gICAgICB9IGVsc2UgaWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsICkge1xuICAgICAgcmV0dXJuIHJldDtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cbiAgICAgIC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gcmV0ID09IG51bGwgP1xuICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICByZXQ7XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICB2YXIgbmFtZSwgcHJvcE5hbWUsXG4gICAgICBpID0gMCxcbiAgICAgIGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKTtcblxuICAgIGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG4gICAgICB3aGlsZSAoIChuYW1lID0gYXR0ck5hbWVzW2krK10pICkge1xuICAgICAgICBwcm9wTmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblxuICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXG4gICAgICAgIGlmICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgKSB7XG4gICAgICAgICAgLy8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2VcbiAgICAgICAgICBpZiAoIGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdCggbmFtZSApICkge1xuICAgICAgICAgICAgZWxlbVsgcHJvcE5hbWUgXSA9IGZhbHNlO1xuICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcbiAgICAgICAgICAvLyBBbHNvIGNsZWFyIGRlZmF1bHRDaGVja2VkL2RlZmF1bHRTZWxlY3RlZCAoaWYgYXBwcm9wcmlhdGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID1cbiAgICAgICAgICAgICAgZWxlbVsgcHJvcE5hbWUgXSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAvLyBTZWUgIzk2OTkgZm9yIGV4cGxhbmF0aW9uIG9mIHRoaXMgYXBwcm9hY2ggKHNldHRpbmcgZmlyc3QsIHRoZW4gcmVtb3ZhbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqUXVlcnkuYXR0ciggZWxlbSwgbmFtZSwgXCJcIiApO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIGdldFNldEF0dHJpYnV0ZSA/IG5hbWUgOiBwcm9wTmFtZSApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhdHRySG9va3M6IHtcbiAgICB0eXBlOiB7XG4gICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiYgalF1ZXJ5Lm5vZGVOYW1lKGVsZW0sIFwiaW5wdXRcIikgKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyB0aGUgdHlwZSBvbiBhIHJhZGlvIGJ1dHRvbiBhZnRlciB0aGUgdmFsdWUgcmVzZXRzIHRoZSB2YWx1ZSBpbiBJRTYtOVxuICAgICAgICAgIC8vIFJlc2V0IHZhbHVlIHRvIGRlZmF1bHQgaW4gY2FzZSB0eXBlIGlzIHNldCBhZnRlciB2YWx1ZSBkdXJpbmcgY3JlYXRpb25cbiAgICAgICAgICB2YXIgdmFsID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG4gICAgICAgICAgaWYgKCB2YWwgKSB7XG4gICAgICAgICAgICBlbGVtLnZhbHVlID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBIb29rIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcbiAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcbiAgICAgIC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2VcbiAgICAgIGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG4gICAgfSBlbHNlIGlmICggZ2V0U2V0SW5wdXQgJiYgZ2V0U2V0QXR0cmlidXRlIHx8ICFydXNlRGVmYXVsdC50ZXN0KCBuYW1lICkgKSB7XG4gICAgICAvLyBJRTw4IG5lZWRzIHRoZSAqcHJvcGVydHkqIG5hbWVcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCAhZ2V0U2V0QXR0cmlidXRlICYmIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSwgbmFtZSApO1xuXG4gICAgLy8gVXNlIGRlZmF1bHRDaGVja2VkIGFuZCBkZWZhdWx0U2VsZWN0ZWQgZm9yIG9sZElFXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID0gZWxlbVsgbmFtZSBdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxufTtcblxuLy8gUmV0cmlldmUgYm9vbGVhbnMgc3BlY2lhbGx5XG5qUXVlcnkuZWFjaCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC5zb3VyY2UubWF0Y2goIC9cXHcrL2cgKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cbiAgdmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG4gIGF0dHJIYW5kbGVbIG5hbWUgXSA9IGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdCggbmFtZSApID9cbiAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICB2YXIgcmV0LCBoYW5kbGU7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuICAgICAgICBoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XG4gICAgICAgIGF0dHJIYW5kbGVbIG5hbWUgXSA9IHJldDtcbiAgICAgICAgcmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuICAgICAgICAgIG5hbWUudG9Mb3dlckNhc2UoKSA6XG4gICAgICAgICAgbnVsbDtcbiAgICAgICAgYXR0ckhhbmRsZVsgbmFtZSBdID0gaGFuZGxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IDpcbiAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgcmV0dXJuIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID9cbiAgICAgICAgICBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgIG51bGw7XG4gICAgICB9XG4gICAgfTtcbn0pO1xuXG4vLyBmaXggb2xkSUUgYXR0cm9wZXJ0aWVzXG5pZiAoICFnZXRTZXRJbnB1dCB8fCAhZ2V0U2V0QXR0cmlidXRlICkge1xuICBqUXVlcnkuYXR0ckhvb2tzLnZhbHVlID0ge1xuICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuICAgICAgaWYgKCBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuICAgICAgICAvLyBEb2VzIG5vdCByZXR1cm4gc28gdGhhdCBzZXRBdHRyaWJ1dGUgaXMgYWxzbyB1c2VkXG4gICAgICAgIGVsZW0uZGVmYXVsdFZhbHVlID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2Ugbm9kZUhvb2sgaWYgZGVmaW5lZCAoIzE5NTQpOyBvdGhlcndpc2Ugc2V0QXR0cmlidXRlIGlzIGZpbmVcbiAgICAgICAgcmV0dXJuIG5vZGVIb29rICYmIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIElFNi83IGRvIG5vdCBzdXBwb3J0IGdldHRpbmcvc2V0dGluZyBzb21lIGF0dHJpYnV0ZXMgd2l0aCBnZXQvc2V0QXR0cmlidXRlXG5pZiAoICFnZXRTZXRBdHRyaWJ1dGUgKSB7XG5cbiAgLy8gVXNlIHRoaXMgZm9yIGFueSBhdHRyaWJ1dGUgaW4gSUU2LzdcbiAgLy8gVGhpcyBmaXhlcyBhbG1vc3QgZXZlcnkgSUU2LzcgaXNzdWVcbiAgbm9kZUhvb2sgPSB7XG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG4gICAgICAvLyBTZXQgdGhlIGV4aXN0aW5nIG9yIGNyZWF0ZSBhIG5ldyBhdHRyaWJ1dGUgbm9kZVxuICAgICAgdmFyIHJldCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApO1xuICAgICAgaWYgKCAhcmV0ICkge1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZU5vZGUoXG4gICAgICAgICAgKHJldCA9IGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUoIG5hbWUgKSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0LnZhbHVlID0gdmFsdWUgKz0gXCJcIjtcblxuICAgICAgLy8gQnJlYWsgYXNzb2NpYXRpb24gd2l0aCBjbG9uZWQgZWxlbWVudHMgYnkgYWxzbyB1c2luZyBzZXRBdHRyaWJ1dGUgKCM5NjQ2KVxuICAgICAgaWYgKCBuYW1lID09PSBcInZhbHVlXCIgfHwgdmFsdWUgPT09IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU29tZSBhdHRyaWJ1dGVzIGFyZSBjb25zdHJ1Y3RlZCB3aXRoIGVtcHR5LXN0cmluZyB2YWx1ZXMgd2hlbiBub3QgZGVmaW5lZFxuICBhdHRySGFuZGxlLmlkID0gYXR0ckhhbmRsZS5uYW1lID0gYXR0ckhhbmRsZS5jb29yZHMgPVxuICAgIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICBpZiAoICFpc1hNTCApIHtcbiAgICAgICAgcmV0dXJuIChyZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgcmV0LnZhbHVlICE9PSBcIlwiID9cbiAgICAgICAgICByZXQudmFsdWUgOlxuICAgICAgICAgIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBGaXhpbmcgdmFsdWUgcmV0cmlldmFsIG9uIGEgYnV0dG9uIHJlcXVpcmVzIHRoaXMgbW9kdWxlXG4gIGpRdWVyeS52YWxIb29rcy5idXR0b24gPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcbiAgICAgIHZhciByZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcbiAgICAgIGlmICggcmV0ICYmIHJldC5zcGVjaWZpZWQgKSB7XG4gICAgICAgIHJldHVybiByZXQudmFsdWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXQ6IG5vZGVIb29rLnNldFxuICB9O1xuXG4gIC8vIFNldCBjb250ZW50ZWRpdGFibGUgdG8gZmFsc2Ugb24gcmVtb3ZhbHMoIzEwNDI5KVxuICAvLyBTZXR0aW5nIHRvIGVtcHR5IHN0cmluZyB0aHJvd3MgYW4gZXJyb3IgYXMgYW4gaW52YWxpZCB2YWx1ZVxuICBqUXVlcnkuYXR0ckhvb2tzLmNvbnRlbnRlZGl0YWJsZSA9IHtcbiAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcbiAgICAgIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUgPT09IFwiXCIgPyBmYWxzZSA6IHZhbHVlLCBuYW1lICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFNldCB3aWR0aCBhbmQgaGVpZ2h0IHRvIGF1dG8gaW5zdGVhZCBvZiAwIG9uIGVtcHR5IHN0cmluZyggQnVnICM4MTUwIClcbiAgLy8gVGhpcyBpcyBmb3IgcmVtb3ZhbHNcbiAgalF1ZXJ5LmVhY2goWyBcIndpZHRoXCIsIFwiaGVpZ2h0XCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gICAgalF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdID0ge1xuICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICAgIGlmICggdmFsdWUgPT09IFwiXCIgKSB7XG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIFwiYXV0b1wiICk7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmlmICggIXN1cHBvcnQuc3R5bGUgKSB7XG4gIGpRdWVyeS5hdHRySG9va3Muc3R5bGUgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIC8vIFJldHVybiB1bmRlZmluZWQgaW4gdGhlIGNhc2Ugb2YgZW1wdHkgc3RyaW5nXG4gICAgICAvLyBOb3RlOiBJRSB1cHBlcmNhc2VzIGNzcyBwcm9wZXJ0eSBuYW1lcywgYnV0IGlmIHdlIHdlcmUgdG8gLnRvTG93ZXJDYXNlKClcbiAgICAgIC8vIC5jc3NUZXh0LCB0aGF0IHdvdWxkIGRlc3Ryb3kgY2FzZSBzZW5zdGl0aXZpdHkgaW4gVVJMJ3MsIGxpa2UgaW4gXCJiYWNrZ3JvdW5kXCJcbiAgICAgIHJldHVybiBlbGVtLnN0eWxlLmNzc1RleHQgfHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG4gICAgICByZXR1cm4gKCBlbGVtLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSArIFwiXCIgKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG5cbnZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9ufG9iamVjdCkkL2ksXG4gIHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBwcm9wOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG4gICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuICB9LFxuXG4gIHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuICAgIG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIC8vIHRyeS9jYXRjaCBoYW5kbGVzIGNhc2VzIHdoZXJlIElFIGJhbGtzIChzdWNoIGFzIHJlbW92aW5nIGEgcHJvcGVydHkgb24gd2luZG93KVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpc1sgbmFtZSBdID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgdGhpc1sgbmFtZSBdO1xuICAgICAgfSBjYXRjaCggZSApIHt9XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcbiAgcHJvcEZpeDoge1xuICAgIFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuICAgIFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxuICB9LFxuXG4gIHByb3A6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcbiAgICB2YXIgcmV0LCBob29rcywgbm90eG1sLFxuICAgICAgblR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG4gICAgLy8gZG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuICAgIGlmICggIWVsZW0gfHwgblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm90eG1sID0gblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApO1xuXG4gICAgaWYgKCBub3R4bWwgKSB7XG4gICAgICAvLyBGaXggbmFtZSBhbmQgYXR0YWNoIGhvb2tzXG4gICAgICBuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuICAgICAgaG9va3MgPSBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF07XG4gICAgfVxuXG4gICAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgIHJldCA6XG4gICAgICAgICggZWxlbVsgbmFtZSBdID0gdmFsdWUgKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsID9cbiAgICAgICAgcmV0IDpcbiAgICAgICAgZWxlbVsgbmFtZSBdO1xuICAgIH1cbiAgfSxcblxuICBwcm9wSG9va3M6IHtcbiAgICB0YWJJbmRleDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgLy8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxuICAgICAgICAvLyBodHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuICAgICAgICAvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuICAgICAgICB2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuICAgICAgICByZXR1cm4gdGFiaW5kZXggP1xuICAgICAgICAgIHBhcnNlSW50KCB0YWJpbmRleCwgMTAgKSA6XG4gICAgICAgICAgcmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgcmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgZWxlbS5ocmVmID9cbiAgICAgICAgICAgIDAgOlxuICAgICAgICAgICAgLTE7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuLy8gU29tZSBhdHRyaWJ1dGVzIHJlcXVpcmUgYSBzcGVjaWFsIGNhbGwgb24gSUVcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIXN1cHBvcnQuaHJlZk5vcm1hbGl6ZWQgKSB7XG4gIC8vIGhyZWYvc3JjIHByb3BlcnR5IHNob3VsZCBnZXQgdGhlIGZ1bGwgbm9ybWFsaXplZCBVUkwgKCMxMDI5OS8jMTI5MTUpXG4gIGpRdWVyeS5lYWNoKFsgXCJocmVmXCIsIFwic3JjXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG4gICAgalF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCA0ICk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSwgSUU5K1xuLy8gbWlzLXJlcG9ydHMgdGhlIGRlZmF1bHQgc2VsZWN0ZWQgcHJvcGVydHkgb2YgYW4gb3B0aW9uXG4vLyBBY2Nlc3NpbmcgdGhlIHBhcmVudCdzIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgZml4ZXMgaXRcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG4gIGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cbiAgICAgIGlmICggcGFyZW50ICkge1xuICAgICAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBpdCBhbHNvIHdvcmtzIHdpdGggb3B0Z3JvdXBzLCBzZWUgIzU3MDFcbiAgICAgICAgaWYgKCBwYXJlbnQucGFyZW50Tm9kZSApIHtcbiAgICAgICAgICBwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmpRdWVyeS5lYWNoKFtcbiAgXCJ0YWJJbmRleFwiLFxuICBcInJlYWRPbmx5XCIsXG4gIFwibWF4TGVuZ3RoXCIsXG4gIFwiY2VsbFNwYWNpbmdcIixcbiAgXCJjZWxsUGFkZGluZ1wiLFxuICBcInJvd1NwYW5cIixcbiAgXCJjb2xTcGFuXCIsXG4gIFwidXNlTWFwXCIsXG4gIFwiZnJhbWVCb3JkZXJcIixcbiAgXCJjb250ZW50RWRpdGFibGVcIlxuXSwgZnVuY3Rpb24oKSB7XG4gIGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG59KTtcblxuLy8gSUU2LzcgY2FsbCBlbmN0eXBlIGVuY29kaW5nXG5pZiAoICFzdXBwb3J0LmVuY3R5cGUgKSB7XG4gIGpRdWVyeS5wcm9wRml4LmVuY3R5cGUgPSBcImVuY29kaW5nXCI7XG59XG5cblxuXG5cbnZhciByY2xhc3MgPSAvW1xcdFxcclxcblxcZl0vZztcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG4gICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXG4gICAgICBpID0gMCxcbiAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxuICAgICAgcHJvY2VlZCA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZTtcblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBqICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgdGhpcy5jbGFzc05hbWUgKSApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCBwcm9jZWVkICkge1xuICAgICAgLy8gVGhlIGRpc2p1bmN0aW9uIGhlcmUgaXMgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSByZW1vdmVDbGFzcylcbiAgICAgIGNsYXNzZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cbiAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICBlbGVtID0gdGhpc1sgaSBdO1xuICAgICAgICBjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggZWxlbS5jbGFzc05hbWUgP1xuICAgICAgICAgICggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcbiAgICAgICAgICBcIiBcIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICggY3VyICkge1xuICAgICAgICAgIGogPSAwO1xuICAgICAgICAgIHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcbiAgICAgICAgICAgIGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcbiAgICAgICAgICAgICAgY3VyICs9IGNsYXp6ICsgXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICBmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oIGN1ciApO1xuICAgICAgICAgIGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcbiAgICB2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcbiAgICAgIGkgPSAwLFxuICAgICAgbGVuID0gdGhpcy5sZW5ndGgsXG4gICAgICBwcm9jZWVkID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWU7XG5cbiAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaiApIHtcbiAgICAgICAgalF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIHByb2NlZWQgKSB7XG4gICAgICBjbGFzc2VzID0gKCB2YWx1ZSB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG4gICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgZWxlbSA9IHRoaXNbIGkgXTtcbiAgICAgICAgLy8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcbiAgICAgICAgY3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIGVsZW0uY2xhc3NOYW1lID9cbiAgICAgICAgICAoIFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKSA6XG4gICAgICAgICAgXCJcIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICggY3VyICkge1xuICAgICAgICAgIGogPSAwO1xuICAgICAgICAgIHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcbiAgICAgICAgICAgIHdoaWxlICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApID49IDAgKSB7XG4gICAgICAgICAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIsIFwiIFwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cbiAgICAgICAgICBmaW5hbFZhbHVlID0gdmFsdWUgPyBqUXVlcnkudHJpbSggY3VyICkgOiBcIlwiO1xuICAgICAgICAgIGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICBpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuICAgIH1cblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyggdmFsdWUuY2FsbCh0aGlzLCBpLCB0aGlzLmNsYXNzTmFtZSwgc3RhdGVWYWwpLCBzdGF0ZVZhbCApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcbiAgICAgICAgLy8gdG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcbiAgICAgICAgdmFyIGNsYXNzTmFtZSxcbiAgICAgICAgICBpID0gMCxcbiAgICAgICAgICBzZWxmID0galF1ZXJ5KCB0aGlzICksXG4gICAgICAgICAgY2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuICAgICAgICB3aGlsZSAoIChjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSkgKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG4gICAgICAgICAgaWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IHN0cnVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcbiAgICAgICAgaWYgKCB0aGlzLmNsYXNzTmFtZSApIHtcbiAgICAgICAgICAvLyBzdG9yZSBjbGFzc05hbWUgaWYgc2V0XG4gICAgICAgICAgalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgdGhpcy5jbGFzc05hbWUgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIFwiZmFsc2VcIixcbiAgICAgICAgLy8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcbiAgICAgICAgLy8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/IFwiXCIgOiBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBoYXNDbGFzczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICAgIHZhciBjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCIsXG4gICAgICBpID0gMCxcbiAgICAgIGwgPSB0aGlzLmxlbmd0aDtcbiAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG4gICAgICBpZiAoIHRoaXNbaV0ubm9kZVR5cGUgPT09IDEgJiYgKFwiIFwiICsgdGhpc1tpXS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+PSAwICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pO1xuXG5cblxuXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXG5cblxualF1ZXJ5LmVhY2goIChcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIFwiICtcbiAgXCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG4gIFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiKS5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG4gIC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG4gIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG4gICAgICB0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcbiAgICAgIHRoaXMudHJpZ2dlciggbmFtZSApO1xuICB9O1xufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG4gICAgcmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG4gIH0sXG5cbiAgYmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG4gIH0sXG4gIHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuICB9LFxuXG4gIGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuICB9LFxuICB1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcbiAgICAvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyB0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDogdGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XG4gIH1cbn0pO1xuXG5cbnZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcblxudmFyIHJxdWVyeSA9ICgvXFw/Lyk7XG5cblxuXG52YXIgcnZhbGlkdG9rZW5zID0gLygsKXwoXFxbfHspfCh9fF0pfFwiKD86W15cIlxcXFxcXHJcXG5dfFxcXFxbXCJcXFxcXFwvYmZucnRdfFxcXFx1W1xcZGEtZkEtRl17NH0pKlwiXFxzKjo/fHRydWV8ZmFsc2V8bnVsbHwtPyg/ITBcXGQpXFxkKyg/OlxcLlxcZCt8KSg/OltlRV1bKy1dP1xcZCt8KS9nO1xuXG5qUXVlcnkucGFyc2VKU09OID0gZnVuY3Rpb24oIGRhdGEgKSB7XG4gIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuICBpZiAoIHdpbmRvdy5KU09OICYmIHdpbmRvdy5KU09OLnBhcnNlICkge1xuICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG4gICAgLy8gV29ya2Fyb3VuZCBmYWlsdXJlIHRvIHN0cmluZy1jYXN0IG51bGwgaW5wdXRcbiAgICByZXR1cm4gd2luZG93LkpTT04ucGFyc2UoIGRhdGEgKyBcIlwiICk7XG4gIH1cblxuICB2YXIgcmVxdWlyZU5vbkNvbW1hLFxuICAgIGRlcHRoID0gbnVsbCxcbiAgICBzdHIgPSBqUXVlcnkudHJpbSggZGF0YSArIFwiXCIgKTtcblxuICAvLyBHdWFyZCBhZ2FpbnN0IGludmFsaWQgKGFuZCBwb3NzaWJseSBkYW5nZXJvdXMpIGlucHV0IGJ5IGVuc3VyaW5nIHRoYXQgbm90aGluZyByZW1haW5zXG4gIC8vIGFmdGVyIHJlbW92aW5nIHZhbGlkIHRva2Vuc1xuICByZXR1cm4gc3RyICYmICFqUXVlcnkudHJpbSggc3RyLnJlcGxhY2UoIHJ2YWxpZHRva2VucywgZnVuY3Rpb24oIHRva2VuLCBjb21tYSwgb3BlbiwgY2xvc2UgKSB7XG5cbiAgICAvLyBGb3JjZSB0ZXJtaW5hdGlvbiBpZiB3ZSBzZWUgYSBtaXNwbGFjZWQgY29tbWFcbiAgICBpZiAoIHJlcXVpcmVOb25Db21tYSAmJiBjb21tYSApIHtcbiAgICAgIGRlcHRoID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIG5vIG1vcmUgcmVwbGFjZW1lbnRzIGFmdGVyIHJldHVybmluZyB0byBvdXRlcm1vc3QgZGVwdGhcbiAgICBpZiAoIGRlcHRoID09PSAwICkge1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cblxuICAgIC8vIENvbW1hcyBtdXN0IG5vdCBmb2xsb3cgXCJbXCIsIFwie1wiLCBvciBcIixcIlxuICAgIHJlcXVpcmVOb25Db21tYSA9IG9wZW4gfHwgY29tbWE7XG5cbiAgICAvLyBEZXRlcm1pbmUgbmV3IGRlcHRoXG4gICAgLy8gYXJyYXkvb2JqZWN0IG9wZW4gKFwiW1wiIG9yIFwie1wiKTogZGVwdGggKz0gdHJ1ZSAtIGZhbHNlIChpbmNyZW1lbnQpXG4gICAgLy8gYXJyYXkvb2JqZWN0IGNsb3NlIChcIl1cIiBvciBcIn1cIik6IGRlcHRoICs9IGZhbHNlIC0gdHJ1ZSAoZGVjcmVtZW50KVxuICAgIC8vIG90aGVyIGNhc2VzIChcIixcIiBvciBwcmltaXRpdmUpOiBkZXB0aCArPSB0cnVlIC0gdHJ1ZSAobnVtZXJpYyBjYXN0KVxuICAgIGRlcHRoICs9ICFjbG9zZSAtICFvcGVuO1xuXG4gICAgLy8gUmVtb3ZlIHRoaXMgdG9rZW5cbiAgICByZXR1cm4gXCJcIjtcbiAgfSkgKSA/XG4gICAgKCBGdW5jdGlvbiggXCJyZXR1cm4gXCIgKyBzdHIgKSApKCkgOlxuICAgIGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIEpTT046IFwiICsgZGF0YSApO1xufTtcblxuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5qUXVlcnkucGFyc2VYTUwgPSBmdW5jdGlvbiggZGF0YSApIHtcbiAgdmFyIHhtbCwgdG1wO1xuICBpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKCB3aW5kb3cuRE9NUGFyc2VyICkgeyAvLyBTdGFuZGFyZFxuICAgICAgdG1wID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgeG1sID0gdG1wLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG4gICAgfSBlbHNlIHsgLy8gSUVcbiAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIk1pY3Jvc29mdC5YTUxET01cIiApO1xuICAgICAgeG1sLmFzeW5jID0gXCJmYWxzZVwiO1xuICAgICAgeG1sLmxvYWRYTUwoIGRhdGEgKTtcbiAgICB9XG4gIH0gY2F0Y2goIGUgKSB7XG4gICAgeG1sID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICggIXhtbCB8fCAheG1sLmRvY3VtZW50RWxlbWVudCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcbiAgICBqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuICB9XG4gIHJldHVybiB4bWw7XG59O1xuXG5cbnZhclxuICAvLyBEb2N1bWVudCBsb2NhdGlvblxuICBhamF4TG9jUGFydHMsXG4gIGFqYXhMb2NhdGlvbixcblxuICByaGFzaCA9IC8jLiokLyxcbiAgcnRzID0gLyhbPyZdKV89W14mXSovLFxuICByaGVhZGVycyA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKVxccj8kL21nLCAvLyBJRSBsZWF2ZXMgYW4gXFxyIGNoYXJhY3RlciBhdCBFT0xcbiAgLy8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXG4gIHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sXG4gIHJub0NvbnRlbnQgPSAvXig/OkdFVHxIRUFEKSQvLFxuICBycHJvdG9jb2wgPSAvXlxcL1xcLy8sXG4gIHJ1cmwgPSAvXihbXFx3ListXSs6KSg/OlxcL1xcLyg/OlteXFwvPyNdKkB8KShbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpLyxcblxuICAvKiBQcmVmaWx0ZXJzXG4gICAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG4gICAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG4gICAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcbiAgICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuICAgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG4gICAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcbiAgICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcbiAgICovXG4gIHByZWZpbHRlcnMgPSB7fSxcblxuICAvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG4gICAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcbiAgICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuICAgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcbiAgICovXG4gIHRyYW5zcG9ydHMgPSB7fSxcblxuICAvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cbiAgYWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KFwiKlwiKTtcblxuLy8gIzgxMzgsIElFIG1heSB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBhY2Nlc3Npbmdcbi8vIGEgZmllbGQgZnJvbSB3aW5kb3cubG9jYXRpb24gaWYgZG9jdW1lbnQuZG9tYWluIGhhcyBiZWVuIHNldFxudHJ5IHtcbiAgYWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZjtcbn0gY2F0Y2goIGUgKSB7XG4gIC8vIFVzZSB0aGUgaHJlZiBhdHRyaWJ1dGUgb2YgYW4gQSBlbGVtZW50XG4gIC8vIHNpbmNlIElFIHdpbGwgbW9kaWZ5IGl0IGdpdmVuIGRvY3VtZW50LmxvY2F0aW9uXG4gIGFqYXhMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG4gIGFqYXhMb2NhdGlvbi5ocmVmID0gXCJcIjtcbiAgYWpheExvY2F0aW9uID0gYWpheExvY2F0aW9uLmhyZWY7XG59XG5cbi8vIFNlZ21lbnQgbG9jYXRpb24gaW50byBwYXJ0c1xuYWpheExvY1BhcnRzID0gcnVybC5leGVjKCBhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSApIHx8IFtdO1xuXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XG5mdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcblxuICAvLyBkYXRhVHlwZUV4cHJlc3Npb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiKlwiXG4gIHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xuXG4gICAgaWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xuICAgICAgZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcbiAgICAgIGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuICAgIH1cblxuICAgIHZhciBkYXRhVHlwZSxcbiAgICAgIGkgPSAwLFxuICAgICAgZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuICAgICAgLy8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuICAgICAgd2hpbGUgKCAoZGF0YVR5cGUgPSBkYXRhVHlwZXNbaSsrXSkgKSB7XG4gICAgICAgIC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG4gICAgICAgIGlmICggZGF0YVR5cGUuY2hhckF0KCAwICkgPT09IFwiK1wiICkge1xuICAgICAgICAgIGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcbiAgICAgICAgICAoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS51bnNoaWZ0KCBmdW5jICk7XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGFwcGVuZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIChzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10pLnB1c2goIGZ1bmMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG4gIHZhciBpbnNwZWN0ZWQgPSB7fSxcbiAgICBzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuICBmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcbiAgICB2YXIgc2VsZWN0ZWQ7XG4gICAgaW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcbiAgICBqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuICAgICAgdmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcbiAgICAgIGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuICAgICAgICBvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG4gICAgICAgIGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcbiAgICAgICAgcmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxuXG4gIHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG4gIHZhciBkZWVwLCBrZXksXG4gICAgZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG4gIGZvciAoIGtleSBpbiBzcmMgKSB7XG4gICAgaWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoZGVlcCA9IHt9KSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcbiAgICB9XG4gIH1cbiAgaWYgKCBkZWVwICkge1xuICAgIGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuICB2YXIgZmlyc3REYXRhVHlwZSwgY3QsIGZpbmFsRGF0YVR5cGUsIHR5cGUsXG4gICAgY29udGVudHMgPSBzLmNvbnRlbnRzLFxuICAgIGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzO1xuXG4gIC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXG4gIHdoaWxlICggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuICAgIGRhdGFUeXBlcy5zaGlmdCgpO1xuICAgIGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBrbm93biBjb250ZW50LXR5cGVcbiAgaWYgKCBjdCApIHtcbiAgICBmb3IgKCB0eXBlIGluIGNvbnRlbnRzICkge1xuICAgICAgaWYgKCBjb250ZW50c1sgdHlwZSBdICYmIGNvbnRlbnRzWyB0eXBlIF0udGVzdCggY3QgKSApIHtcbiAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQoIHR5cGUgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYSByZXNwb25zZSBmb3IgdGhlIGV4cGVjdGVkIGRhdGFUeXBlXG4gIGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xuICAgIGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbIDAgXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUcnkgY29udmVydGlibGUgZGF0YVR5cGVzXG4gICAgZm9yICggdHlwZSBpbiByZXNwb25zZXMgKSB7XG4gICAgICBpZiAoICFkYXRhVHlwZXNbIDAgXSB8fCBzLmNvbnZlcnRlcnNbIHR5cGUgKyBcIiBcIiArIGRhdGFUeXBlc1swXSBdICkge1xuICAgICAgICBmaW5hbERhdGFUeXBlID0gdHlwZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoICFmaXJzdERhdGFUeXBlICkge1xuICAgICAgICBmaXJzdERhdGFUeXBlID0gdHlwZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT3IganVzdCB1c2UgZmlyc3Qgb25lXG4gICAgZmluYWxEYXRhVHlwZSA9IGZpbmFsRGF0YVR5cGUgfHwgZmlyc3REYXRhVHlwZTtcbiAgfVxuXG4gIC8vIElmIHdlIGZvdW5kIGEgZGF0YVR5cGVcbiAgLy8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICBpZiAoIGZpbmFsRGF0YVR5cGUgKSB7XG4gICAgaWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcbiAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZXNbIGZpbmFsRGF0YVR5cGUgXTtcbiAgfVxufVxuXG4vKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXG4gKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xuICB2YXIgY29udjIsIGN1cnJlbnQsIGNvbnYsIHRtcCwgcHJldixcbiAgICBjb252ZXJ0ZXJzID0ge30sXG4gICAgLy8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxuICAgIGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cbiAgLy8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG4gIGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG4gICAgZm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG4gICAgICBjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuICAgIH1cbiAgfVxuXG4gIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuICAvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxuICB3aGlsZSAoIGN1cnJlbnQgKSB7XG5cbiAgICBpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcbiAgICAgIGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG4gICAgaWYgKCAhcHJldiAmJiBpc1N1Y2Nlc3MgJiYgcy5kYXRhRmlsdGVyICkge1xuICAgICAgcmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG4gICAgfVxuXG4gICAgcHJldiA9IGN1cnJlbnQ7XG4gICAgY3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG4gICAgaWYgKCBjdXJyZW50ICkge1xuXG4gICAgICAvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG4gICAgICBpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG4gICAgICAgIGN1cnJlbnQgPSBwcmV2O1xuXG4gICAgICAvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG4gICAgICB9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG4gICAgICAgIC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG4gICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG4gICAgICAgIC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG4gICAgICAgIGlmICggIWNvbnYgKSB7XG4gICAgICAgICAgZm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuICAgICAgICAgICAgLy8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG4gICAgICAgICAgICB0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcbiAgICAgICAgICAgIGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cbiAgICAgICAgICAgICAgLy8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG4gICAgICAgICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG4gICAgICAgICAgICAgICAgY29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcbiAgICAgICAgICAgICAgaWYgKCBjb252ICkge1xuICAgICAgICAgICAgICAgIC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcbiAgICAgICAgICAgICAgICBpZiAoIGNvbnYgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHRtcFsgMCBdO1xuICAgICAgICAgICAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG4gICAgICAgIGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuICAgICAgICAgIC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cbiAgICAgICAgICBpZiAoIGNvbnYgJiYgc1sgXCJ0aHJvd3NcIiBdICkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG4gICAgICAgICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwicGFyc2VyZXJyb3JcIiwgZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuICAvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcbiAgYWN0aXZlOiAwLFxuXG4gIC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3RcbiAgbGFzdE1vZGlmaWVkOiB7fSxcbiAgZXRhZzoge30sXG5cbiAgYWpheFNldHRpbmdzOiB7XG4gICAgdXJsOiBhamF4TG9jYXRpb24sXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBhamF4TG9jUGFydHNbIDEgXSApLFxuICAgIGdsb2JhbDogdHJ1ZSxcbiAgICBwcm9jZXNzRGF0YTogdHJ1ZSxcbiAgICBhc3luYzogdHJ1ZSxcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAvKlxuICAgIHRpbWVvdXQ6IDAsXG4gICAgZGF0YTogbnVsbCxcbiAgICBkYXRhVHlwZTogbnVsbCxcbiAgICB1c2VybmFtZTogbnVsbCxcbiAgICBwYXNzd29yZDogbnVsbCxcbiAgICBjYWNoZTogbnVsbCxcbiAgICB0aHJvd3M6IGZhbHNlLFxuICAgIHRyYWRpdGlvbmFsOiBmYWxzZSxcbiAgICBoZWFkZXJzOiB7fSxcbiAgICAqL1xuXG4gICAgYWNjZXB0czoge1xuICAgICAgXCIqXCI6IGFsbFR5cGVzLFxuICAgICAgdGV4dDogXCJ0ZXh0L3BsYWluXCIsXG4gICAgICBodG1sOiBcInRleHQvaHRtbFwiLFxuICAgICAgeG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcbiAgICAgIGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcbiAgICB9LFxuXG4gICAgY29udGVudHM6IHtcbiAgICAgIHhtbDogL3htbC8sXG4gICAgICBodG1sOiAvaHRtbC8sXG4gICAgICBqc29uOiAvanNvbi9cbiAgICB9LFxuXG4gICAgcmVzcG9uc2VGaWVsZHM6IHtcbiAgICAgIHhtbDogXCJyZXNwb25zZVhNTFwiLFxuICAgICAgdGV4dDogXCJyZXNwb25zZVRleHRcIixcbiAgICAgIGpzb246IFwicmVzcG9uc2VKU09OXCJcbiAgICB9LFxuXG4gICAgLy8gRGF0YSBjb252ZXJ0ZXJzXG4gICAgLy8gS2V5cyBzZXBhcmF0ZSBzb3VyY2UgKG9yIGNhdGNoYWxsIFwiKlwiKSBhbmQgZGVzdGluYXRpb24gdHlwZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuICAgIGNvbnZlcnRlcnM6IHtcblxuICAgICAgLy8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG4gICAgICBcIiogdGV4dFwiOiBTdHJpbmcsXG5cbiAgICAgIC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuICAgICAgXCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcblxuICAgICAgLy8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxuICAgICAgXCJ0ZXh0IGpzb25cIjogalF1ZXJ5LnBhcnNlSlNPTixcblxuICAgICAgLy8gUGFyc2UgdGV4dCBhcyB4bWxcbiAgICAgIFwidGV4dCB4bWxcIjogalF1ZXJ5LnBhcnNlWE1MXG4gICAgfSxcblxuICAgIC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG4gICAgLy8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxuICAgIC8vIGFuZCB3aGVuIHlvdSBjcmVhdGUgb25lIHRoYXQgc2hvdWxkbid0IGJlXG4gICAgLy8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG4gICAgZmxhdE9wdGlvbnM6IHtcbiAgICAgIHVybDogdHJ1ZSxcbiAgICAgIGNvbnRleHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgLy8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcbiAgLy8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuICAvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuICBhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuICAgIHJldHVybiBzZXR0aW5ncyA/XG5cbiAgICAgIC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICBhamF4RXh0ZW5kKCBhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKSwgc2V0dGluZ3MgKSA6XG5cbiAgICAgIC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3NcbiAgICAgIGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuICB9LFxuXG4gIGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuICBhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuICAvLyBNYWluIG1ldGhvZFxuICBhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG4gICAgLy8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcbiAgICBpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICBvcHRpb25zID0gdXJsO1xuICAgICAgdXJsID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgLy8gQ3Jvc3MtZG9tYWluIGRldGVjdGlvbiB2YXJzXG4gICAgICBwYXJ0cyxcbiAgICAgIC8vIExvb3AgdmFyaWFibGVcbiAgICAgIGksXG4gICAgICAvLyBVUkwgd2l0aG91dCBhbnRpLWNhY2hlIHBhcmFtXG4gICAgICBjYWNoZVVSTCxcbiAgICAgIC8vIFJlc3BvbnNlIGhlYWRlcnMgYXMgc3RyaW5nXG4gICAgICByZXNwb25zZUhlYWRlcnNTdHJpbmcsXG4gICAgICAvLyB0aW1lb3V0IGhhbmRsZVxuICAgICAgdGltZW91dFRpbWVyLFxuXG4gICAgICAvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcbiAgICAgIGZpcmVHbG9iYWxzLFxuXG4gICAgICB0cmFuc3BvcnQsXG4gICAgICAvLyBSZXNwb25zZSBoZWFkZXJzXG4gICAgICByZXNwb25zZUhlYWRlcnMsXG4gICAgICAvLyBDcmVhdGUgdGhlIGZpbmFsIG9wdGlvbnMgb2JqZWN0XG4gICAgICBzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcbiAgICAgIC8vIENhbGxiYWNrcyBjb250ZXh0XG4gICAgICBjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcbiAgICAgIC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgIGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJiAoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xuICAgICAgICBqUXVlcnkoIGNhbGxiYWNrQ29udGV4dCApIDpcbiAgICAgICAgalF1ZXJ5LmV2ZW50LFxuICAgICAgLy8gRGVmZXJyZWRzXG4gICAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgY29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxcbiAgICAgIC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG4gICAgICBzdGF0dXNDb2RlID0gcy5zdGF0dXNDb2RlIHx8IHt9LFxuICAgICAgLy8gSGVhZGVycyAodGhleSBhcmUgc2VudCBhbGwgYXQgb25jZSlcbiAgICAgIHJlcXVlc3RIZWFkZXJzID0ge30sXG4gICAgICByZXF1ZXN0SGVhZGVyc05hbWVzID0ge30sXG4gICAgICAvLyBUaGUganFYSFIgc3RhdGVcbiAgICAgIHN0YXRlID0gMCxcbiAgICAgIC8vIERlZmF1bHQgYWJvcnQgbWVzc2FnZVxuICAgICAgc3RyQWJvcnQgPSBcImNhbmNlbGVkXCIsXG4gICAgICAvLyBGYWtlIHhoclxuICAgICAganFYSFIgPSB7XG4gICAgICAgIHJlYWR5U3RhdGU6IDAsXG5cbiAgICAgICAgLy8gQnVpbGRzIGhlYWRlcnMgaGFzaHRhYmxlIGlmIG5lZWRlZFxuICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oIGtleSApIHtcbiAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgaWYgKCBzdGF0ZSA9PT0gMiApIHtcbiAgICAgICAgICAgIGlmICggIXJlc3BvbnNlSGVhZGVycyApIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzID0ge307XG4gICAgICAgICAgICAgIHdoaWxlICggKG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkpICkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSBdID0gbWF0Y2hbIDIgXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaCA9PSBudWxsID8gbnVsbCA6IG1hdGNoO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJhdyBzdHJpbmdcbiAgICAgICAgZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUgPT09IDIgPyByZXNwb25zZUhlYWRlcnNTdHJpbmcgOiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENhY2hlcyB0aGUgaGVhZGVyXG4gICAgICAgIHNldFJlcXVlc3RIZWFkZXI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcbiAgICAgICAgICB2YXIgbG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgaWYgKCAhc3RhdGUgKSB7XG4gICAgICAgICAgICBuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gfHwgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzWyBuYW1lIF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gT3ZlcnJpZGVzIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBoZWFkZXJcbiAgICAgICAgb3ZlcnJpZGVNaW1lVHlwZTogZnVuY3Rpb24oIHR5cGUgKSB7XG4gICAgICAgICAgaWYgKCAhc3RhdGUgKSB7XG4gICAgICAgICAgICBzLm1pbWVUeXBlID0gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcbiAgICAgICAgc3RhdHVzQ29kZTogZnVuY3Rpb24oIG1hcCApIHtcbiAgICAgICAgICB2YXIgY29kZTtcbiAgICAgICAgICBpZiAoIG1hcCApIHtcbiAgICAgICAgICAgIGlmICggc3RhdGUgPCAyICkge1xuICAgICAgICAgICAgICBmb3IgKCBjb2RlIGluIG1hcCApIHtcbiAgICAgICAgICAgICAgICAvLyBMYXp5LWFkZCB0aGUgbmV3IGNhbGxiYWNrIGluIGEgd2F5IHRoYXQgcHJlc2VydmVzIG9sZCBvbmVzXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICBqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2FuY2VsIHRoZSByZXF1ZXN0XG4gICAgICAgIGFib3J0OiBmdW5jdGlvbiggc3RhdHVzVGV4dCApIHtcbiAgICAgICAgICB2YXIgZmluYWxUZXh0ID0gc3RhdHVzVGV4dCB8fCBzdHJBYm9ydDtcbiAgICAgICAgICBpZiAoIHRyYW5zcG9ydCApIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUoIDAsIGZpbmFsVGV4dCApO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgLy8gQXR0YWNoIGRlZmVycmVkc1xuICAgIGRlZmVycmVkLnByb21pc2UoIGpxWEhSICkuY29tcGxldGUgPSBjb21wbGV0ZURlZmVycmVkLmFkZDtcbiAgICBqcVhIUi5zdWNjZXNzID0ganFYSFIuZG9uZTtcbiAgICBqcVhIUi5lcnJvciA9IGpxWEhSLmZhaWw7XG5cbiAgICAvLyBSZW1vdmUgaGFzaCBjaGFyYWN0ZXIgKCM3NTMxOiBhbmQgc3RyaW5nIHByb21vdGlvbilcbiAgICAvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkICgjNTg2NjogSUU3IGlzc3VlIHdpdGggcHJvdG9jb2wtbGVzcyB1cmxzKVxuICAgIC8vIEhhbmRsZSBmYWxzeSB1cmwgaW4gdGhlIHNldHRpbmdzIG9iamVjdCAoIzEwMDkzOiBjb25zaXN0ZW5jeSB3aXRoIG9sZCBzaWduYXR1cmUpXG4gICAgLy8gV2UgYWxzbyB1c2UgdGhlIHVybCBwYXJhbWV0ZXIgaWYgYXZhaWxhYmxlXG4gICAgcy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGFqYXhMb2NhdGlvbiApICsgXCJcIiApLnJlcGxhY2UoIHJoYXNoLCBcIlwiICkucmVwbGFjZSggcnByb3RvY29sLCBhamF4TG9jUGFydHNbIDEgXSArIFwiLy9cIiApO1xuXG4gICAgLy8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XG4gICAgcy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcblxuICAgIC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3RcbiAgICBzLmRhdGFUeXBlcyA9IGpRdWVyeS50cmltKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG5cbiAgICAvLyBBIGNyb3NzLWRvbWFpbiByZXF1ZXN0IGlzIGluIG9yZGVyIHdoZW4gd2UgaGF2ZSBhIHByb3RvY29sOmhvc3Q6cG9ydCBtaXNtYXRjaFxuICAgIGlmICggcy5jcm9zc0RvbWFpbiA9PSBudWxsICkge1xuICAgICAgcGFydHMgPSBydXJsLmV4ZWMoIHMudXJsLnRvTG93ZXJDYXNlKCkgKTtcbiAgICAgIHMuY3Jvc3NEb21haW4gPSAhISggcGFydHMgJiZcbiAgICAgICAgKCBwYXJ0c1sgMSBdICE9PSBhamF4TG9jUGFydHNbIDEgXSB8fCBwYXJ0c1sgMiBdICE9PSBhamF4TG9jUGFydHNbIDIgXSB8fFxuICAgICAgICAgICggcGFydHNbIDMgXSB8fCAoIHBhcnRzWyAxIF0gPT09IFwiaHR0cDpcIiA/IFwiODBcIiA6IFwiNDQzXCIgKSApICE9PVxuICAgICAgICAgICAgKCBhamF4TG9jUGFydHNbIDMgXSB8fCAoIGFqYXhMb2NQYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSApXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgZGF0YSBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuICAgIGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICAgIHMuZGF0YSA9IGpRdWVyeS5wYXJhbSggcy5kYXRhLCBzLnRyYWRpdGlvbmFsICk7XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgcHJlZmlsdGVyc1xuICAgIGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG4gICAgLy8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcbiAgICBpZiAoIHN0YXRlID09PSAyICkge1xuICAgICAgcmV0dXJuIGpxWEhSO1xuICAgIH1cblxuICAgIC8vIFdlIGNhbiBmaXJlIGdsb2JhbCBldmVudHMgYXMgb2Ygbm93IGlmIGFza2VkIHRvXG4gICAgZmlyZUdsb2JhbHMgPSBzLmdsb2JhbDtcblxuICAgIC8vIFdhdGNoIGZvciBhIG5ldyBzZXQgb2YgcmVxdWVzdHNcbiAgICBpZiAoIGZpcmVHbG9iYWxzICYmIGpRdWVyeS5hY3RpdmUrKyA9PT0gMCApIHtcbiAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpO1xuICAgIH1cblxuICAgIC8vIFVwcGVyY2FzZSB0aGUgdHlwZVxuICAgIHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcbiAgICBzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcblxuICAgIC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxuICAgIC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuICAgIGNhY2hlVVJMID0gcy51cmw7XG5cbiAgICAvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuICAgIGlmICggIXMuaGFzQ29udGVudCApIHtcblxuICAgICAgLy8gSWYgZGF0YSBpcyBhdmFpbGFibGUsIGFwcGVuZCBkYXRhIHRvIHVybFxuICAgICAgaWYgKCBzLmRhdGEgKSB7XG4gICAgICAgIGNhY2hlVVJMID0gKCBzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgcy5kYXRhICk7XG4gICAgICAgIC8vICM5NjgyOiByZW1vdmUgZGF0YSBzbyB0aGF0IGl0J3Mgbm90IHVzZWQgaW4gYW4gZXZlbnR1YWwgcmV0cnlcbiAgICAgICAgZGVsZXRlIHMuZGF0YTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGFudGktY2FjaGUgaW4gdXJsIGlmIG5lZWRlZFxuICAgICAgaWYgKCBzLmNhY2hlID09PSBmYWxzZSApIHtcbiAgICAgICAgcy51cmwgPSBydHMudGVzdCggY2FjaGVVUkwgKSA/XG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ18nIHBhcmFtZXRlciwgc2V0IGl0cyB2YWx1ZVxuICAgICAgICAgIGNhY2hlVVJMLnJlcGxhY2UoIHJ0cywgXCIkMV89XCIgKyBub25jZSsrICkgOlxuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBvbmUgdG8gdGhlIGVuZFxuICAgICAgICAgIGNhY2hlVVJMICsgKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIFwiXz1cIiArIG5vbmNlKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cbiAgICBpZiAoIHMuaWZNb2RpZmllZCApIHtcbiAgICAgIGlmICggalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApIHtcbiAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Nb2RpZmllZC1TaW5jZVwiLCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICk7XG4gICAgICB9XG4gICAgICBpZiAoIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICkge1xuICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU5vbmUtTWF0Y2hcIiwgalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGNvcnJlY3QgaGVhZGVyLCBpZiBkYXRhIGlzIGJlaW5nIHNlbnRcbiAgICBpZiAoIHMuZGF0YSAmJiBzLmhhc0NvbnRlbnQgJiYgcy5jb250ZW50VHlwZSAhPT0gZmFsc2UgfHwgb3B0aW9ucy5jb250ZW50VHlwZSApIHtcbiAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIHMuY29udGVudFR5cGUgKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIEFjY2VwdHMgaGVhZGVyIGZvciB0aGUgc2VydmVyLCBkZXBlbmRpbmcgb24gdGhlIGRhdGFUeXBlXG4gICAganFYSFIuc2V0UmVxdWVzdEhlYWRlcihcbiAgICAgIFwiQWNjZXB0XCIsXG4gICAgICBzLmRhdGFUeXBlc1sgMCBdICYmIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbMF0gXSA/XG4gICAgICAgIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbMF0gXSArICggcy5kYXRhVHlwZXNbIDAgXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIgKSA6XG4gICAgICAgIHMuYWNjZXB0c1sgXCIqXCIgXVxuICAgICk7XG5cbiAgICAvLyBDaGVjayBmb3IgaGVhZGVycyBvcHRpb25cbiAgICBmb3IgKCBpIGluIHMuaGVhZGVycyApIHtcbiAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIGksIHMuaGVhZGVyc1sgaSBdICk7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgY3VzdG9tIGhlYWRlcnMvbWltZXR5cGVzIGFuZCBlYXJseSBhYm9ydFxuICAgIGlmICggcy5iZWZvcmVTZW5kICYmICggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgc3RhdGUgPT09IDIgKSApIHtcbiAgICAgIC8vIEFib3J0IGlmIG5vdCBkb25lIGFscmVhZHkgYW5kIHJldHVyblxuICAgICAgcmV0dXJuIGpxWEhSLmFib3J0KCk7XG4gICAgfVxuXG4gICAgLy8gYWJvcnRpbmcgaXMgbm8gbG9uZ2VyIGEgY2FuY2VsbGF0aW9uXG4gICAgc3RyQWJvcnQgPSBcImFib3J0XCI7XG5cbiAgICAvLyBJbnN0YWxsIGNhbGxiYWNrcyBvbiBkZWZlcnJlZHNcbiAgICBmb3IgKCBpIGluIHsgc3VjY2VzczogMSwgZXJyb3I6IDEsIGNvbXBsZXRlOiAxIH0gKSB7XG4gICAgICBqcVhIUlsgaSBdKCBzWyBpIF0gKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdHJhbnNwb3J0XG4gICAgdHJhbnNwb3J0ID0gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMsIHMsIG9wdGlvbnMsIGpxWEhSICk7XG5cbiAgICAvLyBJZiBubyB0cmFuc3BvcnQsIHdlIGF1dG8tYWJvcnRcbiAgICBpZiAoICF0cmFuc3BvcnQgKSB7XG4gICAgICBkb25lKCAtMSwgXCJObyBUcmFuc3BvcnRcIiApO1xuICAgIH0gZWxzZSB7XG4gICAgICBqcVhIUi5yZWFkeVN0YXRlID0gMTtcblxuICAgICAgLy8gU2VuZCBnbG9iYWwgZXZlbnRcbiAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhTZW5kXCIsIFsganFYSFIsIHMgXSApO1xuICAgICAgfVxuICAgICAgLy8gVGltZW91dFxuICAgICAgaWYgKCBzLmFzeW5jICYmIHMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAganFYSFIuYWJvcnQoXCJ0aW1lb3V0XCIpO1xuICAgICAgICB9LCBzLnRpbWVvdXQgKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSAxO1xuICAgICAgICB0cmFuc3BvcnQuc2VuZCggcmVxdWVzdEhlYWRlcnMsIGRvbmUgKTtcbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICAvLyBQcm9wYWdhdGUgZXhjZXB0aW9uIGFzIGVycm9yIGlmIG5vdCBkb25lXG4gICAgICAgIGlmICggc3RhdGUgPCAyICkge1xuICAgICAgICAgIGRvbmUoIC0xLCBlICk7XG4gICAgICAgIC8vIFNpbXBseSByZXRocm93IG90aGVyd2lzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcbiAgICBmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcbiAgICAgIHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG4gICAgICAgIHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG4gICAgICAvLyBDYWxsZWQgb25jZVxuICAgICAgaWYgKCBzdGF0ZSA9PT0gMiApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTdGF0ZSBpcyBcImRvbmVcIiBub3dcbiAgICAgIHN0YXRlID0gMjtcblxuICAgICAgLy8gQ2xlYXIgdGltZW91dCBpZiBpdCBleGlzdHNcbiAgICAgIGlmICggdGltZW91dFRpbWVyICkge1xuICAgICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuICAgICAgLy8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcbiAgICAgIHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuICAgICAgLy8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG4gICAgICAvLyBTZXQgcmVhZHlTdGF0ZVxuICAgICAganFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcbiAgICAgIGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG4gICAgICAvLyBHZXQgcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKCByZXNwb25zZXMgKSB7XG4gICAgICAgIHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuICAgICAgfVxuXG4gICAgICAvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG4gICAgICByZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG4gICAgICAvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuICAgICAgaWYgKCBpc1N1Y2Nlc3MgKSB7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cbiAgICAgICAgaWYgKCBzLmlmTW9kaWZpZWQgKSB7XG4gICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIik7XG4gICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIik7XG4gICAgICAgICAgaWYgKCBtb2RpZmllZCApIHtcbiAgICAgICAgICAgIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm8gY29udGVudFxuICAgICAgICBpZiAoIHN0YXR1cyA9PT0gMjA0IHx8IHMudHlwZSA9PT0gXCJIRUFEXCIgKSB7XG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwibm9jb250ZW50XCI7XG5cbiAgICAgICAgLy8gaWYgbm90IG1vZGlmaWVkXG4gICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMzA0ICkge1xuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIm5vdG1vZGlmaWVkXCI7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXRlO1xuICAgICAgICAgIHN1Y2Nlc3MgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgaXNTdWNjZXNzID0gIWVycm9yO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBleHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dFxuICAgICAgICAvLyB0aGVuIG5vcm1hbGl6ZSBzdGF0dXNUZXh0IGFuZCBzdGF0dXMgZm9yIG5vbi1hYm9ydHNcbiAgICAgICAgZXJyb3IgPSBzdGF0dXNUZXh0O1xuICAgICAgICBpZiAoIHN0YXR1cyB8fCAhc3RhdHVzVGV4dCApIHtcbiAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJlcnJvclwiO1xuICAgICAgICAgIGlmICggc3RhdHVzIDwgMCApIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBkYXRhIGZvciB0aGUgZmFrZSB4aHIgb2JqZWN0XG4gICAgICBqcVhIUi5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICBqcVhIUi5zdGF0dXNUZXh0ID0gKCBuYXRpdmVTdGF0dXNUZXh0IHx8IHN0YXR1c1RleHQgKSArIFwiXCI7XG5cbiAgICAgIC8vIFN1Y2Nlc3MvRXJyb3JcbiAgICAgIGlmICggaXNTdWNjZXNzICkge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIHN1Y2Nlc3MsIHN0YXR1c1RleHQsIGpxWEhSIF0gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdFdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCwgZXJyb3IgXSApO1xuICAgICAgfVxuXG4gICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuICAgICAganFYSFIuc3RhdHVzQ29kZSggc3RhdHVzQ29kZSApO1xuICAgICAgc3RhdHVzQ29kZSA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKCBmaXJlR2xvYmFscyApIHtcbiAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIGlzU3VjY2VzcyA/IFwiYWpheFN1Y2Nlc3NcIiA6IFwiYWpheEVycm9yXCIsXG4gICAgICAgICAgWyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29tcGxldGVcbiAgICAgIGNvbXBsZXRlRGVmZXJyZWQuZmlyZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBqcVhIUiwgc3RhdHVzVGV4dCBdICk7XG5cbiAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhDb21wbGV0ZVwiLCBbIGpxWEhSLCBzIF0gKTtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG4gICAgICAgIGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG4gICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqcVhIUjtcbiAgfSxcblxuICBnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcbiAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcbiAgfSxcblxuICBnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuICAgIHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcbiAgfVxufSk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG4gIGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcbiAgICAvLyBzaGlmdCBhcmd1bWVudHMgaWYgZGF0YSBhcmd1bWVudCB3YXMgb21pdHRlZFxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcbiAgICAgIHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xuICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4galF1ZXJ5LmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICB0eXBlOiBtZXRob2QsXG4gICAgICBkYXRhVHlwZTogdHlwZSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgIH0pO1xuICB9O1xufSk7XG5cbi8vIEF0dGFjaCBhIGJ1bmNoIG9mIGZ1bmN0aW9ucyBmb3IgaGFuZGxpbmcgY29tbW9uIEFKQVggZXZlbnRzXG5qUXVlcnkuZWFjaCggWyBcImFqYXhTdGFydFwiLCBcImFqYXhTdG9wXCIsIFwiYWpheENvbXBsZXRlXCIsIFwiYWpheEVycm9yXCIsIFwiYWpheFN1Y2Nlc3NcIiwgXCJhamF4U2VuZFwiIF0sIGZ1bmN0aW9uKCBpLCB0eXBlICkge1xuICBqUXVlcnkuZm5bIHR5cGUgXSA9IGZ1bmN0aW9uKCBmbiApIHtcbiAgICByZXR1cm4gdGhpcy5vbiggdHlwZSwgZm4gKTtcbiAgfTtcbn0pO1xuXG5cbmpRdWVyeS5fZXZhbFVybCA9IGZ1bmN0aW9uKCB1cmwgKSB7XG4gIHJldHVybiBqUXVlcnkuYWpheCh7XG4gICAgdXJsOiB1cmwsXG4gICAgdHlwZTogXCJHRVRcIixcbiAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICBhc3luYzogZmFsc2UsXG4gICAgZ2xvYmFsOiBmYWxzZSxcbiAgICBcInRocm93c1wiOiB0cnVlXG4gIH0pO1xufTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgd3JhcEFsbDogZnVuY3Rpb24oIGh0bWwgKSB7XG4gICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS53cmFwQWxsKCBodG1sLmNhbGwodGhpcywgaSkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICggdGhpc1swXSApIHtcbiAgICAgIC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXG4gICAgICB2YXIgd3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1swXS5vd25lckRvY3VtZW50ICkuZXEoMCkuY2xvbmUodHJ1ZSk7XG5cbiAgICAgIGlmICggdGhpc1swXS5wYXJlbnROb2RlICkge1xuICAgICAgICB3cmFwLmluc2VydEJlZm9yZSggdGhpc1swXSApO1xuICAgICAgfVxuXG4gICAgICB3cmFwLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuXG4gICAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICYmIGVsZW0uZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gMSApIHtcbiAgICAgICAgICBlbGVtID0gZWxlbS5maXJzdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICB9KS5hcHBlbmQoIHRoaXMgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBqUXVlcnkodGhpcykud3JhcElubmVyKCBodG1sLmNhbGwodGhpcywgaSkgKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxuICAgICAgICBjb250ZW50cyA9IHNlbGYuY29udGVudHMoKTtcblxuICAgICAgaWYgKCBjb250ZW50cy5sZW5ndGggKSB7XG4gICAgICAgIGNvbnRlbnRzLndyYXBBbGwoIGh0bWwgKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5hcHBlbmQoIGh0bWwgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICB3cmFwOiBmdW5jdGlvbiggaHRtbCApIHtcbiAgICB2YXIgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwodGhpcywgaSkgOiBodG1sICk7XG4gICAgfSk7XG4gIH0sXG5cbiAgdW53cmFwOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImJvZHlcIiApICkge1xuICAgICAgICBqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG4gICAgICB9XG4gICAgfSkuZW5kKCk7XG4gIH1cbn0pO1xuXG5cbmpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIFN1cHBvcnQ6IE9wZXJhIDw9IDEyLjEyXG4gIC8vIE9wZXJhIHJlcG9ydHMgb2Zmc2V0V2lkdGhzIGFuZCBvZmZzZXRIZWlnaHRzIGxlc3MgdGhhbiB6ZXJvIG9uIHNvbWUgZWxlbWVudHNcbiAgcmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtLm9mZnNldEhlaWdodCA8PSAwIHx8XG4gICAgKCFzdXBwb3J0LnJlbGlhYmxlSGlkZGVuT2Zmc2V0cygpICYmXG4gICAgICAoKGVsZW0uc3R5bGUgJiYgZWxlbS5zdHlsZS5kaXNwbGF5KSB8fCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApKSA9PT0gXCJub25lXCIpO1xufTtcblxualF1ZXJ5LmV4cHIuZmlsdGVycy52aXNpYmxlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHJldHVybiAhalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4oIGVsZW0gKTtcbn07XG5cblxuXG5cbnZhciByMjAgPSAvJTIwL2csXG4gIHJicmFja2V0ID0gL1xcW1xcXSQvLFxuICByQ1JMRiA9IC9cXHI/XFxuL2csXG4gIHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcbiAgcnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG4gIHZhciBuYW1lO1xuXG4gIGlmICggalF1ZXJ5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuICAgIGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuICAgICAgaWYgKCB0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KCBwcmVmaXggKSApIHtcbiAgICAgICAgLy8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuICAgICAgICBhZGQoIHByZWZpeCwgdiApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cbiAgICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiA/IGkgOiBcIlwiICkgKyBcIl1cIiwgdiwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuICAgIGZvciAoIG5hbWUgaW4gb2JqICkge1xuICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cbiAgICBhZGQoIHByZWZpeCwgb2JqICk7XG4gIH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuICB2YXIgcHJlZml4LFxuICAgIHMgPSBbXSxcbiAgICBhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcbiAgICAgIC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuICAgICAgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSA/IHZhbHVlKCkgOiAoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcbiAgICAgIHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlICk7XG4gICAgfTtcblxuICAvLyBTZXQgdHJhZGl0aW9uYWwgdG8gdHJ1ZSBmb3IgalF1ZXJ5IDw9IDEuMy4yIGJlaGF2aW9yLlxuICBpZiAoIHRyYWRpdGlvbmFsID09PSB1bmRlZmluZWQgKSB7XG4gICAgdHJhZGl0aW9uYWwgPSBqUXVlcnkuYWpheFNldHRpbmdzICYmIGpRdWVyeS5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XG4gIH1cblxuICAvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuICBpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuICAgIC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuICAgIGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcbiAgICAgIGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuICAgIGZvciAoIHByZWZpeCBpbiBhICkge1xuICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG4gIHJldHVybiBzLmpvaW4oIFwiJlwiICkucmVwbGFjZSggcjIwLCBcIitcIiApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG4gIH0sXG4gIHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG4gICAgICB2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG4gICAgICByZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcbiAgICB9KVxuICAgIC5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdHlwZSA9IHRoaXMudHlwZTtcbiAgICAgIC8vIFVzZSAuaXMoXCI6ZGlzYWJsZWRcIikgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3NcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcbiAgICAgICAgcnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuICAgICAgICAoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuICAgICAgdmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG4gICAgICByZXR1cm4gdmFsID09IG51bGwgP1xuICAgICAgICBudWxsIDpcbiAgICAgICAgalF1ZXJ5LmlzQXJyYXkoIHZhbCApID9cbiAgICAgICAgICBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuICAgICAgICAgIH0pIDpcbiAgICAgICAgICB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG4gICAgfSkuZ2V0KCk7XG4gIH1cbn0pO1xuXG5cbi8vIENyZWF0ZSB0aGUgcmVxdWVzdCBvYmplY3Rcbi8vIChUaGlzIGlzIHN0aWxsIGF0dGFjaGVkIHRvIGFqYXhTZXR0aW5ncyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSlcbmpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IHVuZGVmaW5lZCA/XG4gIC8vIFN1cHBvcnQ6IElFNitcbiAgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBYSFIgY2Fubm90IGFjY2VzcyBsb2NhbCBmaWxlcywgYWx3YXlzIHVzZSBBY3RpdmVYIGZvciB0aGF0IGNhc2VcbiAgICByZXR1cm4gIXRoaXMuaXNMb2NhbCAmJlxuXG4gICAgICAvLyBTdXBwb3J0OiBJRTctOFxuICAgICAgLy8gb2xkSUUgWEhSIGRvZXMgbm90IHN1cHBvcnQgbm9uLVJGQzI2MTYgbWV0aG9kcyAoIzEzMjQwKVxuICAgICAgLy8gU2VlIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9tczUzNjY0OCh2PXZzLjg1KS5hc3B4XG4gICAgICAvLyBhbmQgaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWM5Lmh0bWwjc2VjOVxuICAgICAgLy8gQWx0aG91Z2ggdGhpcyBjaGVjayBmb3Igc2l4IG1ldGhvZHMgaW5zdGVhZCBvZiBlaWdodFxuICAgICAgLy8gc2luY2UgSUUgYWxzbyBkb2VzIG5vdCBzdXBwb3J0IFwidHJhY2VcIiBhbmQgXCJjb25uZWN0XCJcbiAgICAgIC9eKGdldHxwb3N0fGhlYWR8cHV0fGRlbGV0ZXxvcHRpb25zKSQvaS50ZXN0KCB0aGlzLnR5cGUgKSAmJlxuXG4gICAgICBjcmVhdGVTdGFuZGFyZFhIUigpIHx8IGNyZWF0ZUFjdGl2ZVhIUigpO1xuICB9IDpcbiAgLy8gRm9yIGFsbCBvdGhlciBicm93c2VycywgdXNlIHRoZSBzdGFuZGFyZCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcbiAgY3JlYXRlU3RhbmRhcmRYSFI7XG5cbnZhciB4aHJJZCA9IDAsXG4gIHhockNhbGxiYWNrcyA9IHt9LFxuICB4aHJTdXBwb3J0ZWQgPSBqUXVlcnkuYWpheFNldHRpbmdzLnhocigpO1xuXG4vLyBTdXBwb3J0OiBJRTwxMFxuLy8gT3BlbiByZXF1ZXN0cyBtdXN0IGJlIG1hbnVhbGx5IGFib3J0ZWQgb24gdW5sb2FkICgjNTI4MClcbmlmICggd2luZG93LkFjdGl2ZVhPYmplY3QgKSB7XG4gIGpRdWVyeSggd2luZG93ICkub24oIFwidW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgIGZvciAoIHZhciBrZXkgaW4geGhyQ2FsbGJhY2tzICkge1xuICAgICAgeGhyQ2FsbGJhY2tzWyBrZXkgXSggdW5kZWZpbmVkLCB0cnVlICk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRGV0ZXJtaW5lIHN1cHBvcnQgcHJvcGVydGllc1xuc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xueGhyU3VwcG9ydGVkID0gc3VwcG9ydC5hamF4ID0gISF4aHJTdXBwb3J0ZWQ7XG5cbi8vIENyZWF0ZSB0cmFuc3BvcnQgaWYgdGhlIGJyb3dzZXIgY2FuIHByb3ZpZGUgYW4geGhyXG5pZiAoIHhoclN1cHBvcnRlZCApIHtcblxuICBqUXVlcnkuYWpheFRyYW5zcG9ydChmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAvLyBDcm9zcyBkb21haW4gb25seSBhbGxvd2VkIGlmIHN1cHBvcnRlZCB0aHJvdWdoIFhNTEh0dHBSZXF1ZXN0XG4gICAgaWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiB8fCBzdXBwb3J0LmNvcnMgKSB7XG5cbiAgICAgIHZhciBjYWxsYmFjaztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZDogZnVuY3Rpb24oIGhlYWRlcnMsIGNvbXBsZXRlICkge1xuICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgeGhyID0gb3B0aW9ucy54aHIoKSxcbiAgICAgICAgICAgIGlkID0gKyt4aHJJZDtcblxuICAgICAgICAgIC8vIE9wZW4gdGhlIHNvY2tldFxuICAgICAgICAgIHhoci5vcGVuKCBvcHRpb25zLnR5cGUsIG9wdGlvbnMudXJsLCBvcHRpb25zLmFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkICk7XG5cbiAgICAgICAgICAvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG4gICAgICAgICAgaWYgKCBvcHRpb25zLnhockZpZWxkcyApIHtcbiAgICAgICAgICAgIGZvciAoIGkgaW4gb3B0aW9ucy54aHJGaWVsZHMgKSB7XG4gICAgICAgICAgICAgIHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG4gICAgICAgICAgaWYgKCBvcHRpb25zLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuICAgICAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoIG9wdGlvbnMubWltZVR5cGUgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuICAgICAgICAgIC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcbiAgICAgICAgICAvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuICAgICAgICAgIC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxuICAgICAgICAgIC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuICAgICAgICAgIGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdICkge1xuICAgICAgICAgICAgaGVhZGVyc1tcIlgtUmVxdWVzdGVkLVdpdGhcIl0gPSBcIlhNTEh0dHBSZXF1ZXN0XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2V0IGhlYWRlcnNcbiAgICAgICAgICBmb3IgKCBpIGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XG4gICAgICAgICAgICAvLyBJRSdzIEFjdGl2ZVhPYmplY3QgdGhyb3dzIGEgJ1R5cGUgTWlzbWF0Y2gnIGV4Y2VwdGlvbiB3aGVuIHNldHRpbmdcbiAgICAgICAgICAgIC8vIHJlcXVlc3QgaGVhZGVyIHRvIGEgbnVsbC12YWx1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBUbyBrZWVwIGNvbnNpc3RlbnQgd2l0aCBvdGhlciBYSFIgaW1wbGVtZW50YXRpb25zLCBjYXN0IHRoZSB2YWx1ZVxuICAgICAgICAgICAgLy8gdG8gc3RyaW5nIGFuZCBpZ25vcmUgYHVuZGVmaW5lZGAuXG4gICAgICAgICAgICBpZiAoIGhlYWRlcnNbIGkgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciggaSwgaGVhZGVyc1sgaSBdICsgXCJcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERvIHNlbmQgdGhlIHJlcXVlc3RcbiAgICAgICAgICAvLyBUaGlzIG1heSByYWlzZSBhbiBleGNlcHRpb24gd2hpY2ggaXMgYWN0dWFsbHlcbiAgICAgICAgICAvLyBoYW5kbGVkIGluIGpRdWVyeS5hamF4IChzbyBubyB0cnkvY2F0Y2ggaGVyZSlcbiAgICAgICAgICB4aHIuc2VuZCggKCBvcHRpb25zLmhhc0NvbnRlbnQgJiYgb3B0aW9ucy5kYXRhICkgfHwgbnVsbCApO1xuXG4gICAgICAgICAgLy8gTGlzdGVuZXJcbiAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKCBfLCBpc0Fib3J0ICkge1xuICAgICAgICAgICAgdmFyIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzcG9uc2VzO1xuXG4gICAgICAgICAgICAvLyBXYXMgbmV2ZXIgY2FsbGVkIGFuZCBpcyBhYm9ydGVkIG9yIGNvbXBsZXRlXG4gICAgICAgICAgICBpZiAoIGNhbGxiYWNrICYmICggaXNBYm9ydCB8fCB4aHIucmVhZHlTdGF0ZSA9PT0gNCApICkge1xuICAgICAgICAgICAgICAvLyBDbGVhbiB1cFxuICAgICAgICAgICAgICBkZWxldGUgeGhyQ2FsbGJhY2tzWyBpZCBdO1xuICAgICAgICAgICAgICBjYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGpRdWVyeS5ub29wO1xuXG4gICAgICAgICAgICAgIC8vIEFib3J0IG1hbnVhbGx5IGlmIG5lZWRlZFxuICAgICAgICAgICAgICBpZiAoIGlzQWJvcnQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB4aHIucmVhZHlTdGF0ZSAhPT0gNCApIHtcbiAgICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8MTBcbiAgICAgICAgICAgICAgICAvLyBBY2Nlc3NpbmcgYmluYXJ5LWRhdGEgcmVzcG9uc2VUZXh0IHRocm93cyBhbiBleGNlcHRpb25cbiAgICAgICAgICAgICAgICAvLyAoIzExNDI2KVxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHhoci5yZXNwb25zZVRleHQgPT09IFwic3RyaW5nXCIgKSB7XG4gICAgICAgICAgICAgICAgICByZXNwb25zZXMudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCB0aHJvd3MgYW4gZXhjZXB0aW9uIHdoZW4gYWNjZXNzaW5nXG4gICAgICAgICAgICAgICAgLy8gc3RhdHVzVGV4dCBmb3IgZmF1bHR5IGNyb3NzLWRvbWFpbiByZXF1ZXN0c1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCggZSApIHtcbiAgICAgICAgICAgICAgICAgIC8vIFdlIG5vcm1hbGl6ZSB3aXRoIFdlYmtpdCBnaXZpbmcgYW4gZW1wdHkgc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIHN0YXR1cyBmb3Igbm9uIHN0YW5kYXJkIGJlaGF2aW9yc1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlcXVlc3QgaXMgbG9jYWwgYW5kIHdlIGhhdmUgZGF0YTogYXNzdW1lIGEgc3VjY2Vzc1xuICAgICAgICAgICAgICAgIC8vIChzdWNjZXNzIHdpdGggbm8gZGF0YSB3b24ndCBnZXQgbm90aWZpZWQsIHRoYXQncyB0aGUgYmVzdCB3ZVxuICAgICAgICAgICAgICAgIC8vIGNhbiBkbyBnaXZlbiBjdXJyZW50IGltcGxlbWVudGF0aW9ucylcbiAgICAgICAgICAgICAgICBpZiAoICFzdGF0dXMgJiYgb3B0aW9ucy5pc0xvY2FsICYmICFvcHRpb25zLmNyb3NzRG9tYWluICkge1xuICAgICAgICAgICAgICAgICAgc3RhdHVzID0gcmVzcG9uc2VzLnRleHQgPyAyMDAgOiA0MDQ7XG4gICAgICAgICAgICAgICAgLy8gSUUgLSAjMTQ1MDogc29tZXRpbWVzIHJldHVybnMgMTIyMyB3aGVuIGl0IHNob3VsZCBiZSAyMDRcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDEyMjMgKSB7XG4gICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENhbGwgY29tcGxldGUgaWYgbmVlZGVkXG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlcyApIHtcbiAgICAgICAgICAgICAgY29tcGxldGUoIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzcG9uc2VzLCB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCAhb3B0aW9ucy5hc3luYyApIHtcbiAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGluIHN5bmMgbW9kZSB3ZSBmaXJlIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCB4aHIucmVhZHlTdGF0ZSA9PT0gNCApIHtcbiAgICAgICAgICAgIC8vIChJRTYgJiBJRTcpIGlmIGl0J3MgaW4gY2FjaGUgYW5kIGhhcyBiZWVuXG4gICAgICAgICAgICAvLyByZXRyaWV2ZWQgZGlyZWN0bHkgd2UgbmVlZCB0byBmaXJlIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgc2V0VGltZW91dCggY2FsbGJhY2sgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGFjdGl2ZSB4aHIgY2FsbGJhY2tzXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0geGhyQ2FsbGJhY2tzWyBpZCBdID0gY2FsbGJhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFib3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgICAgICAgY2FsbGJhY2soIHVuZGVmaW5lZCwgdHJ1ZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBGdW5jdGlvbnMgdG8gY3JlYXRlIHhocnNcbmZ1bmN0aW9uIGNyZWF0ZVN0YW5kYXJkWEhSKCkge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH0gY2F0Y2goIGUgKSB7fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBY3RpdmVYSFIoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCggXCJNaWNyb3NvZnQuWE1MSFRUUFwiICk7XG4gIH0gY2F0Y2goIGUgKSB7fVxufVxuXG5cblxuXG4vLyBJbnN0YWxsIHNjcmlwdCBkYXRhVHlwZVxualF1ZXJ5LmFqYXhTZXR1cCh7XG4gIGFjY2VwdHM6IHtcbiAgICBzY3JpcHQ6IFwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIlxuICB9LFxuICBjb250ZW50czoge1xuICAgIHNjcmlwdDogLyg/OmphdmF8ZWNtYSlzY3JpcHQvXG4gIH0sXG4gIGNvbnZlcnRlcnM6IHtcbiAgICBcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuICAgICAgalF1ZXJ5Lmdsb2JhbEV2YWwoIHRleHQgKTtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgZ2xvYmFsXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG4gIGlmICggcy5jYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuICAgIHMuY2FjaGUgPSBmYWxzZTtcbiAgfVxuICBpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG4gICAgcy50eXBlID0gXCJHRVRcIjtcbiAgICBzLmdsb2JhbCA9IGZhbHNlO1xuICB9XG59KTtcblxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XG5qUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24ocykge1xuXG4gIC8vIFRoaXMgdHJhbnNwb3J0IG9ubHkgZGVhbHMgd2l0aCBjcm9zcyBkb21haW4gcmVxdWVzdHNcbiAgaWYgKCBzLmNyb3NzRG9tYWluICkge1xuXG4gICAgdmFyIHNjcmlwdCxcbiAgICAgIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGpRdWVyeShcImhlYWRcIilbMF0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgc2VuZDogZnVuY3Rpb24oIF8sIGNhbGxiYWNrICkge1xuXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIHMuc2NyaXB0Q2hhcnNldCApIHtcbiAgICAgICAgICBzY3JpcHQuY2hhcnNldCA9IHMuc2NyaXB0Q2hhcnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcmlwdC5zcmMgPSBzLnVybDtcblxuICAgICAgICAvLyBBdHRhY2ggaGFuZGxlcnMgZm9yIGFsbCBicm93c2Vyc1xuICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCBfLCBpc0Fib3J0ICkge1xuXG4gICAgICAgICAgaWYgKCBpc0Fib3J0IHx8ICFzY3JpcHQucmVhZHlTdGF0ZSB8fCAvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KCBzY3JpcHQucmVhZHlTdGF0ZSApICkge1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgbWVtb3J5IGxlYWsgaW4gSUVcbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzY3JpcHRcbiAgICAgICAgICAgIGlmICggc2NyaXB0LnBhcmVudE5vZGUgKSB7XG4gICAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVyZWZlcmVuY2UgdGhlIHNjcmlwdFxuICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgaWYgbm90IGFib3J0XG4gICAgICAgICAgICBpZiAoICFpc0Fib3J0ICkge1xuICAgICAgICAgICAgICBjYWxsYmFjayggMjAwLCBcInN1Y2Nlc3NcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDaXJjdW12ZW50IElFNiBidWdzIHdpdGggYmFzZSBlbGVtZW50cyAoIzI3MDkgYW5kICM0Mzc4KSBieSBwcmVwZW5kaW5nXG4gICAgICAgIC8vIFVzZSBuYXRpdmUgRE9NIG1hbmlwdWxhdGlvbiB0byBhdm9pZCBvdXIgZG9tTWFuaXAgQUpBWCB0cmlja2VyeVxuICAgICAgICBoZWFkLmluc2VydEJlZm9yZSggc2NyaXB0LCBoZWFkLmZpcnN0Q2hpbGQgKTtcbiAgICAgIH0sXG5cbiAgICAgIGFib3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCBzY3JpcHQgKSB7XG4gICAgICAgICAgc2NyaXB0Lm9ubG9hZCggdW5kZWZpbmVkLCB0cnVlICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59KTtcblxuXG5cblxudmFyIG9sZENhbGxiYWNrcyA9IFtdLFxuICByanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xuXG4vLyBEZWZhdWx0IGpzb25wIHNldHRpbmdzXG5qUXVlcnkuYWpheFNldHVwKHtcbiAganNvbnA6IFwiY2FsbGJhY2tcIixcbiAganNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gb2xkQ2FsbGJhY2tzLnBvcCgpIHx8ICggalF1ZXJ5LmV4cGFuZG8gKyBcIl9cIiArICggbm9uY2UrKyApICk7XG4gICAgdGhpc1sgY2FsbGJhY2sgXSA9IHRydWU7XG4gICAgcmV0dXJuIGNhbGxiYWNrO1xuICB9XG59KTtcblxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuICB2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG4gICAganNvblByb3AgPSBzLmpzb25wICE9PSBmYWxzZSAmJiAoIHJqc29ucC50ZXN0KCBzLnVybCApID9cbiAgICAgIFwidXJsXCIgOlxuICAgICAgdHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJiAhKCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpICYmIHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxuICAgICk7XG5cbiAgLy8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxuICBpZiAoIGpzb25Qcm9wIHx8IHMuZGF0YVR5cGVzWyAwIF0gPT09IFwianNvbnBcIiApIHtcblxuICAgIC8vIEdldCBjYWxsYmFjayBuYW1lLCByZW1lbWJlcmluZyBwcmVleGlzdGluZyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggaXRcbiAgICBjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuICAgICAgcy5qc29ucENhbGxiYWNrKCkgOlxuICAgICAgcy5qc29ucENhbGxiYWNrO1xuXG4gICAgLy8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuICAgIGlmICgganNvblByb3AgKSB7XG4gICAgICBzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuICAgIH0gZWxzZSBpZiAoIHMuanNvbnAgIT09IGZhbHNlICkge1xuICAgICAgcy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcbiAgICB9XG5cbiAgICAvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXG4gICAgcy5jb252ZXJ0ZXJzW1wic2NyaXB0IGpzb25cIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggIXJlc3BvbnNlQ29udGFpbmVyICkge1xuICAgICAgICBqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZUNvbnRhaW5lclsgMCBdO1xuICAgIH07XG5cbiAgICAvLyBmb3JjZSBqc29uIGRhdGFUeXBlXG4gICAgcy5kYXRhVHlwZXNbIDAgXSA9IFwianNvblwiO1xuXG4gICAgLy8gSW5zdGFsbCBjYWxsYmFja1xuICAgIG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcbiAgICB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXNwb25zZUNvbnRhaW5lciA9IGFyZ3VtZW50cztcbiAgICB9O1xuXG4gICAgLy8gQ2xlYW4tdXAgZnVuY3Rpb24gKGZpcmVzIGFmdGVyIGNvbnZlcnRlcnMpXG4gICAganFYSFIuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gUmVzdG9yZSBwcmVleGlzdGluZyB2YWx1ZVxuICAgICAgd2luZG93WyBjYWxsYmFja05hbWUgXSA9IG92ZXJ3cml0dGVuO1xuXG4gICAgICAvLyBTYXZlIGJhY2sgYXMgZnJlZVxuICAgICAgaWYgKCBzWyBjYWxsYmFja05hbWUgXSApIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG4gICAgICAgIHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuICAgICAgICAvLyBzYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsbCBpZiBpdCB3YXMgYSBmdW5jdGlvbiBhbmQgd2UgaGF2ZSBhIHJlc3BvbnNlXG4gICAgICBpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBvdmVyd3JpdHRlbiApICkge1xuICAgICAgICBvdmVyd3JpdHRlbiggcmVzcG9uc2VDb250YWluZXJbIDAgXSApO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgLy8gRGVsZWdhdGUgdG8gc2NyaXB0XG4gICAgcmV0dXJuIFwic2NyaXB0XCI7XG4gIH1cbn0pO1xuXG5cblxuXG4vLyBkYXRhOiBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LCBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcbiAgaWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcbiAgICBrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG4gICAgY29udGV4dCA9IGZhbHNlO1xuICB9XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG4gIHZhciBwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKSxcbiAgICBzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG4gIC8vIFNpbmdsZSB0YWdcbiAgaWYgKCBwYXJzZWQgKSB7XG4gICAgcmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbMV0gKSBdO1xuICB9XG5cbiAgcGFyc2VkID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cbiAgaWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuICAgIGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbi8vIEtlZXAgYSBjb3B5IG9mIHRoZSBvbGQgbG9hZCBtZXRob2RcbnZhciBfbG9hZCA9IGpRdWVyeS5mbi5sb2FkO1xuXG4vKipcbiAqIExvYWQgYSB1cmwgaW50byBhIHBhZ2VcbiAqL1xualF1ZXJ5LmZuLmxvYWQgPSBmdW5jdGlvbiggdXJsLCBwYXJhbXMsIGNhbGxiYWNrICkge1xuICBpZiAoIHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIgJiYgX2xvYWQgKSB7XG4gICAgcmV0dXJuIF9sb2FkLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgfVxuXG4gIHZhciBzZWxlY3RvciwgcmVzcG9uc2UsIHR5cGUsXG4gICAgc2VsZiA9IHRoaXMsXG4gICAgb2ZmID0gdXJsLmluZGV4T2YoXCIgXCIpO1xuXG4gIGlmICggb2ZmID49IDAgKSB7XG4gICAgc2VsZWN0b3IgPSB1cmwuc2xpY2UoIG9mZiwgdXJsLmxlbmd0aCApO1xuICAgIHVybCA9IHVybC5zbGljZSggMCwgb2ZmICk7XG4gIH1cblxuICAvLyBJZiBpdCdzIGEgZnVuY3Rpb25cbiAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcGFyYW1zICkgKSB7XG5cbiAgICAvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xuICAgIGNhbGxiYWNrID0gcGFyYW1zO1xuICAgIHBhcmFtcyA9IHVuZGVmaW5lZDtcblxuICAvLyBPdGhlcndpc2UsIGJ1aWxkIGEgcGFyYW0gc3RyaW5nXG4gIH0gZWxzZSBpZiAoIHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zID09PSBcIm9iamVjdFwiICkge1xuICAgIHR5cGUgPSBcIlBPU1RcIjtcbiAgfVxuXG4gIC8vIElmIHdlIGhhdmUgZWxlbWVudHMgdG8gbW9kaWZ5LCBtYWtlIHRoZSByZXF1ZXN0XG4gIGlmICggc2VsZi5sZW5ndGggPiAwICkge1xuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgIHVybDogdXJsLFxuXG4gICAgICAvLyBpZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxuICAgICAgZGF0YTogcGFyYW1zXG4gICAgfSkuZG9uZShmdW5jdGlvbiggcmVzcG9uc2VUZXh0ICkge1xuXG4gICAgICAvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcbiAgICAgIHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG4gICAgICBzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuICAgICAgICAvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcbiAgICAgICAgLy8gRXhjbHVkZSBzY3JpcHRzIHRvIGF2b2lkIElFICdQZXJtaXNzaW9uIERlbmllZCcgZXJyb3JzXG4gICAgICAgIGpRdWVyeShcIjxkaXY+XCIpLmFwcGVuZCggalF1ZXJ5LnBhcnNlSFRNTCggcmVzcG9uc2VUZXh0ICkgKS5maW5kKCBzZWxlY3RvciApIDpcblxuICAgICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHJlc3VsdFxuICAgICAgICByZXNwb25zZVRleHQgKTtcblxuICAgIH0pLmNvbXBsZXRlKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcbiAgICAgIHNlbGYuZWFjaCggY2FsbGJhY2ssIHJlc3BvbnNlIHx8IFsganFYSFIucmVzcG9uc2VUZXh0LCBzdGF0dXMsIGpxWEhSIF0gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICByZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuICAgIHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuICB9KS5sZW5ndGg7XG59O1xuXG5cblxuXG5cbnZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqXG4gKiBHZXRzIGEgd2luZG93IGZyb20gYW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coIGVsZW0gKSB7XG4gIHJldHVybiBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSA/XG4gICAgZWxlbSA6XG4gICAgZWxlbS5ub2RlVHlwZSA9PT0gOSA/XG4gICAgICBlbGVtLmRlZmF1bHRWaWV3IHx8IGVsZW0ucGFyZW50V2luZG93IDpcbiAgICAgIGZhbHNlO1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuICBzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuICAgIHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG4gICAgICBwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuICAgICAgY3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuICAgICAgcHJvcHMgPSB7fTtcblxuICAgIC8vIHNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cbiAgICBpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICB9XG5cbiAgICBjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuICAgIGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcbiAgICBjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcbiAgICBjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcbiAgICAgIGpRdWVyeS5pbkFycmF5KFwiYXV0b1wiLCBbIGN1ckNTU1RvcCwgY3VyQ1NTTGVmdCBdICkgPiAtMTtcblxuICAgIC8vIG5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuICAgIGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG4gICAgICBjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcbiAgICAgIGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcbiAgICAgIGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuICAgICAgY3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuICAgIH1cblxuICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGN1ck9mZnNldCApO1xuICAgIH1cblxuICAgIGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcbiAgICAgIHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG4gICAgfVxuICAgIGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcbiAgICB9XG5cbiAgICBpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuICAgICAgb3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJFbGVtLmNzcyggcHJvcHMgKTtcbiAgICB9XG4gIH1cbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcbiAgICAgIHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuICAgICAgICB0aGlzIDpcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuICAgICAgICAgIGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBkb2NFbGVtLCB3aW4sXG4gICAgICBib3ggPSB7IHRvcDogMCwgbGVmdDogMCB9LFxuICAgICAgZWxlbSA9IHRoaXNbIDAgXSxcbiAgICAgIGRvYyA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xuXG4gICAgaWYgKCAhZG9jICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgLy8gTWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlzY29ubmVjdGVkIERPTSBub2RlXG4gICAgaWYgKCAhalF1ZXJ5LmNvbnRhaW5zKCBkb2NFbGVtLCBlbGVtICkgKSB7XG4gICAgICByZXR1cm4gYm94O1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgZ0JDUiwganVzdCB1c2UgMCwwIHJhdGhlciB0aGFuIGVycm9yXG4gICAgLy8gQmxhY2tCZXJyeSA1LCBpT1MgMyAob3JpZ2luYWwgaVBob25lKVxuICAgIGlmICggdHlwZW9mIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSBzdHJ1bmRlZmluZWQgKSB7XG4gICAgICBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgICB3aW4gPSBnZXRXaW5kb3coIGRvYyApO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IGJveC50b3AgICsgKCB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3AgKSAgLSAoIGRvY0VsZW0uY2xpZW50VG9wICB8fCAwICksXG4gICAgICBsZWZ0OiBib3gubGVmdCArICggd2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCApIC0gKCBkb2NFbGVtLmNsaWVudExlZnQgfHwgMCApXG4gICAgfTtcbiAgfSxcblxuICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhdGhpc1sgMCBdICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcbiAgICAgIHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXG4gICAgICBlbGVtID0gdGhpc1sgMCBdO1xuXG4gICAgLy8gZml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHdpbmRvdyAocGFyZW50T2Zmc2V0ID0ge3RvcDowLCBsZWZ0OiAwfSwgYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XG4gICAgaWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIGF2YWlsYWJsZSB3aGVuIGNvbXB1dGVkIHBvc2l0aW9uIGlzIGZpeGVkXG4gICAgICBvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuICAgICAgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuICAgICAgLy8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuICAgICAgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcbiAgICAgIGlmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50WyAwIF0sIFwiaHRtbFwiICkgKSB7XG4gICAgICAgIHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG4gICAgICBwYXJlbnRPZmZzZXQudG9wICArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuICAgIH1cblxuICAgIC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcbiAgICAvLyBub3RlOiB3aGVuIGFuIGVsZW1lbnQgaGFzIG1hcmdpbjogYXV0byB0aGUgb2Zmc2V0TGVmdCBhbmQgbWFyZ2luTGVmdFxuICAgIC8vIGFyZSB0aGUgc2FtZSBpbiBTYWZhcmkgY2F1c2luZyBvZmZzZXQubGVmdCB0byBpbmNvcnJlY3RseSBiZSAwXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogIG9mZnNldC50b3AgIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcbiAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSlcbiAgICB9O1xuICB9LFxuXG4gIG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50IHx8IGRvY0VsZW07XG5cbiAgICAgIHdoaWxlICggb2Zmc2V0UGFyZW50ICYmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50LCBcImh0bWxcIiApICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSApIHtcbiAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuICB2YXIgdG9wID0gL1kvLnRlc3QoIHByb3AgKTtcblxuICBqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcbiAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbWV0aG9kLCB2YWwgKSB7XG4gICAgICB2YXIgd2luID0gZ2V0V2luZG93KCBlbGVtICk7XG5cbiAgICAgIGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIHJldHVybiB3aW4gPyAocHJvcCBpbiB3aW4pID8gd2luWyBwcm9wIF0gOlxuICAgICAgICAgIHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIG1ldGhvZCBdIDpcbiAgICAgICAgICBlbGVtWyBtZXRob2QgXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCB3aW4gKSB7XG4gICAgICAgIHdpbi5zY3JvbGxUbyhcbiAgICAgICAgICAhdG9wID8gdmFsIDogalF1ZXJ5KCB3aW4gKS5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wID8gdmFsIDogalF1ZXJ5KCB3aW4gKS5zY3JvbGxUb3AoKVxuICAgICAgICApO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtWyBtZXRob2QgXSA9IHZhbDtcbiAgICAgIH1cbiAgICB9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCwgbnVsbCApO1xuICB9O1xufSk7XG5cbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXG4vLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHRcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCB3ZSBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcbiAgalF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcbiAgICBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG4gICAgICBpZiAoIGNvbXB1dGVkICkge1xuICAgICAgICBjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuICAgICAgICAvLyBpZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcbiAgICAgICAgcmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cbiAgICAgICAgICBqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuICAgICAgICAgIGNvbXB1dGVkO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuICBqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sIGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuICAgIC8vIG1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuICAgIGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuICAgICAgdmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcbiAgICAgICAgZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG4gICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XG4gICAgICAgIHZhciBkb2M7XG5cbiAgICAgICAgaWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcbiAgICAgICAgICAvLyBBcyBvZiA1LzgvMjAxMiB0aGlzIHdpbGwgeWllbGQgaW5jb3JyZWN0IHJlc3VsdHMgZm9yIE1vYmlsZSBTYWZhcmksIGJ1dCB0aGVyZVxuICAgICAgICAgIC8vIGlzbid0IGEgd2hvbGUgbG90IHdlIGNhbiBkby4gU2VlIHB1bGwgcmVxdWVzdCBhdCB0aGlzIFVSTCBmb3IgZGlzY3Vzc2lvbjpcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzc2NFxuICAgICAgICAgIHJldHVybiBlbGVtLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgXCJjbGllbnRcIiArIG5hbWUgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcbiAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuICAgICAgICAgIGRvYyA9IGVsZW0uZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgICAgLy8gRWl0aGVyIHNjcm9sbFtXaWR0aC9IZWlnaHRdIG9yIG9mZnNldFtXaWR0aC9IZWlnaHRdIG9yIGNsaWVudFtXaWR0aC9IZWlnaHRdLCB3aGljaGV2ZXIgaXMgZ3JlYXRlc3RcbiAgICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5LCB0aGlzIGNhdXNlcyBidWcgIzM4MzggaW4gSUU2Lzggb25seSwgYnV0IHRoZXJlIGlzIGN1cnJlbnRseSBubyBnb29kLCBzbWFsbCB3YXkgdG8gZml4IGl0LlxuICAgICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICAgIGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuICAgICAgICAgICAgZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXG4gICAgICAgICAgICBkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcbiAgICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuICAgICAgICAgIC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcbiAgICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuICAgICAgfSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUsIG51bGwgKTtcbiAgICB9O1xuICB9KTtcbn0pO1xuXG5cbi8vIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgY29udGFpbmVkIGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5qUXVlcnkuZm4uc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5sZW5ndGg7XG59O1xuXG5qUXVlcnkuZm4uYW5kU2VsZiA9IGpRdWVyeS5mbi5hZGRCYWNrO1xuXG5cblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG4gIGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBqUXVlcnk7XG4gIH0pO1xufVxuXG5cblxuXG52YXJcbiAgLy8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gIF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG4gIC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gIF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG4gIGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcbiAgICB3aW5kb3cuJCA9IF8kO1xuICB9XG5cbiAgaWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcbiAgICB3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcbiAgfVxuXG4gIHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluXG4vLyBBTUQgKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCB0eXBlb2Ygbm9HbG9iYWwgPT09IHN0cnVuZGVmaW5lZCApIHtcbiAgd2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5yZXR1cm4galF1ZXJ5O1xuXG59KSk7Il19
