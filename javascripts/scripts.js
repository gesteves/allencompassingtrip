(function($) {
  $window = $(window);
  $document = $(document);

  methods = {
    init : function () {
      _dc.setUpLazyLoad();
      _dc.hideDefaultTags();
      _dc.setUpMachineTags();
      _dc.initAnalytics();
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
          tag.remove();
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
            exif.after('<span class="exif-film">' + text + '</span>');
            tag.remove();
          }
          if (tag.text().match(/^lens:model/)) {
            text = tag.text().substring(tag.text().indexOf('=') + 1);
            exif.after('<span class="exif-lens">' + text + '</span>');
            tag.remove();
          }
        });
      });
    },
    initAnalytics : function () {

      window._gaq = window._gaq || [];
      window._gaq.push(['_setAccount', 'UA-250261-30']);
      window._gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    },
    fetchMorePhotos : function () {
      var container = $('.more-photos'),
          url = 'http://api.tumblr.com/v2/blog/allencompassingtrip.com/posts/photo?api_key=DDyXPSYkUDkug5nJIovuLBDMpwSY3MHBS5aIT8NgZrpR7E9hB9&filter=text&jsonp=_dc.buildMorePhotos',
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
      var template = $('#photo-template').html(),
          container = $('.more-photos');
      container.html(_.template(template, { photos : json.response.posts })).fadeIn(100);
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