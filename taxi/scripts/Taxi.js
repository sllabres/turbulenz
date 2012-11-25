/*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices,Canvas,Draw2D*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var spriteDrawing = new SpriteDrawing(TurbulenzEngine, Draw2D),
		requestHandler = RequestHandler.create({}),
		sprite;

    function update() {
    	spriteDrawing.draw([0.3,0.3,0.3,1], sprite);
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		spriteDrawing = null;		
		requestHandler = null;
		sprite = null;		
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

