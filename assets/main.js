(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var $ = require("./vendor/jquery");

// var faq = $(".faq");
// var lines = faq.children("p");
// var current = 0;

// lines.css("opacity", 0);

// function checkLines(offset, height) {
//   var windowHeight = $(window).height();
//   var viewportBottom = $(window).scrollTop() + windowHeight;
//   lines.each(function (i, line) {
//     var $line = $(line);
//     var elBottom = $line.offset().top + $line.height() + (windowHeight / 4);

//     if (elBottom < viewportBottom) {
//       $line.css("opacity", 1);
//     }
//   });
// }

// $(window).on("scroll", function (e) {

//   if (faq.data("style") === "irc") {
//     checkLines();
//   }

// });

// var faqtext = {
//   irc: "boring faq",
//   normal: "irc faq"
// };

// function toggleFaqStyle(current, button) {
//   var btn = button.find("span");
//   if (current === "irc") {
//     faq.attr("data-style", "normal").data("style", "normal");
//     lines.css("opacity", 1);
//     btn.text(faqtext.normal);
//   } else {
//     faq.attr("data-style", "irc").data("style", "irc");
//     lines.css("opacity", 0);
//     btn.text(faqtext.irc);
//     checkLines();
//   }
// }

// faq.find("button.toggle").on("click", function (e) {
//   toggleFaqStyle(faq.data("style"), $(this));
// });

// $("a.huh").on("click", function (e) {

//   e.preventDefault();

//   var target = $("a[name='" + this.href.split("#").pop() + "']");
//   $("body").animate({ scrollTop: target.offset().top }, 1500);

// });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvanJob2Rlcy9wZXJzb25hbC9iYWx0aW1vcmUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qcmhvZGVzL3BlcnNvbmFsL2JhbHRpbW9yZS9zcmMvanMvZmFrZV9hMmJlYmU3OS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyB2YXIgJCA9IHJlcXVpcmUoXCIuL3ZlbmRvci9qcXVlcnlcIik7XG5cbi8vIHZhciBmYXEgPSAkKFwiLmZhcVwiKTtcbi8vIHZhciBsaW5lcyA9IGZhcS5jaGlsZHJlbihcInBcIik7XG4vLyB2YXIgY3VycmVudCA9IDA7XG5cbi8vIGxpbmVzLmNzcyhcIm9wYWNpdHlcIiwgMCk7XG5cbi8vIGZ1bmN0aW9uIGNoZWNrTGluZXMob2Zmc2V0LCBoZWlnaHQpIHtcbi8vICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbi8vICAgdmFyIHZpZXdwb3J0Qm90dG9tID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgd2luZG93SGVpZ2h0O1xuLy8gICBsaW5lcy5lYWNoKGZ1bmN0aW9uIChpLCBsaW5lKSB7XG4vLyAgICAgdmFyICRsaW5lID0gJChsaW5lKTtcbi8vICAgICB2YXIgZWxCb3R0b20gPSAkbGluZS5vZmZzZXQoKS50b3AgKyAkbGluZS5oZWlnaHQoKSArICh3aW5kb3dIZWlnaHQgLyA0KTtcblxuLy8gICAgIGlmIChlbEJvdHRvbSA8IHZpZXdwb3J0Qm90dG9tKSB7XG4vLyAgICAgICAkbGluZS5jc3MoXCJvcGFjaXR5XCIsIDEpO1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyB9XG5cbi8vICQod2luZG93KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbiAoZSkge1xuXG4vLyAgIGlmIChmYXEuZGF0YShcInN0eWxlXCIpID09PSBcImlyY1wiKSB7XG4vLyAgICAgY2hlY2tMaW5lcygpO1xuLy8gICB9XG5cbi8vIH0pO1xuXG4vLyB2YXIgZmFxdGV4dCA9IHtcbi8vICAgaXJjOiBcImJvcmluZyBmYXFcIixcbi8vICAgbm9ybWFsOiBcImlyYyBmYXFcIlxuLy8gfTtcblxuLy8gZnVuY3Rpb24gdG9nZ2xlRmFxU3R5bGUoY3VycmVudCwgYnV0dG9uKSB7XG4vLyAgIHZhciBidG4gPSBidXR0b24uZmluZChcInNwYW5cIik7XG4vLyAgIGlmIChjdXJyZW50ID09PSBcImlyY1wiKSB7XG4vLyAgICAgZmFxLmF0dHIoXCJkYXRhLXN0eWxlXCIsIFwibm9ybWFsXCIpLmRhdGEoXCJzdHlsZVwiLCBcIm5vcm1hbFwiKTtcbi8vICAgICBsaW5lcy5jc3MoXCJvcGFjaXR5XCIsIDEpO1xuLy8gICAgIGJ0bi50ZXh0KGZhcXRleHQubm9ybWFsKTtcbi8vICAgfSBlbHNlIHtcbi8vICAgICBmYXEuYXR0cihcImRhdGEtc3R5bGVcIiwgXCJpcmNcIikuZGF0YShcInN0eWxlXCIsIFwiaXJjXCIpO1xuLy8gICAgIGxpbmVzLmNzcyhcIm9wYWNpdHlcIiwgMCk7XG4vLyAgICAgYnRuLnRleHQoZmFxdGV4dC5pcmMpO1xuLy8gICAgIGNoZWNrTGluZXMoKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBmYXEuZmluZChcImJ1dHRvbi50b2dnbGVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuLy8gICB0b2dnbGVGYXFTdHlsZShmYXEuZGF0YShcInN0eWxlXCIpLCAkKHRoaXMpKTtcbi8vIH0pO1xuXG4vLyAkKFwiYS5odWhcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuXG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuLy8gICB2YXIgdGFyZ2V0ID0gJChcImFbbmFtZT0nXCIgKyB0aGlzLmhyZWYuc3BsaXQoXCIjXCIpLnBvcCgpICsgXCInXVwiKTtcbi8vICAgJChcImJvZHlcIikuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcCB9LCAxNTAwKTtcblxuLy8gfSk7XG4iXX0=
