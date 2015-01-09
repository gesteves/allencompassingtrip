'use strict';

var AET = AET || {};

AET.Tags = (function ($) {
  var opts = {
    tags : $('a[rel=tag]'),
    articles : $('article')
  };

  var hideDefaultTags = function () {
    opts.tags.each(function() {
      var tag = $(this);
      var tags = /(photography|washington dc)/gi;
      if (tag.text().match(tags)) {
        tag.remove();
      }
    });
  };
   
  var setUpMachineTags = function () {
    opts.articles.each(function() {
      var article = $(this),
          camera = article.find('.m-exif__camera'),
          tags = article.find('a[rel=tag]'),
          film = '',
          lens = '',
          tag, text;
      tags.each(function () {
        tag = $(this);
        if (tag.text().match(/^film:name/)) {
          text = tag.text().substring(tag.text().indexOf('=') + 1);
          film = '<span class="m-exif__film">' + text + '</span>';
          tag.remove();
        }
        if (tag.text().match(/^lens:model/)) {
          text = tag.text().substring(tag.text().indexOf('=') + 1);
          lens = '<span class="m-exif__lens">' + text + '</span>';
          tag.remove();
        }
      });
      camera.after(film).after(lens);
    });
  };

  var init = function () {
    hideDefaultTags();
    setUpMachineTags();
  };

  return {
    init : init
  };
})(jQuery);

AET.Tags.init();