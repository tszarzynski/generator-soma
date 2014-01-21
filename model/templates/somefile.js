(function(<%= packageName %>) {

	'use strict';

	var <%= className %> = function(dispatcher) { };

	<%= packageName %>.<%= className %> = <%= className %>;

})(window.<%= packageName %> = window.<%= packageName %> || {});
