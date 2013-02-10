 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() { 		
		requestHandler = RequestHandler.create({});
		graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
		draw2D = Draw2D.create({ graphicsDevice : graphicsDevice });
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		
		mappingTableLoader = new MappingTableLoader(requestHandler, TurbulenzServices, eventObserver);
		textureLoader = new TextureLoader(TextureManager, graphicsDevice, requestHandler);				
		backgroundSpriteFactory = new BackgroundSpriteFactory(Draw2DSprite, graphicsDevice);
		drawing = new Drawing(graphicsDevice, draw2D, eventObserver);

		var game = new Game(mappingTableLoader, textureLoader, backgroundSpriteFactory, drawing);

		game.load();
	};
}());