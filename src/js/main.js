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