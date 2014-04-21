'use strict';

var AET = AET || {};

AET.App = (function () {

	var initAnalytics = function () {
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', 'UA-250261-30']);
    window._gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  };

	var init = function () {
		initAnalytics();
	};

	return {
		init : init
	};
})().init();