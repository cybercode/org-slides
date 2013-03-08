/*!
  Deck JS - deck.onepage
  Copyright (c) 2013 Rick Frankel
  Dual licensed under the MIT license and GPL license.
  https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
  https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt

  This extension will toggle displaying the deck as a single
  scrollable page when the 'o' (oh) key is pressed.

  It does this by disabling the core stylesheet by setting the media
  to 'not(screen,projection)' and adding and removing the
  'deck-onepage' attribute to the deck container.
*/

(function($, deck, undefined) {
    var $d        = $(document);
    var $deck     = $[deck];
    var $sheet    = $('link[href$="deck.core.css"]');
    var $media    = $sheet.attr('media') || "";
    var $options; // set in init below

    $.extend(true, $deck.defaults, {
        classes:  { onepage: 'deck-onepage' },
        keys:     { onepage: 79 /* o */ }
    });
    $deck('extend', 'toggleOnePage', function() {
        var wrapper  = $deck('getContainer');
        var cls      = $options.classes.onepage;
        var media    = 'not(screen,projection)';

        if(wrapper.hasClass(cls)) {
            wrapper.removeClass(cls);
            media = $media;
        } else wrapper.addClass(cls);

        $sheet.attr('media', media);
    });
    $d.bind('deck.init', function() {
        $options = $deck('getOptions');
        /* Bind key events use keyup so modifier is included to avoid
         * trapping ctrl-o (open).
         */
        $d.unbind('keyup.deckOnePage').bind(
            'keyup.deckOnePage', function(e) {
                if (!e.modifiers && e.which === $options.keys.onepage) {
                    $deck('toggleOnePage');
                    e.preventDefault();
                }
            });
    });
})(jQuery, 'deck');
