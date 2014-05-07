'use strict';

var AET = AET || {};

AET.Shortcuts = (function ($) {

  var opts = {
    older_page : $('.pagination a[rel=prev]'),
    newer_page : $('.pagination a[rel=next]')
  };

  var $document = $(document);

  var init = function () {
    $document.on('keydown', navigate);
  };

  var navigate = function (e) {
    var key = e.keyCode || e.which;
    var keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40,
      j: 74,
      k: 75
    };
    switch (key) {
      case keys.left:
        newerPage();
        break;
      case keys.right:
        olderPage();
        break;
    }
  };

  var newerPage = function () {
    if (opts.newer_page.length) {
      window.location.href = opts.newer_page.attr('href');
    }
  };

  var olderPage = function () {
    if (opts.older_page.length) {
      window.location.href = opts.older_page.attr('href');
    }
  };

  return {
    init : init
  };
})(jQuery);

AET.Shortcuts.init();