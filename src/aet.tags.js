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
      var tags = /(photography|washington)/gi;
      if (tag.text().match(tags)) {
        tag.remove();
      }
    });
  };
   
  var setUpMachineTags = function () {
    opts.articles.each(function() {
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
  };

	var init = function () {
		hideDefaultTags();
		setUpMachineTags();
	};

	return {
		init : init
	};
})(jQuery).init();