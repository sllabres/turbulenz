/*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
(function() {
	TurbulenzEngine.onload = function onload() {
	    "use strict";
	    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
	    	spriteDrawing = new SpriteDrawing(Draw2D, graphicsDevice),
			requestHandler = RequestHandler.create({}),
			game = new Game(spriteDrawing),
			backgroundColour = [0.3,0.3,0.3,1],
			sprite,
			phys2D = Physics2DDevice.create(),
			world = phys2D.createWorld({ gravity : [0, 20] });

	    function update() {
	    	spriteDrawing.draw(backgroundColour, sprite);
	    }

	    TurbulenzEngine.onunload = function gameOnunload() {
			spriteDrawing = null;		
			requestHandler = null;
			sprite = null;	
			graphicsDevice = null;
			game = null;
		};

		function sessionCreated(gameSession) {
			TurbulenzServices.createMappingTable(requestHandler,
				gameSession,
				function (table) {
					graphicsDevice.createTexture({ src : table.getURL("textures/Sky512.jpg"),
						mipmaps : true,
						onload : function (texture) {
							sprite = Draw2DSprite.create({
							x : 512,
							y : 256,
							texture : texture						
							});
							TurbulenzEngine.setInterval(update, 1000 / 60);
						}					
					});
				});
		}

		TurbulenzServices.createGameSession(requestHandler, sessionCreated);    
	};
}());