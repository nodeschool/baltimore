var Pagemaki = require("pagemaki");
var Buffer = require("buffer").Buffer;
var through = require("through");

/**
 * Returns a file handling function that can 
 * be piped to from within a gulp workflow
 * 
 * @return {[type]} [description]
 */
module.exports = function (options) {

  var maker = new Pagemaki(options);

  function write(file) {

    var stream = this;

    if (!file._contents) {
      return;
    }

    maker.make(file._contents.toString(), function (err, made) {
      file._contents = new Buffer(made);
      stream.queue(file);
    });
    
  }

  return through(write);

};