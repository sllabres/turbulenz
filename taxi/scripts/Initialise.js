 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			eventObserver = new EventObserver(),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawingService = new DrawingService(graphicsDevice, Draw2D, new SpriteRepository(eventObserver)),
			game = new Game(drawingService, { height: graphicsDevice.height, width : graphicsDevice.width });

		eventObserver.subscribe('loadComplete', loadComplete);

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, eventObserver);
		turbulenzGame.load();

		function loadComplete() {
			TurbulenzEngine.setInterval(game.update, 1000 / 60);			
		}
	};		
}());