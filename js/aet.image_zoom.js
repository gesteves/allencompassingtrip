'use strict';

var AET = AET || {};

AET.ImageZoom = (function ($) {
  var opts = {
    toggle          : $('.js-image-zoom'),
    zoomable_class  : 'is-zoomable',
    zoom_class      : 'fit-window',
    permalink_class : 'is-permalink'
  };

  var $window = $(window);

  var toggleZoom = function () {
    var $link = $(this);
    $link.toggleClass(opts.zoom_class);
    return false;
  };

  var init = function () {
    opts.toggle.each(function () {
      var $image = $(this);
      var width = parseInt($image.data('width'), 10);
      var height = parseInt($image.data('height'), 10);
      if (width <= $window.width() && height > $window.height()) {
       $image.addClass(opts.zoomable_class);
      }
    });
    $('.' + opts.zoomable_class).on('click', toggleZoom);
  };

  return {
    init : init
  };
})(jQuery);

AET.ImageZoom.init();