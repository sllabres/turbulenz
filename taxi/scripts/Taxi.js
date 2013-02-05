 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	var turbulenzGameLoader = new TurbulenzGameLoader(RequestHandler, TurbulenzEngine, TurbulenzServices);		
	TurbulenzEngine.onload = function onload() {
		//	turbulenzGameLoader.load();
	};
}());