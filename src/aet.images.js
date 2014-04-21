'use strict';

var AET = AET || {};

AET.Images = (function ($) {
	var opts = {
		photos : $('img.main-photo'),
		lazyLoadWidth : 300
	};

	var $window = $(window);

	var setImageHeight = function () {
    var height = $window.height() - 10;
    opts.photos.css({ 'max-height' : height + 'px'});
   };
   
   var setUpLazyLoad = function () {
    var small, photo;
    
    if ($window.width() <= opts.lazyLoadWidth) {
      opts.photos.each(function () {
        photo = $(this);
        small = photo.attr('data-small');
        photo.attr('data-original', small);
      }); 
    }
    opts.photos.show().lazyload({
      threshold : 600,
      effect : 'fadeIn'
    });
  };

	var init = function () {
		setUpLazyLoad();
		$window.on('resize', _.throttle(setImageHeight, 100)).trigger('resize');
	};

	return {
		init : init
	};
})(jQuery).init();