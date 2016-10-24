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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxERVZcXFdPUktTUEFDRVxcR0xFTlxcYmFsdGltb3JlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L0RFVi9XT1JLU1BBQ0UvR0xFTi9iYWx0aW1vcmUvc3JjL2pzL2Zha2VfOWRiY2YxNC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHZhciAkID0gcmVxdWlyZShcIi4vdmVuZG9yL2pxdWVyeVwiKTtcblxuLy8gdmFyIGZhcSA9ICQoXCIuZmFxXCIpO1xuLy8gdmFyIGxpbmVzID0gZmFxLmNoaWxkcmVuKFwicFwiKTtcbi8vIHZhciBjdXJyZW50ID0gMDtcblxuLy8gbGluZXMuY3NzKFwib3BhY2l0eVwiLCAwKTtcblxuLy8gZnVuY3Rpb24gY2hlY2tMaW5lcyhvZmZzZXQsIGhlaWdodCkge1xuLy8gICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuLy8gICB2YXIgdmlld3BvcnRCb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyB3aW5kb3dIZWlnaHQ7XG4vLyAgIGxpbmVzLmVhY2goZnVuY3Rpb24gKGksIGxpbmUpIHtcbi8vICAgICB2YXIgJGxpbmUgPSAkKGxpbmUpO1xuLy8gICAgIHZhciBlbEJvdHRvbSA9ICRsaW5lLm9mZnNldCgpLnRvcCArICRsaW5lLmhlaWdodCgpICsgKHdpbmRvd0hlaWdodCAvIDQpO1xuXG4vLyAgICAgaWYgKGVsQm90dG9tIDwgdmlld3BvcnRCb3R0b20pIHtcbi8vICAgICAgICRsaW5lLmNzcyhcIm9wYWNpdHlcIiwgMSk7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vIH1cblxuLy8gJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uIChlKSB7XG5cbi8vICAgaWYgKGZhcS5kYXRhKFwic3R5bGVcIikgPT09IFwiaXJjXCIpIHtcbi8vICAgICBjaGVja0xpbmVzKCk7XG4vLyAgIH1cblxuLy8gfSk7XG5cbi8vIHZhciBmYXF0ZXh0ID0ge1xuLy8gICBpcmM6IFwiYm9yaW5nIGZhcVwiLFxuLy8gICBub3JtYWw6IFwiaXJjIGZhcVwiXG4vLyB9O1xuXG4vLyBmdW5jdGlvbiB0b2dnbGVGYXFTdHlsZShjdXJyZW50LCBidXR0b24pIHtcbi8vICAgdmFyIGJ0biA9IGJ1dHRvbi5maW5kKFwic3BhblwiKTtcbi8vICAgaWYgKGN1cnJlbnQgPT09IFwiaXJjXCIpIHtcbi8vICAgICBmYXEuYXR0cihcImRhdGEtc3R5bGVcIiwgXCJub3JtYWxcIikuZGF0YShcInN0eWxlXCIsIFwibm9ybWFsXCIpO1xuLy8gICAgIGxpbmVzLmNzcyhcIm9wYWNpdHlcIiwgMSk7XG4vLyAgICAgYnRuLnRleHQoZmFxdGV4dC5ub3JtYWwpO1xuLy8gICB9IGVsc2Uge1xuLy8gICAgIGZhcS5hdHRyKFwiZGF0YS1zdHlsZVwiLCBcImlyY1wiKS5kYXRhKFwic3R5bGVcIiwgXCJpcmNcIik7XG4vLyAgICAgbGluZXMuY3NzKFwib3BhY2l0eVwiLCAwKTtcbi8vICAgICBidG4udGV4dChmYXF0ZXh0LmlyYyk7XG4vLyAgICAgY2hlY2tMaW5lcygpO1xuLy8gICB9XG4vLyB9XG5cbi8vIGZhcS5maW5kKFwiYnV0dG9uLnRvZ2dsZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4vLyAgIHRvZ2dsZUZhcVN0eWxlKGZhcS5kYXRhKFwic3R5bGVcIiksICQodGhpcykpO1xuLy8gfSk7XG5cbi8vICQoXCJhLmh1aFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG5cbi8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4vLyAgIHZhciB0YXJnZXQgPSAkKFwiYVtuYW1lPSdcIiArIHRoaXMuaHJlZi5zcGxpdChcIiNcIikucG9wKCkgKyBcIiddXCIpO1xuLy8gICAkKFwiYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIH0sIDE1MDApO1xuXG4vLyB9KTtcbiJdfQ==
