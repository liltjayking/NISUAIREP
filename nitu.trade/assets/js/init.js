(function ($) {
  'use strict';
  var NituPreloader = false;
  var NituTime = new Date();
//  var NituCounter = 0;
  var Nitu = {
    init: function () {
      this.preloader();
      this.ready();
      this.imgToSvg();
      this.headerMove();
      this.rightNavOpener();
      this.animatedText();
      this.slickSlider();
    },
    preloader: function () {
      if (NituPreloader) {
        return false;
      }
      NituPreloader = true;
      var date2 = new Date();
      var difference = date2 - NituTime;
      var waitTime = 1500;
      if (difference < waitTime) {
        waitTime -= difference;
      } else {
        waitTime = 0;
      }
      setTimeout(function () {
        $('.preloader').addClass('ready');
      }, waitTime);
    },
    ready: function () {
      $(".rightnav, .rightnav_closer").removeClass("ready")
    },
    rightNavOpener: function () {
      var rightNav = $('.rightnav');
      var closer = $('.rightnav_closer,.rightnav .closer');
      $('.mobnav .trigger').on('click', function () {
        rightNav.addClass('active');
        closer.addClass('active');

        return false;
      });
      closer.on('click', function () {
        rightNav.removeClass('active');
        closer.removeClass('active');

        return false;
      });
    },
    headerMove: function () {
//      $("#navbar").addClass("show");
      var header = $(".header");
      var top = 0;
      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > top) {
          header.removeClass("done");
        } else {
          header.addClass("done");
        }
        top = scrollTop;
      });
    },
    headerFixer: function () {
      var body = $('body');
      var header = $('.header');
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 10) {
        header.addClass('active');
      } else {
        header.removeClass('active');
      }
      if (scrollTop > 300) {
        body.addClass('totop-active');
      } else {
        body.removeClass('totop-active');
      }
    },
    imgToSvg: function () {
      $("img.nitu_fn_svg").each(function () {
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function (data) {
          var $svg = $(data).find('svg');
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          $img.replaceWith($svg);
        }, 'xml');
      });
    },
    animatedText: function () {
      var t = $("body");
      $(".animated_text").each(function () {
        var el = $(this), split = el.text().split(" ");
        el.addClass("ready");
        var color = el.data("color");
        color && void 0 !== color || (color = "");
        var _word = color.replace(/[^a-zA-Z0-9]/g, "_"), o = el.data("to-color");
        o && void 0 !== o || (o = "var(--primary-bg-color)");
        var r = "", l = 0;
        el.waypoint({
          handler: function () {
            if (!el.hasClass("stop")) {
              el.addClass("stop"), el.text("");
              var c = "";
              $.each(split, function (t, n) {
                r = "", $.each(n.split(""), function (e, t) {
                  r += '<span class="letter" style="animation: NituLetterAnimation' + _word + " .5s " + .03 * l + 's  forwards">' + t + "</span>", l++
                }), c += '<span class="word">' + r + "</span>&nbsp"
              }), t.append("<style>@keyframes NituLetterAnimation" + _word + " { 60% {transform: translate(20px, 0) scale(1); color: " + color + ";} 80% {transform: translate(20px, 0) scale(1); color: " + color + ";} 99% {transform: translate(0) scale(1.2);color: " + o + ";} 100% {transform: translate(0) scale(1); opacity: 1; color: " + color + ';} }.fn_animated_text[data-color="' + color + '"],.desc[data-color="' + color + '"],.fn_animated_text[data-color="' + color + '"] .letter{color: ' + color + ";}</style>"), setTimeout(function () {
                el.addClass("done")
              }, 500 + 30 * l), el.html(c)
            }
          },
          offset: "90%"
        })
      })
    },
    slickSlider: function(){
//      var Mobile = window.matchMedia("(max-width: 1100px)");
      if (jQuery(".slick-slider").length) {
        $('.slick-slider').slick({
          autoplay: true,
          autoplaySpeed: 3000,
          arrows:false,
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
//          prevArrow: '<div class="text-center slide-arrow"><i class="fa-solid fa-caret-up tx-22 text-purple"></i></div>',
//          nextArrow: '<div class="text-center slide-arrow"><i class="fa-solid fa-caret-down tx-22 text-purple"></i></div>'
        });
      }
    }
  };
  $(document).ready(function () {
    Nitu.init();
  });
  // RESIZE Functions
  $(window).on('resize', function () {
    Nitu.slickSlider();
  });
  $(window).on('load', function () {
    Nitu.preloader();
//    Nitu.isotope();
//    Nitu.isotopeCollection();
//    setTimeout(function () {
//      Nitu.isotope();
//      Nitu.isotopeCollection();
//    }, 200);
  });

  $(window).on('scroll', function () {
    Nitu.headerFixer();
  });

  window.addEventListener("load", function () {
    Nitu.preloader();
  });
})(jQuery);
