 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() { 				
		
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			draw2D = Draw2D.create({ graphicsDevice : graphicsDevice }),			
			eventObserver = new EventObserver(),
			mappingTableLoader = new MappingTableLoader(requestHandler, TurbulenzServices, eventObserver),
			textureLoader = new TextureLoader(TextureManager, graphicsDevice, requestHandler),
			backgroundSpriteFactory = new BackgroundSpriteFactory(Draw2DSprite, graphicsDevice),
			drawing = new Drawing(graphicsDevice, draw2D, eventObserver);

		
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		

		var game = new Game(mappingTableLoader, textureLoader, backgroundSpriteFactory, drawing);

		game.load();
	};
}());