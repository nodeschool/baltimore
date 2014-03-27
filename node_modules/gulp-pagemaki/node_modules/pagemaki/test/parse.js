var expect = require("chai").expect;
var Pagemaki = require("../pagemaki");

var raw = "---\n\
name: Test Name\n\
layout: default\n\
---\n\
<h1>Title</h1>";


describe("parse", function () {

	var maker = new Pagemaki({});

	it("should parse yaml options by default", function (done) {

		maker.parse(raw, function (err, parsed) {

			expect(err).to.be.null;
			expect(parsed).to.be.an('object');

			done();

		});

	});


	it("should parse options", function (done) {

		maker.parse(raw, function (err, parsed) {

			expect(parsed.options).to.be.an('object');
			expect(parsed.options.name).to.equal("Test Name");
			expect(parsed.options.layout).to.equal("default");

			done();

		});

	});


	it("should parse content", function (done) {

		maker.parse(raw, function (err, parsed) {

			expect(parsed.content).to.be.a('string');
			expect(parsed.content).to.equal("<h1>Title</h1>");

			done();

		});
	
	});


});