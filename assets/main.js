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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qcmhvZGVzL3BlcnNvbmFsL2JhbHRpbW9yZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2pyaG9kZXMvcGVyc29uYWwvYmFsdGltb3JlL3NyYy9qcy9mYWtlXzY0ZmNhYWQzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gdmFyICQgPSByZXF1aXJlKFwiLi92ZW5kb3IvanF1ZXJ5XCIpO1xuXG4vLyB2YXIgZmFxID0gJChcIi5mYXFcIik7XG4vLyB2YXIgbGluZXMgPSBmYXEuY2hpbGRyZW4oXCJwXCIpO1xuLy8gdmFyIGN1cnJlbnQgPSAwO1xuXG4vLyBsaW5lcy5jc3MoXCJvcGFjaXR5XCIsIDApO1xuXG4vLyBmdW5jdGlvbiBjaGVja0xpbmVzKG9mZnNldCwgaGVpZ2h0KSB7XG4vLyAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4vLyAgIHZhciB2aWV3cG9ydEJvdHRvbSA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArIHdpbmRvd0hlaWdodDtcbi8vICAgbGluZXMuZWFjaChmdW5jdGlvbiAoaSwgbGluZSkge1xuLy8gICAgIHZhciAkbGluZSA9ICQobGluZSk7XG4vLyAgICAgdmFyIGVsQm90dG9tID0gJGxpbmUub2Zmc2V0KCkudG9wICsgJGxpbmUuaGVpZ2h0KCkgKyAod2luZG93SGVpZ2h0IC8gNCk7XG5cbi8vICAgICBpZiAoZWxCb3R0b20gPCB2aWV3cG9ydEJvdHRvbSkge1xuLy8gICAgICAgJGxpbmUuY3NzKFwib3BhY2l0eVwiLCAxKTtcbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKGUpIHtcblxuLy8gICBpZiAoZmFxLmRhdGEoXCJzdHlsZVwiKSA9PT0gXCJpcmNcIikge1xuLy8gICAgIGNoZWNrTGluZXMoKTtcbi8vICAgfVxuXG4vLyB9KTtcblxuLy8gdmFyIGZhcXRleHQgPSB7XG4vLyAgIGlyYzogXCJib3JpbmcgZmFxXCIsXG4vLyAgIG5vcm1hbDogXCJpcmMgZmFxXCJcbi8vIH07XG5cbi8vIGZ1bmN0aW9uIHRvZ2dsZUZhcVN0eWxlKGN1cnJlbnQsIGJ1dHRvbikge1xuLy8gICB2YXIgYnRuID0gYnV0dG9uLmZpbmQoXCJzcGFuXCIpO1xuLy8gICBpZiAoY3VycmVudCA9PT0gXCJpcmNcIikge1xuLy8gICAgIGZhcS5hdHRyKFwiZGF0YS1zdHlsZVwiLCBcIm5vcm1hbFwiKS5kYXRhKFwic3R5bGVcIiwgXCJub3JtYWxcIik7XG4vLyAgICAgbGluZXMuY3NzKFwib3BhY2l0eVwiLCAxKTtcbi8vICAgICBidG4udGV4dChmYXF0ZXh0Lm5vcm1hbCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgZmFxLmF0dHIoXCJkYXRhLXN0eWxlXCIsIFwiaXJjXCIpLmRhdGEoXCJzdHlsZVwiLCBcImlyY1wiKTtcbi8vICAgICBsaW5lcy5jc3MoXCJvcGFjaXR5XCIsIDApO1xuLy8gICAgIGJ0bi50ZXh0KGZhcXRleHQuaXJjKTtcbi8vICAgICBjaGVja0xpbmVzKCk7XG4vLyAgIH1cbi8vIH1cblxuLy8gZmFxLmZpbmQoXCJidXR0b24udG9nZ2xlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgdG9nZ2xlRmFxU3R5bGUoZmFxLmRhdGEoXCJzdHlsZVwiKSwgJCh0aGlzKSk7XG4vLyB9KTtcblxuLy8gJChcImEuaHVoXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcblxuLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbi8vICAgdmFyIHRhcmdldCA9ICQoXCJhW25hbWU9J1wiICsgdGhpcy5ocmVmLnNwbGl0KFwiI1wiKS5wb3AoKSArIFwiJ11cIik7XG4vLyAgICQoXCJib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgfSwgMTUwMCk7XG5cbi8vIH0pO1xuIl19
