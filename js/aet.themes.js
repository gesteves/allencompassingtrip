'use strict';

var AET = AET || {};

AET.Themes = (function ($) {
  var opts = {
    toggle : $('.js-theme-toggle')
  };

  var $html = $('html');

  var toggleTheme = function () {
    $html.toggleClass('theme-light theme-dark');
    if ($html.hasClass('theme-light')) {
      $.cookie('theme', 'theme-light', { path: '/'});
    } else {
      $.cookie('theme', 'theme-dark', { path: '/'});
    }
    return false;
  };

  var init = function () {
    var theme = $.cookie('theme');
    opts.toggle.on('click', toggleTheme);

    if (typeof theme !== 'undefined') {
      $html.removeClass('theme-light theme-dark').addClass(theme);
    }
  };

  return {
    init : init
  };
})(jQuery);

AET.Themes.init();