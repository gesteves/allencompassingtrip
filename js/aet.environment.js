/* global DocumentTouch */
'use strict';

var AET = AET || {};

AET.Environment = (function () {

  var _touch = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.msMaxTouchPoints > 0);

	return {
    touch : _touch
	};
})();