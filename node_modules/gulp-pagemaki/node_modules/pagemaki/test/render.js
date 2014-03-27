var expect = require("chai").expect;
var Pagemaki = require("../pagemaki");

describe("render", function () {

  var testParsed = {
    test: "a test string"
  };

  var testRenderer = function () { 
    return "<h1><%= page.test %></h1>"; 
  };


	it("should use underscore templates by default", function (done) {

    var maker = new Pagemaki({
      getTemplateString: testRenderer
    });

    maker.render(null, testParsed, function (err, rendered) {

      expect(rendered).to.equal("<h1>a test string</h1>");

      done();

    });

	});



  it("should be customizeable on creation", function (done) {

    var maker = new Pagemaki({
      getTemplateString: testRenderer,
      templateCompile: function (string) {
        return function () { 
          return "removed"; 
        };
      }
    });

    maker.render(null, testParsed, function (err, rendered) {

      expect(rendered).to.equal("removed");

      done();

    });
  
  });

});


// MOAR TESTS 
// var fs = require("fs");
// var Maker = require("./pagemaker");

// var maker = new Maker({
//   templateData: { site: { title: "Not Robotic Ok?" } }
// });

// maker.make(fs.readFileSync("./src/pages/index.html"), function (err, made) {

//   console.log(arguments);

// });