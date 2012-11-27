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
			inputDevice = TurbulenzEngine.createInputDevice({}),
			keyCodes = inputDevice.keyCodes,
			pysicsDebug = Physics2DDebugDraw.create({
 				graphicsDevice : graphicsDevice
 			}),
 			stageWidth = 1024,
 			stageHeight = 768,
 			physics2D = Physics2DDevice.create(),
 			world = physics2D.createWorld({
				gravity : [0, 20]
			}),
			heavyMaterial = physics2D.createMaterial({
				density : 3
			}),
			taxiShape = physics2D.createPolygonShape({
				vertices : physics2D.createBoxVertices(64, 32),
				material : heavyMaterial
			}),
			body = physics2D.createRigidBody({
				shapes : [taxiShape.clone()],
				position : [ 50, 20 ]
			}),
			realTime = 0,
			prevTime = TurbulenzEngine.time;
			world.clear();
			world.addRigidBody(body);

 			drawing2d.configure({ viewportRectangle : [0, 0, stageWidth, stageHeight] });
			border = physics2D.createRigidBody({
				type : 'static',
				shapes : [
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, 0, 0.01, stageHeight)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, 0, stageWidth, 0.01)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices((stageWidth - 0.01), 0, stageWidth, stageHeight)
					}),
					physics2D.createPolygonShape({
						vertices : physics2D.createRectangleVertices(0, (stageHeight - 0.01), stageWidth, stageHeight)
					})
				]
			});
			world.addRigidBody(border);

			pysicsDebug.setPhysics2DViewport([0, 0, stageWidth, stageHeight]);

	    function update() {
		    spriteRendering.addSprite(background);		    

		    var curTime = TurbulenzEngine.time;
		    var timeDelta = (curTime - prevTime);
		    if (timeDelta > (1 / 20)) {
		    	timeDelta = (1 / 20);
		    }

			realTime += timeDelta;
			prevTime = curTime;

		    while (world.simulatedTime < realTime) {
		    	world.step(1 / 60);
		    }

		    if(!!taxi) {
			    var body = world.rigidBodies[0],
			    	pos = [];
			    body.getPosition(pos);

			    taxi.x = pos[0];
			    taxi.y = pos[1];
			}

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
							origin: [0,0],
							texture : texture						
							});							
						}
					});

					graphicsDevice.createTexture({ src : table.getURL("textures/taxi.png"),
						mipmaps : true,
						onload : function (texture) {
							taxi = Draw2DSprite.create({
							x : 50,
							y : 20,
							texture : texture						
							});
						}
					});
				});
		}

		inputDevice.addEventListener('keyup', onKeyUp);
		TurbulenzServices.createGameSession(requestHandler, sessionCreated);
		TurbulenzEngine.setInterval(update, 1000 / 60);

		var onKeyUp = function onKeyUpFn(keynum) {
			if (keynum === keyCodes.W) {				
				body.setForce(1);
				console.log("W");
			}

			/*if (keynum === keyCodes.D) {				
			}

			if (keynum === keyCodes.A) {				
			}*/
		};		
	};
}());