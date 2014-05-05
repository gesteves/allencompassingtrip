'use strict';

var AET = AET || {};

AET.Images = (function ($) {
	var opts = {
		photos : $('img.main-photo'),
	};

	var $window = $(window);

	var setImageHeight = function () {
    var height = $window.height();
    opts.photos.css({ 'max-height' : height + 'px'});
   };

	var init = function () {
		$window.on('resize', _.throttle(setImageHeight, 100)).trigger('resize');
	};

	return {
		init : init
	};
})(jQuery);

AET.Images.init();