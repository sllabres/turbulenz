 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	var ASSET_COUNT = 3;
	TurbulenzEngine.onload = function onload() {
		var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			loadingScreen = new LoadingScreenService(graphicsDevice, mathDevice);

		loadingScreen.show();

	};	
}());