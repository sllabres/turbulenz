/*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		requestHandler = RequestHandler.create({}),
		sprite;

    function update() {
		if(graphicsDevice.beginFrame()) {				
			drawing.setBackBuffer();		
			drawing.clear([0.3,0.3,0.3,1]);
			drawing.begin('alpha');
			drawing.drawSprite(sprite);
			drawing.end();
			graphicsDevice.endFrame();
		}
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;		
		drawing = null;		
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

