'use strict';

var AET = AET || {};

AET.ImageZoom = (function ($) {
  var opts = {
    toggle          : $('.js-image-zoom'),
    zoomable_class  : 'is-zoomable',
    zoom_class      : 'fit-window',
    permalink_class : 'is-permalink'
  };

  var $html = $('html');
  var $window = $(window);

  var toggleZoom = function () {
    var $link = $(this);
    $link.toggleClass(opts.zoom_class);
    return false;
  };

  var init = function () {
    opts.toggle.each(function () {
      var $link = $(this);
      var $image = $link.find('img').first();
      var width = parseInt($image.data('width'), 10);
      var height = parseInt($image.data('height'), 10);
      if ($html.hasClass(opts.permalink_class) && width <= $window.width() && height > $window.height()) {
       $link.addClass(opts.zoomable_class);
      }
    });
    $('.' + opts.zoomable_class).on('click', toggleZoom);
  };

  return {
    init : init
  };
})(jQuery);

AET.ImageZoom.init();