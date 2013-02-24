 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawing = new Drawing(graphicsDevice, Draw2D),
			loadingScreen = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler);

		loadingScreen.show();
	};	
}());