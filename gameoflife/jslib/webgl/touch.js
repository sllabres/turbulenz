// Copyright (c) 2012 Turbulenz Limited

function Touch() {}

Touch.create = function touchCreateFn(params)
{
    var touch = new Touch();

    touch.force         = params.force;
    touch.identifier    = params.identifier;
    touch.isGameTouch   = params.isGameTouch;
    touch.positionX     = params.positionX;
    touch.positionY     = params.positionY;
    touch.radiusX       = params.radiusX;
    touch.radiusY       = params.radiusY;
    touch.rotationAngle = params.rotationAngle;

    return touch;
};
