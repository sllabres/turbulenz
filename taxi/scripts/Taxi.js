/*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
(function() {
	TurbulenzEngine.onload = function onload() {
	    "use strict";
	    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
	    	drawing2d = Draw2D.create({ graphicsDevice : graphicsDevice }),
	    	spriteRendering = new SpriteRendering(drawing2d, graphicsDevice),
	    	rendering = new Rendering(drawing2d, graphicsDevice, spriteRendering),
			requestHandler = RequestHandler.create({}),
			game = new Game(spriteRendering),
			backgroundColour = [0.3,0.3,0.3,1],
			background,
			taxi;

	    function update() {
	    	if(!!background && !!taxi) {
		    	spriteRendering.addSprite(background);
		    	spriteRendering.addSprite(taxi);
	    	}

	    	rendering.render();	    	
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
							background = Draw2DSprite.create({
							x : 512,
							y : 256,
							texture : texture						
							});							
						}
					});

					graphicsDevice.createTexture({ src : table.getURL("textures/taxi.png"),
						mipmaps : true,
						onload : function (texture) {
							taxi = Draw2DSprite.create({
							x : 50,
							y : 50,
							texture : texture						
							});
						}
					});
				});
		}

		TurbulenzServices.createGameSession(requestHandler, sessionCreated);
		TurbulenzEngine.setInterval(update, 1000 / 60);
	};
}());