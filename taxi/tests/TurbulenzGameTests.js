/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game")
	test("When onload Then create RequestHandler with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandler = { create : function(parameters) { passedParameters = parameters; } },
			turbulenzGame = new TurbulenzGame(requestHandler);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});
}());

function TurbulenzGame(requestHandlerFactory) {
	"use strict";
	var requestHandler = {};

	function load() {
		requestHandler = requestHandlerFactory.create({});
	}

	return { load : load };
}