/*
 * Unobfuscate: jQuery plugin by Bohdan Ganicky
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Changes obfuscated email addresses to normal email links.
 *
 * @name            Unobfuscate
 * @version         1.0
 * @author          Bohdan Ganicky
 * @requires        jQuery http://jquery.com/
 * @param atstring  String to be changed to '@' sign. (default: '[at-sign]')
 * @param dotstring String to be changed to '.' sign. (default: '[dot-sign]')
 * @desc            Simple jQuery plugin for defuscating obfuscated email
 *                  addresses, changing them to normal 'mailto style' links.
 *                  Good to use when you don't have control over what's coming
 *                  from the server. Accepts various formats including links:
 *                  - <span>bob[at-sign]mail[dot-sign]xy</span>
 *                  - <a href="mailto:bob[at-sign]mail[dot-sign]xy">contact</a>
 *                  - <a href="mailto:bob[at-sign]mail[dot-sign]xy">bob[at-sign]m
 *                  ail[dot-sign]xy</a> etc.
 */

;(function($) {

	function gimmeMail(str, at, dot) {
		// simply return defuscated address, k thx bai
		return str.replace(at, '@', 'g').replace(dot, '.', 'g');
	}

	$.fn.unobfuscate = function(options) {
		// merge default and user-defined options
		var opts = $.extend({}, $.fn.unobfuscate.defaults, options);
		// remove already defuscated items from the set
		var that = this.not('.unobfuscated');

		return that.each(function() {
			var $this = $(this);
			var address = gimmeMail($this.text(), opts.atstring, opts.dotstring);

			// modify the text first
			$this.text(address);
			// if $this is link -> modify the href
			if ($this.is('a')) {
				$this.attr('href', gimmeMail($this.attr('href'), opts.atstring, opts.dotstring));
			}
			// if not -> create a link
			else {
				$this.html('<a href="mailto:' + address + '">' + address + '</a>');
			}
			// prevent future defuscation (for later calls on newly added elements)
			$this.addClass('unobfuscated');
		});
	};

	$.fn.unobfuscate.defaults = {
		atstring: '[at-sign]',
		dotstring: '[dot-sign]'
	};

})(jQuery);