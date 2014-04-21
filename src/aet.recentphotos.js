'use strict';

var AET = AET || {};

AET.RecentPhotos = (function ($) {

  var opts = {
    container : $('.more-photos')
  };

  var fetch = function () {
    var url = 'http://api.tumblr.com/v2/blog/allencompassingtrip.com/posts/photo?api_key=DDyXPSYkUDkug5nJIovuLBDMpwSY3MHBS5aIT8NgZrpR7E9hB9&filter=text&jsonp=AET.RecentPhotos.build';
    var script, s;
    
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
  };

  var build = function (json) {
    var template = $('#photo-template').html();
    opts.container.html(_.template(template, { photos : json.response.posts })).fadeIn(100);
  };

	var init = function () {
		if (opts.container.length > 0) {
      fetch();
    }
	};

	return {
		init : init,
    build : build
	};

})(jQuery).init();