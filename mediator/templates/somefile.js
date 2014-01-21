(function(<%= packageName %>) {

	'use strict';

	var <%= className %> = function(dispatcher, target) { };

	<%= packageName %>.<%= className %> = <%= className %>;

})(window.<%= packageName %> = window.<%= packageName %> || {});
