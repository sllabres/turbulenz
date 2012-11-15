// Copyright (c) 2009-2012 Turbulenz Limited

/*global Observer: false*/
/*global TurbulenzEngine: false*/

"use strict";

/**
  @class  Shader manager
  @private

  @since TurbulenzEngine 0.1.0
*/
function ShaderManager() {}
ShaderManager.prototype =
{
    /**
      Version number
      @memberOf ShaderManager
      @constant
      @type number
    */
    version : 1
};

/**
  @constructs Constructs a ShaderManager object.

  @param {GraphicsDevice} gd Graphics device
  @param {RequestHandler} rh RequestHandler device
  @param {Shader} ds Default shader
  @param {Element} log Logging element

  @return {ShaderManager} object, null if failed
*/
ShaderManager.create = function shaderManagerCreateFn(gd, rh, ds, errorCallback, log)
{
    if (!errorCallback)
    {
        errorCallback = function (e) {};
    }

    var defaultShaderName = "default";

    var defaultShader;
    if (ds)
    {
        defaultShader = ds;
    }
    else
    {
        /*jshint white: false*/
        var shaderParams =
        {
            "version": 1,
            "name": "default.cgfx",
            "parameters":
            {
                "worldViewProjection":
                {
                    "type": "float",
                    "rows": 4,
                    "columns": 4
                },
                "diffuse":
                {
                    "type": "sampler2D"
                }
            },
            "techniques":
            {
                "textured3D":
                [
                    {
                        "parameters": ["worldViewProjection","diffuse"],
                        "semantics": ["POSITION","TEXCOORD0"],
                        "states":
                        {
                            "DepthTestEnable": true,
                            "DepthFunc": 515,
                            "DepthMask": true,
                            "CullFaceEnable": true,
                            "CullFace": 1029,
                            "BlendEnable": false
                        },
                        "programs": ["vp","fp"]
                    }
                ]
            },
            "programs":
            {
                "fp":
                {
                    "type": "fragment",
                    "code": "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nvarying vec4 tz_TexCoord[1];vec4 _ret_0;uniform sampler2D diffuse;void main()\n{_ret_0=texture2D(diffuse,tz_TexCoord[0].xy);gl_FragColor=_ret_0;}"
                },
                "vp":
                {
                    "type": "vertex",
                    "code": "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR8;attribute vec4 ATTR0;\nvec4 _OUTpos1;vec2 _OUTuv1;uniform vec4 worldViewProjection[4];void main()\n{_OUTpos1=ATTR0.xxxx*worldViewProjection[0]+ATTR0.yyyy*worldViewProjection[1]+ATTR0.zzzz*worldViewProjection[2]+worldViewProjection[3];_OUTuv1=ATTR8.xy;tz_TexCoord[0].xy=ATTR8.xy;gl_Position=_OUTpos1;}"
                }
            }
        };
        /*jshint white: true*/

        defaultShader = gd.createShader(shaderParams);
        if (!defaultShader)
        {
            errorCallback("Default shader not created.");
        }
    }

    var shaders = {};
    var loadingShader = {};
    var loadedObservers = {};
    var numLoadingShaders = 0;
    var pathRemapping = null;
    var pathPrefix = "";

    shaders[defaultShaderName] = defaultShader;

    /**
      Creates shader from an cgfx file

      @memberOf ShaderManager.prototype
      @public
      @function
      @name load

      @param {string} path Path to the cgfx file

      @return {Shader} object, returns the default shader if the file at given path is not yet loaded
    */
    function loadShaderFn(path, onShaderLoaded)
    {
        if (path === undefined)
        {
            errorCallback("Invalid texture path passed to ShaderManager.Load");
        }
        var shader = shaders[path];
        if (!shader)
        {
            if (!loadingShader[path])
            {
                loadingShader[path] = true;
                numLoadingShaders += 1;

                var observer = Observer.create();
                loadedObservers[path] = observer;
                if (onShaderLoaded)
                {
                    observer.subscribe(onShaderLoaded);
                }

                var shaderLoaded = function shaderLoadedFn(shaderText, status, callContext)
                {
                    if (shaderText)
                    {
                        var shaderParameters = JSON.parse(shaderText);
                        var s = gd.createShader(shaderParameters);
                        if (s)
                        {
                            shaders[path] = s;
                        }
                        else
                        {
                            delete shaders[path];
                        }

                        observer.notify(s);
                        delete loadedObservers[path];
                    }
                    else
                    {
                        if (log)
                        {
                            log.innerHTML += "ShaderManager.load:&nbsp;'" + path + "' failed to load<br>";
                        }
                        delete shaders[path];
                    }
                    delete loadingShader[path];

                    numLoadingShaders -= 1;
                };

                rh.request({
                    src: ((pathRemapping && pathRemapping[path]) || (pathPrefix + path)),
                    onload: shaderLoaded
                });
            }
            else if (onShaderLoaded)
            {
                loadedObservers[path].subscribe(onShaderLoaded);
            }

            return defaultShader;
        }
        else if (onShaderLoaded)
        {
            // the callback should always be called asynchronously
            TurbulenzEngine.setTimeout(function shaderAlreadyLoadedFn()
                {
                    onShaderLoaded(shader);
                }, 0);
        }

        return shader;
    }

    /**
      Alias one shader to another name

      @memberOf ShaderManager.prototype
      @public
      @function
      @name map

      @param {string} dst Name of the alias
      @param {string} src Name of the shader to be aliased
    */
    function mapShaderFn(dst, src)
    {
        shaders[dst] = shaders[src];
    }

    /**
      Get shader created from a given shader file or with the given name

      @memberOf ShaderManager.prototype
      @public
      @function
      @name get

      @param {string} path Path or name of the shader

      @return {Shader} object, returns the default shader if the shader is not yet loaded or the shader file didn't exist
    */
    function getShaderFn(path)
    {
        var shader = shaders[path];
        if (!shader)
        {
            return defaultShader;
        }
        return shader;
    }

    /**
      Removes a shader from the manager

      @memberOf ShaderManager.prototype
      @public
      @function
      @name remove

      @param {string} path Path or name of the shader
    */
    function removeShaderFn(path)
    {
        if (typeof shaders[path] !== 'undefined')
        {
            delete shaders[path];
        }
    }

    /**
      Reloads a shader

      @memberOf ShaderManager.prototype
      @public
      @function
      @name reload

      @param {string} path Path or name of the shader
    */
    function reloadShaderFn(path, callback)
    {
        removeShaderFn(path);
        loadShaderFn(path, callback);
    }

    var sm = new ShaderManager();

    if (log)
    {
        sm.load = function loadShaderLogFn(path, callback)
        {
            log.innerHTML += "ShaderManager.load:&nbsp;'" + path + "'<br>";
            return loadShaderFn(path, callback);
        };

        sm.map = function mapShaderLogFn(dst, src)
        {
            log.innerHTML += "ShaderManager.map:&nbsp;'" + src + "' -> '" + dst + "'<br>";
            mapShaderFn(dst, src);
        };

        sm.get = function getShaderLogFn(path)
        {
            log.innerHTML += "ShaderManager.get:&nbsp;'" + path + "'<br>";
            return getShaderFn(path);
        };

        sm.remove = function removeShaderLogFn(path)
        {
            log.innerHTML += "ShaderManager.remove:&nbsp;'" + path + "'<br>";
            removeShaderFn(path);
        };

        sm.reload = function reloadShaderLogFn(path, callback)
        {
            log.innerHTML += "ShaderManager. reload:&nbsp;'" + path + "'<br>";
            reloadShaderFn(path, callback);
        };
    }
    else
    {
        sm.load = loadShaderFn;
        sm.map = mapShaderFn;
        sm.get = getShaderFn;
        sm.remove = removeShaderFn;
        sm.reload = reloadShaderFn;
    }

    /**
      Reloads all shaders

      @memberOf ShaderManager.prototype
      @public
      @function
      @name reloadAll
    */
    sm.reloadAll = function reloadAllShadersFn()
    {
        for (var t in shaders)
        {
            if (shaders.hasOwnProperty(t) && t !== defaultShaderName)
            {
                reloadShaderFn(t);
            }
        }
    };

    /**
      Get object containing all loaded shaders

      @memberOf ShaderManager.prototype
      @public
      @function
      @name getAll

      @return {object}
    */
    sm.getAll = function getAllShadersFn()
    {
        return shaders;
    };

    /**
      Get number of shaders pending

      @memberOf ShaderManager.prototype
      @public
      @function
      @name getNumLoadingShaders

      @return {number}
    */
    sm.getNumPendingShaders = function getNumPendingShadersFn()
    {
        return numLoadingShaders;
    };

    /**
      Check if a shader is not pending

      @memberOf ShaderManager.prototype
      @public
      @function
      @name isShaderLoaded

      @param {string} path Path or name of the shader

      @return {boolean}
    */
    sm.isShaderLoaded = function isShaderLoadedFn(path)
    {
        return !loadingShader[path];
    };

    /**
      Check if a shader is missing

      @memberOf ShaderManager.prototype
      @public
      @function
      @name isShaderMissing

      @param {string} path Path or name of the shader

      @return {boolean}
    */
    sm.isShaderMissing = function isShaderMissingFn(path)
    {
        return !shaders[path];
    };

    /**
      Set path remapping dictionary

      @memberOf ShaderManager.prototype
      @public
      @function
      @name setPathRemapping

      @param {string} prm Path remapping dictionary
      @param {string} assetUrl Asset prefix for all assets loaded
    */
    sm.setPathRemapping = function setPathRemappingFn(prm, assetUrl)
    {
        pathRemapping = prm;
        pathPrefix = assetUrl;
    };

    sm.destroy = function shaderManagerDestroyFn()
    {
        if (shaders)
        {
            var p;
            for (p in shaders)
            {
                if (shaders.hasOwnProperty(p))
                {
                    var shader = shaders[p];
                    if (shader)
                    {
                        shader.destroy();
                    }
                }
            }
            shaders = null;
        }

        defaultShader = null;
        loadingShader = null;
        loadedObservers = null;
        numLoadingShaders = 0;
        pathRemapping = null;
        pathPrefix = null;
        rh = null;
        gd = null;
    };

    return sm;
};
