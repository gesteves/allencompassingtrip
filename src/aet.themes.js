'use strict';

var AET = AET || {};

AET.Themes = (function ($) {
	var opts = {
		toggle : $('#toggle-theme')
	};

	var $html = $('html');

	var toggleTheme = function () {
    $html.toggleClass('light dark');
    if ($html.hasClass('light')) {
      $.cookie('theme', 'light', { path: '/'});
    } else {
      $.cookie('theme', 'dark', { path: '/'});
    }
    return false;
  };

	var init = function () {
		var theme = $.cookie('theme');
		opts.toggle.on('click', toggleTheme);

    if (typeof theme !== 'undefined') {
      $html.removeClass('light dark').addClass(theme);
    }
	};

	return {
		init : init
	};
})(jQuery);

AET.Themes.init();