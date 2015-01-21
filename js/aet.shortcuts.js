'use strict';

var AET = AET || {};

AET.Shortcuts = (function ($) {

  var opts = {
    older_page : $('.m-pagination a[rel=prev]'),
    newer_page : $('.m-pagination a[rel=next]')
  };

  var $document = $(document);

  var init = function () {
    $document.on('keydown', navigate);
  };

  var navigate = function (e) {
    var key = e.keyCode || e.which;
    var keys = {
      left  : 37,
      right : 39,
      up    : 38,
      down  : 40,
      j     : 74,
      k     : 75,
      r     : 82
    };
    switch (key) {
      case keys.left:
      case keys.j:
        newerPage();
        break;
      case keys.right:
      case keys.k:
        olderPage();
        break;
      case keys.r:
        randomPost();
        break;
    }
  };

  var newerPage = function () {
    if (opts.newer_page.length && !$('input, textarea').is(':focus')) {
      window.location.href = opts.newer_page.attr('href');
    }
  };

  var olderPage = function () {
    if (opts.older_page.length && !$('input, textarea').is(':focus')) {
      window.location.href = opts.older_page.attr('href');
    }
  };

  var randomPost = function () {
    if (!$('input, textarea').is(':focus')) {
      window.location.href = window.location.origin + '/random';
    }
  };

  return {
    init : init
  };
})(jQuery);

AET.Shortcuts.init();