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
			backgroundColour = [0.3,0.3,0.3,1],
			background,
			taxi,
			pysicsDebug = Physics2DDebugDraw.create({
 				graphicsDevice : graphicsDevice
 			}),
 			stageWidth = 1024,
 			stageHeight = 768,
 			physics2D = Physics2DDevice.create(),
 			world = physics2D.createWorld({
				gravity : [0, 10]
			}),
			heavyMaterial = physics2D.createMaterial({
				density : 3
			}),
			taxiShape = physics2D.createPolygonShape({
				vertices : phys2D.createBoxVertices(64, 32),
				material : heavyMaterial
			});

 			drawing2d.configure({
				viewportRectangle : [0, 0, stageWidth, stageHeight],
				scaleMode : 'scale'
			});

	    function update() {
		    spriteRendering.addSprite(background);
		    spriteRendering.addSprite(taxi);    	
		    rendering.render(backgroundColour);		    
	    }

	    TurbulenzEngine.onunload = function gameOnunload() {
			drawing2d = null;		
			requestHandler = null;
			background = null;	
			taxi = null;	
			graphicsDevice = null;
			pysicsDebug = null;
			physics2D = null;
			world = null;
			rendering = null;
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