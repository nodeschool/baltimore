var $ = require("./vendor/jquery");

var faq = $(".faq");
var lines = faq.children("p");
var current = 0;

lines.css("opacity", 0);

function checkLines(offset, height) {
  var windowHeight = $(window).height();
  var viewportBottom = $(window).scrollTop() + windowHeight;
  lines.each(function (i, line) {
    var $line = $(line);
    var elBottom = $line.offset().top + $line.height() + (windowHeight / 4);

    if (elBottom < viewportBottom) {
      $line.css("opacity", 1);
    }
  });
}

$(window).on("scroll", function (e) {

  if (faq.data("style") === "irc") {
    checkLines();
  }

});

var faqtext = {
  irc: "boring faq",
  normal: "irc faq"
};

function toggleFaqStyle(current, button) {
  var btn = button.find("span");
  if (current === "irc") {
    faq.attr("data-style", "normal").data("style", "normal");
    lines.css("opacity", 1);
    btn.text(faqtext.normal);
  } else {
    faq.attr("data-style", "irc").data("style", "irc");
    lines.css("opacity", 0);
    btn.text(faqtext.irc);
    checkLines();
  }
}

faq.find("button.toggle").on("click", function (e) {
  toggleFaqStyle(faq.data("style"), $(this));
});

$("a.huh").on("click", function (e) {

  e.preventDefault();

  var target = $("a[name='" + this.href.split("#").pop() + "']");
  $("body").animate({ scrollTop: target.offset().top }, 1500);

});
