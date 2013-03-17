 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			eventObserver = new EventObserver(),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawingService = new DrawingService(graphicsDevice, Draw2D);

		eventObserver.subscribe('loadComplete', loadComplete);
		//eventObserver.subscribe('spriteLoaded', spriteLoaded);

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, eventObserver);
		turbulenzGame.load(loadComplete);	

		//function spriteLoaded(sprite) {
		//	drawingService.draw([0.3,0.3,0.3,1], [sprite.sprite]);		
		//}
	};

	function loadComplete() {
		//TurbulenzEngine.setInterval(starter.update, 1000 / 60);
		//console.log("loading complete.");
	}	
}());