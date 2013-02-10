 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() { 		
		requestHandler = RequestHandler.create({});
		graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
		draw2D = Draw2D.create({ graphicsDevice : graphicsDevice });
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });
		var game = new Game(requestHandler, graphicsDevice, Draw2DSprite, TurbulenzServices, TextureManager, draw2D);
		game.load();
	};
}());