(function(<%= packageName %>) {

	'use strict';

	var <%= className %> = function(dispatcher) {

		this.execute = function(e) {

		};
	};

	<%= packageName %>.<%= className %> = <%= className %>;

})(window.<%= packageName %> = window.<%= packageName %> || {});