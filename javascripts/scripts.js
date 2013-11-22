(function($) {
  $window = $(window);
  $document = $(document);

  methods = {
    init : function () {
      _dc.setUpTweetText();
      _dc.setUpLazyLoad();
      _dc.hideDefaultTags();
      _dc.setUpMachineTags();
      _dc.initFacebook();
      _dc.initTwitter();
      _dc.initGooglePlus();
      _dc.initAnalytics();
      _dc.initAppNet();
      _dc.fetchMorePhotos();

      $window.on('resize', _.throttle(_dc.setImageHeight, 100));
      $window.trigger('resize');
    }
  };

  _dc = {
    setImageHeight : function () {
      var photos = $('img.main-photo'),
          height;
      height = $window.height() * 0.95;
      photos.css({ 'max-height' : height + 'px'});
    },
    setUpTweetText : function () {
      $('article').each(function () {
        var article = $(this),
            description = article.find('.description');
            caption = description.find('.caption p').first().text();
            caption = caption.length > 100 ? caption.substring(0, 80) + '…' : caption
            tweet = article.find('.twitter-share-button');
            tweet.attr('data-text', caption);
      });
    },
    setUpLazyLoad : function () {
      var photos = $('img.main-photo'),
          small, photo;
      
      if ($window.width() <= 300) {
        photos.each(function () {
          photo = $(this);
          small = photo.attr('data-small');
          photo.attr('data-original', small);
        }); 
      }
      photos.show().lazyload({
        threshold : 600,
        effect : 'fadeIn'
      });
    },
    hideDefaultTags : function () {
      $('a[rel=tag]').each(function() {
        var tag = $(this);
        var tags = /(photography|washington)/gi;
        if (tag.text().match(tags)) {
          tag.parent().remove();
        }
      });
    },
    setUpMachineTags : function () {
      $('article').each(function() {
        var article = $(this),
            exif = article.find('.exif-camera'),
            tags = article.find('a[rel=tag]'),
            tag, text;
        tags.each(function () {
          tag = $(this);

          if (tag.text().match(/^film:name/)) {
            text = tag.text().substring(tag.text().indexOf('=') + 1);
            exif.after('<li class="exif-film">' + text + '</li>');
            tag.parent().remove();
          }
          if (tag.text().match(/^lens:model/)) {
            text = tag.text().substring(tag.text().indexOf('=') + 1);
            exif.after('<li class="exif-lens">' + text + '</li>');
            tag.parent().remove();
          }
        });
      });
    },
    initFacebook : function () {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '107491745959221', // App ID from the App Dashboard
          status     : true, // check the login status upon init?
          cookie     : true, // set sessions cookies to allow your server to access the session?
          xfbml      : true  // parse XFBML tags on this page?
        });


        FB.Event.subscribe('edge.create', function(targetUrl) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Facebook', 'Like', targetUrl]);
          window._gaq.push(['_trackEvent', 'Social', 'Facebook : Like', targetUrl]);
        });
        FB.Event.subscribe('edge.remove', function(targetUrl) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Facebook', 'Unlike', targetUrl]);
          window._gaq.push(['_trackEvent', 'Social', 'Facebook : Unlike', targetUrl]);
        });

      };

      (function(d, debug){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
         ref.parentNode.insertBefore(js, ref);
       }(document, /*debug*/ false));
    },
    initTwitter : function () {
      window.twttr = (function (d,s,id) {
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
        js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
        return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
      }(document, "script", "twitter-wjs"));

      twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function(event) {
          var url;
          window._gaq = window._gaq || [];
          if (event.target && event.target.nodeName == 'IFRAME') {
                url = _dc.extractParamFromUri(event.target.src, 'url');
          }
          window._gaq.push(['_trackSocial', 'Twitter', 'Tweet', url]);
          window._gaq.push(['_trackEvent', 'Social', 'Twitter : Tweet', url]);
        });
        twttr.events.bind('follow', function(event) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Twitter', 'Follow', '@' + event.data.screen_name]);
          window._gaq.push(['_trackEvent', 'Social', 'Twitter : Follow', '@' + event.data.screen_name]);
        });
      });
    },
    initAppNet : function () {
      (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='//d2zh9g63fcvyrq.cloudfront.net/adn.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'adn-button-js'));
    },
    initGooglePlus : function () {
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    },
    extractParamFromUri : function (uri, paramName) {
      if (!uri) {
        return;
      }
      var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
      var params = regex.exec(uri);
      if (params != null) {
        return unescape(params[1]);
      }
      return;
    },
    initAnalytics : function () {

      window._gaq = window._gaq || [];
      window._gaq.push(['_setAccount', 'UA-250261-30']);
      window._gaq.push(['_setSiteSpeedSampleRate', 100]);
      window._gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    },
    fetchMorePhotos : function () {
      var container = $('.more-photos'),
          url = 'http://api.tumblr.com/v2/blog/photo.gesteves.com/posts/photo?api_key=DDyXPSYkUDkug5nJIovuLBDMpwSY3MHBS5aIT8NgZrpR7E9hB9&filter=text&jsonp=_dc.buildMorePhotos',
          script, s;
      
      if (container.length > 0) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
      }
    },
    buildMorePhotos : function (json) {
      var url, caption, post_url,
          img, a,
          size = $window.width() <= 300 ? 4 : 3;
          container = $('.more-photos');
          photo_container = container.find('.photos');
      _.each(json.response.posts, function(post, index, list) {
          caption = post.caption;
          post_url = post.post_url;
          url = post.photos[0].alt_sizes[size].url;
          img = $('<img />').attr({ src : url, alt : caption});
          a = $('<a></a>').attr({ href : post_url, title : caption}).append(img);
          photo_container.append(a);
          container.fadeIn(100);
      });
    }
  };

  $.fn.dc = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist in DC plugin');
    }
  };

  $document.ready(function() {
    $document.dc();
  });

})(jQuery);

trackGooglePlus = function (json) {
  _gaq = _gaq || [];
  if (json.state === 'on') {
    _gaq.push(['_trackEvent', 'Social' , 'Google : +1', json.href]);
  } else {
    _gaq.push(['_trackEvent', 'Social' , 'Google : -1', json.href]);
  }
}