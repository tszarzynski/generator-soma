(function(<%= packageName %>) {

	'use strict';

	var <%= className %> = function(template, dispatcher) {

		// listen to a custom event to render the footer view
		dispatcher.addEventListener(heapsoffruit.RENDER, function() {

			template.render();
		});
	};

	<%= packageName %>.<%= className %> = <%= className %>;

})(window.<%= packageName %> = window.<%= packageName %> || {});
