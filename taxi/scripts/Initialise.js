 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			eventObserver = new EventObserver(),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawingService = new DrawingService(graphicsDevice, Draw2D, new SpriteRepository(eventObserver));

		eventObserver.subscribe('loadComplete', loadComplete);

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, eventObserver);
		turbulenzGame.load();

		function loadComplete() {
			var sprite = new Sprite(graphicsDevice.height, graphicsDevice.width, "Sky.jpg");
			//TurbulenzEngine.setInterval(starter.update, 1000 / 60);
			drawingService.draw([0.3,0.3,0.3,1], [sprite]);
		}
	};

		
}());

function Sprite(height, width, name) {
	return { height : height, width : width, name : name };
}