(function () {
// Copyright (c) 2009-2012 Turbulenz Limited
/*global Float32Array: false*/
/*global TurbulenzEngine: false*/

//
// Vector math library
//
var VMathArrayConstructor = [].constructor;

// Ensure there is a slice function available for Float32Arrays

if ((typeof Float32Array !== "undefined") &&
    (Float32Array.prototype !== undefined) &&
    (Float32Array.prototype.slice === undefined))
{
    Float32Array.prototype.slice = function Float32ArraySlice(s, e)
    {
        var length = this.length;
        if (s === undefined)
        {
            s = 0;
        }
        else if (s < 0)
        {
            s += length;
        }
        if (e === undefined)
        {
            e = length;
        }
        else if (e < 0)
        {
            e += length;
        }

        length = (e - s);
        if (0 < length)
        {
            var dst = new Float32Array(length);
            var n = 0;
            do
            {
                dst[n] = this[s];
                n += 1;
                s += 1;
            }
            while (s < e);
            return dst;
        }
        else
        {
            return new Float32Array();
        }
    };
}

var VMath =
{
    version : 1,

    // Default precision for equality comparations
    precision : 1e-6,

    FLOAT_MAX : Number.MAX_VALUE,

    select : function selectFn(m, a, b)
    {
        if (m)
        {
            return a;
        }
        else
        {
            return b;
        }
    },

    reciprocal : function reciprocalFn(a)
    {
        if (a !== 0.0)
        {
            return (1.0 / a);
        }
        else
        {
            throw "Division by zero";
        }
    },

    /*jshint bitwise: false*/
    truncate : function truncateFn(value)
    {
        return (value | 0);
    },
    /*jshint bitwise: true*/

    //
    // Vector2
    //
    v2BuildZero : function v2BuildZeroFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        return dst;
    },

    v2BuildOne : function v2BuildOneFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = 1.0;
        dst[1] = 1.0;
        return dst;
    },

    v2BuildXAxis : function v2BuildXAxisFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = 1.0;
        dst[1] = 0.0;
        return dst;
    },

    v2BuildYAxis : function v2BuildYAxisFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = 0.0;
        dst[1] = 1.0;
        return dst;
    },

    v2Build : function v2Fn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = a;
        dst[1] = b;
        return dst;
    },

    v2Copy : function v2CopyFn(src, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = src[0];
        dst[1] = src[1];
        return dst;
    },

    v2Set : function v2SetFn(v, a)
    {
        v[0] = a[0];
        v[1] = a[1];
    },

    v2Neg : function v2NegFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = -a[0];
        dst[1] = -a[1];
        return dst;
    },

    v2Add : function v2AddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = a[0] + b[0];
        dst[1] = a[1] + b[1];
        return dst;
    },

    v2Add3 : function v2Add3Fn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = a[0] + b[0] + c[0];
        dst[1] = a[1] + b[1] + c[1];
        return dst;
    },

    v2Add4 : function v2Add4Fn(a, b, c, d, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = a[0] + b[0] + c[0] + d[0];
        dst[1] = a[1] + b[1] + c[1] + d[1];
        return dst;
    },

    v2Sub : function v2SubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = (a[0] - b[0]);
        dst[1] = (a[1] - b[1]);
        return dst;
    },

    v2Mul : function v2MulFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = (a[0] * b[0]);
        dst[1] = (a[1] * b[1]);
        return dst;
    },

    v2MulAdd : function v2MulAddFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = (a[0] * b[0]) + c[0];
        dst[1] = (a[1] * b[1]) + c[1];
        return dst;
    },

    v2Dot : function v2DotFn(a, b)
    {
        return ((a[0] * b[0]) + (a[1] * b[1]));
    },

    v2PerpDot : function v2PerpDot(a, b)
    {
        return ((a[0] * b[1]) - (a[1] * b[0]));
    },

    v2LengthSq : function v2LengthSqFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        return ((a0 * a0) + (a1 * a1));
    },

    v2Length : function v2LengthFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        return Math.sqrt((a0 * a0) + (a1 * a1));
    },

    v2Reciprocal : function v2ReciprocalFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        var rcp = VMath.reciprocal;
        dst[0] = rcp(a[0]);
        dst[1] = rcp(a[1]);
        return dst;
    },

    v2Normalize : function v2NormalizeFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        var a0 = a[0];
        var a1 = a[1];
        var lsq = ((a0 * a0) + (a1 * a1));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            dst[0] = (a0 * lr);
            dst[1] = (a1 * lr);
        }
        else
        {
            dst[0] = 0;
            dst[1] = 0;
        }
        return dst;
    },

    v2Abs : function v2AbsFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        var abs = Math.abs;
        dst[0] = abs(a[0]);
        dst[1] = abs(a[1]);
        return dst;
    },

    v2Max : function v2MaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        var max = Math.max;
        dst[0] = max(a[0], b[0]);
        dst[1] = max(a[1], b[1]);
        return dst;
    },

    v2Min : function v2MinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        var min = Math.min;
        dst[0] = min(a[0], b[0]);
        dst[1] = min(a[1], b[1]);
        return dst;
    },

    v2Equal : function v2EqualFn(a, b, precision)
    {
        var abs = Math.abs;
        if (precision === undefined)
        {
            precision = this.precision;
        }
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision);
    },

    // Vector2 'masks'
    v2MaskEqual : function v2MaskEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b[0]) <= precision),
                (abs(a[1] - b[1]) <= precision)];
    },

    v2MaskLess : function v2MaskLessFn(a, b)
    {
        return [(a[0] < b[0]),
                (a[1] < b[1])];
    },

    v2MaskGreater : function v2MaskGreaterFn(a, b)
    {
        return [(a[0] > b[0]),
                (a[1] > b[1])];
    },

    v2MaskGreaterEq : function v2MaskGreaterEqFn(a, b)
    {
        return [(a[0] >= b[0]),
                (a[1] >= b[1])];
    },

    v2MaskNot : function v2MaskNotFn(a)
    {
        return [!a[0],
                !a[1]];
    },

    v2MaskOr : function v2MaskOrFn(a, b)
    {
        return [(a[0] || b[0]),
                (a[1] || b[1])];
    },

    v2MaskAnd : function v2MaskAndFn(a, b)
    {
        return [(a[0] && b[0]),
                (a[1] && b[1])];
    },

    v2Select : function v2SelectFn(m, a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = m[0] ? a[0] : b[0];
        dst[1] = m[1] ? a[1] : b[1];
        return dst;
    },

    // Vector2 operations with scalar
    v2ScalarBuild : function v2ScalarBuildFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        dst[0] = a;
        dst[1] = a;

        return dst;
    },

    v2ScalarMax : function v2ScalarMaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        var max = Math.max;
        dst[0] = max(a[0], b);
        dst[1] = max(a[1], b);

        return dst;
    },

    v2ScalarMin : function v2ScalarMinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        var min = Math.min;
        dst[0] = min(a[0], b);
        dst[1] = min(a[1], b);

        return dst;
    },

    v2ScalarAdd : function v2ScalarAddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        dst[0] = (a[0] + b);
        dst[1] = (a[1] + b);

        return dst;
    },

    v2ScalarSub : function v2ScalarSubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }

        dst[0] = (a[0] - b);
        dst[1] = (a[1] - b);

        return dst;
    },

    v2ScalarMul : function v2ScalarMulFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        if (b === 0)
        {
            dst[0] = 0;
            dst[1] = 0;
        }
        else
        {
            dst[0] = a[0] * b;
            dst[1] = a[1] * b;
        }
        return dst;
    },

    v2AddScalarMul : function v2AddScalarMulFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = a[0] + b[0] * c;
        dst[1] = a[1] + b[1] * c;
        return dst;
    },

    // Vector2 'masks' with scalars
    v2EqualScalarMask : function v2EqualScalarMaskFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b) <= precision),
                (abs(a[1] - b) <= precision)];
    },

    v2LessScalarMask : function v2LessScalarMaskFn(a, b)
    {
        return [(a[0] < b),
                (a[1] < b)];
    },

    v2GreaterScalarMask : function v2GreaterScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b)];
    },

    v2GreaterEqScalarMask : function v2GreaterEqScalarMaskFn(a, b)
    {
        return [(a[0] >= b),
                (a[1] >= b)];
    },

    v2Lerp : function v2LerpFn(a, b, t, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(2);
        }
        dst[0] = (a[0] + ((b[0] - a[0]) * t));
        dst[1] = (a[1] + ((b[1] - a[1]) * t));
        return dst;
    },

    //
    // Vector3
    //
    v3BuildZero : function v3BuildZeroFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildOne  : function v3BuildOneFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = 1.0;
        dst[1] = 1.0;
        dst[2] = 1.0;
        return dst;
    },

    v3BuildXAxis : function v3BuildXAxisFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildYAxis : function v3BuildYAxisFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = 0.0;
        dst[1] = 1.0;
        dst[2] = 0.0;
        return dst;
    },

    v3BuildZAxis : function v3BuildZAxisFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        dst[2] = 1.0;
        return dst;
    },

    v3Build : function v3Fn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = a;
        dst[1] = b;
        dst[2] = c;
        return dst;
    },

    v3Copy : function v3CopyFn(src, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        return dst;
    },

    v3Set : function v3SetFn(v, a)
    {
        v[0] = a[0];
        v[1] = a[1];
        v[2] = a[2];
    },

    v3Neg : function v3NegFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = -a[0];
        dst[1] = -a[1];
        dst[2] = -a[2];
        return dst;
    },

    v3Add : function v3AddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = (a[0] + b[0]);
        dst[1] = (a[1] + b[1]);
        dst[2] = (a[2] + b[2]);
        return dst;
    },

    v3Add3 : function v3Add3Fn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = a[0] + b[0] + c[0];
        dst[1] = a[1] + b[1] + c[1];
        dst[2] = a[2] + b[2] + c[2];
        return dst;
    },

    v3Add4 : function v3Add4Fn(a, b, c, d, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = a[0] + b[0] + c[0] + d[0];
        dst[1] = a[1] + b[1] + c[1] + d[1];
        dst[2] = a[2] + b[2] + c[2] + d[2];
        return dst;
    },

    v3Sub : function v3SubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = (a[0] - b[0]);
        dst[1] = (a[1] - b[1]);
        dst[2] = (a[2] - b[2]);
        return dst;
    },

    v3Mul : function v3MulFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = (a[0] * b[0]);
        dst[1] = (a[1] * b[1]);
        dst[2] = (a[2] * b[2]);
        return dst;
    },

    v3MulAdd : function v3MulAddFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = (a[0] * b[0]) + c[0];
        dst[1] = (a[1] * b[1]) + c[1];
        dst[2] = (a[2] * b[2]) + c[2];
        return dst;
    },

    v3Dot : function v3DotFn(a, b)
    {
        return ((a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]));
    },

    v3Cross : function v3CrossFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        dst[0] = ((a1 * b2) - (a2 * b1));
        dst[1] = ((a2 * b0) - (a0 * b2));
        dst[2] = ((a0 * b1) - (a1 * b0));
        return dst;
    },

    v3LengthSq : function v3LengthSqFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        return ((a0 * a0) + (a1 * a1) + (a2 * a2));
    },

    v3Length : function v3LengthFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        return Math.sqrt((a0 * a0) + (a1 * a1) + (a2 * a2));
    },

    v3Reciprocal : function v3ReciprocalFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        var rcp = VMath.reciprocal;
        dst[0] = rcp(a[0]);
        dst[1] = rcp(a[1]);
        dst[2] = rcp(a[2]);
        return dst;
    },

    v3Normalize : function v3NormalizeFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var lsq = ((a0 * a0) + (a1 * a1) + (a2 * a2));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            dst[0] = (a0 * lr);
            dst[1] = (a1 * lr);
            dst[2] = (a2 * lr);
        }
        else
        {
            dst[0] = 0;
            dst[1] = 0;
            dst[2] = 0;
        }
        return dst;
    },

    v3Abs : function v3AbsFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var abs = Math.abs;
        dst[0] = abs(a[0]);
        dst[1] = abs(a[1]);
        dst[2] = abs(a[2]);
        return dst;
    },

    v3Max : function v3MaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var max = Math.max;
        dst[0] = max(a[0], b[0]);
        dst[1] = max(a[1], b[1]);
        dst[2] = max(a[2], b[2]);
        return dst;
    },

    v3Min : function v3MinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var min = Math.min;
        dst[0] = min(a[0], b[0]);
        dst[1] = min(a[1], b[1]);
        dst[2] = min(a[2], b[2]);
        return dst;
    },

    v3Equal : function v3EqualFn(a, b, precision)
    {
        var abs = Math.abs;
        if (precision === undefined)
        {
            precision = this.precision;
        }
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision);
    },

    // Vector3 'masks'
    v3MaskEqual : function v3MaskEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b[0]) <= precision),
                (abs(a[1] - b[1]) <= precision),
                (abs(a[2] - b[2]) <= precision)];
    },

    v3MaskLess : function v3MaskLessFn(a, b)
    {
        return [(a[0] < b[0]),
                (a[1] < b[1]),
                (a[2] < b[2])];
    },

    v3MaskGreater : function v3MaskGreaterFn(a, b)
    {
        return [(a[0] > b[0]),
                (a[1] > b[1]),
                (a[2] > b[2])];
    },

    v3MaskGreaterEq : function v3MaskGreaterEqFn(a, b)
    {
        return [(a[0] >= b[0]),
                (a[1] >= b[1]),
                (a[2] >= b[2])];
    },

    v3MaskNot : function v3MaskNotFn(a)
    {
        return [!a[0],
                !a[1],
                !a[2]];
    },

    v3MaskOr : function v3MaskOrFn(a, b)
    {
        return [(a[0] || b[0]),
                (a[1] || b[1]),
                (a[2] || b[2])];
    },

    v3MaskAnd : function v3MaskAndFn(a, b)
    {
        return [(a[0] && b[0]),
                (a[1] && b[1]),
                (a[2] && b[2])];
    },

    v3Select : function v3SelectFn(m, a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[0] ? a[0] : b[0];
        dst[1] = m[1] ? a[1] : b[1];
        dst[2] = m[2] ? a[2] : b[2];
        return dst;
    },

    // Vector3 operations with scalar
    v3ScalarBuild : function v3ScalarBuildFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        dst[0] = a;
        dst[1] = a;
        dst[2] = a;

        return dst;
    },

    v3ScalarMax : function v3ScalarMaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        var max = Math.max;
        dst[0] = max(a[0], b);
        dst[1] = max(a[1], b);
        dst[2] = max(a[2], b);

        return dst;
    },

    v3ScalarMin : function v3ScalarMinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        var min = Math.min;
        dst[0] = min(a[0], b);
        dst[1] = min(a[1], b);
        dst[2] = min(a[2], b);

        return dst;
    },

    v3ScalarAdd : function v3ScalarAddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        dst[0] = (a[0] + b);
        dst[1] = (a[1] + b);
        dst[2] = (a[2] + b);

        return dst;
    },

    v3ScalarSub : function v3ScalarSubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        dst[0] = (a[0] - b);
        dst[1] = (a[1] - b);
        dst[2] = (a[2] - b);

        return dst;
    },

    v3ScalarMul : function v3ScalarMulFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        if (b === 0)
        {
            dst[0] = 0;
            dst[1] = 0;
            dst[2] = 0;
        }
        else
        {
            dst[0] = (a[0] * b);
            dst[1] = (a[1] * b);
            dst[2] = (a[2] * b);
        }
        return dst;
    },

    v3AddScalarMul : function v3AddScalarMulFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        dst[0] = a[0] + b[0] * c;
        dst[1] = a[1] + b[1] * c;
        dst[2] = a[2] + b[2] * c;

        return dst;
    },

    // Vector3 'masks' with scalars
    v3EqualScalarMask : function v3EqualScalarMaskFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b) <= precision),
                (abs(a[1] - b) <= precision),
                (abs(a[2] - b) <= precision)];
    },

    v3LessScalarMask : function v3LessScalarMaskFn(a, b)
    {
        return [(a[0] < b),
                (a[1] < b),
                (a[2] < b)];
    },

    v3GreaterScalarMask : function v3GreaterScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b),
                (a[2] > b)];
    },

    v3GreaterEqScalarMask : function v3GreaterEqScalarMaskFn(a, b)
    {
        return [(a[0] >= b),
                (a[1] >= b),
                (a[2] >= b)];
    },

    v3Lerp : function v3LerpFn(a, b, t, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }

        dst[0] =  (a[0] + ((b[0] - a[0]) * t));
        dst[1] =  (a[1] + ((b[1] - a[1]) * t));
        dst[2] =  (a[2] + ((b[2] - a[2]) * t));

        return dst;
    },

    //
    // Vector4
    //
    v4BuildZero : function v4BuildZeroFn(dst) {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = 0.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = 0.0;
        return dst;
    },

    v4BuildOne  : function v4BuildOneFn(dst) {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = 1.0;
        dst[1] = 1.0;
        dst[2] = 1.0;
        dst[3] = 1.0;
        return dst;
    },

    v4Build : function v4BuildFn(a, b, c, d, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = a;
        dst[1] = b;
        dst[2] = c;
        dst[3] = d;
        return dst;
    },

    v4Copy : function v4CopyFn(src, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    },

    v4Set : function v4SetFn(v, a)
    {
        v[0] = a[0];
        v[1] = a[1];
        v[2] = a[2];
        v[3] = a[3];
    },

    v4Neg : function v4NegFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = -a[0];
        dst[1] = -a[1];
        dst[2] = -a[2];
        dst[3] = -a[3];

        return dst;
    },

    v4Add : function v4AddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = (a[0] + b[0]);
        dst[1] = (a[1] + b[1]);
        dst[2] = (a[2] + b[2]);
        dst[3] = (a[3] + b[3]);
        return dst;
    },

    v4Add3 : function v4Add3Fn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = a[0] + b[0] + c[0];
        dst[1] = a[1] + b[1] + c[1];
        dst[2] = a[2] + b[2] + c[2];
        dst[3] = a[3] + b[3] + c[3];

        return dst;
    },

    v4Add4 : function v4Add4Fn(a, b, c, d, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = a[0] + b[0] + c[0] + d[0];
        dst[1] = a[1] + b[1] + c[1] + d[1];
        dst[2] = a[2] + b[2] + c[2] + d[2];
        dst[3] = a[3] + b[3] + c[3] + d[3];

        return dst;
    },

    v4Sub : function v4SubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = (a[0] - b[0]);
        dst[1] = (a[1] - b[1]);
        dst[2] = (a[2] - b[2]);
        dst[3] = (a[3] - b[3]);
        return dst;
    },

    v4Mul : function v4MulFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = (a[0] * b[0]);
        dst[1] = (a[1] * b[1]);
        dst[2] = (a[2] * b[2]);
        dst[3] = (a[3] * b[3]);
        return dst;
    },

    v4MulAdd : function v4MulAddFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = (a[0] * b[0]) + c[0];
        dst[1] = (a[1] * b[1]) + c[1];
        dst[2] = (a[2] * b[2]) + c[2];
        dst[3] = (a[3] * b[3]) + c[3];

        return dst;
    },

    v4Dot : function v4DotFn(a, b)
    {
        return ((a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]) + (a[3] * b[3]));
    },

    v4LengthSq : function v4LengthSqFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        return ((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
    },

    v4Length : function v4LengthFn(a)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        return Math.sqrt((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
    },

    v4Reciprocal : function v4ReciprocalFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var rcp = VMath.reciprocal;
        dst[0] = rcp(a[0]);
        dst[1] = rcp(a[1]);
        dst[2] = rcp(a[2]);
        dst[3] = rcp(a[3]);

        return dst;
    },

    v4Normalize : function v4NormalizeFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];

        var lsq = ((a0 * a0) + (a1 * a1) + (a2 * a2) + (a3 * a3));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            dst[0] = a0 * lr;
            dst[1] = a1 * lr;
            dst[2] = a2 * lr;
            dst[3] = a3 * lr;
        }
        else
        {
            dst[0] = 0;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
        }
        return dst;
    },

    v4Abs : function v4AbsFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var abs = Math.abs;
        dst[0] = abs(a[0]);
        dst[1] = abs(a[1]);
        dst[2] = abs(a[2]);
        dst[3] = abs(a[3]);

        return dst;
    },

    v4Max : function v4MaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var max = Math.max;
        dst[0] = max(a[0], b[0]);
        dst[1] = max(a[1], b[1]);
        dst[2] = max(a[2], b[2]);
        dst[3] = max(a[3], b[3]);

        return dst;
    },

    v4Min : function v4MinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var min = Math.min;
        dst[0] = min(a[0], b[0]);
        dst[1] = min(a[1], b[1]);
        dst[2] = min(a[2], b[2]);
        dst[3] = min(a[3], b[3]);

        return dst;
    },

    v4Equal : function v4EqualFn(a, b, precision)
    {
        var abs = Math.abs;
        if (precision === undefined)
        {
            precision = this.precision;
        }
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision &&
                abs(a[3] - b[3]) <= precision);
    },

    // Vector3 'masks'
    v4MaskEqual : function v4MaskEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b[0]) <= precision),
                (abs(a[1] - b[1]) <= precision),
                (abs(a[2] - b[2]) <= precision),
                (abs(a[3] - b[3]) <= precision)];
    },

    v4MaskLess : function v4MaskLessFn(a, b)
    {
        return [(a[0] < b[0]),
                (a[1] < b[1]),
                (a[2] < b[2]),
                (a[3] < b[3])];
    },

    v4MaskGreater : function v4MaskGreaterFn(a, b)
    {
        return [(a[0] > b[0]),
                (a[1] > b[1]),
                (a[2] > b[2]),
                (a[3] > b[3])];
    },

    v4MaskGreaterEq : function v4MaskGreaterEqFn(a, b)
    {
        return [(a[0] >= b[0]),
                (a[1] >= b[1]),
                (a[2] >= b[2]),
                (a[3] >= b[3])];
    },

    v4MaskNot : function v4MaskNotFn(a)
    {
        return [!a[0],
                !a[1],
                !a[2],
                !a[3]];
    },

    v4MaskOr : function v4MaskOrFn(a, b)
    {
        return [(a[0] || b[0]),
                (a[1] || b[1]),
                (a[2] || b[2]),
                (a[3] || b[3])];
    },

    v4MaskAnd : function v4MaskAndFn(a, b)
    {
        return [(a[0] && b[0]),
                (a[1] && b[1]),
                (a[2] && b[2]),
                (a[3] && b[3])];
    },

    v4Many : function v4ManyFn(m)
    {
        return (m[0] || m[1] || m[2] || m[3]);
    },

    v4MaskAll : function v4MaskAllFn(m)
    {
        return (m[0] && m[1] && m[2] && m[3]);
    },

    v4Select : function v4SelectFn(m, a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = m[0] ? a[0] : b[0];
        dst[1] = m[1] ? a[1] : b[1];
        dst[2] = m[2] ? a[2] : b[2];
        dst[3] = m[3] ? a[3] : b[3];

        return dst;
    },

    // Vector4 operations with scalar
    v4ScalarBuild : function v4ScalarBuildFn(a, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = a;
        dst[1] = a;
        dst[2] = a;
        dst[3] = a;

        return dst;
    },

    v4ScalarMax : function v4ScalarMaxFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var max = Math.max;
        dst[0] = max(a[0], b);
        dst[1] = max(a[1], b);
        dst[2] = max(a[2], b);
        dst[3] = max(a[3], b);

        return dst;
    },

    v4ScalarMin : function v4ScalarMinFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var min = Math.min;
        dst[0] = min(a[0], b);
        dst[1] = min(a[1], b);
        dst[2] = min(a[2], b);
        dst[3] = min(a[3], b);

        return dst;
    },

    v4ScalarAdd : function v4ScalarAddFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = (a[0] + b);
        dst[1] = (a[1] + b);
        dst[2] = (a[2] + b);
        dst[3] = (a[3] + b);

        return dst;
    },

    v4ScalarSub : function v4ScalarSubFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = (a[0] - b);
        dst[1] = (a[1] - b);
        dst[2] = (a[2] - b);
        dst[3] = (a[3] - b);

        return dst;
    },

    v4ScalarMul : function v4ScalarMulFn(a, b, dst)
    {
        if (b === 0)
        {
            return VMath.v4BuildZero(dst);
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(4);
            }

            dst[0] = (a[0] * b);
            dst[1] = (a[1] * b);
            dst[2] = (a[2] * b);
            dst[3] = (a[3] * b);

            return dst;
        }
    },

    v4AddScalarMul : function v4AddScalarMulFn(a, b, c, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = a[0] + b[0] * c;
        dst[1] = a[1] + b[1] * c;
        dst[2] = a[2] + b[2] * c;
        dst[3] = a[3] + b[3] * c;

        return dst;
    },

    v4ScalarEqual : function v4ScalarEqualFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return (abs(a[0] - b) <= precision &&
                abs(a[1] - b) <= precision &&
                abs(a[2] - b) <= precision &&
                abs(a[3] - b) <= precision);
    },

    // Vector3 'masks' with scalars
    v4EqualScalarMask : function v4EqualScalarMaskFn(a, b)
    {
        var abs = Math.abs;
        var precision = VMath.precision;
        return [(abs(a[0] - b) <= precision),
                (abs(a[1] - b) <= precision),
                (abs(a[2] - b) <= precision),
                (abs(a[3] - b) <= precision)];
    },

    v4LessScalarMask : function v4LessScalarMaskFn(a, b)
    {
        return [(a[0] < b),
                (a[1] < b),
                (a[2] < b),
                (a[3] < b)];
    },

    v4GreaterScalarMask : function v4GreaterScalarMaskFn(a, b)
    {
        return [(a[0] > b),
                (a[1] > b),
                (a[2] > b),
                (a[3] > b)];
    },

    v4GreaterEqScalarMask : function v4GreaterEqScalarMaskFn(a, b)
    {
        return [(a[0] >= b),
                (a[1] >= b),
                (a[2] >= b),
                (a[3] >= b)];
    },

    v4Lerp : function v4LerpFn(a, b, t, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = (a[0] + ((b[0] - a[0]) * t));
        dst[1] = (a[1] + ((b[1] - a[1]) * t));
        dst[2] = (a[2] + ((b[2] - a[2]) * t));
        dst[3] = (a[3] + ((b[3] - a[3]) * t));
        return dst;
    },

    //
    // AABB
    //

    aabbBuild : function aabbBuildFn(a0, a1, a2, a3, a4, a5, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        dst[0] = a0;
        dst[1] = a1;
        dst[2] = a2;
        dst[3] = a3;
        dst[4] = a4;
        dst[5] = a5;

        return dst;
    },

    aabbBuildEmpty : function aabbBuildEmptyFn(dst)
    {
        var float_max = this.FLOAT_MAX;

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        dst[0] = float_max;
        dst[1] = float_max;
        dst[2] = float_max;
        dst[3] = -float_max;
        dst[4] = -float_max;
        dst[5] = -float_max;

        return dst;
    },

    aabbCopy : function aabbCopyFn(aabb, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        dst[0] = aabb[0];
        dst[1] = aabb[1];
        dst[2] = aabb[2];
        dst[3] = aabb[3];
        dst[4] = aabb[4];
        dst[5] = aabb[5];

        return dst;
    },

    aabbSet : function aabbSet(dst, src)
    {
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
    },

    aabbIsEmpty : function aabbIsEmptyFn(aabb)
    {
        return aabb[0] > aabb[3];
    },

    aabbMin : function aabbMinFn(aabb, dst)
    {
        if (dst === undefined)
        {
            return aabb.slice(0, 3);
        }
        dst[0] = aabb[0];
        dst[1] = aabb[1];
        dst[2] = aabb[2];
        return dst;
    },

    aabbMax : function aabbMaxFn(aabb, dst)
    {
        if (dst === undefined)
        {
            return aabb.slice(3, 6);
        }
        dst[0] = aabb[3];
        dst[1] = aabb[4];
        dst[2] = aabb[5];
        return dst;
    },

    aabbGetCenterAndHalf : function aabbGetCenterAndHalfFn(aabb, center, half)
    {
        var cX = (aabb[0] + aabb[3]) * 0.5;
        var cY = (aabb[1] + aabb[4]) * 0.5;
        var cZ = (aabb[2] + aabb[5]) * 0.5;

        center[0] = cX;
        center[1] = cY;
        center[2] = cZ;

        half[0] = aabb[3] - cX;
        half[1] = aabb[4] - cY;
        half[2] = aabb[5] - cZ;
    },

    aabbIsInsidePlanes : function aabbIsInsidePlanesFn(aabb, planes)
    {
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 < 0 ? aabb[0] : aabb[3]) + d1 * (d1 < 0 ? aabb[1] : aabb[4]) + d2 * (d2 < 0 ? aabb[2] : aabb[5])) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    aabbIsFullyInsidePlanes : function aabbIsFullyInsidePlanesFn(aabb, planes)
    {
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 > 0 ? aabb[0] : aabb[3]) + d1 * (d1 > 0 ? aabb[1] : aabb[4]) + d2 * (d2 > 0 ? aabb[2] : aabb[5])) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    aabbUnion : function aabbUnionFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        dst[0] = a[0] < b[0] ? a[0] : b[0];
        dst[1] = a[1] < b[1] ? a[1] : b[1];
        dst[2] = a[2] < b[2] ? a[2] : b[2];
        dst[3] = a[3] > b[3] ? a[3] : b[3];
        dst[4] = a[4] > b[4] ? a[4] : b[4];
        dst[5] = a[5] > b[5] ? a[5] : b[5];

        return dst;
    },

    aabbUnionArray : function aabbUnionArrayFn(aabbArray, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }
        VMath.aabbCopy(aabbArray[0], dst);

        var numAABBs = aabbArray.length;
        for (var i = 0; i < numAABBs; i += 1)
        {
            var aabb = aabbArray[i];
            dst[0] = (dst[0] < aabb[0] ? dst[0] : aabb[0]);
            dst[1] = (dst[1] < aabb[1] ? dst[1] : aabb[1]);
            dst[2] = (dst[2] < aabb[2] ? dst[2] : aabb[2]);
            dst[3] = (dst[3] > aabb[3] ? dst[3] : aabb[3]);
            dst[4] = (dst[4] > aabb[4] ? dst[4] : aabb[4]);
            dst[5] = (dst[5] > aabb[5] ? dst[5] : aabb[5]);
        }

        return dst;
    },

    aabbAddPoints : function aabbAddPointFn(aabb, ps)
    {
        var i;
        var numPoints = ps.length;

        var r0 = aabb[0];
        var r1 = aabb[1];
        var r2 = aabb[2];
        var r3 = aabb[3];
        var r4 = aabb[4];
        var r5 = aabb[5];

        var p0, p1, p2;

        for (i = 0; i < numPoints; i += 1)
        {
            p0 = ps[i][0];
            p1 = ps[i][1];
            p2 = ps[i][2];

            r0 = (r0 < p0 ? r0 : p0);
            r1 = (r1 < p1 ? r1 : p1);
            r2 = (r2 < p2 ? r2 : p2);
            r3 = (r3 > p0 ? r3 : p0);
            r4 = (r4 > p1 ? r4 : p1);
            r5 = (r5 > p2 ? r5 : p2);
        }

        aabb[0] = r0;
        aabb[1] = r1;
        aabb[2] = r2;
        aabb[3] = r3;
        aabb[4] = r4;
        aabb[5] = r5;

    },

    aabbTransform : function aabbTransformFn(aabb, matrix, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        var cX = (aabb[0] + aabb[3]) * 0.5;
        var cY = (aabb[1] + aabb[4]) * 0.5;
        var cZ = (aabb[2] + aabb[5]) * 0.5;

        var hX = aabb[3] - cX;
        var hY = aabb[4] - cY;
        var hZ = aabb[5] - cZ;

        var m0 = matrix[0];
        var m1 = matrix[1];
        var m2 = matrix[2];
        var m3 = matrix[3];
        var m4 = matrix[4];
        var m5 = matrix[5];
        var m6 = matrix[6];
        var m7 = matrix[7];
        var m8 = matrix[8];

        var ctX = matrix[9] +  (m0 * cX + m3 * cY + m6 * cZ);
        var ctY = matrix[10] + (m1 * cX + m4 * cY + m7 * cZ);
        var ctZ = matrix[11] + (m2 * cX + m5 * cY + m8 * cZ);

        var abs = Math.abs;

        var htX = (abs(m0) * hX + abs(m3) * hY + abs(m6) * hZ);
        var htY = (abs(m1) * hX + abs(m4) * hY + abs(m7) * hZ);
        var htZ = (abs(m2) * hX + abs(m5) * hY + abs(m8) * hZ);

        dst[0] = ctX - htX;
        dst[1] = ctY - htY;
        dst[2] = ctZ - htZ;
        dst[3] = ctX + htX;
        dst[4] = ctY + htY;
        dst[5] = ctZ + htZ;

        return dst;
    },

    aabbIntercept : function aabbInterceptFn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(6);
        }

        dst[0] = a[0] > b[0] ? a[0] : b[0];
        dst[1] = a[1] > b[1] ? a[1] : b[1];
        dst[2] = a[2] > b[2] ? a[2] : b[2];
        dst[3] = a[3] < b[3] ? a[3] : b[3];
        dst[4] = a[4] < b[4] ? a[4] : b[4];
        dst[5] = a[5] < b[5] ? a[5] : b[5];

        return dst;
    },

    aabbOverlaps : function aabbOverlapsFn(a, b)
    {
        return ((a[0] <= b[3]) &&
                (a[1] <= b[4]) &&
                (a[2] <= b[5]) &&
                (a[3] >= b[0]) &&
                (a[4] >= b[1]) &&
                (a[5] >= b[2]));
    },

    aabbSphereOverlaps : function aabbSphereOverlapsFn(aabb, center, radius)
    {
        var centerX = center[0];
        var centerY = center[1];
        var centerZ = center[2];
        var radiusSquared = radius * radius;

        var minX = aabb[0];
        var minY = aabb[1];
        var minZ = aabb[2];
        var maxX = aabb[3];
        var maxY = aabb[4];
        var maxZ = aabb[5];
        var totalDistance = 0, sideDistance;

        if (centerX < minX)
        {
            sideDistance = (minX - centerX);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerX > maxX)
        {
            sideDistance = (centerX - maxX);
            totalDistance += (sideDistance * sideDistance);
        }
        if (centerY < minY)
        {
            sideDistance = (minY - centerY);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerY > maxY)
        {
            sideDistance = (centerY - maxY);
            totalDistance += (sideDistance * sideDistance);
        }
        if (centerZ < minZ)
        {
            sideDistance = (minZ - centerZ);
            totalDistance += (sideDistance * sideDistance);
        }
        else if (centerZ > maxZ)
        {
            sideDistance = (centerZ - maxZ);
            totalDistance += (sideDistance * sideDistance);
        }
        return (totalDistance <= radiusSquared);
    },

    aabbIsInside : function aabbIsInsideFn(a, b)
    {
        return ((a[0] >= b[0]) &&
                (a[1] >= b[1]) &&
                (a[2] >= b[2]) &&
                (a[3] <= b[3]) &&
                (a[4] <= b[4]) &&
                (a[5] <= b[5]));
    },

    aabbTestInside : function aabbTestInsideFn(a, b)
    {
        if ((a[0] <= b[3]) &&
            (a[1] <= b[4]) &&
            (a[2] <= b[5]) &&
            (a[3] >= b[0]) &&
            (a[4] >= b[1]) &&
            (a[5] >= b[2]))
        {

            if ((a[0] >= b[0]) &&
                (a[1] >= b[1]) &&
                (a[2] >= b[2]) &&
                (a[3] <= b[3]) &&
                (a[4] <= b[4]) &&
                (a[5] <= b[5]))
            {
                return 2;
            }
            return 1;
        }

        return 0;
    },

    //
    // Matrix
    //
    m33BuildIdentity : function m33BuildIdentityFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = 0.0;
        dst[4] = 1.0;
        dst[5] = 0.0;
        dst[6] = 0.0;
        dst[7] = 0.0;
        dst[8] = 1.0;

        return dst;
    },

    // Matrix33
    m33Build : function m33BuildFn(r, u, a, dst)
    {
        var length = arguments.length;
        if (length >= 9)
        {
            // Can NOT use dst because it will overwrite the input value...
            var res;

            if (length > 9)
            {
                res = arguments[9];
                if (res === undefined)
                {
                    res = new VMathArrayConstructor(9);
                }
            }
            else
            {
                res = new VMathArrayConstructor(9);
            }

            res[0] = arguments[0];
            res[1] = arguments[1];
            res[2] = arguments[2];
            res[3] = arguments[3];
            res[4] = arguments[4];
            res[5] = arguments[5];
            res[6] = arguments[6];
            res[7] = arguments[7];
            res[8] = arguments[8];

            return res;
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(9);
            }

            dst[0] = r[0];
            dst[1] = r[1];
            dst[2] = r[2];
            dst[3] = u[0];
            dst[4] = u[1];
            dst[5] = u[2];
            dst[6] = a[0];
            dst[7] = a[1];
            dst[8] = a[2];

            return dst;
        }
    },

    m33Copy : function m33CopyFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[8] = m[8];

        return dst;
    },

    m33FromAxisRotation : function m33FromAxisRotationFn(axis, angle, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;

        dst[0] = tx * axisX + c;
        dst[1] = tx * axisY - sz;
        dst[2] = tx * axisZ + sy;
        dst[3] = ty * axisX + sz;
        dst[4] = ty * axisY + c;
        dst[5] = ty * axisZ - sx;
        dst[6] = tz * axisX - sy;
        dst[7] = tz * axisY + sx;
        dst[8] = tz * axisZ + c;

        return dst;
    },

    m33FromQuat: function m33FromQuatFn(q, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        var qx = q[0];
        var qy = q[1];
        var qz = q[2];
        var qw = q[3];

        var xx = 2.0 * qx * qx;
        var yy = 2.0 * qy * qy;
        var zz = 2.0 * qz * qz;
        var xy = 2.0 * qx * qy;
        var zw = 2.0 * qz * qw;
        var xz = 2.0 * qx * qz;
        var yw = 2.0 * qy * qw;
        var yz = 2.0 * qy * qz;
        var xw = 2.0 * qx * qw;

        dst[0] = 1.0 - yy - zz;
        dst[1] = xy - zw;
        dst[2] = xz + yw;
        dst[3] = xy + zw;
        dst[4] = 1.0 - xx - zz;
        dst[5] = yz - xw;
        dst[6] = xz - yw;
        dst[7] = yz + xw;
        dst[8] = 1.0 - xx - yy;

        return dst;
    },

    m33Right : function m33RightFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        return dst;
    },

    m33Up : function m33UpFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[3];
        dst[1] = m[4];
        dst[2] = m[5];
        return dst;
    },

    m33At : function m33AtFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[6];
        dst[1] = m[7];
        dst[2] = m[8];
        return dst;
    },

    m33SetRight : function m33SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
    },

    m33SetUp : function m33SetUpFn(m, v)
    {
        m[3] = v[0];
        m[4] = v[1];
        m[5] = v[2];
    },

    m33SetAt : function m33SetAtFn(m, v)
    {
        m[6] = v[0];
        m[7] = v[1];
        m[8] = v[2];
    },

    m33Transpose : function m33TransposeFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        dst[0] = m0;
        dst[1] = m3;
        dst[2] = m6;
        dst[3] = m1;
        dst[4] = m4;
        dst[5] = m7;
        dst[6] = m2;
        dst[7] = m5;
        dst[8] = m8;
        return dst;
    },

    m33Determinant : function m33DeterminantFn(m)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        return (m0 * (m4 * m8 - m5 * m7) +
                m1 * (m5 * m6 - m3 * m8) +
                m2 * (m3 * m7 - m4 * m6));
    },

    m33Inverse : function m33InverseFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        var det = VMath.m33Determinant(m);
        if (det === 0.0)
        {
            dst[0] = dst[1] = dst[2] = 0.0;
            dst[3] = dst[4] = dst[5] = 0.0;
            dst[6] = dst[7] = dst[8] = 0.0;
            return dst;
        }
        else
        {
            var m0 = m[0];
            var m1 = m[1];
            var m2 = m[2];
            var m3 = m[3];
            var m4 = m[4];
            var m5 = m[5];
            var m6 = m[6];
            var m7 = m[7];
            var m8 = m[8];

            var detrecp = 1.0 / det;
            dst[0] = ((m4 * m8 + m5 * (-m7)) * detrecp);
            dst[1] = ((m7 * m2 + m8 * (-m1)) * detrecp);
            dst[2] = ((m1 * m5 - m2 *   m4)  * detrecp);
            dst[3] = ((m5 * m6 + m3 * (-m8)) * detrecp);
            dst[4] = ((m8 * m0 + m6 * (-m2)) * detrecp);
            dst[5] = ((m3 * m2 - m0 *   m5)  * detrecp);
            dst[6] = ((m3 * m7 + m4 * (-m6)) * detrecp);
            dst[7] = ((m6 * m1 + m7 * (-m0)) * detrecp);
            dst[8] = ((m0 * m4 - m3 *   m1)  * detrecp);
            return dst;
        }
    },

    m33InverseTranspose : function m33InverseTransposeFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var det = (m0 * (m4 * m8 - m5 * m7) +
                   m1 * (m5 * m6 - m3 * m8) +
                   m2 * (m3 * m7 - m4 * m6));
        if (det === 0.0)
        {
            dst[0] = dst[1] = dst[2] = 0.0;
            dst[3] = dst[4] = dst[5] = 0.0;
            dst[6] = dst[7] = dst[8] = 0.0;
            return dst;
        }
        else
        {
            var detrecp = 1.0 / det;
            dst[0] = ((m4 * m8 + m5 * (-m7)) * detrecp);
            dst[3] = ((m7 * m2 + m8 * (-m1)) * detrecp);
            dst[6] = ((m1 * m5 - m2 *   m4)  * detrecp);
            dst[1] = ((m5 * m6 + m3 * (-m8)) * detrecp);
            dst[4] = ((m8 * m0 + m6 * (-m2)) * detrecp);
            dst[7] = ((m3 * m2 - m0 *   m5)  * detrecp);
            dst[2] = ((m3 * m7 + m4 * (-m6)) * detrecp);
            dst[5] = ((m6 * m1 + m7 * (-m0)) * detrecp);
            dst[8] = ((m0 * m4 - m3 *   m1)  * detrecp);
            return dst;
        }
    },

    m33Mul : function m33MulFn(a, b, dst)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        dst[0] = (b0 * a0 + b3 * a1 + b6 * a2);
        dst[1] = (b1 * a0 + b4 * a1 + b7 * a2);
        dst[2] = (b2 * a0 + b5 * a1 + b8 * a2);

        dst[3] = (b0 * a3 + b3 * a4 + b6 * a5);
        dst[4] = (b1 * a3 + b4 * a4 + b7 * a5);
        dst[5] = (b2 * a3 + b5 * a4 + b8 * a5);

        dst[6] = (b0 * a6 + b3 * a7 + b6 * a8);
        dst[7] = (b1 * a6 + b4 * a7 + b7 * a8);
        dst[8] = (b2 * a6 + b5 * a7 + b8 * a8);

        return dst;
    },

    m33Transform : function m33TransformFn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        dst[0] = (m[0] * v0 + m[3] * v1 + m[6] * v2);
        dst[1] = (m[1] * v0 + m[4] * v1 + m[7] * v2);
        dst[2] = (m[2] * v0 + m[5] * v1 + m[8] * v2);
        return dst;
    },

    m33Equal : function m33EqualFn(a, b, precision)
    {
        var abs = Math.abs;
        if (precision === undefined)
        {
            precision = this.precision;
        }
        return (abs(a[0] - b[0]) <= precision &&
                abs(a[1] - b[1]) <= precision &&
                abs(a[2] - b[2]) <= precision &&
                abs(a[3] - b[3]) <= precision &&
                abs(a[4] - b[4]) <= precision &&
                abs(a[5] - b[5]) <= precision &&
                abs(a[6] - b[6]) <= precision &&
                abs(a[7] - b[7]) <= precision &&
                abs(a[8] - b[8]) <= precision);
    },

    m33MulM43 : function m33MulM43Fn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        var a4 = a[4];
        var a5 = a[5];
        var a6 = a[6];
        var a7 = a[7];
        var a8 = a[8];

        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        var b4 = b[4];
        var b5 = b[5];
        var b6 = b[6];
        var b7 = b[7];
        var b8 = b[8];

        dst[0] = b0 * a0 + b3 * a1 + b6 * a2;
        dst[1] = b1 * a0 + b4 * a1 + b7 * a2;
        dst[2] = b2 * a0 + b5 * a1 + b8 * a2;

        dst[3] = b0 * a3 + b3 * a4 + b6 * a5;
        dst[4] = b1 * a3 + b4 * a4 + b7 * a5;
        dst[5] = b2 * a3 + b5 * a4 + b8 * a5;

        dst[6] = b0 * a6 + b3 * a7 + b6 * a8;
        dst[7] = b1 * a6 + b4 * a7 + b7 * a8;
        dst[8] = b2 * a6 + b5 * a7 + b8 * a8;

        dst[9] = b[9];
        dst[10] = b[10];
        dst[11] = b[11];

        return dst;
    },

    m33MulM44 : function m33MulM44Fn(a, b, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];
        var b9  = b[9];
        var b10 = b[10];
        var b11 = b[11];


        dst[0] = b0 * a0 + b4 * a1 + b8  * a2;
        dst[1] = b1 * a0 + b5 * a1 + b9  * a2;
        dst[2] = b2 * a0 + b6 * a1 + b10 * a2;
        dst[3] = b3 * a0 + b7 * a1 + b11 * a2;

        dst[4] = b0 * a3 + b4 * a4 + b8  * a5;
        dst[5] = b1 * a3 + b5 * a4 + b9  * a5;
        dst[6] = b2 * a3 + b6 * a4 + b10 * a5;
        dst[7] = b3 * a3 + b7 * a4 + b11 * a5;

        dst[8] = b0 * a6 + b4 * a7 + b8  * a8;
        dst[9] = b1 * a6 + b5 * a7 + b9  * a8;
        dst[10] = b2 * a6 + b6 * a7 + b10 * a8;
        dst[11] = b3 * a6 + b7 * a7 + b11 * a8;

        dst[12] = b[12];
        dst[13] = b[13];
        dst[14] = b[14];
        dst[15] = b[15];

        return dst;
    },

    // Matrix3 operations with scalar
    m33ScalarAdd : function m33ScalarAddFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }
        for (var n = 0; n < 9; n += 1)
        {
            dst[n] = (m[n] + s);
        }
        return dst;
    },

    m33ScalarSub : function m33ScalarSubFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }
        for (var n = 0; n < 9; n += 1)
        {
            dst[n] = (m[n] - s);
        }
        return dst;
    },

    m33ScalarMul : function m33ScalarMulFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(9);
        }

        for (var n = 0; n < 9; n += 1)
        {
            dst[n] = (m[n] * s);
        }

        return dst;
    },

    // Matrix34
    m34BuildIdentity : function m34BuildIdentityFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        dst[0] = 1.0;
        dst[5] = 1.0;
        dst[10] = 1.0;
        return dst;
    },

    m34Pos : function m34PosFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[3];
        dst[1] = m[7];
        dst[2] = m[11];
        return dst;
    },

    m34Scale : function m34ScaleFn(m, scale, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var sx = scale[0];
        var sy = scale[1];
        var sz = scale[2];

        dst[0] = m[0] * sx;
        dst[1] = m[1] * sx;
        dst[2] = m[2] * sx;
        dst[3] = m[3];

        dst[4] = m[4] * sy;
        dst[5] = m[5] * sy;
        dst[6] = m[6] * sy;
        dst[7] = m[7];

        dst[8] = m[8] * sz;
        dst[9] = m[9] * sz;
        dst[10] = m[10] * sz;
        dst[11] = m[11];

        return dst;
    },

    // Matrix43
    m43BuildIdentity : function m43BuildIdentityFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        dst[0] = 1.0;
        dst[1] = 0.0;
        dst[2] = 0.0;
        dst[3] = 0.0;
        dst[4] = 1.0;
        dst[5] = 0.0;
        dst[6] = 0.0;
        dst[7] = 0.0;
        dst[8] = 1.0;
        dst[9] = 0.0;
        dst[10] = 0.0;
        dst[11] = 0.0;
        return dst;
    },

    m43Build : function m43BuildFn(r, u, a, p, dst)
    {
        var length = arguments.length;
        if (length >= 12)
        {
            // Can NOT use dst because it will overwrite the input value...
            var res;

            if (length > 12)
            {
                res = arguments[12];
                if (res === undefined)
                {
                    res = new VMathArrayConstructor(12);
                }
            }
            else
            {
                res = new VMathArrayConstructor(12);
            }

            res[0] = arguments[0];
            res[1] = arguments[1];
            res[2] = arguments[2];
            res[3] = arguments[3];
            res[4] = arguments[4];
            res[5] = arguments[5];
            res[6] = arguments[6];
            res[7] = arguments[7];
            res[8] = arguments[8];
            res[9] = arguments[9];
            res[10] = arguments[10];
            res[11] = arguments[11];

            return res;
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(12);
            }

            dst[0] = r[0];
            dst[1] = r[1];
            dst[2] = r[2];
            dst[3] = u[0];
            dst[4] = u[1];
            dst[5] = u[2];
            dst[6] = a[0];
            dst[7] = a[1];
            dst[8] = a[2];
            dst[9] = p[0];
            dst[10] = p[1];
            dst[11] = p[2];

            return dst;
        }
    },

    m43BuildTranslation : function m43BuildTranslationFn(p, dst)
    {
        // Can NOT use p or dst because it will overwrite the input value...
        var res, a;

        var length = arguments.length;
        if (length >= 3)
        {
            a = arguments;
            if (length === 4)
            {
                res = arguments[3];
            }
        }
        else
        {
            a = p;
            res = dst;
        }

        if (res === undefined)
        {
            res = new VMathArrayConstructor(12);
        }

        res[0] = 1;
        res[1] = 0;
        res[2] = 0;
        res[3] = 0;
        res[4] = 1;
        res[5] = 0;
        res[6] = 0;
        res[7] = 0;
        res[8] = 1;
        res[9] = a[0];
        res[10] = a[1];
        res[11] = a[2];

        return res;
    },

    m43Copy : function m43CopyFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];

        return dst;
    },

    m43FromM33V3: function m43FromM33V3Fn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[8] = m[8];
        dst[9] = v[0];
        dst[10] = v[1];
        dst[11] = v[2];

        return dst;
    },

    m43FromAxisRotation : function m43FromAxisRotationFn(axis, angle, dst)
    {
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] = tx * axisX + c;
        dst[1] = tx * axisY - sz;
        dst[2] = tx * axisZ + sy;

        dst[3] = ty * axisX + sz;
        dst[4] = ty * axisY + c;
        dst[5] = ty * axisZ - sx;

        dst[6] = tz * axisX - sy;
        dst[7] = tz * axisY + sx;
        dst[8] = tz * axisZ + c;

        dst[9] = 0.0;
        dst[10] = 0.0;
        dst[11] = 0.0;

        return dst;
    },

    m43FromQuatPos : function m43FromQuatPosFn(qp, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var qx = qp[0];
        var qy = qp[1];
        var qz = qp[2];
        var qw = qp[3];
        var px = qp[4];
        var py = qp[5];
        var pz = qp[6];

        var xx = 2.0 * qx * qx;
        var yy = 2.0 * qy * qy;
        var zz = 2.0 * qz * qz;
        var xy = 2.0 * qx * qy;
        var zw = 2.0 * qz * qw;
        var xz = 2.0 * qx * qz;
        var yw = 2.0 * qy * qw;
        var yz = 2.0 * qy * qz;
        var xw = 2.0 * qx * qw;

        dst[0] = 1.0 - yy - zz;
        dst[1] = xy - zw;
        dst[2] = xz + yw;

        dst[3] = xy + zw;
        dst[4] = 1.0 - xx - zz;
        dst[5] = yz - xw;

        dst[6] = xz - yw;
        dst[7] = yz + xw;
        dst[8] = 1.0 - xx - yy;

        dst[9] = px;
        dst[10] = py;
        dst[11] = pz;

        return dst;
    },

    m43FromRTS : function m43FromRTSFn(quat, pos, scale, dst)
    {
        var qx = quat[0];
        var qy = quat[1];
        var qz = quat[2];
        var qw = quat[3];

        var xx = (2.0 * qx * qx);
        var yy = (2.0 * qy * qy);
        var zz = (2.0 * qz * qz);
        var xy = (2.0 * qx * qy);
        var zw = (2.0 * qz * qw);
        var xz = (2.0 * qx * qz);
        var yw = (2.0 * qy * qw);
        var yz = (2.0 * qy * qz);
        var xw = (2.0 * qx * qw);

        var sx = scale[0];
        var sy = scale[1];
        var sz = scale[2];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] = sx * (1.0 - yy - zz);
        dst[1] = sx * (xy - zw);
        dst[2] = sx * (xz + yw);
        dst[3] = sy * (xy + zw);
        dst[4] = sy * (1.0 - xx - zz);
        dst[5] = sy * (yz - xw);
        dst[6] = sz * (xz - yw);
        dst[7] = sz * (yz + xw);
        dst[8] = sz * (1.0 - xx - yy);
        dst[9]  = pos[0];
        dst[10] = pos[1];
        dst[11] = pos[2];

        return dst;
    },

    m43FromRT : function m43FromRTFn(quat, pos, dst)
    {
        var qx = quat[0];
        var qy = quat[1];
        var qz = quat[2];
        var qw = quat[3];

        var xx = (2.0 * qx * qx);
        var yy = (2.0 * qy * qy);
        var zz = (2.0 * qz * qz);
        var xy = (2.0 * qx * qy);
        var zw = (2.0 * qz * qw);
        var xz = (2.0 * qx * qz);
        var yw = (2.0 * qy * qw);
        var yz = (2.0 * qy * qz);
        var xw = (2.0 * qx * qw);

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] =  1.0 - yy - zz;
        dst[1] =  xy - zw;
        dst[2] =  xz + yw;
        dst[3] =  xy + zw;
        dst[4] =  1.0 - xx - zz;
        dst[5] =  yz - xw;
        dst[6] =  xz - yw;
        dst[7] =  yz + xw;
        dst[8] =  1.0 - xx - yy;
        dst[9]  = pos[0];
        dst[10] = pos[1];
        dst[11] = pos[2];

        return dst;
    },

    m43Right : function m43RightFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        return dst;
    },

    m43Up : function m43UpFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[3];
        dst[1] = m[4];
        dst[2] = m[5];
        return dst;
    },

    m43At : function m43AtFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[6];
        dst[1] = m[7];
        dst[2] = m[8];
        return dst;
    },

    m43Pos : function m43PosFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = m[9];
        dst[1] = m[10];
        dst[2] = m[11];
        return dst;
    },

    m43SetRight : function m43SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
    },

    m43SetUp : function m43SetUpFn(m, v)
    {
        m[3] = v[0];
        m[4] = v[1];
        m[5] = v[2];
    },

    m43SetAt : function m43SetAtFn(m, v)
    {
        m[6] = v[0];
        m[7] = v[1];
        m[8] = v[2];
    },

    m43SetPos : function m43SetPosFn(m, v)
    {
        m[9] = v[0];
        m[10] = v[1];
        m[11] = v[2];
    },

    m43SetAxisRotation : function m43SetAxisRotationFn(m, axis, angle)
    {
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var t = 1.0 - c;
        var axisX = axis[0];
        var axisY = axis[1];
        var axisZ = axis[2];
        var tx = t * axisX;
        var ty = t * axisY;
        var tz = t * axisZ;
        var sx = s * axisX;
        var sy = s * axisY;
        var sz = s * axisZ;
        m[0] = tx * axisX + c;
        m[1] = tx * axisY - sz;
        m[2] = tx * axisZ + sy;
        m[3] = ty * axisX + sz;
        m[4] = ty * axisY + c;
        m[5] = ty * axisZ - sx;
        m[6] = tz * axisX - sy;
        m[7] = tz * axisY + sx;
        m[8] = tz * axisZ + c;
    },

    m43InverseOrthonormal : function m43InverseOrthonormalFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var px = m[9];
        var py = m[10];
        var pz = m[11];
        dst[0] = m0;
        dst[1] = m3;
        dst[2] = m6;
        dst[3] = m1;
        dst[4] = m4;
        dst[5] = m7;
        dst[6] = m2;
        dst[7] = m5;
        dst[8] = m8;
        dst[9]  = -((px * m0) + (py * m1) + (pz * m2));
        dst[10] = -((px * m3) + (py * m4) + (pz * m5));
        dst[11] = -((px * m6) + (py * m7) + (pz * m8));
        return dst;
    },

    m43Orthonormalize : function m43OrthonormalizeFn(m, dst)
    {
        var normalize = VMath.v3Normalize;
        var length    = VMath.v3Length;
        var dot       = VMath.v3Dot;
        var cross     = VMath.v3Cross;
        var abs       = Math.abs;

        var right = VMath.m43Right(m);
        var up    = VMath.m43Up(m);
        var at    = VMath.m43At(m);
        var pos   = VMath.m43Pos(m);

        var innerX = length(right);
        var innerY = length(up);
        var innerZ = length(at);

        normalize(right, right);
        normalize(up, up);
        normalize(at, at);

        var vpU, vpV, vpW;
        if (innerX > 0.0)
        {
            if (innerY > 0.0)
            {
                if (innerZ > 0.0)
                {
                    var outerX = abs(dot(up, at));
                    var outerY = abs(dot(at, right));
                    var outerZ = abs(dot(right, up));
                    if (outerX < outerY)
                    {
                        if (outerX < outerZ)
                        {
                            vpU = up;
                            vpV = at;
                            vpW = right;
                        }
                        else
                        {
                            vpU = right;
                            vpV = up;
                            vpW = at;
                        }
                    }
                    else
                    {
                        if (outerY < outerZ)
                        {
                            vpU = at;
                            vpV = right;
                            vpW = up;
                        }
                        else
                        {
                            vpU = right;
                            vpV = up;
                            vpW = at;
                        }
                    }
                }
                else
                {
                    vpU = right;
                    vpV = up;
                    vpW = at;
                }
            }
            else
            {
                vpU = at;
                vpV = right;
                vpW = up;
            }
        }
        else
        {
            vpU = up;
            vpV = at;
            vpW = right;
        }

        cross(vpU, vpV, vpW);
        normalize(vpW, vpW);

        cross(vpW, vpU, vpV);
        normalize(vpV, vpV);

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] = right[0];
        dst[1] = right[1];
        dst[2] = right[2];
        dst[3] = up[0];
        dst[4] = up[1];
        dst[5] = up[2];
        dst[6] = at[0];
        dst[7] = at[1];
        dst[8] = at[2];
        dst[9] = pos[0];
        dst[10] = pos[1];
        dst[11] = pos[2];

        return dst;
    },

    m43Determinant : function m43DeterminantFn(m)
    {
        return (m[0] * (m[4] * m[8] - m[5] * m[7]) +
                m[1] * (m[5] * m[6] - m[3] * m[8]) +
                m[2] * (m[3] * m[7] - m[4] * m[6]));
    },

    m43Inverse : function m43InverseFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        var det = (m0 * (m4 * m8 - m5 * m7) +
                   m1 * (m5 * m6 - m3 * m8) +
                   m2 * (m3 * m7 - m4 * m6));
        if (det === 0.0)
        {
            return dst;
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(12);
            }
            var detrecp = 1.0 / det;
            dst[0] = ((m4 * m8 + m5 * (-m7)) * detrecp);
            dst[1] = ((m7 * m2 + m8 * (-m1)) * detrecp);
            dst[2] = ((m1 * m5 - m2 *   m4)  * detrecp);
            dst[3] = ((m5 * m6 + m3 * (-m8)) * detrecp);
            dst[4] = ((m8 * m0 + m6 * (-m2)) * detrecp);
            dst[5] = ((m3 * m2 - m0 *   m5)  * detrecp);
            dst[6] = ((m3 * m7 + m4 * (-m6)) * detrecp);
            dst[7] = ((m6 * m1 + m7 * (-m0)) * detrecp);
            dst[8] = ((m0 * m4 - m3 *   m1)  * detrecp);
            dst[9]  = ((m3 * (m10 * m8  - m7 * m11) + m4  * (m6 * m11 - m9 * m8) + m5  * (m9 * m7 - m6 * m10)) * detrecp);
            dst[10] = ((m6 * (m2  * m10 - m1 * m11) + m7  * (m0 * m11 - m9 * m2) + m8  * (m9 * m1 - m0 * m10)) * detrecp);
            dst[11] = ((m9 * (m2  * m4  - m1 * m5)  + m10 * (m0 * m5  - m3 * m2) + m11 * (m3 * m1 - m0 * m4))  * detrecp);
            return dst;
        }
    },

    m43Translate : function m43TranslateFn(matrix, pos)
    {
        matrix[9]  += pos[0];
        matrix[10] += pos[1];
        matrix[11] += pos[2];
    },

    m43Scale : function m43ScaleFn(m, scale, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var sx = scale[0];
        var sy = scale[1];
        var sz = scale[2];

        dst[0] = m[0] * sx;
        dst[1] = m[1] * sx;
        dst[2] = m[2] * sx;
        dst[3] = m[3] * sy;
        dst[4] = m[4] * sy;
        dst[5] = m[5] * sy;
        dst[6] = m[6] * sz;
        dst[7] = m[7] * sz;
        dst[8] = m[8] * sz;
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];

        return dst;
    },

    m43TransformVector : function m43TransformVectorFn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        dst[0] = (m[0] * v0 + m[3] * v1 + m[6] * v2);
        dst[1] = (m[1] * v0 + m[4] * v1 + m[7] * v2);
        dst[2] = (m[2] * v0 + m[5] * v1 + m[8] * v2);
        return dst;
    },

    m43TransformPoint : function m43TransformPointFn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        dst[0] = (m[0] * v0 + m[3] * v1 + m[6] * v2 + m[9]);
        dst[1] = (m[1] * v0 + m[4] * v1 + m[7] * v2 + m[10]);
        dst[2] = (m[2] * v0 + m[5] * v1 + m[8] * v2 + m[11]);
        return dst;
    },

    m43Mul : function m43MulFn(a, b, dst)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];
        var a9  = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] =  (b0 * a0 + b3 * a1 + b6 * a2);
        dst[1] =  (b1 * a0 + b4 * a1 + b7 * a2);
        dst[2] =  (b2 * a0 + b5 * a1 + b8 * a2);
        dst[3] =  (b0 * a3 + b3 * a4 + b6 * a5);
        dst[4] =  (b1 * a3 + b4 * a4 + b7 * a5);
        dst[5] =  (b2 * a3 + b5 * a4 + b8 * a5);
        dst[6] =  (b0 * a6 + b3 * a7 + b6 * a8);
        dst[7] =  (b1 * a6 + b4 * a7 + b7 * a8);
        dst[8] =  (b2 * a6 + b5 * a7 + b8 * a8);
        dst[9]  = (b0 * a9 + b3 * a10 + b6 * a11 + b[9]);
        dst[10] = (b1 * a9 + b4 * a10 + b7 * a11 + b[10]);
        dst[11] = (b2 * a9 + b5 * a10 + b8 * a11 + b[11]);

        return dst;
    },

    m43MulM44 : function m43MulM44Fn(a, b, dst)
    {
        var a0  = a[0];
        var a1  = a[1];
        var a2  = a[2];
        var a3  = a[3];
        var a4  = a[4];
        var a5  = a[5];
        var a6  = a[6];
        var a7  = a[7];
        var a8  = a[8];
        var a9  = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0  = b[0];
        var b1  = b[1];
        var b2  = b[2];
        var b3  = b[3];
        var b4  = b[4];
        var b5  = b[5];
        var b6  = b[6];
        var b7  = b[7];
        var b8  = b[8];
        var b9  = b[9];
        var b10 = b[10];
        var b11 = b[11];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        dst[0] =  (b0 * a0 + b4 * a1 + b8  * a2);
        dst[1] =  (b1 * a0 + b5 * a1 + b9  * a2);
        dst[2] =  (b2 * a0 + b6 * a1 + b10 * a2);
        dst[3] =  (b3 * a0 + b7 * a1 + b11 * a2);
        dst[4] =  (b0 * a3 + b4 * a4 + b8  * a5);
        dst[5] =  (b1 * a3 + b5 * a4 + b9  * a5);
        dst[6] =  (b2 * a3 + b6 * a4 + b10 * a5);
        dst[7] =  (b3 * a3 + b7 * a4 + b11 * a5);
        dst[8] =  (b0 * a6 + b4 * a7 + b8  * a8);
        dst[9]  = (b1 * a6 + b5 * a7 + b9  * a8);
        dst[10] = (b2 * a6 + b6 * a7 + b10 * a8);
        dst[11] = (b3 * a6 + b7 * a7 + b11 * a8);
        dst[12] = (b0 * a9 + b4 * a10 + b8  * a11 + b[12]);
        dst[13] = (b1 * a9 + b5 * a10 + b9  * a11 + b[13]);
        dst[14] = (b2 * a9 + b6 * a10 + b10 * a11 + b[14]);
        dst[15] = (b3 * a9 + b7 * a10 + b11 * a11 + b[15]);

        return dst;
    },

    m43Transpose : function m43TransposeFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        dst[0] =  m0;
        dst[1] =  m3;
        dst[2] =  m6;
        dst[3] =  m9;
        dst[4] =  m1;
        dst[5] =  m4;
        dst[6] =  m7;
        dst[7] =  m10;
        dst[8] =  m2;
        dst[9]  = m5;
        dst[10] = m8;
        dst[11] = m11;

        return dst;
    },

    m43MulTranspose: function m43MulTransposeFn(a, b, dst)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        var a4 = a[4];
        var a5 = a[5];
        var a6 = a[6];
        var a7 = a[7];
        var a8 = a[8];
        var a9 = a[9];
        var a10 = a[10];
        var a11 = a[11];

        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        var b4 = b[4];
        var b5 = b[5];
        var b6 = b[6];
        var b7 = b[7];
        var b8 = b[8];
        var b9 = b[9];
        var b10 = b[10];
        var b11 = b[11];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        dst[0] =  (b0 * a0 + b3 * a1 + b6 * a2);
        dst[1] =  (b0 * a3 + b3 * a4 + b6 * a5);
        dst[2] =  (b0 * a6 + b3 * a7 + b6 * a8);
        dst[3] =  (b0 * a9 + b3 * a10 + b6 * a11 + b9);
        dst[4] =  (b1 * a0 + b4 * a1 + b7 * a2);
        dst[5] =  (b1 * a3 + b4 * a4 + b7 * a5);
        dst[6] =  (b1 * a6 + b4 * a7 + b7 * a8);
        dst[7] =  (b1 * a9 + b4 * a10 + b7 * a11 + b10);
        dst[8] =  (b2 * a0 + b5 * a1 + b8 * a2);
        dst[9]  = (b2 * a3 + b5 * a4 + b8 * a5);
        dst[10] = (b2 * a6 + b5 * a7 + b8 * a8);
        dst[11] = (b2 * a9 + b5 * a10 + b8 * a11 + b11);

        return dst;
    },

    m43Offset: function m43OffsetFn(m, o, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        var o0 = o[0];
        var o1 = o[1];
        var o2 = o[2];

        dst[0] =  m0;
        dst[1] =  m1;
        dst[2] =  m2;
        dst[3] =  m3;
        dst[4] =  m4;
        dst[5] =  m5;
        dst[6] =  m6;
        dst[7] =  m7;
        dst[8] =  m8;
        dst[9]  = (m0 * o0 + m3 * o1 + m6 * o2 + m9);
        dst[10] = (m1 * o0 + m4 * o1 + m7 * o2 + m10);
        dst[11] = (m2 * o0 + m5 * o1 + m8 * o2 + m11);

        return dst;
    },

    m43NegOffset: function m43NegOffsetFn(m, o, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];

        var o0 = -o[0];
        var o1 = -o[1];
        var o2 = -o[2];

        dst[0] =  m0;
        dst[1] =  m1;
        dst[2] =  m2;
        dst[3] =  m3;
        dst[4] =  m4;
        dst[5] =  m5;
        dst[6] =  m6;
        dst[7] =  m7;
        dst[8] =  m8;
        dst[9]  = (m0 * o0 + m3 * o1 + m6 * o2 + m9);
        dst[10] = (m1 * o0 + m4 * o1 + m7 * o2 + m10);
        dst[11] = (m2 * o0 + m5 * o1 + m8 * o2 + m11);

        return dst;
    },

    m43InverseTransposeProjection: function m43InverseTransposeProjectionFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }

        var xf = (0.5 / s[0]);
        var yf = (0.5 / s[1]);
        var zf = (0.5 / s[2]);
        var m0 = (m[0] * xf);
        var m1 = (m[1] * xf);
        var m2 = (m[2] * xf);
        var m3 = (m[3] * yf);
        var m4 = (m[4] * yf);
        var m5 = (m[5] * yf);
        var m6 = (m[6] * zf);
        var m7 = (m[7] * zf);
        var m8 = (m[8] * zf);
        var px = m[9];
        var py = m[10];
        var pz = m[11];

        dst[0] =  m0;
        dst[1] =  m1;
        dst[2] =  m2;
        dst[3] =  (0.5 - ((px * m0) + (py * m1) + (pz * m2)));
        dst[4] =  m3;
        dst[5] =  m4;
        dst[6] =  m5;
        dst[7] =  (0.5 - ((px * m3) + (py * m4) + (pz * m5)));
        dst[8] =  m6;
        dst[9]  = m7;
        dst[10] = m8;
        dst[11] = (0.5 - ((px * m6) + (py * m7) + (pz * m8)));

        return dst;
    },

    // Matrix 43 opeations with scalar
    m43ScalarAdd : function m43ScalarAddFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        for (var n = 0; n < 12; n += 1)
        {
            dst[n] = (m[n] + s);
        }
        return dst;
    },

    m43ScalarSub : function m43ScalarSubFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        for (var n = 0; n < 12; n += 1)
        {
            dst[n] = (m[n] - s);
        }
        return dst;
    },

    m43ScalarMul : function m43ScalarMulFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(12);
        }
        for (var n = 0; n < 12; n += 1)
        {
            dst[n] = (m[n] * s);
        }
        return dst;
    },

    // Matrix44
    m44BuildIdentity : function m44BuildIdentityFn(dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        dst[0] =  1.0;
        dst[1] =  0.0;
        dst[2] =  0.0;
        dst[3] =  0.0;
        dst[4] =  0.0;
        dst[5] =  1.0;
        dst[6] =  0.0;
        dst[7] =  0.0;
        dst[8] =  0.0;
        dst[9] =  0.0;
        dst[10] = 1.0;
        dst[11] = 0.0;
        dst[12] = 0.0;
        dst[13] = 0.0;
        dst[14] = 0.0;
        dst[15] = 1.0;

        return dst;
    },

    m44Build : function m44BuildFn(r, u, a, p, dst)
    {
        var length = arguments.length;
        if (length >= 16)
        {
            // Can NOT use dst because it will overwrite the input value...
            var res;

            if (length > 16)
            {
                res = arguments[16];
                if (res === undefined)
                {
                    res = new VMathArrayConstructor(16);
                }
            }
            else
            {
                res = new VMathArrayConstructor(16);
            }

            res[0] =  arguments[0];
            res[1] =  arguments[1];
            res[2] =  arguments[2];
            res[3] =  arguments[3];
            res[4] =  arguments[4];
            res[5] =  arguments[5];
            res[6] =  arguments[6];
            res[7] =  arguments[7];
            res[8] =  arguments[8];
            res[9] =  arguments[9];
            res[10] = arguments[10];
            res[11] = arguments[11];
            res[12] = arguments[12];
            res[13] = arguments[13];
            res[14] = arguments[14];
            res[15] = arguments[15];

            return res;
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(16);
            }

            dst[0] =  r[0];
            dst[1] =  r[1];
            dst[2] =  r[2];
            dst[3] =  r[3];
            dst[4] =  u[0];
            dst[5] =  u[1];
            dst[6] =  u[2];
            dst[7] =  u[3];
            dst[8] =  a[0];
            dst[9] =  a[1];
            dst[10] = a[2];
            dst[11] = a[3];
            dst[12] = p[0];
            dst[13] = p[1];
            dst[14] = p[2];
            dst[15] = p[3];

            return dst;
        }
    },

    m44Copy : function m44CopyFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        dst[0] =  m[0];
        dst[1] =  m[1];
        dst[2] =  m[2];
        dst[3] =  m[3];
        dst[4] =  m[4];
        dst[5] =  m[5];
        dst[6] =  m[6];
        dst[7] =  m[7];
        dst[8] =  m[8];
        dst[9] =  m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];

        return dst;
    },

    m44Right : function m44RightFn(m, dst)
    {
        if (dst === undefined)
        {
            return m.slice(0, 4);
        }

        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        return dst;
    },

    m44Up : function m44UpFn(m, dst)
    {
        if (dst === undefined)
        {
            return m.slice(4, 8);
        }

        dst[0] = m[4];
        dst[1] = m[5];
        dst[2] = m[6];
        dst[3] = m[7];
        return dst;
    },

    m44At : function m44AtFn(m, dst)
    {
        if (dst === undefined)
        {
            return m.slice(8, 12);
        }

        dst[0] = m[8];
        dst[1] = m[9];
        dst[2] = m[10];
        dst[3] = m[11];
        return dst;
    },

    m44Pos : function m44PosFn(m, dst)
    {
        if (dst === undefined)
        {
            return m.slice(12);
        }

        dst[0] = m[12];
        dst[1] = m[13];
        dst[2] = m[14];
        dst[3] = m[15];
        return dst;
    },

    m44SetRight : function m44SetRightFn(m, v)
    {
        m[0] = v[0];
        m[1] = v[1];
        m[2] = v[2];
        m[3] = v[3];
    },

    m44SetUp : function m44SetUpFn(m, v)
    {
        m[4] = v[0];
        m[5] = v[1];
        m[6] = v[2];
        m[7] = v[3];
    },

    m44SetAt : function m44SetAtFn(m, v)
    {
        m[8] = v[0];
        m[9] = v[1];
        m[10] = v[2];
        m[11] = v[3];
    },

    m44SetPos : function m44SetPosFn(m, v)
    {
        m[12] = v[0];
        m[13] = v[1];
        m[14] = v[2];
        m[15] = v[3];
    },

    m44Translate : function m44TranslateFn(m, v)
    {
        m[12] += v[0];
        m[13] += v[1];
        m[14] += v[2];
        m[15] += v[3];
    },

    m44Scale : function m44ScaleFn(m, scale, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        /*jshint white: false */
        dst[0] =  m[0]  * scale[0];
        dst[1] =  m[1]  * scale[0];
        dst[2] =  m[2]  * scale[0];
        dst[3] =  m[3];
        dst[4] =  m[4]  * scale[1];
        dst[5] =  m[5]  * scale[1];
        dst[6] =  m[6]  * scale[1];
        dst[7] =  m[7];
        dst[8] =  m[8]  * scale[2];
        dst[9] =  m[9]  * scale[2];
        dst[10] = m[10] * scale[2];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
        /*jshint white: true */

        return dst;
    },

    m44Transform : function m44TransformFn(m, v, dst)
    {
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        var v3 = v[3];
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        if (v3 !== 1.0)
        {
            dst[0] = ((m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + (m[12] * v3));
            dst[1] = ((m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + (m[13] * v3));
            dst[2] = ((m[2] * v0) + (m[6] * v1) + (m[10] * v2) + (m[14] * v3));
            dst[3] = ((m[3] * v0) + (m[7] * v1) + (m[11] * v2) + (m[15] * v3));
        }
        else
        {
            dst[0] = ((m[0] * v0) + (m[4] * v1) + (m[8]  * v2) + m[12]);
            dst[1] = ((m[1] * v0) + (m[5] * v1) + (m[9]  * v2) + m[13]);
            dst[2] = ((m[2] * v0) + (m[6] * v1) + (m[10] * v2) + m[14]);
            dst[3] = ((m[3] * v0) + (m[7] * v1) + (m[11] * v2) + m[15]);
        }
        return dst;
    },

    m44Mul : function m44MulFn(a, b, dst)
    {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var a3 = a[3];
        var a4 = a[4];
        var a5 = a[5];
        var a6 = a[6];
        var a7 = a[7];
        var a8 = a[8];
        var a9 = a[9];
        var a10 = a[10];
        var a11 = a[11];
        var a12 = a[12];
        var a13 = a[13];
        var a14 = a[14];
        var a15 = a[15];

        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        var b4 = b[4];
        var b5 = b[5];
        var b6 = b[6];
        var b7 = b[7];
        var b8 = b[8];
        var b9 = b[9];
        var b10 = b[10];
        var b11 = b[11];
        var b12 = b[12];
        var b13 = b[13];
        var b14 = b[14];
        var b15 = b[15];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        dst[0] = (b0 * a0  + b4 * a1  + b8  * a2  + b12 * a3);
        dst[1] = (b1 * a0  + b5 * a1  + b9  * a2  + b13 * a3);
        dst[2] = (b2 * a0  + b6 * a1  + b10 * a2  + b14 * a3);
        dst[3] = (b3 * a0  + b7 * a1  + b11 * a2  + b15 * a3);
        dst[4] = (b0 * a4  + b4 * a5  + b8  * a6  + b12 * a7);
        dst[5] = (b1 * a4  + b5 * a5  + b9  * a6  + b13 * a7);
        dst[6] = (b2 * a4  + b6 * a5  + b10 * a6  + b14 * a7);
        dst[7] = (b3 * a4  + b7 * a5  + b11 * a6  + b15 * a7);
        dst[8] = (b0 * a8  + b4 * a9  + b8  * a10 + b12 * a11);
        dst[9] = (b1 * a8  + b5 * a9  + b9  * a10 + b13 * a11);
        dst[10] = (b2 * a8  + b6 * a9  + b10 * a10 + b14 * a11);
        dst[11] = (b3 * a8  + b7 * a9  + b11 * a10 + b15 * a11);
        dst[12] = (b0 * a12 + b4 * a13 + b8  * a14 + b12 * a15);
        dst[13] = (b1 * a12 + b5 * a13 + b9  * a14 + b13 * a15);
        dst[14] = (b2 * a12 + b6 * a13 + b10 * a14 + b14 * a15);
        dst[15] = (b3 * a12 + b7 * a13 + b11 * a14 + b15 * a15);

        return dst;
    },

    m44Inverse : function m44InverseFn(m, dst)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];
        var m9 = m[9];
        var m10 = m[10];
        var m11 = m[11];
        var m12 = m[12];
        var m13 = m[13];
        var m14 = m[14];
        var m15 = m[15];

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        /*jshint white: false */
        var A0 = (( m0 *  m5) - ( m1 *  m4));
        var A1 = (( m0 *  m6) - ( m2 *  m4));
        var A2 = (( m0 *  m7) - ( m3 *  m4));
        var A3 = (( m1 *  m6) - ( m2 *  m5));
        var A4 = (( m1 *  m7) - ( m3 *  m5));
        var A5 = (( m2 *  m7) - ( m3 *  m6));
        var B0 = (( m8 * m13) - ( m9 * m12));
        var B1 = (( m8 * m14) - (m10 * m12));
        var B2 = (( m8 * m15) - (m11 * m12));
        var B3 = (( m9 * m14) - (m10 * m13));
        var B4 = (( m9 * m15) - (m11 * m13));
        var B5 = ((m10 * m15) - (m11 * m14));
        /*jshint white: true */

        var det = ((A0 * B5) - (A1 * B4) + (A2 * B3) + (A3 * B2) - (A4 * B1) + (A5 * B0));
        if (det === 0.0)
        {
            /*jshint white: false */
            dst[ 0] = 0.0;
            dst[ 1] = 0.0;
            dst[ 2] = 0.0;
            dst[ 3] = 0.0;
            dst[ 4] = 0.0;
            dst[ 5] = 0.0;
            dst[ 6] = 0.0;
            dst[ 7] = 0.0;
            dst[ 8] = 0.0;
            dst[ 9] = 0.0;
            dst[10] = 0.0;
            dst[11] = 0.0;
            dst[12] = 0.0;
            dst[13] = 0.0;
            dst[14] = 0.0;
            dst[15] = 0.0;
            /*jshint white: true */
        }
        else
        {
            var detrecp = 1.0 / det;
            /*jshint white: false */
            dst[ 0] = (+ ( m5 * B5) - ( m6 * B4) + ( m7 * B3)) * detrecp;
            dst[ 4] = (- ( m4 * B5) + ( m6 * B2) - ( m7 * B1)) * detrecp;
            dst[ 8] = (+ ( m4 * B4) - ( m5 * B2) + ( m7 * B0)) * detrecp;
            dst[12] = (- ( m4 * B3) + ( m5 * B1) - ( m6 * B0)) * detrecp;
            dst[ 1] = (- ( m1 * B5) + ( m2 * B4) - ( m3 * B3)) * detrecp;
            dst[ 5] = (+ ( m0 * B5) - ( m2 * B2) + ( m3 * B1)) * detrecp;
            dst[ 9] = (- ( m0 * B4) + ( m1 * B2) - ( m3 * B0)) * detrecp;
            dst[13] = (+ ( m0 * B3) - ( m1 * B1) + ( m2 * B0)) * detrecp;
            dst[ 2] = (+ (m13 * A5) - (m14 * A4) + (m15 * A3)) * detrecp;
            dst[ 6] = (- (m12 * A5) + (m14 * A2) - (m15 * A1)) * detrecp;
            dst[10] = (+ (m12 * A4) - (m13 * A2) + (m15 * A0)) * detrecp;
            dst[14] = (- (m12 * A3) + (m13 * A1) - (m14 * A0)) * detrecp;
            dst[ 3] = (- ( m9 * A5) + (m10 * A4) - (m11 * A3)) * detrecp;
            dst[ 7] = (+ ( m8 * A5) - (m10 * A2) + (m11 * A1)) * detrecp;
            dst[11] = (- ( m8 * A4) + ( m9 * A2) - (m11 * A0)) * detrecp;
            dst[15] = (+ ( m8 * A3) - ( m9 * A1) + (m10 * A0)) * detrecp;
            /*jsline white: true */
        }

        return dst;
    },

    m44Transpose : function m44TransposeFn(m, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }

        dst[0] = m[0];
        dst[1] = m[4];
        dst[2] = m[8];
        dst[3] = m[12];
        dst[4] = m[1];
        dst[5] = m[5];
        dst[6] = m[9];
        dst[7] = m[13];
        dst[8] = m[2];
        dst[9] = m[6];
        dst[10] = m[10];
        dst[11] = m[14];
        dst[12] = m[3];
        dst[13] = m[7];
        dst[14] = m[11];
        dst[15] = m[15];

        return dst;
    },

    // Matrix44 operations with scalars
    m44ScalarAdd : function m44ScalarAddFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }
        for (var n = 0; n < 16; n += 1)
        {
            dst[n] = (m[n] + s);
        }
        return dst;
    },

    m44ScalarSub : function m44ScalarSubFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }
        for (var n = 0; n < 16; n += 1)
        {
            dst[n] = (m[n] - s);
        }
        return dst;
    },

    m44ScalarMul : function m44ScalarMulFn(m, s, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(16);
        }
        for (var n = 0; n < 16; n += 1)
        {
            dst[n] = (m[n] * s);
        }
        return dst;
    },

    // Quaternion
    quatBuild : function quatBuildFn(x, y, z, w, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = x;
        dst[1] = y;
        dst[2] = z;
        dst[3] = w;
        return dst;
    },

    quatCopy : function quatCopyFn(src, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        return dst;
    },

    quatIsSimilar : function quatIsSimilarFn(q1, q2, precision)
    {
        if (precision === undefined)
        {
            precision = this.precision;
        }
        // this compares for similar rotations not raw data
        var q1temp = q1;

        if (q1[3] * q2[3] < 0.0)
        {
            // quaternions in opposing hemispheres, negate one
            q1temp = VMath.v4Neg(q1);
        }

        var mag_sqrd = VMath.v4LengthSq(VMath.v4Sub(q1temp, q2));
        var epsilon_sqrd = (precision * precision);
        return mag_sqrd < epsilon_sqrd;
    },

    quatLength : function quatLengthFn(q)
    {
        return VMath.v4Length(q);
    },

    quatDot : function quatDotFn(q1, q2)
    {
        return VMath.v4Dot(q1, q2);
    },

    quatMul : function quatMulFn(q1, q2, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        // Note quaternion multiplication is the opposite way around from our matrix multiplication
        //var v1 = q1; // use full quats to avoid copy
        //var v2 = q2;

        /*
        // Calculate the imaginary part
        var quat = VMath.v3Add3(VMath.v3ScalarMul(v2, q1[3]), VMath.v3ScalarMul(v1, q2[3]), VMath.v3Cross(v1, v2));
        // And extend with the real part
        quat[3] = (q1[3] * q2[3]) - VMath.v3Dot(v1, v2);
        */

        // Inlined from above
        var q2x = q1[0];
        var q2y = q1[1];
        var q2z = q1[2];
        var q2w = q1[3];
        var q1x = q2[0];
        var q1y = q2[1];
        var q1z = q2[2];
        var q1w = q2[3];

        var cx = (q1z * q2y) - (q1y * q2z);
        var cy = (q1x * q2z) - (q1z * q2x);
        var cz = (q1y * q2x) - (q1x * q2y);

        dst[0] = (q2x * q1w) + (q1x * q2w) + cx;
        dst[1] = (q2y * q1w) + (q1y * q2w) + cy;
        dst[2] = (q2z * q1w) + (q1z * q2w) + cz;
        dst[3] = (q1w * q2w) - (q1x * q2x + q1y * q2y + q1z * q2z);

        return dst;
    },

    quatMulTranslate : function quatMulTranslateFn(qa, va, qb, vb, qr, vr)
    {
        var qax = qa[0];
        var qay = qa[1];
        var qaz = qa[2];
        var qaw = qa[3];
        var qbx = qb[0];
        var qby = qb[1];
        var qbz = qb[2];
        var qbw = qb[3];

        // Multiply together the two quaternions
        var cx = (qaz * qby) - (qay * qbz);
        var cy = (qax * qbz) - (qaz * qbx);
        var cz = (qay * qbx) - (qax * qby);

        qr[0] = (qbx * qaw) + (qax * qbw) + cx;
        qr[1] = (qby * qaw) + (qay * qbw) + cy;
        qr[2] = (qbz * qaw) + (qaz * qbw) + cz;
        qr[3] = (qaw * qbw) - (qax * qbx + qay * qby + qaz * qbz);

        // Transform the 2nd vector by the first quaternion and add in the first position
        var vax = va[0];
        var vay = va[1];
        var vaz = va[2];
        var vbx = vb[0];
        var vby = vb[1];
        var vbz = vb[2];

        var s = (qaw * qaw) - (qax * qax + qay * qay + qaz * qaz);
        var rx = vbx * s;
        var ry = vby * s;
        var rz = vbz * s;

        s = qax * vbx + qay * vby + qaz * vbz;

        var twoS = s + s;
        rx += qax * twoS;
        ry += qay * twoS;
        rz += qaz * twoS;

        cx = (qaz * vby) - (qay * vbz);
        cy = (qax * vbz) - (qaz * vbx);
        cz = (qay * vbx) - (qax * vby);
        var twoQw = qaw + qaw;
        rx += cx * twoQw;
        ry += cy * twoQw;
        rz += cz * twoQw;

        vr[0] = rx + vax;
        vr[1] = ry + vay;
        vr[2] = rz + vaz;
    },

    quatNormalize : function quatNormalizeFn(q, dst)
    {
        var norme = VMath.quatDot(q, q);
        if (norme === 0.0)
        {
            return VMath.v4BuildZero(dst);
        }
        else
        {
            var recip = 1.0 / Math.sqrt(norme);
            return VMath.v4ScalarMul(q, recip, dst);
        }
    },

    quatConjugate : function quatConjugateFn(q, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = -q[0];
        dst[1] = -q[1];
        dst[2] = -q[2];
        dst[3] =  q[3];

        return dst;
    },

    quatLerp : function quatLerpFn(q1, q2, t, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var q1x = q1[0];
        var q1y = q1[1];
        var q1z = q1[2];
        var q1w = q1[3];
        var q2x = q2[0];
        var q2y = q2[1];
        var q2z = q2[2];
        var q2w = q2[3];

        dst[0] = ((q2x - q1x) * t) + q1x;
        dst[1] = ((q2y - q1y) * t) + q1y;
        dst[2] = ((q2z - q1z) * t) + q1z;
        dst[3] = ((q2w - q1w) * t) + q1w;

        return dst;
    },

    cosMinSlerpAngle : Math.cos(Math.PI / 40.0), // use a lerp for angles <= 4.5 degrees

    quatSlerp : function quatSlerpFn(q1, q2, t, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var q1x = q1[0];
        var q1y = q1[1];
        var q1z = q1[2];
        var q1w = q1[3];
        var q2x = q2[0];
        var q2y = q2[1];
        var q2z = q2[2];
        var q2w = q2[3];
        var dotq1q2 = (q1x * q2x) + (q1y * q2y) + (q1z * q2z) + (q1w * q2w);

        var cosom = dotq1q2;
        if (cosom < 0.0)
        {
            q1x = -q1x;
            q1y = -q1y;
            q1z = -q1z;
            q1w = -q1w;
            cosom = -cosom;
        }

        if (cosom > VMath.cosMinSlerpAngle)
        {
            var delta = t;
            if (dotq1q2 <= 0.0)
            {
                delta = -t;
            }

            var qrx = ((q2x - q1x) * delta) + q1x;
            var qry = ((q2y - q1y) * delta) + q1y;
            var qrz = ((q2z - q1z) * delta) + q1z;
            var qrw = ((q2w - q1w) * delta) + q1w;

            var mag = Math.sqrt((qrx * qrx) + (qry * qry) + (qrz * qrz) + (qrw * qrw));
            var recip = 1.0 / mag;

            dst[0] =  qrx * recip;
            dst[1] =  qry * recip;
            dst[2] =  qrz * recip;
            dst[3] =  qrw * recip;

            return dst;
        }

        var sinFn = Math.sin;
        var omega = Math.acos(cosom);
        var inv_sin_omega = 1.0 / sinFn(omega);

        var scalar = sinFn((1.0 - t) * omega) * inv_sin_omega;
        q1x = q1x * scalar;
        q1y = q1y * scalar;
        q1z = q1z * scalar;
        q1w = q1w * scalar;

        scalar = sinFn(t * omega) * inv_sin_omega;
        q2x = q2x * scalar;
        q2y = q2y * scalar;
        q2z = q2z * scalar;
        q2w = q2w * scalar;

        dst[0] =  q1x + q2x;
        dst[1] =  q1y + q2y;
        dst[2] =  q1z + q2z;
        dst[3] =  q1w + q2w;

        return dst;
    },

    quatFromM43 : function quatFromM43Fn(m, dst)
    {
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        var m4 = m[4];
        var m5 = m[5];
        var m6 = m[6];
        var m7 = m[7];
        var m8 = m[8];

        var x, y, z, w, s;
        var trace = m0 + m4 + m8 + 1;
        if (trace > VMath.precision)
        {
            w = Math.sqrt(trace) / 2;
            x = (m5 - m7) / (4 * w);
            y = (m6 - m2) / (4 * w);
            z = (m1 - m3) / (4 * w);
        }
        else
        {
            if ((m0 > m4) && (m0 > m8))
            {
                s = Math.sqrt(1.0 + m0 - m4 - m8) * 2; // S=4*qx
                w = (m5 - m7) / s;
                x = 0.25 * s;
                y = (m3 + m1) / s;
                z = (m6 + m2) / s;
            }
            else if (m4 > m8)
            {
                s = Math.sqrt(1.0 + m4 - m0 - m8) * 2; // S=4*qy
                w = (m6 - m2) / s;
                x = (m3 + m1) / s;
                y = 0.25 * s;
                z = (m7 + m5) / s;
            }
            else
            {
                s = Math.sqrt(1.0 + m8 - m0 - m4) * 2; // S=4*qz
                w = (m1 - m3) / s;
                x = (m6 + m2) / s;
                y = (m7 + m5) / s;
                z = 0.25 * s;
            }
        }

        var q = VMath.quatNormalize([x, y, z, w], dst);

        return VMath.quatConjugate(q, dst);
    },

    quatFromAxisRotation : function quatFromAxisRotationFn(axis, angle, dst)
    {
        var omega = 0.5 * angle;
        var s = Math.sin(omega);
        var c = Math.cos(omega);

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        dst[0] = axis[0] * s;
        dst[1] = axis[1] * s;
        dst[2] = axis[2] * s;
        dst[3] = c;

        return VMath.quatNormalize(dst, dst);
    },

    quatToAxisRotation : function quatToAxisRotation(q, dst)
    {
        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(4);
        }

        var q3 = q[3];
        var angle = Math.acos(q3) * 2.0;
        var sin_sqrd = 1.0 - q3 * q3;

        if (sin_sqrd < VMath.precision)
        {
            // we can return any axis
            dst[0] = 1.0;
            dst[1] = 0.0;
            dst[2] = 0.0;
            dst[3] = angle;
        }
        else
        {
            var scale = 1.0 / Math.sqrt(sin_sqrd);
            dst[0] = q[0] * scale;
            dst[1] = q[1] * scale;
            dst[2] = q[2] * scale;
            dst[3] = angle;
        }
        return dst;
    },

    quatTransformVector : function quatTransformVectorFn(q, v, dst)
    {
        /*
        var qimaginary = q; // Use full quat directly to avoid copy
        var qw = q[3];

        var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);

        var r = VMath.v3ScalarMul(v, s);

        s = VMath.v3Dot(qimaginary, v);
        r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
        r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(qimaginary, v), qw + qw));
        */

        // Inlined from above
        var qx = q[0];
        var qy = q[1];
        var qz = q[2];
        var qw = q[3];

        var vx = v[0];
        var vy = v[1];
        var vz = v[2];

        //var s = (qw * qw) - VMath.v3Dot(qimaginary, qimaginary);
        var s = (qw * qw) - (qx * qx + qy * qy + qz * qz);

        //var r = VMath.v3ScalarMul(v, s);
        var rx = vx * s;
        var ry = vy * s;
        var rz = vz * s;

        //s = VMath.v3Dot(qimaginary, v);
        s = qx * vx + qy * vy + qz * vz;

        //r = VMath.v3Add(r, VMath.v3ScalarMul(qimaginary, s + s));
        var twoS = s + s;
        rx += qx * twoS;
        ry += qy * twoS;
        rz += qz * twoS;

        //r = VMath.v3Add(r, VMath.v3ScalarMul(VMath.v3Cross(VMath.v3Neg(qimaginary), v), qw + qw));
        var cx = (qz * vy) - (qy * vz);
        var cy = (qx * vz) - (qz * vx);
        var cz = (qy * vx) - (qx * vy);
        var twoQw = qw + qw;
        rx += cx * twoQw;
        ry += cy * twoQw;
        rz += cz * twoQw;

        if (dst === undefined)
        {
            dst = new VMathArrayConstructor(3);
        }
        dst[0] = rx;
        dst[1] = ry;
        dst[2] = rz;

        return dst;
    },

    quatEqual : function quatEqual(q1, q2, precision)
    {
        if (precision === undefined)
        {
            precision = this.precision;
        }
        var abs = Math.abs;
        return (abs(q1[0] - q2[0]) <= precision &&
                abs(q1[1] - q2[1]) <= precision &&
                abs(q1[2] - q2[2]) <= precision &&
                abs(q1[3] - q2[3]) <= precision);
    },

    // quatPos
    quatPosBuild : function quatPosBuildFn(x, y, z, w, px, py, pz, dst)
    {
        if (arguments.length < 7)
        {
            if (z === undefined)
            {
                z = new VMathArrayConstructor(7);
            }
            z[0] = x[0];
            z[1] = x[1];
            z[2] = x[2];
            z[3] = x[3];
            z[4] = y[0];
            z[5] = y[1];
            z[6] = y[2];
            return z;
        }
        else
        {
            if (dst === undefined)
            {
                dst = new VMathArrayConstructor(7);
            }
            dst[0] = x;
            dst[1] = y;
            dst[2] = z;
            dst[3] = w;
            dst[4] = px;
            dst[5] = py;
            dst[6] = pz;
            return dst;
        }
    },

    quatPosTransformVector : function quatPosTransformVectorFn(qp, n, dst)
    {
        return VMath.quatTransformVector(qp, n, dst);
    },

    quatPosTransformPoint : function quatPosTransformPointFn(qp, p)
    {
        var offset = qp.slice(4, 7);

        var rotatedp = VMath.quatTransformVector(qp, p);
        return VMath.v3Add(rotatedp, offset);
    },

    quatPosMul : function quatPosMulFn(qp1, qp2)
    {
        var v2 = qp2.slice(4, 7);

        var qr = VMath.quatMul(qp1, qp2);
        var pr = VMath.quatPosTransformPoint(qp1, v2);
        qr[4] = pr[0];
        qr[5] = pr[1];
        qr[6] = pr[2];

        return qr;
    },

    //
    // Visibility queries
    //
    isVisibleBox : function isVisibleBoxFn(center, halfDimensions, vpm)
    {
        var abs = Math.abs;

        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];

        var h0 = halfDimensions[0];
        var h1 = halfDimensions[1];
        var h2 = halfDimensions[2];

        var m0  = vpm[0];
        var m1  = vpm[1];
        var m2  = vpm[2];
        var m3  = vpm[3];
        var m4  = vpm[4];
        var m5  = vpm[5];
        var m6  = vpm[6];
        var m7  = vpm[7];
        var m8  = vpm[8];
        var m9  = vpm[9];
        var m10 = vpm[10];
        var m11 = vpm[11];

        var I0 = (m0  * h0);
        var I1 = (m1  * h0);
        var I2 = (m2  * h0);
        var I3 = (m3  * h0);
        var J0 = (m4  * h1);
        var J1 = (m5  * h1);
        var J2 = (m6  * h1);
        var J3 = (m7  * h1);
        var K0 = (m8  * h2);
        var K1 = (m9  * h2);
        var K2 = (m10 * h2);
        var K3 = (m11 * h2);

        var T0 = (m0 * c0 + m4 * c1 + m8  * c2 + vpm[12]);
        var T1 = (m1 * c0 + m5 * c1 + m9  * c2 + vpm[13]);
        var T2 = (m2 * c0 + m6 * c1 + m10 * c2 + vpm[14]);
        var T3 = (m3 * c0 + m7 * c1 + m11 * c2 + vpm[15]);

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleBoxOrigin : function isVisibleBoxOriginFn(halfDimensions, vpm)
    {
        var abs = Math.abs;

        var h0 = halfDimensions[0];
        var h1 = halfDimensions[1];
        var h2 = halfDimensions[2];

        var I0 = (vpm[0]  * h0);
        var I1 = (vpm[1]  * h0);
        var I2 = (vpm[2]  * h0);
        var I3 = (vpm[3]  * h0);
        var J0 = (vpm[4]  * h1);
        var J1 = (vpm[5]  * h1);
        var J2 = (vpm[6]  * h1);
        var J3 = (vpm[7]  * h1);
        var K0 = (vpm[8]  * h2);
        var K1 = (vpm[9]  * h2);
        var K2 = (vpm[10] * h2);
        var K3 = (vpm[11] * h2);
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphere : function isVisibleSphereFn(center, radius, vpm)
    {
        var abs = Math.abs;

        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];

        var m0  = vpm[0];
        var m1  = vpm[1];
        var m2  = vpm[2];
        var m3  = vpm[3];
        var m4  = vpm[4];
        var m5  = vpm[5];
        var m6  = vpm[6];
        var m7  = vpm[7];
        var m8  = vpm[8];
        var m9  = vpm[9];
        var m10 = vpm[10];
        var m11 = vpm[11];

        var I0 = m0;
        var I1 = m1;
        var I2 = m2;
        var I3 = m3;
        var J0 = m4;
        var J1 = m5;
        var J2 = m6;
        var J3 = m7;
        var K0 = m8;
        var K1 = m9;
        var K2 = m10;
        var K3 = m11;

        var T0 = (m0 * c0 + m4 * c1 + m8  * c2 + vpm[12]);
        var T1 = (m1 * c0 + m5 * c1 + m9  * c2 + vpm[13]);
        var T2 = (m2 * c0 + m6 * c1 + m10 * c2 + vpm[14]);
        var T3 = (m3 * c0 + m7 * c1 + m11 * c2 + vpm[15]);

        var nradius = -radius;

        return !(((T0 - T3) >  radius * (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < nradius * (abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  radius * (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < nradius * (abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  radius * (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < nradius * (abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  radius * (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < nradius * (abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphereOrigin : function isVisibleSphereOriginFn(radius, vpm)
    {
        var abs = Math.abs;

        var I0 = vpm[0];
        var I1 = vpm[1];
        var I2 = vpm[2];
        var I3 = vpm[3];
        var J0 = vpm[4];
        var J1 = vpm[5];
        var J2 = vpm[6];
        var J3 = vpm[7];
        var K0 = vpm[8];
        var K1 = vpm[9];
        var K2 = vpm[10];
        var K3 = vpm[11];
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        var nradius = -radius;

        return !(((T0 - T3) >  radius * (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < nradius * (abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  radius * (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < nradius * (abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  radius * (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < nradius * (abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  radius * (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < nradius * (abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    isVisibleSphereUnit : function isVisibleSphereUnitFn(vpm)
    {
        var abs = Math.abs;

        var I0 = vpm[0];
        var I1 = vpm[1];
        var I2 = vpm[2];
        var I3 = vpm[3];
        var J0 = vpm[4];
        var J1 = vpm[5];
        var J2 = vpm[6];
        var J3 = vpm[7];
        var K0 = vpm[8];
        var K1 = vpm[9];
        var K2 = vpm[10];
        var K3 = vpm[11];
        var T0 = vpm[12];
        var T1 = vpm[13];
        var T2 = vpm[14];
        var T3 = vpm[15];

        return !(((T0 - T3) >  (abs(I0 - I3) + abs(J0 - J3) + abs(K0 - K3))) ||
                 ((T0 + T3) < -(abs(I0 + I3) + abs(J0 + J3) + abs(K0 + K3))) ||
                 ((T1 - T3) >  (abs(I1 - I3) + abs(J1 - J3) + abs(K1 - K3))) ||
                 ((T1 + T3) < -(abs(I1 + I3) + abs(J1 + J3) + abs(K1 + K3))) ||
                 ((T2 - T3) >  (abs(I2 - I3) + abs(J2 - J3) + abs(K2 - K3))) ||
                 ((T2 + T3) < -(abs(I2 + I3) + abs(J2 + J3) + abs(K2 + K3))) ||
               //((T3 - T3) >  (abs(I3 - I3) + abs(J3 - J3) + abs(K3 - K3))) ||
                 ((T3 + T3) < -(abs(I3 + I3) + abs(J3 + J3) + abs(K3 + K3))));
    },

    transformBox : function transformBoxFn(center, halfExtents, matrix)
    {
        var abs = Math.abs;
        var m0  = matrix[0];
        var m1  = matrix[1];
        var m2  = matrix[2];
        var m3  = matrix[3];
        var m4  = matrix[4];
        var m5  = matrix[5];
        var m6  = matrix[6];
        var m7  = matrix[7];
        var m8  = matrix[8];
        var c0 = center[0];
        var c1 = center[1];
        var c2 = center[2];
        var h0 = halfExtents[0];
        var h1 = halfExtents[1];
        var h2 = halfExtents[2];

        var out_center = new VMathArrayConstructor(3);
        out_center[0] = m0 * c0 + m3 * c1 + m6 * c2 + matrix[9];
        out_center[1] = m1 * c0 + m4 * c1 + m7 * c2 + matrix[10];
        out_center[2] = m2 * c0 + m5 * c1 + m8 * c2 + matrix[11];

        var out_halfext = new VMathArrayConstructor(3);
        out_halfext[0] = abs(m0) * h0 + abs(m3) * h1 + abs(m6) * h2;
        out_halfext[1] = abs(m1) * h0 + abs(m4) * h1 + abs(m7) * h2;
        out_halfext[2] = abs(m2) * h0 + abs(m5) * h1 + abs(m8) * h2;

        return {
            center : out_center,
            halfExtents : out_center
        };
    },

    //
    // Planes
    //
    planeNormalize : function planeNormalizeFn(plane, output)
    {
        if (output === undefined)
        {
            output = new VMathArrayConstructor(4);
        }

        var a = plane[0];
        var b = plane[1];
        var c = plane[2];
        var lsq = ((a * a) + (b * b) + (c * c));
        if (lsq > 0.0)
        {
            var lr = 1.0 / Math.sqrt(lsq);
            output[0] = (a * lr);
            output[1] = (b * lr);
            output[2] = (c * lr);
            output[3] = (plane[3] * lr);
        }
        else
        {
            output[0] = 0;
            output[1] = 0;
            output[2] = 0;
            output[3] = 0;
        }

        return output;
    },

    extractFrustumPlanes : function extractFrustumPlanesFn(m, p)
    {
        var planeNormalize = VMath.planeNormalize;
        var m0  = m[0];
        var m1  = m[1];
        var m2  = m[2];
        var m3  = m[3];
        var m4  = m[4];
        var m5  = m[5];
        var m6  = m[6];
        var m7  = m[7];
        var m8  = m[8];
        var m9  = m[9];
        var m10 = m[10];
        var m11 = m[11];
        var m12 = m[12];
        var m13 = m[13];
        var m14 = m[14];
        var m15 = m[15];
        var planes = (p || []);

        // Negate 'd' here to avoid doing it on the isVisible functions
        planes[0] = planeNormalize([(m3  + m0), (m7  + m4), (m11 + m8),
                                    -(m15 + m12)], planes[0]); // left
        planes[1] = planeNormalize([(m3  - m0), (m7  - m4), (m11 - m8),
                                    -(m15 - m12)], planes[1]); // right
        planes[2] = planeNormalize([(m3  - m1), (m7  - m5), (m11 - m9),
                                    -(m15 - m13)], planes[2]); // top
        planes[3] = planeNormalize([(m3  + m1), (m7  + m5), (m11 + m9),
                                    -(m15 + m13)], planes[3]); // bottom
        planes[4] = planeNormalize([(m3  + m2), (m7  + m6), (m11 + m10),
                                    -(m15 + m14)], planes[4]);  // near
        planes[5] = planeNormalize([(m3  - m2), (m7  - m6), (m11 - m10),
                                    -(m15 - m14)], planes[5]); // far

        return planes;
    },

    isInsidePlanesPoint : function isInsidePlanesPointFn(p, planes)
    {
        var p0 = p[0];
        var p1 = p[1];
        var p2 = p[2];
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            if ((plane[0] * p0 + plane[1] * p1 + plane[2] * p2) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    isInsidePlanesSphere : function isInsidePlanesSphereFn(c, r, planes)
    {
        var c0 = c[0];
        var c1 = c[1];
        var c2 = c[2];
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            if ((plane[0] * c0 + plane[1] * c1 + plane[2] * c2) < (plane[3] - r))
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },

    isInsidePlanesBox : function isInsidePlanesBoxFn(c, h, planes)
    {
        var c0 = c[0];
        var c1 = c[1];
        var c2 = c[2];
        var h0 = h[0];
        var h1 = h[1];
        var h2 = h[2];
        var p0 = (c0 + h0);
        var p1 = (c1 + h1);
        var p2 = (c2 + h2);
        var n0 = (c0 - h0);
        var n1 = (c1 - h1);
        var n2 = (c2 - h2);
        var numPlanes = planes.length;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 < 0 ? n0 : p0) + d1 * (d1 < 0 ? n1 : p1) + d2 * (d2 < 0 ? n2 : p2)) < plane[3])
            {
                return false;
            }
            n += 1;
        }
        while (n < numPlanes);
        return true;
    },


    extractIntersectingPlanes : function extractIntersectingPlanesFn(extents, planes)
    {
        var n0 = extents[0];
        var n1 = extents[1];
        var n2 = extents[2];
        var p0 = extents[3];
        var p1 = extents[4];
        var p2 = extents[5];
        var numPlanes = planes.length;
        var p = [];
        var np = 0;
        var n = 0;
        do
        {
            var plane = planes[n];
            var d0 = plane[0];
            var d1 = plane[1];
            var d2 = plane[2];
            if ((d0 * (d0 > 0 ? n0 : p0) + d1 * (d1 > 0 ? n1 : p1) + d2 * (d2 > 0 ? n2 : p2)) < plane[3])
            {
                p[np] = plane;
                np += 1;
            }
            n += 1;
        }
        while (n < numPlanes);
        return p;
    }
};

if (typeof Float32Array !== "undefined")
{
    var testVector = new Float32Array([1, 2, 3]);

    // Clamp FLOAT_MAX
    testVector[0] = VMath.FLOAT_MAX;

    VMath.FLOAT_MAX = testVector[0];
    VMathArrayConstructor = Float32Array;
}

// If the plugin has a 'getNativeMathDevice' method then VMath should
// replace the standard MathDevice.

if (TurbulenzEngine.hasOwnProperty('VMath'))
{
    TurbulenzEngine.VMath = VMath;
}

// Copyright (c) 2010-2012 Turbulenz Limited

/*global window: false*/
/*global Observer: false*/
/*global TurbulenzEngine: false*/

var Utilities = {};

//
// assert
//
Utilities.skipAsserts = false;
Utilities.assert = function assertFn(test, message)
{
    if (!test)
    {
        if (!this.skipAsserts)
        {
            this.breakInDebugger.doesNotExist(); //Use a function that does not exist. This is caught in the debuggers.
        }
    }
};

//
// beget
//
Utilities.beget = function begetFn(o)
{
    var F = function () { };
    F.prototype = o;
    return new F();
};

//
// log
//
Utilities.log = function logFn()
{
    var console = window.console;
    if (console)
    {
        // "console.log.apply" will crash when using the plugin on Chrome...
        switch (arguments.length)
        {
        case 1:
            console.log(arguments[0]);
            break;
        case 2:
            console.log(arguments[0], arguments[1]);
            break;
        case 3:
            console.log(arguments[0], arguments[1], arguments[2]);
            break;
        case 4:
            console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
            break;
        default:
            // Note: this will fail if using printf-style string formatting
            var args = [].splice.call(arguments, 0);
            console.log(args.join(' '));
            break;
        }
    }
};

Utilities.nearestLowerPow2 = function UtilitiesNearestLowerPow2(num)
{
    /*jshint bitwise: false*/
    num = num | (num >>> 1);
    num = num | (num >>> 2);
    num = num | (num >>> 4);
    num = num | (num >>> 8);
    num = num | (num >>> 16);
    return (num - (num >>> 1));
};

Utilities.nearestUpperPow2 = function UtilitiesNearestUpperPow2(num)
{
    /*jshint bitwise: false*/
    num = num - 1;
    num = num | (num >>> 1);
    num = num | (num >>> 2);
    num = num | (num >>> 4);
    num = num | (num >>> 8);
    num = num | (num >>> 16);
    return (num + 1);
};

var MathDeviceConvert =
{
    v2ToArray : function v2ToJavaScriptArrayFn(v2)
    {
        return [v2[0], v2[1]];
    },

    arrayToV2 : function arrayToV2Fn(mathDevice, v2Array, v2Dest)
    {
        return mathDevice.v2Build(v2Array[0], v2Array[1], v2Dest);
    },

    v3ToArray : function v3ToJavaScriptArrayFn(v3)
    {
        return [v3[0], v3[1], v3[2]];
    },

    arrayToV3 : function arrayToV3Fn(mathDevice, v3Array, v3Dest)
    {
        return mathDevice.v3Build(v3Array[0], v3Array[1], v3Array[2], v3Dest);
    },

    v4ToArray : function v4ToJavaScriptArrayFn(v4)
    {
        return [v4[0], v4[1], v4[2], v4[3]];
    },

    arrayToV4 : function arrayToV4Fn(mathDevice, v4Array, v4Dest)
    {
        return mathDevice.v4Build(v4Array[0], v4Array[1], v4Array[2], v4Array[3], v4Dest);
    },

    quatToArray : function quatToJavaScriptArrayFn(quat)
    {
        return [quat[0], quat[1], quat[2], quat[3]];
    },

    arrayToQuat : function arrayToQuatFn(mathDevice, quatArray, quatDest)
    {
        return mathDevice.quatBuild(quatArray[0], quatArray[1], quatArray[2], quatArray[3], quatDest);
    },

    aabbToArray : function aabbToJavaScriptArrayFn(aabb)
    {
        return [aabb[0], aabb[1], aabb[2],
                aabb[3], aabb[4], aabb[5]];
    },

    arrayToAABB : function arrayToQuatFn(mathDevice, aabbArray, aabbDest)
    {
        return mathDevice.aabbBuild(aabbArray[0], aabbArray[1], aabbArray[2],
                                    aabbArray[3], aabbArray[4], aabbArray[5], aabbDest);
    },

    quatPosToArray : function quatPosToJavaScriptArrayFn(quatPos)
    {
        return [quatPos[0], quatPos[1], quatPos[2], quatPos[3],
                quatPos[4], quatPos[5], quatPos[6]];
    },

    arrayToQuatPos : function arrayToQuatPosFn(mathDevice, quatPosArray, quatPosDest)
    {
        return mathDevice.quatPosBuild(quatPosArray[0], quatPosArray[1], quatPosArray[2], quatPosArray[3],
                                       quatPosArray[4], quatPosArray[5], quatPosArray[6], quatPosDest);
    },

    m33ToArray : function m33ToJavaScriptArrayFn(m33)
    {
        return [m33[0], m33[1], m33[2],
                m33[3], m33[4], m33[5],
                m33[6], m33[7], m33[8]];
    },

    arrayToM33 : function arrayToM33Fn(mathDevice, m33Array, m33Dest)
    {
        return mathDevice.m33Build(m33Array[0], m33Array[1], m33Array[2],
                                   m33Array[3], m33Array[4], m33Array[5],
                                   m33Array[6], m33Array[7], m33Array[8], m33Dest);
    },

    /*jshint white: false*/
    m43ToArray : function m43ToJavaScriptArrayFn(m43)
    {
        return [m43[0], m43[ 1], m43[ 2],
                m43[3], m43[ 4], m43[ 5],
                m43[6], m43[ 7], m43[ 8],
                m43[9], m43[10], m43[11]];
    },

    arrayToM43 : function arrayToM43Fn(mathDevice, m43Array, m43Dest)
    {
        return mathDevice.m43Build(m43Array[0], m43Array[ 1], m43Array[ 2],
                                   m43Array[3], m43Array[ 4], m43Array[ 5],
                                   m43Array[6], m43Array[ 7], m43Array[ 8],
                                   m43Array[9], m43Array[10], m43Array[11], m43Dest);
    },

    m34ToArray : function m34ToJavaScriptArrayFn(m34)
    {
        return [m34[0], m34[1], m34[ 2], m34[ 3],
                m34[4], m34[5], m34[ 6], m34[ 7],
                m34[8], m34[9], m34[10], m34[11]];
    },

    m44ToArray : function m44ToJavaScriptArrayFn(m44)
    {
        return [m44[ 0], m44[ 1], m44[ 2], m44[ 3],
                m44[ 4], m44[ 5], m44[ 6], m44[ 7],
                m44[ 8], m44[ 9], m44[10], m44[11],
                m44[12], m44[13], m44[14], m44[15]];
    },

    arrayToM44 : function arrayToM44Fn(mathDevice, m44Array, m44Dest)
    {
        return mathDevice.m44Build(m44Array[ 0], m44Array[ 1], m44Array[ 2], m44Array[ 3],
                                   m44Array[ 4], m44Array[ 5], m44Array[ 6], m44Array[ 7],
                                   m44Array[ 8], m44Array[ 9], m44Array[10], m44Array[11],
                                   m44Array[12], m44Array[13], m44Array[14], m44Array[15], m44Dest);
    }
    /*jshint white: true*/
};

//
// ajax
//
Utilities.ajax = function utilitiesAjaxFn(params)
{
    // parameters
    var requestText = "";
    var method = params.method;
    var data = params.data || {};
    var encrypted = params.encrypt;
    var signature = null;
    var url = params.url;
    var requestHandler = params.requestHandler;
    var callbackFn = params.callback;

    if (encrypted)
    {
        data.requestUrl = url;

        var str = JSON.stringify(data);

        if (method === "POST")
        {
            str = TurbulenzEngine.encrypt(str);
        }

        requestText += "data=" + encodeURIComponent(str) + "&";

        requestText += "gameSessionId=" + encodeURIComponent(data.gameSessionId);

        signature = TurbulenzEngine.generateSignature(str);
    }
    else if (data)
    {
        var key;
        for (key in data)
        {
            if (data.hasOwnProperty(key))
            {
                if (requestText.length !== 0)
                {
                    requestText += "&";
                }
                if (method === "POST")
                {
                    requestText += key + "=" + data[key];
                }
                else
                {
                    requestText += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
                }
            }
        }
    }

    var httpResponseCallback = function httpResponseCallbackFn(xhrResponseText, xhrStatus)
    {
        var sig = this.xhr.getResponseHeader("X-TZ-Signature");

        // break circular reference
        this.xhr.onreadystatechange = null;
        this.xhr = null;

        var response;

        response = JSON.parse(xhrResponseText);
        if (encrypted)
        {
            var validSignature = TurbulenzEngine.verifySignature(xhrResponseText, sig);
            xhrResponseText = null;

            TurbulenzEngine.setTimeout(function () {
                var receivedUrl = response.requestUrl;

                if (validSignature)
                {
                    if (!TurbulenzEngine.encryptionEnabled || receivedUrl === url)
                    {
                        callbackFn(response, xhrStatus);
                        callbackFn = null;
                        return;
                    }
                }

                // If it was a server-side verification fail then pass through the actual message
                if (xhrStatus === 400)
                {
                    callbackFn(response, xhrStatus, "Verification Failed");
                }
                else
                {
                    // Else drop reply
                    callbackFn({msg: "Verification failed", ok: false}, 400, "Verification Failed");
                }
                callbackFn = null;
            }, 0);
        }
        else
        {
            xhrResponseText = null;

            TurbulenzEngine.setTimeout(function () {
                callbackFn(response, xhrStatus);
                callbackFn = null;
            }, 0);
        }
    };

    var httpRequest = function httpRequestFn(url, onload, callContext)
    {
        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            if (params.error)
            {
                params.error("No XMLHTTPRequest object could be created");
            }
            return;
        }
        callContext.xhr = xhr;

        var httpCallback = function httpCallbackFn()
        {
            if (xhr.readyState === 4 && TurbulenzEngine && !TurbulenzEngine.isUnloading()) /* 4 == complete */
            {
                var xhrResponseText = xhr.responseText;
                var xhrStatus = xhr.status;
                // Checking xhrStatusText when xhrStatus is 0 causes a silent error!
                var xhrStatusText = (xhrStatus !== 0 && xhr.statusText) || "No connection or cross domain request";

                // Sometimes the browser sets status to 200 OK when the connection is closed
                // before the message is sent (weird!).
                // In order to address this we fail any completely empty responses.
                // Hopefully, nobody will get a valid response with no headers and no body!
                if (xhr.getAllResponseHeaders() === "" && xhrResponseText === "" && xhrStatus === 200 && xhrStatusText === 'OK')
                {
                    onload('', 0);
                    return;
                }

                onload.call(callContext, xhrResponseText, xhrStatus);
            }
        };

        // Send request
        xhr.open(method, ((requestText && (method !== "POST")) ? url + "?" + requestText : url), true);
        if (callbackFn)
        {
            xhr.onreadystatechange = httpCallback;
        }

        if (signature)
        {
            xhr.setRequestHeader("X-TZ-Signature", signature);
        }

        if (method === "POST")
        {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(requestText);
        }
        else // method === 'GET'
        {
            xhr.send();
        }
    };

    if (requestHandler)
    {
        requestHandler.request({
            src: url,
            requestFn: httpRequest,
            customErrorHandler: params.customErrorHandler,
            onload: httpResponseCallback
        });
    }
    else
    {
        var callContext = {
            src: url
        };
        httpRequest(url, httpResponseCallback, callContext);
    }
};


//
// ajaxStatusCodes
//

// http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1
Utilities.ajaxStatusCodes = {
    0: "No Connection, Timeout Or Cross Domain Request",
    100: "Continue",
    101: "Switching Protocols",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Time-out",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Large",
    415: "Unsupported Media Type",
    416: "Requested range not satisfiable",
    417: "Expectation Failed",
    429: "Too Many Requests",
    480: "Temporarily Unavailable",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Time-out",
    505: "HTTP Version not supported"
};

//
//Reference
//

// Proxy reference class allowing weak reference to the object
function Reference() {}

Reference.prototype =
{
    version: 1,

    //
    // add
    //
    add: function referenceAddFn()
    {
        this.referenceCount += 1;
    },

    //
    // remove
    //
    remove: function referenceRemovefn()
    {
        this.referenceCount -= 1;
        if (this.referenceCount === 0)
        {
            if (this.destroyedObserver)
            {
                this.destroyedObserver.notify(this.object);
            }
            this.object.destroy();
            this.object = null;
        }
    },

    //
    //subscribeDestroyed
    //
    subscribeDestroyed: function referenceSubscribeDestroyedFn(observerFunction)
    {
        if (!this.destroyedObserver)
        {
            this.destroyedObserver = Observer.create();
        }
        this.destroyedObserver.subscribe(observerFunction);
    },

    //
    //unsubscribeDestroyed
    //
    unsubscribeDestroyed: function referenceDestroyedFn(observerFunction)
    {
        this.destroyedObserver.unsubscribe(observerFunction);
    }
};

//
// create
//
Reference.create = function referenceCreate(object)
{
    var result = new Reference();
    result.object = object;
    result.referenceCount = 0;
    return result;
};


//
// Profile
//
var Profile =
{
    profiles: [],

    sortMode: {alphabetical: 0, duration: 1, max: 2, min: 3, calls: 4},

    //
    // start
    //
    start: function profileStartFn(name)
    {
        var data = this.profiles[name];
        if (!data)
        {
            data = {name: name, calls: 0, duration: 0.0, min: Number.MAX_VALUE, max: 0.0, sumOfSquares: 0.0};
            this.profiles[name] = data;
        }
        data.start = TurbulenzEngine.time;
    },

    //
    // stop
    //
    stop: function profileStopFn(name)
    {
        var end = TurbulenzEngine.time;
        var data = this.profiles[name];
        if (data)
        {
            var duration = end - data.start;
            data.duration += duration;
            data.calls += 1;
            var delta = duration - data.duration / data.calls; // This is an approximation, it should use the mean of all samples (or N random ones) but thats requries samples to be stored
            data.sumOfSquares += delta * delta;

            if (duration > data.max)
            {
                data.max = duration;
            }

            if (duration < data.min)
            {
                data.min = duration;
            }
        }
    },

    //
    // reset
    //
    reset: function profileResetFn()
    {
        this.profiles = [];
    },

    //
    // getReport
    //
    getReport: function profileGetReportFn(sortMode, format)
    {
        var dataArray = [];
        var data;
        var maxDuration = 0.0;
        var name;
        for (name in this.profiles)
        {
            if (this.profiles.hasOwnProperty(name))
            {
                data = this.profiles[name];
                if (maxDuration < data.duration)
                {
                    maxDuration = data.duration;
                }
                dataArray.push(data);
            }
        }

        var compareFunction;

        if (sortMode === Profile.sortMode.alphabetical)
        {
            compareFunction = function compareName(left, right)
                            {
                                return (left.name < right.name) ? -1 : (left.name > right.name) ? 1 : 0;
                            };
        }
        else if (sortMode === Profile.sortMode.max)
        {
            compareFunction = function compareMax(left, right)
                            {
                                return right.max - left.max;
                            };
        }
        else if (sortMode === Profile.sortMode.min)
        {
            compareFunction = function compareMin(left, right)
                            {
                                return right.min - left.min;
                            };
        }
        else if (sortMode === Profile.sortMode.calls)
        {
            compareFunction = function compareCalls(left, right)
                            {
                                return right.calls - left.calls;
                            };
        }
        else // Profile.sortMode.duration or undefined
        {
            compareFunction = function compareDuration(left, right)
                            {
                                return right.duration - left.duration;
                            };
        }

        dataArray.sort(compareFunction);

        var line;
        var text = "";
        var precision = format ? format.precision : 8;
        var percentagePrecision = format ? format.percentagePrecision : 1;
        var seperator = format ? format.seperator : " ";
        var length = dataArray.length;
        var index;
        for (index = 0; index < length; index += 1)
        {
            data = dataArray[index];
            line = data.name;
            line += seperator + data.calls;
            line += seperator + data.duration.toFixed(precision);
            line += seperator + data.max.toFixed(precision);
            line += seperator + data.min.toFixed(precision);
            line += seperator + (data.duration / data.calls).toFixed(precision); // average
            line += seperator + Math.sqrt(data.sumOfSquares / data.calls).toFixed(precision); // approximate standard deviation
            line += seperator + (100 * data.duration / maxDuration).toFixed(percentagePrecision) + "%\n";
            text += line;
        }
        return text;
    }
};

//
// Utilities to use with TurbulenzEngine.stopProfiling() object.
//
var JSProfiling = {};

//
// createArray
//      Creates an array of nodes by merging all duplicate function references in the call profile tree together.
JSProfiling.createArray = function JSProfilingCreateArrayFn(rootNode)
{
    var map = {};
    var array = [];

    if (rootNode.head)
    {
        rootNode = rootNode.head; // Chrome native profiler.
    }

    var processNode = function processNodeFn(node)
    {
        var urlObject = map[node.url];
        if (!urlObject)
        {
            urlObject = {};
            map[node.url] = urlObject;
        }

        var functionName = node.functionName === "" ? "(anonymous)" : node.functionName;

        var functionObject = urlObject[functionName];
        if (!functionObject)
        {
            functionObject = {};
            urlObject[functionName] = functionObject;
        }

        var existingNode = functionObject[node.lineNumber];
        if (!existingNode)
        {
            var newNode = { functionName : functionName,
                            numberOfCalls : node.numberOfCalls,
                            totalTime : node.totalTime,
                            selfTime : node.selfTime,
                            url : node.url,
                            lineNumber : node.lineNumber
                           };

            array[array.length] = newNode;
            functionObject[node.lineNumber] = newNode;
        }
        else
        {
            existingNode.totalTime += node.totalTime;
            existingNode.selfTime += node.selfTime;
            existingNode.numberOfCalls += node.numberOfCalls;
        }

        var children = node.children;
        if (children)
        {
            var numberOfChildren = children.length;
            var childIndex;
            for (childIndex = 0; childIndex < numberOfChildren; childIndex += 1)
            {
                processNode(children[childIndex]);
            }
        }
    };

    processNode(rootNode);

    return array;
};

//
// sort
//
JSProfiling.sort = function JSProfilingSortFn(array, propertyName, descending)
{
    if (!propertyName)
    {
        propertyName = "totalTime";
    }

    var sorterAscending = function (left, right)
    {
        return left[propertyName] - right[propertyName];
    };

    var sorterDescending = function (left, right)
    {
        return right[propertyName] - left[propertyName];
    };

    if (descending === false)
    {
        array.sort(sorterAscending);
    }
    else
    {
        array.sort(sorterDescending);
    }
};

// Copyright (c) 2009-2012 Turbulenz Limited
/*global Float32Array: false*/

//
// AABBTreeNode
//
function AABBTreeNode() {}
AABBTreeNode.prototype =
{
    version : 1,

    isLeaf : function aabbtreeNodeIsLeafFn()
    {
        return !!this.externalNode;
    },

    reset : function aabbtreeNodeResetFn(minX, minY, minZ, maxX, maxY, maxZ,
                                         escapeNodeOffset,
                                         externalNode)
    {
        this.escapeNodeOffset = escapeNodeOffset;
        this.externalNode = externalNode;
        var oldExtents = this.extents;
        oldExtents[0] = minX;
        oldExtents[1] = minY;
        oldExtents[2] = minZ;
        oldExtents[3] = maxX;
        oldExtents[4] = maxY;
        oldExtents[5] = maxZ;
    },

    clear : function aabbtreeNodeClearFn()
    {
        this.escapeNodeOffset = 1;
        this.externalNode = undefined;
        var oldExtents = this.extents;
        var maxNumber = Number.MAX_VALUE;
        oldExtents[0] = maxNumber;
        oldExtents[1] = maxNumber;
        oldExtents[2] = maxNumber;
        oldExtents[3] = -maxNumber;
        oldExtents[4] = -maxNumber;
        oldExtents[5] = -maxNumber;
    }
};

// Constructor function
AABBTreeNode.create = function aabbtreeNodeCreateFn(extents, escapeNodeOffset, externalNode)
{
    var n = new AABBTreeNode();
    n.escapeNodeOffset = escapeNodeOffset;
    n.externalNode = externalNode;
    n.extents = extents;
    return n;
};


//
// AABBTree
//
function AABBTree() {}
AABBTree.prototype =
{
    version : 1,
    numNodesLeaf : 4,

    add : function addFn(externalNode, extents)
    {
        var endNode = this.endNode;
        externalNode.aabbTreeIndex = endNode;
        var copyExtents = new this.arrayConstructor(6);
        copyExtents[0] = extents[0];
        copyExtents[1] = extents[1];
        copyExtents[2] = extents[2];
        copyExtents[3] = extents[3];
        copyExtents[4] = extents[4];
        copyExtents[5] = extents[5];
        this.nodes[endNode] = AABBTreeNode.create(copyExtents, 1, externalNode);
        this.endNode = (endNode + 1);
        this.needsRebuild = true;
        this.numAdds += 1;
        this.numExternalNodes += 1;
    },

    remove : function removeFn(externalNode)
    {
        var index = externalNode.aabbTreeIndex;
        if (index !== undefined)
        {
            if (this.numExternalNodes > 1)
            {
                var nodes = this.nodes;

                nodes[index].clear();

                var endNode = this.endNode;
                if ((index + 1) >= endNode)
                {
                    while (!nodes[endNode - 1].externalNode) // No leaf
                    {
                        endNode -= 1;
                    }
                    this.endNode = endNode;
                }
                else
                {
                    this.needsRebuild = true;
                }
                this.numExternalNodes -= 1;
            }
            else
            {
                this.clear();
            }

            delete externalNode.aabbTreeIndex;
        }
    },

    findParent : function findParentFn(nodeIndex)
    {
        var nodes = this.nodes;
        var parentIndex = nodeIndex;
        var nodeDist = 0;
        var parent;
        do
        {
            parentIndex -= 1;
            nodeDist += 1;
            parent = nodes[parentIndex];
        }
        while (parent.escapeNodeOffset <= nodeDist);
        return parent;
    },

    update : function aabbTreeUpdateFn(externalNode, extents)
    {
        var index = externalNode.aabbTreeIndex;
        if (index !== undefined)
        {
            var min0 = extents[0];
            var min1 = extents[1];
            var min2 = extents[2];
            var max0 = extents[3];
            var max1 = extents[4];
            var max2 = extents[5];

            var needsRebuild = this.needsRebuild;
            var needsRebound = this.needsRebound;
            var nodes = this.nodes;
            var node = nodes[index];
            var nodeExtents = node.extents;

            var doUpdate = (needsRebuild ||
                            needsRebound ||
                            nodeExtents[0] > min0 ||
                            nodeExtents[1] > min1 ||
                            nodeExtents[2] > min2 ||
                            nodeExtents[3] < max0 ||
                            nodeExtents[4] < max1 ||
                            nodeExtents[5] < max2);

            nodeExtents[0] = min0;
            nodeExtents[1] = min1;
            nodeExtents[2] = min2;
            nodeExtents[3] = max0;
            nodeExtents[4] = max1;
            nodeExtents[5] = max2;

            if (doUpdate)
            {
                if (!needsRebuild && 1 < nodes.length)
                {
                    this.numUpdates += 1;
                    if (this.startUpdate > index)
                    {
                        this.startUpdate = index;
                    }
                    if (this.endUpdate < index)
                    {
                        this.endUpdate = index;
                    }
                    if (!needsRebound)
                    {
                        // force a rebound when things change too much
                        if ((2 * this.numUpdates) > this.numExternalNodes)
                        {
                            this.needsRebound = true;
                        }
                        else
                        {
                            var parent = this.findParent(index);
                            var parentExtents = parent.extents;
                            if (parentExtents[0] > min0 ||
                                parentExtents[1] > min1 ||
                                parentExtents[2] > min2 ||
                                parentExtents[3] < max0 ||
                                parentExtents[4] < max1 ||
                                parentExtents[5] < max2)
                            {
                                this.needsRebound = true;
                            }
                        }
                    }
                    else
                    {
                        // force a rebuild when things change too much
                        if (this.numUpdates > (3 * this.numExternalNodes))
                        {
                            this.needsRebuild = true;
                            this.numAdds = this.numUpdates;
                        }
                    }
                }
            }
        }
        else
        {
            this.add(externalNode, extents);
        }
    },

    needsFinalize : function needsFinalizeFn()
    {
        return (this.needsRebuild || this.needsRebound);
    },

    finalize : function finalizeFn()
    {
        if (this.needsRebuild)
        {
            this.rebuild();
        }
        else if (this.needsRebound)
        {
            this.rebound();
        }
    },

    rebound : function reboundFn()
    {
        var nodes = this.nodes;
        if (nodes.length > 1)
        {
            var startUpdateNodeIndex = this.startUpdate;
            var endUpdateNodeIndex   = this.endUpdate;

            var nodesStack = [];
            var numNodesStack = 0;
            var topNodeIndex = 0;
            for (;;)
            {
                var topNode = nodes[topNodeIndex];
                var currentNodeIndex = topNodeIndex;
                var currentEscapeNodeIndex = (topNodeIndex + topNode.escapeNodeOffset);
                var nodeIndex = (topNodeIndex + 1); // First child
                var node;
                do
                {
                    node = nodes[nodeIndex];
                    var escapeNodeIndex = (nodeIndex + node.escapeNodeOffset);
                    if (nodeIndex < endUpdateNodeIndex)
                    {
                        if (!node.externalNode) // No leaf
                        {
                            if (escapeNodeIndex > startUpdateNodeIndex)
                            {
                                nodesStack[numNodesStack] = topNodeIndex;
                                numNodesStack += 1;
                                topNodeIndex = nodeIndex;
                            }
                        }
                    }
                    else
                    {
                        break;
                    }
                    nodeIndex = escapeNodeIndex;
                }
                while (nodeIndex < currentEscapeNodeIndex);

                if (topNodeIndex === currentNodeIndex)
                {
                    nodeIndex = (topNodeIndex + 1); // First child
                    node = nodes[nodeIndex];

                    var extents = node.extents;
                    var minX = extents[0];
                    var minY = extents[1];
                    var minZ = extents[2];
                    var maxX = extents[3];
                    var maxY = extents[4];
                    var maxZ = extents[5];

                    nodeIndex = (nodeIndex + node.escapeNodeOffset);
                    while (nodeIndex < currentEscapeNodeIndex)
                    {
                        node = nodes[nodeIndex];
                        extents = node.extents;
                        /*jshint white: false*/
                        if (minX > extents[0]) { minX = extents[0]; }
                        if (minY > extents[1]) { minY = extents[1]; }
                        if (minZ > extents[2]) { minZ = extents[2]; }
                        if (maxX < extents[3]) { maxX = extents[3]; }
                        if (maxY < extents[4]) { maxY = extents[4]; }
                        if (maxZ < extents[5]) { maxZ = extents[5]; }
                        /*jshint white: true*/
                        nodeIndex = (nodeIndex + node.escapeNodeOffset);
                    }

                    extents = topNode.extents;
                    extents[0] = minX;
                    extents[1] = minY;
                    extents[2] = minZ;
                    extents[3] = maxX;
                    extents[4] = maxY;
                    extents[5] = maxZ;

                    endUpdateNodeIndex = topNodeIndex;

                    if (0 < numNodesStack)
                    {
                        numNodesStack -= 1;
                        topNodeIndex = nodesStack[numNodesStack];
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }

        this.needsRebuild = false;
        this.needsRebound = false;
        this.numAdds = 0;
        //this.numUpdates = 0;
        this.startUpdate = Number.MAX_VALUE;
        this.endUpdate = -Number.MAX_VALUE;
    },

    rebuild : function rebuildFn()
    {
        if (this.numExternalNodes > 0)
        {
            var nodes = this.nodes;

            var buildNodes, numBuildNodes, endNodeIndex;

            if (this.numExternalNodes === nodes.length)
            {
                buildNodes = nodes;
                numBuildNodes = nodes.length;
                nodes = [];
                this.nodes = nodes;
            }
            else
            {
                buildNodes = [];
                buildNodes.length = this.numExternalNodes;
                numBuildNodes = 0;
                endNodeIndex = this.endNode;
                for (var n = 0; n < endNodeIndex; n += 1)
                {
                    var currentNode = nodes[n];
                    if (currentNode.externalNode) // Is leaf
                    {
                        nodes[n] = undefined;
                        buildNodes[numBuildNodes] = currentNode;
                        numBuildNodes += 1;
                    }
                }
                if (buildNodes.length > numBuildNodes)
                {
                    buildNodes.length = numBuildNodes;
                }
            }

            var rootNode;
            if (numBuildNodes > 1)
            {
                if (numBuildNodes > this.numNodesLeaf &&
                    this.numAdds > 0)
                {
                    if (this.highQuality)
                    {
                        this.sortNodesHighQuality(buildNodes);
                    }
                    else if (this.ignoreY)
                    {
                        this.sortNodesNoY(buildNodes);
                    }
                    else
                    {
                        this.sortNodes(buildNodes);
                    }
                }

                this.recursiveBuild(buildNodes, 0, numBuildNodes, 0);

                endNodeIndex = nodes[0].escapeNodeOffset;
                if (nodes.length > endNodeIndex)
                {
                    nodes.length = endNodeIndex;
                }
                this.endNode = endNodeIndex;

                // Check if we should take into account the Y coordinate
                rootNode = nodes[0];
                var extents = rootNode.extents;
                var deltaX = (extents[3] - extents[0]);
                var deltaY = (extents[4] - extents[1]);
                var deltaZ = (extents[5] - extents[2]);
                this.ignoreY = ((4 * deltaY) < (deltaX <= deltaZ ? deltaX : deltaZ));
            }
            else
            {
                rootNode = buildNodes[0];
                rootNode.externalNode.aabbTreeIndex = 0;
                nodes.length = 1;
                nodes[0] = rootNode;
                this.endNode = 1;
            }
            buildNodes = null;
        }

        this.needsRebuild = false;
        this.needsRebound = false;
        this.numAdds = 0;
        this.numUpdates = 0;
        this.startUpdate = Number.MAX_VALUE;
        this.endUpdate = -Number.MAX_VALUE;
    },

    sortNodes : function sortNodesFn(nodes)
    {
        var numNodesLeaf = this.numNodesLeaf;
        var numNodes = nodes.length;

        function getkeyXfn(node)
        {
            var extents = node.extents;
            return (extents[0] + extents[3]);
        }

        function getkeyYfn(node)
        {
            var extents = node.extents;
            return (extents[1] + extents[4]);
        }

        function getkeyZfn(node)
        {
            var extents = node.extents;
            return (extents[2] + extents[5]);
        }

        function getreversekeyXfn(node)
        {
            var extents = node.extents;
            return -(extents[0] + extents[3]);
        }

        function getreversekeyYfn(node)
        {
            var extents = node.extents;
            return -(extents[1] + extents[4]);
        }

        function getreversekeyZfn(node)
        {
            var extents = node.extents;
            return -(extents[2] + extents[5]);
        }

        var nthElement = this.nthElement;
        var reverse = false;
        var axis = 0;

        function sortNodesRecursive(nodes, startIndex, endIndex)
        {
            /*jshint bitwise: false*/
            var splitNodeIndex = ((startIndex + endIndex) >> 1);
            /*jshint bitwise: true*/

            if (axis === 0)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyXfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXfn);
                }
            }
            else if (axis === 2)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyZfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZfn);
                }
            }
            else //if (axis === 1)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyYfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyYfn);
                }
            }

            if (axis === 0)
            {
                axis = 2;
            }
            else if (axis === 2)
            {
                axis = 1;
            }
            else //if (axis === 1)
            {
                axis = 0;
            }

            reverse = !reverse;

            if ((startIndex + numNodesLeaf) < splitNodeIndex)
            {
                sortNodesRecursive(nodes, startIndex, splitNodeIndex);
            }

            if ((splitNodeIndex + numNodesLeaf) < endIndex)
            {
                sortNodesRecursive(nodes, splitNodeIndex, endIndex);
            }
        }

        sortNodesRecursive(nodes, 0, numNodes);
    },

    sortNodesNoY : function sortNodesNoYFn(nodes)
    {
        var numNodesLeaf = this.numNodesLeaf;
        var numNodes = nodes.length;

        function getkeyXfn(node)
        {
            var extents = node.extents;
            return (extents[0] + extents[3]);
        }

        function getkeyZfn(node)
        {
            var extents = node.extents;
            return (extents[2] + extents[5]);
        }

        function getreversekeyXfn(node)
        {
            var extents = node.extents;
            return -(extents[0] + extents[3]);
        }

        function getreversekeyZfn(node)
        {
            var extents = node.extents;
            return -(extents[2] + extents[5]);
        }

        var nthElement = this.nthElement;
        var reverse = false;
        var axis = 0;

        function sortNodesNoYRecursive(nodes, startIndex, endIndex)
        {
            /*jshint bitwise: false*/
            var splitNodeIndex = ((startIndex + endIndex) >> 1);
            /*jshint bitwise: true*/

            if (axis === 0)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyXfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXfn);
                }
            }
            else //if (axis === 2)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyZfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZfn);
                }
            }

            if (axis === 0)
            {
                axis = 2;
            }
            else //if (axis === 2)
            {
                axis = 0;
            }

            reverse = !reverse;

            if ((startIndex + numNodesLeaf) < splitNodeIndex)
            {
                sortNodesNoYRecursive(nodes, startIndex, splitNodeIndex);
            }

            if ((splitNodeIndex + numNodesLeaf) < endIndex)
            {
                sortNodesNoYRecursive(nodes, splitNodeIndex, endIndex);
            }
        }

        sortNodesNoYRecursive(nodes, 0, numNodes);
    },

    sortNodesHighQuality : function sortNodesHighQualityFn(nodes)
    {
        var numNodesLeaf = this.numNodesLeaf;
        var numNodes = nodes.length;

        function getkeyXfn(node)
        {
            var extents = node.extents;
            return (extents[0] + extents[3]);
        }

        function getkeyYfn(node)
        {
            var extents = node.extents;
            return (extents[1] + extents[4]);
        }

        function getkeyZfn(node)
        {
            var extents = node.extents;
            return (extents[2] + extents[5]);
        }

        function getkeyXZfn(node)
        {
            var extents = node.extents;
            return (extents[0] + extents[2] + extents[3] + extents[5]);
        }

        function getkeyZXfn(node)
        {
            var extents = node.extents;
            return (extents[0] - extents[2] + extents[3] - extents[5]);
        }

        function getreversekeyXfn(node)
        {
            var extents = node.extents;
            return -(extents[0] + extents[3]);
        }

        function getreversekeyYfn(node)
        {
            var extents = node.extents;
            return -(extents[1] + extents[4]);
        }

        function getreversekeyZfn(node)
        {
            var extents = node.extents;
            return -(extents[2] + extents[5]);
        }

        function getreversekeyXZfn(node)
        {
            var extents = node.extents;
            return -(extents[0] + extents[2] + extents[3] + extents[5]);
        }

        function getreversekeyZXfn(node)
        {
            var extents = node.extents;
            return -(extents[0] - extents[2] + extents[3] - extents[5]);
        }

        var nthElement = this.nthElement;
        var calculateSAH = this.calculateSAH;
        var reverse = false;

        function sortNodesHighQualityRecursive(nodes, startIndex, endIndex)
        {
            /*jshint bitwise: false*/
            var splitNodeIndex = ((startIndex + endIndex) >> 1);
            /*jshint bitwise: true*/

            nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXfn);
            var sahX = (calculateSAH(nodes, startIndex, splitNodeIndex) + calculateSAH(nodes, splitNodeIndex, endIndex));

            nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyYfn);
            var sahY = (calculateSAH(nodes, startIndex, splitNodeIndex) + calculateSAH(nodes, splitNodeIndex, endIndex));

            nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZfn);
            var sahZ = (calculateSAH(nodes, startIndex, splitNodeIndex) + calculateSAH(nodes, splitNodeIndex, endIndex));

            nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXZfn);
            var sahXZ = (calculateSAH(nodes, startIndex, splitNodeIndex) + calculateSAH(nodes, splitNodeIndex, endIndex));

            nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZXfn);
            var sahZX = (calculateSAH(nodes, startIndex, splitNodeIndex) + calculateSAH(nodes, splitNodeIndex, endIndex));

            if (sahX <= sahY &&
                sahX <= sahZ &&
                sahX <= sahXZ &&
                sahX <= sahZX)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyXfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXfn);
                }
            }
            else if (sahZ <= sahY &&
                     sahZ <= sahXZ &&
                     sahZ <= sahZX)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyZfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZfn);
                }
            }
            else if (sahY <= sahXZ &&
                     sahY <= sahZX)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyYfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyYfn);
                }
            }
            else if (sahXZ <= sahZX)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyXZfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyXZfn);
                }
            }
            else //if (sahZX <= sahXZ)
            {
                if (reverse)
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getreversekeyZXfn);
                }
                else
                {
                    nthElement(nodes, startIndex, splitNodeIndex, endIndex, getkeyZXfn);
                }
            }

            reverse = !reverse;

            if ((startIndex + numNodesLeaf) < splitNodeIndex)
            {
                sortNodesHighQualityRecursive(nodes, startIndex, splitNodeIndex);
            }

            if ((splitNodeIndex + numNodesLeaf) < endIndex)
            {
                sortNodesHighQualityRecursive(nodes, splitNodeIndex, endIndex);
            }
        }

        sortNodesHighQualityRecursive(nodes, 0, numNodes);
    },

    calculateSAH : function calculateSAHFn(buildNodes, startIndex, endIndex)
    {
        var buildNode, extents, minX, minY, minZ, maxX, maxY, maxZ;

        buildNode = buildNodes[startIndex];
        extents = buildNode.extents;
        minX = extents[0];
        minY = extents[1];
        minZ = extents[2];
        maxX = extents[3];
        maxY = extents[4];
        maxZ = extents[5];

        for (var n = (startIndex + 1); n < endIndex; n += 1)
        {
            buildNode = buildNodes[n];
            extents = buildNode.extents;
            /*jshint white: false*/
            if (minX > extents[0]) { minX = extents[0]; }
            if (minY > extents[1]) { minY = extents[1]; }
            if (minZ > extents[2]) { minZ = extents[2]; }
            if (maxX < extents[3]) { maxX = extents[3]; }
            if (maxY < extents[4]) { maxY = extents[4]; }
            if (maxZ < extents[5]) { maxZ = extents[5]; }
            /*jshint white: true*/
        }

        return ((maxX - minX) + (maxY - minY) + (maxZ - minZ));
    },

    nthElement : function nthElementFn(nodes, first, nth, last, getkey)
    {
        function medianFn(a, b, c)
        {
            if (a < b)
            {
                if (b < c)
                {
                    return b;
                }
                else if (a < c)
                {
                    return c;
                }
                else
                {
                    return a;
                }
            }
            else if (a < c)
            {
                return a;
            }
            else if (b < c)
            {
                return c;
            }
            return b;
        }

        function insertionSortFn(nodes, first, last, getkey)
        {
            var sorted = (first + 1);
            while (sorted !== last)
            {
                var tempNode = nodes[sorted];
                var tempKey = getkey(tempNode);

                var next = sorted;
                var current = (sorted - 1);

                while (next !== first && tempKey < getkey(nodes[current]))
                {
                    nodes[next] = nodes[current];
                    next -= 1;
                    current -= 1;
                }

                if (next !== sorted)
                {
                    nodes[next] = tempNode;
                }

                sorted += 1;
            }
        }

        while ((last - first) > 8)
        {
            /*jshint bitwise: false*/
            var midValue = medianFn(getkey(nodes[first]),
                                    getkey(nodes[first + ((last - first) >> 1)]),
                                    getkey(nodes[last - 1]));
            /*jshint bitwise: true*/

            var firstPos = first;
            var lastPos  = last;
            var midPos;
            for (; ; firstPos += 1)
            {
                while (getkey(nodes[firstPos]) < midValue)
                {
                    firstPos += 1;
                }

                do
                {
                    lastPos -= 1;
                }
                while (midValue < getkey(nodes[lastPos]));

                if (firstPos >= lastPos)
                {
                    midPos = firstPos;
                    break;
                }
                else
                {
                    var temp = nodes[firstPos];
                    nodes[firstPos] = nodes[lastPos];
                    nodes[lastPos]  = temp;
                }
            }

            if (midPos <= nth)
            {
                first = midPos;
            }
            else
            {
                last = midPos;
            }
        }

        insertionSortFn(nodes, first, last, getkey);
    },

    recursiveBuild : function recursiveBuildFn(buildNodes, startIndex, endIndex, lastNodeIndex)
    {
        var nodes = this.nodes;
        var nodeIndex = lastNodeIndex;
        lastNodeIndex += 1;

        var minX, minY, minZ, maxX, maxY, maxZ, extents;
        var buildNode, lastNode;

        if ((startIndex + this.numNodesLeaf) >= endIndex)
        {
            buildNode = buildNodes[startIndex];
            extents = buildNode.extents;
            minX = extents[0];
            minY = extents[1];
            minZ = extents[2];
            maxX = extents[3];
            maxY = extents[4];
            maxZ = extents[5];

            buildNode.externalNode.aabbTreeIndex = lastNodeIndex;
            nodes[lastNodeIndex] = buildNode;

            for (var n = (startIndex + 1); n < endIndex; n += 1)
            {
                buildNode = buildNodes[n];
                extents = buildNode.extents;
                /*jshint white: false*/
                if (minX > extents[0]) { minX = extents[0]; }
                if (minY > extents[1]) { minY = extents[1]; }
                if (minZ > extents[2]) { minZ = extents[2]; }
                if (maxX < extents[3]) { maxX = extents[3]; }
                if (maxY < extents[4]) { maxY = extents[4]; }
                if (maxZ < extents[5]) { maxZ = extents[5]; }
                /*jshint white: true*/
                lastNodeIndex += 1;
                buildNode.externalNode.aabbTreeIndex = lastNodeIndex;
                nodes[lastNodeIndex] = buildNode;
            }

            lastNode = nodes[lastNodeIndex];
        }
        else
        {
            /*jshint bitwise: false*/
            var splitPosIndex = ((startIndex + endIndex) >> 1);
            /*jshint bitwise: true*/

            if ((startIndex + 1) >= splitPosIndex)
            {
                buildNode = buildNodes[startIndex];
                buildNode.externalNode.aabbTreeIndex = lastNodeIndex;
                nodes[lastNodeIndex] = buildNode;
            }
            else
            {
                this.recursiveBuild(buildNodes, startIndex, splitPosIndex, lastNodeIndex);
            }

            lastNode = nodes[lastNodeIndex];
            extents = lastNode.extents;
            minX = extents[0];
            minY = extents[1];
            minZ = extents[2];
            maxX = extents[3];
            maxY = extents[4];
            maxZ = extents[5];

            lastNodeIndex = (lastNodeIndex + lastNode.escapeNodeOffset);

            if ((splitPosIndex + 1) >= endIndex)
            {
                buildNode = buildNodes[splitPosIndex];
                buildNode.externalNode.aabbTreeIndex = lastNodeIndex;
                nodes[lastNodeIndex] = buildNode;
            }
            else
            {
                this.recursiveBuild(buildNodes, splitPosIndex, endIndex, lastNodeIndex);
            }

            lastNode = nodes[lastNodeIndex];
            extents = lastNode.extents;
            /*jshint white: false*/
            if (minX > extents[0]) { minX = extents[0]; }
            if (minY > extents[1]) { minY = extents[1]; }
            if (minZ > extents[2]) { minZ = extents[2]; }
            if (maxX < extents[3]) { maxX = extents[3]; }
            if (maxY < extents[4]) { maxY = extents[4]; }
            if (maxZ < extents[5]) { maxZ = extents[5]; }
            /*jshint white: true*/
        }

        var node = nodes[nodeIndex];
        if (node !== undefined)
        {
            node.reset(minX, minY, minZ, maxX, maxY, maxZ,
                       (lastNodeIndex + lastNode.escapeNodeOffset - nodeIndex));
        }
        else
        {
            var parentExtents = new this.arrayConstructor(6);
            parentExtents[0] = minX;
            parentExtents[1] = minY;
            parentExtents[2] = minZ;
            parentExtents[3] = maxX;
            parentExtents[4] = maxY;
            parentExtents[5] = maxZ;

            nodes[nodeIndex] = AABBTreeNode.create(parentExtents,
                                                   (lastNodeIndex + lastNode.escapeNodeOffset - nodeIndex));
        }
    },

    getVisibleNodes : function getVisibleNodesFn(planes, visibleNodes)
    {
        if (this.numExternalNodes > 0)
        {
            var nodes = this.nodes;
            var endNodeIndex = this.endNode;
            var numPlanes = planes.length;
            var numVisibleNodes = visibleNodes.length;
            var node, extents, endChildren;
            var n0, n1, n2, p0, p1, p2;
            var isInside, n, plane, d0, d1, d2;
            var nodeIndex = 0;

            for (;;)
            {
                node = nodes[nodeIndex];
                extents = node.extents;
                n0 = extents[0];
                n1 = extents[1];
                n2 = extents[2];
                p0 = extents[3];
                p1 = extents[4];
                p2 = extents[5];
                //isInsidePlanesAABB
                isInside = true;
                n = 0;
                do
                {
                    plane = planes[n];
                    d0 = plane[0];
                    d1 = plane[1];
                    d2 = plane[2];
                    if ((d0 * (d0 < 0 ? n0 : p0) + d1 * (d1 < 0 ? n1 : p1) + d2 * (d2 < 0 ? n2 : p2)) < plane[3])
                    {
                        isInside = false;
                        break;
                    }
                    n += 1;
                }
                while (n < numPlanes);
                if (isInside)
                {
                    if (node.externalNode) // Is leaf
                    {
                        visibleNodes[numVisibleNodes] = node.externalNode;
                        numVisibleNodes += 1;
                        nodeIndex += 1;
                        if (nodeIndex >= endNodeIndex)
                        {
                            break;
                        }
                    }
                    else
                    {
                        //isFullyInsidePlanesAABB
                        isInside = true;
                        n = 0;
                        do
                        {
                            plane = planes[n];
                            d0 = plane[0];
                            d1 = plane[1];
                            d2 = plane[2];
                            if ((d0 * (d0 > 0 ? n0 : p0) + d1 * (d1 > 0 ? n1 : p1) + d2 * (d2 > 0 ? n2 : p2)) < plane[3])
                            {
                                isInside = false;
                                break;
                            }
                            n += 1;
                        }
                        while (n < numPlanes);
                        if (isInside)
                        {
                            endChildren = (nodeIndex + node.escapeNodeOffset);
                            nodeIndex += 1;
                            do
                            {
                                node = nodes[nodeIndex];
                                if (node.externalNode) // Is leaf
                                {
                                    visibleNodes[numVisibleNodes] = node.externalNode;
                                    numVisibleNodes += 1;
                                }
                                nodeIndex += 1;
                            }
                            while (nodeIndex < endChildren);
                            if (nodeIndex >= endNodeIndex)
                            {
                                break;
                            }
                        }
                        else
                        {
                            nodeIndex += 1;
                        }
                    }
                }
                else
                {
                    nodeIndex += node.escapeNodeOffset;
                    if (nodeIndex >= endNodeIndex)
                    {
                        break;
                    }
                }
            }
        }
    },

    getOverlappingNodes : function getOverlappingNodesFn(queryExtents, overlappingNodes, startIndex)
    {
        if (this.numExternalNodes > 0)
        {
            var queryMinX = queryExtents[0];
            var queryMinY = queryExtents[1];
            var queryMinZ = queryExtents[2];
            var queryMaxX = queryExtents[3];
            var queryMaxY = queryExtents[4];
            var queryMaxZ = queryExtents[5];
            var nodes = this.nodes;
            var endNodeIndex = this.endNode;
            var node, extents, endChildren;
            var numOverlappingNodes = 0;
            var storageIndex = (startIndex === undefined) ? overlappingNodes.length : startIndex;
            var nodeIndex = 0;
            for (;;)
            {
                node = nodes[nodeIndex];
                extents = node.extents;
                var minX = extents[0];
                var minY = extents[1];
                var minZ = extents[2];
                var maxX = extents[3];
                var maxY = extents[4];
                var maxZ = extents[5];
                if (queryMinX <= maxX &&
                    queryMinY <= maxY &&
                    queryMinZ <= maxZ &&
                    queryMaxX >= minX &&
                    queryMaxY >= minY &&
                    queryMaxZ >= minZ)
                {
                    if (node.externalNode) // Is leaf
                    {
                        overlappingNodes[storageIndex] = node.externalNode;
                        storageIndex += 1;
                        numOverlappingNodes += 1;
                        nodeIndex += 1;
                        if (nodeIndex >= endNodeIndex)
                        {
                            break;
                        }
                    }
                    else
                    {
                        if (queryMaxX >= maxX &&
                            queryMaxY >= maxY &&
                            queryMaxZ >= maxZ &&
                            queryMinX <= minX &&
                            queryMinY <= minY &&
                            queryMinZ <= minZ)
                        {
                            endChildren = (nodeIndex + node.escapeNodeOffset);
                            nodeIndex += 1;
                            do
                            {
                                node = nodes[nodeIndex];
                                if (node.externalNode) // Is leaf
                                {
                                    overlappingNodes[storageIndex] = node.externalNode;
                                    storageIndex += 1;
                                    numOverlappingNodes += 1;
                                }
                                nodeIndex += 1;
                            }
                            while (nodeIndex < endChildren);
                            if (nodeIndex >= endNodeIndex)
                            {
                                break;
                            }
                        }
                        else
                        {
                            nodeIndex += 1;
                        }
                    }
                }
                else
                {
                    nodeIndex += node.escapeNodeOffset;
                    if (nodeIndex >= endNodeIndex)
                    {
                        break;
                    }
                }
            }
            return numOverlappingNodes;
        }
        else
        {
            return 0;
        }
    },

    getSphereOverlappingNodes : function getSphereOverlappingNodesFn(center, radius, overlappingNodes)
    {
        if (this.numExternalNodes > 0)
        {
            var radiusSquared = (radius * radius);
            var centerX = center[0];
            var centerY = center[1];
            var centerZ = center[2];
            var nodes = this.nodes;
            var endNodeIndex = this.endNode;
            var node, extents;
            var numOverlappingNodes = overlappingNodes.length;
            var nodeIndex = 0;
            for (;;)
            {
                node = nodes[nodeIndex];
                extents = node.extents;
                var minX = extents[0];
                var minY = extents[1];
                var minZ = extents[2];
                var maxX = extents[3];
                var maxY = extents[4];
                var maxZ = extents[5];
                var totalDistance = 0, sideDistance;
                if (centerX < minX)
                {
                    sideDistance = (minX - centerX);
                    totalDistance += (sideDistance * sideDistance);
                }
                else if (centerX > maxX)
                {
                    sideDistance = (centerX - maxX);
                    totalDistance += (sideDistance * sideDistance);
                }
                if (centerY < minY)
                {
                    sideDistance = (minY - centerY);
                    totalDistance += (sideDistance * sideDistance);
                }
                else if (centerY > maxY)
                {
                    sideDistance = (centerY - maxY);
                    totalDistance += (sideDistance * sideDistance);
                }
                if (centerZ < minZ)
                {
                    sideDistance = (minZ - centerZ);
                    totalDistance += (sideDistance * sideDistance);
                }
                else if (centerZ > maxZ)
                {
                    sideDistance = (centerZ - maxZ);
                    totalDistance += (sideDistance * sideDistance);
                }
                if (totalDistance <= radiusSquared)
                {
                    nodeIndex += 1;
                    if (node.externalNode) // Is leaf
                    {
                        overlappingNodes[numOverlappingNodes] = node.externalNode;
                        numOverlappingNodes += 1;
                        if (nodeIndex >= endNodeIndex)
                        {
                            break;
                        }
                    }
                }
                else
                {
                    nodeIndex += node.escapeNodeOffset;
                    if (nodeIndex >= endNodeIndex)
                    {
                        break;
                    }
                }
            }
        }
    },

    getOverlappingPairs : function getOverlappingPairsFn(overlappingPairs, startIndex)
    {
        if (this.numExternalNodes > 0)
        {
            var nodes = this.nodes;
            var endNodeIndex = this.endNode;
            var currentNode, currentExternalNode, node, extents;
            var numInsertions = 0;
            var storageIndex = (startIndex === undefined) ? overlappingPairs.length : startIndex;
            var currentNodeIndex = 0, nodeIndex;
            for (;;)
            {
                currentNode = nodes[currentNodeIndex];
                while (!currentNode.externalNode) // No leaf
                {
                    currentNodeIndex += 1;
                    currentNode = nodes[currentNodeIndex];
                }

                currentNodeIndex += 1;
                if (currentNodeIndex < endNodeIndex)
                {
                    currentExternalNode = currentNode.externalNode;
                    extents = currentNode.extents;
                    var minX = extents[0];
                    var minY = extents[1];
                    var minZ = extents[2];
                    var maxX = extents[3];
                    var maxY = extents[4];
                    var maxZ = extents[5];

                    nodeIndex = currentNodeIndex;
                    for (;;)
                    {
                        node = nodes[nodeIndex];
                        extents = node.extents;
                        if (minX <= extents[3] &&
                            minY <= extents[4] &&
                            minZ <= extents[5] &&
                            maxX >= extents[0] &&
                            maxY >= extents[1] &&
                            maxZ >= extents[2])
                        {
                            nodeIndex += 1;
                            if (node.externalNode) // Is leaf
                            {
                                overlappingPairs[storageIndex] = currentExternalNode;
                                overlappingPairs[storageIndex + 1] = node.externalNode;
                                storageIndex += 2;
                                numInsertions += 2;
                                if (nodeIndex >= endNodeIndex)
                                {
                                    break;
                                }
                            }
                        }
                        else
                        {
                            nodeIndex += node.escapeNodeOffset;
                            if (nodeIndex >= endNodeIndex)
                            {
                                break;
                            }
                        }
                    }
                }
                else
                {
                    break;
                }
            }
            return numInsertions;
        }
        else
        {
            return 0;
        }
    },

    getRootNode : function getRootNodeFn()
    {
        return this.nodes[0];
    },

    getNodes : function getNodesFn()
    {
        return this.nodes;
    },

    getEndNodeIndex : function getEndNodeIndexFn()
    {
        return this.endNode;
    },

    clear : function clearFn()
    {
        this.nodes = [];
        this.endNode = 0;
        this.needsRebuild = false;
        this.needsRebound = false;
        this.numAdds = 0;
        this.numUpdates = 0;
        this.numExternalNodes = 0;
        this.startUpdate = Number.MAX_VALUE;
        this.endUpdate = -Number.MAX_VALUE;
    }
};

AABBTree.rayTest = function aabbtreeRayTestFn(trees, ray, callback)
{
    // convert ray to parametric form
    var origin = ray.origin;
    var direction = ray.direction;

    // values used throughout calculations.
    var o0 = origin[0];
    var o1 = origin[1];
    var o2 = origin[2];
    var d0 = direction[0];
    var d1 = direction[1];
    var d2 = direction[2];
    var id0 = 1 / d0;
    var id1 = 1 / d1;
    var id2 = 1 / d2;

    // evaluate distance factor to a node's extents from ray origin, along direction
    // use this to induce an ordering on which nodes to check.
    function distanceExtents(extents, upperBound)
    {
        var min0 = extents[0];
        var min1 = extents[1];
        var min2 = extents[2];
        var max0 = extents[3];
        var max1 = extents[4];
        var max2 = extents[5];

        // treat origin internal to extents as 0 distance.
        if (min0 <= o0 && o0 <= max0 &&
            min1 <= o1 && o1 <= max1 &&
            min2 <= o2 && o2 <= max2)
        {
            return 0.0;
        }

        var tmin, tmax;
        var tymin, tymax;
        var del;
        if (d0 >= 0)
        {
            // Deal with cases where d0 == 0
            del = (min0 - o0);
            tmin = ((del === 0) ? 0 : (del * id0));
            del = (max0 - o0);
            tmax = ((del === 0) ? 0 : (del * id0));
        }
        else
        {
            tmin = ((max0 - o0) * id0);
            tmax = ((min0 - o0) * id0);
        }

        if (d1 >= 0)
        {
            // Deal with cases where d1 == 0
            del = (min1 - o1);
            tymin = ((del === 0) ? 0 : (del * id1));
            del = (max1 - o1);
            tymax = ((del === 0) ? 0 : (del * id1));
        }
        else
        {
            tymin = ((max1 - o1) * id1);
            tymax = ((min1 - o1) * id1);
        }

        if ((tmin > tymax) || (tymin > tmax))
        {
            return undefined;
        }

        if (tymin > tmin)
        {
            tmin = tymin;
        }

        if (tymax < tmax)
        {
            tmax = tymax;
        }

        var tzmin, tzmax;
        if (d2 >= 0)
        {
            // Deal with cases where d2 == 0
            del = (min2 - o2);
            tzmin = ((del === 0) ? 0 : (del * id2));
            del = (max2 - o2);
            tzmax = ((del === 0) ? 0 : (del * id2));
        }
        else
        {
            tzmin = ((max2 - o2) * id2);
            tzmax = ((min2 - o2) * id2);
        }

        if ((tmin > tzmax) || (tzmin > tmax))
        {
            return undefined;
        }

        if (tzmin > tmin)
        {
            tmin = tzmin;
        }

        if (tzmax < tmax)
        {
            tmax = tzmax;
        }

        if (tmin < 0)
        {
            tmin = tmax;
        }

        return (0 <= tmin && tmin < upperBound) ? tmin : undefined;
    }

    // we traverse both trees at once
    // keeping a priority list of nodes to check next.

    // TODO: possibly implement priority list more effeciently?
    //       binary heap probably too much overhead in typical case.
    var priorityList = [];
    //current upperBound on distance to first intersection
    //and current closest object properties
    var minimumResult = null;

    //if node is a leaf, intersect ray with shape
    // otherwise insert node into priority list.
    function processNode(tree, nodeIndex, upperBound)
    {
        var nodes = tree.getNodes();
        var node = nodes[nodeIndex];
        var distance = distanceExtents(node.extents, upperBound);
        if (distance === undefined)
        {
            return upperBound;
        }

        if (node.externalNode)
        {
            var result = callback(tree, node.externalNode, ray, distance, upperBound);
            if (result)
            {
                minimumResult = result;
                upperBound = result.factor;
            }
        }
        else
        {
            // TODO: change to binary search?
            var length = priorityList.length;
            var i;
            for (i = 0; i < length; i += 1)
            {
                var curObj = priorityList[i];
                if (distance > curObj.distance)
                {
                    break;
                }
            }

            //insert node at index i
            priorityList.splice(i - 1, 0, {
                    tree: tree,
                    nodeIndex: nodeIndex,
                    distance: distance
                });
        }

        return upperBound;
    }

    var upperBound = ray.maxFactor;

    var tree;
    var i;
    for (i = 0; i < trees.length; i += 1)
    {
        tree = trees[i];
        if (tree.endNode !== 0)
        {
            upperBound = processNode(tree, 0, upperBound);
        }
    }

    while (priorityList.length !== 0)
    {
        var nodeObj = priorityList.pop();
        // A node inserted into priority list after this one may have
        // moved the upper bound.
        if (nodeObj.distance >= upperBound)
        {
            continue;
        }

        var nodeIndex = nodeObj.nodeIndex;
        tree = nodeObj.tree;
        var nodes = tree.getNodes();

        var node = nodes[nodeIndex];
        var maxIndex = nodeIndex + node.escapeNodeOffset;

        var childIndex = nodeIndex + 1;
        do
        {
            upperBound = processNode(tree, childIndex, upperBound);
            childIndex += nodes[childIndex].escapeNodeOffset;
        }
        while (childIndex < maxIndex);
    }

    return minimumResult;
};

// Constructor function
AABBTree.create = function aabbtreeCreateFn(highQuality)
{
    var t = new AABBTree();
    t.clear();
    if (highQuality)
    {
        t.highQuality = true;
    }
    return t;
};

// Detect correct typed arrays
(function () {
    AABBTree.prototype.arrayConstructor = Array;
    if (typeof Float32Array !== "undefined")
    {
        var testArray = new Float32Array(4);
        var textDescriptor = Object.prototype.toString.call(testArray);
        if (textDescriptor === '[object Float32Array]')
        {
            AABBTree.prototype.arrayConstructor = Float32Array;
        }
    }
}());

// Copyright (c) 2010-2011 Turbulenz Limited

//
// Observer
//
function Observer() {}

Observer.prototype = {
    subscribe: function observerSubscribeFn(subscriber)
    {
        //Check for duplicates
        var subscribers = this.subscribers;
        var length = subscribers.length;
        for (var index = 0; index < length; index += 1)
        {
            if (subscribers[index] === subscriber)
            {
                return;
            }
        }

        subscribers.push(subscriber);
    },

    unsubscribe: function observerUnsubscribeFn(subscriber)
    {
        var subscribers = this.subscribers;
        var length = subscribers.length;
        for (var index = 0; index < length; index += 1)
        {
            if (subscribers[index] === subscriber)
            {
                subscribers.splice(index, 1);
                break;
            }
        }
    },

    unsubscribeAll: function observerUnsubscribeAllFn(subscriber)
    {
        this.subscribers.length = 0;
    },

    // this function can take any number of arguments
    // they are passed on to the subscribers
    notify: function observerNotifyFn()
    {
        // Note that the callbacks might unsubscribe
        var subscribers = this.subscribers;
        var length = this.subscribers.length;
        var index = 0;

        while (index < length)
        {
            subscribers[index].apply(null, arguments);
            if (subscribers.length === length)
            {
                index += 1;
            }
            else
            {
                length = subscribers.length;
            }
        }
    }
};

Observer.create = function observerCreateFn()
{
    var observer = new Observer();
    observer.subscribers = [];
    return observer;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global Uint16Array*/
/*global window*/


//
// DDSLoader
//
function DDSLoader() {}
DDSLoader.prototype = {

    version : 1,

    // surface description flags
    DDSF_CAPS           : 0x00000001,
    DDSF_HEIGHT         : 0x00000002,
    DDSF_WIDTH          : 0x00000004,
    DDSF_PITCH          : 0x00000008,
    DDSF_PIXELFORMAT    : 0x00001000,
    DDSF_MIPMAPCOUNT    : 0x00020000,
    DDSF_LINEARSIZE     : 0x00080000,
    DDSF_DEPTH          : 0x00800000,

    // pixel format flags
    DDSF_ALPHAPIXELS    : 0x00000001,
    DDSF_FOURCC         : 0x00000004,
    DDSF_RGB            : 0x00000040,
    DDSF_RGBA           : 0x00000041,

    // dwCaps1 flags
    DDSF_COMPLEX         : 0x00000008,
    DDSF_TEXTURE         : 0x00001000,
    DDSF_MIPMAP          : 0x00400000,

    // dwCaps2 flags
    DDSF_CUBEMAP            : 0x00000200,
    DDSF_CUBEMAP_POSITIVEX  : 0x00000400,
    DDSF_CUBEMAP_NEGATIVEX  : 0x00000800,
    DDSF_CUBEMAP_POSITIVEY  : 0x00001000,
    DDSF_CUBEMAP_NEGATIVEY  : 0x00002000,
    DDSF_CUBEMAP_POSITIVEZ  : 0x00004000,
    DDSF_CUBEMAP_NEGATIVEZ  : 0x00008000,
    DDSF_CUBEMAP_ALL_FACES  : 0x0000FC00,
    DDSF_VOLUME             : 0x00200000,

    // compressed texture types
    FOURCC_UNKNOWN       : 0,

    FOURCC_R8G8B8        : 20,
    FOURCC_A8R8G8B8      : 21,
    FOURCC_X8R8G8B8      : 22,
    FOURCC_R5G6B5        : 23,
    FOURCC_X1R5G5B5      : 24,
    FOURCC_A1R5G5B5      : 25,
    FOURCC_A4R4G4B4      : 26,
    FOURCC_R3G3B2        : 27,
    FOURCC_A8            : 28,
    FOURCC_A8R3G3B2      : 29,
    FOURCC_X4R4G4B4      : 30,
    FOURCC_A2B10G10R10   : 31,
    FOURCC_A8B8G8R8      : 32,
    FOURCC_X8B8G8R8      : 33,
    FOURCC_G16R16        : 34,
    FOURCC_A2R10G10B10   : 35,
    FOURCC_A16B16G16R16  : 36,

    FOURCC_L8            : 50,
    FOURCC_A8L8          : 51,
    FOURCC_A4L4          : 52,
    FOURCC_DXT1          : 0x31545844, //(MAKEFOURCC('D','X','T','1'))
    FOURCC_DXT2          : 0x32545844, //(MAKEFOURCC('D','X','T','1'))
    FOURCC_DXT3          : 0x33545844, //(MAKEFOURCC('D','X','T','3'))
    FOURCC_DXT4          : 0x34545844, //(MAKEFOURCC('D','X','T','3'))
    FOURCC_DXT5          : 0x35545844, //(MAKEFOURCC('D','X','T','5'))

    FOURCC_D16_LOCKABLE  : 70,
    FOURCC_D32           : 71,
    FOURCC_D24X8         : 77,
    FOURCC_D16           : 80,

    FOURCC_D32F_LOCKABLE : 82,

    FOURCC_L16           : 81,

    // Floating point surface formats

    // s10e5 formats (16-bits per channel)
    FOURCC_R16F          : 111,
    FOURCC_G16R16F       : 112,
    FOURCC_A16B16G16R16F : 113,

    // IEEE s23e8 formats (32-bits per channel)
    FOURCC_R32F          : 114,
    FOURCC_G32R32F       : 115,
    FOURCC_A32B32G32R32F : 116,

    BGRPIXELFORMAT_B5G6R5 : 1,
    BGRPIXELFORMAT_B8G8R8A8 : 2,
    BGRPIXELFORMAT_B8G8R8 : 3,

    processBytes : function processBytesFn(bytes)
    {
        if (!this.isValidHeader(bytes))
        {
            return;
        }

        // Skip signature
        var offset = 4;

        var header = this.parseHeader(bytes, offset);
        offset += 31 * 4;

        this.width = header.dwWidth;
        this.height = header.dwHeight;

        /*jshint bitwise: false*/
        if ((header.dwCaps2 & this.DDSF_VOLUME) && (header.dwDepth > 0))
        {
            this.depth = header.dwDepth;
        }
        else
        {
            this.depth = 1;
        }

        if (header.dwFlags & this.DDSF_MIPMAPCOUNT)
        {
            this.numLevels = header.dwMipMapCount;
        }
        else
        {
            this.numLevels = 1;
        }

        if (header.dwCaps2 & this.DDSF_CUBEMAP)
        {
            var numFaces = 0;
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEX) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEX) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEY) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEY) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_POSITIVEZ) ? 1 : 0);
            numFaces += ((header.dwCaps2 & this.DDSF_CUBEMAP_NEGATIVEZ) ? 1 : 0);

            if (numFaces !== 6 || this.width !== this.height)
            {
                return;
            }

            this.numFaces = numFaces;
        }
        else
        {
            this.numFaces = 1;
        }

        var compressed = false;
        var bpe = 0;

        // figure out what the image format is
        var gd = this.gd;
        if (header.ddspf.dwFlags & this.DDSF_FOURCC)
        {
            switch (header.ddspf.dwFourCC)
            {
            case this.FOURCC_DXT1:
                this.format = gd.PIXELFORMAT_DXT1;
                bpe = 8;
                compressed = true;
                break;

            case this.FOURCC_DXT2:
            case this.FOURCC_DXT3:
                this.format = gd.PIXELFORMAT_DXT3;
                bpe = 16;
                compressed = true;
                break;

            case this.FOURCC_DXT4:
            case this.FOURCC_DXT5:
            case this.FOURCC_RXGB:
                this.format = gd.PIXELFORMAT_DXT5;
                bpe = 16;
                compressed = true;
                break;

            case this.FOURCC_R8G8B8:
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8;
                bpe = 3;
                break;

            case this.FOURCC_A8R8G8B8:
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
                bpe = 4;
                break;

            case this.FOURCC_R5G6B5:
                this.bgrFormat = this.BGRPIXELFORMAT_B5G6R5;
                bpe = 2;
                break;

            case this.FOURCC_A8:
                this.format = gd.PIXELFORMAT_A8;
                bpe = 1;
                break;

            case this.FOURCC_A8B8G8R8:
                this.format = gd.PIXELFORMAT_R8G8B8A8;
                bpe = 4;
                break;

            case this.FOURCC_L8:
                this.format = gd.PIXELFORMAT_L8;
                bpe = 1;
                break;

            case this.FOURCC_A8L8:
                this.format = gd.PIXELFORMAT_L8A8;
                bpe = 2;
                break;

                //these are unsupported for now
            case this.FOURCC_UNKNOWN:
            case this.FOURCC_ATI1:
            case this.FOURCC_ATI2:
            case this.FOURCC_X8R8G8B8:
            case this.FOURCC_X8B8G8R8:
            case this.FOURCC_A2B10G10R10:
            case this.FOURCC_A2R10G10B10:
            case this.FOURCC_A16B16G16R16:
            case this.FOURCC_R16F:
            case this.FOURCC_A16B16G16R16F:
            case this.FOURCC_R32F:
            case this.FOURCC_A32B32G32R32F:
            case this.FOURCC_L16:
            case this.FOURCC_X1R5G5B5:
            case this.FOURCC_A1R5G5B5:
            case this.FOURCC_A4R4G4B4:
            case this.FOURCC_R3G3B2:
            case this.FOURCC_A8R3G3B2:
            case this.FOURCC_X4R4G4B4:
            case this.FOURCC_A4L4:
            case this.FOURCC_D16_LOCKABLE:
            case this.FOURCC_D32:
            case this.FOURCC_D24X8:
            case this.FOURCC_D16:
            case this.FOURCC_D32F_LOCKABLE:
            case this.FOURCC_G16R16:
            case this.FOURCC_G16R16F:
            case this.FOURCC_G32R32F:
                break;

            default:
                return;
            }
        }
        else if (header.ddspf.dwFlags === this.DDSF_RGBA && header.ddspf.dwRGBBitCount === 32)
        {
            if (header.ddspf.dwRBitMask === 0x000000FF &&
                header.ddspf.dwGBitMask === 0x0000FF00 &&
                header.ddspf.dwBBitMask === 0x00FF0000 &&
                header.ddspf.dwABitMask === 0xFF000000)
            {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            }
            else
            {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
            }
            bpe = 4;
        }
        else if (header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 32)
        {
            if (header.ddspf.dwRBitMask === 0x000000FF &&
                header.ddspf.dwGBitMask === 0x0000FF00 &&
                header.ddspf.dwBBitMask === 0x00FF0000)
            {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            }
            else
            {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8A8;
            }
            bpe = 4;
        }
        else if (header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 24)
        {
            if (header.ddspf.dwRBitMask === 0x000000FF &&
                header.ddspf.dwGBitMask === 0x0000FF00 &&
                header.ddspf.dwBBitMask === 0x00FF0000)
            {
                this.format = gd.PIXELFORMAT_R8G8B8;
            }
            else
            {
                this.bgrFormat = this.BGRPIXELFORMAT_B8G8R8;
            }
            bpe = 3;
        }
        else if (header.ddspf.dwFlags === this.DDSF_RGB && header.ddspf.dwRGBBitCount === 16)
        {
            if (header.ddspf.dwRBitMask === 0x0000F800 &&
                header.ddspf.dwGBitMask === 0x000007E0 &&
                header.ddspf.dwBBitMask === 0x0000001F)
            {
                this.format = gd.PIXELFORMAT_R5G6B5;
            }
            else
            {
                this.bgrFormat = this.BGRPIXELFORMAT_B5G6R5;
            }
            bpe = 2;
        }
        else if (header.ddspf.dwRGBBitCount === 8)
        {
            this.format = gd.PIXELFORMAT_L8;
            bpe = 1;
        }
        else
        {
            return;
        }

        var size = 0;
        for (var face = 0; face < this.numFaces; face += 1)
        {
            var w = this.width, h = this.height, d = this.depth;
            for (var level = 0; level < this.numLevels; level += 1)
            {
                var ew = (compressed ? Math.floor((w + 3) / 4) : w);
                var eh = (compressed ? Math.floor((h + 3) / 4) : h);
                size += (ew * eh * d * bpe);

                w = (w > 1 ? (w >> 1) : 1);
                h = (h > 1 ? (h >> 1) : 1);
                d = (d > 1 ? (d >> 1) : 1);
            }
        }
        /*jshint bitwise: true*/

        if (bytes.length < (offset + size))
        {
            return;
        }

        this.bytesPerPixel = bpe;

        var data = bytes.subarray(offset);
        bytes = null;

        var swapBytes = false;
        switch (this.bgrFormat)
        {
        case this.BGRPIXELFORMAT_B8G8R8:
            this.format = gd.PIXELFORMAT_R8G8B8;
            swapBytes = true;
            break;
        case this.BGRPIXELFORMAT_B8G8R8A8:
            this.format = gd.PIXELFORMAT_R8G8B8A8;
            swapBytes = true;
            break;
        case this.BGRPIXELFORMAT_B5G6R5:
            this.format = gd.PIXELFORMAT_R5G6B5;
            swapBytes = true;
            break;
        default:
            break;
        }

        if (swapBytes)
        {
            data = this.convertBGR2RGB(data);
        }

        if (this.format === gd.PIXELFORMAT_DXT1)
        {
            if (!gd.isSupported('TEXTURE_DXT1'))
            {
                data = this.convertDXT1ToRGBA(data);
            }
        }
        else if (this.format === gd.PIXELFORMAT_DXT3)
        {
            if (!gd.isSupported('TEXTURE_DXT3'))
            {
                data = this.convertDXT3ToRGBA(data);
            }
        }
        else if (this.format === gd.PIXELFORMAT_DXT5)
        {
            if (!gd.isSupported('TEXTURE_DXT5'))
            {
                data = this.convertDXT5ToRGBA(data);
            }
        }

        this.data = data;
    },

    parseHeader : function parseHeaderFn(bytes, offset)
    {
        function readUInt32()
        {
            var value = ((bytes[offset]) +
                         (bytes[offset + 1] * 256) +
                         (bytes[offset + 2] * 65536) +
                         (bytes[offset + 3] * 16777216));
            offset += 4;
            return value;
        }

        function parsePixelFormatHeader()
        {
            return {
                    dwSize : readUInt32(),
                    dwFlags : readUInt32(),
                    dwFourCC : readUInt32(),
                    dwRGBBitCount : readUInt32(),
                    dwRBitMask : readUInt32(),
                    dwGBitMask : readUInt32(),
                    dwBBitMask : readUInt32(),
                    dwABitMask : readUInt32()
                };
        }

        var header =
        {
            dwSize : readUInt32(),
            dwFlags : readUInt32(),
            dwHeight : readUInt32(),
            dwWidth : readUInt32(),
            dwPitchOrLinearSize : readUInt32(),
            dwDepth : readUInt32(),
            dwMipMapCount : readUInt32(),
            dwReserved1: [readUInt32(), readUInt32(), readUInt32(), readUInt32(), readUInt32(), readUInt32(),
                          readUInt32(), readUInt32(), readUInt32(), readUInt32(), readUInt32()],
            ddspf : parsePixelFormatHeader(),
            dwCaps1 : readUInt32(),
            dwCaps2 : readUInt32(),
            dwReserved2 : [readUInt32(), readUInt32(), readUInt32()]
        };

        return header;
    },

    isValidHeader : function isValidHeaderFn(bytes)
    {
        return (68 === bytes[0] &&
                68 === bytes[1] &&
                83 === bytes[2] &&
                32 === bytes[3]);
    },

    convertBGR2RGB : function convertBGR2RGBFn(data)
    {
        // Rearrange the colors from BGR to RGB
        var bytesPerPixel = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var numLevels = this.numLevels;
        var numFaces = this.numFaces;

        var numPixels = 0;
        for (var level = 0; level < numLevels; level += 1)
        {
            numPixels += (width * height);
            width = (width > 1 ? Math.floor(width / 2) : 1);
            height = (height > 1 ? Math.floor(height / 2) : 1);
        }

        var size = (numPixels * bytesPerPixel * numFaces);
        var offset = 0;
        if (bytesPerPixel === 3 || bytesPerPixel === 4)
        {
            do
            {
                var tmp = data[offset];
                data[offset] = data[offset + 2];
                data[offset + 2] = tmp;
                offset += bytesPerPixel;
            }
            while (offset < size);
        }
        else if (bytesPerPixel === 2)
        {
            var dst = new Uint16Array(numPixels * numFaces);
            var src = 0, dest = 0;
            var r, g, b;

            /*jshint bitwise: false*/
            var mask5bit = ((1 << 5) - 1);
            var midMask6bit = (((1 << 6) - 1) << 5);
            do
            {
                var value = ((data[src + 1] << 8) | data[src]);
                src += 2;
                r = (value & mask5bit) << 11;
                g = (value & midMask6bit);
                b = ((value >> 11) & mask5bit);
                dst[dest] = r | g | b;
                dest += 1;
            }
            while (offset < size);
            /*jshint bitwise: true*/
            return dst;
        }
        return data;
    },

    decode565: function decode565Fn(value, color)
    {
        /*jshint bitwise: false*/
        color[0] = ((value >> 11) & 31) * (255 / 31);
        color[1] = ((value >> 5)  & 63) * (255 / 63);
        color[2] = ((value)       & 31) * (255 / 31);
        color[3] = 255;
        /*jshint bitwise: true*/
        return color;
    },

    decodeColor : function decodeColorFn(data, src, isDXT1, out, scratchpad)
    {
        /*jshint bitwise: false*/
        var cache = scratchpad.cache;
        var decode565 = DDSLoader.prototype.decode565;
        var col0 = ((data[src + 1] << 8) | data[src]);
        src += 2;
        var col1 = ((data[src + 1] << 8) | data[src]);
        src += 2;

        var c0, c1, c2, c3, i;
        if (col0 !== col1)
        {
            c0 = decode565(col0, cache[0]);
            c1 = decode565(col1, cache[1]);
            c2 = cache[2];
            c3 = cache[3];

            if (!isDXT1 || col0 > col1)
            {
                for (i = 0; i < 3; i += 1)
                {
                    var c0i = c0[i];
                    var c1i = c1[i];
                    c2[i] = ((((c0i * 2) + c1i) / 3) | 0);
                    c3[i] = (((c0i + (c1i * 2)) / 3) | 0);
                }
                c2[3] = 255;
                c3[3] = 255;
            }
            else
            {
                for (i = 0; i < 3; i += 1)
                {
                    c2[i] = ((c0[i] + c1[i]) >> 1);
                    c3[i] = 0;
                }
                c2[3] = 255;
                c3[3] = 0;
            }
        }
        else
        {
            c0 = decode565(col0, cache[0]);
            c1 = c0;
            c2 = c0;
            c3 = cache[1];
            for (i = 0; i < 4; i += 1)
            {
                c3[i] = 0;
            }
        }

        var c = scratchpad.colorArray;
        c[0] = c0;
        c[1] = c1;
        c[2] = c2;
        c[3] = c3;

        // ((1 << 2) - 1) === 3;
        var row, dest, color;
        if (isDXT1)
        {
            for (i = 0; i < 4; i += 1)
            {
                row = data[src + i];
                dest = out[i];
                dest[0] = c[(row)      & 3];
                dest[1] = c[(row >> 2) & 3];
                dest[2] = c[(row >> 4) & 3];
                dest[3] = c[(row >> 6) & 3];
            }
        }
        else
        {
            for (i = 0; i < 4; i += 1)
            {
                row = data[src + i];
                dest = out[i];

                color = c[(row)      & 3];
                dest[0][0] = color[0];
                dest[0][1] = color[1];
                dest[0][2] = color[2];
                dest[0][3] = color[3];

                color = c[(row >> 2) & 3];
                dest[1][0] = color[0];
                dest[1][1] = color[1];
                dest[1][2] = color[2];
                dest[1][3] = color[3];

                color = c[(row >> 4) & 3];
                dest[2][0] = color[0];
                dest[2][1] = color[1];
                dest[2][2] = color[2];
                dest[2][3] = color[3];

                color = c[(row >> 6) & 3];
                dest[3][0] = color[0];
                dest[3][1] = color[1];
                dest[3][2] = color[2];
                dest[3][3] = color[3];
            }
        }
        /*jshint bitwise: true*/
    },

    decodeDXT3Alpha : function decodeDXT3AlphaFn(data, src, out)
    {
        /*jshint bitwise: false*/
        // ((1 << 4) - 1) === 15;
        for (var i = 0; i < 4; i += 1)
        {
            var row = ((data[src + 1] << 8) | data[src]);
            src += 2;
            var dest = out[i];
            if (row)
            {
                dest[0][3] = ((row)       & 15) * (255 / 15);
                dest[1][3] = ((row >> 4)  & 15) * (255 / 15);
                dest[2][3] = ((row >> 8)  & 15) * (255 / 15);
                dest[3][3] = ((row >> 12) & 15) * (255 / 15);
            }
            else
            {
                dest[0][3] = 0;
                dest[1][3] = 0;
                dest[2][3] = 0;
                dest[3][3] = 0;
            }
        }
        /*jshint bitwise: true*/
    },

    decodeDXT5Alpha : function decodeDXT5AlphaFn(data, src, out, scratchpad)
    {
        var a0 = data[src];
        src += 1;
        var a1 = data[src];
        src += 1;

        /*jshint bitwise: false*/
        var a = scratchpad.alphaArray;

        a[0] = a0;
        a[1] = a1;
        if (a0 > a1)
        {
            a[2] = ((((a0 * 6) + (a1 * 1)) / 7) | 0);
            a[3] = ((((a0 * 5) + (a1 * 2)) / 7) | 0);
            a[4] = ((((a0 * 4) + (a1 * 3)) / 7) | 0);
            a[5] = ((((a0 * 3) + (a1 * 4)) / 7) | 0);
            a[6] = ((((a0 * 2) + (a1 * 5)) / 7) | 0);
            a[7] = ((((a0 * 1) + (a1 * 6)) / 7) | 0);
        }
        else if (a0 < a1)
        {
            a[2] = ((((a0 * 4) + (a1 * 1)) / 5) | 0);
            a[3] = ((((a0 * 3) + (a1 * 2)) / 5) | 0);
            a[4] = ((((a0 * 2) + (a1 * 3)) / 5) | 0);
            a[5] = ((((a0 * 1) + (a1 * 4)) / 5) | 0);
            a[6] = 0;
            a[7] = 255;
        }
        else //if (a0 === a1)
        {
            a[2] = a0;
            a[3] = a0;
            a[4] = a0;
            a[5] = a0;
            a[6] = 0;
            a[7] = 255;
        }

        // ((1 << 3) - 1) === 7
        var dest;
        for (var i = 0; i < 2; i += 1)
        {
            var value = (data[src] | (data[src + 1] << 8) | (data[src +  2] << 16));
            src += 3;
            dest = out[(i * 2)];
            dest[0][3] = a[(value)      & 7];
            dest[1][3] = a[(value >> 3) & 7];
            dest[2][3] = a[(value >> 6) & 7];
            dest[3][3] = a[(value >> 9) & 7];
            dest = out[(i * 2) + 1];
            dest[0][3] = a[(value >> 12) & 7];
            dest[1][3] = a[(value >> 15) & 7];
            dest[2][3] = a[(value >> 18) & 7];
            dest[3][3] = a[(value >> 21) & 7];
        }
        /*jshint bitwise: true*/
    },

    convertDXT1ToRGBA : function convertDXT1ToRGBAFn(data)
    {
        var decodeColor = this.decodeColor;

        var scratchpad = { cache: [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                           colorArray: new Array(4)
                         };
        data = this.convertToRGBA(data, function decodeDXT1(data, src, out) {
            decodeColor(data, src, true, out, scratchpad);
        }, 8);
        this.format = this.gd.PIXELFORMAT_R8G8B8A8;
        return data;
    },

    convertDXT3ToRGBA : function convertDXT3ToRGBAFn(data)
    {
        var decodeColor = this.decodeColor;
        var decodeDXT3Alpha = this.decodeDXT3Alpha;
        var scratchpad = { cache: [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                           colorArray: new Array(4)
                         };
        data = this.convertToRGBA(data, function decodeDXT3(data, src, out) {
            decodeColor(data, (src + 8), false, out, scratchpad);
            decodeDXT3Alpha(data, src, out);
        }, 16);
        this.format = this.gd.PIXELFORMAT_R8G8B8A8;
        return data;
    },

    convertDXT5ToRGBA : function convertDXT5ToRGBAFn(data)
    {
        var decodeColor = this.decodeColor;
        var decodeDXT5Alpha = this.decodeDXT5Alpha;
        var scratchpad = { cache: [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                           colorArray: new Array(4),
                           alphaArray: new Uint8Array(8)
                         };
        data = this.convertToRGBA(data, function decodeDXT5(data, src, out) {
            decodeColor(data, (src + 8), false, out, scratchpad);
            decodeDXT5Alpha(data, src, out, scratchpad);
        }, 16);
        this.format = this.gd.PIXELFORMAT_R8G8B8A8;
        return data;
    },

    convertToRGBA : function convertToRGBAFn(data, decode, srcStride)
    {
        //var bpp = 4;
        var level;
        var width = this.width;
        var height = this.height;
        var numLevels = this.numLevels;
        var numFaces = this.numFaces;

        /*jshint bitwise: false*/
        var numPixels = 0;
        for (level = 0; level < numLevels; level += 1)
        {
            numPixels += (width * height);
            width = (width > 1 ? (width >> 1) : 1);
            height = (height > 1 ? (height >> 1) : 1);
        }

        var dst = new Uint8Array(numPixels * 4 * numFaces);

        var src = 0, dest = 0;

        var color = [[new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                     [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                     [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)],
                     [new Uint8Array(4), new Uint8Array(4), new Uint8Array(4), new Uint8Array(4)]
                    ];
        for (var face = 0; face < numFaces; face += 1)
        {
            width = this.width;
            height = this.height;
            for (var n = 0; n < numLevels; n += 1)
            {
                var numColumns = (width > 4 ? 4 : width);
                var numLines = (height > 4 ? 4 : height);
                var heightInBlocks = ((height + 3) >> 2);
                var widthInBlocks = ((width + 3) >> 2);
                var desinationStride = (width * 4);
                var desinationLineStride = (numColumns * 4);
                var desinationBlockStride = (desinationStride * (numLines - 1));
                for (var y = 0; y < heightInBlocks; y += 1)
                {
                    for (var x = 0; x < widthInBlocks; x += 1)
                    {
                        decode(data, src, color);
                        var destLine = dest;
                        for (var line = 0; line < numLines; line += 1)
                        {
                            var colorLine = color[line];
                            var destRGBA = destLine;
                            for (var i = 0 ; i < numColumns; i += 1)
                            {
                                var rgba = colorLine[i];
                                dst[destRGBA]     = rgba[0];
                                dst[destRGBA + 1] = rgba[1];
                                dst[destRGBA + 2] = rgba[2];
                                dst[destRGBA + 3] = rgba[3];
                                destRGBA += 4;
                            }
                            destLine += desinationStride;
                        }
                        src += srcStride;
                        dest += desinationLineStride;
                    }
                    dest += desinationBlockStride;
                }

                width = (width > 1 ? (width >> 1) : 1);
                height = (height > 1 ? (height >> 1) : 1);
            }
        }
        /*jshint bitwise: true*/

        return dst;
    }
};

// Constructor function
DDSLoader.create = function ddsLoaderFn(params)
{
    var loader = new DDSLoader();
    loader.gd = params.gd;
    loader.onload = params.onload;
    loader.onerror = params.onerror;

    /*jshint bitwise: false*/
    function MAKEFOURCC(c0, c1, c2, c3)
    {
        return (c0.charCodeAt(0) +
               (c1.charCodeAt(0) * 256) +
               (c2.charCodeAt(0) * 65536) +
               (c3.charCodeAt(0) * 16777216));
    }
    /*jshint bitwise: true*/
    loader.FOURCC_ATI1 = MAKEFOURCC('A', 'T', 'I', '1');
    loader.FOURCC_ATI2 = MAKEFOURCC('A', 'T', 'I', '2');
    loader.FOURCC_RXGB = MAKEFOURCC('R', 'X', 'G', 'B');

    var src = params.src;
    if (src)
    {
        loader.src = src;
        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            if (params.onerror)
            {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4)
            {
                if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';

                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if (xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK')
                    {
                        loader.onload('', 0);
                        return;
                    }

                    if (xhrStatus === 200 || xhrStatus === 0)
                    {
                        var buffer;
                        if (xhr.responseType === "arraybuffer")
                        {
                            buffer = xhr.response;
                        }
                        else if (xhr.mozResponseArrayBuffer)
                        {
                            buffer = xhr.mozResponseArrayBuffer;
                        }
                        else //if (xhr.responseText !== null)
                        {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for (var i = 0; i < numChars; i += 1)
                            {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                        }

                        // Fix for loading from file
                        if (xhrStatus === 0 && window.location.protocol === "file:")
                        {
                            xhrStatus = 200;
                        }

                        loader.processBytes(new Uint8Array(buffer));
                        if (loader.data)
                        {
                            if (loader.onload)
                            {
                                loader.onload(loader.data, loader.width, loader.height, loader.format,
                                              loader.numLevels, (loader.numFaces > 1), loader.depth,
                                              xhrStatus);
                            }
                        }
                        else
                        {
                            if (loader.onerror)
                            {
                                loader.onerror();
                            }
                        }
                    }
                    else
                    {
                        if (loader.onerror)
                        {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if (xhr.hasOwnProperty && xhr.hasOwnProperty("responseType"))
        {
            xhr.responseType = "arraybuffer";
        }
        else if (xhr.overrideMimeType)
        {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        else
        {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }
    else
    {
        loader.processBytes(params.data);
        if (loader.data)
        {
            if (loader.onload)
            {
                loader.onload(loader.data, loader.width, loader.height, loader.format,
                              loader.numLevels, (loader.numFaces > 1), loader.depth);
            }
        }
        else
        {
            if (loader.onerror)
            {
                loader.onerror();
            }
        }
    }

    return loader;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global TGALoader*/
/*global DDSLoader*/
/*global TARLoader*/
/*global Int8Array*/
/*global Int16Array*/
/*global Int32Array*/
/*global Uint8Array*/
/*global Uint8ClampedArray*/
/*global Uint16Array*/
/*global Uint32Array*/
/*global Float32Array*/
/*global ArrayBuffer*/
/*global DataView*/
/*global window*/
/*global console*/


//
// WebGLTexture
//
function WebGLTexture() {}
WebGLTexture.prototype =
{
    version : 1,

    setData : function textureSetDataFn(data)
    {
        var gd = this.gd;
        var target = this.target;
        gd.bindTexture(target, this.glTexture);
        this.updateData(data);
        gd.bindTexture(target, null);
    },

    // Internal
    createGLTexture : function createGLTextureFn(data)
    {
        var gd = this.gd;
        var gl = gd.gl;

        var target;
        if (this.cubemap)
        {
            target = gl.TEXTURE_CUBE_MAP;
        }
        else if (this.depth > 1)
        {
            //target = gl.TEXTURE_3D;
            // 3D textures are not supported yet
            return false;
        }
        else
        {
            target = gl.TEXTURE_2D;
        }
        this.target = target;

        var gltex = gl.createTexture();
        this.glTexture = gltex;

        gd.bindTexture(target, gltex);

        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        if (this.mipmaps || 1 < this.numDataLevels)
        {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        }
        else
        {
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        this.updateData(data);

        gd.bindTexture(target, null);

        return true;
    },

    updateData : function updateDataFn(data)
    {
        var gd = this.gd;
        var gl = gd.gl;

        function log2(a)
        {
            return Math.floor(Math.log(a) / Math.log(2));
        }

        var generateMipMaps = this.mipmaps && (this.numDataLevels !== (1 + Math.max(log2(this.width), log2(this.height))));
        var format = this.format;
        var internalFormat, gltype, srcStep, bufferData = null;
        var compressedTexturesExtension;

        if (format === gd.PIXELFORMAT_A8)
        {
            internalFormat = gl.ALPHA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 1;
            if (data && !data.src)
            {
                if (data instanceof Uint8Array)
                {
                    bufferData = data;
                }
                else
                {
                    bufferData = new Uint8Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_L8)
        {
            internalFormat = gl.LUMINANCE;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 1;
            if (data && !data.src)
            {
                if (data instanceof Uint8Array)
                {
                    bufferData = data;
                }
                else
                {
                    bufferData = new Uint8Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_L8A8)
        {
            internalFormat = gl.LUMINANCE_ALPHA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 2;
            if (data && !data.src)
            {
                if (data instanceof Uint8Array)
                {
                    bufferData = data;
                }
                else
                {
                    bufferData = new Uint8Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_R5G5B5A1)
        {
            internalFormat = gl.RGBA;
            gltype = gl.UNSIGNED_SHORT_5_5_5_1;
            srcStep = 1;
            if (data && !data.src)
            {
                if (data instanceof Uint16Array)
                {
                    bufferData = data;
                }
                else
                {
                    bufferData = new Uint16Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_R5G6B5)
        {
            internalFormat = gl.RGB;
            gltype = gl.UNSIGNED_SHORT_5_6_5;
            srcStep = 1;
            if (data && !data.src)
            {
                if (data instanceof Uint16Array)
                {
                    bufferData = data;
                }
                else
                {
                    bufferData = new Uint16Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_R8G8B8A8)
        {
            internalFormat = gl.RGBA;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 4;
            if (data && !data.src)
            {
                if (data instanceof Uint8Array)
                {
                    // Some browsers consider Uint8ClampedArray to be
                    // an instance of Uint8Array (which is correct as
                    // per the spec), yet won't accept a
                    // Uint8ClampedArray as pixel data for a
                    // gl.UNSIGNED_BYTE Texture.  If we have a
                    // Uint8ClampedArray then we can just reuse the
                    // underlying data.

                    if (typeof Uint8ClampedArray !== "undefined" &&
                        data instanceof Uint8ClampedArray)
                    {
                        bufferData = new Uint8Array(data.buffer);
                    }
                    else
                    {
                        bufferData = data;
                    }
                }
                else
                {
                    bufferData = new Uint8Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_R8G8B8)
        {
            internalFormat = gl.RGB;
            gltype = gl.UNSIGNED_BYTE;
            srcStep = 3;
            if (data && !data.src)
            {
                if (data instanceof Uint8Array)
                {
                    // See comment above about Uint8ClampedArray

                    if (typeof Uint8ClampedArray !== "undefined" &&
                        data instanceof Uint8ClampedArray)
                    {
                        bufferData = new Uint8Array(data.buffer);
                    }
                    else
                    {
                        bufferData = data;
                    }
                }
                else
                {
                    bufferData = new Uint8Array(data);
                }
            }
        }
        else if (format === gd.PIXELFORMAT_D24S8)
        {
            //internalFormat = gl.DEPTH24_STENCIL8_EXT;
            //gltype = gl.UNSIGNED_INT_24_8_EXT;
            //internalFormat = gl.DEPTH_COMPONENT;
            internalFormat = gl.DEPTH_STENCIL;
            gltype = gl.UNSIGNED_INT;
            srcStep = 1;
            if (data && !data.src)
            {
                bufferData = new Uint32Array(data);
            }
        }
        else if (format === gd.PIXELFORMAT_DXT1 ||
                 format === gd.PIXELFORMAT_DXT3 ||
                 format === gd.PIXELFORMAT_DXT5)
        {
            compressedTexturesExtension = gd.compressedTexturesExtension;
            if (compressedTexturesExtension)
            {
                if (format === gd.PIXELFORMAT_DXT1)
                {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    srcStep = 8;
                }
                else if (format === gd.PIXELFORMAT_DXT3)
                {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    srcStep = 16;
                }
                else //if (format === gd.PIXELFORMAT_DXT5)
                {
                    internalFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    srcStep = 16;
                }

                if (internalFormat === undefined)
                {
                    return; // Unsupported format
                }

                if (data && !data.src)
                {
                    if (data instanceof Uint8Array)
                    {
                        bufferData = data;
                    }
                    else
                    {
                        bufferData = new Uint8Array(data);
                    }
                }
            }
            else
            {
                return;   // Unsupported format
            }
        }
        else
        {
            return;   //unknown/unsupported format
        }

        var numLevels = (data && 0 < this.numDataLevels ? this.numDataLevels : 1);
        var w = this.width, h = this.height, offset = 0, target, n, levelSize, levelData;
        if (this.cubemap)
        {
            target = gl.TEXTURE_CUBE_MAP;
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            for (var f = 0; f < 6; f += 1)
            {
                var faceTarget = (gl.TEXTURE_CUBE_MAP_POSITIVE_X + f);
                for (n = 0; n < numLevels; n += 1)
                {
                    if (compressedTexturesExtension)
                    {
                        levelSize = (Math.floor((w + 3) / 4) * Math.floor((h + 3) / 4) * srcStep);
                        if (bufferData)
                        {
                            if (numLevels === 1)
                            {
                                levelData = bufferData;
                            }
                            else
                            {
                                levelData = bufferData.subarray(offset, (offset + levelSize));
                            }
                        }
                        else
                        {
                            levelData = new Uint8Array(levelSize);
                        }
                        if (gd.WEBGL_compressed_texture_s3tc)
                        {
                            gl.compressedTexImage2D(faceTarget, n, internalFormat, w, h, 0,
                                                    levelData);
                        }
                        else
                        {
                            compressedTexturesExtension.compressedTexImage2D(faceTarget, n, internalFormat, w, h, 0,
                                                                             levelData);
                        }
                    }
                    else
                    {
                        levelSize = (w * h * srcStep);
                        if (bufferData)
                        {
                            if (numLevels === 1)
                            {
                                levelData = bufferData;
                            }
                            else
                            {
                                levelData = bufferData.subarray(offset, (offset + levelSize));
                            }
                            gl.texImage2D(faceTarget, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                        }
                        else if (data)
                        {
                            gl.texImage2D(faceTarget, n, internalFormat, internalFormat, gltype, data);
                        }
                        else
                        {
                            gl.texImage2D(faceTarget, n, internalFormat, w, h, 0, internalFormat, gltype,
                                          new Uint8Array(levelSize));
                        }
                    }
                    offset += levelSize;
                    w = (w > 1 ? Math.floor(w / 2) : 1);
                    h = (h > 1 ? Math.floor(h / 2) : 1);
                }
                w = this.width;
                h = this.height;
            }
        }
        else
        {
            target = gl.TEXTURE_2D;
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            for (n = 0; n < numLevels; n += 1)
            {
                if (compressedTexturesExtension)
                {
                    levelSize = (Math.floor((w + 3) / 4) * Math.floor((h + 3) / 4) * srcStep);
                    if (bufferData)
                    {
                        if (numLevels === 1)
                        {
                            levelData = bufferData;
                        }
                        else
                        {
                            levelData = bufferData.subarray(offset, (offset + levelSize));
                        }
                    }
                    else
                    {
                        levelData = new Uint8Array(levelSize);
                    }
                    if (gd.WEBGL_compressed_texture_s3tc)
                    {
                        gl.compressedTexImage2D(target, n, internalFormat, w, h, 0, levelData);
                    }
                    else
                    {
                        compressedTexturesExtension.compressedTexImage2D(target, n, internalFormat, w, h, 0, levelData);
                    }
                }
                else
                {
                    levelSize = (w * h * srcStep);
                    if (bufferData)
                    {
                        if (numLevels === 1)
                        {
                            levelData = bufferData;
                        }
                        else
                        {
                            levelData = bufferData.subarray(offset, (offset + levelSize));
                        }
                        gl.texImage2D(target, n, internalFormat, w, h, 0, internalFormat, gltype, levelData);
                    }
                    else if (data)
                    {
                        gl.texImage2D(target, n, internalFormat, internalFormat, gltype, data);
                    }
                    else
                    {
                        gl.texImage2D(target, n, internalFormat, w, h, 0, internalFormat, gltype,
                                      new Uint8Array(levelSize));
                    }
                }
                offset += levelSize;
                w = (w > 1 ? Math.floor(w / 2) : 1);
                h = (h > 1 ? Math.floor(h / 2) : 1);
            }
        }

        if (generateMipMaps)
        {
            gl.generateMipmap(target);
        }
    },

    updateMipmaps : function updateMipmapsFn(face)
    {
        if (this.mipmaps)
        {
            if (this.depth > 1)
            {
                TurbulenzEngine.callOnError(
                    "3D texture mipmap generation unsupported");
                return;
            }

            if (this.cubemap && face !== 5)
            {
                return;
            }

            var gd = this.gd;
            var gl = gd.gl;

            var target = this.target;
            gd.bindTexture(target, this.glTexture);
            gl.generateMipmap(target);
            gd.bindTexture(target, null);
        }
    },

    destroy : function textureDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var glTexture = this.glTexture;
            if (glTexture)
            {
                var gl = gd.gl;
                if (gl)
                {
                    gd.unbindTexture(glTexture);
                    gl.deleteTexture(glTexture);
                }
                delete this.glTexture;
            }

            delete this.sampler;
            delete this.gd;
        }
    },

    typedArrayIsValid : function textureTypedArrayIsValidFn(typedArray)
    {
        var gd = this.gd;
        var format = this.format;

        if (gd)
        {
            if ((format === gd.PIXELFORMAT_A8) ||
                (format === gd.PIXELFORMAT_L8) ||
                (format === gd.PIXELFORMAT_S8))
            {
                return ((typedArray instanceof Uint8Array) ||
                        (typeof Uint8ClampedArray !== "undefined" &&
                         typedArray instanceof Uint8ClampedArray)) &&
                    (typedArray.length ===
                     this.width * this.height * this.depth);
            }
            if (format === gd.PIXELFORMAT_L8A8)
            {
                return ((typedArray instanceof Uint8Array) ||
                        (typeof Uint8ClampedArray !== "undefined" &&
                         typedArray instanceof Uint8ClampedArray)) &&
                    (typedArray.length ===
                     2 * this.width * this.height * this.depth);
            }
            if (format === gd.PIXELFORMAT_R8G8B8)
            {
                return ((typedArray instanceof Uint8Array) ||
                        (typeof Uint8ClampedArray !== "undefined" &&
                         typedArray instanceof Uint8ClampedArray)) &&
                    (typedArray.length ===
                     3 * this.width * this.height * this.depth);
            }
            if (format === gd.PIXELFORMAT_R8G8B8A8)
            {
                return ((typedArray instanceof Uint8Array) ||
                        (typeof Uint8ClampedArray !== "undefined" &&
                         typedArray instanceof Uint8ClampedArray)) &&
                    (typedArray.length ===
                     4 * this.width * this.height * this.depth);
            }
            if ((format === gd.PIXELFORMAT_R5G5B5A1) ||
                (format === gd.PIXELFORMAT_R5G6B5))
            {
                return (typedArray instanceof Uint16Array) &&
                    (typedArray.length ===
                     this.width * this.height * this.depth);
            }
        }
        return false;
    }
};

// Constructor function
WebGLTexture.create = function webGLTextureCreateFn(gd, params)
{
    var tex = new WebGLTexture();
    tex.gd = gd;
    tex.mipmaps = params.mipmaps;
    tex.dynamic = params.dynamic;
    tex.renderable = params.renderable;
    tex.numDataLevels = 0;

    var src = params.src;
    if (src)
    {
        tex.name = params.name || src;
        var extension;
        var data = params.data;
        if (data)
        {
            // do not trust file extensions if we got data...
            if (data[0] === 137 &&
                data[1] === 80 &&
                data[2] === 78 &&
                data[3] === 71)
            {
                extension = '.png';
            }
            else if (data[0] === 255 &&
                     data[1] === 216 &&
                     data[2] === 255 &&
                     (data[3] === 224 || data[3] === 225))
            {
                extension = '.jpg';
            }
            else if (data[0] === 68 &&
                     data[1] === 68 &&
                     data[2] === 83 &&
                     data[3] === 32)
            {
                extension = '.dds';
            }
            else
            {
                extension = src.slice(-4);
            }
        }
        else
        {
            extension = src.slice(-4);
        }

        // DDS and TGA textures require out own image loaders
        if (extension === '.dds' ||
            extension === '.tga')
        {
            if (extension === '.tga' && typeof TGALoader !== 'undefined')
            {
                var tgaParams = {
                    gd: gd,
                    onload : function tgaLoadedFn(data, width, height, format, status)
                    {
                        tex.width = width;
                        tex.height = height;
                        tex.depth = 1;
                        tex.format = format;
                        tex.cubemap = false;
                        var result = tex.createGLTexture(data);
                        if (params.onload)
                        {
                            params.onload(result ? tex : null, status);
                        }
                    },
                    onerror : function tgaFailedFn()
                    {
                        tex.failed = true;
                        if (params.onload)
                        {
                            params.onload(null);
                        }
                    }
                };
                if (data)
                {
                    tgaParams.data = data;
                }
                else
                {
                    tgaParams.src = src;
                }
                TGALoader.create(tgaParams);
                return tex;
            }
            else if (extension === '.dds' && typeof DDSLoader !== 'undefined')
            {
                var ddsParams = {
                    gd: gd,
                    onload : function ddsLoadedFn(data, width, height, format, numLevels, cubemap, depth, status)
                    {
                        tex.width = width;
                        tex.height = height;
                        tex.format = format;
                        tex.cubemap = cubemap;
                        tex.depth = depth;
                        tex.numDataLevels = numLevels;
                        var result = tex.createGLTexture(data);
                        if (params.onload)
                        {
                            params.onload(result ? tex : null, status);
                        }
                    },
                    onerror : function ddsFailedFn()
                    {
                        tex.failed = true;
                        if (params.onload)
                        {
                            params.onload(null);
                        }
                    }
                };
                if (data)
                {
                    ddsParams.data = data;
                }
                else
                {
                    ddsParams.src = src;
                }
                DDSLoader.create(ddsParams);
                return tex;
            }
            else
            {
                TurbulenzEngine.callOnError(
                    'Missing image loader required for ' + src);

                tex = webGLTextureCreateFn(gd, {
                    name    : (params.name || src),
                    width   : 2,
                    height  : 2,
                    depth   : 1,
                    format  : 'R8G8B8A8',
                    cubemap : false,
                    mipmaps : params.mipmaps,
                    dynamic : params.dynamic,
                    renderable : params.renderable,
                    data    : [255,  20, 147, 255,
                               255,   0,   0, 255,
                               255, 255, 255, 255,
                               255,  20, 147, 255]
                });

                if (params.onload)
                {
                    if (TurbulenzEngine)
                    {
                        TurbulenzEngine.setTimeout(function () {
                            params.onload(tex, 200);
                        }, 0);
                    }
                    else
                    {
                        window.setTimeout(function () {
                            params.onload(tex, 200);
                        }, 0);
                    }
                }
                return tex;
            }
        }

        var img = new Image();
        img.onload = function imageLoadedFn()
        {
            tex.width = img.width;
            tex.height = img.height;
            tex.depth = 1;
            tex.format = gd.PIXELFORMAT_R8G8B8A8;
            tex.cubemap = false;
            var result = tex.createGLTexture(img);
            if (params.onload)
            {
                params.onload(result ? tex : null, 200);
            }
        };
        img.onerror = function imageFailedFn()
        {
            tex.failed = true;
            if (params.onload)
            {
                params.onload(null);
            }
        };
        if (data)
        {
            if (extension === '.jpg' || extension === '.jpeg')
            {
                src = 'data:image/jpeg;base64,' + TurbulenzEngine.base64Encode(data);
            }
            else if (extension === '.png')
            {
                src = 'data:image/png;base64,' + TurbulenzEngine.base64Encode(data);
            }
        }
        else
        {
            img.crossOrigin = 'anonymous';
        }
        img.src = src;
    }
    else
    {
        // Invalid src values like "" fall through to here
        if ("" === src && params.onload)
        {
            // Assume the caller intended to pass in a valid url.
            return null;
        }

        var format = params.format;
        if (typeof format === 'string')
        {
            format = gd['PIXELFORMAT_' + format];
        }

        tex.width = params.width;
        tex.height = params.height;
        tex.depth = params.depth;
        tex.format = format;
        tex.cubemap = params.cubemap;
        tex.name = params.name;

        var result = tex.createGLTexture(params.data);
        if (!result)
        {
            tex = null;
        }

        if (params.onload)
        {
            params.onload(tex, 200);
        }
    }

    return tex;
};


//
// WebGLRenderBuffer
//
function WebGLRenderBuffer() {}
WebGLRenderBuffer.prototype =
{
    version : 1,

    destroy : function renderBufferDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var glBuffer = this.glBuffer;
            if (glBuffer)
            {
                var gl = gd.gl;
                if (gl)
                {
                    gl.deleteRenderbuffer(glBuffer);
                }
                delete this.glBuffer;
            }

            delete this.gd;
        }
    }
};

// Constructor function
WebGLRenderBuffer.create = function webGLRenderBufferFn(gd, params)
{
    var renderBuffer = new WebGLRenderBuffer();

    var width = params.width;
    var height = params.height;
    var format = params.format;
    if (typeof format === 'string')
    {
        format = gd['PIXELFORMAT_' + format];
    }

    if (format !== gd.PIXELFORMAT_D24S8)
    {
        return null;
    }

    var gl = gd.gl;

    var glBuffer = gl.createRenderbuffer();

    gl.bindRenderbuffer(gl.RENDERBUFFER, glBuffer);

    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);

    renderBuffer.width = gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_WIDTH);
    renderBuffer.height = gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_HEIGHT);

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    if (renderBuffer.width < width ||
        renderBuffer.height < height)
    {
        gl.deleteRenderbuffer(glBuffer);
        return null;
    }

    renderBuffer.gd = gd;
    renderBuffer.format = format;
    renderBuffer.glBuffer = glBuffer;

    return renderBuffer;
};


//
// WebGLRenderTarget
//
function WebGLRenderTarget() {}
WebGLRenderTarget.prototype =
{
    version : 1,

    // Shared because there can only be one active at a time
    oldViewportBox : [],
    oldScissorBox : [],

    copyBox : function copyBoxFn(dst, src)
    {
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
    },

    bind : function bindFn()
    {
        var gd = this.gd;
        var gl = gd.gl;

        gd.unbindTexture(this.colorTexture0.glTexture);
        if (this.depthTexture)
        {
            gd.unbindTexture(this.depthTexture.glTexture);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glObject);

        var state = gd.state;
        this.copyBox(this.oldViewportBox, state.viewportBox);
        this.copyBox(this.oldScissorBox, state.scissorBox);
        gd.setViewport(0, 0, this.width, this.height);
        gd.setScissor(0, 0, this.width, this.height);

        return true;
    },

    unbind : function unbindFn()
    {
        var gd = this.gd;
        var gl = gd.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gd.setViewport.apply(gd, this.oldViewportBox);
        gd.setScissor.apply(gd, this.oldScissorBox);

        this.colorTexture0.updateMipmaps(this.face);
        if (this.depthTexture)
        {
            this.depthTexture.updateMipmaps(this.face);
        }
    },

    destroy : function renderTargetDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var glObject = this.glObject;
            if (glObject)
            {
                var gl = gd.gl;
                if (gl)
                {
                    gl.deleteFramebuffer(glObject);
                }
                delete this.glObject;
            }

            delete this.colorTexture0;
            delete this.colorTexture1;
            delete this.colorTexture2;
            delete this.colorTexture3;
            delete this.depthBuffer;
            delete this.depthTexture;
            delete this.gd;
        }
    }
};

// Constructor function
WebGLRenderTarget.create = function webGLRenderTargetFn(gd, params)
{
    var renderTarget = new WebGLRenderTarget();

    var colorTexture0 = params.colorTexture0;
    var colorTexture1 = (colorTexture0 ? (params.colorTexture1 || null) : null);
    var colorTexture2 = (colorTexture1 ? (params.colorTexture2 || null) : null);
    var colorTexture3 = (colorTexture2 ? (params.colorTexture3 || null) : null);
    var depthBuffer = params.depthBuffer || null;
    var depthTexture = params.depthTexture || null;
    var face = params.face;

    var maxSupported  = gd.maxSupported("RENDERTARGET_COLOR_TEXTURES");
    if (colorTexture1 && maxSupported < 2)
    {
        return null;
    }
    if (colorTexture2 && maxSupported < 3)
    {
        return null;
    }
    if (colorTexture3 && maxSupported < 4)
    {
        return null;
    }

    var gl = gd.gl;

    var glObject = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, glObject);

    var width, height;
    if (colorTexture0)
    {
        width = colorTexture0.width;
        height = colorTexture0.height;

        var glTexture = colorTexture0.glTexture;
        if (glTexture === undefined)
        {
            TurbulenzEngine.callOnError("Color texture is not a Texture");
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(glObject);
            return null;
        }

        var colorAttachment0 = gl.COLOR_ATTACHMENT0;
        if (colorTexture0.cubemap)
        {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment0, (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
        }
        else
        {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment0, gl.TEXTURE_2D, glTexture, 0);
        }

        if (colorTexture1)
        {
            glTexture = colorTexture1.glTexture;
            if (colorTexture1.cubemap)
            {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 1), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
            }
            else
            {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 1), gl.TEXTURE_2D, glTexture, 0);
            }

            if (colorTexture2)
            {
                glTexture = colorTexture2.glTexture;
                if (colorTexture1.cubemap)
                {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 2), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
                }
                else
                {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 2), gl.TEXTURE_2D, glTexture, 0);
                }

                if (colorTexture3)
                {
                    glTexture = colorTexture3.glTexture;
                    if (colorTexture1.cubemap)
                    {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 3), (gl.TEXTURE_CUBE_MAP_POSITIVE_X + face), glTexture, 0);
                    }
                    else
                    {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, (colorAttachment0 + 3), gl.TEXTURE_2D, glTexture, 0);
                    }
                }
            }
        }
    }
    else if (depthTexture)
    {
        width = depthTexture.width;
        height = depthTexture.height;
    }
    else if (depthBuffer)
    {
        width = depthBuffer.width;
        height = depthBuffer.height;
    }
    else
    {
        TurbulenzEngine.callOnError(
            "No RenderBuffers or Textures specified for this RenderTarget");
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.deleteFramebuffer(glObject);
        return null;
    }

    if (depthTexture)
    {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT,
                                gl.TEXTURE_2D, depthTexture.glTexture, 0);
    }
    else if (depthBuffer)
    {
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT,
                                   gl.RENDERBUFFER, depthBuffer.glBuffer);
    }

    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    if (status !== gl.FRAMEBUFFER_COMPLETE)
    {
        gl.deleteFramebuffer(glObject);
        return null;
    }

    renderTarget.gd = gd;
    renderTarget.glObject = glObject;
    renderTarget.colorTexture0 = colorTexture0;
    renderTarget.colorTexture1 = colorTexture1;
    renderTarget.colorTexture2 = colorTexture2;
    renderTarget.colorTexture3 = colorTexture3;
    renderTarget.depthBuffer = depthBuffer;
    renderTarget.depthTexture = depthTexture;
    renderTarget.width = width;
    renderTarget.height = height;
    renderTarget.face = face;

    return renderTarget;
};


//
// WebGLIndexBuffer
//
function WebGLIndexBuffer() {}
WebGLIndexBuffer.prototype =
{
    version : 1,

    map : function indexBufferMapFn(offset, numIndices)
    {
        if (offset === undefined)
        {
            offset = 0;
        }
        if (numIndices === undefined)
        {
            numIndices = this.numIndices;
        }

        var gd = this.gd;
        var gl = gd.gl;

        var format = this.format;
        var data;
        if (format === gl.UNSIGNED_BYTE)
        {
            data = new Uint8Array(numIndices);
        }
        else if (format === gl.UNSIGNED_SHORT)
        {
            data = new Uint16Array(numIndices);
        }
        else //if (format === gl.UNSIGNED_INT)
        {
            data = new Uint32Array(numIndices);
        }

        var numValues = 0;
        var writer = function indexBufferWriterFn()
        {
            var numArguments = arguments.length;
            for (var n = 0; n < numArguments; n += 1)
            {
                data[numValues] = arguments[n];
                numValues += 1;
            }
        };
        writer.data = data;
        writer.offset = offset;
        writer.getNumWrittenIndices = function getNumWrittenIndicesFn()
        {
            return numValues;
        };
        writer.write = writer;
        return writer;
    },

    unmap : function indexBufferUnmapFn(writer)
    {
        if (writer)
        {
            var gd = this.gd;
            var gl = gd.gl;

            var data = writer.data;
            delete writer.data;

            var offset = writer.offset;

            delete writer.write;

            var numIndices = writer.getNumWrittenIndices();
            if (!numIndices)
            {
                return;
            }

            if (numIndices < data.length)
            {
                data = data.subarray(0, numIndices);
            }

            gd.setIndexBuffer(this);

            if (numIndices < this.numIndices)
            {
                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, data);
            }
            else
            {
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, this.usage);
            }
        }
    },

    setData : function indexBufferSetDataFn(data, offset, numIndices)
    {
        if (offset === undefined)
        {
            offset = 0;
        }
        if (numIndices === undefined)
        {
            numIndices = this.numIndices;
        }

        var gd = this.gd;
        var gl = gd.gl;

        var bufferData;
        var format = this.format;
        if (format === gl.UNSIGNED_BYTE)
        {
            if (data instanceof Uint8Array)
            {
                bufferData = data;
            }
            else
            {
                bufferData = new Uint8Array(data);
            }
        }
        else if (format === gl.UNSIGNED_SHORT)
        {
            if (data instanceof Uint16Array)
            {
                bufferData = data;
            }
            else
            {
                bufferData = new Uint16Array(data);
            }
            offset *= 2;
        }
        else if (format === gl.UNSIGNED_INT)
        {
            if (data instanceof Uint32Array)
            {
                bufferData = data;
            }
            else
            {
                bufferData = new Uint32Array(data);
            }
            offset *= 4;
        }
        data = undefined;

        if (numIndices < bufferData.length)
        {
            bufferData = bufferData.subarray(0, numIndices);
        }

        gd.setIndexBuffer(this);

        if (numIndices < this.numIndices)
        {
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, bufferData);
        }
        else
        {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferData, this.usage);
        }
    },

    destroy : function indexBufferDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var glBuffer = this.glBuffer;
            if (glBuffer)
            {
                var gl = gd.gl;
                if (gl)
                {
                    gd.unsetIndexBuffer(this);
                    gl.deleteBuffer(glBuffer);
                }
                delete this.glBuffer;
            }

            delete this.gd;
        }
    }
};

// Constructor function
WebGLIndexBuffer.create = function webGLIndexBufferCreateFn(gd, params)
{
    var gl = gd.gl;

    var ib = new WebGLIndexBuffer();
    ib.gd = gd;

    var numIndices = params.numIndices;
    ib.numIndices = numIndices;

    var format = params.format;
    if (typeof format === "string")
    {
        format = gd['INDEXFORMAT_' + format];
    }
    ib.format = format;

    var stride;
    if (format === gl.UNSIGNED_BYTE)
    {
        stride = 1;
    }
    else if (format === gl.UNSIGNED_SHORT)
    {
        stride = 2;
    }
    else //if (format === gl.UNSIGNED_INT)
    {
        stride = 4;
    }
    ib.stride = stride;

    /*jshint sub: true*/
    // Avoid dot notation lookup to prevent Google Closure complaining about transient being a keyword
    ib['transient'] = (params['transient'] || false);
    ib.dynamic = (params.dynamic || ib['transient']);
    ib.usage = (ib['transient'] ? gl.STREAM_DRAW : (ib.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW));
    /*jshint sub: false*/

    ib.glBuffer = gl.createBuffer();

    if (params.data)
    {
        ib.setData(params.data, 0, numIndices);
    }
    else
    {
        gd.setIndexBuffer(ib);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, (numIndices * stride), ib.usage);
    }

    return ib;
};


//
// WebGLSemantics
//
function WebGLSemantics() {}
WebGLSemantics.prototype =
{
    version : 1
};

// Constructor function
WebGLSemantics.create = function webGLSemanticsCreateFn(gd, attributes)
{
    var semantics = new WebGLSemantics();

    var numAttributes = attributes.length;
    semantics.length = numAttributes;
    for (var i = 0; i < numAttributes; i += 1)
    {
        var attribute = attributes[i];
        if (typeof attribute === "string")
        {
            semantics[i] = gd['SEMANTIC_' + attribute];
        }
        else
        {
            semantics[i] = attribute;
        }
    }

    return semantics;
};


//
// WebGLVertexBuffer
//
function WebGLVertexBuffer() {}
WebGLVertexBuffer.prototype =
{
    version : 1,

    map : function vertexBufferMapFn(offset, numVertices)
    {
        if (offset === undefined)
        {
            offset = 0;
        }
        if (numVertices === undefined)
        {
            numVertices = this.numVertices;
        }

        var gd = this.gd;
        var gl = gd.gl;

        var numValuesPerVertex = this.stride;
        var attributes = this.attributes;
        var numAttributes = attributes.length;

        var data, writer;
        var numValues = 0;

        if (this.hasSingleFormat)
        {
            var maxNumValues = (numVertices * numValuesPerVertex);
            var format = attributes[0].format;

            if (format === gl.BYTE)
            {
                data = new Int8Array(maxNumValues);
            }
            else if (format === gl.UNSIGNED_BYTE)
            {
                data = new Uint8Array(maxNumValues);
            }
            else if (format === gl.SHORT)
            {
                data = new Int16Array(maxNumValues);
            }
            else if (format === gl.UNSIGNED_SHORT)
            {
                data = new Uint16Array(maxNumValues);
            }
            else if (format === gl.INT)
            {
                data = new Int32Array(maxNumValues);
            }
            else if (format === gl.UNSIGNED_INT)
            {
                data = new Uint32Array(maxNumValues);
            }
            else if (format === gl.FLOAT)
            {
                data = new Float32Array(maxNumValues);
            }

            writer = function vertexBufferWriterSingleFn()
            {
                var numArguments = arguments.length;
                var currentArgument = 0;
                for (var a = 0; a < numAttributes; a += 1)
                {
                    var attribute = attributes[a];
                    var numComponents = attribute.numComponents;
                    var currentComponent = 0, j;
                    do
                    {
                        if (currentArgument < numArguments)
                        {
                            var value = arguments[currentArgument];
                            currentArgument += 1;
                            if (typeof value === "number")
                            {
                                if (attribute.normalized)
                                {
                                    value *= attribute.normalizationScale;
                                }
                                data[numValues] = value;
                                numValues += 1;
                                currentComponent += 1;
                            }
                            else if (currentComponent === 0)
                            {
                                var numSubArguments = value.length;
                                if (numSubArguments > numComponents)
                                {
                                    numSubArguments = numComponents;
                                }
                                if (attribute.normalized)
                                {
                                    var scale = attribute.normalizationScale;
                                    for (j = 0; j < numSubArguments; j += 1)
                                    {
                                        data[numValues] = (value[j] * scale);
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                }
                                else
                                {
                                    for (j = 0; j < numSubArguments; j += 1)
                                    {
                                        data[numValues] = value[j];
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                }
                                while (currentComponent < numComponents)
                                {
                                    // No need to clear to zeros
                                    numValues += 1;
                                    currentComponent += 1;
                                }
                                break;
                            }
                            else
                            {
                                TurbulenzEngine.callOnError(
                                    'Missing values for attribute ' + a);
                                return null;
                            }
                        }
                        else
                        {
                            // No need to clear to zeros
                            numValues += 1;
                            currentComponent += 1;
                        }
                    }
                    while (currentComponent < numComponents);
                }
            };
        }
        else
        {
            var destOffset = 0;
            var bufferSize = (numVertices * this.strideInBytes);

            data = new ArrayBuffer(bufferSize);

            if (typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype)
            {
                var dataView = new DataView(data);

                writer = function vertexBufferWriterDataViewFn()
                {
                    var numArguments = arguments.length;
                    var currentArgument = 0;
                    for (var a = 0; a < numAttributes; a += 1)
                    {
                        var attribute = attributes[a];
                        var numComponents = attribute.numComponents;
                        var setter = attribute.typedSetter;
                        var componentStride = attribute.componentStride;
                        var currentComponent = 0, j;
                        do
                        {
                            if (currentArgument < numArguments)
                            {
                                var value = arguments[currentArgument];
                                currentArgument += 1;
                                if (typeof value === "number")
                                {
                                    if (attribute.normalized)
                                    {
                                        value *= attribute.normalizationScale;
                                    }
                                    setter.call(dataView, destOffset, value, true);
                                    destOffset += componentStride;
                                    currentComponent += 1;
                                    numValues += 1;
                                }
                                else if (currentComponent === 0)
                                {
                                    var numSubArguments = value.length;
                                    if (numSubArguments > numComponents)
                                    {
                                        numSubArguments = numComponents;
                                    }
                                    if (attribute.normalized)
                                    {
                                        var scale = attribute.normalizationScale;
                                        for (j = 0; j < numSubArguments; j += 1)
                                        {
                                            setter.call(dataView, destOffset, (value[j] * scale), true);
                                            destOffset += componentStride;
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    else
                                    {
                                        for (j = 0; j < numSubArguments; j += 1)
                                        {
                                            setter.call(dataView, destOffset, value[j], true);
                                            destOffset += componentStride;
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    while (currentComponent < numComponents)
                                    {
                                        // No need to clear to zeros
                                        numValues += 1;
                                        currentComponent += 1;
                                    }
                                    break;
                                }
                                else
                                {
                                    TurbulenzEngine.callOnError(
                                        'Missing values for attribute ' + a);
                                    return null;
                                }
                            }
                            else
                            {
                                // No need to clear to zeros
                                numValues += 1;
                                currentComponent += 1;
                            }
                        }
                        while (currentComponent < numComponents);
                    }
                };
            }
            else
            {
                writer = function vertexBufferWriterMultiFn()
                {
                    var numArguments = arguments.length;
                    var currentArgument = 0;
                    var dest;
                    for (var a = 0; a < numAttributes; a += 1)
                    {
                        var attribute = attributes[a];
                        var numComponents = attribute.numComponents;
                        dest = new attribute.typedArray(data, destOffset, numComponents);
                        destOffset += attribute.stride;

                        var currentComponent = 0, j;
                        do
                        {
                            if (currentArgument < numArguments)
                            {
                                var value = arguments[currentArgument];
                                currentArgument += 1;
                                if (typeof value === "number")
                                {
                                    if (attribute.normalized)
                                    {
                                        value *= attribute.normalizationScale;
                                    }
                                    dest[currentComponent] = value;
                                    currentComponent += 1;
                                    numValues += 1;
                                }
                                else if (currentComponent === 0)
                                {
                                    var numSubArguments = value.length;
                                    if (numSubArguments > numComponents)
                                    {
                                        numSubArguments = numComponents;
                                    }
                                    if (attribute.normalized)
                                    {
                                        var scale = attribute.normalizationScale;
                                        for (j = 0; j < numSubArguments; j += 1)
                                        {
                                            dest[currentComponent] = (value[j] * scale);
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    else
                                    {
                                        for (j = 0; j < numSubArguments; j += 1)
                                        {
                                            dest[currentComponent] = value[j];
                                            currentComponent += 1;
                                            numValues += 1;
                                        }
                                    }
                                    while (currentComponent < numComponents)
                                    {
                                        // No need to clear to zeros
                                        currentComponent += 1;
                                        numValues += 1;
                                    }
                                    break;
                                }
                                else
                                {
                                    TurbulenzEngine.callOnError(
                                        'Missing values for attribute ' + a);
                                    return null;
                                }
                            }
                            else
                            {
                                // No need to clear to zeros
                                currentComponent += 1;
                                numValues += 1;
                            }
                        }
                        while (currentComponent < numComponents);
                    }
                };
            }
        }

        writer.data = data;
        writer.offset = offset;
        writer.getNumWrittenVertices = function getNumWrittenVerticesFn()
        {
            return Math.floor(numValues / numValuesPerVertex);
        };
        writer.getNumWrittenValues = function getNumWrittenValuesFn()
        {
            return numValues;
        };
        writer.write = writer;
        return writer;
    },

    unmap : function vertexBufferUnmapFn(writer)
    {
        if (writer)
        {
            var data = writer.data;
            delete writer.data;

            delete writer.write;

            var numVertices = writer.getNumWrittenVertices();
            if (!numVertices)
            {
                return;
            }

            var offset = writer.offset;

            var stride = this.strideInBytes;

            if (this.hasSingleFormat)
            {
                var numValues = writer.getNumWrittenValues();
                if (numValues < data.length)
                {
                    data = data.subarray(0, numValues);
                }
            }
            else
            {
                var numBytes = (numVertices * stride);
                if (numBytes < data.byteLength)
                {
                    data = data.slice(0, numBytes);
                }
            }

            var gd = this.gd;
            var gl = gd.gl;

            gd.bindVertexBuffer(this.glBuffer);

            if (numVertices < this.numVertices)
            {
                gl.bufferSubData(gl.ARRAY_BUFFER, (offset * stride), data);
            }
            else
            {
                gl.bufferData(gl.ARRAY_BUFFER, data, this.usage);
            }
        }
    },

    setData : function vertexBufferSetDataFn(data, offset, numVertices)
    {
        if (offset === undefined)
        {
            offset = 0;
        }
        if (numVertices === undefined)
        {
            numVertices = this.numVertices;
        }

        var gd = this.gd;
        var gl = gd.gl;
        var strideInBytes = this.strideInBytes;

        // Fast path for ArrayBuffer data

        if (data.constructor === ArrayBuffer)
        {
            gd.bindVertexBuffer(this.glBuffer);

            if (numVertices < this.numVertices)
            {
                gl.bufferSubData(gl.ARRAY_BUFFER, (offset * strideInBytes), data);
            }
            else
            {
                gl.bufferData(gl.ARRAY_BUFFER, data, this.usage);
            }
            return;
        }

        var attributes = this.attributes;
        var numAttributes = this.numAttributes;
        var attribute, format, bufferData, TypedArrayConstructor;

        if (this.hasSingleFormat)
        {
            attribute = attributes[0];
            format = attribute.format;

            if (format === gl.BYTE)
            {
                if (!(data instanceof Int8Array))
                {
                    TypedArrayConstructor = Int8Array;
                }
            }
            else if (format === gl.UNSIGNED_BYTE)
            {
                if (!(data instanceof Uint8Array))
                {
                    TypedArrayConstructor = Uint8Array;
                }
            }
            else if (format === gl.SHORT)
            {
                if (!(data instanceof Int16Array))
                {
                    TypedArrayConstructor = Int16Array;
                }
            }
            else if (format === gl.UNSIGNED_SHORT)
            {
                if (!(data instanceof Uint16Array))
                {
                    TypedArrayConstructor = Uint16Array;
                }
            }
            else if (format === gl.INT)
            {
                if (!(data instanceof Int32Array))
                {
                    TypedArrayConstructor = Int32Array;
                }
            }
            else if (format === gl.UNSIGNED_INT)
            {
                if (!(data instanceof Uint32Array))
                {
                    TypedArrayConstructor = Uint32Array;
                }
            }
            else if (format === gl.FLOAT)
            {
                if (!(data instanceof Float32Array))
                {
                    TypedArrayConstructor = Float32Array;
                }
            }

            var numValuesPerVertex = this.stride;
            var numValues = (numVertices * numValuesPerVertex);

            if (TypedArrayConstructor)
            {
                // Data has to be put into a Typed Array and
                // potentially normalized.

                if (attribute.normalized)
                {
                    data = this.scaleValues(data, attribute.normalizationScale, numValues);
                }
                bufferData = new TypedArrayConstructor(data);
                if (numValues < bufferData.length)
                {
                    bufferData = bufferData.subarray(0, numValues);
                }
            }
            else
            {
                bufferData = data;
            }

            if (numValues < data.length)
            {
                bufferData = bufferData.subarray(0, numValues);
            }
        }
        else
        {
            var bufferSize = (numVertices * strideInBytes);

            bufferData = new ArrayBuffer(bufferSize);

            var srcOffset = 0, destOffset = 0, v, c, a, numComponents, componentStride, scale;
            if (typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype)
            {
                var dataView = new DataView(bufferData);

                for (v = 0; v < numVertices; v += 1)
                {
                    for (a = 0; a < numAttributes; a += 1)
                    {
                        attribute = attributes[a];
                        numComponents = attribute.numComponents;
                        componentStride = attribute.componentStride;
                        var setter = attribute.typedSetter;
                        if (attribute.normalized)
                        {
                            scale = attribute.normalizationScale;
                            for (c = 0; c < numComponents; c += 1)
                            {
                                setter.call(dataView, destOffset, (data[srcOffset] * scale), true);
                                destOffset += componentStride;
                                srcOffset += 1;
                            }
                        }
                        else
                        {
                            for (c = 0; c < numComponents; c += 1)
                            {
                                setter.call(dataView, destOffset, data[srcOffset], true);
                                destOffset += componentStride;
                                srcOffset += 1;
                            }
                        }
                    }
                }
            }
            else
            {
                for (v = 0; v < numVertices; v += 1)
                {
                    for (a = 0; a < numAttributes; a += 1)
                    {
                        attribute = attributes[a];
                        numComponents = attribute.numComponents;
                        var dest = new attribute.typedArray(bufferData, destOffset, numComponents);
                        destOffset += attribute.stride;
                        if (attribute.normalized)
                        {
                            scale = attribute.normalizationScale;
                            for (c = 0; c < numComponents; c += 1)
                            {
                                dest[c] = (data[srcOffset] * scale);
                                srcOffset += 1;
                            }
                        }
                        else
                        {
                            for (c = 0; c < numComponents; c += 1)
                            {
                                dest[c] = data[srcOffset];
                                srcOffset += 1;
                            }
                        }
                    }
                }
            }
        }
        data = undefined;

        gd.bindVertexBuffer(this.glBuffer);

        if (numVertices < this.numVertices)
        {
            gl.bufferSubData(gl.ARRAY_BUFFER, (offset * strideInBytes), bufferData);
        }
        else
        {
            gl.bufferData(gl.ARRAY_BUFFER, bufferData, this.usage);
        }
    },

    // Internal
    scaleValues : function scaleValuesFn(values, scale, numValues)
    {
        if (numValues === undefined)
        {
            numValues = values.length;
        }
        var scaledValues = new values.constructor(numValues);
        for (var n = 0; n < numValues; n += 1)
        {
            scaledValues[n] = (values[n] * scale);
        }
        return scaledValues;
    },

    bindAttributes : function bindAttributesFn(numAttributes, attributes, offset)
    {
        var gd = this.gd;
        var gl = gd.gl;
        var vertexAttributes = this.attributes;
        var stride = this.strideInBytes;
        var attributeMask = 0;
        /*jshint bitwise: false*/
        for (var n = 0; n < numAttributes; n += 1)
        {
            var vertexAttribute = vertexAttributes[n];
            var attribute = attributes[n];

            attributeMask |= (1 << attribute);

            gl.vertexAttribPointer(attribute,
                                   vertexAttribute.numComponents,
                                   vertexAttribute.format,
                                   vertexAttribute.normalized,
                                   stride,
                                   offset);

            offset += vertexAttribute.stride;
        }
        /*jshint bitwise: true*/
        return attributeMask;
    },

    setAttributes : function setAttributesFn(attributes)
    {
        var gd = this.gd;

        var numAttributes = attributes.length;
        this.numAttributes = numAttributes;

        this.attributes = [];
        var stride = 0, numValuesPerVertex = 0, hasSingleFormat = true;

        for (var i = 0; i < numAttributes; i += 1)
        {
            var format = attributes[i];
            if (typeof format === "string")
            {
                format = gd['VERTEXFORMAT_' + format];
            }
            this.attributes[i] = format;
            stride += format.stride;
            numValuesPerVertex += format.numComponents;

            if (hasSingleFormat && i)
            {
                if (format.format !== this.attributes[i - 1].format)
                {
                    hasSingleFormat = false;
                }
            }
        }
        this.strideInBytes = stride;
        this.stride = numValuesPerVertex;
        this.hasSingleFormat = hasSingleFormat;

        return stride;
    },

    resize : function resizeFn(size)
    {
        if (size !== (this.strideInBytes * this.numVertices))
        {
            var gd = this.gd;
            var gl = gd.gl;

            gd.bindVertexBuffer(this.glBuffer);

            var bufferType = gl.ARRAY_BUFFER;
            gl.bufferData(bufferType, size, this.usage);

            var bufferSize = gl.getBufferParameter(bufferType, gl.BUFFER_SIZE);
            this.numVertices = Math.floor(bufferSize / this.strideInBytes);
        }
    },

    destroy : function vertexBufferDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var glBuffer = this.glBuffer;
            if (glBuffer)
            {
                var gl = gd.gl;
                if (gl)
                {
                    gd.unbindVertexBuffer(glBuffer);
                    gl.deleteBuffer(glBuffer);
                }
                delete this.glBuffer;
            }

            delete this.gd;
        }
    }
};

// Constructor function
WebGLVertexBuffer.create = function webGLVertexBufferCreateFn(gd, params)
{
    var gl = gd.gl;

    var vb = new WebGLVertexBuffer();
    vb.gd = gd;

    var numVertices = params.numVertices;
    vb.numVertices = numVertices;

    var strideInBytes = vb.setAttributes(params.attributes);

    /*jshint sub: true*/
    // Avoid dot notation lookup to prevent Google Closure complaining about transient being a keyword
    vb['transient'] = (params['transient'] || false);
    vb.dynamic = (params.dynamic || vb['transient']);
    vb.usage = (vb['transient'] ? gl.STREAM_DRAW : (vb.dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW));
    /*jshint sub: false*/
    vb.glBuffer = gl.createBuffer();

    var bufferSize = (numVertices * strideInBytes);

    if (params.data)
    {
        vb.setData(params.data, 0, numVertices);
    }
    else
    {
        gd.bindVertexBuffer(vb.glBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, bufferSize, vb.usage);
    }

    return vb;
};


//
// WebGLPass
//
function WebGLPass() {}
WebGLPass.prototype =
{
    version : 1,

    updateParametersData : function updateParametersDataFn(gd)
    {
        var gl = gd.gl;

        this.dirty = false;

        // Set parameters
        var hasProperty = Object.prototype.hasOwnProperty;
        var parameters = this.parameters;
        for (var p in parameters)
        {
            if (hasProperty.call(parameters, p))
            {
                var parameter = parameters[p];
                if (parameter.dirty)
                {
                    parameter.dirty = 0;

                    var paramInfo = parameter.info;
                    var location = parameter.location;
                    if (paramInfo &&
                        null !== location)
                    {
                        var parameterValues = paramInfo.values;
                        var sampler = parameter.sampler;
                        if (sampler)
                        {
                            gd.setTexture(parameter.textureUnit, parameterValues, sampler);
                        }
                        else if (1 < paramInfo.numValues)
                        {
                            parameter.setter.call(gl, location, parameterValues);
                        }
                        else //if (1 === paramInfo.numValues)
                        {
                            parameter.setter.call(gl, location, parameterValues[0]);
                        }
                    }
                }
            }
        }
    },

    initializeParameters : function passInitializeParametersFn(gd)
    {
        var gl = gd.gl;

        var glProgram = this.glProgram;

        gd.setProgram(glProgram);

        var passParameters = this.parameters;
        for (var p in passParameters)
        {
            if (passParameters.hasOwnProperty(p))
            {
                var parameter = passParameters[p];

                var paramInfo = parameter.info;
                if (paramInfo)
                {
                    var location = gl.getUniformLocation(glProgram, p);
                    if (null !== location)
                    {
                        parameter.location = location;

                        if (parameter.sampler)
                        {
                            gl.uniform1i(location, parameter.textureUnit);
                        }
                        else
                        {
                            if (1 < paramInfo.numValues)
                            {
                                parameter.setter.call(gl, location, paramInfo.values);
                            }
                            else //if (1 === paramInfo.numValues)
                            {
                                parameter.setter.call(gl, location, paramInfo.values[0]);
                            }
                        }
                    }
                }
            }
        }
    },

    destroy : function passDestroyFn()
    {
        delete this.glProgram;
        delete this.semanticsMask;
        delete this.parameters;

        var states = this.states;
        if (states)
        {
            states.length = 0;
            delete this.states;
        }
    }
};

// Constructor function
WebGLPass.create = function webGLPassCreateFn(gd, shader, params)
{
    var gl = gd.gl;

    var pass = new WebGLPass();

    pass.name = (params.name || null);

    var programs = shader.programs;
    var parameters = shader.parameters;

    var parameterNames = params.parameters;
    var programNames = params.programs;
    var semanticNames = params.semantics;
    var states = params.states;

    var compoundProgramName = programNames.join(':');
    var linkedProgram = shader.linkedPrograms[compoundProgramName];
    var glProgram, semanticsMask, p, s;
    if (linkedProgram === undefined)
    {
        // Create GL program
        glProgram = gl.createProgram();

        var numPrograms = programNames.length;
        for (p = 0; p < numPrograms; p += 1)
        {
            var glShader = programs[programNames[p]];
            if (glShader)
            {
                gl.attachShader(glProgram, glShader);
            }
        }

        /*jshint bitwise: false*/
        var numSemantics = semanticNames.length;
        semanticsMask = 0;
        for (s = 0; s < numSemantics; s += 1)
        {
            var semanticName = semanticNames[s];
            var attribute = gd['SEMANTIC_' + semanticName];
            if (attribute !== undefined)
            {
                semanticsMask |= (1 << attribute);
                gl.bindAttribLocation(glProgram, attribute, ("ATTR" + attribute));
            }
        }
        /*jshint bitwise: true*/

        gl.linkProgram(glProgram);

        shader.linkedPrograms[compoundProgramName] = {
                glProgram : glProgram,
                semanticsMask : semanticsMask
            };
    }
    else
    {
        //console.log('Reused program ' + compoundProgramName);
        glProgram = linkedProgram.glProgram;
        semanticsMask = linkedProgram.semanticsMask;
    }

    pass.glProgram = glProgram;
    pass.semanticsMask = semanticsMask;

    // Set parameters
    var numTextureUnits = 0;
    var passParameters = {};
    pass.parameters = passParameters;
    var numParameters = parameterNames ? parameterNames.length : 0;
    for (p = 0; p < numParameters; p += 1)
    {
        var parameterName = parameterNames[p];

        var parameter = {};
        passParameters[parameterName] = parameter;

        var paramInfo = parameters[parameterName];
        parameter.info = paramInfo;
        if (paramInfo)
        {
            parameter.location = null;
            if (paramInfo.sampler)
            {
                parameter.sampler = paramInfo.sampler;
                parameter.textureUnit = numTextureUnits;
                numTextureUnits += 1;
            }
            else
            {
                parameter.sampler = undefined;
                parameter.textureUnit = undefined;
            }
            parameter.setter = paramInfo.setter;
        }
    }
    pass.numTextureUnits = numTextureUnits;
    pass.numParameters = numParameters;

    function equalRenderStates(defaultValues, values)
    {
        var numDefaultValues = defaultValues.length;
        var n;
        for (n = 0; n < numDefaultValues; n += 1)
        {
            if (defaultValues[n] !== values[n])
            {
                return false;
            }
        }
        return true;
    }

    var hasProperty = Object.prototype.hasOwnProperty;
    var stateHandlers = gd.stateHandlers;
    var passStates = [];
    var passStatesSet = {};
    pass.states = passStates;
    pass.statesSet = passStatesSet;
    for (s in states)
    {
        if (hasProperty.call(states, s))
        {
            var stateHandler = stateHandlers[s];
            if (stateHandler)
            {
                var values = stateHandler.parse(states[s]);
                if (values !== null)
                {
                    if (equalRenderStates(stateHandler.defaultValues, values))
                    {
                        continue;
                    }
                    passStates.push({
                        name: s,
                        set: stateHandler.set,
                        reset: stateHandler.reset,
                        values: values
                    });
                    passStatesSet[s] = true;
                }
                else
                {
                    TurbulenzEngine.callOnError('Unknown value for state ' +
                                                s + ': ' + states[s]);
                }
            }
        }
    }

    return pass;
};


//
// WebGLTechnique
//
function WebGLTechnique() {}
WebGLTechnique.prototype =
{
    version : 1,

    getPass : function getPassFn(id)
    {
        var passes = this.passes;
        var numPasses = passes.length;
        if (typeof id === "string")
        {
            for (var n = 0; n < numPasses; n += 1)
            {
                var pass = passes[n];
                if (pass.name === id)
                {
                    return pass;
                }
            }
        }
        else
        {
            /*jshint bitwise: false*/
            id = (id | 0);
            /*jshint bitwise: true*/
            if (id < numPasses)
            {
                return passes[id];
            }
        }
        return null;
    },

    activate : function activateFn(gd)
    {
        this.device = gd;

        if (!this.initialized)
        {
            this.shader.initialize(gd);
            this.initialize(gd);
        }
    },

    deactivate : function deactivateFn()
    {
        this.device = null;
    },

    checkProperties : function checkPropertiesFn(gd)
    {
        // Check for parameters set directly into the technique...
        var fakeTechniqueParameters = {}, p;
        for (p in this)
        {
            if (p !== 'version' &&
                p !== 'name' &&
                p !== 'passes' &&
                p !== 'numPasses' &&
                p !== 'device' &&
                p !== 'numParameters')
            {
                fakeTechniqueParameters[p] = this[p];
            }
        }

        if (fakeTechniqueParameters)
        {
            var passes = this.passes;
            if (passes.length === 1)
            {
                gd.setParametersImmediate(gd, passes, fakeTechniqueParameters);
            }
            else
            {
                gd.setParametersDeferred(gd, passes, fakeTechniqueParameters);
            }

            var hasProperty = Object.prototype.hasOwnProperty;
            for (p in fakeTechniqueParameters)
            {
                if (hasProperty.call(fakeTechniqueParameters, p))
                {
                    delete this[p];
                }
            }
        }
    },

    initialize : function techniqueInitializeFn(gd)
    {
        if (this.initialized)
        {
            return;
        }

        var passes = this.passes;
        if (passes)
        {
            var numPasses = passes.length;
            var n;
            for (n = 0; n < numPasses; n += 1)
            {
                passes[n].initializeParameters(gd);
            }
        }

        if (Object.defineProperty)
        {
            this.initializeParametersSetters(gd);
        }

        this.initialized = true;
    },

    initializeParametersSetters : function initializeParametersSettersFn(gd)
    {
        var gl = gd.gl;

        function make_sampler_setter(pass, parameter) {
            return function (parameterValues) {
                if (this.device)
                {
                    gd.setTexture(parameter.textureUnit, parameterValues, parameter.info.sampler);
                }
                else
                {
                    pass.dirty = true;
                    parameter.dirty = 1;
                    parameter.info.values = parameterValues;
                }
            };
        }

        function make_float_uniform_setter(pass, parameter) {

            var paramInfo = parameter.info;
            var location = parameter.location;

            function setDeferredParameter(parameterValues)
            {
                if (typeof parameterValues !== 'number')
                {
                    var values = paramInfo.values;
                    var numValues = Math.min(paramInfo.numValues, parameterValues.length);
                    for (var v = 0; v < numValues; v += 1)
                    {
                        values[v] = parameterValues[v];
                    }
                    parameter.dirty = Math.max(numValues, (parameter.dirty || 0));
                }
                else
                {
                    paramInfo.values[0] = parameterValues;
                    parameter.dirty = (parameter.dirty || 1);
                }
                pass.dirty = true;
            }

            switch (paramInfo.columns)
            {
            case 1:
                if (1 === paramInfo.numValues)
                {
                    return function (parameterValues)
                    {
                        if (this.device)
                        {
                            gl.uniform1f(location, parameterValues);
                        }
                        else
                        {
                            setDeferredParameter(parameterValues);
                        }
                    };
                }
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform1fv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 2:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform2fv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 3:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform3fv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 4:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform4fv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            default:
                return null;
            }
        }

        function make_int_uniform_setter(pass, parameter) {
            var paramInfo = parameter.info;
            var location = parameter.location;

            function setDeferredParameter(parameterValues)
            {
                if (typeof parameterValues !== 'number')
                {
                    var values = paramInfo.values;
                    var numValues = Math.min(paramInfo.numValues, parameterValues.length);
                    for (var v = 0; v < numValues; v += 1)
                    {
                        values[v] = parameterValues[v];
                    }
                    parameter.dirty = Math.max(numValues, (parameter.dirty || 0));
                }
                else
                {
                    paramInfo.values[0] = parameterValues;
                    parameter.dirty = (parameter.dirty || 1);
                }
                pass.dirty = true;
            }

            switch (paramInfo.columns)
            {
            case 1:
                if (1 === paramInfo.numValues)
                {
                    return function (parameterValues)
                    {
                        if (this.device)
                        {
                            gl.uniform1i(location, parameterValues);
                        }
                        else
                        {
                            setDeferredParameter(parameterValues);
                        }
                    };
                }
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform1iv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 2:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform2iv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 3:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform3iv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            case 4:
                return function (parameterValues)
                {
                    if (this.device)
                    {
                        gl.uniform4iv(location, parameterValues);
                    }
                    else
                    {
                        setDeferredParameter(parameterValues);
                    }
                };
            default:
                return null;
            }
        }

        var passes = this.passes;
        var numPasses = passes.length;
        var pass, parameters, p, parameter, paramInfo, setter;
        if (numPasses === 1)
        {
            pass = passes[0];
            parameters = pass.parameters;
            for (p in parameters)
            {
                if (parameters.hasOwnProperty(p))
                {
                    parameter = parameters[p];
                    paramInfo = parameter.info;
                    if (paramInfo)
                    {
                        if (undefined !== parameter.location)
                        {
                            if (parameter.sampler)
                            {
                                setter = make_sampler_setter(pass, parameter);
                            }
                            else
                            {
                                if (paramInfo.type === 'float')
                                {
                                    setter = make_float_uniform_setter(pass, parameter);
                                }
                                else
                                {
                                    setter = make_int_uniform_setter(pass, parameter);
                                }
                            }

                            Object.defineProperty(this, p, {
                                    set : setter,
                                    enumerable : false,
                                    configurable : false
                                });
                        }
                    }
                }
            }

            this.checkProperties = function ()
            {
            };
        }
        else
        {
            Object.defineProperty(this, 'device', {
                    writable : true,
                    enumerable : false,
                    configurable : false
                });

            Object.defineProperty(this, 'version', {
                    writable : false,
                    enumerable : false,
                    configurable : false
                });

            Object.defineProperty(this, 'name', {
                    writable : false,
                    enumerable : false,
                    configurable : false
                });

            Object.defineProperty(this, 'passes', {
                    writable : false,
                    enumerable : false,
                    configurable : false
                });

            Object.defineProperty(this, 'numParameters', {
                    writable : false,
                    enumerable : false,
                    configurable : false
                });
        }
    },

    destroy : function techniqueDestroyFn()
    {
        var passes = this.passes;
        if (passes)
        {
            var numPasses = passes.length;
            var n;

            for (n = 0; n < numPasses; n += 1)
            {
                passes[n].destroy();
            }

            passes.length = 0;

            delete this.passes;
        }

        delete this.device;
    }
};

// Constructor function
WebGLTechnique.create = function webGLTechniqueCreateFn(gd, shader, name, passes)
{
    var technique = new WebGLTechnique();

    technique.initialized = false;
    technique.shader = shader;
    technique.name = name;

    var numPasses = passes.length, n;
    var numParameters = 0;
    technique.passes = [];
    technique.numPasses = numPasses;
    for (n = 0; n < numPasses; n += 1)
    {
        var passParams = passes[n];
        if (passParams.parameters)
        {
            numParameters += passParams.parameters.length;
        }
        technique.passes[n] = WebGLPass.create(gd, shader, passParams);
    }

    technique.numParameters = numParameters;

    technique.device = null;


    return technique;
};

//
// WebGLShader
//
function WebGLShader() {}
WebGLShader.prototype =
{
    version : 1,

    getTechnique : function getTechniqueFn(name)
    {
        if (typeof name === "string")
        {
            return this.techniques[name];
        }
        else
        {
            var techniques = this.techniques;
            for (var t in techniques)
            {
                if (techniques.hasOwnProperty(t))
                {
                    if (name === 0)
                    {
                        return techniques[t];
                    }
                    else
                    {
                        name -= 1;
                    }
                }
            }
            return null;
        }
    },

    getParameter : function getParameterFn(name)
    {
        if (typeof name === "string")
        {
            return this.parameters[name];
        }
        else
        {
            /*jshint bitwise: false*/
            name = (name | 0);
            /*jshint bitwise: true*/
            var parameters = this.parameters;
            for (var p in parameters)
            {
                if (parameters.hasOwnProperty(p))
                {
                    if (name === 0)
                    {
                        return parameters[p];
                    }
                    else
                    {
                        name -= 1;
                    }
                }
            }
            return null;
        }
    },

    initialize : function shaderInitializeFn(gd)
    {
        if (this.initialized)
        {
            return;
        }

        var gl = gd.gl;
        var p;

        // Check copmpiled programs as late as possible
        var shaderPrograms = this.programs;
        for (p in shaderPrograms)
        {
            if (shaderPrograms.hasOwnProperty(p))
            {
                var compiledProgram = shaderPrograms[p];
                var compiled = gl.getShaderParameter(compiledProgram, gl.COMPILE_STATUS);
                if (!compiled)
                {
                    var compilerInfo = gl.getShaderInfoLog(compiledProgram);
                    TurbulenzEngine.callOnError(
                        'Program "' + p + '" failed to compile: ' + compilerInfo);
                }
            }
        }

        // Check linked programs as late as possible
        var linkedPrograms = this.linkedPrograms;
        for (p in linkedPrograms)
        {
            if (linkedPrograms.hasOwnProperty(p))
            {
                var linkedProgram = linkedPrograms[p];
                var glProgram = linkedProgram.glProgram;
                if (glProgram)
                {
                    var linked = gl.getProgramParameter(glProgram, gl.LINK_STATUS);
                    if (!linked)
                    {
                        var linkerInfo = gl.getProgramInfoLog(glProgram);
                        TurbulenzEngine.callOnError(
                            'Program "' + p + '" failed to link: ' + linkerInfo);
                    }
                }
            }
        }

        this.initialized = true;
    },

    destroy : function shaderDestroyFn()
    {
        var gd = this.gd;
        if (gd)
        {
            var gl = gd.gl;
            var p;

            var techniques = this.techniques;
            if (techniques)
            {
                for (p in techniques)
                {
                    if (techniques.hasOwnProperty(p))
                    {
                        techniques[p].destroy();
                    }
                }
                delete this.techniques;
            }

            var linkedPrograms = this.linkedPrograms;
            if (linkedPrograms)
            {
                if (gl)
                {
                    for (p in linkedPrograms)
                    {
                        if (linkedPrograms.hasOwnProperty(p))
                        {
                            var linkedProgram = linkedPrograms[p];
                            var glProgram = linkedProgram.glProgram;
                            if (glProgram)
                            {
                                gl.deleteProgram(glProgram);
                                delete linkedProgram.glProgram;
                            }
                        }
                    }
                }
                delete this.linkedPrograms;
            }

            var programs = this.programs;
            if (programs)
            {
                if (gl)
                {
                    for (p in programs)
                    {
                        if (programs.hasOwnProperty(p))
                        {
                            gl.deleteShader(programs[p]);
                        }
                    }
                }
                delete this.programs;
            }

            delete this.samplers;
            delete this.parameters;
            delete this.gd;
        }
    }
};

// Constructor function
WebGLShader.create = function webGLShaderCreateFn(gd, params)
{
    var gl = gd.gl;

    var shader = new WebGLShader();

    shader.initialized = false;

    var techniques = params.techniques;
    var parameters = params.parameters;
    var programs = params.programs;
    var samplers = params.samplers;
    var p;

    shader.gd = gd;
    shader.name = params.name;

    // Compile programs as early as possible
    var shaderPrograms = {};
    shader.programs = shaderPrograms;
    for (p in programs)
    {
        if (programs.hasOwnProperty(p))
        {
            var program = programs[p];

            var glShaderType;
            if (program.type === 'fragment')
            {
                glShaderType = gl.FRAGMENT_SHADER;
            }
            else if (program.type === 'vertex')
            {
                glShaderType = gl.VERTEX_SHADER;
            }
            var glShader = gl.createShader(glShaderType);

            gl.shaderSource(glShader, program.code);

            gl.compileShader(glShader);

            shaderPrograms[p] = glShader;
        }
    }

    var linkedPrograms = {};
    shader.linkedPrograms = linkedPrograms;

    // Samplers
    var defaultSampler = gd.DEFAULT_SAMPLER;
    var maxAnisotropy = gd.maxAnisotropy;

    shader.samplers = {};
    var sampler;
    for (p in samplers)
    {
        if (samplers.hasOwnProperty(p))
        {
            sampler = samplers[p];

            var samplerMaxAnisotropy = sampler.MaxAnisotropy;
            if (samplerMaxAnisotropy)
            {
                if (samplerMaxAnisotropy > maxAnisotropy)
                {
                    samplerMaxAnisotropy = maxAnisotropy;
                }
            }
            else
            {
                samplerMaxAnisotropy = defaultSampler.maxAnisotropy;
            }

            sampler = {
                minFilter : (sampler.MinFilter || defaultSampler.minFilter),
                magFilter : (sampler.MagFilter || defaultSampler.magFilter),
                wrapS : (sampler.WrapS || defaultSampler.wrapS),
                wrapT : (sampler.WrapT || defaultSampler.wrapT),
                wrapR : (sampler.WrapR || defaultSampler.wrapR),
                maxAnisotropy : samplerMaxAnisotropy
            };
            if (sampler.wrapS === 0x2900)
            {
                sampler.wrapS = gl.CLAMP_TO_EDGE;
            }
            if (sampler.wrapT === 0x2900)
            {
                sampler.wrapT = gl.CLAMP_TO_EDGE;
            }
            if (sampler.wrapR === 0x2900)
            {
                sampler.wrapR = gl.CLAMP_TO_EDGE;
            }
            shader.samplers[p] = gd.createSampler(sampler);
        }
    }

    // Parameters
    var numParameters = 0;
    shader.parameters = {};
    for (p in parameters)
    {
        if (parameters.hasOwnProperty(p))
        {
            var parameter = parameters[p];
            if (!parameter.columns)
            {
                parameter.columns = 1;
            }
            if (!parameter.rows)
            {
                parameter.rows = 1;
            }
            parameter.numValues = (parameter.columns * parameter.rows);
            var parameterType = parameter.type;
            if (parameterType === "float" ||
                parameterType === "int" ||
                parameterType === "bool")
            {
                var parameterValues = parameter.values;
                if (parameterValues)
                {
                    if (parameterType === "float")
                    {
                        parameter.values = new Float32Array(parameterValues);
                    }
                    else
                    {
                        parameter.values = new Int32Array(parameterValues);
                    }
                }
                else
                {
                    if (parameterType === "float")
                    {
                        parameter.values = new Float32Array(parameter.numValues);
                    }
                    else
                    {
                        parameter.values = new Int32Array(parameter.numValues);
                    }
                }

                if (parameterType === 'float')
                {
                    switch (parameter.columns)
                    {
                    case 1:
                        if (1 === parameter.numValues)
                        {
                            parameter.setter = gl.uniform1f;
                        }
                        else
                        {
                            parameter.setter = gl.uniform1fv;
                        }
                        break;
                    case 2:
                        parameter.setter = gl.uniform2fv;
                        break;
                    case 3:
                        parameter.setter = gl.uniform3fv;
                        break;
                    case 4:
                        parameter.setter = gl.uniform4fv;
                        break;
                    default:
                        break;
                    }
                }
                else
                {
                    switch (parameter.columns)
                    {
                    case 1:
                        if (1 === parameter.numValues)
                        {
                            parameter.setter = gl.uniform1i;
                        }
                        else
                        {
                            parameter.setter = gl.uniform1iv;
                        }
                        break;
                    case 2:
                        parameter.setter = gl.uniform2iv;
                        break;
                    case 3:
                        parameter.setter = gl.uniform3iv;
                        break;
                    case 4:
                        parameter.setter = gl.uniform4iv;
                        break;
                    default:
                        break;
                    }
                }
            }
            else // Sampler
            {
                sampler = shader.samplers[p];
                if (!sampler)
                {
                    sampler = defaultSampler;
                    shader.samplers[p] = defaultSampler;
                }
                parameter.sampler = sampler;
                parameter.values = null;
            }

            parameter.name = p;

            shader.parameters[p] = parameter;
            numParameters += 1;
        }
    }
    shader.numParameters = numParameters;

    // Techniques and passes
    var shaderTechniques = {};
    var numTechniques = 0;
    shader.techniques = shaderTechniques;
    for (p in techniques)
    {
        if (techniques.hasOwnProperty(p))
        {
            shaderTechniques[p] = WebGLTechnique.create(gd, shader, p, techniques[p]);
            numTechniques += 1;
        }
    }
    shader.numTechniques = numTechniques;

    return shader;
};

//
// WebGLTechniqueParameters
//
function WebGLTechniqueParameters() {}

// Constructor function
WebGLTechniqueParameters.create = function WebGLTechniqueParametersFn(params)
{
    var techniqueParameters = new WebGLTechniqueParameters();

    if (params)
    {
        for (var p in params)
        {
            if (params.hasOwnProperty(p))
            {
                techniqueParameters[p] = params[p];
            }
        }
    }

    return techniqueParameters;
};

//
// WebGLTechniqueParameterBuffer
//
function techniqueParameterBufferSetData(data, offset, numValues)
{
    for (var n = 0, o = offset; n < numValues; n += 1, o += 1)
    {
        this[o] = data[n];
    }
    return o;
}

function techniqueParameterBufferCreate(params)
{
    if (Float32Array.prototype.map === undefined)
    {
        Float32Array.prototype.map = function techniqueParameterBufferMap(offset, numFloats) {
            if (offset === undefined)
            {
                offset = 0;
            }
            var buffer = this;
            if (numFloats === undefined)
            {
                numFloats = this.length;
            }
            function techniqueParameterBufferWriter()
            {
                var numArguments = arguments.length;
                for (var a = 0; a < numArguments; a += 1)
                {
                    var value = arguments[a];
                    if (typeof value === 'number')
                    {
                        buffer[offset] = value;
                        offset += 1;
                    }
                    else
                    {
                        offset = techniqueParameterBufferSetData.call(buffer, value, offset, value.length);
                    }
                }
            }
            return techniqueParameterBufferWriter;
        };

        Float32Array.prototype.unmap = function techniqueParameterBufferUnmap(writer) {
        };
    }

    return new Float32Array(params.numFloats);
}


//
// WebGLDrawParameters
//
function WebGLDrawParameters()
{
    // Streams, TechniqueParameters and Instances are stored as indexed properties
    this.endStreams = 0;
    this.endTechniqueParameters = (16 * 3);
    this.endInstances = ((16 * 3) + 8);
    this.firstIndex = 0;
    this.count = 0;
    this.sortKey = 0;
    this.technique = null;
    this.indexBuffer = null;
    this.primitive = -1;
    this.userData = null;

    // Initialize for 1 Stream, 2 TechniqueParameters and 8 Instances
    this[0] = undefined;
    this[1] = undefined;
    this[2] = undefined;

    this[(16 * 3) + 0] = undefined;
    this[(16 * 3) + 1] = undefined;

    this[((16 * 3) + 8) + 0] = undefined;
    this[((16 * 3) + 8) + 1] = undefined;
    this[((16 * 3) + 8) + 2] = undefined;
    this[((16 * 3) + 8) + 3] = undefined;
    this[((16 * 3) + 8) + 4] = undefined;
    this[((16 * 3) + 8) + 5] = undefined;
    this[((16 * 3) + 8) + 6] = undefined;
    this[((16 * 3) + 8) + 7] = undefined;
}

WebGLDrawParameters.prototype =
{
    version : 1,

    setTechniqueParameters : function setTechniqueParametersFn(indx, techniqueParameters)
    {
        if (indx < 8)
        {
            indx += (16 * 3);

            this[indx] = techniqueParameters;

            var endTechniqueParameters = this.endTechniqueParameters;
            if (techniqueParameters)
            {
                if (endTechniqueParameters <= indx)
                {
                    this.endTechniqueParameters = (indx + 1);
                }
            }
            else
            {
                while ((16 * 3) < endTechniqueParameters &&
                       !this[endTechniqueParameters - 1])
                {
                    endTechniqueParameters -= 1;
                }
                this.endTechniqueParameters = endTechniqueParameters;
            }
        }
    },

    setVertexBuffer : function setVertexBufferFn(indx, vertexBuffer)
    {
        if (indx < 16)
        {
            indx *= 3;

            this[indx] = vertexBuffer;

            var endStreams = this.endStreams;
            if (vertexBuffer)
            {
                if (endStreams <= indx)
                {
                    this.endStreams = (indx + 3);
                }
            }
            else
            {
                while (0 < endStreams &&
                       !this[endStreams - 3])
                {
                    endStreams -= 3;
                }
                this.endStreams = endStreams;
            }
        }
    },

    setSemantics : function setSemanticsFn(indx, semantics)
    {
        if (indx < 16)
        {
            this[(indx * 3) + 1] = semantics;
        }
    },

    setOffset : function setOffsetFn(indx, offset)
    {
        if (indx < 16)
        {
            this[(indx * 3) + 2] = offset;
        }
    },

    getTechniqueParameters : function getTechniqueParametersFn(indx)
    {
        if (indx < 8)
        {
            return this[indx + (16 * 3)];
        }
        else
        {
            return undefined;
        }
    },

    getVertexBuffer : function getVertexBufferFn(indx)
    {
        if (indx < 16)
        {
            return this[(indx * 3) + 0];
        }
        else
        {
            return undefined;
        }
    },

    getSemantics : function getSemanticsFn(indx)
    {
        if (indx < 16)
        {
            return this[(indx * 3) + 1];
        }
        else
        {
            return undefined;
        }
    },

    getOffset : function getOffsetFn(indx)
    {
        if (indx < 16)
        {
            return this[(indx * 3) + 2];
        }
        else
        {
            return undefined;
        }
    },

    addInstance : function drawParametersAddInstanceFn(instanceParameters)
    {
        if (instanceParameters)
        {
            var endInstances = this.endInstances;
            this.endInstances = (endInstances + 1);
            this[endInstances] = instanceParameters;
        }
    },

    removeInstances : function drawParametersRemoveInstancesFn()
    {
        this.endInstances = ((16 * 3) + 8);
    },

    getNumInstances : function drawParametersGetNumInstancesFn()
    {
        return (this.endInstances - ((16 * 3) + 8));
    }
};

// Constructor function
WebGLDrawParameters.create = function webGLDrawParametersFn(params)
{
    return new WebGLDrawParameters();
};


//
// WebGLGraphicsDevice
//
function WebGLGraphicsDevice() {}
WebGLGraphicsDevice.prototype =
{
    version : 1,

    SEMANTIC_POSITION: 0,
    SEMANTIC_POSITION0: 0,
    SEMANTIC_BLENDWEIGHT: 1,
    SEMANTIC_BLENDWEIGHT0: 1,
    SEMANTIC_NORMAL: 2,
    SEMANTIC_NORMAL0: 2,
    SEMANTIC_COLOR: 3,
    SEMANTIC_COLOR0: 3,
    SEMANTIC_COLOR1: 4,
    SEMANTIC_SPECULAR: 4,
    SEMANTIC_FOGCOORD: 5,
    SEMANTIC_TESSFACTOR: 5,
    SEMANTIC_PSIZE0: 6,
    SEMANTIC_BLENDINDICES: 7,
    SEMANTIC_BLENDINDICES0: 7,
    SEMANTIC_TEXCOORD: 8,
    SEMANTIC_TEXCOORD0: 8,
    SEMANTIC_TEXCOORD1: 9,
    SEMANTIC_TEXCOORD2: 10,
    SEMANTIC_TEXCOORD3: 11,
    SEMANTIC_TEXCOORD4: 12,
    SEMANTIC_TEXCOORD5: 13,
    SEMANTIC_TEXCOORD6: 14,
    SEMANTIC_TEXCOORD7: 15,
    SEMANTIC_TANGENT: 14,
    SEMANTIC_TANGENT0: 14,
    SEMANTIC_BINORMAL0: 15,
    SEMANTIC_BINORMAL: 15,
    SEMANTIC_PSIZE: 6,
    SEMANTIC_ATTR0: 0,
    SEMANTIC_ATTR1: 1,
    SEMANTIC_ATTR2: 2,
    SEMANTIC_ATTR3: 3,
    SEMANTIC_ATTR4: 4,
    SEMANTIC_ATTR5: 5,
    SEMANTIC_ATTR6: 6,
    SEMANTIC_ATTR7: 7,
    SEMANTIC_ATTR8: 8,
    SEMANTIC_ATTR9: 9,
    SEMANTIC_ATTR10: 10,
    SEMANTIC_ATTR11: 11,
    SEMANTIC_ATTR12: 12,
    SEMANTIC_ATTR13: 13,
    SEMANTIC_ATTR14: 14,
    SEMANTIC_ATTR15: 15,

    PIXELFORMAT_A8: 0,
    PIXELFORMAT_L8: 1,
    PIXELFORMAT_L8A8: 2,
    PIXELFORMAT_R5G5B5A1: 3,
    PIXELFORMAT_R5G6B5: 4,
    PIXELFORMAT_R8G8B8A8: 5,
    PIXELFORMAT_R8G8B8: 6,
    PIXELFORMAT_D24S8: 7,
    PIXELFORMAT_DXT1: 8,
    PIXELFORMAT_DXT3: 9,
    PIXELFORMAT_DXT5: 10,

    drawIndexed : function drawIndexedFn(primitive, numIndices, first)
    {
        var gl = this.gl;
        var indexBuffer = this.activeIndexBuffer;

        var offset;
        if (first)
        {
            offset = (first * indexBuffer.stride);
        }
        else
        {
            offset = 0;
        }

        var format = indexBuffer.format;

        var attributeMask = this.attributeMask;

        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var numPasses = passes.length;
        var mask;

        activeTechnique.checkProperties(this);

        /*jshint bitwise: false*/
        if (1 === numPasses)
        {
            mask = (passes[0].semanticsMask & attributeMask);
            if (mask !== this.clientStateMask)
            {
                this.enableClientState(mask);
            }

            gl.drawElements(primitive, numIndices, format, offset);
        }
        else
        {
            for (var p = 0; p < numPasses; p += 1)
            {
                var pass = passes[p];

                mask = (pass.semanticsMask & attributeMask);
                if (mask !== this.clientStateMask)
                {
                    this.enableClientState(mask);
                }

                this.setPass(pass);

                gl.drawElements(primitive, numIndices, format, offset);
            }
        }
        /*jshint bitwise: true*/
    },

    draw : function drawFn(primitive, numVertices, first)
    {
        var gl = this.gl;

        var attributeMask = this.attributeMask;

        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var numPasses = passes.length;
        var mask;

        activeTechnique.checkProperties(this);

        /*jshint bitwise: false*/
        if (1 === numPasses)
        {
            mask = (passes[0].semanticsMask & attributeMask);
            if (mask !== this.clientStateMask)
            {
                this.enableClientState(mask);
            }

            gl.drawArrays(primitive, first, numVertices);
        }
        else
        {
            for (var p = 0; p < numPasses; p += 1)
            {
                var pass = passes[p];

                mask = (pass.semanticsMask & attributeMask);
                if (mask !== this.clientStateMask)
                {
                    this.enableClientState(mask);
                }

                this.setPass(pass);

                gl.drawArrays(primitive, first, numVertices);
            }
        }
        /*jshint bitwise: true*/
    },

    setTechniqueParameters : function setTechniqueParametersFn()
    {
        var activeTechnique = this.activeTechnique;
        var passes = activeTechnique.passes;
        var setParameters = (1 === passes.length ? this.setParametersImmediate : this.setParametersDeferred);
        var numTechniqueParameters = arguments.length;
        for (var t = 0; t < numTechniqueParameters; t += 1)
        {
            setParameters(this, passes, arguments[t]);
        }
    },

    //Internal

    setParametersImmediate : function setParametersImmediateFn(gd, passes, techniqueParameters)
    {
        var gl = gd.gl;

        var parameters = passes[0].parameters;
        /*jshint forin: true*/
        for (var p in techniqueParameters)
        {
            var parameter = parameters[p];
            if (parameter !== undefined)
            {
                var sampler = parameter.sampler;
                var parameterValues = techniqueParameters[p];
                if (parameterValues !== undefined)
                {
                    if (sampler !== undefined)
                    {
                        gd.setTexture(parameter.textureUnit, parameterValues, sampler);
                    }
                    else
                    {
                        parameter.setter.call(gl, parameter.location, parameterValues);
                    }
                }
                else
                {
                    delete techniqueParameters[p];
                    if (sampler)
                    {
                        gd.setTexture(parameter.textureUnit);
                    }
                }
            }
        }
        /*jshint forin: false*/
    },

    // ONLY USE FOR SINGLE PASS TECHNIQUES ON DRAWARRAY
    setParametersCaching : function setParametersCachingFn(gd, passes, techniqueParameters)
    {
        var gl = gd.gl;

        var parameters = passes[0].parameters;
        /*jshint forin: true*/
        for (var p in techniqueParameters)
        {
            var parameter = parameters[p];
            if (parameter !== undefined)
            {
                var parameterValues = techniqueParameters[p];
                if (parameter.value !== parameterValues)
                {
                    parameter.value = parameterValues;

                    var sampler = parameter.sampler;
                    if (parameterValues !== undefined)
                    {
                        if (sampler !== undefined)
                        {
                            gd.setTexture(parameter.textureUnit, parameterValues, sampler);
                        }
                        else
                        {
                            parameter.setter.call(gl, parameter.location, parameterValues);
                        }
                    }
                    else
                    {
                        delete techniqueParameters[p];
                        if (sampler)
                        {
                            gd.setTexture(parameter.textureUnit);
                        }
                    }
                }
            }
        }
        /*jshint forin: false*/
    },

    setParametersDeferred : function setParametersDeferredFn(gd, passes, techniqueParameters)
    {
        var numPasses = passes.length;
        var min = Math.min;
        var max = Math.max;
        for (var n = 0; n < numPasses; n += 1)
        {
            var pass = passes[n];
            var parameters = pass.parameters;
            pass.dirty = true;

            /*jshint forin: true*/
            for (var p in techniqueParameters)
            {
                var parameter = parameters[p];
                if (parameter)
                {
                    var paramInfo = parameter.info;
                    var parameterValues = techniqueParameters[p];
                    if (parameterValues !== undefined)
                    {
                        if (parameter.sampler)
                        {
                            paramInfo.values = parameterValues;
                            parameter.dirty = 1;
                        }
                        else if (typeof parameterValues !== 'number')
                        {
                            var values = paramInfo.values;
                            var numValues = min(paramInfo.numValues, parameterValues.length);
                            for (var v = 0; v < numValues; v += 1)
                            {
                                values[v] = parameterValues[v];
                            }
                            parameter.dirty = max(numValues, (parameter.dirty || 0));
                        }
                        else
                        {
                            paramInfo.values[0] = parameterValues;
                            parameter.dirty = (parameter.dirty || 1);
                        }
                    }
                    else
                    {
                        delete techniqueParameters[p];
                    }
                }
            }
            /*jshint forin: false*/
        }
    },

    setTechnique : function setTechniqueFn(technique)
    {
        var activeTechnique = this.activeTechnique;
        if (activeTechnique !== technique)
        {
            if (activeTechnique)
            {
                activeTechnique.deactivate();
            }

            this.activeTechnique = technique;

            technique.activate(this);

            var passes = technique.passes;
            if (1 === passes.length)
            {
                this.setPass(passes[0]);
            }
        }
    },

    // ONLY USE FOR SINGLE PASS TECHNIQUES ON DRAWARRAY
    setTechniqueCaching : function setTechniqueCachingFn(technique)
    {
        var pass = technique.passes[0];

        var activeTechnique = this.activeTechnique;
        if (activeTechnique !== technique)
        {
            if (activeTechnique)
            {
                activeTechnique.deactivate();
            }

            this.activeTechnique = technique;

            technique.activate(this);

            this.setPass(pass);
        }

        var parameters = pass.parameters;
        for (var p in parameters)
        {
            if (parameters.hasOwnProperty(p))
            {
                parameters[p].value = null;
            }
        }
    },

    setStream : function setStreamFn(vertexBuffer, semantics, offset)
    {
        if (offset)
        {
            offset *= vertexBuffer.strideInBytes;
        }
        else
        {
            offset = 0;
        }

        this.bindVertexBuffer(vertexBuffer.glBuffer);

        var attributes = semantics;
        var numAttributes = attributes.length;
        if (numAttributes > vertexBuffer.numAttributes)
        {
            numAttributes = vertexBuffer.numAttributes;
        }

        /*jshint bitwise: false*/
        this.attributeMask |= vertexBuffer.bindAttributes(numAttributes, attributes, offset);
        /*jshint bitwise: true*/
    },

    setIndexBuffer : function setIndexBufferFn(indexBuffer)
    {
        if (this.activeIndexBuffer !== indexBuffer)
        {
            this.activeIndexBuffer = indexBuffer;
            var glBuffer;
            if (indexBuffer)
            {
                glBuffer = indexBuffer.glBuffer;
            }
            else
            {
                glBuffer = null;
            }
            var gl = this.gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glBuffer);
        }
    },

    drawArray : function drawArrayFn(drawParametersArray, globalTechniqueParametersArray, sortMode)
    {
        var gl = this.gl;
        var ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER;

        var setParametersCaching = this.setParametersCaching;
        var setParametersDeferred = this.setParametersDeferred;

        var setStream = this.setStream;
        var enableClientState = this.enableClientState;

        var numGlobalTechniqueParameters = globalTechniqueParametersArray.length;

        var numDrawParameters = drawParametersArray.length;
        if (numDrawParameters > 1 && sortMode)
        {
            if (sortMode > 0)
            {
                drawParametersArray.sort(function drawArraySortPositive(a, b) {
                    return (b.sortKey - a.sortKey);
                });
            }
            else if (sortMode < 0)
            {
                drawParametersArray.sort(function drawArraySortNegative(a, b) {
                    return (a.sortKey - b.sortKey);
                });
            }
        }


        var activeIndexBuffer = this.activeIndexBuffer;
        var setParameters = null;
        var lastTechnique = null;
        var lastEndStreams = -1;
        var lastDrawParameters = null;
        var techniqueParameters = null;
        var v = 0;
        var streamsMatch = false;
        var vertexBuffer = null;
        var offset = 0;
        var passes = null;
        var p = null;
        var pass = null;
        var format = 0;
        var numPasses = 0;
        var mask = 0;
        var attributeMask = 0;
        var t = 0;

        for (var n = 0; n < numDrawParameters; n += 1)
        {
            var drawParameters = drawParametersArray[n];
            var technique = drawParameters.technique;
            var endTechniqueParameters = drawParameters.endTechniqueParameters;
            var endStreams = drawParameters.endStreams;
            var endInstances = drawParameters.endInstances;
            var indexBuffer = drawParameters.indexBuffer;
            var primitive = drawParameters.primitive;
            var count = drawParameters.count;
            var firstIndex = drawParameters.firstIndex;

            if (lastTechnique !== technique)
            {
                lastTechnique = technique;

                passes = technique.passes;
                numPasses = passes.length;
                if (1 === numPasses)
                {
                    this.setTechniqueCaching(technique);
                    setParameters = setParametersCaching;
                }
                else
                {
                    this.setTechnique(technique);
                    setParameters = setParametersDeferred;
                }

                technique.checkProperties(this);

                for (t = 0; t < numGlobalTechniqueParameters; t += 1)
                {
                    setParameters(this, passes, globalTechniqueParametersArray[t]);
                }
            }

            for (t = (16 * 3); t < endTechniqueParameters; t += 1)
            {
                techniqueParameters = drawParameters[t];
                if (techniqueParameters)
                {
                    setParameters(this, passes, techniqueParameters);
                }
            }

            streamsMatch = (lastEndStreams === endStreams);
            for (v = 0; streamsMatch && v < endStreams; v += 3)
            {
                streamsMatch = (lastDrawParameters[v]     === drawParameters[v]     &&
                                lastDrawParameters[v + 1] === drawParameters[v + 1] &&
                                lastDrawParameters[v + 2] === drawParameters[v + 2]);
            }

            if (!streamsMatch)
            {
                lastEndStreams = endStreams;
                lastDrawParameters = drawParameters;

                for (v = 0; v < endStreams; v += 3)
                {
                    vertexBuffer = drawParameters[v];
                    if (vertexBuffer)
                    {
                        setStream.call(this, vertexBuffer, drawParameters[v + 1], drawParameters[v + 2]);
                    }
                }

                attributeMask = this.attributeMask;
            }

            /*jshint bitwise: false*/
            if (indexBuffer)
            {
                if (activeIndexBuffer !== indexBuffer)
                {
                    activeIndexBuffer = indexBuffer;
                    gl.bindBuffer(ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
                }

                offset = firstIndex;
                if (offset)
                {
                    offset *= indexBuffer.stride;
                }

                format = indexBuffer.format;

                if (1 === numPasses)
                {
                    mask = (passes[0].semanticsMask & attributeMask);
                    if (mask !== this.clientStateMask)
                    {
                        enableClientState.call(this, mask);
                    }

                    t = ((16 * 3) + 8);
                    if (t < endInstances)
                    {
                        do
                        {
                            setParameters(this, passes, drawParameters[t]);

                            gl.drawElements(primitive, count, format, offset);

                            t += 1;
                        }
                        while (t < endInstances);
                    }
                    else
                    {
                        gl.drawElements(primitive, count, format, offset);
                    }
                }
                else
                {
                    t = ((16 * 3) + 8);
                    if (t < endInstances)
                    {
                        do
                        {
                            setParameters(this, passes, drawParameters[t]);

                            for (p = 0; p < numPasses; p += 1)
                            {
                                pass = passes[p];

                                mask = (pass.semanticsMask & attributeMask);
                                if (mask !== this.clientStateMask)
                                {
                                    enableClientState.call(this, mask);
                                }

                                this.setPass(pass);

                                gl.drawElements(primitive, count, format, offset);
                            }

                            t += 1;
                        }
                        while (t < endInstances);
                    }
                    else
                    {
                        for (p = 0; p < numPasses; p += 1)
                        {
                            pass = passes[p];

                            mask = (pass.semanticsMask & attributeMask);
                            if (mask !== this.clientStateMask)
                            {
                                enableClientState.call(this, mask);
                            }

                            this.setPass(pass);

                            gl.drawElements(primitive, count, format, offset);
                        }
                    }
                }
            }
            else
            {
                if (1 === numPasses)
                {
                    mask = (passes[0].semanticsMask & attributeMask);
                    if (mask !== this.clientStateMask)
                    {
                        enableClientState.call(this, mask);
                    }

                    t = ((16 * 3) + 8);
                    if (t < endInstances)
                    {
                        do
                        {
                            setParameters(this, passes, drawParameters[t]);

                            gl.drawArrays(primitive, firstIndex, count);

                            t += 1;
                        }
                        while (t < endInstances);
                    }
                    else
                    {
                        gl.drawArrays(primitive, firstIndex, count);
                    }
                }
                else
                {
                    t = ((16 * 3) + 8);
                    if (t < endInstances)
                    {
                        do
                        {
                            setParameters(this, passes, drawParameters[t]);

                            for (p = 0; p < numPasses; p += 1)
                            {
                                pass = passes[p];

                                mask = (pass.semanticsMask & attributeMask);
                                if (mask !== this.clientStateMask)
                                {
                                    enableClientState.call(this, mask);
                                }

                                this.setPass(pass);

                                gl.drawArrays(primitive, firstIndex, count);
                            }

                            t += 1;
                        }
                        while (t < endInstances);
                    }
                    else
                    {
                        for (p = 0; p < numPasses; p += 1)
                        {
                            pass = passes[p];

                            mask = (pass.semanticsMask & attributeMask);
                            if (mask !== this.clientStateMask)
                            {
                                enableClientState.call(this, mask);
                            }

                            this.setPass(pass);

                            gl.drawArrays(primitive, firstIndex, count);
                        }
                    }
                }
            }
            /*jshint bitwise: true*/
        }

        this.activeIndexBuffer = activeIndexBuffer;
    },

    beginDraw : function beginDrawFn(primitive, numVertices, formats, semantics)
    {
        this.immediatePrimitive = primitive;
        if (numVertices)
        {
            var n;
            var immediateSemantics = this.immediateSemantics;
            var attributes = semantics;
            var numAttributes = attributes.length;
            immediateSemantics.length = numAttributes;
            for (n = 0; n < numAttributes; n += 1)
            {
                var attribute = attributes[n];
                if (typeof attribute === "string")
                {
                    attribute = this['SEMANTIC_' + attribute];
                }
                immediateSemantics[n] = attribute;
            }

            var immediateVertexBuffer = this.immediateVertexBuffer;

            var oldStride = immediateVertexBuffer.strideInBytes;
            var oldSize = (oldStride * immediateVertexBuffer.numVertices);

            var stride = immediateVertexBuffer.setAttributes(formats);
            if (stride !== oldStride)
            {
                immediateVertexBuffer.numVertices = Math.floor(oldSize / stride);
            }

            var size = (stride * numVertices);
            if (size > oldSize)
            {
                immediateVertexBuffer.resize(size);
            }

            return immediateVertexBuffer.map(0, numVertices);
        }
        return null;
    },

    endDraw : function endDrawFn(writer)
    {
        var immediateVertexBuffer = this.immediateVertexBuffer;

        var numVerticesWritten = writer.getNumWrittenVertices();

        immediateVertexBuffer.unmap(writer);

        if (numVerticesWritten)
        {
            var gl = this.gl;

            var stride = immediateVertexBuffer.strideInBytes;
            var offset = 0;

            /*jshint bitwise: false*/
            var vertexAttributes = immediateVertexBuffer.attributes;

            var semantics = this.immediateSemantics;
            var numSemantics = semantics.length;
            var deltaAttributeMask = 0;
            for (var n = 0; n < numSemantics; n += 1)
            {
                var vertexAttribute = vertexAttributes[n];

                var attribute = semantics[n];

                deltaAttributeMask |= (1 << attribute);

                gl.vertexAttribPointer(attribute,
                                       vertexAttribute.numComponents,
                                       vertexAttribute.format,
                                       vertexAttribute.normalized,
                                       stride,
                                       offset);

                offset += vertexAttribute.stride;
            }
            this.attributeMask |= deltaAttributeMask;
            /*jshint bitwise: true*/

            this.draw(this.immediatePrimitive, numVerticesWritten, 0);
        }
    },

    setViewport : function setViewportFn(x, y, w, h)
    {
        var currentBox = this.state.viewportBox;
        if (currentBox[0] !== x ||
            currentBox[1] !== y ||
            currentBox[2] !== w ||
            currentBox[3] !== h)
        {
            currentBox[0] = x;
            currentBox[1] = y;
            currentBox[2] = w;
            currentBox[3] = h;
            this.gl.viewport(x, y, w, h);
        }
    },

    setScissor : function setScissorFn(x, y, w, h)
    {
        var currentBox = this.state.scissorBox;
        if (currentBox[0] !== x ||
            currentBox[1] !== y ||
            currentBox[2] !== w ||
            currentBox[3] !== h)
        {
            currentBox[0] = x;
            currentBox[1] = y;
            currentBox[2] = w;
            currentBox[3] = h;
            this.gl.scissor(x, y, w, h);
        }
    },

    clear : function clearFn(color, depth, stencil)
    {
        var gl = this.gl;
        var state = this.state;

        var clearMask = 0;

        if (color)
        {
            clearMask += gl.COLOR_BUFFER_BIT;

            var currentColor = state.clearColor;
            var color0 = color[0];
            var color1 = color[1];
            var color2 = color[2];
            var color3 = color[3];
            if (currentColor[0] !== color0 ||
                currentColor[1] !== color1 ||
                currentColor[2] !== color2 ||
                currentColor[3] !== color3)
            {
                currentColor[0] = color0;
                currentColor[1] = color1;
                currentColor[2] = color2;
                currentColor[3] = color3;
                gl.clearColor(color0, color1, color2, color3);
            }
        }

        if (depth !== undefined)
        {
            clearMask += gl.DEPTH_BUFFER_BIT;

            if (state.clearDepth !== depth)
            {
                state.clearDepth = depth;
                gl.clearDepth(depth);
            }

            if (stencil !== undefined)
            {
                clearMask += gl.STENCIL_BUFFER_BIT;

                if (state.clearStencil !== stencil)
                {
                    state.clearStencil = stencil;
                    gl.clearStencil(stencil);
                }
            }
        }

        if (clearMask)
        {
            var colorMask = state.colorMask;
            var colorMaskEnabled = (colorMask[0] || colorMask[1] || colorMask[2] || colorMask[3]);
            var depthMask = state.depthMask;
            var program = state.program;

            if (color)
            {
                if (!colorMaskEnabled)
                {
                    // This is posibly a mistake, enable it for this call
                    gl.colorMask(true, true, true, true);
                }
            }

            if (depth !== undefined)
            {
                if (!depthMask)
                {
                    // This is posibly a mistake, enable it for this call
                    gl.depthMask(true);
                }
            }

            if (program)
            {
                gl.useProgram(null);    // Work around for Mac crash bug.
            }

            gl.clear(clearMask);

            if (color)
            {
                if (!colorMaskEnabled)
                {
                    gl.colorMask(false, false, false, false);
                }
            }

            if (depth !== undefined)
            {
                if (!depthMask)
                {
                    gl.depthMask(false);
                }
            }

            if (program)
            {
                gl.useProgram(program);
            }
        }
    },

    beginFrame : function beginFrameFn()
    {
        var gl = this.gl;

        this.attributeMask = 0;

        /*jshint bitwise: false*/
        var clientStateMask = this.clientStateMask;
        var n;
        if (clientStateMask)
        {
            for (n = 0; n < 16; n += 1)
            {
                if (clientStateMask & (1 << n))
                {
                    gl.disableVertexAttribArray(n);
                }
            }
            this.clientStateMask = 0;
        }
        /*jshint bitwise: true*/

        this.resetStates();

        this.setScissor(0, 0, this.width, this.height);
        this.setViewport(0, 0, this.width, this.height);

        return true;
    },

    beginRenderTarget : function beginRenderTargetFn(renderTarget)
    {
        this.activeRenderTarget = renderTarget;
        return renderTarget.bind();
    },

    endRenderTarget : function endRenderTargetFn()
    {
        this.activeRenderTarget.unbind();
        this.activeRenderTarget = null;
    },

    beginOcclusionQuery : function beginOcclusionQueryFn()
    {
        return false;
    },

    endOcclusionQuery : function endOcclusionQueryFn()
    {
    },

    endFrame : function endFrameFn()
    {
        var gl = this.gl;
        //gl.flush();

        if (this.activeTechnique)
        {
            this.activeTechnique.deactivate();
            this.activeTechnique = null;
        }

        if (this.activeIndexBuffer)
        {
            this.setIndexBuffer(null);
        }

        var state = this.state;
        if (state.program)
        {
            state.program = null;
            gl.useProgram(null);
        }

        this.numFrames += 1;
        var currentFrameTime = TurbulenzEngine.getTime();
        var diffTime = (currentFrameTime - this.previousFrameTime);
        if (diffTime >= 1000.0)
        {
            this.fps = (this.numFrames / (diffTime * 0.001));
            this.numFrames = 0;
            this.previousFrameTime = currentFrameTime;
        }

        var canvas = gl.canvas;
        var width = (gl.drawingBufferWidth || canvas.width);
        var height = (gl.drawingBufferHeight || canvas.height);
        if (this.width !== width ||
            this.height !== height)
        {
            this.width = width;
            this.height = height;
            this.setViewport(0, 0, width, height);
            this.setScissor(0, 0, width, height);
        }

        this.checkFullScreen();
    },

    createTechniqueParameters : function createTechniqueParametersFn(params)
    {
        return WebGLTechniqueParameters.create(params);
    },

    createSemantics : function createSemanticsFn(attributes)
    {
        return WebGLSemantics.create(this, attributes);
    },

    createVertexBuffer : function createVertexBufferFn(params)
    {
        return WebGLVertexBuffer.create(this, params);
    },

    createIndexBuffer : function createIndexBufferFn(params)
    {
        return WebGLIndexBuffer.create(this, params);
    },

    createTexture : function createTextureFn(params)
    {
        return WebGLTexture.create(this, params);
    },

    createShader : function createShaderFn(params)
    {
        return WebGLShader.create(this, params);
    },

    createTechniqueParameterBuffer : function createTechniqueParameterBufferFn(params)
    {
        return techniqueParameterBufferCreate(params);
    },

    createRenderBuffer : function createRenderBufferFn(params)
    {
        return WebGLRenderBuffer.create(this, params);
    },

    createRenderTarget : function createRenderTargetFn(params)
    {
        return WebGLRenderTarget.create(this, params);
    },

    createOcclusionQuery : function createOcclusionQueryFn(params)
    {
        return null;
    },

    createDrawParameters : function createDrawParametersFn(params)
    {
        return WebGLDrawParameters.create(params);
    },

    isSupported : function isSupportedFn(name)
    {
        var gl = this.gl;
        if ("OCCLUSION_QUERIES" === name)
        {
            return false;
        }
        else if ("NPOT_MIPMAPPED_TEXTURES" === name)
        {
            return false;
        }
        else if ("TEXTURE_DXT1" === name ||
                 "TEXTURE_DXT3" === name ||
                 "TEXTURE_DXT5" === name)
        {
            var compressedTexturesExtension = this.compressedTexturesExtension;
            if (compressedTexturesExtension)
            {
                var compressedFormats = gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS);
                if (compressedFormats)
                {
                    var requestedFormat;
                    if ("TEXTURE_DXT1" === name)
                    {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    }
                    else if ("TEXTURE_DXT3" === name)
                    {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    }
                    else //if ("TEXTURE_DXT5" === name)
                    {
                        requestedFormat = compressedTexturesExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    }
                    var numCompressedFormats = compressedFormats.length;
                    for (var n = 0; n < numCompressedFormats; n += 1)
                    {
                        if (compressedFormats[n] === requestedFormat)
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        else if ("TEXTURE_ETC1" === name)
        {
            return false;
        }
        else if ("INDEXFORMAT_UINT" === name)
        {
            if (gl.getExtension('OES_element_index_uint'))
            {
                return true;
            }
            return false;
        }
        return undefined;
    },

    maxSupported : function maxSupportedFn(name)
    {
        var gl = this.gl;
        if ("ANISOTROPY" === name)
        {
            return this.maxAnisotropy;
        }
        else if ("TEXTURE_SIZE" === name)
        {
            return gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }
        else if ("CUBEMAP_TEXTURE_SIZE" === name)
        {
            return gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        }
        else if ("3D_TEXTURE_SIZE" === name)
        {
            return 0;
        }
        else if ("RENDERTARGET_COLOR_TEXTURES" === name)
        {
            return 1;
        }
        else if ("RENDERBUFFER_SIZE" === name)
        {
            return gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
        }
        return 0;
    },

    loadTexturesArchive : function loadTexturesArchiveFn(params)
    {
        var src = params.src;
        if (typeof TARLoader !== 'undefined')
        {
            TARLoader.create({
                gd: this,
                src : src,
                mipmaps : params.mipmaps,
                ontextureload : function tarTextureLoadedFn(texture)
                {
                    params.ontextureload(texture);
                },
                onload : function tarLoadedFn(success, status)
                {
                    if (params.onload)
                    {
                        params.onload(true, status);
                    }
                },
                onerror : function tarFailedFn()
                {
                    if (params.onload)
                    {
                        params.onload(false, status);
                    }
                }
            });
            return true;
        }
        else
        {
            TurbulenzEngine.callOnError(
                'Missing archive loader required for ' + src);
            return false;
        }
    },

    getScreenshot : function getScreenshotFn(compress, x, y, width, height)
    {
        var gl = this.gl;
        var canvas = gl.canvas;

        if (compress)
        {
            return canvas.toDataURL('image/jpeg');
        }
        else
        {
            if (x === undefined)
            {
                x = 0;
            }

            if (y === undefined)
            {
                y = 0;
            }

            var target = this.activeRenderTarget;
            if (!target)
            {
                target = canvas;
            }

            if (width === undefined)
            {
                width = target.width;
            }

            if (height === undefined)
            {
                height = target.height;
            }

            var pixels = new Uint8Array(4 * width * height);

            gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            return pixels;
        }
    },

    // private
    checkFullScreen : function checkFullScreenFn()
    {
        var fullscreen = this.fullscreen;
        if (this.oldFullscreen !== fullscreen)
        {
            this.oldFullscreen = fullscreen;

            this.requestFullScreen(fullscreen);
        }
    },

    requestFullScreen : function requestFullScreenFn(fullscreen)
    {
        if (fullscreen)
        {
            var canvas = this.gl.canvas;
            if (canvas.webkitRequestFullScreenWithKeys)
            {
                canvas.webkitRequestFullScreenWithKeys();
            }
            else if (canvas.requestFullScreenWithKeys)
            {
                canvas.requestFullScreenWithKeys();
            }
            else if (canvas.webkitRequestFullScreen)
            {
                canvas.webkitRequestFullScreen(canvas.ALLOW_KEYBOARD_INPUT);
            }
            else if (canvas.mozRequestFullScreen)
            {
                canvas.mozRequestFullScreen();
            }
            else if (canvas.requestFullScreen)
            {
                canvas.requestFullScreen();
            }
            else if (canvas.requestFullscreen)
            {
                canvas.requestFullscreen();
            }
        }
        else
        {
            if (document.webkitCancelFullScreen)
            {
                document.webkitCancelFullScreen();
            }
            else if (document.cancelFullScreen)
            {
                document.cancelFullScreen();
            }
            else if (document.exitFullscreen)
            {
                document.exitFullscreen();
            }
        }
    },

    createSampler : function createSamplerFn(sampler)
    {
        var samplerKey = sampler.minFilter.toString() +
                   ':' + sampler.magFilter.toString() +
                   ':' + sampler.wrapS.toString() +
                   ':' + sampler.wrapT.toString() +
                   ':' + sampler.wrapR.toString() +
                   ':' + sampler.maxAnisotropy.toString();

        var cachedSamplers = this.cachedSamplers;
        var cachedSampler = cachedSamplers[samplerKey];
        if (!cachedSampler)
        {
            cachedSamplers[samplerKey] = sampler;
            return sampler;
        }
        return cachedSampler;
    },

    unsetIndexBuffer : function unsetIndexBufferFn(indexBuffer)
    {
        if (this.activeIndexBuffer === indexBuffer)
        {
            this.activeIndexBuffer = null;
            var gl = this.gl;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
    },

    bindVertexBuffer : function bindVertexBufferFn(buffer)
    {
        if (this.bindedVertexBuffer !== buffer)
        {
            this.bindedVertexBuffer = buffer;
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        }
    },

    unbindVertexBuffer : function unbindVertexBufferFn(buffer)
    {
        if (this.bindedVertexBuffer === buffer)
        {
            this.bindedVertexBuffer = null;
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    },

    bindTextureUnit : function bindTextureUnitFn(unit, target, texture)
    {
        var state = this.state;
        var gl = this.gl;

        if (state.activeTextureUnit !== unit)
        {
            state.activeTextureUnit = unit;
            gl.activeTexture(gl.TEXTURE0 + unit);
        }
        gl.bindTexture(target, texture);
    },

    bindTexture : function bindTextureFn(target, texture)
    {
        var state = this.state;
        var gl = this.gl;

        var dummyUnit = (state.maxTextureUnit - 1);
        if (state.activeTextureUnit !== dummyUnit)
        {
            state.activeTextureUnit = dummyUnit;
            gl.activeTexture(gl.TEXTURE0 + dummyUnit);
        }
        gl.bindTexture(target, texture);
    },

    unbindTexture : function unbindTextureFn(texture)
    {
        var state = this.state;
        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        for (var u = 0; u < lastMaxTextureUnit; u += 1)
        {
            var textureUnit = textureUnits[u];
            if (textureUnit.texture === texture)
            {
                textureUnit.texture = null;
                this.bindTextureUnit(u, textureUnit.target, null);
            }
        }
    },

    setSampler : function setSamplerFn(sampler, target)
    {
        if (sampler)
        {
            var gl = this.gl;

            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, sampler.minFilter);
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, sampler.magFilter);
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, sampler.wrapS);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, sampler.wrapT);
            /*
            if (sSupports3DTextures)
            {
                gl.texParameteri(target, gl.TEXTURE_WRAP_R, sampler.wrapR);
            }
            */
            if (this.TEXTURE_MAX_ANISOTROPY_EXT)
            {
                gl.texParameteri(target, this.TEXTURE_MAX_ANISOTROPY_EXT, sampler.maxAnisotropy);
            }
        }
    },

    setPass : function setPassFn(pass)
    {
        var gl = this.gl;
        var state = this.state;

        // Set renderstates
        var renderStatesSet = pass.statesSet;
        var renderStates = pass.states;
        var numRenderStates = renderStates.length;
        var r, renderState;
        for (r = 0; r < numRenderStates; r += 1)
        {
            renderState = renderStates[r];
            renderState.set.apply(renderState, renderState.values);
        }

        // Reset previous renderstates
        var renderStatesToReset = state.renderStatesToReset;
        var numRenderStatesToReset = renderStatesToReset.length;
        for (r = 0; r < numRenderStatesToReset; r += 1)
        {
            renderState = renderStatesToReset[r];
            if (!(renderState.name in renderStatesSet))
            {
                renderState.reset();
            }
        }

        // Copy set renderstates to be reset later
        renderStatesToReset.length = numRenderStates;
        for (r = 0; r < numRenderStates; r += 1)
        {
            renderStatesToReset[r] = renderStates[r];
        }

        // Reset texture units
        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        var currentMaxTextureUnit = pass.numTextureUnits;
        if (currentMaxTextureUnit < lastMaxTextureUnit)
        {
            var u = currentMaxTextureUnit;
            do
            {
                var textureUnit = textureUnits[u];
                if (textureUnit.texture)
                {
                    textureUnit.texture = null;
                    this.bindTextureUnit(u, textureUnit.target, null);
                }
                u += 1;
            }
            while (u < lastMaxTextureUnit);
        }
        state.lastMaxTextureUnit = currentMaxTextureUnit;

        var program = pass.glProgram;
        if (state.program !== program)
        {
            state.program = program;
            gl.useProgram(program);
        }

        if (pass.dirty)
        {
            pass.updateParametersData(this);
        }
    },

    enableClientState : function enableClientStateFn(mask)
    {
        var gl = this.gl;

        var oldMask = this.clientStateMask;
        this.clientStateMask = mask;

        /*jshint bitwise: false*/
        var disableMask = (oldMask & (~mask));
        var enableMask  = ((~oldMask) & mask);
        var n;

        if (disableMask)
        {
            if ((disableMask & 0xff) === 0)
            {
                disableMask >>= 8;
                n = 8;
            }
            else
            {
                n = 0;
            }
            do
            {
                if (0 !== (0x01 & disableMask))
                {
                    gl.disableVertexAttribArray(n);
                }
                n += 1;
                disableMask >>= 1;
            }
            while (disableMask);
        }

        if (enableMask)
        {
            if ((enableMask & 0xff) === 0)
            {
                enableMask >>= 8;
                n = 8;
            }
            else
            {
                n = 0;
            }
            do
            {
                if (0 !== (0x01 & enableMask))
                {
                    gl.enableVertexAttribArray(n);
                }
                n += 1;
                enableMask >>= 1;
            }
            while (enableMask);
        }
        /*jshint bitwise: true*/
    },

    setTexture : function setTextureFn(textureUnitIndex, texture, sampler)
    {
        var state = this.state;
        var gl = this.gl;

        var textureUnit = state.textureUnits[textureUnitIndex];
        var oldgltarget = textureUnit.target;
        var oldglobject = textureUnit.texture;

        if (texture)
        {
            var gltarget = texture.target;
            var globject = texture.glTexture;
            if (oldglobject !== globject ||
                oldgltarget !== gltarget)
            {
                textureUnit.target = gltarget;
                textureUnit.texture = globject;

                if (state.activeTextureUnit !== textureUnitIndex)
                {
                    state.activeTextureUnit = textureUnitIndex;
                    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
                }

                if (oldgltarget !== gltarget &&
                    oldglobject)
                {
                    gl.bindTexture(oldgltarget, null);
                }

                gl.bindTexture(gltarget, globject);

                if (texture.sampler !== sampler)
                {
                    texture.sampler = sampler;

                    this.setSampler(sampler, gltarget);
                }
            }
        }
        else
        {
            if (oldgltarget &&
                oldglobject)
            {
                textureUnit.target = 0;
                textureUnit.texture = null;

                if (state.activeTextureUnit !== textureUnitIndex)
                {
                    state.activeTextureUnit = textureUnitIndex;
                    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
                }

                gl.bindTexture(oldgltarget, null);
            }
        }
    },

    setProgram : function setProgramFn(program)
    {
        var state = this.state;
        if (state.program !== program)
        {
            state.program = program;
            this.gl.useProgram(program);
        }
    },

    syncState : function syncStateFn()
    {
        var state = this.state;
        var gl = this.gl;

        if (state.depthTestEnable)
        {
            gl.enable(gl.DEPTH_TEST);
        }
        else
        {
            gl.disable(gl.DEPTH_TEST);
        }

        gl.depthFunc(state.depthFunc);

        gl.depthMask(state.depthMask);

        if (state.blendEnable)
        {
            gl.enable(gl.BLEND);
        }
        else
        {
            gl.disable(gl.BLEND);
        }

        gl.blendFunc(state.blendSrc, state.blendDst);

        if (state.cullFaceEnable)
        {
            gl.enable(gl.CULL_FACE);
        }
        else
        {
            gl.disable(gl.CULL_FACE);
        }

        gl.cullFace(state.cullFace);

        gl.frontFace(state.frontFace);

        var colorMask = state.colorMask;
        gl.colorMask(colorMask[0], colorMask[1], colorMask[2], colorMask[3]);

        if (state.stencilTestEnable)
        {
            gl.enable(gl.STENCIL_TEST);
        }
        else
        {
            gl.disable(gl.STENCIL_TEST);
        }

        gl.stencilFunc(state.stencilFunc, state.stencilRef, state.stencilMask);

        gl.stencilOp(state.stencilFail, state.stencilZFail, state.stencilZPass);

        if (state.polygonOffsetFillEnable)
        {
            gl.enable(gl.POLYGON_OFFSET_FILL);
        }
        else
        {
            gl.disable(gl.POLYGON_OFFSET_FILL);
        }

        gl.polygonOffset(state.polygonOffsetFactor, state.polygonOffsetUnits);

        gl.lineWidth(state.lineWidth);

        gl.activeTexture(gl.TEXTURE0 + state.activeTextureUnit);

        var currentBox = this.state.viewportBox;
        gl.viewport(currentBox[0], currentBox[1], currentBox[2], currentBox[3]);

        currentBox = this.state.scissorBox;
        gl.scissor(currentBox[0], currentBox[1], currentBox[2], currentBox[3]);

        var currentColor = state.clearColor;
        gl.clearColor(currentColor[0], currentColor[1], currentColor[2], currentColor[3]);

        gl.clearDepth(state.clearDepth);

        gl.clearStencil(state.clearStencil);
    },

    resetStates : function resetStatesFn()
    {
        var state = this.state;

        var lastMaxTextureUnit = state.lastMaxTextureUnit;
        var textureUnits = state.textureUnits;
        for (var u = 0; u < lastMaxTextureUnit; u += 1)
        {
            var textureUnit = textureUnits[u];
            if (textureUnit.texture)
            {
                this.bindTextureUnit(u, textureUnit.target, null);
                textureUnit.texture = null;
                textureUnit.target = 0;
            }
        }
    },

    destroy : function graphicsDeviceDestroyFn()
    {
        delete this.activeTechnique;
        delete this.activeIndexBuffer;
        delete this.bindedVertexBuffer;

        if (this.immediateVertexBuffer)
        {
            this.immediateVertexBuffer.destroy();
            delete this.immediateVertexBuffer;
        }

        delete this.gl;
    }
};

// Constructor function
WebGLGraphicsDevice.create = function webGLGraphicsDeviceCreateFn(canvas, params)
{
    function getAvailableContext(canvas, params, contextList)
    {
        if (canvas.getContext)
        {
            var canvasParams = {
                    alpha: false,
                    stencil: true,
                    antialias: false
                };

            var multisample = params.multisample;
            if (multisample !== undefined && 1 < multisample)
            {
                canvasParams.antialias = true;
            }

            var numContexts = contextList.length, i;
            for (i = 0; i < numContexts; i += 1)
            {
                try
                {
                    var context = canvas.getContext(contextList[i], canvasParams);
                    if (context)
                    {
                        return context;
                    }
                }
                catch (ex)
                {
                }
            }
        }
        return null;
    }

    // TODO: Test if we can also use "webkit-3d" and "moz-webgl"
    var gl = getAvailableContext(canvas, params, ['webgl', 'experimental-webgl']);
    if (!gl)
    {
        return null;
    }

    var width = (gl.drawingBufferWidth || canvas.width);
    var height = (gl.drawingBufferHeight || canvas.height);

    gl.enable(gl.SCISSOR_TEST);
    gl.depthRange(0.0, 1.0);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    //gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);

    var gd = new WebGLGraphicsDevice();
    gd.gl = gl;
    gd.width = width;
    gd.height = height;

    var extensions = gl.getSupportedExtensions();
    if (extensions)
    {
        extensions = extensions.join(' ');
    }
    else
    {
        extensions = '';
    }
    gd.extensions = extensions;
    gd.shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
    gd.rendererVersion = gl.getParameter(gl.VERSION);
    gd.renderer = gl.getParameter(gl.RENDERER);
    gd.vendor = gl.getParameter(gl.VENDOR);

    if (extensions.indexOf('WEBGL_compressed_texture_s3tc') !== -1)
    {
        gd.WEBGL_compressed_texture_s3tc = true;
        if (extensions.indexOf('WEBKIT_WEBGL_compressed_texture_s3tc') !== -1)
        {
            gd.compressedTexturesExtension = gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
        }
        else if (extensions.indexOf('MOZ_WEBGL_compressed_texture_s3tc') !== -1)
        {
            gd.compressedTexturesExtension = gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc');
        }
        else
        {
            gd.compressedTexturesExtension = gl.getExtension('WEBGL_compressed_texture_s3tc');
        }
    }
    else if (extensions.indexOf('WEBKIT_WEBGL_compressed_textures') !== -1)
    {
        gd.compressedTexturesExtension = gl.getExtension('WEBKIT_WEBGL_compressed_textures');
    }

    var anisotropyExtension;
    if (extensions.indexOf('EXT_texture_filter_anisotropic') !== -1)
    {
        if (extensions.indexOf('MOZ_EXT_texture_filter_anisotropic') !== -1)
        {
            anisotropyExtension = gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
        }
        else if (extensions.indexOf('WEBKIT_EXT_texture_filter_anisotropic') !== -1)
        {
            anisotropyExtension = gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
        }
        else
        {
            anisotropyExtension = gl.getExtension('EXT_texture_filter_anisotropic');
        }
    }
    if (anisotropyExtension)
    {
        gd.TEXTURE_MAX_ANISOTROPY_EXT = anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT;
        gd.maxAnisotropy = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    }
    else
    {
        gd.maxAnisotropy = 1;
    }

    gd.PRIMITIVE_POINTS         = gl.POINTS;
    gd.PRIMITIVE_LINES          = gl.LINES;
    gd.PRIMITIVE_LINE_LOOP      = gl.LINE_LOOP;
    gd.PRIMITIVE_LINE_STRIP     = gl.LINE_STRIP;
    gd.PRIMITIVE_TRIANGLES      = gl.TRIANGLES;
    gd.PRIMITIVE_TRIANGLE_STRIP = gl.TRIANGLE_STRIP;
    gd.PRIMITIVE_TRIANGLE_FAN   = gl.TRIANGLE_FAN;

    gd.INDEXFORMAT_UBYTE  = gl.UNSIGNED_BYTE;
    gd.INDEXFORMAT_USHORT = gl.UNSIGNED_SHORT;
    gd.INDEXFORMAT_UINT   = gl.UNSIGNED_INT;

    function getNormalizationScale(format)
    {
        if (format === gl.BYTE)
        {
            return 0x7f;
        }
        else if (format === gl.UNSIGNED_BYTE)
        {
            return 0xff;
        }
        else if (format === gl.SHORT)
        {
            return 0x7fff;
        }
        else if (format === gl.UNSIGNED_SHORT)
        {
            return 0xffff;
        }
        else if (format === gl.INT)
        {
            return 0x7fffffff;
        }
        else if (format === gl.UNSIGNED_INT)
        {
            return 0xffffffff;
        }
        else //if (format === gl.FLOAT)
        {
            return 1;
        }
    }

    function makeVertexformat(n, c, s, f, name)
    {
        var attributeFormat = {
                numComponents: c,
                stride: s,
                componentStride: (s / c),
                format: f,
                name: name
            };
        if (n)
        {
            attributeFormat.normalized = true;
            attributeFormat.normalizationScale = getNormalizationScale(f);
        }
        else
        {
            attributeFormat.normalized = false;
            attributeFormat.normalizationScale = 1;
        }

        if (typeof DataView !== 'undefined' && 'setFloat32' in DataView.prototype)
        {
            if (f === gl.BYTE)
            {
                attributeFormat.typedSetter = DataView.prototype.setInt8;
            }
            else if (f === gl.UNSIGNED_BYTE)
            {
                attributeFormat.typedSetter = DataView.prototype.setUint8;
            }
            else if (f === gl.SHORT)
            {
                attributeFormat.typedSetter = DataView.prototype.setInt16;
            }
            else if (f === gl.UNSIGNED_SHORT)
            {
                attributeFormat.typedSetter = DataView.prototype.setUint16;
            }
            else if (f === gl.INT)
            {
                attributeFormat.typedSetter = DataView.prototype.setInt32;
            }
            else if (f === gl.UNSIGNED_INT)
            {
                attributeFormat.typedSetter = DataView.prototype.setUint32;
            }
            else //if (f === gl.FLOAT)
            {
                attributeFormat.typedSetter = DataView.prototype.setFloat32;
            }
        }
        else
        {
            if (f === gl.BYTE)
            {
                attributeFormat.typedArray = Int8Array;
            }
            else if (f === gl.UNSIGNED_BYTE)
            {
                attributeFormat.typedArray = Uint8Array;
            }
            else if (f === gl.SHORT)
            {
                attributeFormat.typedArray = Int16Array;
            }
            else if (f === gl.UNSIGNED_SHORT)
            {
                attributeFormat.typedArray = Uint16Array;
            }
            else if (f === gl.INT)
            {
                attributeFormat.typedArray = Int32Array;
            }
            else if (f === gl.UNSIGNED_INT)
            {
                attributeFormat.typedArray = Uint32Array;
            }
            else //if (f === gl.FLOAT)
            {
                attributeFormat.typedArray = Float32Array;
            }
        }
        return attributeFormat;
    }

    gd.VERTEXFORMAT_BYTE4    = makeVertexformat(0, 4,  4, gl.BYTE, 'BYTE4');
    gd.VERTEXFORMAT_BYTE4N   = makeVertexformat(1, 4,  4, gl.BYTE, 'BYTE4N');
    gd.VERTEXFORMAT_UBYTE4   = makeVertexformat(0, 4,  4, gl.UNSIGNED_BYTE, 'UBYTE4');
    gd.VERTEXFORMAT_UBYTE4N  = makeVertexformat(1, 4,  4, gl.UNSIGNED_BYTE, 'UBYTE4N');
    gd.VERTEXFORMAT_SHORT2   = makeVertexformat(0, 2,  4, gl.SHORT, 'SHORT2');
    gd.VERTEXFORMAT_SHORT2N  = makeVertexformat(1, 2,  4, gl.SHORT, 'SHORT2N');
    gd.VERTEXFORMAT_SHORT4   = makeVertexformat(0, 4,  8, gl.SHORT, 'SHORT4');
    gd.VERTEXFORMAT_SHORT4N  = makeVertexformat(1, 4,  8, gl.SHORT, 'SHORT4N');
    gd.VERTEXFORMAT_USHORT2  = makeVertexformat(0, 2,  4, gl.UNSIGNED_SHORT, 'USHORT2');
    gd.VERTEXFORMAT_USHORT2N = makeVertexformat(1, 2,  4, gl.UNSIGNED_SHORT, 'USHORT2N');
    gd.VERTEXFORMAT_USHORT4  = makeVertexformat(0, 4,  8, gl.UNSIGNED_SHORT, 'USHORT4');
    gd.VERTEXFORMAT_USHORT4N = makeVertexformat(1, 4,  8, gl.UNSIGNED_SHORT, 'USHORT4N');
    gd.VERTEXFORMAT_FLOAT1   = makeVertexformat(0, 1,  4, gl.FLOAT, 'FLOAT1');
    gd.VERTEXFORMAT_FLOAT2   = makeVertexformat(0, 2,  8, gl.FLOAT, 'FLOAT2');
    gd.VERTEXFORMAT_FLOAT3   = makeVertexformat(0, 3, 12, gl.FLOAT, 'FLOAT3');
    gd.VERTEXFORMAT_FLOAT4   = makeVertexformat(0, 4, 16, gl.FLOAT, 'FLOAT4');

    gd.DEFAULT_SAMPLER = {
        minFilter : gl.LINEAR_MIPMAP_LINEAR,
        magFilter : gl.LINEAR,
        wrapS : gl.REPEAT,
        wrapT : gl.REPEAT,
        wrapR : gl.REPEAT,
        maxAnisotropy : 1
    };

    gd.cachedSamplers = {};

    var maxTextureUnit = 1;
    var maxUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    if (maxTextureUnit < maxUnit)
    {
        maxTextureUnit = maxUnit;
    }
    maxUnit = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    if (maxTextureUnit < maxUnit)
    {
        maxTextureUnit = maxUnit;
    }

    var textureUnits = [];
    textureUnits.length = maxTextureUnit;
    for (var t = 0; t < maxTextureUnit; t += 1)
    {
        textureUnits[t] = {};
    }

    var defaultDepthFunc = gl.LEQUAL;
    var defaultBlendFuncSrc = gl.SRC_ALPHA;
    var defaultBlendFuncDst = gl.ONE_MINUS_SRC_ALPHA;
    var defaultCullFace = gl.BACK;
    var defaultFrontFace = gl.CCW;
    var defaultStencilFunc = gl.ALWAYS;
    var defaultStencilOp = gl.KEEP;

    var currentState = {
            depthTestEnable         : true,
            blendEnable             : false,
            cullFaceEnable          : true,
            stencilTestEnable       : false,
            polygonOffsetFillEnable : false,
            depthMask               : true,
            depthFunc               : defaultDepthFunc,
            blendSrc                : defaultBlendFuncSrc,
            blendDst                : defaultBlendFuncDst,
            cullFace                : defaultCullFace,
            frontFace               : defaultFrontFace,
            colorMask               : [true, true, true, true],
            stencilFunc             : defaultStencilFunc,
            stencilRef              : 0,
            stencilMask             : 0xffffffff,
            stencilFail             : defaultStencilOp,
            stencilZFail            : defaultStencilOp,
            stencilZPass            : defaultStencilOp,
            polygonOffsetFactor     : 0,
            polygonOffsetUnits      : 0,
            lineWidth               : 1,

            renderStatesToReset : [],

            viewportBox : [0, 0, width, height],
            scissorBox  : [0, 0, width, height],

            clearColor   : [0, 0, 0, 1],
            clearDepth   : 1.0,
            clearStencil : 0,

            activeTextureUnit : 0,
            maxTextureUnit    : maxTextureUnit,
            lastMaxTextureUnit: 0,
            textureUnits      : textureUnits,

            program : null
        };
    gd.state = currentState;

    // State handlers
    function setDepthTestEnable(enable)
    {
        if (currentState.depthTestEnable !== enable)
        {
            currentState.depthTestEnable = enable;
            if (enable)
            {
                gl.enable(gl.DEPTH_TEST);
            }
            else
            {
                gl.disable(gl.DEPTH_TEST);
            }
        }
    }

    function setDepthFunc(func)
    {
        if (currentState.depthFunc !== func)
        {
            currentState.depthFunc = func;
            gl.depthFunc(func);
        }
    }

    function setDepthMask(enable)
    {
        if (currentState.depthMask !== enable)
        {
            currentState.depthMask = enable;
            gl.depthMask(enable);
        }
    }

    function setBlendEnable(enable)
    {
        if (currentState.blendEnable !== enable)
        {
            currentState.blendEnable = enable;
            if (enable)
            {
                gl.enable(gl.BLEND);
            }
            else
            {
                gl.disable(gl.BLEND);
            }
        }
    }

    function setBlendFunc(src, dst)
    {
        if (currentState.blendSrc !== src || currentState.blendDst !== dst)
        {
            currentState.blendSrc = src;
            currentState.blendDst = dst;
            gl.blendFunc(src, dst);
        }
    }

    function setCullFaceEnable(enable)
    {
        if (currentState.cullFaceEnable !== enable)
        {
            currentState.cullFaceEnable = enable;
            if (enable)
            {
                gl.enable(gl.CULL_FACE);
            }
            else
            {
                gl.disable(gl.CULL_FACE);
            }
        }
    }

    function setCullFace(face)
    {
        if (currentState.cullFace !== face)
        {
            currentState.cullFace = face;
            gl.cullFace(face);
        }
    }

    function setFrontFace(face)
    {
        if (currentState.frontFace !== face)
        {
            currentState.frontFace = face;
            gl.frontFace(face);
        }
    }

    function setColorMask(mask0, mask1, mask2, mask3)
    {
        var colorMask = currentState.colorMask;
        if (colorMask[0] !== mask0 ||
            colorMask[1] !== mask1 ||
            colorMask[2] !== mask2 ||
            colorMask[3] !== mask3)
        {
            colorMask[0] = mask0;
            colorMask[1] = mask1;
            colorMask[2] = mask2;
            colorMask[3] = mask3;
            gl.colorMask(mask0, mask1, mask2, mask3);
        }
    }

    function setStencilTestEnable(enable)
    {
        if (currentState.stencilTestEnable !== enable)
        {
            currentState.stencilTestEnable = enable;
            if (enable)
            {
                gl.enable(gl.STENCIL_TEST);
            }
            else
            {
                gl.disable(gl.STENCIL_TEST);
            }
        }
    }

    function setStencilFunc(stencilFunc, stencilRef, stencilMask)
    {
        if (currentState.stencilFunc !== stencilFunc ||
            currentState.stencilRef !== stencilRef ||
            currentState.stencilMask !== stencilMask)
        {
            currentState.stencilFunc = stencilFunc;
            currentState.stencilRef = stencilRef;
            currentState.stencilMask = stencilMask;
            gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
        }
    }

    function setStencilOp(stencilFail, stencilZfail, stencilZpass)
    {
        if (currentState.stencilFail !== stencilFail ||
            currentState.stencilZFail !== stencilZfail ||
            currentState.stencilZPass !== stencilZpass)
        {
            currentState.stencilFail = stencilFail;
            currentState.stencilZFail = stencilZfail;
            currentState.stencilZPass = stencilZpass;
            gl.stencilOp(stencilFail, stencilZfail, stencilZpass);
        }
    }

    function setPolygonOffsetFillEnable(enable)
    {
        if (currentState.polygonOffsetFillEnable !== enable)
        {
            currentState.polygonOffsetFillEnable = enable;
            if (enable)
            {
                gl.enable(gl.POLYGON_OFFSET_FILL);
            }
            else
            {
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
        }
    }

    function setPolygonOffset(factor, units)
    {
        if (currentState.polygonOffsetFactor !== factor ||
            currentState.polygonOffsetUnits !== units)
        {
            currentState.polygonOffsetFactor = factor;
            currentState.polygonOffsetUnits = units;
            gl.polygonOffset(factor, units);
        }
    }

    function setLineWidth(lineWidth)
    {
        if (currentState.lineWidth !== lineWidth)
        {
            currentState.lineWidth = lineWidth;
            gl.lineWidth(lineWidth);
        }
    }

    function resetDepthTestEnable()
    {
        //setDepthTestEnable(true);
        if (!currentState.depthTestEnable)
        {
            currentState.depthTestEnable = true;
            gl.enable(gl.DEPTH_TEST);
        }
    }

    function resetDepthFunc()
    {
        //setDepthFunc(defaultDepthFunc);
        var func = defaultDepthFunc;
        if (currentState.depthFunc !== func)
        {
            currentState.depthFunc = func;
            gl.depthFunc(func);
        }
    }

    function resetDepthMask()
    {
        //setDepthMask(true);
        if (!currentState.depthMask)
        {
            currentState.depthMask = true;
            gl.depthMask(true);
        }
    }

    function resetBlendEnable()
    {
        //setBlendEnable(false);
        if (currentState.blendEnable)
        {
            currentState.blendEnable = false;
            gl.disable(gl.BLEND);
        }
    }

    function resetBlendFunc()
    {
        //setBlendFunc(defaultBlendFuncSrc, defaultBlendFuncDst);
        var src = defaultBlendFuncSrc;
        var dst = defaultBlendFuncDst;
        if (currentState.blendSrc !== src || currentState.blendDst !== dst)
        {
            currentState.blendSrc = src;
            currentState.blendDst = dst;
            gl.blendFunc(src, dst);
        }
    }

    function resetCullFaceEnable()
    {
        //setCullFaceEnable(true);
        if (!currentState.cullFaceEnable)
        {
            currentState.cullFaceEnable = true;
            gl.enable(gl.CULL_FACE);
        }
    }

    function resetCullFace()
    {
        //setCullFace(defaultCullFace);
        var face = defaultCullFace;
        if (currentState.cullFace !== face)
        {
            currentState.cullFace = face;
            gl.cullFace(face);
        }
    }

    function resetFrontFace()
    {
        //setFrontFace(defaultFrontFace);
        var face = defaultFrontFace;
        if (currentState.frontFace !== face)
        {
            currentState.frontFace = face;
            gl.frontFace(face);
        }
    }

    function resetColorMask()
    {
        //setColorMask(true, true, true, true);
        var colorMask = currentState.colorMask;
        if (colorMask[0] !== true ||
            colorMask[1] !== true ||
            colorMask[2] !== true ||
            colorMask[3] !== true)
        {
            colorMask[0] = true;
            colorMask[1] = true;
            colorMask[2] = true;
            colorMask[3] = true;
            gl.colorMask(true, true, true, true);
        }
    }

    function resetStencilTestEnable()
    {
        //setStencilTestEnable(false);
        if (currentState.stencilTestEnable)
        {
            currentState.stencilTestEnable = false;
            gl.disable(gl.STENCIL_TEST);
        }
    }

    function resetStencilFunc()
    {
        //setStencilFunc(defaultStencilFunc, 0, 0xffffffff);
        var stencilFunc = defaultStencilFunc;
        if (currentState.stencilFunc !== stencilFunc ||
            currentState.stencilRef !== 0 ||
            currentState.stencilMask !== 0xffffffff)
        {
            currentState.stencilFunc = stencilFunc;
            currentState.stencilRef = 0;
            currentState.stencilMask = 0xffffffff;
            gl.stencilFunc(stencilFunc, 0, 0xffffffff);
        }
    }

    function resetStencilOp()
    {
        //setStencilOp(defaultStencilOp, defaultStencilOp, defaultStencilOp);
        var stencilOp = defaultStencilOp;
        if (currentState.stencilFail !== stencilOp ||
            currentState.stencilZFail !== stencilOp ||
            currentState.stencilZPass !== stencilOp)
        {
            currentState.stencilFail = stencilOp;
            currentState.stencilZFail = stencilOp;
            currentState.stencilZPass = stencilOp;
            gl.stencilOp(stencilOp, stencilOp, stencilOp);
        }
    }

    function resetPolygonOffsetFillEnable()
    {
        //setPolygonOffsetFillEnable(false);
        if (currentState.polygonOffsetFillEnable)
        {
            currentState.polygonOffsetFillEnable = false;
            gl.disable(gl.POLYGON_OFFSET_FILL);
        }
    }

    function resetPolygonOffset()
    {
        //setPolygonOffset(0, 0);
        if (currentState.polygonOffsetFactor !== 0 ||
            currentState.polygonOffsetUnits !== 0)
        {
            currentState.polygonOffsetFactor = 0;
            currentState.polygonOffsetUnits = 0;
            gl.polygonOffset(0, 0);
        }
    }

    function resetLineWidth()
    {
        //setLineWidth(1);
        if (currentState.lineWidth !== 1)
        {
            currentState.lineWidth = 1;
            gl.lineWidth(1);
        }
    }

    function parseBoolean(state)
    {
        if (typeof state === 'number')
        {
            return (state ? true : false);
        }
        if (typeof state !== 'boolean')
        {
            // TODO
            return null;
        }
        return [state];
    }

    function parseEnum(state)
    {
        if (typeof state !== 'number')
        {
            // TODO
            return null;
        }
        return [state];
    }

    function parseEnum2(state)
    {
        if (typeof state === 'object')
        {
            var value0 = state[0], value1 = state[1];
            if (typeof value0 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value1 !== 'number')
            {
                // TODO
                return null;
            }
            return [value0, value1];
        }
        return null;
    }

    function parseEnum3(state)
    {
        if (typeof state === 'object')
        {
            var value0 = state[0], value1 = state[1], value2 = state[2];
            if (typeof value0 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value1 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value2 !== 'number')
            {
                // TODO
                return null;
            }
            return [value0, value1, value2];
        }
        return null;
    }

    function parseFloat(state)
    {
        if (typeof state !== 'number')
        {
            // TODO
            return null;
        }
        return [state];
    }

    function parseFloat2(state)
    {
        if (typeof state === 'object')
        {
            var value0 = state[0], value1 = state[1];
            if (typeof value0 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value1 !== 'number')
            {
                // TODO
                return null;
            }
            return [value0, value1];
        }
        return null;
    }

    function parseColorMask(state)
    {
        if (typeof state === 'object')
        {
            var value0 = state[0], value1 = state[1], value2 = state[2], value3 = state[3];
            if (typeof value0 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value1 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value2 !== 'number')
            {
                // TODO
                return null;
            }
            if (typeof value3 !== 'number')
            {
                // TODO
                return null;
            }
            return [value0, value1, value2, value3];
        }
        return null;
    }

    var stateHandlers = {};
    function addStateHandler(name, sf, rf, pf, dv)
    {
        stateHandlers[name] = {
            set: sf,
            reset: rf,
            parse: pf,
            defaultValues: dv
        };
    }
    addStateHandler("DepthTestEnable", setDepthTestEnable, resetDepthTestEnable, parseBoolean, [true]);
    addStateHandler("DepthFunc", setDepthFunc, resetDepthFunc, parseEnum, [defaultDepthFunc]);
    addStateHandler("DepthMask", setDepthMask, resetDepthMask, parseBoolean, [true]);
    addStateHandler("BlendEnable", setBlendEnable, resetBlendEnable, parseBoolean, [false]);
    addStateHandler("BlendFunc", setBlendFunc, resetBlendFunc, parseEnum2, [defaultBlendFuncSrc, defaultBlendFuncDst]);
    addStateHandler("CullFaceEnable", setCullFaceEnable, resetCullFaceEnable, parseBoolean, [true]);
    addStateHandler("CullFace", setCullFace, resetCullFace, parseEnum, [defaultCullFace]);
    addStateHandler("FrontFace", setFrontFace, resetFrontFace, parseEnum, [defaultFrontFace]);
    addStateHandler("ColorMask", setColorMask, resetColorMask, parseColorMask, [true, true, true, true]);
    addStateHandler("StencilTestEnable", setStencilTestEnable, resetStencilTestEnable, parseBoolean, [false]);
    addStateHandler("StencilFunc", setStencilFunc, resetStencilFunc, parseEnum3, [defaultStencilFunc, 0, 0xffffffff]);
    addStateHandler("StencilOp", setStencilOp, resetStencilOp, parseEnum3, [defaultStencilOp, defaultStencilOp, defaultStencilOp]);
    addStateHandler("PolygonOffsetFillEnable", setPolygonOffsetFillEnable, resetPolygonOffsetFillEnable, parseBoolean, [false]);
    addStateHandler("PolygonOffset", setPolygonOffset, resetPolygonOffset, parseFloat2, [0, 0]);
    addStateHandler("LineWidth", setLineWidth, resetLineWidth, parseFloat, [1]);
    gd.stateHandlers = stateHandlers;

    gd.syncState();

    gd.videoRam = 0;
    gd.desktopWidth = window.screen.width;
    gd.desktopHeight = window.screen.height;

    if (Object.defineProperty)
    {
        Object.defineProperty(gd, "fullscreen", {
                get : function getFullscreenFn() {
                    return (document.fullscreenEnabled ||
                            document.mozFullScreen ||
                            document.webkitIsFullScreen ||
                            false);
                },
                set : function setFullscreenFn(newFullscreen) {
                    gd.requestFullScreen(newFullscreen);
                },
                enumerable : true,
                configurable : false
            });

        gd.checkFullScreen = function dummyCheckFullScreenFn()
        {
        };
    }
    else
    {
        gd.fullscreen = false;
        gd.oldFullscreen = false;
    }

    gd.clientStateMask = 0;
    gd.attributeMask = 0;
    gd.activeTechnique = null;
    gd.activeIndexBuffer = null;
    gd.bindedVertexBuffer = 0;
    gd.activeRenderTarget = null;

    gd.immediateVertexBuffer = gd.createVertexBuffer({
            numVertices: (256 * 1024 / 16),
            attributes: ['FLOAT4'],
            dynamic: true,
            'transient': true
        });
    gd.immediatePrimitive = -1;
    gd.immediateSemantics = [];

    gd.fps = 0;
    gd.numFrames = 0;
    gd.previousFrameTime = TurbulenzEngine.getTime();

    return gd;
};

// Copyright (c) 2011-2012 Turbulenz Limited

/*global window*/
/*global Touch: false*/
/*global TouchEvent: false*/
/*global TurbulenzEngine: false*/

//
// WebGLInputDevice
//
function WebGLInputDevice() {}
WebGLInputDevice.prototype = {

    version : 1,

    // Public API

    update : function inputDeviceUpdateFn()
    {
        if (!this.isWindowFocused)
        {
            return;
        }

        this.updateGamePad();
    },

    addEventListener : function addEventListenerFn(eventType, eventListener)
    {
        var i;
        var length;
        var eventHandlers;

        if (this.handlers.hasOwnProperty(eventType))
        {
            eventHandlers = this.handlers[eventType];

            if (eventListener)
            {
                // Check handler is not already stored
                length = eventHandlers.length;
                for (i = 0; i < length; i += 1)
                {
                    if (eventHandlers[i] === eventListener)
                    {
                        // Event handler has already been added
                        return;
                    }
                }

                eventHandlers.push(eventListener);
            }
        }
    },

    removeEventListener : function removeEventListenerFn(eventType, eventListener)
    {
        var i;
        var length;
        var eventHandlers;

        if (this.handlers.hasOwnProperty(eventType))
        {
            eventHandlers = this.handlers[eventType];

            if (eventListener)
            {
                length = eventHandlers.length;
                for (i = 0; i < length; i += 1)
                {
                    if (eventHandlers[i] === eventListener)
                    {
                        eventHandlers.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },

    lockMouse : function lockMouseFn()
    {
        if (this.isHovering &&
            this.isWindowFocused)
        {
            this.isMouseLocked = true;
            this.hideMouse();

            this.requestBrowserLock();

            this.setEventHandlersLock();

            return true;
        }
        else
        {
            return false;
        }
    },

    unlockMouse : function unlockMouseFn()
    {
        if (this.isMouseLocked)
        {
            this.isMouseLocked = false;
            this.showMouse();

            this.requestBrowserUnlock();

            this.setEventHandlersUnlock();

            if (this.isOutsideEngine)
            {
                this.isOutsideEngine = false;

                this.isHovering = false;

                this.setEventHandlersMouseLeave();

                // Send mouseout event
                this.sendEventToHandlers(this.handlers.mouseleave);
            }

            // Send mouselocklost event
            this.sendEventToHandlers(this.handlers.mouselocklost);

            return true;
        }
        else
        {
            return false;
        }
    },

    isLocked : function isLockedFn()
    {
        return this.isMouseLocked;
    },

    hideMouse : function hideMouseFn()
    {
        if (this.isHovering)
        {
            if (!this.isCursorHidden)
            {
                this.isCursorHidden = true;
                this.previousCursor = document.body.style.cursor;
                document.body.style.cursor = 'none';
            }

            return true;
        }
        else
        {
            return false;
        }
    },

    showMouse : function showMouseFn()
    {
        if (this.isCursorHidden &&
            !this.isMouseLocked)
        {
            this.isCursorHidden = false;
            document.body.style.cursor = this.previousCursor;
            return true;
        }
        else
        {
            return false;
        }
    },

    isHidden : function isHiddenFn()
    {
        return this.isCursorHidden;
    },

    isFocused : function isFocused()
    {
        return this.isWindowFocused;
    },

    // Cannot convert keycodes to unicode in javascript so return empty strings
    convertToUnicode : function convertToUnicodeFn(keyCodeArray)
    {
        var keyCodeToUnicode = this.keyCodeToUnicode;
        var result = {};
        var length = keyCodeArray.length;
        var i;
        var keyCode;

        for (i = 0; i < length; i += 1)
        {
            keyCode = keyCodeArray[i];
            result[keyCode] = keyCodeToUnicode[keyCode] || "";
        }

        return result;
    },

    // KeyCodes: List of key codes and their values

    keyCodes :
    {
        A : 0,
        B : 1,
        C : 2,
        D : 3,
        E : 4,
        F : 5,
        G : 6,
        H : 7,
        I : 8,
        J : 9,
        K : 10,
        L : 11,
        M : 12,
        N : 13,
        O : 14,
        P : 15,
        Q : 16,
        R : 17,
        S : 18,
        T : 19,
        U : 20,
        V : 21,
        W : 22,
        X : 23,
        Y : 24,
        Z : 25,
        NUMBER_0 : 100,
        NUMBER_1 : 101,
        NUMBER_2 : 102,
        NUMBER_3 : 103,
        NUMBER_4 : 104,
        NUMBER_5 : 105,
        NUMBER_6 : 106,
        NUMBER_7 : 107,
        NUMBER_8 : 108,
        NUMBER_9 : 109,
        LEFT : 200,
        RIGHT : 201,
        UP : 202,
        DOWN : 203,
        LEFT_SHIFT : 300,
        RIGHT_SHIFT : 301,
        LEFT_CONTROL : 302,
        RIGHT_CONTROL : 303,
        LEFT_ALT : 304,
        RIGHT_ALT : 305,
        ESCAPE : 400,
        TAB : 401,
        SPACE :    402,
        BACKSPACE : 403,
        RETURN : 404,
        GRAVE : 500,
        MINUS : 501,
        EQUALS : 502,
        LEFT_BRACKET : 503,
        RIGHT_BRACKET : 504,
        SEMI_COLON : 505,
        APOSTROPHE : 506,
        COMMA : 507,
        PERIOD : 508,
        SLASH: 509,
        BACKSLASH: 510,
        F1 : 600,
        F2 : 601,
        F3 : 602,
        F4 : 603,
        F5 : 604,
        F6 : 605,
        F7 : 606,
        F8 : 607,
        F9 : 608,
        F10 : 609,
        F11 : 610,
        F12 : 611,
        NUMPAD_0 : 612,
        NUMPAD_1 : 613,
        NUMPAD_2 : 614,
        NUMPAD_3 : 615,
        NUMPAD_4 : 616,
        NUMPAD_5 : 617,
        NUMPAD_6 : 618,
        NUMPAD_7 : 619,
        NUMPAD_8 : 620,
        NUMPAD_9 : 621,
        NUMPAD_ENTER : 622,
        NUMPAD_DIVIDE : 623,
        NUMPAD_MULTIPLY : 624,
        NUMPAD_ADD : 625,
        NUMPAD_SUBTRACT : 626,
        LEFT_WIN : 627,
        RIGHT_WIN : 628,
        LEFT_OPTION : 629,
        RIGHT_OPTION : 630,
        CAPS_LOCK : 631,
        INSERT : 632,
        DELETE : 633,
        HOME : 634,
        END : 635,
        PAGE_UP: 636,
        PAGE_DOWN: 637
    },

    mouseCodes :
    {
        BUTTON_0 : 0,
        BUTTON_1 : 1,
        BUTTON_2 : 2,
        DELTA_X : 100,
        DELTA_Y : 101,
        MOUSE_WHEEL : 102
    },

    padCodes :
    {
        UP : 0,
        LEFT : 1,
        DOWN : 2,
        RIGHT : 3,
        A : 4,
        B : 5,
        X : 6,
        Y : 7,
        LEFT_TRIGGER : 8,
        RIGHT_TRIGGER : 9,
        LEFT_SHOULDER : 10,
        RIGHT_SHOULDER : 11,
        LEFT_THUMB : 12,
        LEFT_THUMB_X : 13,
        LEFT_THUMB_Y : 14,
        RIGHT_THUMB : 15,
        RIGHT_THUMB_X : 16,
        RIGHT_THUMB_Y : 17,
        START : 18,
        BACK : 19
    },

    // Private API

    sendEventToHandlers :
    function sendEventToHandlersFn(eventHandlers, arg0, arg1, arg2, arg3,
                                   arg4, arg5)
    {
        var i;
        var length = eventHandlers.length;

        if (length)
        {
            for (i = 0; i < length; i += 1)
            {
                eventHandlers[i](arg0, arg1, arg2, arg3, arg4, arg5);
            }
        }
    },

    sendEventToHandlersASync :
    function sendEventToHandlersASyncFn(handlers, a0, a1, a2, a3, a4, a5)
    {
        var sendEvent = WebGLInputDevice.prototype.sendEventToHandlers;
        TurbulenzEngine.setTimeout(function callSendEventToHandlersFn() {
            sendEvent(handlers, a0, a1, a2, a3, a4, a5);
        }, 0);
    },

    updateGamePad : function updateGamePadFn()
    {
        var magnitude;
        var normalizedMagnitude;

        var gamepads = (navigator.gamepads ||
                        navigator.webkitGamepads ||
                        (navigator.webkitGetGamepads && navigator.webkitGetGamepads()));

        if (gamepads)
        {
            var deadZone = this.padAxisDeadZone;
            var maxAxisRange = this.maxAxisRange;
            var sendEvent = this.sendEventToHandlersASync;
            var handlers = this.handlers;
            var padButtons = this.padButtons;
            var padMap = this.padMap;
            var leftThumbX = 0;
            var leftThumbY = 0;
            var rightThumbX = 0;
            var rightThumbY = 0;

            var numGamePads = gamepads.length;
            for (var i = 0; i < numGamePads; i += 1)
            {
                var gamepad = gamepads[i];
                if (gamepad)
                {
                    // Update button states

                    var buttons = gamepad.buttons;

                    if (this.padTimestampUpdate < gamepad.timestamp)
                    {
                        this.padTimestampUpdate = gamepad.timestamp;

                        var numButtons = buttons.length;
                        for (var n = 0; n < numButtons; n += 1)
                        {
                            var value = buttons[n];
                            if (padButtons[n] !== value)
                            {
                                padButtons[n] = value;

                                var padCode = padMap[n];
                                if (padCode !== undefined)
                                {
                                    if (value)
                                    {
                                        sendEvent(handlers.paddown, padCode);
                                    }
                                    else
                                    {
                                        sendEvent(handlers.padup, padCode);
                                    }
                                }
                            }
                        }
                    }

                    // Update axes states

                    var axes = gamepad.axes;
                    if (axes.length <= 4)
                    {
                        // Axis 1 & 2
                        var lX = axes[0];
                        var lY = -axes[1];
                        magnitude = ((lX * lX) + (lY * lY));

                        if (magnitude > (deadZone * deadZone))
                        {
                            magnitude = Math.sqrt(magnitude);

                            // Normalize lX and lY
                            lX = (lX / magnitude);
                            lY = (lY / magnitude);

                            // Clip the magnitude at its max possible value
                            if (magnitude > maxAxisRange)
                            {
                                magnitude = maxAxisRange;
                            }

                            // Adjust magnitude relative to the end of the dead zone
                            magnitude -= deadZone;

                            // Normalize the magnitude
                            normalizedMagnitude = (magnitude / (maxAxisRange - deadZone));

                            leftThumbX = (lX * normalizedMagnitude);
                            leftThumbY = (lY * normalizedMagnitude);
                        }

                        // Axis 3 & 4
                        var rX = axes[2];
                        var rY = -axes[3];
                        magnitude = ((rX * rX) + (rY * rY));

                        if (magnitude > (deadZone * deadZone))
                        {
                            magnitude = Math.sqrt(magnitude);

                            // Normalize lX and lY
                            rX = (rX / magnitude);
                            rY = (rY / magnitude);

                            // Clip the magnitude at its max possible value
                            if (magnitude > maxAxisRange)
                            {
                                magnitude = maxAxisRange;
                            }

                            // Adjust magnitude relative to the end of the dead zone
                            magnitude -= deadZone;

                            // Normalize the magnitude
                            normalizedMagnitude = (magnitude / (maxAxisRange - deadZone));

                            rightThumbX = (rX * normalizedMagnitude);
                            rightThumbY = (rY * normalizedMagnitude);
                        }


                        sendEvent(handlers.padmove,
                                  leftThumbX, leftThumbY, buttons[6],
                                  rightThumbX, rightThumbY, buttons[7]);
                    }

                    // Our API only supports one active pad...
                    break;
                }
            }
        }
    },

    // Cannot detect locale in canvas mode
    getLocale : function getLocaleFn()
    {
        return "";
    },

    // Returns the local coordinates of the event (i.e. position in Canvas coords)
    getCanvasPosition : function getCanvasPositionFn(event, position)
    {
        if (event.offsetX !== undefined)
        {
            position.x = event.offsetX;
            position.y = event.offsetY;
        }
        else if (event.layerX !== undefined)
        {
            position.x = event.layerX;
            position.y = event.layerY;
        }
    },

    // Called when blurring
    resetKeyStates : function resetKeyStatesFn()
    {
        var keyName;
        var pressedKeys = this.pressedKeys;

        for (keyName in pressedKeys)
        {
            if (pressedKeys.hasOwnProperty(keyName))
            {
                pressedKeys[keyName] = false;
            }
        }
    },

    // Private mouse event methods

    onMouseOver : function onMouseOverFn(event)
    {
        var position = {};
        var mouseOverHandlers = this.handlers.mouseover;

        event.stopPropagation();
        event.preventDefault();

        this.getCanvasPosition(event, position);

        this.lastX = event.screenX;
        this.lastY = event.screenY;

        this.sendEventToHandlers(mouseOverHandlers, position.x, position.y);
    },

    onMouseMove : function onMouseMoveFn(event)
    {
        var mouseMoveHandlers = this.handlers.mousemove;

        var deltaX, deltaY;

        event.stopPropagation();
        event.preventDefault();

        if (this.ignoreNextMouseMoves)
        {
            this.ignoreNextMouseMoves -= 1;
            return;
        }

        if (event.movementX !== undefined)
        {
            deltaX = event.movementX;
            deltaY = event.movementY;
        }
        else if (event.mozMovementX !== undefined)
        {
            deltaX = event.mozMovementX;
            deltaY = event.mozMovementY;
        }
        else if (event.webkitMovementX !== undefined)
        {
            deltaX = event.webkitMovementX;
            deltaY = event.webkitMovementY;
        }
        else
        {
            deltaX = (event.screenX - this.lastX);
            deltaY = (event.screenY - this.lastY);
            if (0 === deltaX && 0 === deltaY)
            {
                return;
            }
        }

        this.lastX = event.screenX;
        this.lastY = event.screenY;

        this.sendEventToHandlers(mouseMoveHandlers, deltaX, deltaY);
    },

    onWheel : function onWheelFn(event)
    {
        var mouseWheelHandlers = this.handlers.mousewheel;

        var scrollDelta;

        event.stopPropagation();
        event.preventDefault();

        if (event.wheelDelta)
        {
            if (window.opera)
            {
                scrollDelta = event.wheelDelta < 0 ? 1 : -1;
            }
            else
            {
                scrollDelta = event.wheelDelta > 0 ? 1 : -1;
            }
        }
        else
        {
            scrollDelta = event.detail < 0 ? 1 : -1;
        }

        this.sendEventToHandlers(mouseWheelHandlers, scrollDelta);
    },

    emptyEvent : function emptyEventFn(event)
    {
        event.stopPropagation();
        event.preventDefault();
    },

    onWindowFocus : function onWindowFocusFn()
    {
        if (this.isHovering &&
            window.document.activeElement === this.canvas)
        {
            this.addInternalEventListener(window, 'mousedown', this.onMouseDown);
        }
    },

    onFocus : function onFocusFn()
    {
        var canvas = this.canvas;
        var handlers = this.handlers;
        var focusHandlers = handlers.focus;

        if (!this.isWindowFocused)
        {
            this.isWindowFocused = true;

            window.focus();
            canvas.focus();

            this.setEventHandlersFocus();

            canvas.oncontextmenu = function () {
                return false;
            };

            this.sendEventToHandlers(focusHandlers);
        }
    },

    onBlur : function onBlurFn()
    {
        var canvas = this.canvas;
        var handlers = this.handlers;
        var blurHandlers = handlers.blur;

        if (this.isMouseLocked)
        {
            this.unlockMouse();
        }

        if (this.isWindowFocused)
        {
            this.isWindowFocused = false;

            this.resetKeyStates();
            this.setEventHandlersBlur();
            canvas.oncontextmenu = null;

            this.sendEventToHandlers(blurHandlers);
        }
    },

    onMouseDown : function onMouseDownFn(event)
    {
        var handlers = this.handlers;

        if (this.isHovering)
        {
            var mouseDownHandlers = handlers.mousedown;
            var button = event.button;
            var position = {};

            this.onFocus();

            event.stopPropagation();
            event.preventDefault();

            if (button < 3)
            {
                button = this.mouseMap[button];
            }

            this.getCanvasPosition(event, position);

            this.sendEventToHandlers(mouseDownHandlers, button, position.x, position.y);
        }
        else
        {
            this.onBlur();
        }
    },

    onMouseUp : function onMouseUpFn(event)
    {
        var mouseUpHandlers = this.handlers.mouseup;

        if (this.isHovering)
        {
            var button = event.button;
            var position = {};

            event.stopPropagation();
            event.preventDefault();

            if (button < 3)
            {
                button = this.mouseMap[button];
            }

            this.getCanvasPosition(event, position);

            this.sendEventToHandlers(mouseUpHandlers, button, position.x, position.y);
        }
    },

    // Private key event methods

    onKeyDown : function onKeyDownFn(event)
    {
        var keyDownHandlers = this.handlers.keydown;
        var pressedKeys = this.pressedKeys;
        var keyCodes = this.keyCodes;

        event.stopPropagation();
        event.preventDefault();

        var keyCode = event.keyCode;
        keyCode = this.keyMap[keyCode];

        var keyLocation = event.keyLocation || event.location;

        if (undefined !== keyCode &&
           (keyCodes.ESCAPE !== keyCode))
        {
            // Handle left / right key locations
            //   DOM_KEY_LOCATION_STANDARD = 0x00;
            //   DOM_KEY_LOCATION_LEFT     = 0x01;
            //   DOM_KEY_LOCATION_RIGHT    = 0x02;
            //   DOM_KEY_LOCATION_NUMPAD   = 0x03;
            //   DOM_KEY_LOCATION_MOBILE   = 0x04;
            //   DOM_KEY_LOCATION_JOYSTICK = 0x05;

            if (2 === keyLocation)
            {
                // The Turbulenz KeyCodes are such that CTRL, SHIFT
                // and ALT have their RIGHT versions exactly one above
                // the LEFT versions.
                keyCode = keyCode + 1;
            }
            if (!pressedKeys[keyCode])
            {
                pressedKeys[keyCode] = true;
                this.sendEventToHandlers(keyDownHandlers, keyCode);
            }
        }
    },

    onKeyUp : function onKeyUpFn(event)
    {
        var keyUpHandlers = this.handlers.keyup;
        var pressedKeys = this.pressedKeys;
        var keyCodes = this.keyCodes;

        event.stopPropagation();
        event.preventDefault();

        var keyCode = event.keyCode;
        keyCode = this.keyMap[keyCode];

        var keyLocation = event.keyLocation || event.location;

        if (keyCode === keyCodes.ESCAPE)
        {
            this.unlockMouse();
        }
        else if (undefined !== keyCode)
        {
            // Handle LEFT / RIGHT.  (See OnKeyDown)

            if (2 === keyLocation)
            {
                keyCode = keyCode + 1;
            }
            if (pressedKeys[keyCode])
            {
                pressedKeys[keyCode] = false;
                this.sendEventToHandlers(keyUpHandlers, keyCode);
            }
        }
    },

    // Private touch event methods

    onTouchStart : function onTouchStartFn(event)
    {
        var eventHandlers = this.handlers.touchstart;

        event.preventDefault();

        // Store new touches
        this.addTouches(event.changedTouches);

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        this.sendEventToHandlers(eventHandlers, event);
    },

    onTouchEnd : function onTouchEndFn(event)
    {
        var eventHandlers = this.handlers.touchend;

        event.preventDefault();

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        // Remove ended touches
        this.removeTouches(event.changedTouches);

        this.sendEventToHandlers(eventHandlers, event);
    },

    onTouchMove : function onTouchMoveFn(event)
    {
        var eventHandlers = this.handlers.touchmove;

        event.preventDefault();

        this.addTouches(event.changedTouches);

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        this.sendEventToHandlers(eventHandlers, event);
    },

    onTouchEnter : function onTouchEnterFn(event)
    {
        var eventHandlers = this.handlers.touchenter;

        event.preventDefault();

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        this.sendEventToHandlers(eventHandlers, event);
    },

    onTouchLeave : function onTouchLeaveFn(event)
    {
        var eventHandlers = this.handlers.touchleave;

        event.preventDefault();

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        this.sendEventToHandlers(eventHandlers, event);
    },

    onTouchCancel : function onTouchCancelFn(event)
    {
        var eventHandlers = this.handlers.touchcancel;

        event.preventDefault();

        event = this.convertW3TouchEventToTurbulenzTouchEvent(event);

        // Remove canceled touches
        this.removeTouches(event.changedTouches);

        this.sendEventToHandlers(eventHandlers, event);
    },

    convertW3TouchEventToTurbulenzTouchEvent : function convertW3TouchEventToTurbulenzTouchEventFn(w3TouchEvent)
    {
        // Initialize changedTouches
        var changedTouches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.changedTouches);

        // Initialize gameTouches
        var gameTouches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.targetTouches);

        // Initialize touches
        var touches = this.convertW3TouchListToTurbulenzTouchList(w3TouchEvent.touches);

        var touchEventParams =
        {
            changedTouches  : changedTouches,
            gameTouches     : gameTouches,
            touches         : touches
        };

        return TouchEvent.create(touchEventParams);
    },

    convertW3TouchListToTurbulenzTouchList : function convertW3TouchListToTurbulenzTouchListFn(w3TouchList)
    {
        // Set changedTouches
        var w3TouchListLength = w3TouchList.length;
        var touchList = [];

        var touch;
        var touchIndex;

        touchList.length = w3TouchListLength;

        for (touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1)
        {
            touch = this.getTouchById(w3TouchList[touchIndex].identifier);
            touchList[touchIndex] = touch;
        }

        return touchList;
    },

    convertW3TouchToTurbulenzTouch : function convertW3TouchToTurbulenzTouchFn(w3Touch)
    {
        var canvasElement   = this.canvas;
        var canvasRect      = canvasElement.getBoundingClientRect();

        var touchParams =
        {
            force           : (w3Touch.force || w3Touch.webkitForce || 0),
            identifier      : w3Touch.identifier,
            isGameTouch     : (w3Touch.target === canvasElement),
            positionX       : (w3Touch.pageX - canvasRect.left),
            positionY       : (w3Touch.pageY - canvasRect.top),
            radiusX         : (w3Touch.radiusX || w3Touch.webkitRadiusX || 1),
            radiusY         : (w3Touch.radiusY || w3Touch.webkitRadiusY || 1),
            rotationAngle   : (w3Touch.rotationAngle || w3Touch.webkitRotationAngle || 0)
        };

        return Touch.create(touchParams);
    },

    addTouches : function addTouchesFn(w3TouchList)
    {
        var w3TouchListLength = w3TouchList.length;

        var touchIndex;
        var touch;

        for (touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1)
        {
            touch = this.convertW3TouchToTurbulenzTouch(w3TouchList[touchIndex]);
            this.addTouch(touch);
        }
    },

    removeTouches : function removeTouchesFn(w3TouchList)
    {
        var w3TouchListLength = w3TouchList.length;

        var touchIndex;
        var touchId;

        for (touchIndex = 0; touchIndex < w3TouchListLength; touchIndex += 1)
        {
            touchId = w3TouchList[touchIndex].identifier;
            this.removeTouchById(touchId);
        }
    },

    addTouch : function addTouchFn(touch)
    {
        this.touches[touch.identifier] = touch;
    },

    getTouchById : function getTouchByIdFn(id)
    {
        return this.touches[id];
    },

    removeTouchById : function removeTouchByIdFn(id)
    {
        delete this.touches[id];
    },

    // Canvas event handlers

    canvasOnMouseOver : function canvasOnMouseOverFn(event)
    {
        var mouseEnterHandlers = this.handlers.mouseenter;

        if (!this.isMouseLocked)
        {
            this.isHovering = true;

            this.lastX = event.screenX;
            this.lastY = event.screenY;

            this.setEventHandlersMouseEnter();

            // Send mouseover event
            this.sendEventToHandlers(mouseEnterHandlers);
        }
        else
        {
            this.isOutsideEngine = false;
        }
    },

    canvasOnMouseOut : function canvasOnMouseOutFn(event)
    {
        var mouseLeaveHandlers = this.handlers.mouseleave;

        if (!this.isMouseLocked)
        {
            this.isHovering = false;

            if (this.isCursorHidden)
            {
                this.showMouse();
            }

            this.setEventHandlersMouseLeave();

            // Send mouseout event
            this.sendEventToHandlers(mouseLeaveHandlers);
        }
        else
        {
            this.isOutsideEngine = true;
        }
    },

    // This is required in order to detect hovering when we missed the initial mouseover event
    canvasOnMouseDown : function canvasOnMouseDownFn(event)
    {
        var mouseEnterHandlers = this.handlers.mouseenter;

        this.canvas.onmousedown = null;

        if (!this.isHovering)
        {
            this.isHovering = true;

            this.lastX = event.screenX;
            this.lastY = event.screenY;

            this.setEventHandlersMouseEnter();

            this.sendEventToHandlers(mouseEnterHandlers);

            this.onMouseDown(event);
        }

        return false;
    },

    // Window event handlers

    onFullscreenChanged : function onFullscreenChangedFn(event)
    {
        if (this.isMouseLocked)
        {
            if (document.fullscreenEnabled || document.mozFullScreen || document.webkitIsFullScreen)
            {
                this.ignoreNextMouseMoves = 2; // Some browsers will send 2 mouse events with a massive delta
                this.requestBrowserLock();
            }
            else
            {
                // Browsers capture the escape key whilst in fullscreen
                this.unlockMouse();
            }
        }
    },

    // Set event handler methods

    setEventHandlersMouseEnter : function setEventHandlersMouseEnterFn()
    {
        // Add event listener to get focus event
        if (!this.isFocused())
        {
            this.addInternalEventListener(window, 'mousedown', this.onMouseDown);
        }

        this.addInternalEventListener(window, 'mouseup', this.onMouseUp);
        this.addInternalEventListener(window, 'mousemove', this.onMouseOver);
        this.addInternalEventListener(window, 'DOMMouseScroll', this.onWheel);
        this.addInternalEventListener(window, 'mousewheel', this.onWheel);
        this.addInternalEventListener(window, 'click', this.emptyEvent);
    },

    setEventHandlersMouseLeave : function setEventHandlersMouseLeaveFn()
    {
        // We do not need a mousedown listener if not focused
        if (!this.isFocused())
        {
            this.removeInternalEventListener(window, 'mousedown', this.onMouseDown);
        }

        // Remove mouse event listeners
        this.removeInternalEventListener(window, 'mouseup', this.onMouseUp);
        this.removeInternalEventListener(window, 'mousemove', this.onMouseOver);
        this.removeInternalEventListener(window, 'DOMMouseScroll', this.onWheel);
        this.removeInternalEventListener(window, 'mousewheel', this.onWheel);
        this.removeInternalEventListener(window, 'click', this.emptyEvent);
    },

    setEventHandlersFocus : function setEventHandlersFocusFn()
    {
        this.addInternalEventListener(window, 'keydown', this.onKeyDown);
        this.addInternalEventListener(window, 'keyup', this.onKeyUp);
    },

    setEventHandlersBlur : function setEventHandlersBlurFn()
    {
        this.removeInternalEventListener(window, 'keydown', this.onKeyDown);
        this.removeInternalEventListener(window, 'keyup', this.onKeyUp);
        this.removeInternalEventListener(window, 'mousedown', this.onMouseDown);
    },

    setEventHandlersLock : function setEventHandlersLockFn()
    {
        this.removeInternalEventListener(window, 'mousemove', this.onMouseOver);

        this.addInternalEventListener(window, 'mousemove', this.onMouseMove);
        this.addInternalEventListener(window, 'fullscreenchange', this.onFullscreenChanged);
        this.addInternalEventListener(window, 'mozfullscreenchange', this.onFullscreenChanged);
        this.addInternalEventListener(window, 'webkitfullscreenchange', this.onFullscreenChanged);
    },

    setEventHandlersUnlock : function setEventHandlersUnlockFn()
    {
        this.removeInternalEventListener(window, 'webkitfullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'mozfullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'fullscreenchange', this.onFullscreenChanged);
        this.removeInternalEventListener(window, 'mousemove', this.onMouseMove);

        this.addInternalEventListener(window, 'mousemove', this.onMouseOver);
    },

    setEventHandlersCanvas : function setEventHandlersCanvasFn()
    {
        var canvas = this.canvas;

        this.addInternalEventListener(canvas, 'mouseover', this.canvasOnMouseOver);
        this.addInternalEventListener(canvas, 'mouseout', this.canvasOnMouseOut);
        this.addInternalEventListener(canvas, 'mousedown', this.canvasOnMouseDown);
    },

    setEventHandlersWindow : function setEventHandlersWindowFn()
    {
        this.addInternalEventListener(window, 'blur', this.onBlur);
        this.addInternalEventListener(window, 'focus', this.onWindowFocus);
    },

    removeEventHandlersWindow : function removeEventHandlersWindowFn()
    {
        this.removeInternalEventListener(window, 'blur', this.onBlur);
        this.removeInternalEventListener(window, 'focus', this.onWindowFocus);
    },

    setEventHandlersTouch : function setEventHandlersTouchFn()
    {
        var canvas = this.canvas;

        this.addInternalEventListener(canvas, 'touchstart', this.onTouchStart);
        this.addInternalEventListener(canvas, 'touchend', this.onTouchEnd);
        this.addInternalEventListener(canvas, 'touchenter', this.onTouchEnter);
        this.addInternalEventListener(canvas, 'touchleave', this.onTouchLeave);
        this.addInternalEventListener(canvas, 'touchmove', this.onTouchMove);
        this.addInternalEventListener(canvas, 'touchcancel', this.onTouchCancel);
    },

    // Helper methods

    addInternalEventListener : function addInternalEventListenerFn(element, eventName, eventHandler)
    {
        var elementEventFlag = this.elementEventFlags[element];
        if (!elementEventFlag)
        {
            this.elementEventFlags[element] = elementEventFlag = {};
        }

        if (!elementEventFlag[eventName])
        {
            elementEventFlag[eventName] = true;

            var boundEventHandler = this.boundFunctions[eventHandler];
            if (!boundEventHandler)
            {
                this.boundFunctions[eventHandler] = boundEventHandler = eventHandler.bind(this);
            }

            element.addEventListener(eventName, boundEventHandler, false);
        }
    },

    removeInternalEventListener : function removeInternalEventListenerFn(element, eventName, eventHandler)
    {
        var elementEventFlag = this.elementEventFlags[element];
        if (elementEventFlag)
        {
            if (elementEventFlag[eventName])
            {
                elementEventFlag[eventName] = false;

                var boundEventHandler = this.boundFunctions[eventHandler];

                element.removeEventListener(eventName, boundEventHandler, false);
            }
        }
    },

    destroy : function destroyFn()
    {
        // Remove all event listeners
        if (this.isLocked())
        {
            this.setEventHandlersUnlock();
        }

        if (this.isHovering)
        {
            this.setEventHandlersMouseLeave();
        }

        if (this.isWindowFocused)
        {
            this.setEventHandlersBlur();
        }

        this.removeEventHandlersWindow();

        var canvas = this.canvas;
        canvas.onmouseover = null;
        canvas.onmouseout = null;
        canvas.onmousedown = null;
    }
};

// Constructor function
WebGLInputDevice.create = function webGLInputDeviceFn(canvas, params)
{
    var id = new WebGLInputDevice();

    id.lastX = 0;
    id.lastY = 0;

    id.touches = {};

    id.boundFunctions = {};
    id.elementEventFlags = {};

    id.canvas = canvas;
    id.isMouseLocked = false;
    id.isHovering = false;
    id.isWindowFocused = false;
    id.isCursorHidden = false;
    id.isOutsideEngine = false; // Used for determining where we are when unlocking
    id.previousCursor = '';
    id.ignoreNextMouseMoves = 0;

    // Used to screen out auto-repeats, dictionary from keycode to bool,
    // true for each key currently pressed down
    id.pressedKeys = {};

    // Game event handlers
    id.handlers =
    {
        keydown : [],
        keyup : [],

        mousedown : [],
        mouseup : [],
        mousewheel : [],
        mouseover : [],
        mousemove : [],

        paddown : [],
        padup : [],
        padmove : [],

        mouseenter : [],
        mouseleave : [],
        focus : [],
        blur : [],
        mouselocklost : [],

        touchstart : [],
        touchend : [],
        touchenter : [],
        touchleave : [],
        touchmove : [],
        touchcancel : []
    };

    // Populate the keyCodeToUnicodeTable.  Just use the 'key' part of
    // the keycodes, overriding some special cases.

    var keyCodeToUnicodeTable = {};
    var keyCodes = id.keyCodes;
    for (var k in keyCodes)
    {
        if (keyCodes.hasOwnProperty(k))
        {
            var code = keyCodes[k];
            keyCodeToUnicodeTable[code] = k;
        }
    }
    keyCodeToUnicodeTable[keyCodes.SPACE] = ' ';
    keyCodeToUnicodeTable[keyCodes.NUMBER_0] = '0';
    keyCodeToUnicodeTable[keyCodes.NUMBER_1] = '1';
    keyCodeToUnicodeTable[keyCodes.NUMBER_2] = '2';
    keyCodeToUnicodeTable[keyCodes.NUMBER_3] = '3';
    keyCodeToUnicodeTable[keyCodes.NUMBER_4] = '4';
    keyCodeToUnicodeTable[keyCodes.NUMBER_5] = '5';
    keyCodeToUnicodeTable[keyCodes.NUMBER_6] = '6';
    keyCodeToUnicodeTable[keyCodes.NUMBER_7] = '7';
    keyCodeToUnicodeTable[keyCodes.NUMBER_8] = '8';
    keyCodeToUnicodeTable[keyCodes.NUMBER_9] = '9';
    keyCodeToUnicodeTable[keyCodes.GRAVE] = '`';
    keyCodeToUnicodeTable[keyCodes.MINUS] = '-';
    keyCodeToUnicodeTable[keyCodes.EQUALS] = '=';
    keyCodeToUnicodeTable[keyCodes.LEFT_BRACKET] = '[';
    keyCodeToUnicodeTable[keyCodes.RIGHT_BRACKET] = ']';
    keyCodeToUnicodeTable[keyCodes.SEMI_COLON] = ';';
    keyCodeToUnicodeTable[keyCodes.APOSTROPHE] = "'";
    keyCodeToUnicodeTable[keyCodes.COMMA] = ',';
    keyCodeToUnicodeTable[keyCodes.PERIOD] = '.';
    keyCodeToUnicodeTable[keyCodes.SLASH] = '/';
    keyCodeToUnicodeTable[keyCodes.BACKSLASH] = '\\';

    // KeyMap: Maps JavaScript keycodes to Turbulenz keycodes - some
    // keycodes are consistent across all browsers and some mappings
    // are browser specific.
    var keyMap = {};

    // A-Z
    keyMap[65] = 0; // A
    keyMap[66] = 1; // B
    keyMap[67] = 2; // C
    keyMap[68] = 3; // D
    keyMap[69] = 4; // E
    keyMap[70] = 5; // F
    keyMap[71] = 6; // G
    keyMap[72] = 7; // H
    keyMap[73] = 8; // I
    keyMap[74] = 9; // J
    keyMap[75] = 10; // K
    keyMap[76] = 11; // L
    keyMap[77] = 12; // M
    keyMap[78] = 13; // N
    keyMap[79] = 14; // O
    keyMap[80] = 15; // P
    keyMap[81] = 16; // Q
    keyMap[82] = 17; // R
    keyMap[83] = 18; // S
    keyMap[84] = 19; // T
    keyMap[85] = 20; // U
    keyMap[86] = 21; // V
    keyMap[87] = 22; // X
    keyMap[88] = 23; // W
    keyMap[89] = 24; // Y
    keyMap[90] = 25; // Z

    // 0-9
    keyMap[48] = 100; // 0
    keyMap[49] = 101; // 1
    keyMap[50] = 102; // 2
    keyMap[51] = 103; // 3
    keyMap[52] = 104; // 4
    keyMap[53] = 105; // 5
    keyMap[54] = 106; // 6
    keyMap[55] = 107; // 7
    keyMap[56] = 108; // 8
    keyMap[57] = 109; // 9

    // Arrow keys
    keyMap[37] = 200; // LEFT
    keyMap[39] = 201; // RIGHT
    keyMap[38] = 202; // UP
    keyMap[40] = 203; // DOWN

    // Modifier keys
    keyMap[16] = 300; // LEFT_SHIFT
    //keyMap[16] = 301; // RIGHT_SHIFT
    keyMap[17] = 302; // LEFT_CONTROL
    //keyMap[17] = 303; // RIGHT_CONTROL
    keyMap[18] = 304; // LEFT_ALT
    keyMap[0] = 305; // RIGHT_ALT

    // Special keys
    keyMap[27] = 400; // ESCAPE
    keyMap[9] = 401; // TAB
    keyMap[32] = 402; // SPACE
    keyMap[8] = 403; // BACKSPACE
    keyMap[13] = 404; // RETURN

    // Punctuation keys
    keyMap[223] = 500; // GRAVE
    keyMap[109] = 501; // MINUS (mozilla - gecko)
    keyMap[189] = 501; // MINUS (ie + webkit)
    keyMap[107] = 502; // EQUALS (mozilla - gecko)
    keyMap[187] = 502; // EQUALS (ie + webkit)
    keyMap[219] = 503; // LEFT_BRACKET
    keyMap[221] = 504; // RIGHT_BRACKET
    keyMap[59] = 505; // SEMI_COLON (mozilla - gecko)
    keyMap[186] = 505; // SEMI_COLON (ie + webkit)
    keyMap[192] = 506; // APOSTROPHE
    keyMap[188] = 507; // COMMA
    keyMap[190] = 508; // PERIOD

    // if Mac OS then overwrite apostrophe and grave key-mappings
    if (navigator.appVersion.indexOf("Mac") !== -1)
    {
        keyMap[192] = 500; // GRAVE (mac webkit)
        keyMap[0] = 500; // GRAVE (mac gecko + safari 5.1)
        keyMap[222] = 506; // APOSTROPHE (mac webkit)
    }

    // Non-standard keys
    keyMap[112] = 600; // F1
    keyMap[113] = 601; // F2
    keyMap[114] = 602; // F3
    keyMap[115] = 603; // F4
    keyMap[116] = 604; // F5
    keyMap[117] = 605; // F6
    keyMap[118] = 606; // F7
    keyMap[119] = 607; // F8
    keyMap[120] = 608; // F9
    keyMap[121] = 609; // F10
    keyMap[122] = 610; // F11
    keyMap[123] = 611; // F12
    //keyMap[45 : 612, // NUMPAD_0 (numlock on/off)
    keyMap[96] = 612; // NUMPAD_0 (numlock on/off)
    //keyMap[35] = 613;, // NUMPAD_1 (numlock on/off)
    keyMap[97] = 613; // NUMPAD_1 (numlock on/off)
    //keyMap[40] = 614; // NUMPAD_2 (numlock on/off)
    keyMap[98] = 614; // NUMPAD_2 (numlock on/off)
    //keyMap[34] = 615; // NUMPAD_3 (numlock on/off)
    keyMap[99] = 615; // NUMPAD_3 (numlock on/off)
    //keyMap[37] = 616;, // NUMPAD_4 (numlock on/off)
    keyMap[100] = 616; // NUMPAD_4 (numlock on/off)
    keyMap[12] = 617; // NUMPAD_5 (numlock on/off)
    keyMap[101] = 617; // NUMPAD_5 (numlock on/off)
    keyMap[144] = 617; // NUMPAD_5 (numlock on/off)
    //keyMap[39] = 618; // NUMPAD_6 (numlock on/off)
    keyMap[102] = 618; // NUMPAD_6 (numlock on/off)
    //keyMap[36] = 619; // NUMPAD_7 (numlock on/off)
    keyMap[103] = 619; // NUMPAD_7 (numlock on/off)
    //keyMap[38] = 620; // NUMPAD_8 (numlock on/off)
    keyMap[104] = 620; // NUMPAD_8 (numlock on/off)
    //keyMap[33] = 621; // NUMPAD_9 (numlock on/off)
    keyMap[105] = 621; // NUMPAD_9 (numlock on/off)
    //keyMap[13] = 622; // NUMPAD_ENTER (numlock on/off)
    keyMap[111] = 623; // NUMPAD_DIVIDE (numlock on/off)
    keyMap[191] = 623; // NUMPAD_DIVIDE (numlock on/off), mac chrome
    keyMap[106] = 624; // NUMPAD_MULTIPLY (numlock on/off)
    //keyMap[107] = 625; // NUMPAD_ADD (numlock on/off)
    //keyMap[109] = 626; // NUMPAD_SUBTRACT (numlock on/off)
    keyMap[91] = 627; // LEFT_WIN
    keyMap[224] = 627; // LEFT_WIN (mac, firefox)
    keyMap[92] = 628; // RIGHT_WIN
    keyMap[93] = 628; // RIGHT_WIN (mac, chrome)
    //: 629, // LEFT_OPTION
    //: 630, // RIGHT_OPTION
    keyMap[20] = 631; // CAPS_LOCK
    keyMap[45] = 632; // INSERT
    keyMap[46] = 633; // DELETE
    keyMap[36] = 634; // HOME
    keyMap[35] = 635; // END
    keyMap[33] = 636; // PAGE_UP
    keyMap[34] = 637; // PAGE_DOWN

    id.keyMap = keyMap;

    // MouseMap: Maps current mouse controls to new controls
    var mouseMap =
    {
        0 : 0,
        1 : 2,
        2 : 1
    };

    id.mouseMap = mouseMap;

    // padMap: Maps current pad buttons to new buttons
    var padMap =
    {
        0 : 4, // A
        1 : 5, // B
        2 : 6, // X
        3 : 7, // Y

        4 : 10, // LEFT_SHOULDER
        5 : 11, // RIGHT_SHOULDER

        8 : 19, // BACK
        9 : 18, // START

        10 : 12, // LEFT_THUMB
        11 : 15, // RIGHT_THUMB

        12 : 0, // UP
        13 : 2, // DOWN
        14 : 1, // LEFT
        15 : 3  // RIGHT
    };

    id.padMap = padMap;

    id.keyCodeToUnicode = keyCodeToUnicodeTable;

    id.padButtons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    id.padMap = padMap;
    id.padAxisDeadZone = 0.26;
    id.maxAxisRange = 1.0;
    id.padTimestampUpdate = 0;

    // Pointer locking
    var requestPointerLock = (canvas.requestPointerLock    ||
                              canvas.mozRequestPointerLock ||
                              canvas.webkitRequestPointerLock);
    if (requestPointerLock)
    {
        var exitPointerLock = (document.exitPointerLock    ||
                               document.mozExitPointerLock ||
                               document.webkitExitPointerLock);

        id.requestBrowserLock = function requestBrowserLockFn()
        {
            var pointerLockElement = (document.pointerLockElement    ||
                                      document.mozPointerLockElement ||
                                      document.webkitPointerLockElement);
            if (pointerLockElement !== canvas)
            {
                requestPointerLock.call(canvas);
            }
        };

        id.requestBrowserUnlock = function requestBrowserUnlockFn()
        {
            var pointerLockElement = (document.pointerLockElement    ||
                                      document.mozPointerLockElement ||
                                      document.webkitPointerLockElement);
            if (pointerLockElement === canvas)
            {
                exitPointerLock.call(document);
            }
        };
    }
    else
    {
        var pointer = (navigator.pointer || navigator.webkitPointer);
        if (pointer)
        {
            id.requestBrowserLock = function requestBrowserLockFn()
            {
                if (!pointer.isLocked)
                {
                    pointer.lock(canvas);
                }
            };

            id.requestBrowserUnlock = function requestBrowserUnlockFn()
            {
                if (pointer.isLocked)
                {
                    pointer.unlock();
                }
            };
        }
        else
        {
            id.requestBrowserLock = function requestBrowserLockFn() {};
            id.requestBrowserUnlock = function requestBrowserUnlockFn() {};
        }
    }

    // Add canvas mouse event listeners
    id.setEventHandlersCanvas();

    // Add window blur event listener
    id.setEventHandlersWindow();

    // Add canvas touch event listeners
    id.setEventHandlersTouch();

    return id;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global window*/


//
// WebGLNetworkDevice
//
function WebGLNetworkDevice() {}
WebGLNetworkDevice.prototype = {

    version : 1,

    WebSocketConstructor : (window.WebSocket ? window.WebSocket : window.MozWebSocket),

    createWebSocket : function createWebSocketdFn(url, protocol)
    {
        var WebSocketConstructor = this.WebSocketConstructor;
        if (WebSocketConstructor)
        {
            var ws;
            if (protocol)
            {
                ws = new WebSocketConstructor(url, protocol);
            }
            else
            {
                ws = new WebSocketConstructor(url);
            }
            if (typeof ws.destroy === "undefined")
            {
                ws.destroy = function websocketDestroyFn()
                {
                    this.onopen = null;
                    this.onerror = null;
                    this.onclose = null;
                    this.onmessage = null;
                    this.close();
                };
            }
            return ws;
        }
        else
        {
            return null;
        }
    },

    update : function networkDeviceUpdateFn()
    {
    }
};

WebGLNetworkDevice.create = function networkDeviceCreateFn(params)
{
    var nd = new WebGLNetworkDevice();
    return nd;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global Float32Array: false*/
/*global Uint16Array: false*/
/*global Uint32Array: false*/
/*global window: false*/
/*global VMath: false*/
/*global AABBTree: false*/
/*global TurbulenzEngine: false*/


//
// WebGLPhysicsConfig
//
var WebGLPhysicsConfig = {
    // (Contact physics)
    // Amount of slop permitted in contact penetration
    // And percentage of positional error to resolve
    // per simulation step.
    CONTACT_SLOP : 0.015,
    CONTACT_BAUMGRAUTE : 0.35,
    CONTACT_STATIC_BAUMGRAUTE : 0.65, // different coeffecient for static-dynamic case.
    //
    // (Contact persistance)
    // Amount of seperation permitted before contact cache is destroyed
    CONTACT_MAX_Y_SEPERATION : 0.05,
    // Amount of squared tangential seperation permitted before contact cache is destroyed
    CONTACT_MAX_SQ_XZ_SEPERATION : 2 * (0.245 * 0.245),
    // Amount of seperation permitted for a new contact to inherit existing cache's impulse cache
    CONTACT_INHERIT_SQ_SEPERATION : 3 * (0.75 * 0.75), //always inherit closest
    // Amount of seperation to assume another contacts place instead of just inheriting
    CONTACT_EQUAL_SQ_SEPERATION : 3 * (0.001 * 0.001),
    //
    // (Collision detection)
    // seperation distance to assume objects are infact intersecting.
    GJK_EPA_DISTANCE_THRESHOLD : 1e-4,
    // fractional change in computed distance at which we may terminate GJK algorithm.
    GJK_FRACTIONAL_THRESHOLD : 1e-4,
    //
    // Threshold for the square of the ratio of velocity to radius of an object to be considered
    // moving fast enough to be collided continuously against static/sleeping objects.
    // this is multiplied with time step.
    CONTINUOUS_LINEAR_SQ : 0.35,
    // Threshold for square of angular velocity to be considered moving fast enough to be collided
    // continuously against static/sleeping objects.
    // this is multiplied with time step.
    CONTINUOUS_ANGULAR_SQ : 0.25,
    // Threshold for ratio of squared linear speed to radius for object to be considered moving fast enough
    // to be collided continuously against other dynamic objects.
    // This is a 'per-step' ratio.
    CONTINUOUS_LINEAR_BULLET : 0.75,
    // Threshold for squared angular speed to be considered for continuous collisions against other dynamics.
    // This is a 'per-step' value.
    CONTINUOUS_ANGULAR_BULLET : 0.5,
    // Amount of extra slop permitted in continuous collisions.
    // This is added ontop of the usual contact slop.
    CONTINUOUS_SLOP : 0.015,
    //
    // (Sleeping)
    // Threshold for the square of the ratio of velocity to radius of an object to
    // be considered at rest. Eg: if threshold is 1, then in a given second should the object
    // move less than 1x its radius, it will be considered at rest.
    SLEEP_LINEAR_SQ : 0.01,
    // squared angular velocity to be considered 'at rest'.
    // There is no scaling, as we base this on tangentenial velocity of body at radius which means
    // that when computing the ratio w.r.t to radius we end up simply with angular velocity.
    SLEEP_ANGULAR_SQ : 0.1,
    // number of world updates body must be 'at rest' to be allowed to sleep.
    SLEEP_DELAY : 60,
    //
    // (Misc)
    MAX_ANGULAR : Math.PI, //maximum angular velocity per time-step before clamping in integration occurs.
    //
    // (General)
    QUADRATIC_THRESHOLD : 1e-8,
    DONT_NORMALIZE_THRESHOLD : 1e-8,
    COLLINEAR_THRESHOLD : 1e-10,
    COPLANAR_THRESHOLD : 1e-16
};

function webGLPhysicsClone(dst, src)
{
    for (var p in src)
    {
        if (src.hasOwnProperty(p))
        {
            var v = src[p];
            if (v === null || v === undefined)
            {
                continue;
            }

            if (typeof v === "object" &&
                p !== "shape" &&
                p !== "userData" &&
                p !== "world" &&
                p !== "object" &&
                p !== "arbiters" &&
                p !== "islandRoot" &&
                p !== "island" &&
                p !== "bodyA" &&
                p !== "bodyB" &&
                p !== "triangleArray")
            {
                if ("slice" in v)
                {
                    v = v.slice();
                }
                else
                {
                    v = webGLPhysicsClone({}, v);
                }
            }
            dst[p] = v;
        }
    }
    return dst;
}

//
// WebGL Physics Shape (public).
//
function WebGLPhysicsShape() {}
WebGLPhysicsShape.prototype = {

    version : 1

};

function initShapeProperties(s, type, nomargin)
{
    // Capsule/Sphere have this defined differently.
    if (!nomargin)
    {
        Object.defineProperty(s, "margin", {
            get : function shapeGetMargin()
            {
                return this._private.collisionRadius;
            },
            set : function shapeSetMargin(margin)
            {
                var pr = this._private;
                pr.halfExtents[0] += (margin - pr.collisionRadius);
                pr.halfExtents[1] += (margin - pr.collisionRadius);
                pr.halfExtents[2] += (margin - pr.collisionRadius);
                pr.radius += (margin - pr.collisionRadius);

                pr.collisionRadius = margin;
            },
            enumerable : true
        });
    }

    Object.defineProperty(s, "halfExtents", {
        get : function shapeGetHalfExtents()
        {
            return VMath.v3Copy(this._private.halfExtents);
        },
        enumerable : true
    });

    Object.defineProperty(s, "inertia", {
        get : function shapeGetInertia()
        {
            return VMath.v3Copy(this._private.inertia);
        },
        enumerable : true
    });

    Object.defineProperty(s, "radius", {
        get : function shapeGetRadius()
        {
            return this._private.radius;
        },
        enumerable : true
    });

    Object.defineProperty(s, "type", {
        value : type,
        enumerable : true
    });
}

//
// WebGL Physics Plane Shape
//
function WebGLPhysicsPlaneShape() {}
WebGLPhysicsPlaneShape.prototype = {

    version : 1,
    type : "PLANE",

    rayTest : function planeRayTestFn(ray)
    {
        var dir = ray.direction;
        var origin = ray.origin;

        var dir0 = dir[0];
        var dir1 = dir[1];
        var dir2 = dir[2];
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];

        var normal = this.normal;
        var n0 = normal[0];
        var n1 = normal[1];
        var n2 = normal[2];

        //var dot = VMath.v3Dot(ray.direction, this.normal);
        var dot = ((dir0 * n0) + (dir1 * n1) + (dir2 * n2));
        // If ray is parallel to plane we assume it is not
        // intersecting (Do not handle a coplanar ray)
        if ((dot * dot) < WebGLPhysicsConfig.COPLANAR_THRESHOLD)
        {
            return null;
        }

        //var distance = (this.distance - VMath.v3Dot(ray.origin, this.normal)) / dot;
        var distance = ((this.distance - ((o0 * n0) + (o1 * n1) + (o2 * n2))) / dot);
        if (0 <= distance && distance <= ray.maxFactor)
        {
            //var normal = (dot > 0) ? VMath.v3Neg(this.normal) : VMath.v3Copy(this.normal);
            if (dot > 0)
            {
                n0 = -n0;
                n1 = -n1;
                n2 = -n2;
            }
            //    hitPoint: VMath.v3Add(ray.origin, VMath.v3ScalarMul(ray.direction, distance)),
            var hit0 = (o0 + (dir0 * distance));
            var hit1 = (o1 + (dir1 * distance));
            var hit2 = (o2 + (dir2 * distance));
            return {
                factor: distance,
                hitPoint: VMath.v3Build(hit0, hit1, hit2),
                hitNormal: VMath.v3Build(n0, n1, n2)
            };
        }
        else
        {
            return null;
        }
    }
};

WebGLPhysicsPlaneShape.create = function WebGLPhysicsPlaneShapeFn(params)
{
    var retp = new WebGLPhysicsShape();
    var p = new WebGLPhysicsPlaneShape();
    retp._private = p;
    p._public = retp;

    p.collisionRadius = (params.margin !== undefined) ? params.margin : 0.04;
    p.distance = params.distance;
    var normal = p.normal = VMath.v3Copy(params.normal);

    var abs = Math.abs;
    var maxValue = Number.MAX_VALUE;

    p.radius = maxValue;

    if (abs(normal[0]) === 1)
    {
        p.halfExtents = VMath.v3Build(abs(p.distance), maxValue, maxValue);
    }
    else if (abs(normal[1]) === 1)
    {
        p.halfExtents = VMath.v3Build(maxValue, abs(p.distance), maxValue);
    }
    else if (abs(normal[2]) === 1)
    {
        p.halfExtents = VMath.v3Build(maxValue, maxValue, abs(p.distance));
    }

    p.center = undefined;
    p.inertia = VMath.v3BuildZero();

    initShapeProperties(retp, "PLANE");
    return retp;
};

//
// WebGL Physics Capsule Shape
//
function WebGLPhysicsCapsuleShape() {}
WebGLPhysicsCapsuleShape.prototype = {

    version : 1,
    type : "CAPSULE",

    rayTestCap : function rayTestCapFn(ray, height, scale)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];
        var dir0 = direction[0];
        var dir1 = direction[1];
        var dir2 = direction[2];

        var radius = this.capsuleRadius;

        //Quadratic equation at^2 + bt + c = 0
        var a = ((dir0 * dir0) + (dir1 * dir1) + (dir2 * dir2));
        var dy = (o1 - height);
        var b = (2 * ((dir0 * o0) + (dir1 * dy) + (dir2 * o2)));
        var c = ((o0 * o0) + (dy * dy) + (o2 * o2) - (radius * radius));

        //Determinant
        var d = ((b * b) - (4 * a * c));
        if (d < 0)
        {
            return null;
        }

        var distance;
        var normalScale = 1.0;
        var hit1;

        var rec = (1 / (2 * a));
        var rootD = Math.sqrt(d);
        distance = ((-b - rootD) * rec);
        hit1 = (o1 + (dir1 * distance));
        if (distance < 0 || (scale * (hit1 - height) < 0))
        {
            distance += (2 * rootD * rec);
            hit1 = (o1 + (dir1 * distance));
            normalScale = -1.0;
        }

        if ((scale * (hit1 - height) >= 0) &&
            (0 <= distance && distance <= ray.maxFactor))
        {
            var hit0 = (o0 + (dir0 * distance));
            var hit2 = (o2 + (dir2 * distance));
            var nScale = (normalScale / radius);
            return {
                factor: distance,
                hitPoint: VMath.v3Build(hit0, hit1, hit2),
                hitNormal: VMath.v3Build((hit0 * nScale), ((hit1 - height) * nScale), (hit2 * nScale))
            };
        }
        else
        {
            return null;
        }
    },

    rayTest : function capsuleRayTestFn(ray)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];
        var dir0 = direction[0];
        var dir1 = direction[1];
        var dir2 = direction[2];
        var maxFactor = ray.maxFactor;

        var radius = this.capsuleRadius;
        var halfHeight = this.halfHeight;
        var radius2 = (radius * radius);

        var distance;
        var normalScale = 1.0;
        var hit0;
        var hit1;
        var hit2;

        // Attempt to intersect capsule walls
        // Quadratic equation at^2 + bt + c = 0
        var a = ((dir0 * dir0) + (dir2 * dir2));
        if (a >= WebGLPhysicsConfig.QUADRATIC_THRESHOLD)
        {
            var b = (2 * ((o0 * dir0) + (o2 * dir2)));
            var c = ((o0 * o0) + (o2 * o2) - radius2);

            // Determinant
            var d = ((b * b) - (4 * a * c));
            var rec = (1 / (2 * a));

            if (d < WebGLPhysicsConfig.QUADRATIC_THRESHOLD)
            {
                distance = (-b * rec);
            }
            else if (d > 0)
            {
                var rootD = Math.sqrt(d);
                distance = ((-b - rootD) * rec);

                // don't need to check height yet. If ray's first intersection
                // is front face of cylinder, then necessarigly it is not contained
                // within the cylinder and could never hit back face first.
                if (distance < 0)
                {
                    distance += (rootD * 2 * rec);
                    normalScale = -1.0;
                }
            }

            var scale;
            hit1 = (o1 + (dir1 * distance));
            if (-halfHeight <= hit1 && hit1 <= halfHeight)
            {
                if (0 <= distance && distance <= maxFactor)
                {
                    hit0 = (o0 + (dir0 * distance));
                    hit2 = (o2 + (dir2 * distance));
                    scale = (normalScale / radius);
                    return {
                        factor: distance,
                        hitPoint: VMath.v3Build(hit0, hit1, hit2),
                        hitNormal: VMath.v3Build((hit0 * scale), 0.0, (hit2 * scale))
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        // Intersect capsule caps.
        return this.rayTestCap(ray, halfHeight, 1.0) || this.rayTestCap(ray, -halfHeight, -1.0);
    },

    localSupportWithoutMargin : function capsuleLocalSupportWithoutMarginFn(vec, dst)
    {
        dst[0] = 0;
        dst[1] = (vec[1] >= 0) ? this.halfHeight : (-this.halfHeight);
        dst[2] = 0;
    }
};

WebGLPhysicsCapsuleShape.create = function WebGlPhysicsCapsuleShapeFn(params)
{
    var retc = new WebGLPhysicsShape();
    var c = new WebGLPhysicsCapsuleShape();
    retc._private = c;
    c._public = retc;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var radius = params.radius;
    var height = params.height;
    var halfHeight = (0.5 * height);
    var maxRadius = (radius + halfHeight);

    var h0 = (radius + margin);
    var h1 = (maxRadius + margin);
    var h2 = (radius + margin);

    var lx = (2.0 * h0);
    var ly = (2.0 * h1);
    var lz = (2.0 * h2);
    lx *= lx;
    ly *= ly;
    lz *= lz;

    var massRatio = (1.0 / 12.0);

    c.radius = maxRadius + margin;
    c.capsuleRadius = radius;
    c.halfHeight = halfHeight;
    c.halfExtents = VMath.v3Build(h0, h1, h2);
    c.inertia = VMath.v3Build(massRatio * (ly + lz),
                              massRatio * (lx + lz),
                              massRatio * (lx + ly));
    c.collisionRadius = radius + margin;

    c.center = undefined;

    // Defined differently from other shapes.
    Object.defineProperty(retc, "margin", {
        get : function capsuleShapeGetMargin()
        {
            return (this._private.collisionRadius - this._private.capsuleRadius);
        },
        set : function capsuleShapeSetMargin(margin)
        {
            var pr = this._private;
            pr.collisionRadius = (pr.capsuleRadius + margin);
            pr.halfExtents[0] = pr.capsuleRadius + margin;
            pr.halfExtents[1] = (pr.capsuleRadius + pr.halfHeight) + margin;
            pr.halfExtents[2] = pr.capsuleRadius + margin;
            pr.radius = (pr.capsuleRadius + pr.halfHeight) + margin;
        },
        enumerable : true
    });
    initShapeProperties(retc, "CAPSULE", true);
    return retc;
};

//
// WebGL Physics Sphere Shape
//
function WebGLPhysicsSphereShape() {}
WebGLPhysicsSphereShape.prototype = {

    version : 1,
    type : "SPHERE",

    rayTest : function sphereRayTestFn(ray)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var radius = this.sphereRadius;

        var dir0 = direction[0];
        var dir1 = direction[1];
        var dir2 = direction[2];
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];

        // Quadratic coeffecients at^2 + bt + c = 0
        // var a = VMath.v3Dot(direction, direction);
        // var b = 2 * VMath.v3Dot(origin, direction);
        // var c = VMath.v3Dot(origin, origin) - radius * radius;
        var a = ((dir0 * dir0) + (dir1 * dir1) + (dir2 * dir2));
        var b = (2 * ((o0 * dir0) + (o1 * dir1) + (o2 * dir2)));
        var c = (((o0 * o0) + (o1 * o1) + (o2 * o2)) - (radius * radius));

        var distance;
        // Determinant
        var d = ((b * b) - (4 * a * c));
        if (d <= 0)
        {
            return null;
        }

        var normalScale = 1.0;
        var rec = (1 / (2 * a));
        var rootD = Math.sqrt(d);
        distance = ((-b - rootD) * rec);
        if (distance < 0)
        {
            distance += (rootD * 2 * rec);
            normalScale = -1.0;
        }

        if (0 <= distance && distance < ray.maxFactor)
        {
            //hitPoint = VMath.v3Add(ray.origin, VMath.v3ScalarMul(ray.direction, distance));
            //hitNormal = VMath.v3ScalarDiv(hitPoint, radius * normalScale);
            var hit0 = (o0 + (dir0 * distance));
            var hit1 = (o1 + (dir1 * distance));
            var hit2 = (o2 + (dir2 * distance));

            var scale = (normalScale / radius);
            return {
                factor: distance,
                hitPoint: VMath.v3Build(hit0, hit1, hit2),
                hitNormal: VMath.v3Build((hit0 * scale), (hit1 * scale), (hit2 * scale))
            };
        }
        else
        {
            return null;
        }
    },

    localSupportWithoutMargin : function sphereLocalSupportWithoutMarginFn(vec, dst)
    {
        dst[0] = dst[1] = dst[2] = 0;
    }
};

WebGLPhysicsSphereShape.create = function WebGlPhysicsSphereShapeFn(params)
{
    var rets = new WebGLPhysicsShape();
    var s = new WebGLPhysicsSphereShape();
    rets._private = s;
    s._public = rets;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var radius = params.radius;
    var i = (0.4 * radius * radius);

    s.sphereRadius = radius;
    s.radius = s.sphereRadius + margin;
    s.collisionRadius = radius + margin;
    s.halfExtents = VMath.v3Build(radius + margin, radius + margin, radius + margin);
    s.inertia = VMath.v3Build(i, i, i);

    s.center = undefined;

    // Defined differently from other shapes.
    Object.defineProperty(rets, "margin", {
        get : function sphereShapeGetMargin()
        {
            return (this._private.collisionRadius - this._private.radius);
        },
        set : function sphereShapeSetMargin(margin)
        {
            var pr = this._private;
            pr.collisionRadius = (pr.radius + margin);
            pr.halfExtents[0] = pr.collisionRadius;
            pr.halfExtents[1] = pr.collisionRadius;
            pr.halfExtents[2] = pr.collisionRadius;
            pr.radius = pr.collisionRadius;
        },
        enumerable : true
    });
    initShapeProperties(rets, "CAPSULE", true);
    return rets;
};

//
// WebGL Physics Box Shape
//
function WebGLPhysicsBoxShape() {}
WebGLPhysicsBoxShape.prototype = {

    version : 1,
    type : "BOX",

    rayTest : function boxRayTestFn(ray)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];
        var d0 = direction[0];
        var d1 = direction[1];
        var d2 = direction[2];

        var halfExtents = this.halfExtents;
        var h0 = halfExtents[0];
        var h1 = halfExtents[1];
        var h2 = halfExtents[2];

        var minDistance;
        var axis;

        // Code is similar for all pairs of faces.
        // Could be moved to a function, but would have performance penalty.
        //
        // In each case we check (Assuming that ray is not horizontal to plane)
        // That the ray is able to intersect one or both of the faces' planes
        // based on direction, origin and half extents.
        //                        |    |
        // cannot intersect <--o  |    | o--> cannot intersect
        //                        |    |
        //
        // If ray is able to intersect planes, we choose which face to intersect
        // with based on direction, origin and half extents and perform intersection.
        //                           |           |
        //                           | o--> pos. | <--o intersect pos. face
        // intersect neg. face o-->  | neg. <--o |
        //                           |           |
        //

        // intersect with yz faces.
        var t, f, hx, hy;
        if (d0 !== 0 && ((d0 > 0 && o0 <= -h0) || (d0 < 0 && o0 >= h0)))
        {
            f = (d0 > 0 ? (o0 >= -h0 ? h0 : -h0) : (o0 <= h0 ? -h0 : h0));
            t = (f - o0) / d0;
            if (minDistance === undefined || t < minDistance)
            {
                hx = o1 + (d1 * t);
                hy = o2 + (d2 * t);
                if ((-h1 <= hx && hx <= h1) &&
                    (-h2 <= hy && hy <= h2))
                {
                    minDistance = t;
                    axis = 0;
                }
            }
        }

        // intersect with xz faces.
        if (d1 !== 0 && ((d1 > 0 && o1 <= -h1) || (d1 < 0 && o1 >= h1)))
        {
            f = (d1 > 0 ? (o1 >= -h1 ? h1 : -h1) : (o1 <= h1 ? -h1 : h1));
            t = (f - o1) / d1;
            if (minDistance === undefined || t < minDistance)
            {
                hx = o0 + (d0 * t);
                hy = o2 + (d2 * t);
                if ((-h0 <= hx && hx <= h0) &&
                    (-h2 <= hy && hy <= h2))
                {
                    minDistance = t;
                    axis = 1;
                }
            }
        }

        // intersect with xy faces.
        if (d2 !== 0 && ((d2 > 0 && o2 <= -h2) || (d2 < 0 && o2 >= h2)))
        {
            f = (d2 > 0 ? (o2 >= -h2 ? h2 : -h2) : (o2 <= h2 ? -h2 : h2));
            t = (f - o2) / d2;
            if (minDistance === undefined || t < minDistance)
            {
                hx = o1 + (d1 * t);
                hy = o0 + (d0 * t);
                if ((-h1 <= hx && hx <= h1) &&
                    (-h0 <= hy && hy <= h0))
                {
                    minDistance = t;
                    axis = 2;
                }
            }
        }

        if (minDistance !== undefined && minDistance < ray.maxFactor)
        {
            return {
                hitPoint : VMath.v3Build(o0 + d0 * minDistance,
                                         o1 + d1 * minDistance,
                                         o2 + d2 * minDistance),
                hitNormal : VMath.v3Build(axis === 0 ? (d0 > 0 ? -1 : 1) : 0,
                                          axis === 1 ? (d1 > 0 ? -1 : 1) : 0,
                                          axis === 2 ? (d2 > 0 ? -1 : 1) : 0),
                factor : minDistance
            };
        }
        else
        {
            return null;
        }
    },

    localSupportWithoutMargin : function boxLocalSupportWithoutMarginFn(vec, dst)
    {
        var v0 = vec[0];
        var v1 = vec[1];
        var v2 = vec[2];

        var halfExtents = this.halfExtents;
        var h0 = halfExtents[0];
        var h1 = halfExtents[1];
        var h2 = halfExtents[2];

        dst[0] = ((v0 < 0) ? -h0 : h0);
        dst[1] = ((v1 < 0) ? -h1 : h1);
        dst[2] = ((v2 < 0) ? -h2 : h2);
    }
};

WebGLPhysicsBoxShape.create = function WebGLPhysicsBoxShapeFn(params)
{
    var retb = new WebGLPhysicsShape();
    var b = new WebGLPhysicsBoxShape();
    retb._private = b;
    b._public = retb;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var halfExtents = params.halfExtents;

    var h0 = (halfExtents[0] + margin);
    var h1 = (halfExtents[1] + margin);
    var h2 = (halfExtents[2] + margin);

    var lx = (2.0 * h0);
    var ly = (2.0 * h1);
    var lz = (2.0 * h2);
    lx *= lx;
    ly *= ly;
    lz *= lz;

    b.center = undefined;

    b.radius = Math.sqrt((h0 * h0) + (h1 * h1) + (h2 * h2));
    b.halfExtents = VMath.v3Build(h0, h1, h2);
    b.inertia = VMath.v3Build((1.0 / 12.0) * (ly + lz),
                              (1.0 / 12.0) * (lx + lz),
                              (1.0 / 12.0) * (lx + ly));
    b.collisionRadius = margin;

    initShapeProperties(retb, "BOX");
    return retb;
};

//
// WebGL Physics Cylinder Shape
//
function WebGLPhysicsCylinderShape() {}
WebGLPhysicsCylinderShape.prototype = {

    version : 1,
    type : "CYLINDER",

    rayTest : function cylinderRayTestFn(ray)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];
        var dir0 = direction[0];
        var dir1 = direction[1];
        var dir2 = direction[2];
        var maxFactor = ray.maxFactor;

        var radius = this.cylinderRadius;
        var halfHeight = this.halfHeight;
        var radius2 = radius * radius;

        // Attempt to intersect cylinder walls
        // Quadratic equation at^2 + bt + c = 0
        var a = ((dir0 * dir0) + (dir2 * dir2));
        var b = (2 * ((o0 * dir0) + (o2 * dir2)));
        var c = ((o0 * o0) + (o2 * o2) - radius2);

        var distance;
        var normalScale = 1.0;
        var hit0, hit1, hit2;
        var scale, rec;

        // Determinant
        var d = ((b * b) - (4 * a * c));
        if (d >= 0)
        {
            rec = (1 / (2 * a));
            var rootD = Math.sqrt(d);
            distance = ((-b - rootD) * rec);

            // don't need to check height yet. If ray's first intersection
            // is front face of cylinder, then necessarigly it is not contained
            // within the cylinder and could never hit back face first.
            if (distance < 0)
            {
                distance += (rootD * 2 * rec);
                normalScale = -1.0;
            }

            hit1 = (o1 + (dir1 * distance));
            if (-halfHeight <= hit1 && hit1 <= halfHeight)
            {
                if (0 <= distance && distance <= maxFactor)
                {
                    hit0 = (o0 + (dir0 * distance));
                    hit2 = (o2 + (dir2 * distance));
                    scale = (normalScale / radius);
                    return {
                        factor: distance,
                        hitPoint: VMath.v3Build(hit0, hit1, hit2),
                        hitNormal: VMath.v3Build((hit0 * scale), 0.0, (hit2 * scale))
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        //Intersect cylinder caps
        // If ray is perpendicular to caps, we assume
        // It cannot intersect.
        if ((dir1 * dir1) >= WebGLPhysicsConfig.COPLANAR_THRESHOLD)
        {
            scale = ((dir1 < 0) ? -1.0 : 1.0);
            hit1 = (-scale * halfHeight);
            rec = (1 / dir1);
            distance = ((hit1 - o1) * rec);

            // Similarly don't need to check radius yet. If ray's first intersection
            // is back cap, then necesarigly it is not contained within cylinder
            // and could never hit front cap first.
            if (distance < 0)
            {
                hit1 = (scale * halfHeight);
                distance = ((hit1 - o1) * rec);
            }

            if (0 <= distance && distance <= maxFactor)
            {
                hit0 = (o0 + (dir0 * distance));
                hit2 = (o2 + (dir2 * distance));
                if (((hit0 * hit0) + (hit2 * hit2)) <= radius2)
                {
                    return {
                        factor: distance,
                        hitPoint: VMath.v3Build(hit0, hit1, hit2),
                        hitNormal: VMath.v3Build(0.0, -scale, 0.0)
                    };
                }
            }
        }

        return null;
    },

    localSupportWithoutMargin : function cylinderLocalSupportWithoutMarginFn(vec, dst)
    {
        var v0 = vec[0];
        var v2 = vec[2];
        var vmag2 = ((v0 * v0) + (v2 * v2));
        if (vmag2 === 0)
        {
            if (vec[1] > 0)
            {
                dst[0] = this.cylinderRadius;
                dst[1] = this.halfHeight;
                dst[2] = 0;
            }
            else
            {
                dst[0] = 0;
                dst[1] = -this.halfHeight;
                dst[2] = -this.cylinderRadius;
            }
            return;
        }

        var scale = (this.cylinderRadius / Math.sqrt(vmag2));
        dst[0] = (v0 * scale);
        dst[1] = ((vec[1] > 0 ? 1 : -1) * this.halfHeight);
        dst[2] = (v2 * scale);
    }
};

WebGLPhysicsCylinderShape.create = function WebGLPhysicsCylinderShapeFn(params)
{
    var retc = new WebGLPhysicsShape();
    var c = new WebGLPhysicsCylinderShape();
    retc._private = c;
    c._public = retc;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var halfExtents = params.halfExtents;

    var h0 = (halfExtents[0] + margin);
    var h1 = (halfExtents[1] + margin);
    var h2 = (halfExtents[2] + margin);

    var radius2 = (h0 * h0);
    var height2 = (4.0 * h1 * h1);

    var t1 = (((1.0 / 12.0) * height2) + ((1.0 / 4.0) * radius2));
    var t2 = ((1.0 / 2.0) * radius2);

    c.center = undefined;

    c.radius = Math.sqrt((h0 * h0) + (h1 * h1) + (h2 * h2));
    c.halfExtents = VMath.v3Build(h0, h1, h2);
    c.cylinderRadius = halfExtents[0];
    c.halfHeight = halfExtents[1];
    c.inertia = VMath.v3Build(t1, t2, t1);
    c.collisionRadius = margin;

    initShapeProperties(retc, "CYLINDER");
    return retc;
};

//
// WebGL Physics Cone Shape
//
function WebGLPhysicsConeShape() {}
WebGLPhysicsConeShape.prototype = {

    version : 1,
    type : "CONE",

    rayTest : function coneRayTestFn(ray)
    {
        var origin = ray.origin;
        var direction = ray.direction;
        var o0 = origin[0];
        var o1 = origin[1];
        var o2 = origin[2];
        var dir0 = direction[0];
        var dir1 = direction[1];
        var dir2 = direction[2];
        var maxFactor = ray.maxFactor;

        var radius = this.coneRadius;
        var halfHeight = this.halfHeight;

        var conicK = (radius / (2 * halfHeight));
        conicK *= conicK;

        // Intersect with conic surface.
        //
        // Quadratic equation at^2 + bt + c = 0
        var d1 = o1 - halfHeight;
        var a = (dir0 * dir0) + (dir2 * dir2) - (conicK * dir1 * dir1);
        var b = 2 * ((o0 * dir0) + (o2 * dir2) - (conicK * d1 * dir1));
        var c = (o0 * o0) + (o2 * o2) - (conicK * d1 * d1);

        var distance;
        var normalScale = 1.0;
        var hit0, hit1, hit2;

        // Determinant
        var d = ((b * b) - (4 * a * c));
        if (d >= 0)
        {
            var rec = (1 / (2 * a));
            var rootD = Math.sqrt(d);
            distance = ((-b - rootD) * rec);
            hit1 = (o1 + (dir1 * distance));
            if (distance < 0 || hit1 < -halfHeight || hit1 > halfHeight)
            {
                distance += (2 * rootD * rec);
                normalScale = -1.0;
                hit1 = (o1 + (dir1 * distance));
                if (distance < 0 || hit1 < -halfHeight || hit1 > halfHeight)
                {
                    distance = undefined;
                }
            }
        }

        // Intersect with cone cap.
        var t;
        if (dir1 !== 0)
        {
            t = (-halfHeight - o1) / dir1;
            hit0 = (o0 + (dir0 * t));
            hit2 = (o2 + (dir2 * t));
            if (t < 0 || ((hit0 * hit0) + (hit2 * hit2)) > (radius * radius))
            {
                t = undefined;
            }
        }

        if (t === undefined && distance === undefined)
        {
            return null;
        }

        if (t === undefined || (distance !== undefined && distance < t))
        {
            // conic surface is hit first in positive distance range
            if (distance >= maxFactor)
            {
                return null;
            }

            hit0 = (o0 + (dir0 * distance));
            hit1 = (o1 + (dir1 * distance));
            hit2 = (o2 + (dir2 * distance));

            var n1 = conicK * (hit1 - halfHeight);
            var scale = normalScale / Math.sqrt((hit0 * hit0) + (n1 * n1) + (hit2 * hit2));

            return {
                hitPoint : VMath.v3Build(hit0, hit1, hit2),
                hitNormal : VMath.v3Build(scale * hit0, scale * n1, scale * hit2),
                factor : distance
            };
        }
        else
        {
            // cone cap is hit first in positive distance range
            if (t >= maxFactor)
            {
                return null;
            }

            hit0 = (o0 + (dir0 * t));
            hit1 = (o1 + (dir1 * t));
            hit2 = (o2 + (dir2 * t));
            return {
                hitPoint : VMath.v3Build(hit0, hit1, hit2),
                hitNormal : VMath.v3Build(0, ((o1 < -halfHeight) ? -1 : 1), 0),
                factor : t
            };
        }
    },

    localSupportWithoutMargin : function coneLocalSupportWithoutMarginFn(vec, dst)
    {
        var v0 = vec[0];
        var v1 = vec[1];
        var v2 = vec[2];

        var vxz = Math.sqrt((v0 * v0) + (v2 * v2));
        if (((-this.coneRadius * vxz) + (2 * this.halfHeight * v1)) > 0)
        {
            dst[0] = dst[2] = 0;
            dst[1] = this.halfHeight;
        }
        else
        {
            if (vxz === 0)
            {
                dst[0] = this.coneRadius;
                dst[2] = 0;
            }
            else
            {
                dst[0] = (v0 * this.coneRadius / vxz);
                dst[2] = (v2 * this.coneRadius / vxz);
            }
            dst[1] = -this.halfHeight;
        }
    }
};

WebGLPhysicsConeShape.create = function WebGLPhysicsConeShapeFn(params)
{
    var retc = new WebGLPhysicsShape();
    var c = new WebGLPhysicsConeShape();
    retc._private = c;
    c._public = retc;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var radius = params.radius;
    var height = params.height;
    var halfHeight = (0.5 * height);

    var h0 = (radius + margin);
    var h1 = (halfHeight + margin);
    var h2 = (radius + margin);

    var lx = (2.0 * h0);
    var ly = (2.0 * h1);
    var lz = (2.0 * h2);
    lx *= lx;
    ly *= ly;
    lz *= lz;

    var massRatio = (1.0 / 12.0);

    c.halfHeight = halfHeight;
    c.coneRadius = radius;
    c.radius = Math.sqrt((h0 * h0) + (h1 * h1) + (h2 * h2));
    c.halfExtents = VMath.v3Build(h0, h1, h2);
    c.inertia = VMath.v3Build(massRatio * (ly + lz),
                              massRatio * (lx + lz),
                              massRatio * (lx + ly));
    c.collisionRadius = margin;

    c.center = undefined;

    initShapeProperties(retc, "CONE");
    return retc;
};

//
// WebGL Physics Triangle Array
//
function WebGLPhysicsTriangleArray() {}
WebGLPhysicsTriangleArray.prototype = {

    version : 1

};

function WebGLPhysicsPrivateTriangleArray() {}
WebGLPhysicsPrivateTriangleArray.prototype = {

    version : 1,

    // Size of each 'triangle' in triangles array.
    TRIANGLE_SIZE : 17,

    rayTest : function triangleArrayRayTestFn(ray)
    {
        var triangles = this.triangles;
        var spatialMap = this.spatialMap;

        function rayCallback(tree, triangle, ray, unusedAABBDistance, upperBound)
        {
            var dir = ray.direction;
            var dir0 = dir[0];
            var dir1 = dir[1];
            var dir2 = dir[2];

            var origin = ray.origin;
            var o0 = origin[0];
            var o1 = origin[1];
            var o2 = origin[2];

            var i = triangle.index;
            var n0 = triangles[i];
            var n1 = triangles[i + 1];
            var n2 = triangles[i + 2];

            //var dot = VMath.v3Dot(ray.direction, normal);
            var dot = ((dir0 * n0) + (dir1 * n1) + (dir2 * n2));
            // If ray is parallel to triangle plane
            // Assume it cannot intersect triangle
            if ((dot * dot) < WebGLPhysicsConfig.COPLANAR_THRESHOLD)
            {
                return null;
            }

            var d = triangles[i + 16];
            var v00 = triangles[i + 3];
            var v01 = triangles[i + 4];
            var v02 = triangles[i + 5];
            //var distance = VMath.v3Dot(VMath.v3Sub(v0, ray.origin), normal) / dot;
            var distance = ((d - ((o0 * n0) + (o1 * n1) + (o2 * n2))) / dot);
            if (distance < 0 || distance >= upperBound)
            {
                return null;
            }

            // Make sure normal points correct direction for ray cast result
            if (dot > 0)
            {
                //normal = VMath.v3Neg(normal);
                n0 = -n0;
                n1 = -n1;
                n2 = -n2;

                dot = -dot;
            }

            //var hitPoint = VMath.v3Add(ray.origin, VMath.v3ScalarMul(ray.direction, distance));
            var hit0 = (o0 + (dir0 * distance));
            var hit1 = (o1 + (dir1 * distance));
            var hit2 = (o2 + (dir2 * distance));

            // Compute barycentric coordinates in triangle.
            //var w = VMath.v3Sub(hitPoint, v0);
            var wx = (hit0 - v00);
            var wy = (hit1 - v01);
            var wz = (hit2 - v02);

            var dotuu = triangles[i + 12];
            var dotvv = triangles[i + 13];
            var dotuv = triangles[i + 14];
            var negLimit = triangles[i + 15];

            var u0 = triangles[i + 6];
            var u1 = triangles[i + 7];
            var u2 = triangles[i + 8];
            var v0 = triangles[i + 9];
            var v1 = triangles[i + 10];
            var v2 = triangles[i + 11];
            //var dotwu = VMath.v3Dot(w, u);
            //var dotwv = VMath.v3Dot(w, v);
            var dotwu = (wx * u0) + (wy * u1) + (wz * u2);
            var dotwv = (wx * v0) + (wy * v1) + (wz * v2);

            var alpha = ((dotuv * dotwv) - (dotvv * dotwu));
            if (alpha > 0 || alpha < negLimit)
            {
                return null;
            }

            var beta  = ((dotuv * dotwu) - (dotuu * dotwv));
            if (beta > 0 || (alpha + beta) < negLimit)
            {
                return null;
            }

            return {
                factor: distance,
                hitPoint: VMath.v3Build(hit0, hit1, hit2),
                hitNormal: VMath.v3Build(n0, n1, n2)
            };
        }

        if (spatialMap)
        {
            return AABBTree.rayTest([spatialMap], ray, rayCallback);
        }
        else
        {
            var minimumResult = null;
            var upperBound = ray.maxFactor;

            var triNode = {
                index: 0
            };
            var i;
            var numTris = this.numTriangles * WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE;
            for (i = 0; i < numTris; i += WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE)
            {
                triNode.index = i;
                var result = rayCallback(null, triNode, ray, 0, upperBound);
                if (result)
                {
                    minimumResult = result;
                    upperBound = minimumResult.factor;
                }
            }

            return minimumResult;
        }
    }
};

WebGLPhysicsTriangleArray.create = function webGLPhysicsTriangleArrayFn(params)
{
    var rett = new WebGLPhysicsTriangleArray();
    var t = new WebGLPhysicsPrivateTriangleArray();
    rett._private = t;
    t._public = rett;

    var vertices = params.vertices;
    var numVertices = (vertices.length / 3);
    var indices = params.indices;
    var numTriangles = (indices.length / 3);

    var minExtent = params.minExtent;
    var maxExtent = params.maxExtent;

    var v0;
    var v1;
    var v2;

    if (!minExtent || !maxExtent)
    {
        var min0 = vertices[0];
        var min1 = vertices[1];
        var min2 = vertices[2];
        var max0 = min0;
        var max1 = min1;
        var max2 = min2;
        var maxN = vertices.length;
        for (var n = 3; n < maxN; n += 3)
        {
            v0 = vertices[n];
            v1 = vertices[n + 1];
            v2 = vertices[n + 2];
            if (min0 > v0)
            {
                min0 = v0;
            }
            else if (max0 < v0)
            {
                max0 = v0;
            }
            if (min1 > v1)
            {
                min1 = v1;
            }
            else if (max1 < v1)
            {
                max1 = v1;
            }
            if (min2 > v2)
            {
                min2 = v2;
            }
            else if (max2 < v2)
            {
                max2 = v2;
            }
        }
        minExtent = [min0, min1, min2];
        maxExtent = [max0, max1, max2];
    }

    var extents = new Float32Array(6);
    extents[0] = minExtent[0];
    extents[1] = minExtent[1];
    extents[2] = minExtent[2];
    extents[3] = maxExtent[0];
    extents[4] = maxExtent[1];
    extents[5] = maxExtent[2];

    t.vertices = (params.dontCopy ? vertices : new Float32Array(vertices));
    t.numVertices = numVertices;
    t.indices = (params.dontCopy ? indices : (numVertices < 65536 ? new Uint16Array(indices) : new Uint32Array(indices)));
    t.numTriangles = numTriangles;
    t.extents = extents;

    // read only, no getter needed.
    Object.defineProperty(rett, "vertices", {
        value : t.vertices,
        enumerable : true
    });
    Object.defineProperty(rett, "indices", {
        value : t.indices,
        enumerable : true
    });

    /*
        store pre-computed triangle information for ray tests

        n0 n1 n2 - triangle normal
        v0 v1 v2 - triangle vertex
        u0 u1 u2 v0 v1 v2  - edge vectors
        dotuu dotvv dotuv negLimit - barycentric constants
        d - triangle plane distance
    */
    var triangles = new Float32Array(WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE * numTriangles);
    var spatialMap = null;

    // Only use spatial map if we do not have a trivial number of triangles.
    if (numTriangles >= 8)
    {
        spatialMap = AABBTree.create(true);
    }

    var i;
    for (i = 0; i < numTriangles; i = i + 1)
    {
        var i3 = (i * 3);
        var itri = (i * WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE);

        var i0 = (indices[i3] * 3);
        var i1 = (indices[i3 + 1] * 3);
        var i2 = (indices[i3 + 2] * 3);

        var v00 = vertices[i0];
        var v01 = vertices[i0 + 1];
        var v02 = vertices[i0 + 2];

        var v10 = vertices[i1];
        var v11 = vertices[i1 + 1];
        var v12 = vertices[i1 + 2];

        var v20 = vertices[i2];
        var v21 = vertices[i2 + 1];
        var v22 = vertices[i2 + 2];

        //var u = VMath.v3Sub(v1, v0);
        //var v = VMath.v3Sub(v2, v0);
        var u0 = (v10 - v00);
        var u1 = (v11 - v01);
        var u2 = (v12 - v02);
        v0 = (v20 - v00);
        v1 = (v21 - v01);
        v2 = (v22 - v02);

        //var normal = VMath.v3Cross(u, v);
        var n0 = ((u1 * v2) - (u2 * v1));
        var n1 = ((u2 * v0) - (u0 * v2));
        var n2 = ((u0 * v1) - (u1 * v0));
        var nn = (1.0 / Math.sqrt((n0 * n0) + (n1 * n1) + (n2 * n2)));

        var distance = (((n0 * v00) + (n1 * v01) + (n2 * v02)) * nn);

        //var dotuv = VMath.v3Dot(u, v);
        //var dotuu = VMath.v3Dot(u, u);
        //var dotvv = VMath.v3Dot(v, v);
        var dotuv = ((u0 * v0) + (u1 * v1) + (u2 * v2));
        var dotuu = ((u0 * u0) + (u1 * u1) + (u2 * u2));
        var dotvv = ((v0 * v0) + (v1 * v1) + (v2 * v2));

        // Always negative
        var negLimit = ((dotuv * dotuv) - (dotuu * dotvv));

        triangles[itri] = (n0 * nn);
        triangles[itri + 1] = (n1 * nn);
        triangles[itri + 2] = (n2 * nn);
        triangles[itri + 3] = v00;
        triangles[itri + 4] = v01;
        triangles[itri + 5] = v02;
        triangles[itri + 6] = u0;
        triangles[itri + 7] = u1;
        triangles[itri + 8] = u2;
        triangles[itri + 9] = v0;
        triangles[itri + 10] = v1;
        triangles[itri + 11] = v2;
        triangles[itri + 12] = dotuu;
        triangles[itri + 13] = dotvv;
        triangles[itri + 14] = dotuv;
        triangles[itri + 15] = negLimit;
        triangles[itri + 16] = distance;

        // If building AABBTree, store node
        if (spatialMap)
        {
            extents = new Float32Array(6);
            extents[0] = Math.min(v00, v10, v20);
            extents[1] = Math.min(v01, v11, v21);
            extents[2] = Math.min(v02, v12, v22);
            extents[3] = Math.max(v00, v10, v20);
            extents[4] = Math.max(v01, v11, v21);
            extents[5] = Math.max(v02, v12, v22);

            var triNode = {
                index: itri
            };
            spatialMap.add(triNode, extents);
        }
    }

    if (spatialMap)
    {
        spatialMap.finalize();
    }

    t.triangles = triangles;
    t.spatialMap = spatialMap;

    return rett;
};

//
// WebGL Physics Convex Hull helpers.
// (Mostly mirrored with turbulenz/tools/mesh.py)
//
var WebGLPhysicsConvexHullHelpers = {
    isPlanar : function isPlanarFn(points)
    {
        // tolerance for distance from plane for a point
        // to be treat as coplanar.
        var tolerance = WebGLPhysicsConfig.COPLANAR_THRESHOLD;

        var p00 = points[0];
        var p01 = points[1];
        var p02 = points[2];

        // Find normal of plane from first 3 vertices.
        var e10 = (points[3] - p00);
        var e11 = (points[4] - p01);
        var e12 = (points[5] - p02);

        var e20 = (points[6] - p00);
        var e21 = (points[7] - p01);
        var e22 = (points[8] - p02);

        var n0 = (e11 * e22) - (e12 * e21);
        var n1 = (e12 * e20) - (e10 * e22);
        var n2 = (e10 * e21) - (e11 * e20);

        // Though normalisation isn't required to determine if point is 'on' the plane
        // We allow a distance tolerance so normalisation should be performed.
        var normalScale = 1 / Math.sqrt((n0 * n0) + (n1 * n1) + (n2 * n2));
        n0 *= normalScale;
        n1 *= normalScale;
        n2 *= normalScale;

        var planeDistance = -((p00 * n0) + (p01 * n1) + (p02 * n2));

        var i;
        var maxN = points.length;
        for (i = 0; i < maxN; i += 3)
        {
            var distance = (points[i] * n0) + (points[i + 1] * n1) + (points[i + 2] * n2) + planeDistance;
            if ((distance * distance) > tolerance)
            {
                return false;
            }
        }

        return true;
    },

    makePlanarConvexHull : function makePlanarConvexHullFn(points)
    {
        var DONT_NORMALIZE_THRESHOLD = 1e-6;

        // Use a 2D graham scan with projections of points onto their maximal plane.
        // Time complexity O(nh) for n points and h out-points.

        // Determine maximal plane for projection as the plane containing points.
        var p00 = points[0];
        var p01 = points[1];
        var p02 = points[2];

        var e10 = (points[3] - p00);
        var e11 = (points[4] - p01);
        var e12 = (points[5] - p02);

        var e20 = (points[6] - p00);
        var e21 = (points[7] - p01);
        var e22 = (points[8] - p02);

        // We do not require normalisation for projection onto plane.
        var normal0 = (e11 * e22) - (e12 * e21);
        var normal1 = (e12 * e20) - (e10 * e22);
        var normal2 = (e10 * e21) - (e11 * e20);

        // Determine tangent vectors.
        var tangent0, tangent1, tangent2;
        if ((normal0 * normal0) + (normal2 * normal2) < DONT_NORMALIZE_THRESHOLD)
        {
            tangent0 = 1;
            tangent1 = tangent2 = 0;
        }
        else
        {
            tangent0 = -normal2;
            tangent1 = 0;
            tangent2 = normal0;
        }
        var bitangent0 = (normal1 * tangent2) - (normal2 * tangent1);
        var bitangent1 = (normal2 * tangent0) - (normal0 * tangent2);
        var bitangent2 = (normal0 * tangent1) - (normal1 * tangent0);

        // Project points.
        var numPoints = points.length / 3;
        var projs = new Float32Array(numPoints * 2);
        var p0, p1, p2;
        var i;
        for (i = 0; i < numPoints; i += 1)
        {
            p0 = points[i * 3];
            p1 = points[(i * 3) + 1];
            p2 = points[(i * 3) + 2];

            projs[i * 2] = (p0 * tangent0) + (p1 * tangent1) + (p2 * tangent2);
            projs[(i * 2) + 1] = (p0 * bitangent0) + (p1 * bitangent1) + (p2 * bitangent2);
        }

        // Find first vertex on projected hull as minimal lexicographically.
        var i0 = 0;
        p00 = projs[0];
        p01 = projs[1];
        for (i = 2; i < (numPoints * 2); i += 2)
        {
            p0 = projs[i];
            p1 = projs[i + 1];
            if (p0 < p00 || (p0 === p00 && p1 < p01))
            {
                i0 = (i / 2);
                p00 = p0;
                p01 = p1;
            }
        }

        // Perform graham scan.
        // hullVertices is a mapping for vertices used by hull from their present indices
        // to new indices in output mesh.
        var hullVertices = {};
        hullVertices[i0] = 0;
        var outVertexCount = 1;

        var hullTriangles = [];

        var fsti = i0;
        for (;;)
        {
            var max0, max1, maxDistance;
            var i1 = -1;

            for (i = 0; i < (numPoints * 2); i += 2)
            {
                if (i === (i0 * 2))
                {
                    continue;
                }

                p0 = projs[i];
                p1 = projs[i + 1];
                var plsq = (((p0 - p00) * (p0 - p00)) + ((p1 - p01) * (p1 - p01)));
                if (i1 === -1)
                {
                    i1 = (i / 2);
                    max0 = p0;
                    max1 = p1;
                    maxDistance = plsq;
                    continue;
                }

                // If this is not first vertex tested, determine if new vertex
                // makes a right turn looking in direction of edge, or is further
                // in same direction.
                var turn = ((max0 - p00) * (p1 - p01)) - ((max1 - p01) * (p0 - p00));
                if (turn < 0 || (turn === 0 && plsq > maxDistance))
                {
                    i1 = (i / 2);
                    max0 = p0;
                    max1 = p1;
                    maxDistance = plsq;
                }
            }

            if (i1 in hullVertices)
            {
                break;
            }

            // Append vertex i1 to hull
            hullVertices[i1] = outVertexCount;
            outVertexCount += 1;

            // Form triangle (fsti, i0, i1)
            if (i0 !== fsti)
            {
                hullTriangles.push(fsti);
                hullTriangles.push(i0);
                hullTriangles.push(i1);
            }

            i0 = i1;
            p00 = projs[i1 * 2];
            p01 = projs[(i1 * 2) + 1];
        }

        // Output triangle array!
        return this.createArray(points, hullTriangles, hullVertices, outVertexCount);
    },

    makeConvexHull : function makeConvexHullFn(points)
    {
        // 3D generalisation of Graham Scan to facilitate triangulation of the hull in generation
        // Time complexity O(nh) for n points, and h out-points.

        // Find first vertex on hull as minimal lexicographically ordered point.
        var i0 = 0;
        var p00 = points[0];
        var p01 = points[1];
        var p02 = points[2];

        var i;
        var p0, p1, p2;
        var numPoints = (points.length / 3);
        for (i = 3; i < (numPoints * 3); i += 3)
        {
            p0 = points[i];
            p1 = points[i + 1];
            p2 = points[i + 2];
            if (p0 < p00 || (p0 === p00 && (p1 < p01 || (p1 === p01 && p2 < p02))))
            {
                i0 = (i / 3);
                p00 = p0;
                p01 = p1;
                p02 = p2;
            }
        }

        // Find second vertex on hull by performing 2D graham scan step on xy-plane projections of positions
        var i1 = -1;
        var cos1 = -2; // Will always be overriden as cos(theta) > -2
        var lsq1 = 0;
        var d0, d1;
        for (i = 0; i < (numPoints * 3); i += 3)
        {
            if (i === (i0 * 3))
            {
                continue;
            }

            p0 = points[i];
            p1 = points[i + 1];
            d0 = p0 - p00;
            d1 = p1 - p01;
            var lsq = ((d0 * d0) + (d1 * d1));
            if (lsq === 0)
            {
                if (i1 === -1)
                {
                    i1 = (i / 3);
                }
                continue;
            }

            var cos = d1 / Math.sqrt(lsq);
            if (cos > cos1 || (cos === cos1 && lsq > lsq1))
            {
                cos1 = cos;
                lsq1 = lsq;
                i1 = (i / 3);
            }
        }

        // Dictionary of visited edges to avoid duplicates
        // List of open edges to be visited by graham scan.
        var closedSet = {};
        var openSet = [i0, i1, i1, i0];

        // Dictionary of vertices used by hull as mapping from old to new indices in mesh.
        // And generated triangles
        var hullVertices = {};
        hullVertices[i0] = 0;
        hullVertices[i1] = 1;
        var outVertexCount = 2;

        var hullTriangles = [];

        while (openSet.length > 0)
        {
            // [ ...., i0, i1 ]
            i1 = openSet.pop();
            i0 = openSet.pop();

            if ((i0 + ":" + i1) in closedSet)
            {
                continue;
            }

            var i2 = -1;
            var maxEdge0, maxEdge1, maxEdge2;
            var maxDistance, maxProjection;

            p00 = points[i0 * 3];
            p01 = points[(i0 * 3) + 1];
            p02 = points[(i0 * 3) + 2];
            var edge0 = (points[i1 * 3] - p00);
            var edge1 = (points[(i1 * 3) + 1] - p01);
            var edge2 = (points[(i1 * 3) + 2] - p02);
            var isq = 1 / ((edge0 * edge0) + (edge1 * edge1) * (edge2 * edge2));

            for (i = 0; i < (numPoints * 3); i += 3)
            {
                if (i === (i0 * 3) || i === (i1 * 3))
                {
                    continue;
                }

                p0 = points[i];
                p1 = points[i + 1];
                p2 = points[i + 2];

                // Find closest point on line containing the edge to determine vector to p
                // perpendicular to edge. This is not necessary for computing the turn
                // since the value of 'turn' computed is actually the same whether we do
                // this or not, however it is needed to be able to sort equal turn vertices
                // by distance.
                var t = (((p0 - p00) * edge0) +
                         ((p1 - p01) * edge1) +
                         ((p2 - p02) * edge2)) * isq;
                var pEdge0 = (p0 - (p00 + (edge0 * t)));
                var pEdge1 = (p1 - (p01 + (edge1 * t)));
                var pEdge2 = (p2 - (p02 + (edge2 * t)));

                // Ignore vertex if |pedge| = 0, thus ignoring vertices on edge itself
                // and so avoiding generating degenerate triangles.
                var plsq = ((pEdge0 * pEdge0) + (pEdge1 * pEdge1) + (pEdge2 * pEdge2));
                if (plsq <= WebGLPhysicsConfig.COLLINEAR_THRESHOLD)
                {
                    continue;
                }

                if (i2 === -1)
                {
                    i2 = (i / 3);
                    maxEdge0 = pEdge0;
                    maxEdge1 = pEdge1;
                    maxEdge2 = pEdge2;
                    maxDistance = plsq;
                    maxProjection = t;
                    continue;
                }

                // If this is not the first vertex tested, determine if new vertex
                // is a right turn looking in direction of edge, or is further in
                // same direction
                //
                // We require a special case when pedge, and maxedge are coplanar
                // with edge as the computed turn will be 0 and we must check
                // if the cross product is facing into the hull or outside to
                // determine left/right instead.
                var axis0 = ((pEdge1 * maxEdge2) - (pEdge2 * maxEdge1));
                var axis1 = ((pEdge2 * maxEdge0) - (pEdge0 * maxEdge2));
                var axis2 = ((pEdge0 * maxEdge1) - (pEdge1 * maxEdge0));

                var coplanar = (pEdge0 * ((edge1 * maxEdge2) - (edge2 * maxEdge1)) +
                                pEdge1 * ((edge2 * maxEdge0) - (edge0 * maxEdge2)) +
                                pEdge2 * ((edge0 * maxEdge1) - (edge1 * maxEdge0)));
                if ((coplanar * coplanar) < WebGLPhysicsConfig.COPLANAR_THRESHOLD)
                {
                    // Special case for coplanar pedge, maxpedge, edge
                    //
                    // If edges are in same direction, base on distance
                    if (((pEdge0 * maxEdge0) + (pEdge1 * maxEdge1) + (pEdge2 * maxEdge2)) >= 0)
                    {
                        if (plsq > maxDistance || (plsq === maxDistance && t > maxProjection))
                        {
                            i2 = (i / 3);
                            maxEdge0 = pEdge0;
                            maxEdge1 = pEdge1;
                            maxEdge2 = pEdge2;
                            maxDistance = plsq;
                            maxProjection = t;
                        }
                    }
                    else
                    {
                        d0 = (p0 - p00);
                        d1 = (p1 - p01);
                        var d2 = (p2 - p02);
                        axis0 = ((d1 * edge2) - (d2 * edge1));
                        axis1 = ((d2 * edge0) - (d0 * edge2));
                        axis2 = ((d0 * edge1) - (d1 * edge0));

                        // Determine if axis points into, or out of the convex hull.
                        var internal = true;
                        var j;
                        for (j = 0; j < (numPoints * 3); j += 3)
                        {
                            if (((axis0 * (points[j] - p00)) +
                                 (axis1 * (points[j + 1] - p01)) +
                                 (axis2 * (points[j + 2] - p02))) < 0)
                            {
                                internal = false;
                                break;
                            }
                        }

                        if (internal)
                        {
                            i2 = (i / 3);
                            maxEdge0 = pEdge0;
                            maxEdge1 = pEdge1;
                            maxEdge2 = pEdge2;
                            maxDistance = plsq;
                            maxProjection = t;
                        }
                    }
                }
                else
                {
                    var turn = (axis0 * edge0) + (axis1 * edge1) + (axis2 * edge2);
                    if (turn < 0 || (turn <= WebGLPhysicsConfig.COLLINEAR_THRESHOLD && plsq > maxDistance))
                    {
                        i2 = (i / 3);
                        maxEdge0 = pEdge0;
                        maxEdge1 = pEdge1;
                        maxEdge2 = pEdge2;
                        maxDistance = plsq;
                        maxProjection = t;
                    }
                }
            }

            // append i2 vertex to hull
            if (!(i2 in hullVertices))
            {
                hullVertices[i2] = outVertexCount;
                outVertexCount += 1;
            }

            // form triangle iff no edge is closed
            if (!((i0 + ":" + i1) in closedSet ||
                  (i1 + ":" + i2) in closedSet ||
                  (i2 + ":" + i0) in closedSet))
            {
                hullTriangles.push(i0);
                hullTriangles.push(i1);
                hullTriangles.push(i2);

                closedSet[i0 + ":" + i1] = true;
                closedSet[i1 + ":" + i2] = true;
                closedSet[i2 + ":" + i0] = true;

                openSet.push(i2);
                openSet.push(i1);
                openSet.push(i0);
                openSet.push(i2);
            }
        }

        // Output triangle array!
        return this.createArray(points, hullTriangles, hullVertices, outVertexCount);
    },

    createArray : function createArrayFn(points, indices, mapping, vertexCount)
    {
        // Port removeRedundantVertices from mesh.py with extra param to specify used vertices.
        // Modified to create a WebGLPhysicsPrivateTriangleArray
        var outPoints = new Float32Array(vertexCount * 3);
        var triangleCount = indices.length;
        var outIndices = (vertexCount < 65536 ? new Uint16Array(triangleCount) : new Uint32Array(triangleCount));

        // Produce outPoints array
        var numPoints = (points.length / 3);
        var i;
        for (i = 0; i < numPoints; i += 1)
        {
            if (!(i in mapping))
            {
                continue;
            }

            var newIndex = (mapping[i] * 3);
            outPoints[newIndex] = points[i * 3];
            outPoints[newIndex + 1] = points[(i * 3) + 1];
            outPoints[newIndex + 2] = points[(i * 3) + 2];
        }

        // Remap triangles.
        for (i = 0; i < triangleCount; i += 1)
        {
            outIndices[i] = mapping[indices[i]];
        }

        return WebGLPhysicsTriangleArray.create({
            vertices : outPoints,
            indices : outIndices,
            dontCopy : true // Inform TriangleArray constructor not to take a copy of mesh.
        })._private;
    }
};


//
// WebGL Physics Triangle Mesh Shape
//
function WebGLPhysicsTriangleMeshShape() {}
WebGLPhysicsTriangleMeshShape.prototype = {

    version : 1,
    type : "TRIANGLE_MESH",

    rayTest : function triangleMeshRayTestFn(ray)
    {
        return this.triangleArray.rayTest(ray);
    }
};

WebGLPhysicsTriangleMeshShape.create = function WebGLPhysicsTriangleMeshShapeFn(params)
{
    var rett = new WebGLPhysicsShape();
    var t = new WebGLPhysicsTriangleMeshShape();
    rett._private = t;
    t._public = rett;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var triangleArray = params.triangleArray._private;

    var extents = triangleArray.extents;
    var e0 = extents[0];
    var e1 = extents[1];
    var e2 = extents[2];
    var e3 = extents[3];
    var e4 = extents[4];
    var e5 = extents[5];

    var h0 = ((0.5 * (e3 - e0)) + margin);
    var h1 = ((0.5 * (e4 - e1)) + margin);
    var h2 = ((0.5 * (e5 - e2)) + margin);
    var c0 = (0.5 * (e0 + e3));
    var c1 = (0.5 * (e1 + e4));
    var c2 = (0.5 * (e2 + e5));

    t.triangleArray = triangleArray;
    t.radius = Math.sqrt((h0 * h0) + (h1 * h1) + (h2 * h2));
    t.halfExtents = VMath.v3Build(h0, h1, h2);
    if (c0 !== 0 || c1 !== 0 || c2 !== 0)
    {
        t.center = VMath.v3Build(c0, c1, c2);
    }
    else
    {
        t.center = undefined;
    }
    t.inertia = VMath.v3Build(0, 0, 0);
    t.collisionRadius = margin;

    initShapeProperties(rett, "TRIANGLE_MESH");
    return rett;
};

//
// WebGL Physics Convex Hull Shape
//
function WebGLPhysicsConvexHullShape() {}
WebGLPhysicsConvexHullShape.prototype = {

    version : 1,
    type : "CONVEX_HULL",

    rayTest : function convexHullRayTestFn(ray)
    {
        var triangleArray = this.triangleArray;
        if (triangleArray === undefined)
        {
            return null;
        }

        return triangleArray.rayTest(ray);
    },

    localSupportWithoutMargin : function convexHullLocalSupportWithoutMarginFn(vec, dst)
    {
        var v0 = vec[0];
        var v1 = vec[1];
        var v2 = vec[2];

        var topology = this.supportTopology;
        var points = this.triangleArray.vertices;
        if (this.lastSupport === undefined)
        {
            this.lastSupport = 0;
        }

        // Start search at last support point.
        var maxv = this.lastSupport;
        var ind = topology[maxv];
        var max = (points[ind] * v0) + (points[ind + 1] * v1) + (points[ind + 2] * v2);

        for (;;)
        {
            // Determine if a vertex linked in topology is a better support point.
            var next = -1;
            var n;
            var maxN = topology[maxv + 1];
            for (n = 0; n < maxN; n += 1)
            {
                var v = topology[maxv + 2 + n];
                ind = topology[v];
                var vdot = (points[ind] * v0) + (points[ind + 1] * v1) + (points[ind + 2] * v2);
                if (vdot > max)
                {
                    max = vdot;
                    next = v;
                }
            }

            // If no better support was found, we are at the maximum support.
            if (next !== -1)
            {
                maxv = next;
                continue;
            }
            else
            {
                break;
            }
        }

        // Cache maximum support to seed next call to method.
        this.lastSupport = maxv;

        ind = topology[maxv];
        dst[0] = points[ind];
        dst[1] = points[ind + 1];
        dst[2] = points[ind + 2];
    }
};

WebGLPhysicsConvexHullShape.create = function WebGLPhysicsConvexHullShapeFn(params)
{
    var retc = new WebGLPhysicsShape();
    var c = new WebGLPhysicsConvexHullShape();
    retc._private = c;
    c._public = retc;

    var margin = (params.margin !== undefined) ? params.margin : 0.04;
    var points = params.points;

    var min0 = points[0];
    var min1 = points[1];
    var min2 = points[2];
    var max0 = min0;
    var max1 = min1;
    var max2 = min2;
    var maxN = points.length;
    var n;
    var v0, v1, v2;
    for (n = 3; n < maxN; n += 3)
    {
        v0 = points[n];
        v1 = points[n + 1];
        v2 = points[n + 2];
        if (min0 > v0)
        {
            min0 = v0;
        }
        else if (max0 < v0)
        {
            max0 = v0;
        }
        if (min1 > v1)
        {
            min1 = v1;
        }
        else if (max1 < v1)
        {
            max1 = v1;
        }
        if (min2 > v2)
        {
            min2 = v2;
        }
        else if (max2 < v2)
        {
            max2 = v2;
        }
    }

    var h0 = ((0.5 * (max0 - min0)) + margin);
    var h1 = ((0.5 * (max1 - min1)) + margin);
    var h2 = ((0.5 * (max2 - min2)) + margin);
    var c0 = (0.5 * (min0 + max0));
    var c1 = (0.5 * (min1 + max1));
    var c2 = (0.5 * (min2 + max2));

    var lx = (2.0 * h0);
    var ly = (2.0 * h1);
    var lz = (2.0 * h2);
    lx *= lx;
    ly *= ly;
    lz *= lz;

    var massRatio = (1.0 / 12.0);

    c.points = new Float32Array(points);
    c.radius = Math.sqrt((h0 * h0) + (h1 * h1) + (h2 * h2));
    c.halfExtents = VMath.v3Build(h0, h1, h2);
    if (c0 !== 0 || c1 !== 0 || c2 !== 0)
    {
        c.center = VMath.v3Build(c0, c1, c2);
    }
    else
    {
        c.center = undefined;
    }
    c.inertia = VMath.v3Build(massRatio * (ly + lz),
                              massRatio * (lx + lz),
                              massRatio * (lx + ly));
    c.collisionRadius = margin;

    // Generate triangle array for ray testing
    if (points.length < 9)
    {
        // Less than 3 points... cannot generate triangles.
        throw "At present time, WebGL PhysicsDevice does not permit a convex hull to contain " +
              "less than 3 vertices";
    }
    else
    {
        var planar = WebGLPhysicsConvexHullHelpers.isPlanar(points);
        if (planar)
        {
            c.triangleArray = WebGLPhysicsConvexHullHelpers.makePlanarConvexHull(points);
        }
        else
        {
            c.triangleArray = WebGLPhysicsConvexHullHelpers.makeConvexHull(points);
        }

        // Produce edge topology for faster support search.
        // Each vertex keeps a reference to each neighbouring vertex on triangulated surface.
        //
        // Experiment showed that even for a planar convex hull of 3 vertices, we only search
        // on average 1.6 vertices instead of all 3 so is better even for this smallest case.
        var supportTopology = [];

        points = c.triangleArray.vertices;
        maxN = points.length;
        for (n = 0; n < maxN; n += 3)
        {
            supportTopology[n / 3] = [];
        }

        var m;
        if (planar)
        {
            for (n = 0; n < (maxN / 3); n += 1)
            {
                m = (n + 1) % (maxN / 3);
                supportTopology[n].push(m);
                supportTopology[m].push(n);
            }
        }
        else
        {
            var triangles = c.triangleArray.indices;
            maxN = triangles.length;
            for (n = 0; n < maxN; n += 3)
            {
                var i0 = triangles[n];
                var i1 = triangles[n + 1];
                var i2 = triangles[n + 2];

                // Create links i0 -> i1 -> i2 -> i0.
                // Adjacent triangles will take care of back links.
                supportTopology[i0].push(i1);
                supportTopology[i1].push(i2);
                supportTopology[i2].push(i0);
            }
        }

        // Additionally each vertex keeps a reference to the vertex on far side of hull.
        // Tests show that this reduces the number of vertices searched in support function.
        //
        // Planar case, only do this for 6 vertices or more, or else includes uneeded edges.
        // Non-planar case, do this for 10 vertices or more. Experiment showed this to be a good
        // threshold.
        maxN = points.length;
        if ((planar && maxN >= (3 * 6)) || (!planar && maxN >= (3 * 10)))
        {
            for (n = 0; n < maxN; n += 3)
            {
                var min = Number.MAX_VALUE;
                v0 = points[n];
                v1 = points[n + 1];
                v2 = points[n + 2];

                var  minm;
                for (m = 0; m < maxN; m += 3)
                {
                    var dot = (v0 * points[m]) + (v1 * points[m + 1]) + (v2 * points[m + 2]);
                    if (dot < min)
                    {
                        min = dot;
                        minm = m;
                    }
                }

                supportTopology[n / 3].push(minm / 3);
            }
        }

        // Flatten supportTopology array of arrays, into a single typed array.
        //
        // We take topology array like: [[1,2],[0],[0,1,3],[0,1,2]]
        // Decorate with index of vertex in triangle array
        // and number of edges: [[0,2|1,2], [3,1|0], [6,3|0,1,3], [9,3|0,1,2]]
        // And then flatten into array: [0,2,4,7, 3,1,0, 6,3,0,4,12, 9,3,0,4,7]
        //

        // Compute size of array, and positions of vertex data.
        var mapping = [];
        var size = 0;
        for (n = 0; n < (maxN / 3); n += 1)
        {
            mapping.push(size);
            size += supportTopology[n].length + 2;
        }

        // Produce flattened array.
        c.supportTopology = (size > 65536) ? new Int32Array(size) : new Int16Array(size);
        var index = 0;
        for (n = 0; n < (maxN / 3); n += 1)
        {
            c.supportTopology[index] = (n * 3);
            index += 1;

            var topology = supportTopology[n];
            c.supportTopology[index] = topology.length;
            index += 1;

            for (m = 0; m < topology.length; m += 1)
            {
                c.supportTopology[index] = mapping[topology[m]];
                index += 1;
            }
        }
    }

    initShapeProperties(retc, "CONVEX_HULL");
    return retc;
};


//
// WebGL Physics Collision Object
//
function WebGLPhysicsCollisionObject() {}
WebGLPhysicsCollisionObject.prototype = {

    version : 1,

    calculateExtents : function collisionObjectCalculateExtentsFn(extents)
    {
        this._private.calculateExtents(extents);
    },

    clone : function collisionObjectCloneFn()
    {
        return WebGLPhysicsCollisionObject.create(this);
    }
};

function WebGLPhysicsPrivateBody() {}
WebGLPhysicsPrivateBody.prototype = {

    version : 1,

    // Used for kinematics.
    // TODO: Should be used for convexSweep to permit non-linear sweeps.
    computeDeltaVelocity : function collisionObjectComputeDeltaVelocityFn(timeStep, from, to, inputVelocity)
    {
        var velocity = inputVelocity || this.velocity;

        var active = false;

        velocity[0] = (to[9]  - from[9]);
        velocity[1] = (to[10] - from[10]);
        velocity[2] = (to[11] - from[11]);
        if (velocity[0] !== 0 ||
            velocity[1] !== 0 ||
            velocity[2] !== 0)
        {
            active = true;
        }

        // do this afterwards so that active is true, even if timeStep is 0
        // for non-equal position transforms.
        velocity[0] /= timeStep;
        velocity[1] /= timeStep;
        velocity[2] /= timeStep;

        //var deltaRotation = VMath.m33Mul(VMath.m33Inverse(from), to);
        var m0 = (from[0] * to[0]) + (from[3] * to[3]) + (from[6] * to[6]);
        var m1 = (from[0] * to[1]) + (from[3] * to[4]) + (from[6] * to[7]);
        var m2 = (from[0] * to[2]) + (from[3] * to[5]) + (from[6] * to[8]);
        var m3 = (from[1] * to[0]) + (from[4] * to[3]) + (from[7] * to[6]);
        var m4 = (from[1] * to[1]) + (from[4] * to[4]) + (from[7] * to[7]);
        var m5 = (from[1] * to[2]) + (from[4] * to[5]) + (from[7] * to[8]);
        var m6 = (from[2] * to[0]) + (from[5] * to[3]) + (from[8] * to[6]);
        var m7 = (from[2] * to[1]) + (from[5] * to[4]) + (from[8] * to[7]);
        var m8 = (from[2] * to[2]) + (from[5] * to[5]) + (from[8] * to[8]);

        //var quat = VMath.quatFromM43(deltaRotation);
        var x, y, z, w, s;
        var trace = m0 + m4 + m8 + 1;
        if (trace > VMath.precision)
        {
            w = Math.sqrt(trace) / 2;
            x = (m5 - m7) / (4 * w);
            y = (m6 - m2) / (4 * w);
            z = (m1 - m3) / (4 * w);
        }
        else
        {
            if ((m0 > m4) && (m0 > m8))
            {
                s = Math.sqrt(1.0 + m0 - m4 - m8) * 2; // S=4*qx
                w = (m5 - m7) / s;
                x = 0.25 * s;
                y = (m3 + m1) / s;
                z = (m6 + m2) / s;
            }
            else if (m4 > m8)
            {
                s = Math.sqrt(1.0 + m4 - m0 - m8) * 2; // S=4*qy
                w = (m6 - m2) / s;
                x = (m3 + m1) / s;
                y = 0.25 * s;
                z = (m7 + m5) / s;
            }
            else
            {
                s = Math.sqrt(1.0 + m8 - m0 - m4) * 2; // S=4*qz
                w = (m1 - m3) / s;
                x = (m6 + m2) / s;
                y = (m7 + m5) / s;
                z = 0.25 * s;
            }
        }

        var angle = Math.acos(w) * 2.0;
        var sin_sqrd = 1.0 - (w * w);
        if (sin_sqrd < VMath.precision || angle === 0)
        {
            velocity[3] = velocity[4] = velocity[5] = 0;
        }
        else
        {
            var scale = angle / (timeStep * Math.sqrt(sin_sqrd));
            velocity[3] = x * scale;
            velocity[4] = y * scale;
            velocity[5] = z * scale;
            active = true;
        }

        return active;
    },

    // Used for kinematic and dynamics.
    calculateSweptExtents : function collisionObjectSweptExtentsFn(extents)
    {
        var shape = this.shape;
        var radius = shape.radius;

        var startTransform = this.startTransform;
        var x0 = startTransform[9];
        var x1 = startTransform[10];
        var x2 = startTransform[11];

        var transform = this.transform;
        var y0 = transform[9];
        var y1 = transform[10];
        var y2 = transform[11];

        var tmp;
        if (x0 > y0)
        {
            tmp = x0;
            x0 = y0;
            y0 = tmp;
        }
        if (x1 > y1)
        {
            tmp = x1;
            x1 = y1;
            y1 = tmp;
        }
        if (x2 > y2)
        {
            tmp = x2;
            x2 = y2;
            y2 = tmp;
        }

        extents[0] = x0 - radius;
        extents[1] = x1 - radius;
        extents[2] = x2 - radius;
        extents[3] = y0 + radius;
        extents[4] = y1 + radius;
        extents[5] = y2 + radius;
    },

    // use for all types.
    calculateExtents : function collisionObjectCalculateExtentsFn(extents)
    {
        var shape = this.shape;
        var center = shape.center;
        var halfExtents = shape.halfExtents;
        var h0 = halfExtents[0];
        var h1 = halfExtents[1];
        var h2 = halfExtents[2];

        var transform = this.transform;
        var m0 = transform[0];
        var m1 = transform[1];
        var m2 = transform[2];
        var m3 = transform[3];
        var m4 = transform[4];
        var m5 = transform[5];
        var m6 = transform[6];
        var m7 = transform[7];
        var m8 = transform[8];

        var ct0 = transform[9];
        var ct1 = transform[10];
        var ct2 = transform[11];
        if (center)
        {
            var c0 = center[0];
            var c1 = center[1];
            var c2 = center[2];

            if (c0 !== 0 ||
                c1 !== 0 ||
                c2 !== 0)
            {
                ct0 += (m0 * c0 + m3 * c1 + m6 * c2);
                ct1 += (m1 * c0 + m4 * c1 + m7 * c2);
                ct2 += (m2 * c0 + m5 * c1 + m8 * c2);
            }
        }

        // fails when h0, h1, h2 are infinite, as JS has 0 * infinity = NaN not 0!!!!
        //var ht0 = ((m0 < 0 ? -m0 : m0) * h0 + (m3 < 0 ? -m3 : m3) * h1 + (m6 < 0 ? -m6 : m6) * h2);
        //var ht1 = ((m1 < 0 ? -m1 : m1) * h0 + (m4 < 0 ? -m4 : m4) * h1 + (m7 < 0 ? -m7 : m7) * h2);
        //var ht2 = ((m2 < 0 ? -m2 : m2) * h0 + (m5 < 0 ? -m5 : m5) * h1 + (m8 < 0 ? -m8 : m8) * h2);
        var ht0 = ((m0 < 0 ? -m0 * h0 : m0 > 0 ? m0 * h0 : 0) +
                   (m3 < 0 ? -m3 * h1 : m3 > 0 ? m3 * h1 : 0) +
                   (m6 < 0 ? -m6 * h2 : m6 > 0 ? m6 * h2 : 0));
        var ht1 = ((m1 < 0 ? -m1 * h0 : m1 > 0 ? m1 * h0 : 0) +
                   (m4 < 0 ? -m4 * h1 : m4 > 0 ? m4 * h1 : 0) +
                   (m7 < 0 ? -m7 * h2 : m7 > 0 ? m7 * h2 : 0));
        var ht2 = ((m2 < 0 ? -m2 * h0 : m2 > 0 ? m2 * h0 : 0) +
                   (m5 < 0 ? -m5 * h1 : m5 > 0 ? m5 * h1 : 0) +
                   (m8 < 0 ? -m8 * h2 : m8 > 0 ? m8 * h2 : 0));

        extents[0] = (ct0 - ht0);
        extents[1] = (ct1 - ht1);
        extents[2] = (ct2 - ht2);
        extents[3] = (ct0 + ht0);
        extents[4] = (ct1 + ht1);
        extents[5] = (ct2 + ht2);
    },

    // used for all types.
    rayTest : function collisionObjectRayTestFn(ray)
    {
        //Transform ray; assuming transform is orthogonal
        var transform = this.transform;
        var rayT = {
            origin: WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformPoint(transform, ray.origin),
            direction: WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformVector(transform, ray.direction),
            maxFactor: ray.maxFactor
        };

        var result = this.shape.rayTest(rayT);
        if (result !== null)
        {
            result.hitPoint = VMath.m43TransformPoint(transform, result.hitPoint);
            result.hitNormal = VMath.m43TransformVector(transform, result.hitNormal);
        }

        return result;
    },

    // used for kinematics and dynamics
    integratePositionWithVelocities : function intPosWithVelFn(transform, outTransform, timeStep, offset)
    {
        var velocity = this.velocity;
        var sqrt = Math.sqrt;

        // x += h * v
        outTransform[9]  = transform[9]  + (timeStep * velocity[offset]);
        outTransform[10] = transform[10] + (timeStep * velocity[offset + 1]);
        outTransform[11] = transform[11] + (timeStep * velocity[offset + 2]);

        // A += h * skew(w) * A
        var w0 = velocity[offset + 3] * timeStep;
        var w1 = velocity[offset + 4] * timeStep;
        var w2 = velocity[offset + 5] * timeStep;

        var A0 = transform[0];
        var A1 = transform[1];
        var A2 = transform[2];
        var A3 = transform[3];
        var A4 = transform[4];
        var A5 = transform[5];
        var A6 = transform[6];
        var A7 = transform[7];
        var A8 = transform[8];

        var B0 = A0 - (w2 * A1) + (w1 * A2);
        var B1 = A1 + (w2 * A0) - (w0 * A2);
        var B2 = A2 - (w1 * A0) + (w0 * A1);
        var B3 = A3 - (w2 * A4) + (w1 * A5);
        var B4 = A4 + (w2 * A3) - (w0 * A5);
        var B5 = A5 - (w1 * A3) + (w0 * A4);
        var B6 = A6 - (w2 * A7) + (w1 * A8);
        var B7 = A7 + (w2 * A6) - (w0 * A8);
        var B8 = A8 - (w1 * A6) + (w0 * A7);

        // Orthornormalize with modified gram schmidt.
        var scale = 1 / sqrt((B0 * B0) + (B1 * B1) + (B2 * B2));
        B0 *= scale;
        B1 *= scale;
        B2 *= scale;

        scale = -((B0 * B3) + (B1 * B4) + (B2 * B5));
        B3 += B0 * scale;
        B4 += B1 * scale;
        B5 += B2 * scale;

        scale = 1 / sqrt((B3 * B3) + (B4 * B4) + (B5 * B5));
        B3 *= scale;
        B4 *= scale;
        B5 *= scale;

        scale = -((B0 * B6) + (B1 * B7) + (B2 * B8));
        B6 += B0 * scale;
        B7 += B1 * scale;
        B8 += B2 * scale;

        scale = -((B3 * B6) + (B4 * B7) + (B5 * B8));
        B6 += B3 * scale;
        B7 += B4 * scale;
        B8 += B5 * scale;

        scale = 1 / sqrt((B6 * B6) + (B7 * B7) + (B8 * B8));
        B6 *= scale;
        B7 *= scale;
        B8 *= scale;

        outTransform[0] = B0;
        outTransform[1] = B1;
        outTransform[2] = B2;
        outTransform[3] = B3;
        outTransform[4] = B4;
        outTransform[5] = B5;
        outTransform[6] = B6;
        outTransform[7] = B7;
        outTransform[8] = B8;
    },

    // used for dynamics.
    applyBiasVelocities : function applyBiasVelocitiesFn(timeStep)
    {
        var velocity = this.velocity;
        this.integratePositionWithVelocities(this.transform, this.startTransform, timeStep, 6);

        // Set bias velocities back to 0.
        velocity[6] = velocity[7] = velocity[8] = 0;
        velocity[9] = velocity[10] = velocity[11] = 0;
    },

    // used for kinematics and dynamics.
    integratePosition : function integratePositionFn(timeStep)
    {
        this.integratePositionWithVelocities(this.startTransform, this.transform, timeStep, 0);
    },

    // used for dynamics.
    refreshInertiaTensor : function refreshInertiaTensorFn()
    {
        var A = this.transform;
        var inertia = this.inverseInertiaLocal;
        var i0 = inertia[0];
        var i1 = inertia[1];
        var i2 = inertia[2];

        var A0 = A[0];
        var A1 = A[1];
        var A2 = A[2];
        var A3 = A[3];
        var A4 = A[4];
        var A5 = A[5];
        var A6 = A[6];
        var A7 = A[7];
        var A8 = A[8];

        // I = A * 1/I' * A^T
        var I = this.inverseInertia;
        I[0] = (A0 * A0 * i0) + (A3 * A3 * i1) + (A6 * A6 * i2);
        I[1] = (A0 * A1 * i0) + (A3 * A4 * i1) + (A6 * A7 * i2);
        I[2] = (A0 * A2 * i0) + (A3 * A5 * i1) + (A6 * A8 * i2);
        I[3] = (A1 * A0 * i0) + (A4 * A3 * i1) + (A7 * A6 * i2);
        I[4] = (A1 * A1 * i0) + (A4 * A4 * i1) + (A7 * A7 * i2);
        I[5] = (A1 * A2 * i0) + (A4 * A5 * i1) + (A7 * A8 * i2);
        I[6] = (A2 * A0 * i0) + (A5 * A3 * i1) + (A8 * A6 * i2);
        I[7] = (A2 * A1 * i0) + (A5 * A4 * i1) + (A8 * A7 * i2);
        I[8] = (A2 * A2 * i0) + (A5 * A5 * i1) + (A8 * A8 * i2);
    },

    // used for dynamics.
    integrateVelocity : function integrateVelocityFn(gravity, timeStep) {
        var velocity = this.velocity;

        var pow = Math.pow;
        // v += h * F / m. Damping applied directly.
        var linDrag = pow(1 - this.linearDamping, timeStep);
        velocity[0] = (velocity[0] + (timeStep * gravity[0])) * linDrag;
        velocity[1] = (velocity[1] + (timeStep * gravity[1])) * linDrag;
        velocity[2] = (velocity[2] + (timeStep * gravity[2])) * linDrag;

        var angDrag = pow(1 - this.angularDamping, timeStep);
        var w0 = velocity[3] * angDrag;
        var w1 = velocity[4] * angDrag;
        var w2 = velocity[5] * angDrag;

        // Apply clamping to angularVelocity
        var max_angular = WebGLPhysicsConfig.MAX_ANGULAR / timeStep;
        var wlsq = ((w0 * w0) + (w1 * w1) + (w2 * w2));
        if (wlsq > (max_angular * max_angular))
        {
            var scale = max_angular / Math.sqrt(wlsq);
            w0 *= scale;
            w1 *= scale;
            w2 *= scale;
        }

        velocity[3] = w0;
        velocity[4] = w1;
        velocity[5] = w2;
    },

    // Return false if body is (considering purely velocity) able to sleep.
    // used for dynamics.
    isActiveVelocity : function isActiveVelocityFn(linear, angular)
    {
        var r = this.shape.radius;

        var velocity = this.velocity;
        var v0 = velocity[0];
        var v1 = velocity[1];
        var v2 = velocity[2];
        var vmag = ((v0 * v0) + (v1 * v1) + (v2 * v2));
        if (vmag > (linear * r * r))
        {
            return true;
        }

        v0 = velocity[3];
        v1 = velocity[4];
        v2 = velocity[5];
        if (((v0 * v0) + (v1 * v1) + (v2 * v2)) > angular)
        {
            return true;
        }

        return false;
    },

    // Return false if body is (taking into account sleep delay) able to sleep.
    // used for dynamics.
    isActive : function isActiveFn(timeStep)
    {
        if (!this.permitSleep) {
            return true;
        }

        if (this.isActiveVelocity(WebGLPhysicsConfig.SLEEP_LINEAR_SQ, WebGLPhysicsConfig.SLEEP_ANGULAR_SQ))
        {
            this.wakeTimeStamp = this.world.timeStamp;
            return true;
        }

        return ((this.wakeTimeStamp + WebGLPhysicsConfig.SLEEP_DELAY) > this.world.timeStamp);
    }
};

WebGLPhysicsPrivateBody.uniqueId = 0;
function initPrivateBody(r, params)
{
    r.id = WebGLPhysicsPrivateBody.uniqueId;
    WebGLPhysicsPrivateBody.uniqueId += 1;

    r.world = null;
    r.shape = params.shape._private;

    r.friction    = (params.friction    !== undefined) ? params.friction    : 0.5;
    r.restitution = (params.restitution !== undefined) ? params.restitution : 0.0;

    var xform = params.transform;
    r.transform = (xform ? VMath.m43Copy(xform) : VMath.m43BuildIdentity());

    r.arbiters = [];
    // Tracks constraints that are inside of a space, and making use of this object.
    // We only track these constraints to avoid GC issues.
    r.constraints = [];

    // [v0, v1, v2]
    // [w0, w1, w2]
    // [v0, v1, v2] <-- bias velocity
    // [w0, w1, w2] <-- bias velocity
    r.velocity = new Float32Array(12);
    var vel = params.linearVelocity;
    if (vel)
    {
        r.velocity[0] = vel[0];
        r.velocity[1] = vel[1];
        r.velocity[2] = vel[2];
    }
    vel = params.angularVelocity;
    if (vel)
    {
        r.velocity[3] = vel[0];
        r.velocity[4] = vel[1];
        r.velocity[5] = vel[2];
    }

    r.linearDamping  = (params.linearDamping  !== undefined) ? params.linearDamping  : 0.0;
    r.angularDamping = (params.angularDamping !== undefined) ? params.angularDamping : 0.0;

    r.extents = new Float32Array(6);

    // For continous collision detection
    r.startTransform = VMath.m43BuildIdentity();
    r.endTransform = VMath.m43BuildIdentity();

    // For kinematic objects.
    r.prevTransform = VMath.m43Copy(r.transform);
    r.newTransform = VMath.m43BuildIdentity();

    r.island = null;
    r.islandRoot = r;
    r.islandRank = 0;

    // used for kinematics so that it is kept alive for a single
    // step before being sweffed.
    r.delaySleep = true;

    return r;
}

WebGLPhysicsCollisionObject.create = function webGLPhysicsPrivateBodyFn(params)
{
    var rets = new WebGLPhysicsCollisionObject();
    var s = new WebGLPhysicsPrivateBody();
    rets._private = s;
    s._public = rets;

    //read/write, no side effects
    rets.userData = ("userData" in params) ? params.userData : null;

    // read only, no getter needed
    Object.defineProperty(rets, "shape", {
        value : params.shape,
        enumerable : true
    });

    var kinematic = (params.kinematic !== undefined) ? params.kinematic : false;

    // read/write, side effects
    Object.defineProperty(rets, "transform", {
        get : function collisionObjectGetTransform()
        {
            return VMath.m43Copy(this._private.transform);
        },
        set : function collisionObjectSetTransform(transform)
        {
            var pr = this._private;
            // can only set transform if kinematic, or else for non kinematic IF NOT in a world.
            if (pr.kinematic || !pr.world) {
                VMath.m43Copy(transform, pr.transform);
                if (pr.world)
                {
                    pr.world.wakeBody(pr);
                }
            }
        },
        enumerable : true
    });

    var group = (params.group !== undefined) ? params.group : WebGLPhysicsDevice.prototype.FILTER_STATIC;
    // read only, no getter needed
    Object.defineProperty(rets, "group", {
        value : group,
        enumerable : true
    });

    /*jshint bitwise: false*/
    var mask  = (params.mask !== undefined) ? params.mask  :
                (WebGLPhysicsDevice.prototype.FILTER_ALL ^ WebGLPhysicsDevice.prototype.FILTER_STATIC);
    /*jshint bitwise: true*/
    // read only, no getter needed
    Object.defineProperty(rets, "mask", {
        value : mask,
        enumerable : true
    });

    // read/write, side effects needed
    Object.defineProperty(rets, "friction", {
        get : function collisionObjectGetFriction()
        {
            return this._private.friction;
        },
        set : function collisionObjectSetFriction(friction)
        {
            var pr = this._private;
            pr.friction = friction;

            // Invalidate arbiter friction values.
            var arbiters = pr.arbiters;
            var i;
            var limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].invalidateParameters();
            }
        },
        enumerable : true
    });

    // read/write, side effects needed
    Object.defineProperty(rets, "restitution", {
        get : function collisionObjectGetFriction()
        {
            return this._private.restitution;
        },
        set : function collisionObjectSetFriction(restitution)
        {
            var pr = this._private;
            pr.restitution = restitution;

            // Invalidate arbiter restitution values.
            var arbiters = pr.arbiters;
            var i;
            var limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].invalidateParameters();
            }
        },
        enumerable : true
    });

    // read only, no getter needed
    Object.defineProperty(rets, "kinematic", {
        value : kinematic,
        enumerable : true
    });

    //--------------------------------
    // set private collision object properties

    initPrivateBody(s, params);

    s.group = group;
    s.mask = mask;

    s.kinematic = kinematic;
    s.fixedRotation = !kinematic;

    s.mass = 0;
    s.inverseMass = 0;

    s.inverseInertiaLocal = VMath.v3BuildZero();
    s.inverseInertia = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    s.collisionObject = true;

    // Kinematic/Static object is not permitted to sleep in the normal sense.
    s.permitSleep = false;
    // Kinematic/Static objects are not subject to manipulation by continuous
    // collision detection.
    s.sweepFrozen = true;

    // Object default active state is true iff object is kinematic.
    // static object is always 'inactive'
    s.active = kinematic;

    return rets;
};


//
// WebGL Physics Rigid Body
//
function WebGLPhysicsRigidBody() {}
WebGLPhysicsRigidBody.prototype = {

    version : 1,

    calculateExtents : function rigidBodyCalculateExtentsFn(extents)
    {
        this._private.calculateExtents(extents);
    },

    clone : function rigidBodyCloneFn()
    {
        return WebGLPhysicsRigidBody.create(this);
    }
};

WebGLPhysicsRigidBody.create = function webGLPhysicsRigidBodyFn(params)
{
    var retr = new WebGLPhysicsRigidBody();
    var r = new WebGLPhysicsPrivateBody();
    retr._private = r;
    r._public = retr;

    // read/write, no side effects
    retr.userData = ("userData" in params) ? params.userData : null;

    // read only, no getter needed
    Object.defineProperty(retr, "shape", {
        value : params.shape,
        enumerable : true
    });

    // read/write, side effects
    Object.defineProperty(retr, "linearVelocity", {
        get : function rigidBodyGetVelocity()
        {
            var vel = this._private.velocity;
            return VMath.v3Build(vel[0], vel[1], vel[2]);
        },
        set : function rigidBodySetVelocity(linearVelocity)
        {
            var vel = this._private.velocity;
            vel[0] = linearVelocity[0];
            vel[1] = linearVelocity[1];
            vel[2] = linearVelocity[2];
        },
        enumerable : true
    });

    // read/write, side effects
    Object.defineProperty(retr, "angularVelocity", {
        get : function rigidBodyGetVelocity()
        {
            var vel = this._private.velocity;
            return VMath.v3Build(vel[3], vel[4], vel[5]);
        },
        set : function rigidBodySetVelocity(angularVelocity)
        {
            var vel = this._private.velocity;
            vel[3] = angularVelocity[0];
            vel[4] = angularVelocity[1];
            vel[5] = angularVelocity[2];
        },
        enumerable : true
    });

    // read/write, side effects
    Object.defineProperty(retr, "transform", {
        get : function rigidBodyGetTransform()
        {
            return VMath.m43Copy(this._private.transform);
        },
        set : function rigidBodySetTransform(transform)
        {
            var pr = this._private;
            VMath.m43Copy(transform, pr.transform);

            // Ensure any arbiter's have their skipDiscreteCollisions flags set to false as
            // new contacts 'will' be needed.
            var arbiters = pr.arbiters;
            var i;
            var limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].skipDiscreteCollisions = false;
            }
        },
        enumerable : true
    });

    // read/write, side effects
    Object.defineProperty(retr, "active", {
        get : function rigidBodyGetActive()
        {
            return this._private.active;
        },
        set : function rigidBodySetActive(active)
        {
            var pr = this._private;
            if (active === pr.active)
            {
                // If already active, and in a world then allow re-settnig to true
                // to update wakeTimeStamp.
                if (pr.world && active)
                {
                    pr.wakeTimeStamp = pr.world.timeStamp;
                }
            }
            else if (pr.world)
            {
                // If in a world, and not already active then wake the body.
                if (active)
                {
                    pr.world.wakeBody(pr);
                }
                // Otherwise force body to go to sleep.
                else
                {
                    var list = pr.world.activeBodies;
                    list[list.indexOf(pr)] = list[list.length - 1];
                    list.pop();
                    pr.active = false;

                    // force any arbiters to be deactivated also.
                    var arbiters = pr.arbiters;
                    var n;
                    var maxN = arbiters.length;
                    for (n = 0; n < maxN; n += 1)
                    {
                        var arb = arbiters[n];
                        if (!arb.active)
                        {
                            continue;
                        }

                        arb.active = false;
                        var worldList = pr.world.activeArbiters;
                        worldList[worldList.indexOf(arb)] = worldList[worldList.length - 1];
                        worldList.pop();
                    }

                    // sync with broadphase
                    pr.world.syncBody(pr);
                }
            }
            else
            {
                pr.active = active;
            }
        },
        enumerable : true
    });

    // read only, no getter needed
    var group = (params.group !== undefined) ? params.group : WebGLPhysicsDevice.prototype.FILTER_DYNAMIC;
    Object.defineProperty(retr, "group", {
        value : group,
        enumerable : true
    });

    // read only, no getter needed
    var mask  = (params.mask  !== undefined) ? params.mask  : WebGLPhysicsDevice.prototype.FILTER_ALL;
    Object.defineProperty(retr, "mask", {
        value : mask,
        enumerable : true
    });

    // read/write, side effects
    Object.defineProperty(retr, "friction", {
        get : function rigidBodyGetFriction()
        {
            return this._private.friction;
        },
        set : function rigidBodySetFriction(friction)
        {
            var pr = this._private;
            pr.friction = friction;

            // Invalidate arbiter friction values.
            var arbiters = pr.arbiters;
            var i;
            var limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].invalidateParameters();
            }
        },
        enumerable : true
    });
    Object.defineProperty(retr, "restitution", {
        get : function rigidBodyGetRestitution()
        {
            return this._private.restitution;
        },
        set : function rigidBodySetRestitution(restitution)
        {
            var pr = this._private;
            pr.restitution = restitution;

            // Invalidate arbiter restitution values.
            var arbiters = pr.arbiters;
            var i;
            var limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].invalidateParameters();
            }
        },
        enumerable : true
    });

    // read/write, getters needed.
    Object.defineProperty(retr, "linearDamping", {
        get : function rigidBodyGetLinearDamping()
        {
            return this._private.linearDamping;
        },
        set : function rigidBodySetLinearDamping(linearDamping)
        {
            this._private.linearDamping = linearDamping;
        },
        enumerable : true
    });
    Object.defineProperty(retr, "angularDamping", {
        get : function rigidBodyGetLinearDamping()
        {
            return this._private.angularDamping;
        },
        set : function rigidBodySetLinearDamping(angularDamping)
        {
            this._private.angularDamping = angularDamping;
        },
        enumerable : true
    });

    // read only, no getter needed
    var kinematic = (params.kinematic !== undefined) ? params.kinematic : false;
    Object.defineProperty(retr, "kinematic", {
        value : kinematic,
        enumerable : true
    });

    // read only, no getter needed
    var mass = (params.mass !== undefined) ? params.mass : 1.0;
    Object.defineProperty(retr, "mass", {
        value : mass,
        enumerable : true
    });

    // read only, getter needed for unique vector.
    // this value isn't used internally so is kept in a closure just for this getter.
    var inertia = (params.inertia ? VMath.v3Copy(params.inertia) : VMath.v3ScalarMul(params.shape.inertia, mass));
    Object.defineProperty(retr, "inertia", {
        get : function rigidBodyGetInertia()
        {
            return VMath.v3Copy(inertia);
        },
        enumerable : true
    });

    // ------------------------------
    // initialise private properties of RigidBody.

    initPrivateBody(r, params);

    r.group = group;
    r.mask = mask;

    r.active = (params.active !== undefined) ? params.active :
                (params.frozen !== undefined) ? (!params.frozen) : true;

    r.kinematic = kinematic;
    r.fixedRotation = kinematic || ((params.fixedRotation !== undefined) ? params.fixedRotation : false);

    r.inverseInertiaLocal = (r.fixedRotation ? VMath.v3BuildZero() :
                                               VMath.v3Build(1 / inertia[0],
                                                             1 / inertia[1],
                                                             1 / inertia[2]));
    r.inverseInertia = VMath.m33BuildIdentity();

    r.mass = mass;
    r.inverseMass = (kinematic ? 0 : (1 / r.mass));

    r.collisionObject = false;

    // Kinematic object is not permitted to sleep in the normal sense.
    r.permitSleep = (params.permitSleep !== undefined) ? params.permitSleep : (!kinematic);

    // Kinematic object is not subject to manipulation by continous collisions.
    r.sweepFrozen = kinematic;

    return retr;
};

//
// WebGL Physics Constraint
//
function WebGLPhysicsConstraint() {}
WebGLPhysicsConstraint.prototype = {

    version : 1,

    preStep : function constraintPreStepFn(timeStep)
    {
    },

    applyCachedImpulses : function constraintApplyCachedImpulsesFn()
    {
    },

    computeAndApplyImpulses : function constraintComputeAndApplyImpulsesFn()
    {
    }
};

WebGLPhysicsConstraint.create = function webGLPhysicsConstraintFn(type, params)
{
    var s = new WebGLPhysicsConstraint();

    s.world = null;
    s.userData = null;

    webGLPhysicsClone(s, params);
    s.type = type;

    return s;
};

// Decorate constraint with getter/setters for bodyA/bodyB
// And deal with construction logic common to all constraints
function initConstraintProperties(c, params)
{
    c.userData = params.userData;

    var pc = c._private;
    pc.world = null;

    // read only, no getter required.
    pc.bodyA = params.bodyA._private;
    Object.defineProperty(c, "bodyA", {
        value : params.bodyA,
        enumerable : true
    });

    // read only, no getter required.
    pc.bodyB = params.bodyB ? params.bodyB._private : null;
    Object.defineProperty(c, "bodyB", {
        value : params.bodyB,
        enumerable : true
    });

    // read/write with side effects
    pc.active = (params.active !== undefined) ? params.active : true;
    Object.defineProperty(c, "active", {
        get : function constraintGetActive()
        {
            return this._private.active;
        },
        set : function constraintSetActive(active)
        {
            var pc = this._private;
            if (active === pc.active)
            {
                // If already active, and in a world then allow re-setting to true
                // to update wakeTimeStamp.
                if (pc.world && active)
                {
                    pc.wakeTimeStamp = pc.world.timeStamp;
                }
            }
            else if (pc.world)
            {
                // If in a world, and not already active then wake the constraint.
                if (active)
                {
                    pc.world.wakeConstraint(pc);
                }
                // Otherwise force constraint to go to sleep.
                else
                {
                    var list = pc.world.activeConstraints;
                    list[list.indexOf(pc)] = list[list.length - 1];
                    list.pop();
                    pc.active = false;
                }
            }
            else
            {
                pc.active = active;
            }
        },
        enumerable : true
    });
}

//
// WebGL Physics Point2Point Constraint
//
function WebGLPhysicsPoint2PointConstraint() {}
WebGLPhysicsPoint2PointConstraint.prototype = {

    version : 1,
    type : "POINT2POINT"

};

function WebGLPhysicsPrivatePoint2PointConstraint()
{
    // Initialise all properties that will ever be set on this object.
    this.bodyA = null;
    this.bodyB = null;

    // [0,  3) : pivotA (vector3)
    // [3,  6) : pivotB (vector3)
    // [6,  9) : relA   (vector3)
    // [9, 12) : relB   (vector3)
    // [12,21) : skewA  (mat33)
    // [21,30) : skewB  (mat33)
    // [30,31) : force   (scalar)
    // [31,32) : damping (scalar)
    // [32,33) : clamp   (scalar)
    // [33,34) : gamma   (scalar)
    // [34,40) : K (symmetric mat33)
    //           [ K0 K1 K2 ]
    //    aka:   [ K1 K3 K4 ]
    //           [ K2 K4 K5 ]
    // [40,43) : jAcc (vector3)
    // [43,46) : bias (vector3)
    this.data = new Float32Array(46);
}

WebGLPhysicsPrivatePoint2PointConstraint.prototype = {

    version : 1,

    preStep : function point2pointPreStepFn(timeStepRatio, timeStep)
    {
        var bodyA = this.bodyA;
        var bodyB = this.bodyB;
        var data = this.data;

        // a0 = this.pivotA
        var a0 = data[0];
        var a1 = data[1];
        var a2 = data[2];

        // b0 = this.pivotB
        var b0 = data[3];
        var b1 = data[4];
        var b2 = data[5];

        // Compute relative coordinates of pivot points.
        //this.relA = VMath.m43TransformVector(this.bodyA.transform, this.pivotA);
        var A = bodyA.transform;
        var ra0 = data[6] = (A[0] * a0) + (A[3] * a1) + (A[6] * a2);
        var ra1 = data[7] = (A[1] * a0) + (A[4] * a1) + (A[7] * a2);
        var ra2 = data[8] = (A[2] * a0) + (A[5] * a1) + (A[8] * a2);

        var rb0, rb1, rb2, B;
        if (bodyB)
        {
            B = bodyB.transform;

            //this.relB = VMath.m43TransformVector(this.bodyB.transform, this.pivotB);
            rb0 = data[9]  = (B[0] * b0) + (B[3] * b1) + (B[6] * b2);
            rb1 = data[10] = (B[1] * b0) + (B[4] * b1) + (B[7] * b2);
            rb2 = data[11] = (B[2] * b0) + (B[5] * b1) + (B[8] * b2);
        }

        //var skew = this.matrix;
        //this.m33BuildSkew(this.relA, skew);
        //VMath.m33Mul(skew, bodyA.inverseInertia, this.skewA);
        var I = bodyA.inverseInertia;
        data[12] = (-ra2 * I[3]) + (ra1 * I[6]);
        data[13] = (-ra2 * I[4]) + (ra1 * I[7]);
        data[14] = (-ra2 * I[5]) + (ra1 * I[8]);
        data[15] = (ra2 * I[0]) + (-ra0 * I[6]);
        data[16] = (ra2 * I[1]) + (-ra0 * I[7]);
        data[17] = (ra2 * I[2]) + (-ra0 * I[8]);
        data[18] = (-ra1 * I[0]) + (ra0 * I[3]);
        data[19] = (-ra1 * I[1]) + (ra0 * I[4]);
        data[20] = (-ra1 * I[2]) + (ra0 * I[5]);

        var mass_sum = bodyA.inverseMass + (bodyB ? bodyB.inverseMass : 0);
        //VMath.m33BuildIdentity(K);
        //VMath.m33ScalarMul(K, mass_sum, K);
        //this.m33Sub(K, VMath.m33Mul(this.skewA, skew), K);
        var K0 = mass_sum + (data[13] * -ra2) + (data[14] * ra1);
        var K3 = mass_sum + (data[15] * ra2)  + (data[17] * -ra0);
        var K5 = mass_sum + (data[18] * -ra1) + (data[19] * ra0);
        var K1 = (data[12] * ra2)  + (data[14] * -ra0);
        var K2 = (data[12] * -ra1) + (data[13] * ra0);
        var K4 = (data[15] * -ra1) + (data[16] * ra0);

        if (bodyB)
        {
            //this.m33BuildSkew(this.relB, skew);
            //VMath.m33Mul(skew, bodyB.inverseInertia, this.skewB);
            //this.m33Sub(K, VMath.m33Mul(this.skewB, skew), K);
            I = bodyB.inverseInertia;
            data[21] = (-rb2 * I[3]) + (rb1 * I[6]);
            data[22] = (-rb2 * I[4]) + (rb1 * I[7]);
            data[23] = (-rb2 * I[5]) + (rb1 * I[8]);
            data[24] = (rb2 * I[0]) + (-rb0 * I[6]);
            data[25] = (rb2 * I[1]) + (-rb0 * I[7]);
            data[26] = (rb2 * I[2]) + (-rb0 * I[8]);
            data[27] = (-rb1 * I[0]) + (rb0 * I[3]);
            data[28] = (-rb1 * I[1]) + (rb0 * I[4]);
            data[29] = (-rb1 * I[2]) + (rb0 * I[5]);

            K0 += (data[22] * -rb2) + (data[23] * rb1);
            K3 += (data[24] * rb2)  + (data[26] * -rb0);
            K5 += (data[27] * -rb1) + (data[28] * rb0);
            K1 += (data[21] * rb2)  + (data[23] * -rb0);
            K2 += (data[21] * -rb1) + (data[22] * rb0);
            K4 += (data[24] * -rb1) + (data[25] * rb0);
        }

        // Soft constraint physics (Based on Nape physics soft constraints).
        //
        // We are given this.force in constraint parameters.
        //   So we must compute suitable omega instead.
        var force = data[30];
        var omega = (2 / timeStep * force * data[31]) / (1 - force);

        var gk = force / (omega * omega);
        var ig = 1 / (1 + gk);
        data[33] = 1 - (gk * ig);

        //VMath.m33Inverse(K, K);
        //VMath.m33ScalarMul(K, ig, K);
        var i0 = ((K3 * K5) - (K4 * K4));
        var i1 = ((K2 * K4) - (K1 * K5));
        var i2 = ((K1 * K4) - (K2 * K3));
        var idet = ig / ((K0 * i0) + (K1 * i1) + (K2 * i2));

        data[34] = (idet * i0);
        data[35] = (idet * i1);
        data[36] = (idet * i2);
        data[37] = (idet * ((K0 * K5) - (K2 * K2)));
        data[38] = (idet * ((K1 * K2) - (K0 * K4)));
        data[39] = (idet * ((K0 * K3) - (K1 * K1)));

        // positional error
        var C0 = ra0 + A[9];
        var C1 = ra1 + A[10];
        var C2 = ra2 + A[11];
        if (bodyB)
        {
            C0 -= rb0 + B[9];
            C1 -= rb1 + B[10];
            C2 -= rb2 + B[11];
        }
        else
        {
            C0 -= b0;
            C1 -= b1;
            C2 -= b2;
        }

        // soft constraint bias.
        var scale = -force / timeStep;
        data[43] = (C0 * scale);
        data[44] = (C1 * scale);
        data[45] = (C2 * scale);

        // scale cached impulse for change in time step.
        data[40] *= timeStepRatio;
        data[41] *= timeStepRatio;
        data[42] *= timeStepRatio;
    },

    applyCachedImpulses : function point2pointApplyCachedImpulsesFn()
    {
        var data = this.data;

        // var j = this.jAcc
        var j0 = data[40];
        var j1 = data[41];
        var j2 = data[42];

        var bodyA = this.bodyA;
        var vel = bodyA.velocity;
        var imass = bodyA.inverseMass;
        vel[0] += (j0 * imass);
        vel[1] += (j1 * imass);
        vel[2] += (j2 * imass);

        //var I = this.skewA;
        vel[3] -= ((data[12] * j0) + (data[15] * j1) + (data[18] * j2));
        vel[4] -= ((data[13] * j0) + (data[16] * j1) + (data[19] * j2));
        vel[5] -= ((data[14] * j0) + (data[17] * j1) + (data[20] * j2));

        var bodyB = this.bodyB;
        if (bodyB)
        {
            vel = bodyB.velocity;
            imass = bodyB.inverseMass;
            vel[0] -= (j0 * imass);
            vel[1] -= (j1 * imass);
            vel[2] -= (j2 * imass);

            //I = this.skewB;
            vel[3] += ((data[21] * j0) + (data[24] * j1) + (data[27] * j2));
            vel[4] += ((data[22] * j0) + (data[25] * j1) + (data[28] * j2));
            vel[5] += ((data[23] * j0) + (data[26] * j1) + (data[29] * j2));
        }
    },

    computeAndApplyImpulses : function point2pointComputeAndApplyImpulsesFn()
    {
        var bodyA = this.bodyA;
        var bodyB = this.bodyB;
        var data = this.data;

        // jAcc = this.jAcc
        var jAcc0 = data[40];
        var jAcc1 = data[41];
        var jAcc2 = data[42];

        // velocity bias, minus the relative velocity at pivot points
        // stored in (l0, l1, l2)
        var vel1 = bodyA.velocity;
        //var rel = this.relA;
        // l = bias - (vel1 + ang1 cross rel)
        var l0 = data[43] - (vel1[0] + (vel1[4] * data[8]) - (vel1[5] * data[7]));
        var l1 = data[44] - (vel1[1] + (vel1[5] * data[6]) - (vel1[3] * data[8]));
        var l2 = data[45] - (vel1[2] + (vel1[3] * data[7]) - (vel1[4] * data[6]));

        var vel2;
        if (bodyB)
        {
            vel2 = bodyB.velocity;
            //rel = this.relB;
            // l += vel2 + ang2 cross rel
            l0 += (vel2[0] + (vel2[4] * data[11]) - (vel2[5] * data[10]));
            l1 += (vel2[1] + (vel2[5] * data[9])  - (vel2[3] * data[11]));
            l2 += (vel2[2] + (vel2[3] * data[10]) - (vel2[4] * data[9]));
        }

        // compute, and accumulate impulse into (jAcc0, jAcc1, jAcc2)
        var gamma = data[33];
        //var K = this.K;
        // jAcc = jAcc * gamma + K * l
        jAcc0 = (jAcc0 * gamma) + (data[34] * l0) + (data[35] * l1) + (data[36] * l2);
        jAcc1 = (jAcc1 * gamma) + (data[35] * l0) + (data[37] * l1) + (data[38] * l2);
        jAcc2 = (jAcc2 * gamma) + (data[36] * l0) + (data[38] * l1) + (data[39] * l2);

        var clamp = data[32];
        if (clamp !== 0)
        {
            // clamp accumulated impulse.
            var jlsq = (jAcc0 * jAcc0) + (jAcc1 * jAcc1) + (jAcc2 * jAcc2);
            if (jlsq > clamp * clamp)
            {
                jlsq = clamp / Math.sqrt(jlsq);
                jAcc0 *= jlsq;
                jAcc1 *= jlsq;
                jAcc2 *= jlsq;
            }
        }

        // compute impulse to apply, and store new cached impulse.
        var j0 = jAcc0 - data[40];
        var j1 = jAcc1 - data[41];
        var j2 = jAcc2 - data[42];
        data[40] = jAcc0;
        data[41] = jAcc1;
        data[42] = jAcc2;

        // Apply impulse.
        var imass = bodyA.inverseMass;
        vel1[0] += (j0 * imass);
        vel1[1] += (j1 * imass);
        vel1[2] += (j2 * imass);

        //var I = this.skewA;
        vel1[3] -= ((data[12] * j0) + (data[15] * j1) + (data[18] * j2));
        vel1[4] -= ((data[13] * j0) + (data[16] * j1) + (data[19] * j2));
        vel1[5] -= ((data[14] * j0) + (data[17] * j1) + (data[20] * j2));

        if (bodyB)
        {
            imass = bodyB.inverseMass;
            vel2[0] -= (j0 * imass);
            vel2[1] -= (j1 * imass);
            vel2[2] -= (j2 * imass);

            //I = this.skewB;
            vel2[3] += ((data[21] * j0) + (data[24] * j1) + (data[27] * j2));
            vel2[4] += ((data[22] * j0) + (data[25] * j1) + (data[28] * j2));
            vel2[5] += ((data[23] * j0) + (data[26] * j1) + (data[29] * j2));
        }
    }
};

WebGLPhysicsPoint2PointConstraint.create = function Point2PointConstraintFn(params)
{
    var c = new WebGLPhysicsPoint2PointConstraint();
    var pc = new WebGLPhysicsPrivatePoint2PointConstraint();
    c._private = pc;

    initConstraintProperties(c, params);

    var data = pc.data;
    // read/write with side effects
    data[0] = params.pivotA[0];
    data[1] = params.pivotA[1];
    data[2] = params.pivotA[2];
    Object.defineProperty(c, "pivotA", {
        get : function point2pointGetPivotA()
        {
            var data = this._private.data;
            return VMath.v3Build(data[0], data[1], data[2]);
        },
        set : function point2pointSetPivotA(pivotA)
        {
            var data = this._private.data;
            data[0] = pivotA[0];
            data[1] = pivotA[1];
            data[2] = pivotA[2];
        },
        enumerable : true
    });

    // read/write with side effects
    // In the case that bodyB is not defined, we initialise pivot so that positional
    // error is 0.
    if (params.pivotB)
    {
        data[3] = params.pivotB[0];
        data[4] = params.pivotB[1];
        data[5] = params.pivotB[2];
    }
    else
    {
        var pivotB = VMath.m43TransformPoint(pc.bodyA.transform, params.pivotA);
        data[3] = pivotB[0];
        data[4] = pivotB[1];
        data[5] = pivotB[2];
    }
    Object.defineProperty(c, "pivotB", {
        get : function point2pointGetPivotB()
        {
            var data = this._private.data;
            return VMath.v3Build(data[3], data[4], data[5]);
        },
        set : function point2pointSetPivotB(pivotB)
        {
            var data = this._private.data;
            data[3] = pivotB[0];
            data[4] = pivotB[1];
            data[5] = pivotB[2];
        },
        enumerable : true
    });

    // read/write with no immediate side effects, but getter/setter required.
    data[30] = (params.force !== undefined) ? params.force : 0.3;
    Object.defineProperty(c, "force", {
        get : function point2pointGetForce()
        {
            return this._private.data[30];
        },
        set : function point2pointSetForce(force)
        {
            this._private.data[30] = force;
        },
        enumerable : true
    });

    // read/write with no immediate side effects, but getter/setter required.
    data[31] = (params.damping !== undefined) ? params.damping : 1.0;
    Object.defineProperty(c, "damping", {
        get : function point2pointGetForce()
        {
            return this._private.data[31];
        },
        set : function point2pointSetForce(damping)
        {
            this._private.data[31] = damping;
        },
        enumerable : true
    });

    // read/write with no immediate side effects, but getter/setter required.
    data[32] = (params.impulseClamp !== undefined) ? params.impulseClamp : 0.0;
    Object.defineProperty(c, "impulseClamp", {
        get : function point2pointGetForce()
        {
            return this._private.data[32];
        },
        set : function point2pointSetForce(impulseClamp)
        {
            this._private.data[32] = impulseClamp;
        },
        enumerable : true
    });

    return c;
};

//
// WebGL Physics Character
//
function WebGLPhysicsCharacter() {}
WebGLPhysicsCharacter.prototype = {

    version : 1,

    jump : function characterJumpFn()
    {
        var pc = this._private;
        var rigidBody = pc.rigidBody._private;
        var world = rigidBody.world;
        if (world)
        {
            rigidBody.velocity[1] = Math.sqrt(-2 * (this.maxJumpHeight - this.stepHeight) * world.gravity[1]);
            rigidBody.transform[10] += this.stepHeight;
            world.wakeBody(rigidBody);
        }
    },

    calculateExtents : function characterCalculateExtentsFn(extents)
    {
        this._private.rigidBody.calculateExtents(extents);
    }
};

function WebGLPhysicsPrivateCharacter()
{
    // Initialise all properties this object will ever hold.

    // Value of read/write property.
    this.crouch = false;
    this.dead = false;

    // Matrices re-used in all calls to onGround getter.
    this.start = VMath.m43BuildIdentity();
    this.end   = VMath.m43BuildIdentity();

    // Reference to created RigidBody representing Character.
    this.rigidBody = null;
}

WebGLPhysicsPrivateCharacter.prototype = {

    version : 1,

    onGroundConvexCallback : function onGroundConvexCallbackFn(hitResult)
    {
        // Less than cosine of 15 degrees.
        return hitResult.hitNormal[1] >= 0.26;
    }
};

WebGLPhysicsCharacter.create = function webGLPhysicsCharacterFn(params)
{
    var c = new WebGLPhysicsCharacter();
    var pc = new WebGLPhysicsPrivateCharacter();
    c._private = pc;

    // read/write, no side effects.
    c.userData = (params.userData !== undefined) ? params.userData : null;

    // read/write with side effects.
    Object.defineProperty(c, "crouch", {
        get : function getCharacterCrouchFn()
        {
            return this._private.crouch;
        },
        set : function setCharacterCrouchFn(crouch)
        {
            var pc = this._private;
            if (!pc.dead && crouch !== pc.crouch)
            {
                var rigidBody = pc.rigidBody._private;
                var capsule = rigidBody.shape;

                pc.crouch = crouch;
                if (crouch)
                {
                    capsule.halfHeight = ((this.crouchHeight * 0.5) - this.radius);
                    rigidBody.transform[10] -= ((this.height - this.crouchHeight) * 0.5);
                }
                else
                {
                    capsule.halfHeight = ((this.height * 0.5) - this.radius);
                    rigidBody.transform[10] += ((this.height - this.crouchHeight) * 0.5);
                }

                if (rigidBody.world)
                {
                    rigidBody.world.wakeBody(rigidBody);
                }
            }
        },
        enumerable : true
    });

    // read/write with side effects.
    Object.defineProperty(c, "dead", {
        get : function getCharacterDeadFn()
        {
            return this._private.dead;
        },
        set : function setCharacterDead(dead)
        {
            var pc = this._private;
            if (pc.dead !== dead)
            {
                var rigidBody = pc.rigidBody._private;
                var capsule = rigidBody.shape;

                pc.dead = dead;
                if (dead)
                {
                    capsule.halfHeight = 0;
                    rigidBody.transform[10] -= ((this.height - this.radius) * 0.5);
                }
                else
                {
                    capsule.halfHeight = ((this.height * 0.5) - this.radius);
                    rigidBody.transform[10] += ((this.height - this.radius) * 0.5);
                }

                if (rigidBody.world)
                {
                    rigidBody.world.wakeBody(rigidBody);
                }
            }
        },
        enumerable : true
    });

    // read only, no getter required.
    Object.defineProperty(c, "height", {
        value : params.height,
        enumerable : true
    });

    // read only, no getter required.
    Object.defineProperty(c, "radius", {
        value : params.radius,
        enumerable : true
    });

    // read only, no getter required
    Object.defineProperty(c, "stepHeight", {
        value : (params.stepHeight !== undefined) ? params.stepHeight : 0.35,
        enumerable : true
    });

    // read/write, no side effects so stored on actual object as standard property.
    c.maxJumpHeight = (params.maxJumpHeight !== undefined) ? params.maxJumpHeight : 1;

    // read only, no getter required
    Object.defineProperty(c, "crouchHeight", {
        value : (params.crouchHeight !== undefined) ? params.crouchHeight : (0.5 * params.height),
        enumerable : true
    });

    // read only, getter required.
    Object.defineProperty(c, "onGround", {
        get : function getCharacterOnGround()
        {
            var pc = this._private;
            var rigidBody = pc.rigidBody._private;

            if (rigidBody.world)
            {
                var pos = rigidBody.transform;
                var start = pc.start;
                var end   = pc.end;

                start[9]  = pos[9];
                start[10] = pos[10];
                start[11] = pos[11];

                end[9]  = pos[9];
                end[10] = (pos[10] - (this.stepHeight * 0.5));
                end[11] = pos[11];

                var result = rigidBody.world.convexSweepTest({
                        shape: rigidBody.shape._public,
                        from: start,
                        to: end,
                        group: WebGLPhysicsDevice.prototype.FILTER_CHARACTER
                    },
                    this.onGroundConvexCallback
                );
                return (result !== null);
            }
            else
            {
                return false;
            }
        },
        enumerable : true
    });

    // read/write with side effects.
    Object.defineProperty(c, "position", {
        get : function getCharacterPosition()
        {
            var rigidBody = this._private.rigidBody;
            return VMath.m43Pos(rigidBody._private.transform);
        },
        set : function setCharacterPosition(position)
        {
            var rigidBody = this._private.rigidBody;
            var transform = rigidBody._private.transform;
            transform[9]  = position[0];
            transform[10] = position[1];
            transform[11] = position[2];
            rigidBody.transform = rigidBody._private.transform; //invoke setter.
            rigidBody.active = true;
        },
        enumerable : true
    });

    // read/write with side effects.
    Object.defineProperty(c, "velocity", {
        get : function getCharacterVelocity()
        {
            var rigidBody = this._private.rigidBody;
            return rigidBody.linearVelocity;
        },
        set : function setCharacterVelocity(velocity)
        {
            var rigidBody = this._private.rigidBody;
            rigidBody.linearVelocity = velocity;
            rigidBody.active = true;
        },
        enumerable : true
    });

    // read only, no getter required.
    var group = (params.group !== undefined) ? params.group : WebGLPhysicsDevice.prototype.FILTER_CHARACTER;
    Object.defineProperty(c, "group", {
        value : group,
        enumerable : true
    });

    // read only, no getter required.
    var mask  = (params.mask !== undefined) ? params.mask : WebGLPhysicsDevice.prototype.FILTER_ALL;
    Object.defineProperty(c, "mask", {
        value : mask,
        enumerable : true
    });

    // Create inner RigidBody with Capsule shape.
    var capsule = WebGLPhysicsCapsuleShape.create({
        radius : c.radius,
        height : (2 * ((c.height * 0.5) - c.radius)),
        margin : 0
    });

    var rigidBody = WebGLPhysicsRigidBody.create({
        shape : capsule,
        mass : params.mass,
        transform : params.transform,
        linearVelocity : params.velocity,
        group : group,
        mask : mask,
        friction : params.friction,
        restitution : params.restitution,
        linearDamping : params.linearDamping,
        angularDamping : params.angularDamping,
        fixedRotation : true
    });

    // private (But internals like dynamics world need access through this object).
    pc.rigidBody = rigidBody;
    // Back reference to this public character, so that rayTests and convexSweeps
    // can in the case of intersecting a rigid body that represents a character,
    // return the character instead!
    rigidBody._private._public = c;

    return c;
};

//
// WebGL GJK Contact Solver
//
function WebGLGJKContactSolver() {}
WebGLGJKContactSolver.prototype = {

    version : 1,

    removeVertex : function removeVertexFn(index)
    {
        this.numVertices -= 1;

        var simplex = this.simplex;
        var replace = (index * 9);
        var withv = (this.numVertices * 9);

        simplex[replace]     = simplex[withv];
        simplex[replace + 1] = simplex[withv + 1];
        simplex[replace + 2] = simplex[withv + 2];
        simplex[replace + 3] = simplex[withv + 3];
        simplex[replace + 4] = simplex[withv + 4];
        simplex[replace + 5] = simplex[withv + 5];
        simplex[replace + 6] = simplex[withv + 6];
        simplex[replace + 7] = simplex[withv + 7];
        simplex[replace + 8] = simplex[withv + 8];
    },

    reduceVertices : function reduceVerticesFn(coords)
    {
        // NOTE: NOT USING EPSILON
        //
        // To avoid necessitating carrying 4 additional
        // boolean fields to mark coordinates as being
        // used or for deletion, the barycentric
        // coordinates are used to infer this property
        // instead. so strict equality with 0 is needed.
        if (this.numVertices >= 4 && coords[3] === 0)
        {
            this.numVertices -= 1;
        }

        var simplex = this.simplex;
        var withv;
        if (this.numVertices >= 3 && coords[2] === 0)
        {
            this.numVertices -= 1;
            withv = (this.numVertices * 9);
            simplex[18] = simplex[withv];
            simplex[19] = simplex[withv + 1];
            simplex[20] = simplex[withv + 2];
            simplex[21] = simplex[withv + 3];
            simplex[22] = simplex[withv + 4];
            simplex[23] = simplex[withv + 5];
            simplex[24] = simplex[withv + 6];
            simplex[25] = simplex[withv + 7];
            simplex[26] = simplex[withv + 8];
        }

        if (this.numVertices >= 2 && coords[1] === 0)
        {
            this.numVertices -= 1;
            withv = (this.numVertices * 9);
            simplex[9]  = simplex[withv];
            simplex[10] = simplex[withv + 1];
            simplex[11] = simplex[withv + 2];
            simplex[12] = simplex[withv + 3];
            simplex[13] = simplex[withv + 4];
            simplex[14] = simplex[withv + 5];
            simplex[15] = simplex[withv + 6];
            simplex[16] = simplex[withv + 7];
            simplex[17] = simplex[withv + 8];
        }

        if (this.numVertices >= 1 && coords[0] === 0)
        {
            this.numVertices -= 1;
            withv = (this.numVertices * 9);
            simplex[0] = simplex[withv];
            simplex[1] = simplex[withv + 1];
            simplex[2] = simplex[withv + 2];
            simplex[3] = simplex[withv + 3];
            simplex[4] = simplex[withv + 4];
            simplex[5] = simplex[withv + 5];
            simplex[6] = simplex[withv + 6];
            simplex[7] = simplex[withv + 7];
            simplex[8] = simplex[withv + 8];
        }
    },

    updateClosestPoints : function updateClosestPointsFn()
    {
        var numVertices = this.numVertices;
        if (numVertices === 0)
        {
            return false;
        }

        // ----------------------------------------
        // single vertex, only one candidate point.

        var simplex = this.simplex;
        var closest = this.closest;
        var i;

        if (numVertices === 1)
        {
            closest[0] = simplex[3];
            closest[1] = simplex[4];
            closest[2] = simplex[5];
            closest[3] = simplex[6];
            closest[4] = simplex[7];
            closest[5] = simplex[8];
            return true;
        }

        // ----------------------------------------
        // two vertices, find closest point on line

        var a0 = simplex[0];
        var a1 = simplex[1];
        var a2 = simplex[2];

        var b0 = simplex[9];
        var b1 = simplex[10];
        var b2 = simplex[11];

        if (numVertices === 2)
        {
            var w0 = (a0 - b0);
            var w1 = (a1 - b1);
            var w2 = (a2 - b2);

            var dot = ((a0 * w0) + (a1 * w1) + (a2 * w2));
            if (dot > 0)
            {
                var wlsq = ((w0 * w0) + (w1 * w1) + (w2 * w2));
                if (dot < wlsq)
                {
                    dot /= wlsq;
                    var dot1 = (1.0 - dot);

                    closest[0] = ((simplex[3] * dot1) + (simplex[12] * dot));
                    closest[1] = ((simplex[4] * dot1) + (simplex[13] * dot));
                    closest[2] = ((simplex[5] * dot1) + (simplex[14] * dot));
                    closest[3] = ((simplex[6] * dot1) + (simplex[15] * dot));
                    closest[4] = ((simplex[7] * dot1) + (simplex[16] * dot));
                    closest[5] = ((simplex[8] * dot1) + (simplex[17] * dot));

                    return true;
                }
                else
                {
                    this.removeVertex(0);
                }
            }
            else
            {
                this.removeVertex(1);
            }

            for (i = 0; i < 6; i += 1)
            {
                closest[i] = simplex[i + 3];
            }

            return true;
        }

        // ----------------------------------------
        // 3 vertices, find closest point in triangle

        var coords = this.cachedCoords;
        var alpha, beta, gamma;

        if (numVertices === 3)
        {
            this.closestPointTriangle(0, 9, 18, coords);
            this.reduceVertices(coords);

            alpha = coords[0];
            beta = coords[1];
            gamma = coords[2];

            closest[0] = ((alpha * simplex[3]) + (beta * simplex[12]) + (gamma * simplex[21]));
            closest[1] = ((alpha * simplex[4]) + (beta * simplex[13]) + (gamma * simplex[22]));
            closest[2] = ((alpha * simplex[5]) + (beta * simplex[14]) + (gamma * simplex[23]));
            closest[3] = ((alpha * simplex[6]) + (beta * simplex[15]) + (gamma * simplex[24]));
            closest[4] = ((alpha * simplex[7]) + (beta * simplex[16]) + (gamma * simplex[25]));
            closest[5] = ((alpha * simplex[8]) + (beta * simplex[17]) + (gamma * simplex[26]));

            return true;
        }

        // ----------------------------------------
        // 4 vertices, find closest point in tetrahedron

        if (numVertices === 4)
        {
            var outside = this.closestPointTetrahedron(coords);
            if (outside)
            {
                this.reduceVertices(coords);

                alpha = coords[0];
                beta = coords[1];
                gamma = coords[2];
                var delta = coords[3];

                closest[0] = ((alpha * simplex[3]) + (beta * simplex[12]) + (gamma * simplex[21]) + (delta * simplex[30]));
                closest[1] = ((alpha * simplex[4]) + (beta * simplex[13]) + (gamma * simplex[22]) + (delta * simplex[31]));
                closest[2] = ((alpha * simplex[5]) + (beta * simplex[14]) + (gamma * simplex[23]) + (delta * simplex[32]));
                closest[3] = ((alpha * simplex[6]) + (beta * simplex[15]) + (gamma * simplex[24]) + (delta * simplex[33]));
                closest[4] = ((alpha * simplex[7]) + (beta * simplex[16]) + (gamma * simplex[25]) + (delta * simplex[34]));
                closest[5] = ((alpha * simplex[8]) + (beta * simplex[17]) + (gamma * simplex[26]) + (delta * simplex[35]));

                return true;
            }
            else
            {
                return false;
            }
        }

        return false;
    },

    closestPointTetrahedron : function closestPointTetrahedron(coords)
    {
        var simplex = this.simplex;

        var a0 = simplex[0];
        var a1 = simplex[1];
        var a2 = simplex[2];

        var b0 = simplex[9];
        var b1 = simplex[10];
        var b2 = simplex[11];

        var c0 = simplex[18];
        var c1 = simplex[19];
        var c2 = simplex[20];

        var d0 = simplex[27];
        var d1 = simplex[28];
        var d2 = simplex[29];

        var ab0 = (b0 - a0);
        var ab1 = (b1 - a1);
        var ab2 = (b2 - a2);

        var ac0 = (c0 - a0);
        var ac1 = (c1 - a1);
        var ac2 = (c2 - a2);

        var ad0 = (d0 - a0);
        var ad1 = (d1 - a1);
        var ad2 = (d2 - a2);

        var bc0 = (c0 - b0);
        var bc1 = (c1 - b1);
        var bc2 = (c2 - b2);

        var bd0 = (d0 - b0);
        var bd1 = (d1 - b1);
        var bd2 = (d2 - b2);

        var n0, n1, n2, signD, signOrigin;

        n0 = ((ab1 * ac2) - (ab2 * ac1));
        n1 = ((ab2 * ac0) - (ab0 * ac2));
        n2 = ((ab0 * ac1) - (ab1 * ac0));
        signD = ((ad0 * n0) + (ad1 * n1) + (ad2 * n2));
        signOrigin = - ((a0 * n0) + (a1 * n1) + (a2 * n2));
        var sideABC = ((signOrigin * signD) <= 0);

        n0 = ((ac1 * ad2) - (ac2 * ad1));
        n1 = ((ac2 * ad0) - (ac0 * ad2));
        n2 = ((ac0 * ad1) - (ac1 * ad0));
        signD = ((ab0 * n0) + (ab1 * n1) + (ab2 * n2));
        signOrigin = - ((a0 * n0) + (a1 * n1) + (a2 * n2));
        var sideACD = ((signOrigin * signD) <= 0);

        n0 = ((ad1 * ab2) - (ad2 * ab1));
        n1 = ((ad2 * ab0) - (ad0 * ab2));
        n2 = ((ad0 * ab1) - (ad1 * ab0));
        signD = ((ac0 * n0) + (ac1 * n1) + (ac2 * n2));
        signOrigin = - ((a0 * n0) + (a1 * n1) + (a2 * n2));
        var sideADB = ((signOrigin * signD) <= 0);

        n0 = ((bd1 * bc2) - (bd2 * bc1));
        n1 = ((bd2 * bc0) - (bd0 * bc2));
        n2 = ((bd0 * bc1) - (bd1 * bc0));
        signD = ((ab0 * n0) + (ab1 * n1) + (ab2 * n2));
        signOrigin = ((b0 * n0) + (b1 * n1) + (b2 * n2));
        var sideBDC = ((signOrigin * signD) <= 0);

        coords[0] = coords[1] = coords[2] = coords[3] = 0.0;

        // inclusion
        if (!sideABC && !sideACD && !sideADB && !sideBDC)
        {
            return false;
        }

        var tempCoords = this.tempCoords;
        var minSqDist = Number.MAX_VALUE;
        var sqDist;

        if (sideABC)
        {
            sqDist = this.closestPointTriangle(0, 9, 18, tempCoords, true);
            if (sqDist < minSqDist)
            {
                minSqDist = sqDist;
                coords[0] = tempCoords[0];
                coords[1] = tempCoords[1];
                coords[2] = tempCoords[2];
                coords[3] = 0.0;
            }
        }

        if (sideACD)
        {
            sqDist = this.closestPointTriangle(0, 18, 27, tempCoords, true);
            if (sqDist < minSqDist)
            {
                minSqDist = sqDist;
                coords[0] = tempCoords[0];
                coords[1] = 0.0;
                coords[2] = tempCoords[1];
                coords[3] = tempCoords[2];
            }
        }

        if (sideADB)
        {
            sqDist = this.closestPointTriangle(0, 27, 9, tempCoords, true);
            if (sqDist < minSqDist)
            {
                minSqDist = sqDist;
                coords[0] = tempCoords[0];
                coords[1] = tempCoords[2];
                coords[2] = 0.0;
                coords[3] = tempCoords[1];
            }
        }

        if (sideBDC)
        {
            sqDist = this.closestPointTriangle(9, 27, 18, tempCoords, true);
            if (sqDist < minSqDist)
            {
                minSqDist = sqDist;
                coords[0] = 0.0;
                coords[1] = tempCoords[0];
                coords[2] = tempCoords[2];
                coords[3] = tempCoords[1];
            }
        }

        return true;
    },

    closestPointTriangle : function closestPointTriangleFn(a, b, c, coords, computeDistance)
    {
        var simplex = this.simplex;

        var a0 = simplex[a];
        var a1 = simplex[a + 1];
        var a2 = simplex[a + 2];

        var b0 = simplex[b];
        var b1 = simplex[b + 1];
        var b2 = simplex[b + 2];

        var c0 = simplex[c];
        var c1 = simplex[c + 1];
        var c2 = simplex[c + 2];

        var ba0 = (a0 - b0);
        var ba1 = (a1 - b1);
        var ba2 = (a2 - b2);

        var ca0 = (a0 - c0);
        var ca1 = (a1 - c1);
        var ca2 = (a2 - c2);

        var dot1 = ((a0 * ba0) + (a1 * ba1) + (a2 * ba2));
        var dot2 = ((a0 * ca0) + (a1 * ca1) + (a2 * ca2));
        if (dot1 <= 0.0 && dot2 <= 0) // Origin in region outside of A
        {
            coords[0] = 1;
            coords[1] = coords[2] = 0;
            if (computeDistance)
            {
                return ((a0 * a0) + (a1 * a1) + (a2 * a2));
            }
            else
            {
                return undefined;
            }
        }

        var dot3 = ((b0 * ba0) + (b1 * ba1) + (b2 * ba2));
        var dot4 = ((b0 * ca0) + (b1 * ca1) + (b2 * ca2));
        if (dot3 >= 0.0 && dot4 <= dot3) // Origin in region outside of B
        {
            coords[1] = 1;
            coords[0] = coords[2] = 0;
            if (computeDistance)
            {
                return ((b0 * b0) + (b1 * b1) + (b2 * b2));
            }
            else
            {
                return undefined;
            }
        }

        var v;
        var d0, d1, d2;

        var vc = ((dot1 * dot4) - (dot3 * dot2));
        if (vc <= 0.0 && dot1 >= 0.0 && dot3 <= 0.0) // Origin in region outside A-B
        {
            v = (dot1 / (dot1 - dot3));
            coords[0] = (1 - v);
            coords[1] = v;
            coords[2] = 0;
            if (computeDistance)
            {
                d0 = (a0 - (v * ba0));
                d1 = (a1 - (v * ba1));
                d2 = (a2 - (v * ba2));
                return ((d0 * d0) + (d1 * d1) + (d2 * d2));
            }
            else
            {
                return undefined;
            }
        }

        var dot5 = ((c0 * ba0) + (c1 * ba1) + (c2 * ba2));
        var dot6 = ((c0 * ca0) + (c1 * ca1) + (c2 * ca2));
        if (dot6 >= 0.0 && dot5 <= dot6) // Origin in region outsiode of C
        {
            coords[0] = coords[1] = 0;
            coords[2] = 1;
            if (computeDistance)
            {
                return ((c0 * c0) + (c1 * c1) + (c2 * c2));
            }
            else
            {
                return undefined;
            }
        }

        var vb = ((dot5 * dot2) - (dot1 * dot6));
        if (vb <= 0.0 && dot2 >= 0.0 && dot6 <= 0.0) // Origin in region outside of A-C
        {
            v = (dot2 / (dot2 - dot6));
            coords[0] = (1 - v);
            coords[1] = 0;
            coords[2] = v;
            if (computeDistance)
            {
                d0 = (a0 - (v * ca0));
                d1 = (a1 - (v * ca1));
                d2 = (a2 - (v * ca2));
                return ((d0 * d0) + (d1 * d1) + (d2 * d2));
            }
            else
            {
                return undefined;
            }
        }

        var va = ((dot3 * dot6) - (dot5 * dot4));
        if (va <= 0.0 && (dot4 - dot3) >= 0.0 && (dot5 - dot6) >= 0.0) // Origin in region outside of B-C
        {
            v = ((dot4 - dot3) / ((dot4 - dot3) + (dot5 - dot6)));
            coords[0] = 0;
            coords[1] = (1 - v);
            coords[2] = v;
            if (computeDistance)
            {
                d0 = ((b0 * (1 - v)) + (c0 * v));
                d1 = ((b1 * (1 - v)) + (c1 * v));
                d2 = ((b2 * (1 - v)) + (c2 * v));
                return ((d0 * d0) + (d1 * d1) + (d2 * d2));
            }
            else
            {
                return undefined;
            }
        }

        // Origin contained in triangle region
        var denom = (1 / (va + vb + vc));
        v = (vb * denom);
        var w = (vc * denom);
        coords[0] = (1 - v - w);
        coords[1] = v;
        coords[2] = w;
        if (computeDistance)
        {
            d0 = (a0 - (ba0 * v) - (ca0 * w));
            d1 = (a1 - (ba1 * v) - (ca1 * w));
            d2 = (a2 - (ba2 * v) - (ca2 * w));
            return ((d0 * d0) + (d1 * d1) + (d2 * d2));
        }
        else
        {
            return undefined;
        }
    },

    //
    // cache having properties
    //   shapeA
    //   shapeB
    //   axis <-- to be mutated by this function
    //      'on' objectB.
    //   closestA <-- to be populated by this function
    //   closestB <-- to be populated by this function
    evaluate : function gjkEvaluateFn(cache, xformA, xformB)
    {
        var axis = cache.axis;
        var shapeA = cache.shapeA;
        var shapeB = cache.shapeB;

        // Reset GJK.
        this.numVertices = 0;
        var lastW0, lastW1, lastW2;
        lastW0 = lastW1 = lastW2 = Number.MAX_VALUE;

        var curIter = 0;
        var maxIter = 100;
        var seperated = false;

        var squaredDistance = Number.MAX_VALUE;

        // Cached for frequent access.
        var A0 = xformA[0];
        var A1 = xformA[1];
        var A2 = xformA[2];
        var A3 = xformA[3];
        var A4 = xformA[4];
        var A5 = xformA[5];
        var A6 = xformA[6];
        var A7 = xformA[7];
        var A8 = xformA[8];
        var A9 = xformA[9];
        var A10 = xformA[10];
        var A11 = xformA[11];

        var B0 = xformB[0];
        var B1 = xformB[1];
        var B2 = xformB[2];
        var B3 = xformB[3];
        var B4 = xformB[4];
        var B5 = xformB[5];
        var B6 = xformB[6];
        var B7 = xformB[7];
        var B8 = xformB[8];
        var B9 = xformB[9];
        var B10 = xformB[10];
        var B11 = xformB[11];

        var axis0 = axis[0];
        var axis1 = axis[1];
        var axis2 = axis[2];
        var axislsq;

        var supportA = cache.closestA;
        var supportB = cache.closestB;

        var closest = this.closest;
        var simplex = this.simplex;

        // Epsilon defined based on rough experimental result.
        var equalVertexThreshold = 1e-4;

        for (;;)
        {
            curIter += 1;

            // supportA = xformA * shapeA.localSupport ( - ixformA * axis)
            // supportB = xformB * shapeB.localSupport (   ixformB * axis)
            //this.m43InverseOrthonormalTransformVector(xformA, axis, supportA);
            //VMath.v3Neg(supportA, supportA);
            supportA[0] = -((A0 * axis0) + (A1 * axis1) + (A2 * axis2));
            supportA[1] = -((A3 * axis0) + (A4 * axis1) + (A5 * axis2));
            supportA[2] = -((A6 * axis0) + (A7 * axis1) + (A8 * axis2));

            //this.m43InverseOrthonormalTransformVector(xformB, axis, supportB);
            supportB[0] = ((B0 * axis0) + (B1 * axis1) + (B2 * axis2));
            supportB[1] = ((B3 * axis0) + (B4 * axis1) + (B5 * axis2));
            supportB[2] = ((B6 * axis0) + (B7 * axis1) + (B8 * axis2));

            shapeA.localSupportWithoutMargin(supportA, supportA);
            shapeB.localSupportWithoutMargin(supportB, supportB);

            //VMath.m43TransformPoint(xformA, supportA, supportA);
            var d0 = supportA[0];
            var d1 = supportA[1];
            var d2 = supportA[2];
            var sa0 = supportA[0] = ((A0 * d0) + (A3 * d1) + (A6 * d2) + A9);
            var sa1 = supportA[1] = ((A1 * d0) + (A4 * d1) + (A7 * d2) + A10);
            var sa2 = supportA[2] = ((A2 * d0) + (A5 * d1) + (A8 * d2) + A11);

            //VMath.m43TransformPoint(xformB, supportB, supportB);
            d0 = supportB[0];
            d1 = supportB[1];
            d2 = supportB[2];
            var sb0 = supportB[0] = ((B0 * d0) + (B3 * d1) + (B6 * d2) + B9);
            var sb1 = supportB[1] = ((B1 * d0) + (B4 * d1) + (B7 * d2) + B10);
            var sb2 = supportB[2] = ((B2 * d0) + (B5 * d1) + (B8 * d2) + B11);

            //VMath.v3Sub(supportA, supportB, w);
            var w0 = sa0 - sb0;
            var w1 = sa1 - sb1;
            var w2 = sa2 - sb2;

            // If point is already in simplex, then we have reached closest point to origin
            // and minkowski difference does not intersect origin.
            var inSimplex = false;
            var index = this.numVertices * 9;
            var i;
            for (i = 0; i < index; i += 9)
            {
                d0 = (w0 - simplex[i]);
                d1 = (w1 - simplex[i + 1]);
                d2 = (w2 - simplex[i + 2]);
                if (((d0 * d0) + (d1 * d1) + (d2 * d2)) < equalVertexThreshold)
                {
                    inSimplex = true;
                }
            }

            // Additionaly check against previously inserted vertex which may have been
            // removed and prevent endless oscillation.
            if (!inSimplex)
            {
                d0 = (w0 - lastW0);
                d1 = (w1 - lastW1);
                d2 = (w2 - lastW2);
                inSimplex = ((d0 * d0) + (d1 * d1) + (d2 * d2)) < equalVertexThreshold;
            }

            if (inSimplex)
            {
                seperated = true;
                break;
            }

            //delta = VMath.v3Dot(axis, w);
            var delta = (axis0 * w0) + (axis1 * w1) + (axis2 * w2);

            // Check that we are getting closer
            // If not (within epsilon) we are very roughly at closest point
            // and should terminate!
            //
            if ((squaredDistance - delta) <= (squaredDistance * WebGLPhysicsConfig.GJK_FRACTIONAL_THRESHOLD))
            {
                seperated = true;
                break;
            }

            // Add vertex to simplex.
            lastW0 = simplex[index] = w0;
            lastW1 = simplex[index + 1] = w1;
            lastW2 = simplex[index + 2] = w2;
            simplex[index + 3] = sa0;
            simplex[index + 4] = sa1;
            simplex[index + 5] = sa2;
            simplex[index + 6] = sb0;
            simplex[index + 7] = sb1;
            simplex[index + 8] = sb2;
            this.numVertices += 1;

            // If we cannot find a seperating axis
            // Then shapes are intersecting!
            if (!this.updateClosestPoints())
            {
                seperated = false;
                break;
            }

            d0 = (closest[0] - closest[3]);
            d1 = (closest[1] - closest[4]);
            d2 = (closest[2] - closest[5]);

            // If seperation distance is very (very) small
            // Then we assume shapes are intersecting.
            axislsq = ((d0 * d0) + (d1 * d1) + (d2 * d2));
            if (axislsq <= WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
            {
                seperated = true;
                break;
            }

            // Prepare for next iteration.
            //VMath.v3Copy(newaxis, axis);
            axis0 = d0;
            axis1 = d1;
            axis2 = d2;

            // Check that we are getting closer with true distances
            // If not, terminate!
            var previousSqDistance = squaredDistance;
            squaredDistance = axislsq;

            if ((previousSqDistance - squaredDistance) <= (WebGLPhysicsConfig.GJK_FRACTIONAL_THRESHOLD * previousSqDistance))
            {
                seperated = true;
                break;
            }

            if (curIter >= maxIter)
            {
                seperated = true;
                break;
            }

            // We already have a full simplex
            // Next iteration would add too many vertices
            // So we must be intersecting
            if (this.numVertices === 4)
            {
                break;
            }
        }

        // If we cannot normalise axis, then necessarigly
        // seperated = false.
        // We do not zero the axis, as it is still useful enough for EPA.
        axislsq = ((axis0 * axis0) + (axis1 * axis1) + (axis2 * axis2));
        if (axislsq < WebGLPhysicsConfig.DONT_NORMALIZE_THRESHOLD)
        {
            axis[0] = axis0;
            axis[1] = axis1;
            axis[2] = axis2;
            return undefined;
        }

        // Normalise axis whether GJK failed or succeeded:
        // Is useful information for futher investigations.
        var scale = 1 / Math.sqrt(axislsq);
        axis[0] = axis0 * scale;
        axis[1] = axis1 * scale;
        axis[2] = axis2 * scale;

        if (seperated)
        {
            // Get closest points in simplex.
            supportA[0] = closest[0];
            supportA[1] = closest[1];
            supportA[2] = closest[2];

            supportB[0] = closest[3];
            supportB[1] = closest[4];
            supportB[2] = closest[5];

            return Math.sqrt(squaredDistance);
        }
        else
        {
            return undefined;
        }
    }
};

WebGLGJKContactSolver.create = function WebGLGJKContactSolverFn()
{
    var solver = new WebGLGJKContactSolver();

    // current simplex with vertices W = P - Q, generated by points P and Q
    // [ W00 W01 W02 P01 P02 P03 Q01 Q02 Q03 ... ]
    solver.simplex = new Float32Array(36);
    solver.numVertices = 0;

    // on update closest points defined by W = P - Q stored here.
    solver.closest = new Float32Array(6);

    solver.cachedCoords = new Float32Array(4);
    solver.tempCoords = new Float32Array(4);

    return solver;
};

//
// WebGL Contact EPA
//
function WebGLContactEPA() {}
WebGLContactEPA.prototype = {

    version : 1,

    MAX_VERTICES : 64,
    MAX_FACES : 128,

    bind : function bindFn(faceA, edgeA, faceB, edgeB)
    {
        faceA.edge[edgeA] = edgeB;
        faceA.adjFace[edgeA] = faceB;
        faceB.edge[edgeB] = edgeA;
        faceB.adjFace[edgeB] = faceA;
    },

    append : function appendFn(list, face)
    {
        face.leaf0 = null;
        face.leaf1 = list.root;
        if (list.root)
        {
            list.root.leaf0 = face;
        }
        list.root = face;
        list.count += 1;
    },

    remove : function removeFn(list, face)
    {
        var leaf0 = face.leaf0;
        var leaf1 = face.leaf1;
        if (leaf1)
        {
            leaf1.leaf0 = leaf0;
        }
        if (leaf0)
        {
            leaf0.leaf1 = leaf1;
        }
        if (face === list.root)
        {
            list.root = leaf1;
        }
        list.count -= 1;
    },

    findBest : function findBestFn()
    {
        var minFace = this.hull.root;
        var minDistance = minFace.distance * minFace.distance;
        var f;
        for (f = minFace.leaf1; f !== null; f = f.leaf1)
        {
            var sqDistance = f.distance * f.distance;
            if (sqDistance < minDistance)
            {
                minFace = f;
                minDistance = sqDistance;
            }
        }

        return minFace;
    },

    getEdgeDistance : function getEdgeDistanceFn(face, a, b)
    {
        var vertices = this.vertex_store;

        var a0 = vertices[a];
        var a1 = vertices[a + 1];
        var a2 = vertices[a + 2];

        var b0 = vertices[b];
        var b1 = vertices[b + 1];
        var b2 = vertices[b + 2];

        var ba0 = (b0 - a0);
        var ba1 = (b1 - a1);
        var ba2 = (b2 - a2);
        // outward facing edge normal on triangle plane

        var fn = face.normal;
        var fn0 = fn[0];
        var fn1 = fn[1];
        var fn2 = fn[2];

        var n0 = ((ba1 * fn2) - (ba2 * fn1));
        var n1 = ((ba2 * fn0) - (ba0 * fn2));
        var n2 = ((ba0 * fn1) - (ba1 * fn0));

        var dot = ((a0 * n0) + (a1 * n1) + (a2 * n2));
        if (dot <= 0)
        {
            //outside of edge A-B
            var lengthSqBA = ((ba0 * ba0) + (ba1 * ba1) + (ba2 * ba2));
            var dotA = ((a0 * ba0) + (a1 * ba1) + (a2 * ba2));
            var dotB = ((b0 * ba0) + (b1 * ba2) + (b2 * ba2));

            if (dotA >= 0)
            {
                //outside of vertex A
                return Math.sqrt((a0 * a0) + (a1 * a1) + (a2 * a2));
            }
            else if (dotB <= 0)
            {
                //outside of vertex B
                return Math.sqrt((b0 * b0) + (b1 * b1) + (b2 * b2));
            }
            else
            {
                var dotAB = ((a0 * b0) + (a1 * b1) + (a2 * b2));
                var dSq = (((a0 * a0) + (a1 * a1) + (a2 * a2)) * ((b0 * b0) + (b1 * b1) + (b2 * b2))) -
                          (dotAB * dotAB);
                return dSq >= 0 ? Math.sqrt(dSq / lengthSqBA) : 0;
            }
        }
        else
        {
            return undefined;
        }
    },

    buildNewFace : function buildNewFaceFn(a, b, c, forced)
    {
        var face = this.stock.root;
        if (face === null)
        {
            return null;
        }

        face.pass = 0;
        face.vertex[0] = a;
        face.vertex[1] = b;
        face.vertex[2] = c;

        var vertices = this.vertex_store;

        var a0 = vertices[a];
        var a1 = vertices[a + 1];
        var a2 = vertices[a + 2];

        var b0 = vertices[b];
        var b1 = vertices[b + 1];
        var b2 = vertices[b + 2];

        var c0 = vertices[c];
        var c1 = vertices[c + 1];
        var c2 = vertices[c + 2];

        var ba0 = (b0 - a0);
        var ba1 = (b1 - a1);
        var ba2 = (b2 - a2);

        var ca0 = (c0 - a0);
        var ca1 = (c1 - a1);
        var ca2 = (c2 - a2);

        var fn = face.normal;
        var fn0 = fn[0] = ((ba1 * ca2) - (ba2 * ca1));
        var fn1 = fn[1] = ((ba2 * ca0) - (ba0 * ca2));
        var fn2 = fn[2] = ((ba0 * ca1) - (ba1 * ca0));
        var length = ((fn0 * fn0) + (fn1 * fn1) + (fn2 * fn2));

        if (length > WebGLPhysicsConfig.DONT_NORMALIZE_THRESHOLD)
        {
            face.distance = this.getEdgeDistance(face, a, b);

            if (face.distance === undefined)
            {
                face.distance = this.getEdgeDistance(face, b, c);
            }

            if (face.distance === undefined)
            {
                face.distance = this.getEdgeDistance(face, c, a);
            }

            var scale = 1 / Math.sqrt(length);
            if (face.distance === undefined)
            {
                // Origin must be closest to triangle plane.
                face.distance = ((a0 * fn0) + (a1 * fn1) + (a2 * fn2)) * scale;
            }

            // Epsilon based on rough experimental result.
            // Negative epsilon 'not' a typo!
            if (forced || (face.distance >= -1e-6))
            {
                fn[0] *= scale;
                fn[1] *= scale;
                fn[2] *= scale;

                // Success!
                this.remove(this.stock, face);
                this.append(this.hull, face);
                return face;
            }
        }

        return null;
    },

    expandFace : function expandFaceFn(pass, w, face, edge, horizon)
    {
        if (face.pass !== pass)
        {
            var fn = face.normal;
            var fn0 = fn[0];
            var fn1 = fn[1];
            var fn2 = fn[2];

            var vertices = this.vertex_store;
            var w0 = vertices[w];
            var w1 = vertices[w + 1];
            var w2 = vertices[w + 2];

            var edge1 = (edge + 1) % 3;
            // Epsilon based on rough experimental result
            // Negative epsilon 'not' a typo!
            if ((((fn0 * w0) + (fn1 * w1) + (fn2 * w2)) - face.distance) < -1e-6)
            {
                var newFace = this.buildNewFace(face.vertex[edge1], face.vertex[edge], w, false);
                if (newFace)
                {
                    this.bind(newFace, 0, face, edge);
                    if (horizon.cf)
                    {
                        this.bind(horizon.cf, 1, newFace, 2);
                    }
                    else
                    {
                        horizon.ff = newFace;
                    }
                    horizon.cf = newFace;
                    horizon.numFaces += 1;
                    return true;
                }
            }
            else
            {
                var edge2 = (edge + 2) % 3;
                face.pass = pass;
                if (this.expandFace(pass, w, face.adjFace[edge1], face.edge[edge1], horizon) &&
                    this.expandFace(pass, w, face.adjFace[edge2], face.edge[edge2], horizon))
                {
                    this.remove(this.hull, face);
                    this.append(this.stock, face);
                    return true;
                }
            }
        }

        return false;
    },

    //
    // cache having properties
    //   shapeA
    //   shapeB
    //   axis <-- to be mutated by this function
    //     'on' object B.
    //   closestA <-- to be populated by this function
    //   closestB <-- to be populated by this function
    evaluate : function epaEvaluateFn(gjkSimplex, cache, xformA, xformB)
    {
        var shapeA = cache.shapeA;
        var shapeB = cache.shapeB;

        var hull = this.hull;
        var stock = this.stock;

        // Clean up after last evaluation
        while (hull.root)
        {
            var face = hull.root;
            this.remove(hull, face);
            this.append(stock, face);
        }

        // Orient simplex based on volume of tetrahedron
        var d0 = gjkSimplex[27];
        var d1 = gjkSimplex[28];
        var d2 = gjkSimplex[29];
        var ind0, ind1;

        var a0 = gjkSimplex[0] - d0;
        var a1 = gjkSimplex[1] - d1;
        var a2 = gjkSimplex[2] - d2;
        var b0 = gjkSimplex[9] - d0;
        var b1 = gjkSimplex[10] - d1;
        var b2 = gjkSimplex[11] - d2;
        var c0 = gjkSimplex[18] - d0;
        var c1 = gjkSimplex[19] - d1;
        var c2 = gjkSimplex[20] - d2;

        if (((a0 * ((b1 * c2) - (b2 * c1))) +
             (a1 * ((b2 * c0) - (b0 * c2))) +
             (a2 * ((b0 * c1) - (b1 * c0)))) < 0)
        {
            ind0 = 9;
            ind1 = 0;
        }
        else
        {
            ind0 = 0;
            ind1 = 9;
        }

        var vertices = this.vertex_store;
        var i;
        for (i = 0; i < 9; i += 1)
        {
            vertices[i] = gjkSimplex[ind0 + i];
            vertices[9 + i] = gjkSimplex[ind1 + i];
            vertices[18 + i] = gjkSimplex[18 + i];
            vertices[27 + i] = gjkSimplex[27 + i];
        }

        // Build initial convex hull
        var t0 = this.buildNewFace(0, 9, 18, true);
        var t1 = this.buildNewFace(9, 0, 27, true);
        var t2 = this.buildNewFace(18, 9, 27, true);
        var t3 = this.buildNewFace(0, 18, 27, true);

        var nextVertex = 36; //(4 * 9)

        if (hull.count !== 4)
        {
            VMath.v3Build(gjkSimplex[3], gjkSimplex[4], gjkSimplex[5], cache.closestA);
            VMath.v3Build(gjkSimplex[6], gjkSimplex[7], gjkSimplex[8], cache.closestB);
            return 0;
        }

        var best = this.findBest();
        var pass = 0;
        var iterations = 0;

        this.bind(t0, 0, t1, 0);
        this.bind(t0, 1, t2, 0);
        this.bind(t0, 2, t3, 0);
        this.bind(t1, 1, t3, 2);
        this.bind(t1, 2, t2, 1);
        this.bind(t2, 2, t3, 1);

        // Cached for frequent access.
        var A0 = xformA[0];
        var A1 = xformA[1];
        var A2 = xformA[2];
        var A3 = xformA[3];
        var A4 = xformA[4];
        var A5 = xformA[5];
        var A6 = xformA[6];
        var A7 = xformA[7];
        var A8 = xformA[8];
        var A9 = xformA[9];
        var A10 = xformA[10];
        var A11 = xformA[11];

        var B0 = xformB[0];
        var B1 = xformB[1];
        var B2 = xformB[2];
        var B3 = xformB[3];
        var B4 = xformB[4];
        var B5 = xformB[5];
        var B6 = xformB[6];
        var B7 = xformB[7];
        var B8 = xformB[8];
        var B9 = xformB[9];
        var B10 = xformB[10];
        var B11 = xformB[11];

        var supportA = cache.closestA;
        var supportB = cache.closestB;

        var horizon = this.horizon;
        var bn, n0, n1, n2;

        for (; iterations < 100; iterations += 1)
        {
            if (nextVertex >= this.MAX_VERTICES * 9)
            {
                break;
            }

            // reset horizon
            horizon.cf = horizon.ff = null;
            horizon.numFaces = 0;

            // get vertex from pool
            var w = nextVertex;
            nextVertex += 9;

            pass += 1;
            best.pass = pass;

            // populate vertex with supports.
            bn = best.normal;
            n0 = bn[0];
            n1 = bn[1];
            n2 = bn[2];
            //WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformVector(xformA, best.normal, supportA);
            //WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformVector(xformB, best.normal, supportB);
            //VMath.v3Neg(supportB, supportB);
            supportA[0] = ((A0 * n0) + (A1 * n1) + (A2 * n2));
            supportA[1] = ((A3 * n0) + (A4 * n1) + (A5 * n2));
            supportA[2] = ((A6 * n0) + (A7 * n1) + (A8 * n2));

            supportB[0] = -((B0 * n0) + (B1 * n1) + (B2 * n2));
            supportB[1] = -((B3 * n0) + (B4 * n1) + (B5 * n2));
            supportB[2] = -((B6 * n0) + (B7 * n1) + (B8 * n2));

            shapeA.localSupportWithoutMargin(supportA, supportA);
            shapeB.localSupportWithoutMargin(supportB, supportB);

            //VMath.m43TransformPoint(xformA, supportA, supportA);
            d0 = supportA[0];
            d1 = supportA[1];
            d2 = supportA[2];
            a0 = ((A0 * d0) + (A3 * d1) + (A6 * d2) + A9);
            a1 = ((A1 * d0) + (A4 * d1) + (A7 * d2) + A10);
            a2 = ((A2 * d0) + (A5 * d1) + (A8 * d2) + A11);

            //VMath.m43TransformPoint(xformB, supportB, supportB);
            d0 = supportB[0];
            d1 = supportB[1];
            d2 = supportB[2];
            b0 = ((B0 * d0) + (B3 * d1) + (B6 * d2) + B9);
            b1 = ((B1 * d0) + (B4 * d1) + (B7 * d2) + B10);
            b2 = ((B2 * d0) + (B5 * d1) + (B8 * d2) + B11);

            var w0, w1, w2;
            vertices[w + 3] = a0;
            vertices[w + 4] = a1;
            vertices[w + 5] = a2;
            vertices[w + 6] = b0;
            vertices[w + 7] = b1;
            vertices[w + 8] = b2;
            vertices[w]     = w0 = (a0 - b0);
            vertices[w + 1] = w1 = (a1 - b1);
            vertices[w + 2] = w2 = (a2 - b2);

            // expand simplex
            var wDist = ((n0 * w0) + (n1 * w1) + (n2 * w2)) - best.distance;
            if (wDist > WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
            {
                var j;
                var valid = true;
                for (j = 0; (j < 3 && valid); j += 1)
                {
                    valid = valid && this.expandFace(pass, w, best.adjFace[j], best.edge[j], horizon);
                }

                if (valid && (horizon.numFaces >= 3))
                {
                    this.bind(horizon.cf, 1, horizon.ff, 2);
                    this.remove(hull, best);
                    this.append(stock, best);
                    best = this.findBest();
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }
        }

        bn = best.normal;
        n0 = bn[0];
        n1 = bn[1];
        n2 = bn[2];
        var bd = best.distance;

        // Projection of origin onto final face of simplex.
        var p0 = n0 * bd;
        var p1 = n1 * bd;
        var p2 = n2 * bd;

        c0 = best.vertex[0];
        c1 = best.vertex[1];
        c2 = best.vertex[2];

        var x0 = vertices[c0]     - p0;
        var x1 = vertices[c0 + 1] - p1;
        var x2 = vertices[c0 + 2] - p2;

        var y0 = vertices[c1]     - p0;
        var y1 = vertices[c1 + 1] - p1;
        var y2 = vertices[c1 + 2] - p2;

        var z0 = vertices[c2]     - p0;
        var z1 = vertices[c2 + 1] - p1;
        var z2 = vertices[c2 + 2] - p2;

        // Compute barycentric coordinates of origin's projection on face.
        d0 = ((y1 * z2) - (y2 * z1));
        d1 = ((y2 * z0) - (y0 * z2));
        d2 = ((y0 * z1) - (y1 * z0));
        var alpha = Math.sqrt((d0 * d0) + (d1 * d1) + (d2 * d2));

        d0 = ((z1 * x2) - (z2 * x1));
        d1 = ((z2 * x0) - (z0 * x2));
        d2 = ((z0 * x1) - (z1 * x0));
        var beta = Math.sqrt((d0 * d0) + (d1 * d1) + (d2 * d2));

        d0 = ((x1 * y2) - (x2 * y1));
        d1 = ((x2 * y0) - (x0 * y2));
        d2 = ((x0 * y1) - (x1 * y0));
        var gamma = Math.sqrt((d0 * d0) + (d1 * d1) + (d2 * d2));

        var scale = 1 / (alpha + beta + gamma);
        alpha *= scale;
        beta *= scale;
        gamma *= scale;

        // Interpolate for ideal support points.
        supportA[0] = supportA[1] = supportA[2] = 0;
        supportB[0] = supportB[1] = supportB[2] = 0;
        for (i = 0; i < 3; i += 1)
        {
            supportA[i] += (alpha * vertices[c0 + 3 + i]) + (beta * vertices[c1 + 3 + i]) + (gamma * vertices[c2 + 3 + i]);
            supportB[i] += (alpha * vertices[c0 + 6 + i]) + (beta * vertices[c1 + 6 + i]) + (gamma * vertices[c2 + 6 + i]);
        }

        var axis = cache.axis;
        axis[0] = -n0;
        axis[1] = -n1;
        axis[2] = -n2;
        return (-best.distance);
    }
};

WebGLContactEPA.create = function WebGLContactEPAFn()
{
    var epa = new WebGLContactEPA();
    var i;

    // populate vertex and face pools
    epa.vertex_store = new Float32Array(epa.MAX_VERTICES * 9);

    var face_store = [];
    for (i = 0; i < epa.MAX_FACES; i += 1)
    {
        face_store[i] = {
            normal : VMath.v3BuildZero(),
            distance : 0,
            vertex : new Int16Array(3),
            adjFace : [null, null, null],
            edge : new Int16Array(3),

            leaf0 : null,
            leaf1 : null,
            pass : 0
        };
    }

    // initialise hull, stock and horizon
    epa.hull = {
        root : null,
        count : 0
    };

    epa.stock = {
        root : null,
        count : 0
    };

    epa.horizon = {
        cf : null,
        ff : null,
        numFaces : 0
    };

    // populat stock with all faces
    for (i = 0; i < epa.MAX_FACES; i += 1)
    {
        epa.append(epa.stock, face_store[epa.MAX_FACES - i - 1]);
    }

    return epa;
};

//
// WebGLPhysicsContact
//

// [0,  3) : localA (vector3)
// [3,  6) : localB (vector3)
// [6,  9) : relA   (vector3)
// [9, 12) : relB   (vector3)
// [12,15) : normal (vector3)  ('on' object B)
// [15,18) : tangent (vector3)
// [18,21) : bitangent (vector3)
// [21,22) : distance
// [22,25) : Jacobian : normal x relA * iInertiaA (vector3)
// [25,28) : Jacobian : normal x relB * iInertiaB (vector3)
// [28,31) : Jacobian : tangent x relA * iInertiaA (vector3)
// [31,34) : Jacobian : tangent x relB * iInertiaB (vector3)
// [34,37) : Jacobian : bitangent x relA * iInertiaA (vector3)
// [37,40) : Jacobian : bitangent x relB * iInertiaB (vector3)
// [40,43) : jAcc (normal, tangent, bitangent) (vector3)
// [43,44) : bias
// [44,45) : jAccBias
// [45,46) : penetration constraint, effective mass (kN)
// [46,50) : friction constraint, effective mass
//           [ kfA   kfBC ]
//           [ kfBC   kfD ]
// [50,51) : bounce
//

//
// Contact objects are object pooled due to being frequently
// created and destroyed.
//
// Contacts are thus instead allocated an deallocated with no
// create method.
//
var WebGLPhysicsContact = {};
WebGLPhysicsContact.contactPool = [];
WebGLPhysicsContact.contactPoolSize = 0;

WebGLPhysicsContact.allocate = function allocateFn()
{
    var contact;
    if (this.contactPoolSize === 0)
    {
        contact = new Float32Array(51);
    }
    else
    {
        contact = this.contactPool[this.contactPoolSize - 1];
        this.contactPoolSize -= 1;
    }

    return contact;
};

WebGLPhysicsContact.deallocate = function deallocateFn(contact)
{
    this.contactPool[this.contactPoolSize] = contact;
    this.contactPoolSize += 1;

    // Contact jAccN is cached between updates. Needs to be reset if contact is re-used.
    contact[40] = 0;
};


//
// WebGLPhysicsArbiter
//
function WebGLPhysicsArbiter()
{
    // Initialise all properties of arbiters
    // which will ever be used.

    // Object between which this contact patch is defined.
    // Precondition: objectA.id < objectB.id
    this.objectA = null;
    this.objectB = null;

    // Shapes between which this contact patch is defined.
    // Precondition: object#.shape = shape#
    this.shapeA = null;
    this.shapeB = null;

    // Pairwise friction and restitution values.
    this.friction    = 0;
    this.restitution = 0;

    // Set of contacts in patch.
    this.contacts = [];

    // Set of contacts with negative distance for physics computaions.
    this.activeContacts = [];

    // Whether contact is active (As compared to being sleeping).
    this.active = true;

    // Flag used to ignore unneccesary discrete collision checks in post-continuous collisions.
    this.skipDiscreteCollisions = false;
}

WebGLPhysicsArbiter.prototype = {

    version : 1,

    insertContact : function insertContactFn(worldA, worldB, normal, distance, concave)
    {
        var cn0 = normal[0];
        var cn1 = normal[1];
        var cn2 = normal[2];
        var clsq = ((cn0 * cn0) + (cn1 * cn1) + (cn2 * cn2));

        if (clsq < WebGLPhysicsConfig.DONT_NORMALIZE_THRESHOLD)
        {
            return;
        }

        var data = WebGLPhysicsContact.allocate();
        //WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformPoint(this.objectA.transform, worldA, c.localA);
        //WebGLPrivatePhysicsWorld.prototype.m43InverseOrthonormalTransformPoint(this.objectB.transform, worldB, c.localB);
        //var localA = c.localA;
        //var localB = c.localB;
        //var relA = c.relA;
        //var relB = c.relB;
        var xformA = this.objectA.transform;
        var xformB = this.objectB.transform;

        var r0 = data[6] = worldA[0] - xformA[9];
        var r1 = data[7] = worldA[1] - xformA[10];
        var r2 = data[8] = worldA[2] - xformA[11];
        var ca0 = data[0] = (xformA[0] * r0) + (xformA[1] * r1) + (xformA[2] * r2);
        var ca1 = data[1] = (xformA[3] * r0) + (xformA[4] * r1) + (xformA[5] * r2);
        var ca2 = data[2] = (xformA[6] * r0) + (xformA[7] * r1) + (xformA[8] * r2);

        r0 = data[9] = worldB[0] - xformB[9];
        r1 = data[10] = worldB[1] - xformB[10];
        r2 = data[11] = worldB[2] - xformB[11];
        data[3] = (xformB[0] * r0) + (xformB[1] * r1) + (xformB[2] * r2);
        data[4] = (xformB[3] * r0) + (xformB[4] * r1) + (xformB[5] * r2);
        data[5] = (xformB[6] * r0) + (xformB[7] * r1) + (xformB[8] * r2);

        //c.distance = distance;
        data[21] = distance;

        // contact normal, normalised.
        //var basis = c.basis;
        var scale = 1 / Math.sqrt(clsq);
        data[12] = cn0 = (cn0 * scale);
        data[13] = cn1 = (cn1 * scale);
        data[14] = cn2 = (cn2 * scale);

        // contact tangent.
        var ct0, ct1, ct2;
        if ((cn0 * cn0) + (cn2 * cn2) === 0)
        {
            ct0 = data[15] = 1.0;
            ct1 = data[16] = 0.0;
            ct2 = data[17] = 0.0;
        }
        else
        {
            scale = 1 / Math.sqrt(cn0 * cn0 + cn2 * cn2);
            ct0 = data[15] = (-cn2 * scale);
            ct1 = data[16] = 0.0;
            ct2 = data[17] = (cn0 * scale);
        }

        // contact bitangent
        data[18] = ((cn1 * ct2) - (cn2 * ct1));
        data[19] = ((cn2 * ct0) - (cn0 * ct2));
        data[20] = ((cn0 * ct1) - (cn1 * ct0));

        // Cull any contacts with different normal
        // Inherit accumulated impulse of nearby contact
        var i = 0;
        var min = Number.MAX_VALUE;
        var contacts = this.contacts;
        var d0, d1, d2;
        while (i < contacts.length)
        {
            var datad = contacts[i];
            // 0.9 chosen based on rough experimental results.
            if ((!concave) && ((cn0 * datad[12]) + (cn1 * datad[13]) + (cn2 * datad[14])) < 0.9)
            {
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                WebGLPhysicsContact.deallocate(datad);
                continue;
            }

            //var dlocalA = d.localA;
            d0 = (ca0 - datad[0]);
            d1 = (ca1 - datad[1]);
            d2 = (ca2 - datad[2]);
            var sep = (d0 * d0) + (d1 * d1) + (d2 * d2);
            if (sep < WebGLPhysicsConfig.CONTACT_EQUAL_SQ_SEPERATION)
            {
                //c.jAccN = d.jAccN;
                data[40] = datad[40];
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                WebGLPhysicsContact.deallocate(datad);
                min = sep;
                continue;
            }

            if (sep < WebGLPhysicsConfig.CONTACT_INHERIT_SQ_SEPERATION && sep < min)
            {
                //c.jAccN = d.jAccN;
                data[40] = datad[40];
                min = sep;
            }

            i++;
        }

        contacts.push(data);

        if (contacts.length === 4)
        {
            // Discard one contact, so that remaining 3 have maximum area, and contain deepest contact
            // Find deepest.
            var minDistance = Number.MAX_VALUE;
            var minimum;
            for (i = 0; i < 4; i += 1)
            {
                data = contacts[i];
                if (data[21] < minDistance)
                {
                    minDistance = data[21];
                    minimum = i;
                }
            }

            var discard;
            var maxArea = -Number.MAX_VALUE;

            var con0 = contacts[0];
            var con1 = contacts[1];
            var con2 = contacts[2];
            var con3 = contacts[3];

            // World coordinates of contact points (Scaled and translated, but does not matter).
            var a0 = con0[6] + con0[9];
            var a1 = con0[7] + con0[10];
            var a2 = con0[8] + con0[11];

            var b0 = con1[6] + con1[9];
            var b1 = con1[7] + con1[10];
            var b2 = con1[8] + con1[11];

            var c0 = con2[6] + con2[9];
            var c1 = con2[7] + con2[10];
            var c2 = con2[8] + con2[11];

            d0 = con3[6] + con3[9];
            d1 = con3[7] + con3[10];
            d2 = con3[8] + con3[11];

            var ab0 = (b0 - a0);
            var ab1 = (b1 - a1);
            var ab2 = (b2 - a2);

            var ac0 = (c0 - a0);
            var ac1 = (c1 - a1);
            var ac2 = (c2 - a2);

            var ad0 = (d0 - a0);
            var ad1 = (d1 - a1);
            var ad2 = (d2 - a2);

            var n0, n1, n2;
            var area;

            // Area discarding contact 1
            if (minimum !== 1)
            {
                n0 = ((ac1 * ad2) - (ac2 * ad1));
                n1 = ((ac2 * ad0) - (ac0 * ad2));
                n2 = ((ac0 * ad1) - (ac1 * ad0));
                area = (n0 * n0) + (n1 * n1) + (n2 * n2);
                if (area > maxArea)
                {
                    maxArea = area;
                    discard = 1;
                }
            }

            // Area discarding contact 2
            if (minimum !== 2)
            {
                n0 = ((ab1 * ad2) - (ab2 * ad1));
                n1 = ((ab2 * ad0) - (ab0 * ad2));
                n2 = ((ab0 * ad1) - (ab1 * ad0));
                area = (n0 * n0) + (n1 * n1) + (n2 * n2);
                if (area > maxArea)
                {
                    maxArea = area;
                    discard = 2;
                }
            }

            // Area discarding contact 3
            if (minimum !== 3)
            {
                n0 = ((ab1 * ac2) - (ab2 * ac1));
                n1 = ((ab2 * ac0) - (ab0 * ac2));
                n2 = ((ab0 * ac1) - (ab1 * ac0));
                area = (n0 * n0) + (n1 * n1) + (n2 * n2);
                if (area > maxArea)
                {
                    maxArea = area;
                    discard = 3;
                }
            }

            // Area discarding contact 0
            if (minimum !== 0)
            {
                var bc0 = (c0 - b0);
                var bc1 = (c1 - b1);
                var bc2 = (c2 - b2);

                var bd0 = (d0 - b0);
                var bd1 = (d1 - b1);
                var bd2 = (d2 - b2);

                n0 = ((bc1 * bd2) - (bc2 * bd1));
                n1 = ((bc2 * bd0) - (bc0 * bd2));
                n2 = ((bc0 * bd1) - (bc1 * bd0));
                area = (n0 * n0) + (n1 * n1) + (n2 * n2);
                if (area > maxArea)
                {
                    maxArea = area;
                    discard = 0;
                }
            }

            data = contacts[discard];
            contacts[discard] = contacts[3];
            contacts.pop();
            WebGLPhysicsContact.deallocate(data);
        }
    },

    refreshContacts : function refreshContactsFn()
    {
        var contacts = this.contacts;
        var objectA = this.objectA;
        var objectB = this.objectB;

        var xformA = objectA.transform;
        var xformB = objectB.transform;

        // Cached for use throughout method.
        var A0 = xformA[0];
        var A1 = xformA[1];
        var A2 = xformA[2];
        var A3 = xformA[3];
        var A4 = xformA[4];
        var A5 = xformA[5];
        var A6 = xformA[6];
        var A7 = xformA[7];
        var A8 = xformA[8];
        var A9 = xformA[9];
        var A10 = xformA[10];
        var A11 = xformA[11];

        var B0 = xformB[0];
        var B1 = xformB[1];
        var B2 = xformB[2];
        var B3 = xformB[3];
        var B4 = xformB[4];
        var B5 = xformB[5];
        var B6 = xformB[6];
        var B7 = xformB[7];
        var B8 = xformB[8];
        var B9 = xformB[9];
        var B10 = xformB[10];
        var B11 = xformB[11];

        var data;
        var i = 0;
        while (i < contacts.length)
        {
            data = contacts[i];

            //VMath.m43TransformVector(this.objectA.transform, c.localA, c.relA);
            var v0 = data[0];
            var v1 = data[1];
            var v2 = data[2];
            var ra0 = data[6] = ((A0 * v0) + (A3 * v1) + (A6 * v2));
            var ra1 = data[7] = ((A1 * v0) + (A4 * v1) + (A7 * v2));
            var ra2 = data[8] = ((A2 * v0) + (A5 * v1) + (A8 * v2));

            //VMath.m43TransformVector(this.objectB.transform, c.localB, c.relB);
            v0 = data[3];
            v1 = data[4];
            v2 = data[5];
            var rb0 = data[9] = ((B0 * v0) + (B3 * v1) + (B6 * v2));
            var rb1 = data[10] = ((B1 * v0) + (B4 * v1) + (B7 * v2));
            var rb2 = data[11] = ((B2 * v0) + (B5 * v1) + (B8 * v2));

            // contact seperation.
            v0 = (ra0 + A9) - (rb0 + B9);
            v1 = (ra1 + A10) - (rb1 + B10);
            v2 = (ra2 + A11) - (rb2 + B11);

            //var basis = c.basis;
            var n0 = data[12];
            var n1 = data[13];
            var n2 = data[14];

            //c.distance = VMath.v3Dot(c.normal, seperation);
            var sep = data[21] = ((n0 * v0) + (n1 * v1) + (n2 * v2));
            if (sep > WebGLPhysicsConfig.CONTACT_MAX_Y_SEPERATION)
            {
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                WebGLPhysicsContact.deallocate(data);
                continue;
            }

            //VMath.v3AddScalarMul(seperation, c.normal, -c.distance, seperation);
            v0 -= (n0 * sep);
            v1 -= (n1 * sep);
            v2 -= (n2 * sep);

            if (((v0 * v0) + (v1 * v1) + (v2 * v2)) > WebGLPhysicsConfig.CONTACT_MAX_SQ_XZ_SEPERATION)
            {
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                WebGLPhysicsContact.deallocate(data);
                continue;
            }

            i++;
        }

        return (contacts.length === 0);
    },

    preStep : function arbiterPreStepFn(timeStepRatio, timeStep)
    {
        var objectA = this.objectA;
        var objectB = this.objectB;
        var mass_sum = objectA.inverseMass + objectB.inverseMass;

        var velA = objectA.velocity;
        var velB = objectB.velocity;

        // cached for frequent access.
        var I = objectA.inverseInertia;
        var A0 = I[0];
        var A1 = I[1];
        var A2 = I[2];
        var A3 = I[3];
        var A4 = I[4];
        var A5 = I[5];
        var A6 = I[6];
        var A7 = I[7];
        var A8 = I[8];

        I = objectB.inverseInertia;
        var B0 = I[0];
        var B1 = I[1];
        var B2 = I[2];
        var B3 = I[3];
        var B4 = I[4];
        var B5 = I[5];
        var B6 = I[6];
        var B7 = I[7];
        var B8 = I[8];

        var activeContacts = this.activeContacts;
        activeContacts.length = 0;

        var contacts = this.contacts;
        var i;
        var limit = contacts.length;
        for (i = 0; i < limit; i += 1)
        {
            var data = contacts[i];
            if (data[21] > 0)
            {
                continue;
            }

            activeContacts[activeContacts.length] = data;

            // cacheing friction impulses between steps
            // caused them to fight eachother instead of stabalising at 0.
            data[41] = data[42] = 0;

            var ca0, ca1, ca2;
            var cb0, cb1, cb2;

            //var basis = c.basis;
            var n0 = data[12];
            var n1 = data[13];
            var n2 = data[14];

            var ra0 = data[6];
            var ra1 = data[7];
            var ra2 = data[8];

            var rb0 = data[9];
            var rb1 = data[10];
            var rb2 = data[11];

            //var jac = c.jac;
            var k0, k1, k2;

            // Compute effective mass and jacobian of penetration constraint.
            var kN = mass_sum;
            //crossA = VMath.v3Cross(c.relA, c.normal);
            ca0 = ((ra1 * n2) - (ra2 * n1));
            ca1 = ((ra2 * n0) - (ra0 * n2));
            ca2 = ((ra0 * n1) - (ra1 * n0));
            //c.nCrossA = VMath.m33Transform(objectA.inverseInertia, crossA);
            data[22] = k0 = ((A0 * ca0) + (A3 * ca1) + (A6 * ca2));
            data[23] = k1 = ((A1 * ca0) + (A4 * ca1) + (A7 * ca2));
            data[24] = k2 = ((A2 * ca0) + (A5 * ca1) + (A8 * ca2));
            kN += ((ca0 * k0) + (ca1 * k1) + (ca2 * k2));

            //crossB = VMbth.v3Cross(c.relB, c.normal);
            cb0 = ((rb1 * n2) - (rb2 * n1));
            cb1 = ((rb2 * n0) - (rb0 * n2));
            cb2 = ((rb0 * n1) - (rb1 * n0));
            //c.nCrossB = VMbth.m33Trbnsform(objectB.inverseInertib, crossB);
            data[25] = k0 = -((B0 * cb0) + (B3 * cb1) + (B6 * cb2));
            data[26] = k1 = -((B1 * cb0) + (B4 * cb1) + (B7 * cb2));
            data[27] = k2 = -((B2 * cb0) + (B5 * cb1) + (B8 * cb2));
            kN -= ((cb0 * k0) + (cb1 * k1) + (cb2 * k2));

            data[45] = 1 / kN;

            // Compute positional bias for baumgraute stabalisation#
            var baum = (objectA.collisionObject || objectB.collisionObject) ?
                          WebGLPhysicsConfig.CONTACT_STATIC_BAUMGRAUTE :
                          WebGLPhysicsConfig.CONTACT_BAUMGRAUTE;
            data[43] = baum * Math.min(0, data[21] + WebGLPhysicsConfig.CONTACT_SLOP) / timeStep;
            data[44] = 0;

            // Compute velocity at contact
            // var vel = VMath.v3Sub(velA, velB);
            var vel0 = (velA[0] - velB[0]);
            var vel1 = (velA[1] - velB[1]);
            var vel2 = (velA[2] - velB[2]);
            // vel += VMath.v3Cross(angA, c.relA);
            vel0 += ((velA[4] * ra2) - (velA[5] * ra1));
            vel1 += ((velA[5] * ra0) - (velA[3] * ra2));
            vel2 += ((velA[3] * ra1) - (velA[4] * ra0));
            // vel -= VMath.v3Cross(velB, c.relB);
            vel0 -= ((velB[4] * rb2) - (velB[5] * rb1));
            vel1 -= ((velB[5] * rb0) - (velB[3] * rb2));
            vel2 -= ((velB[3] * rb1) - (velB[4] * rb0));

            // Compute bounce bias.
            //c.bounce = VMath.v3Dot(vel, c.normal) * this.restitution;
            var bounce = ((vel0 * n0) + (vel1 * n1) + (vel2 * n2)) * this.restitution;
            // Epsilon based on experimental result
            if (bounce * bounce < 1e-2)
            {
                bounce = 0;
            }
            data[50] = bounce;

            // Compute effective mass and jacobian of friction constraint.
            var kU = mass_sum;
            n0 = data[15];
            n1 = data[16];
            n2 = data[17];

            //crossA = VMath.v3Cross(c.relA, c.tangent);
            ca0 = ((ra1 * n2) - (ra2 * n1));
            ca1 = ((ra2 * n0) - (ra0 * n2));
            ca2 = ((ra0 * n1) - (ra1 * n0));
            //c.uCrossA = VMath.m33Transform(objecnA.inverseInertia, crossA);
            data[28] = k0 = ((A0 * ca0) + (A3 * ca1) + (A6 * ca2));
            data[29] = k1 = ((A1 * ca0) + (A4 * ca1) + (A7 * ca2));
            data[30] = k2 = ((A2 * ca0) + (A5 * ca1) + (A8 * ca2));
            kU += ((ca0 * k0) + (ca1 * k1) + (ca2 * k2));

            //crossB = VMbth.v3Cross(c.relB, c.tangent);
            cb0 = ((rb1 * n2) - (rb2 * n1));
            cb1 = ((rb2 * n0) - (rb0 * n2));
            cb2 = ((rb0 * n1) - (rb1 * n0));
            //c.uCrossB = VMbth.m33Trbnsform(objecnB.inverseInertib, crossB);
            data[31]  = k0 = -((B0 * cb0) + (B3 * cb1) + (B6 * cb2));
            data[32] = k1 = -((B1 * cb0) + (B4 * cb1) + (B7 * cb2));
            data[33] = k2 = -((B2 * cb0) + (B5 * cb1) + (B8 * cb2));
            kU -= ((cb0 * k0) + (cb1 * k1) + (cb2 * k2));

            var kV = mass_sum;
            n0 = data[18];
            n1 = data[19];
            n2 = data[20];

            //crossA = VMath.v3Cross(c.relA, c.bitangent);
            ca0 = ((ra1 * n2) - (ra2 * n1));
            ca1 = ((ra2 * n0) - (ra0 * n2));
            ca2 = ((ra0 * n1) - (ra1 * n0));
            //c.vCrossA = VMath.m33Transform(objecnA.inverseInertia, crossA);
            data[34] = k0 = ((A0 * ca0) + (A3 * ca1) + (A6 * ca2));
            data[35] = k1 = ((A1 * ca0) + (A4 * ca1) + (A7 * ca2));
            data[36] = k2 = ((A2 * ca0) + (A5 * ca1) + (A8 * ca2));
            kV += ((ca0 * k0) + (ca1 * k1) + (ca2 * k2));

            //crossB = VMbth.v3Cross(c.relB, c.bitangent);
            cb0 = ((rb1 * n2) - (rb2 * n1));
            cb1 = ((rb2 * n0) - (rb0 * n2));
            cb2 = ((rb0 * n1) - (rb1 * n0));
            //c.vCrossB = VMbth.m33Trbnsform(objecnB.inverseInertib, crossB);
            data[37] = k0 = -((B0 * cb0) + (B3 * cb1) + (B6 * cb2));
            data[38] = k1 = -((B1 * cb0) + (B4 * cb1) + (B7 * cb2));
            data[39] = k2 = -((B2 * cb0) + (B5 * cb1) + (B8 * cb2));
            kV -= ((cb0 * k0) + (cb1 * k1) + (cb2 * k2));

            var kUV = 0.0;
            kUV += ((ca0 * data[28]) + (ca1 * data[29]) + (ca2 * data[30]));
            kUV -= ((cb0 * data[31]) + (cb1 * data[32]) + (cb2 * data[33]));

            var idet = 1 / (kU * kV - kUV * kUV);
            data[46] = kV * idet;
            data[47] = -kUV * idet;
            data[48] = kU * idet;

            // scale cached impulse for change in time step
            data[40] *= timeStepRatio;
        }
    },

    applyCachedImpulses : function arbiterApplyCachedImpulsesFn()
    {
        var objectA = this.objectA;
        var objectB = this.objectB;

        var velA = objectA.velocity;
        var velB = objectB.velocity;

        var imA = objectA.inverseMass;
        var imB = objectB.inverseMass;

        var contacts = this.activeContacts;
        var i = 0;
        for (i = 0; i < contacts.length; i += 1)
        {
            var data = contacts[i];

            var jn = data[40];
            var n0 = (data[12] * jn);
            var n1 = (data[13] * jn);
            var n2 = (data[14] * jn);

            velA[0] += (n0 * imA);
            velA[1] += (n1 * imA);
            velA[2] += (n2 * imA);

            velB[0] -= (n0 * imB);
            velB[1] -= (n1 * imB);
            velB[2] -= (n2 * imB);

            velA[3] += (data[22] * jn);
            velA[4] += (data[23] * jn);
            velA[5] += (data[24] * jn);

            velB[3] += (data[25] * jn);
            velB[4] += (data[26] * jn);
            velB[5] += (data[27] * jn);
        }
    },

    computeAndApplyBiasImpulses : function arbiterBiasImpulsesFn()
    {
        var objectA = this.objectA;
        var objectB = this.objectB;

        // Set velocities to local vars.
        var vec = objectA.velocity;
        var va0 = vec[6];
        var va1 = vec[7];
        var va2 = vec[8];
        var wa0 = vec[9];
        var wa1 = vec[10];
        var wa2 = vec[11];

        vec = objectB.velocity;
        var vb0 = vec[6];
        var vb1 = vec[7];
        var vb2 = vec[8];
        var wb0 = vec[9];
        var wb1 = vec[10];
        var wb2 = vec[11];

        var imA = objectA.inverseMass;
        var imB = objectB.inverseMass;

        var contacts = this.activeContacts;
        var limit = contacts.length;
        var data;
        var i = 0;
        for (; i < limit; i += 1)
        {
            data = contacts[i];

            var n0 = data[12];
            var n1 = data[13];
            var n2 = data[14];

            var ra0 = data[6];
            var ra1 = data[7];
            var ra2 = data[8];

            var rb0 = data[9];
            var rb1 = data[10];
            var rb2 = data[11];

            // Velocity normal impulse.
            var j1 = data[45] * (
                  n0 * ((vb0 + ((wb1 * rb2) - (wb2 * rb1))) - (va0 + ((wa1 * ra2) - (wa2 * ra1)))) +
                  n1 * ((vb1 + ((wb2 * rb0) - (wb0 * rb2))) - (va1 + ((wa2 * ra0) - (wa0 * ra2)))) +
                  n2 * ((vb2 + ((wb0 * rb1) - (wb1 * rb0))) - (va2 + ((wa0 * ra1) - (wa1 * ra0)))) -
                  data[43]);

            // Accumulate and clamp.
            var jOld1 = data[44];
            var cjAcc1 = jOld1 + j1;
            if (cjAcc1 < 0)
            {
                cjAcc1 = 0.0;
            }
            j1 = cjAcc1 - jOld1;
            data[44] = cjAcc1;

            // Apply normal impulse.
            n0 *= j1;
            n1 *= j1;
            n2 *= j1;

            va0 += (n0 * imA);
            va1 += (n1 * imA);
            va2 += (n2 * imA);

            vb0 -= (n0 * imB);
            vb1 -= (n1 * imB);
            vb2 -= (n2 * imB);

            wa0 += (data[22] * j1);
            wa1 += (data[23] * j1);
            wa2 += (data[24] * j1);

            wb0 += (data[25] * j1);
            wb1 += (data[26] * j1);
            wb2 += (data[27] * j1);
        }

        // Set local vars to velocities.
        vec = objectA.velocity;
        vec[6] = va0;
        vec[7] = va1;
        vec[8] = va2;
        vec[9] = wa0;
        vec[10] = wa1;
        vec[11] = wa2;

        vec = objectB.velocity;
        vec[6] = vb0;
        vec[7] = vb1;
        vec[8] = vb2;
        vec[9] = wb0;
        vec[10] = wb1;
        vec[11] = wb2;
    },

    computeAndApplyImpulses : function arbiterImpulsesFn()
    {
        var objectA = this.objectA;
        var objectB = this.objectB;

        // Set velocities to local vars.
        var vec = objectA.velocity;
        var va0 = vec[0];
        var va1 = vec[1];
        var va2 = vec[2];
        var wa0 = vec[3];
        var wa1 = vec[4];
        var wa2 = vec[5];

        vec = objectB.velocity;
        var vb0 = vec[0];
        var vb1 = vec[1];
        var vb2 = vec[2];
        var wb0 = vec[3];
        var wb1 = vec[4];
        var wb2 = vec[5];

        var imA = objectA.inverseMass;
        var imB = objectB.inverseMass;

        var contacts = this.activeContacts;
        var limit = contacts.length;
        var data;
        var i = 0;
        for (; i < limit; i += 1)
        {
            data = contacts[i];

            var n0 = data[12];
            var n1 = data[13];
            var n2 = data[14];
            var u0 = data[15];
            var u1 = data[16];
            var u2 = data[17];
            var v0 = data[18];
            var v1 = data[19];
            var v2 = data[20];

            var ra0 = data[6];
            var ra1 = data[7];
            var ra2 = data[8];

            var rb0 = data[9];
            var rb1 = data[10];
            var rb2 = data[11];

            // Velocity normal impulse.
            var j1 = data[45] * (
                  n0 * ((vb0 + ((wb1 * rb2) - (wb2 * rb1))) - (va0 + ((wa1 * ra2) - (wa2 * ra1)))) +
                  n1 * ((vb1 + ((wb2 * rb0) - (wb0 * rb2))) - (va1 + ((wa2 * ra0) - (wa0 * ra2)))) +
                  n2 * ((vb2 + ((wb0 * rb1) - (wb1 * rb0))) - (va2 + ((wa0 * ra1) - (wa1 * ra0)))) -
                  data[50]);

            // Accumulate and clamp.
            var jOld1 = data[40];
            var cjAcc1 = jOld1 + j1;
            if (cjAcc1 < 0)
            {
                cjAcc1 = 0.0;
            }
            j1 = cjAcc1 - jOld1;
            data[40] = cjAcc1;

            // Apply normal impulse.
            n0 *= j1;
            n1 *= j1;
            n2 *= j1;

            va0 += (n0 * imA);
            va1 += (n1 * imA);
            va2 += (n2 * imA);

            vb0 -= (n0 * imB);
            vb1 -= (n1 * imB);
            vb2 -= (n2 * imB);

            wa0 += (data[22] * j1);
            wa1 += (data[23] * j1);
            wa2 += (data[24] * j1);

            wb0 += (data[25] * j1);
            wb1 += (data[26] * j1);
            wb2 += (data[27] * j1);

            // Relative velocity at contact point.
            n0 = (vb0 - va0) + ((wb1 * rb2) - (wb2 * rb1)) - ((wa1 * ra2) - (wa2 * ra1));
            n1 = (vb1 - va1) + ((wb2 * rb0) - (wb0 * rb2)) - ((wa2 * ra0) - (wa0 * ra2));
            n2 = (vb2 - va2) + ((wb0 * rb1) - (wb1 * rb0)) - ((wa0 * ra1) - (wa1 * ra0));

            // Friction tangent and bitangent constraint space impulses.
            var lambdau = ((u0 * n0) + (u1 * n1) + (u2 * n2));
            var lambdav = ((v0 * n0) + (v1 * n1) + (v2 * n2));

            // Transform by inverse mass matrix.
            j1 = lambdau * data[46] + lambdav * data[47];
            var j2 = lambdau * data[47] + lambdav * data[48];

            // Accumulate and clamp.
            jOld1 = data[41];
            var jOld2 = data[42];
            cjAcc1 = jOld1 + j1;
            var cjAcc2 = jOld2 + j2;

            var jMax = this.friction * data[40];
            var fsq = (cjAcc1 * cjAcc1) + (cjAcc2 * cjAcc2);
            if (fsq > (jMax * jMax))
            {
                fsq = jMax / Math.sqrt(fsq);
                cjAcc1 *= fsq;
                cjAcc2 *= fsq;
            }
            j1 = cjAcc1 - jOld1;
            j2 = cjAcc2 - jOld2;
            data[41] = cjAcc1;
            data[42] = cjAcc2;

            // Apply friction impulse.
            n0 = (u0 * j1) + (v0 * j2);
            n1 = (u1 * j1) + (v1 * j2);
            n2 = (u2 * j1) + (v2 * j2);

            va0 += (n0 * imA);
            va1 += (n1 * imA);
            va2 += (n2 * imA);

            vb0 -= (n0 * imB);
            vb1 -= (n1 * imB);
            vb2 -= (n2 * imB);

            wa0 += (data[28] * j1) + (data[34] * j2);
            wa1 += (data[29] * j1) + (data[35] * j2);
            wa2 += (data[30] * j1) + (data[36] * j2);

            wb0 += (data[31] * j1) + (data[37] * j2);
            wb1 += (data[32] * j1) + (data[38] * j2);
            wb2 += (data[33] * j1) + (data[39] * j2);
        }

        // Set local vars to velocities.
        vec = objectA.velocity;
        vec[0] = va0;
        vec[1] = va1;
        vec[2] = va2;
        vec[3] = wa0;
        vec[4] = wa1;
        vec[5] = wa2;

        vec = objectB.velocity;
        vec[0] = vb0;
        vec[1] = vb1;
        vec[2] = vb2;
        vec[3] = wb0;
        vec[4] = wb1;
        vec[5] = wb2;
    },

    invalidateParameters : function invalidateParametersFn()
    {
        this.restitution = (this.objectA.restitution * this.objectB.restitution);
        this.friction = (this.objectA.friction * this.objectB.friction);
    }
};

//
// Arbiter objects are object pooled due to being frequently
// created and destroyed.
//
// Arbiters are thus instead allocated an deallocated with no
// create method.
//
// Object pool for arbiters
WebGLPhysicsArbiter.arbiterPool = [];
WebGLPhysicsArbiter.arbiterPoolSize = 0;

WebGLPhysicsArbiter.allocate = function allocateFn(shapeA, shapeB, objectA, objectB)
{
    var arbiter;
    if (this.arbiterPoolSize === 0)
    {
        arbiter = new WebGLPhysicsArbiter();
    }
    else
    {
        arbiter = this.arbiterPool[this.arbiterPoolSize - 1];
        this.arbiterPoolSize -= 1;
    }

    arbiter.active = true;

    arbiter.shapeA = shapeA;
    arbiter.shapeB = shapeB;
    arbiter.objectA = objectA;
    arbiter.objectB = objectB;
    arbiter.invalidateParameters();

    return arbiter;
};

WebGLPhysicsArbiter.deallocate = function deallocateFn(arbiter)
{
    // Prevent object pooled arbiter from keeping shapes/objects
    // from potential GC.
    arbiter.shapeA = null;
    arbiter.shapeB = null;
    arbiter.objectA = null;
    arbiter.objectB = null;

    // Ensure flag is reset.
    arbiter.skipDiscreteCollisions = false;

    this.arbiterPool[this.arbiterPoolSize] = arbiter;
    this.arbiterPoolSize += 1;
};


//
// WebGLPhysicsIsland
//
function WebGLPhysicsIsland()
{
    // Initialise all properties of islands
    // which will ever be used.

    // Set of rigid bodies in island
    this.bodies = [];

    // Set of constraints in island
    this.constraints = [];

    // Local max wakeTimeStamp for island
    this.wakeTimeStamp = 0;

    // Active state of island (compared to sleeping)
    this.active = false;
}

WebGLPhysicsIsland.prototype = {

    version : 1

};
//
// Island objects are object pooled due to being frequently
// created and destroyed.
//
// Island are thus instead allocated an deallocated with no
// create method.
//
// Object pool for islands
WebGLPhysicsIsland.islandPool = [];
WebGLPhysicsIsland.islandPoolSize = 0;

WebGLPhysicsIsland.allocate = function allocateFn()
{
    var island;
    if (this.islandPoolSize === 0)
    {
        island = new WebGLPhysicsIsland();
    }
    else
    {
        island = this.islandPool[this.islandPoolSize - 1];
        this.islandPoolSize -= 1;
    }

    return island;
};

WebGLPhysicsIsland.deallocate = function deallocateFn(island)
{
    this.islandPool[this.islandPoolSize] = island;
    this.islandPoolSize += 1;

    // Make sure to reset local max wakeTimeStamp back to 0.
    island.wakeTimeStamp = 0;
};

//
// WebGLPhysicsTriangleShape
//
function WebGLPhysicsTriangleShape()
{
    // Initialise all properties of Triangle shape
    // which will ever be used.

    // Index into parent WebGLTriangleArray::triangles list.
    this.index = 0;

    // Collision radius in collision algorithms, this is taken from parent mesh shape.
    this.collisionRadius = 0;

    // The parent TriangleArray.
    this.triangleArray = null;
}

WebGLPhysicsTriangleShape.prototype = {

    type : "TRIANGLE_MESH_TRIANGLE",

    version : 1,

    localSupportWithoutMargin : function triangleShapeLocalSupportFn(vec, dst)
    {
        var vec0 = vec[0];
        var vec1 = vec[1];
        var vec2 = vec[2];

        var triangles = this.triangleArray.triangles;
        var triangle = this.index;

        var v00 = triangles[triangle + 3];
        var v01 = triangles[triangle + 4];
        var v02 = triangles[triangle + 5];
        var u0 = triangles[triangle + 6];
        var u1 = triangles[triangle + 7];
        var u2 = triangles[triangle + 8];
        var v0 = triangles[triangle + 9];
        var v1 = triangles[triangle + 10];
        var v2 = triangles[triangle + 11];

        var dotu = ((vec0 * u0) + (vec1 * u1) + (vec2 * u2));
        var dotv = ((vec0 * v0) + (vec1 * v1) + (vec2 * v2));

        if (dotu <= 0 && dotv <= 0)
        {
            dst[0] = v00;
            dst[1] = v01;
            dst[2] = v02;
        }
        else if (dotu >= dotv)
        {
            dst[0] = (v00 + u0);
            dst[1] = (v01 + u1);
            dst[2] = (v02 + u2);
        }
        else
        {
            dst[0] = (v00 + v0);
            dst[1] = (v01 + v1);
            dst[2] = (v02 + v2);
        }
    }

};
//
// Triangle shapes are used for collision detection with triangles of a triangle mesh.
// In most cases there is one persistant object used. In the case of continuous collisions
// we need to reuse many of these objects, so an object pool is used with allocate and
// deallocate methods instead of a create method.
//
// Object pool for Triangles
WebGLPhysicsTriangleShape.trianglePool = [];
WebGLPhysicsTriangleShape.trianglePoolSize = 0;

WebGLPhysicsTriangleShape.allocate = function allocateFn()
{
    var triangle;
    if (this.trianglePoolSize === 0)
    {
        triangle = new WebGLPhysicsTriangleShape();
    }
    else
    {
        triangle = this.trianglePool[this.trianglePoolSize - 1];
        this.trianglePoolSize -= 1;
    }

    return triangle;
};

WebGLPhysicsTriangleShape.deallocate = function deallocateFn(triangle)
{
    this.trianglePool[this.trianglePoolSize] = triangle;
    this.trianglePoolSize += 1;

    // Ensure reference is null'ed so that an object pooled Triangle Shape
    // cannot prevent the TriangleArray from being GC'ed.
    this.triangleArray = null;
};

//
// WebGLPhysicsTOIEvent
//
function WebGLPhysicsTOIEvent()
{
    // Initialise all properties of TOI Event
    // which will ever be used.
    //
    // This object is made to dual as a cache in contactPairTest.

    // Objects TOI Event relates to.
    this.objectA = null;
    this.objectB = null;

    // Shapes TOI Event relates to.
    // Precondition: object#.shape = shape#
    this.shapeA = null;
    this.shapeB = null;

    // Closest points on shapes forming the contact point.
    this.closestA = VMath.v3BuildZero();
    this.closestB = VMath.v3BuildZero();

    // Seperating axis / MTV axis forming contact normal.
    this.axis = VMath.v3BuildZero();

    // Penetration distance for contact of TOI event.
    this.distance = 0.0;

    // Time of impact for this event.
    this.toi = 0.0;

    // Cache defining the frozen state of objects during continuous collision detection.
    // Used to invalidate TOI Event when an object's sweepFrozen differs.
    this.frozenA = false;
    this.frozenB = false;

    // Marks this event as corresponding to a concave triangle mesh.
    // This value is passed to insertContact to prevent culling contacts
    // based on normals.
    this.concave = false;
}

WebGLPhysicsTOIEvent.prototype = {

    version : 1

};
//
// TOI Events are object pooled due to being frequently created and destroyed
//
// TOI Events are thus instead allocated and deallocated with no create method.
//
// Object pool for TOI Events
WebGLPhysicsTOIEvent.eventPool = [];
WebGLPhysicsTOIEvent.eventPoolSize = 0;

WebGLPhysicsTOIEvent.allocate = function allocateFn()
{
    var toi;
    if (this.eventPoolSize === 0)
    {
        toi = new WebGLPhysicsTOIEvent();
    }
    else
    {
        toi = this.eventPool[this.eventPoolSize - 1];
        this.eventPoolSize -= 1;
    }

    return toi;
};

WebGLPhysicsTOIEvent.deallocate = function deallocateFn(toi)
{
    this.eventPool[this.eventPoolSize] = toi;
    this.eventPoolSize += 1;

    // Ensure that if this is a concave TOI Event, that we also
    // deallocate the related TriangleShape that is generated.
    if (toi.concave)
    {
        WebGLPhysicsTriangleShape.deallocate(toi.shapeB);
        toi.concave = false;
    }

    // Ensure that object references are set to null to permit GC
    // even if this is in the object pool.
    toi.objectA = null;
    toi.objectB = null;
    toi.shapeA = null;
    toi.shapeB = null;
};


//
// WebGLPhysicsWorld
//
function WebGLPhysicsWorld() {}
WebGLPhysicsWorld.prototype = {

    version : 1,

    update : function physicsWorldUpdateFn()
    {
        this._private.update();
    },

    rayTest : function physicWorldRayTestFn(ray)
    {
        return this._private.rayTest(ray);
    },

    convexSweepTest : function physicsWorldConvexSweepTestFn(params)
    {
        return this._private.convexSweepTest(params);
    },

    addCollisionObject : function physicsWorldAddCollisionObjectFn(collisionObject)
    {
        return this._private.addBody(collisionObject._private);
    },

    removeCollisionObject : function physicsWorldRemoveCollisionObjectFn(collisionObject)
    {
        return this._private.removeBody(collisionObject._private);
    },

    addRigidBody : function physicsWorldAddRigidBodyFn(rigidBody)
    {
        return this._private.addBody(rigidBody._private);
    },

    removeRigidBody : function physicsWorldRemoveRigidBodyFn(rigidBody)
    {
        return this._private.removeBody(rigidBody._private);
    },

    addConstraint : function physicsWorldAddConstraintFn(constraint)
    {
        return this._private.addConstraint(constraint._private);
    },

    removeConstraint : function physicsWorldRemoveConstraintFn(constraint)
    {
        return this._private.removeConstraint(constraint._private);
    },

    addCharacter : function physicsWorldAddCharacterFn(character)
    {
        return this._private.addBody(character._private.rigidBody._private);
    },

    removeCharacter : function physicsWorldRemoveCharacterFn(character)
    {
        return this._private.removeBody(character._private.rigidBody._private);
    },

    flush : function physicsWorldFlushFn()
    {
        this._private.flush();
    }
};

function WebGLPrivatePhysicsWorld() {}
WebGLPrivatePhysicsWorld.prototype = {

    version : 1,

    m43InverseOrthonormalTransformVector : function m43InverseOrthonormalTransformVectorFn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new Float32Array(3);
        }
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        dst[0] = (m[0] * v0 + m[1] * v1 + m[2] * v2);
        dst[1] = (m[3] * v0 + m[4] * v1 + m[5] * v2);
        dst[2] = (m[6] * v0 + m[7] * v1 + m[8] * v2);
        return dst;
    },

    m43InverseOrthonormalTransformPoint : function m43InverseOrthonormalTransformPointFn(m, v, dst)
    {
        if (dst === undefined)
        {
            dst = new Float32Array(3);
        }
        var v0 = v[0] - m[9];
        var v1 = v[1] - m[10];
        var v2 = v[2] - m[11];
        dst[0] = (m[0] * v0 + m[1] * v1 + m[2] * v2);
        dst[1] = (m[3] * v0 + m[4] * v1 + m[5] * v2);
        dst[2] = (m[6] * v0 + m[7] * v1 + m[8] * v2);
        return dst;
    },

    // Determine if shape intersects the plane containing triangle number 'index' in triangle array
    // With given shape and triangle transforms.
    trianglePlaneDiscard : function trianglePlaneDiscardFn(shape, xform, triangleArray, index, txform)
    {
        if (this.planeAxis === undefined)
        {
            this.planeAxis = VMath.v3BuildZero();
            this.planeSA = VMath.v3BuildZero();
            this.planeSB = VMath.v3BuildZero();
        }
        var axis = this.planeAxis;
        var supportA = this.planeSA;
        var supportB = this.planeSB;

        var triangles = triangleArray.triangles;
        // local plane normal and distance.
        var n0 = triangles[index];
        var n1 = triangles[index + 1];
        var n2 = triangles[index + 2];
        var nd = triangles[index + 16];

        var A0 = txform[0];
        var A1 = txform[1];
        var A2 = txform[2];
        var A3 = txform[3];
        var A4 = txform[4];
        var A5 = txform[5];
        var A6 = txform[6];
        var A7 = txform[7];
        var A8 = txform[8];
        var A9 = txform[9];
        var A10 = txform[10];
        var A11 = txform[11];

        // transform plane normal into world space.
        var w0 = (n0 * A0) + (n1 * A3) + (n2 * A6);
        var w1 = (n0 * A1) + (n1 * A4) + (n2 * A7);
        var w2 = (n0 * A2) + (n1 * A5) + (n2 * A8);

        A0 = xform[0];
        A1 = xform[1];
        A2 = xform[2];
        A3 = xform[3];
        A4 = xform[4];
        A5 = xform[5];
        A6 = xform[6];
        A7 = xform[7];
        A8 = xform[8];
        A9 -= xform[9];
        A10 -= xform[10];
        A11 -= xform[11];

        // transform plane into shape local space.
        n0 = (A0 * w0) + (A1 * w1) + (A2 * w2);
        n1 = (A3 * w0) + (A4 * w1) + (A5 * w2);
        n2 = (A6 * w0) + (A7 * w1) + (A8 * w2);
        nd += (w0 * A9) + (w1 * A10) + (w2 * A11);

        // find maximum and minimal support points on shape.
        axis[0] = n0;
        axis[1] = n1;
        axis[2] = n2;
        shape.localSupportWithoutMargin(axis, supportA);

        axis[0] = -n0;
        axis[1] = -n1;
        axis[2] = -n2;
        shape.localSupportWithoutMargin(axis, supportB);

        // Find distance from plane for each support.
        var dot1 = (supportA[0] * n0) + (supportA[1] * n1) + (supportA[2] * n2) - nd;
        var dot2 = (supportB[0] * n0) + (supportB[1] * n1) + (supportB[2] * n2) - nd;

        // If supports are on opposite side of plane, primitive definately
        // intersects plane
        if ((dot1 * dot2) <= 0)
        {
            return false;
        }

        // Choose closest support to plane for distance computation
        // with margins.
        var seperation;
        if ((dot1 * dot1) < (dot2 * dot2))
        {
            seperation = dot1;
        }
        else
        {
            seperation = dot2;
        }

        if ((seperation < 0) !== ((dot1 * dot2) < 0))
        {
            seperation = -seperation;
        }

        return (seperation - shape.collisionRadius) > 0;
    },

    // Determine if pair of objects is permitted to collide.
    filtered : function filteredFn(objectA, objectB)
    {
        if (objectA === objectB)
        {
            return true;
        }

        if ((objectA.collisionObject || objectA.kinematic) && (objectB.collisionObject || objectB.kinematic))
        {
            return true;
        }

        if ((objectA.mask & objectB.group) === 0 ||
            (objectB.mask & objectA.group) === 0)
        {
            return true;
        }

        return false;
    },

    // perform narrow phase collision detection between shapes A and B
    // owned by respective objects objectA, objectB (objectA.shape === shapeA etc)
    narrowPhase : function narrowPhaseFn(shapeA, shapeB, objectA, objectB)
    {
        // Objects reused in all narrowPhase calls.
        if (this.narrowTriangle === undefined)
        {
            // Fake triangle shape for TRIANGLE_MESH collisions.
            this.narrowTriangle = WebGLPhysicsTriangleShape.allocate();

            // contactPairTest cache object.
            this.narrowCache = {
                axis : VMath.v3Build(1, 0, 0),
                shapeA : null,
                shapeB : null,
                closestA : VMath.v3BuildZero(),
                closestB : VMath.v3BuildZero()
            };

            // contactPairTest cache object used in TRIANGLE_MESH
            // as shapeA/shapeB are not the same as above.
            this.narrowCache2 = {
                axis : this.narrowCache.axis, //reference!
                shapeA : null,
                shapeB : null,
                closestA : this.narrowCache.closestA, //reference!
                closestB : this.narrowCache.closestB //reference!
            };

            // Fake body used for TRIANGLE_MESH to compute local extents of
            // A shape in triangle mesh local-coordinates.
            this.narrowFakeBody = {
                transform : VMath.m43BuildIdentity(),
                shape : null
            };

            this.narrowTransform = VMath.m43BuildIdentity();
            this.narrowExtents = new Float32Array(6);
        }

        // Find existing arbiter for shape pair.
        // Iterating the smaller list of either object.
        var arb = null;
        var arbitersA = objectA.arbiters;
        var arbitersB = objectB.arbiters;
        var arbiters = (arbitersA.length <= arbitersB.length) ? arbitersA : arbitersB;

        var i = 0;
        var numArbiters = arbiters.length;
        for (i = 0; i < numArbiters; i += 1)
        {
            var carb = arbiters[i];
            if (carb.shapeA === shapeA && carb.shapeB === shapeB &&
                carb.objectA === objectA && carb.objectB === objectB)
            {
                arb = carb;
                break;
            }
        }

        if (arb !== null && arb.skipDiscreteCollisions)
        {
            arb.skipDiscreteCollisions = false;
            return;
        }

        // If arbiter does not already exist, create a new one.
        var fresh = (arb === null);
        if (fresh)
        {
            arb = WebGLPhysicsArbiter.allocate(shapeA, shapeB, objectA, objectB);
        }

        var cache = this.narrowCache;
        cache.shapeA = shapeA;
        cache.shapeB = shapeB;

        // 'warm-start' contact solver with a guess direction of MTV
        if (arb.contacts.length !== 0)
        {
            //var basis = arb.contacts[0].basis;
            var data = arb.contacts[0];
            // VMath.v3Copy(c.normal, cache.axis);
            cache.axis[0] = data[12];
            cache.axis[1] = data[13];
            cache.axis[2] = data[14];
        }

        var contact;
        var collided = false;

        //
        // Special case for triangle meshes.
        //
        if (shapeA.type === "TRIANGLE_MESH" || shapeB.type === "TRIANGLE_MESH")
        {
            var meshShape, otherShape;
            var meshXForm, otherXForm;
            var triangle = this.narrowTriangle;
            var cache2 = this.narrowCache2;

            if (shapeA.type === "TRIANGLE_MESH")
            {
                meshShape = shapeA;
                meshXForm = objectA.transform;
                otherShape = shapeB;
                otherXForm = objectB.transform;
                cache2.shapeA = triangle;
                cache2.shapeB = cache.shapeB;
            }
            else
            {
                meshShape = shapeB;
                meshXForm = objectB.transform;
                otherShape = shapeA;
                otherXForm = objectA.transform;
                cache2.shapeA = cache.shapeA;
                cache2.shapeB = triangle;
            }

            var triangleArray = meshShape.triangleArray;
            triangle.triangleArray = triangleArray;
            triangle.collisionRadius = meshShape.collisionRadius;

            var numTriangles;

            if (triangleArray.spatialMap)
            {
                // determine AABB of non-triangle mesh object in local coordinates
                // of triangle mesh.
                var transform = this.narrowTransform;
                var fakeBody = this.narrowFakeBody;
                var extents = this.narrowExtents;

                //var itransform = VMath.m43InverseOrthonormal(meshXForm);
                VMath.m43InverseOrthonormal(meshXForm, transform);
                VMath.m43Mul(otherXForm, transform, fakeBody.transform);
                fakeBody.shape = otherShape;
                WebGLPhysicsPrivateBody.prototype.calculateExtents.call(fakeBody, extents);

                // Find all triangles to test against.
                var triangles = this.persistantTrianglesList;
                numTriangles = triangleArray.spatialMap.getOverlappingNodes(extents, triangles, 0);
                for (i = 0; i < numTriangles; i += 1)
                {
                    var index = triangles[i].index;
                    triangle.index = index;
                    // Prevent GC issues from object being kept in persistent array
                    triangles[i] = undefined;

                    // Shortcut! Check that shape intersects plane of triangle
                    if (!this.trianglePlaneDiscard(otherShape, otherXForm, triangleArray, index, meshXForm))
                    {
                        contact = this.contactPairTest(cache2, objectA.transform, objectB.transform);
                        if (contact < 0)
                        {
                            arb.insertContact(cache2.closestA, cache2.closestB, cache2.axis, contact, true);
                            collided = true;
                        }
                    }
                }
            }
            else
            {
                // If triangle mesh is small, no AABBTree exists
                // And we check all triangles brute-force.
                numTriangles = triangleArray.numTriangles;
                for (i = 0; i < numTriangles; i += 1)
                {
                    triangle.index = (i * WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE);
                    if (!this.trianglePlaneDiscard(otherShape, otherXForm, triangleArray, triangle.index, meshXForm))
                    {
                        contact = this.contactPairTest(cache2, objectA.transform, objectB.transform);
                        if (contact < 0)
                        {
                            arb.insertContact(cache2.closestA, cache2.closestB, cache2.axis, contact, true);
                            collided = true;
                        }
                    }
                }
            }
        }
        //
        // Default case, both objects are convex.
        //
        else {
            contact = this.contactPairTest(cache, objectA.transform, objectB.transform);
            if (contact < 0)
            {
                arb.insertContact(cache.closestA, cache.closestB, cache.axis, contact);
                collided = true;
            }
        }

        if (collided)
        {
            // New arbiter, add to object lists.
            if (fresh)
            {
                this.activeArbiters.push(arb);
                arb.active = true;
                objectA.arbiters.push(arb);
                objectB.arbiters.push(arb);
            }

            // Wake objects if sleeping, they've just collided!
            if (objectA.permitSleep && !objectA.active)
            {
                this.wakeBody(objectA);
            }
            if (objectB.permitSleep && !objectB.active)
            {
                this.wakeBody(objectB);
            }

            // If arbiter was sleeping, then waking it
            if (!arb.active)
            {
                arb.active = true;
                this.activeArbiters.push(arb);
            }
        }
        else if (fresh)
        {
            // New arbiter, but no collision means we should
            // immediately deallocate for re-use.
            WebGLPhysicsArbiter.deallocate(arb);
        }
    },

    // Compute islands of interaction rigid bodies and constraints
    // And put to sleep those islands that are to be considered
    // stationary.
    computeSleeping : function computeSleepingFn(timeStep)
    {
        // Implementation of union-find algorithm with union by rank
        // and path compression.
        function _unify(x, y)
        {
            var xr = _find(x);
            var yr = _find(y);
            if (xr !== yr)
            {
                if (xr.islandRank < yr.islandRank)
                {
                    xr.islandRoot = yr;
                }
                else if (xr.islandRank > yr.islandRank)
                {
                    yr.islandRoot = xr;
                }
                else
                {
                    yr.islandRoot = xr;
                    xr.islandRank += 1;
                }
            }
        }

        function _find(x)
        {
            if (x === x.islandRoot)
            {
                return x;
            }

            var root = x;
            var stack = null;
            var next;
            while (root !== root.islandRoot)
            {
                next = root.islandRoot;
                root.islandRoot = stack;
                stack = root;
                root = next;
            }

            while (stack !== null)
            {
                next = stack.islandRoot;
                stack.islandRoot = root;
                stack = next;
            }
            return root;
        }

        var objectA, objectB;

        // Build disjoint set forest
        // based on active arbiters and constraints.
        var arbiters = this.activeArbiters;
        var bodies = this.activeBodies;
        var constraints = this.activeConstraints;

        var n;
        var maxN = arbiters.length;
        for (n = 0; n < maxN; n += 1)
        {
            var arb = arbiters[n];
            objectA = arb.objectA;
            objectB = arb.objectB;
            if (objectA.permitSleep && objectB.permitSleep)
            {
                _unify(objectA, objectB);
            }
        }

        maxN = constraints.length;
        var con;
        for (n = 0; n < maxN; n += 1)
        {
            con = constraints[n];
            objectA = con.bodyA;
            objectB = con.bodyB;
            if (objectA && objectA.permitSleep)
            {
                _unify(objectA, con);
            }
            if (objectB && objectB.permitSleep)
            {
                _unify(objectB, con);
            }
        }

        // Build islands
        var islands = [];
        var island, body, root;
        while (bodies.length > 0)
        {
            body = bodies.pop();
            root = _find(body);
            island = root.island;
            if (!island)
            {
                island = root.island = WebGLPhysicsIsland.allocate();
                islands.push(island);
                island.active = false;
            }

            body.island = island;
            island.bodies.push(body);
            island.active = island.active || body.isActive(timeStep);
            if (body.wakeTimeStamp > island.wakeTimeStamp)
            {
                island.wakeTimeStamp = body.wakeTimeStamp;
            }
        }

        while (constraints.length > 0)
        {
            con = constraints.pop();
            root = _find(con);
            island = root.island;
            if (!island)
            {
                island = root.island = WebGLPhysicsIsland.allocate();
                islands.push(island);
                island.active = true;
            }

            con.island = island;
            island.constraints.push(con);
            if (con.wakeTimeStamp > island.wakeTimeStamp)
            {
                island.wakeTimeStamp = con.wakeTimeStamp;
            }
        }

        // Build new active bodies, destroying islands
        // Keep sleeping islands implicitly through references in sleeping bodies.
        while (islands.length > 0)
        {
            island = islands.pop();
            if (island.active)
            {
                while (island.bodies.length > 0)
                {
                    body = island.bodies.pop();
                    body.wakeTimeStamp = island.wakeTimeStamp;
                    bodies.push(body);

                    // reset for next iteration of computeSleeping
                    body.islandRoot = body;
                    body.islandRank = 0;
                    body.island = null;
                }

                while (island.constraints.length > 0)
                {
                    con = island.constraints.pop();
                    con.wakeTimeStamp = island.wakeTimeStamp;
                    constraints.push(con);

                    // reset for next iteration of computeSleeping
                    con.islandRoot = con;
                    con.islandRank = 0;
                    con.island = null;
                }

                WebGLPhysicsIsland.deallocate(island);
            }
            else
            {
                maxN = island.bodies.length;
                for (n = 0; n < maxN; n += 1)
                {
                    body = island.bodies[n];
                    body.velocity[0] = body.velocity[1] = body.velocity[2] = 0;
                    body.velocity[3] = body.velocity[4] = body.velocity[5] = 0;
                    body.active = false;
                    this.syncBody(body);

                    // reset for next iteration of computeSleeping
                    body.islandRoot = body;
                    body.islandRank = 0;
                }

                maxN = island.constraints.length;
                for (n = 0; n < maxN; n += 1)
                {
                    con = island.constraints[n];
                    con.active = false;

                    // reset for next iteration of computeSleeping
                    con.islandRoot = con;
                    con.islandRank = 0;
                }
            }
        }
    },

    // Wake up a sleeping island.
    wakeIsland : function wakeIslandFn(island)
    {
        while (island.bodies.length > 0)
        {
            var body = island.bodies.pop();
            body.wakeTimeStamp = this.timeStamp + (this.midStep ? 0 : 1);
            this.activeBodies.push(body);

            var n;
            var arbiters = body.arbiters;
            var maxN = arbiters.length;
            for (n = 0; n < maxN; n += 1)
            {
                var arb = arbiters[n];
                if (!arb.active)
                {
                    arb.active = true;
                    this.activeArbiters.push(arb);
                }
            }

            body.active = true;
            body.island = null;
            this.syncBody(body);
        }

        while (island.constraints.length > 0)
        {
            var constraint = island.constraints.pop();
            constraint.wakeTimeStamp = this.timeStamp + (this.midStep ? 0 : 1);
            this.activeConstraints.push(constraint);

            constraint.active = true;
            constraint.island = null;
        }

        WebGLPhysicsIsland.deallocate(island);
    },

    wakeRelated : function wakeRelatedFn(body)
    {
        // Wake any related constraints
        var constraints = body.constraints;
        var n;
        var maxN = constraints.length;
        for (n = 0; n < maxN; n += 1)
        {
            this.wakeConstraint(constraints[n]);
        }

        // Wake any touching bodies
        var arbiters = body.arbiters;
        maxN = arbiters.length;
        for (n = 0; n < maxN; n += 1)
        {
            var arb = arbiters[n];
            if (!arb.active)
            {
                arb.active = true;
                this.activeArbiters.push(arb);
            }

            if (arb.objectA.permitSleep && !arb.objectA.active)
            {
                this.wakeBody(arb.objectA);
            }
            if (arb.objectB.permitSleep && !arb.objectB.active)
            {
                this.wakeBody(arb.objectB);
            }
        }
    },

    // Wake up a rigid body.
    wakeBody : function wakeBodyFn(body)
    {
        if (body.collisionObject && !body.kinematic)
        {
            this.wakeRelated(body);
            this.syncBody(body);
        }
        else if (body.kinematic)
        {
            body.delaySleep = true;
            if (!body.active)
            {
                body.active = true;
                this.activeKinematics.push(body);

                this.wakeRelated(body);
                this.syncBody(body);
            }
        }
        else
        {
            body.wakeTimeStamp = this.timeStamp + (this.midStep ? 0 : 1);
            if (!body.active)
            {
                if (!body.island)
                {
                    body.active = true;
                    this.activeBodies.push(body);

                    this.wakeRelated(body);
                    this.syncBody(body);
                }
                else
                {
                    this.wakeIsland(body.island);
                }

                // Synchronise body with broadphase.
                this.syncBody(body);
            }
        }
    },

    // Sync body with broadphase
    syncBody : function syncBodyFn(body)
    {
        var extents = this.syncExtents;
        body.calculateExtents(extents);
        if (body.collisionObject && !body.kinematic)
        {
            this.staticSpatialMap.update(body, extents);
        }
        else
        {
            if (body.active)
            {
                if (!body.previouslyActive)
                {
                    this.staticSpatialMap.remove(body);
                    this.dynamicSpatialMap.add(body, extents);
                }
                else
                {
                    this.dynamicSpatialMap.update(body, extents);
                }
            }
            else
            {
                if (body.previouslyActive)
                {
                    this.dynamicSpatialMap.remove(body);
                    this.staticSpatialMap.add(body, extents);
                }
                else
                {
                    this.staticSpatialMap.update(body, extents);
                }
            }

            body.previouslyActive = body.active;
        }
    },

    // Wake up a constraint
    wakeConstraint : function wakeConstraintFn(constraint)
    {
        constraint.wakeTimeStamp = this.timeStamp + (this.midStep ? 0 : 1);
        if (!constraint.active)
        {
            if (!constraint.island)
            {
                constraint.active = true;
                this.activeConstraints.push(constraint);

                if (constraint.bodyA)
                {
                    this.wakeBody(constraint.bodyA);
                }
                if (constraint.bodyB)
                {
                    this.wakeBody(constraint.bodyB);
                }
            }
            else
            {
                this.wakeIsland(constraint.island);
            }
        }
    },

    // Implemenmtation of Conservative Advancement for two moving objects.
    dynamicSweep : function dynamicSweepFn(toi, timeStep, lowerBound, negRadius)
    {
        var objectA = toi.objectA;
        var objectB = toi.objectB;
        var axis = toi.axis;

        // Compute start guess on best axis.
        var vel1 = objectA.velocity;
        var axis0 = -vel1[0];
        var axis1 = -vel1[1];
        var axis2 = -vel1[2];

        var vel2 = objectB.velocity;
        axis0 += vel2[0];
        axis1 += vel2[1];
        axis2 += vel2[2];

        if (((axis0 * axis0) + (axis1 * axis1) + (axis2 * axis2)) < WebGLPhysicsConfig.DONT_NORMALIZE_THRESHOLD)
        {
            toi.toi = undefined;
            return;
        }

        axis[0] = axis0;
        axis[1] = axis1;
        axis[2] = axis2;

        // Compute relative linear velocity, and angular bias for distance calculations.
        var delta0 = -axis0;
        var delta1 = -axis1;
        var delta2 = -axis2;
        var angBias = 0;

        var radiusA, radiusB;
        if (!objectA.fixedRotation)
        {
            radiusA = objectA.shape.radius;
            angBias += radiusA * Math.sqrt((vel1[3] * vel1[3]) + (vel1[4] * vel1[4]) + (vel1[5] * vel1[5]));
        }

        if (!objectB.fixedRotation)
        {
            radiusB = objectB.shape.radius;
            angBias += radiusB * Math.sqrt((vel2[3] * vel2[3]) + (vel2[4] * vel2[4]) + (vel2[5] * vel2[5]));
        }

        // If relative velocity is small, then don't bother continuing as continuous detection is
        // not needed. If angular bias is too large, then we must however continue.
        if (angBias < (WebGLPhysicsConfig.CONTINUOUS_ANGULAR_BULLET / timeStep))
        {
            var radius = (radiusA < radiusB) ? radiusA : radiusB;
            radius *= WebGLPhysicsConfig.CONTINUOUS_LINEAR_BULLET / timeStep;
            if (((delta0 * delta0) + (delta1 * delta1) + (delta2 * delta2)) < (radius * radius))
            {
                toi.toi = undefined;
                return;
            }
        }

        var curIter = 0;
        var maxIter = 100;
        var curTOI = lowerBound;
        for (;;)
        {
            objectA.integratePosition(curTOI * timeStep);
            objectB.integratePosition(curTOI * timeStep);

            var nextContact = this.contactPairTest(toi, objectA.transform, objectB.transform);
            var seperation = nextContact;
            if (nextContact !== undefined)
            {
                seperation += negRadius;
            }

            // objects intersecting!
            // abort!
            if (seperation === undefined || seperation < WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
            {
                if (!this.seperatingTOI(toi))
                {
                    toi.distance = nextContact;
                }
                else
                {
                    curTOI = undefined;
                }
                break;
            }

            // lower bound on TOI advancement.
            var dot = (axis[0] * delta0) + (axis[1] * delta1) + (axis[2] * delta2);
            var denom = (angBias - dot) * timeStep;
            if (denom <= 0)
            {
                curTOI = undefined;
                break;
            }

            curTOI += seperation / denom;
            if (curTOI >= 1)
            {
                curTOI = undefined;
                break;
            }

            curIter += 1;
            if (curIter > maxIter)
            {
                curTOI = undefined;
                break;
            }
        }

        toi.toi = curTOI;
    },

    // Determine if TOI event corresponds to a seperation of the objects, and can be ignored.
    seperatingTOI : function seperatingTOIFn(toi)
    {
        var objectA = toi.objectA;
        var objectB = toi.objectB;
        var supportA = toi.closestA;
        var supportB = toi.closestB;

        var velA = objectA.velocity;
        var velB = objectB.velocity;

        var vrel0 = velA[0] - velB[0];
        var vrel1 = velA[1] - velB[1];
        var vrel2 = velA[2] - velB[2];

        if (!objectA.fixedRotation)
        {
            var relA0 = supportA[0] - objectA.transform[9];
            var relA1 = supportA[1] - objectA.transform[10];
            var relA2 = supportA[2] - objectA.transform[11];

            vrel0 += (velA[4] * relA2) - (velA[5] * relA1);
            vrel1 += (velA[5] * relA0) - (velA[3] * relA2);
            vrel2 += (velA[3] * relA1) - (velA[4] * relA0);
        }

        if (!objectB.fixedRotation)
        {
            var relB0 = supportB[0] - objectB.transform[9];
            var relB1 = supportB[1] - objectB.transform[10];
            var relB2 = supportB[2] - objectB.transform[11];

            vrel0 -= (velB[4] * relB2) - (velB[5] * relB1);
            vrel1 -= (velB[5] * relB0) - (velB[3] * relB2);
            vrel2 -= (velB[3] * relB1) - (velB[4] * relB0);
        }

        var axis = toi.axis;
        var dot = (vrel0 * axis[0]) + (vrel1 * axis[1]) + (vrel2 * axis[2]);
        return dot >= 0;
    },

    // Implemenmtation of Conservative Advancement for a moving body against a static body.
    // (Optimised compared with dynamicSweep)
    staticSweep : function staticSweepFn(toi, timeStep, lowerBound, negRadius)
    {
        var objectA = toi.objectA; //dynamic
        var objectB = toi.objectB; //static
        var axis = toi.axis;

        // Compute start guess on best axis.
        var vel = objectA.velocity;
        var axis0 = -vel[0];
        var axis1 = -vel[1];
        var axis2 = -vel[2];

        if (((axis0 * axis0) + (axis1 * axis1) + (axis2 * axis2)) < WebGLPhysicsConfig.DONT_NORMALIZE_THRESHOLD)
        {
            toi.toi = undefined;
            return;
        }

        axis[0] = axis0;
        axis[1] = axis1;
        axis[2] = axis2;

        // Compute relative linear velocity, and angular bias for distance calculations.
        var delta0 = -axis0;
        var delta1 = -axis1;
        var delta2 = -axis2;
        var angBias = 0;
        if (!objectA.fixedRotationtype)
        {
            angBias += objectA.shape.radius * Math.sqrt((vel[3] * vel[3]) + (vel[4] * vel[4]) + (vel[5] * vel[5]));
        }

        var curIter = 0;
        var maxIter = 100;
        var curTOI = lowerBound;
        for (;;)
        {
            objectA.integratePosition(curTOI * timeStep);

            var nextContact = this.contactPairTest(toi, objectA.transform, objectB.transform);
            var seperation = nextContact;
            if (nextContact !== undefined)
            {
                seperation += negRadius;
            }

            // objects intersecting!
            // abort!
            if (seperation === undefined || seperation < WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
            {
                if (!this.seperatingTOI(toi))
                {
                    toi.distance = nextContact;
                }
                else
                {
                    curTOI = undefined;
                }
                break;
            }

            // lower bound on TOI advancement.
            var dot = (axis[0] * delta0) + (axis[1] * delta1) + (axis[2] * delta2);
            var denom = (angBias - dot) * timeStep;
            if (denom <= 0)
            {
                curTOI = undefined;
                break;
            }

            curTOI += seperation / denom;
            if (curTOI >= 1)
            {
                curTOI = undefined;
                break;
            }

            curIter += 1;
            if (curIter > maxIter)
            {
                curTOI = undefined;
                break;
            }
        }

        toi.toi = curTOI;
    },

    performStaticTOIBase : function performStaticTOIBaseFn(slop, timeStep, events, numEvents, objectA, objectB)
    {
        var triangles = this.persistantTrianglesList;
        // Objects used in all executions of continuous collisions.
        if (this.continuousFakeBody === undefined)
        {
            this.continuousFakeBody = {
                shape : null,
                transform : VMath.m43BuildIdentity(),
                startTransform : VMath.m43BuildIdentity()
            };
            this.continuousInvTransform = VMath.m43BuildIdentity();
            this.continuousExtents = new Float32Array(6);
        }
        var fakeBody = this.continuousFakeBody;
        var invTransform = this.continuousInvTransform;
        var extents = this.continuousExtents;

        var toi;
        //ObjectB static/kinematic.
        if (objectB.shape.type === "TRIANGLE_MESH")
        {
            var triangleArray = objectB.shape.triangleArray;
            var numTriangles, k;
            if (triangleArray.spatialMap)
            {
                fakeBody.shape = objectA.shape;
                // Find AABB encompassing swept shape, in local coordinate system of triangle mesh
                VMath.m43InverseOrthonormal(objectB.transform, invTransform);
                VMath.m43Mul(objectA.startTransform, invTransform, fakeBody.startTransform);
                VMath.m43Mul(objectA.endTransform, invTransform, fakeBody.transform);
                WebGLPhysicsPrivateBody.prototype.calculateSweptExtents.call(fakeBody, extents);

                numTriangles = triangleArray.spatialMap.getOverlappingNodes(extents, triangles, 0);
                for (k = 0; k < numTriangles; k += 1)
                {
                    toi = WebGLPhysicsTOIEvent.allocate();
                    toi.objectA = objectA;
                    toi.objectB = objectB;
                    toi.shapeA = objectA.shape;
                    toi.shapeB = WebGLPhysicsTriangleShape.allocate();
                    toi.shapeB.index = triangles[k].index;

                    // prevent possible GC issues
                    triangles[k] = undefined;

                    toi.shapeB.triangleArray = objectB.shape.triangleArray;
                    toi.shapeB.collisionRadius = objectB.shape.collisionRadius;
                    toi.concave = true;

                    this.staticSweep(toi, timeStep, 0, slop);
                    if (toi.toi === undefined)
                    {
                        WebGLPhysicsTOIEvent.deallocate(toi);
                        continue;
                    }

                    toi.frozenA = false;
                    toi.frozenB = true;

                    events[numEvents] = toi;
                    numEvents += 1;
                }
            }
            else
            {
                numTriangles = triangleArray.numTriangles;
                for (k = 0; k < numTriangles; k += 1)
                {
                    toi = WebGLPhysicsTOIEvent.allocate();
                    toi.objectA = objectA;
                    toi.objectB = objectB;
                    toi.shapeA = objectA.shape;
                    toi.shapeB = WebGLPhysicsTriangleShape.allocate();
                    toi.shapeB.index = k * WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE;
                    toi.shapeB.triangleArray = objectB.shape.triangleArray;
                    toi.shapeB.collisionRadius = objectB.shape.collisionRadius;
                    toi.concave = true;

                    this.staticSweep(toi, timeStep, 0, slop);
                    if (toi.toi === undefined)
                    {
                        WebGLPhysicsTOIEvent.deallocate(toi);
                        continue;
                    }

                    toi.frozenA = false;
                    toi.frozenB = true;

                    events[numEvents] = toi;
                    numEvents += 1;
                }
            }
        }
        else
        {
            toi = WebGLPhysicsTOIEvent.allocate();
            toi.objectA = objectA;
            toi.objectB = objectB;
            toi.shapeA = objectA.shape;
            toi.shapeB = objectB.shape;

            this.staticSweep(toi, timeStep, 0, slop);
            if (toi.toi === undefined)
            {
                WebGLPhysicsTOIEvent.deallocate(toi);
                return numEvents;
            }

            toi.frozenA = false;
            toi.frozenB = true;

            events[numEvents] = toi;
            numEvents += 1;
        }

        return numEvents;
    },

    update : function updateFn()
    {
        var dynamicMap = this.dynamicSpatialMap;
        var staticMap = this.staticSpatialMap;
        var rigidBodies = this.activeBodies;
        var kinematics = this.activeKinematics;
        var constraints = this.activeConstraints;
        var arbiters = this.activeArbiters;
        var gravity = this.gravity;

        var performance = this.performanceData;
        performance.discrete = 0;
        performance.sleepComputation = 0;
        performance.prestepContacts = 0;
        performance.prestepConstraints = 0;
        performance.integrateVelocities = 0;
        performance.warmstartContacts = 0;
        performance.warmstartConstraints = 0;
        performance.physicsIterations = 0;
        performance.integratePositions = 0;
        performance.continuous = 0;

        var prevTime = this.prevTimeStamp;
        if (prevTime === undefined)
        {
            this.prevTimeStamp = TurbulenzEngine.time;
            return;
        }

        // Compute number of sub-steps needed.
        var curTime = TurbulenzEngine.time;
        var timeDelta = (curTime - prevTime);

        var numSteps, timeStep;
        if (this.variableStep)
        {
            var minTimeStep = this.variableMinStep;
            var maxTimeStep = this.variableMaxStep;

            numSteps = Math.ceil(timeDelta / maxTimeStep);
            timeStep = (timeDelta / numSteps);

            // cap timeStep to lower bound.
            if (timeStep < minTimeStep)
            {
                timeStep = minTimeStep;
                numSteps = Math.floor(timeDelta / timeStep);
            }

            if (numSteps > this.maxSubSteps && this.maxGiveUpTimeStep !== 0)
            {
                numSteps = Math.ceil(timeDelta / this.maxGiveUpTimeStep);
                timeStep = (timeDelta / numSteps);
            }
        }
        else
        {
            timeStep = this.fixedTimeStep;
            numSteps = Math.floor(timeDelta / timeStep);

            if (numSteps > this.maxSubSteps && this.maxGiveUpTimeStep !== 0)
            {
                numSteps = Math.ceil(timeDelta / this.maxGiveUpTimeStep);
                timeStep = (timeDelta / numSteps);
            }
        }

        if (numSteps <= 0)
        {
            return;
        }

        // update physics time stamp regardless of
        // capping of sub step count. Otherwise time will just accumulate endlessly.
        this.prevTimeStamp += (timeStep * numSteps);

        // cap number of substeps to upper bound.
        if (numSteps > this.maxSubSteps)
        {
            numSteps = this.maxSubSteps;
        }

        this.midStep = true;

        // Determine velocities for kinematic objects.
        // And move them back to their old position (Use velocity to move it forwards in sub steps)
        var limit, i;
        var body;
        limit = kinematics.length;
        for (i = 0; i < limit;)
        {
            body = kinematics[i];
            if (!body.computeDeltaVelocity(timeStep * numSteps, body.prevTransform, body.transform) &&
                !body.delaySleep)
            {
                body.active = false;

                limit -= 1;
                kinematics[i] = kinematics[limit];
                kinematics.pop();

                this.syncBody(body);
            }
            else
            {
                VMath.m43Copy(body.transform, body.newTransform);
                VMath.m43Copy(body.prevTransform, body.transform);
                i += 1;
            }

            body.delaySleep = false;
        }

        // Perform substeps.
        var substep;
        for (substep = 0; substep < numSteps; substep += 1)
        {
            var j, extents;

            this.timeStamp += 1;
            var preTime;

            if (this.prevTimeStep === undefined)
            {
                this.prevTimeStep = timeStep;
            }

            var timeStepRatio = timeStep / this.prevTimeStep;
            this.prevTimeStep = timeStep;

            // ####################################################################

            // Update spatial maps with body positions and refresh inertia tensors.
            limit = rigidBodies.length;
            for (i = 0; i < limit; i += 1)
            {
                body = rigidBodies[i];

                extents = body.extents;
                body.calculateExtents(extents);
                dynamicMap.update(body, extents);

                body.refreshInertiaTensor();
            }

            limit = kinematics.length;
            for (i = 0; i < limit; i += 1)
            {
                body = kinematics[i];

                extents = body.extents;
                body.calculateExtents(extents);
                dynamicMap.update(body, extents);
            }

            // ####################################################################

            preTime = TurbulenzEngine.time;

            // Prepare broadphase
            staticMap.finalize();
            dynamicMap.finalize();

            // Perform broadphase

            // We compute first pairs of dynamic-dynamic objects
            //    objects = [ a0, a1, b0, b1, c0, c1, d0, d1 ... ]
            // We then compute pairs of dynamic-static/sleeping objects in compressed form.
            //    objects = [ ... a0, a1, a2, a3, a4, a0, ..., b0, b1, b2, b3, b4, b0 ... ]
            // where we can determine the start of a new compressed sublist by checking that
            // we are not checknig the pair (x, x)
            var objects = this.persistantObjectsList;

            // Get overlapping pairs of dynamic objects.
            var numDynDyn = dynamicMap.getOverlappingPairs(objects, 0);

            // Get overlapping pairs of static <-> dynamic objects.
            var storageIndex = numDynDyn;
            var numPairs;
            limit = rigidBodies.length;
            for (i = 0; i < limit; i += 1)
            {
                body = rigidBodies[i];
                numPairs = staticMap.getOverlappingNodes(body.extents, objects, storageIndex + 1);
                // only include sublist if number of pairs is non-zero.
                if (numPairs !== 0)
                {
                    objects[storageIndex] = body;
                    storageIndex += 1 + numPairs;
                    objects[storageIndex] = body;
                    storageIndex += 1;
                }
            }

            // Get overlapping pairs of kinematic <-> sleeping dynamic
            limit = kinematics.length;
            for (i = 0; i < limit; i += 1)
            {
                body = kinematics[i];

                numPairs = staticMap.getOverlappingNodes(body.extents, objects, storageIndex + 1);
                // only include sublist if number of pairs is non-zero.
                if (numPairs !== 0)
                {
                    objects[storageIndex] = body;
                    storageIndex += 1 + numPairs;
                    objects[storageIndex] = body;
                    storageIndex += 1;
                }
            }

            // Find contacts for dynamic-dynamic pairs
            // As well as kinematic-dynamic pairs.
            var objectA, objectB;
            for (i = 0; i < numDynDyn; i += 2)
            {
                objectA = objects[i];
                objectB = objects[i + 1];

                // prevent GC issues
                objects[i] = undefined;
                objects[i + 1] = undefined;
                if (!this.filtered(objectA, objectB))
                {
                    if (objectA.id < objectB.id)
                    {
                        this.narrowPhase(objectA.shape, objectB.shape, objectA, objectB);
                    }
                    else
                    {
                        this.narrowPhase(objectB.shape, objectA.shape, objectB, objectA);
                    }
                }
            }

            // Find contacts for dynamic-static/sleep pairs and kinematic/sleep-pairs
            for (i = numDynDyn; i < storageIndex;)
            {
                objectA = objects[i];
                // prevent GC issues
                objects[i] = undefined;

                i += 1;
                for (;;)
                {
                    objectB = objects[i];
                    //prevent GC issues
                    objects[i] = undefined;
                    i += 1;

                    // end of sub list.
                    if (objectA === objectB)
                    {
                        break;
                    }

                    if (!this.filtered(objectA, objectB))
                    {
                        if (objectA.id < objectB.id)
                        {
                            this.narrowPhase(objectA.shape, objectB.shape, objectA, objectB);
                        }
                        else
                        {
                            this.narrowPhase(objectB.shape, objectA.shape, objectB, objectA);
                        }
                    }
                }
            }
            performance.discrete += (TurbulenzEngine.time - preTime);

            // ####################################################################
            // Compute islands and perform sleeping.

            preTime = TurbulenzEngine.time;
            this.computeSleeping(timeStep);
            performance.sleepComputation += (TurbulenzEngine.time - preTime);

            // ####################################################################

            // Prestep arbiters
            preTime = TurbulenzEngine.time;
            i = 0;
            var arb;
            while (i < arbiters.length)
            {
                arb = arbiters[i];
                if (!arb.objectA.active && !arb.objectB.active)
                {
                    arb.active = false;
                    arbiters[i] = arbiters[arbiters.length - 1];
                    arbiters.pop();
                    continue;
                }

                if (arb.refreshContacts())
                {
                    arbiters[i] = arbiters[arbiters.length - 1];
                    arbiters.pop();

                    var bodyArbiters = arb.objectA.arbiters;
                    bodyArbiters[bodyArbiters.indexOf(arb)] = bodyArbiters[bodyArbiters.length - 1];
                    bodyArbiters.pop();

                    bodyArbiters = arb.objectB.arbiters;
                    bodyArbiters[bodyArbiters.indexOf(arb)] = bodyArbiters[bodyArbiters.length - 1];
                    bodyArbiters.pop();

                    WebGLPhysicsArbiter.deallocate(arb);
                    continue;
                }

                arb.preStep(timeStepRatio, timeStep);
                i++;
            }
            performance.prestepContacts += (TurbulenzEngine.time - preTime);

            preTime = TurbulenzEngine.time;
            // Prestep constraints
            limit = constraints.length;
            for (i = 0; i < limit; i += 1)
            {
                constraints[i].preStep(timeStepRatio, timeStep);
            }
            performance.prestepConstraints += (TurbulenzEngine.time - preTime);

            // ####################################################################

            preTime = TurbulenzEngine.time;
            // Integrate velocities, apply gravity
            limit = rigidBodies.length;
            for (i = 0; i < limit; i += 1)
            {
                body = rigidBodies[i];
                body.integrateVelocity(gravity, timeStep);
            }

            performance.integrateVelocities += (TurbulenzEngine.time - preTime);

            // ####################################################################

            preTime = TurbulenzEngine.time;
            // Warmstart arbiters
            limit = arbiters.length;
            for (i = 0; i < limit; i += 1)
            {
                arbiters[i].applyCachedImpulses();
            }
            performance.warmstartContacts += (TurbulenzEngine.time - preTime);

            preTime = TurbulenzEngine.time;
            // Warmstart constraints
            limit = constraints.length;
            for (i = 0; i < limit; i += 1)
            {
                constraints[i].applyCachedImpulses();
            }
            performance.warmstartConstraints += (TurbulenzEngine.time - preTime);

            // ####################################################################

            preTime = TurbulenzEngine.time;
            // Physics iterations
            var numIterations = 10; //TODO: make configurable.
            for (i = 0; i < numIterations; i += 1)
            {
                limit = arbiters.length;
                for (j = 0; j < limit; j += 1)
                {
                    arbiters[j].computeAndApplyImpulses();
                }

                limit = constraints.length;
                for (j = 0; j < limit; j += 1)
                {
                    constraints[j].computeAndApplyImpulses();
                }
            }

            numIterations = 3; //TODO: make configurable.
            limit = arbiters.length;
            for (i = 0; i < numIterations; i += 1)
            {
                for (j = 0; j < limit; j += 1)
                {
                    arbiters[j].computeAndApplyBiasImpulses();
                }
            }

            performance.physicsIterations += (TurbulenzEngine.time - preTime);

            // ####################################################################

            // Apply bias velocities to get start transform for sweeps.
            // Then integrate positions to get end transform for sweeps.
            // Syncing bodies into broadphase with swept AABB.
            var unfrozen = this.persistantObjectsList2;
            var numUnfrozen = 0;

            preTime = TurbulenzEngine.time;
            limit = rigidBodies.length;
            var radius;

            var timeStepSq = timeStep * timeStep;

            var xform0, xform1;
            for (i = 0; i < limit; i += 1)
            {
                body = rigidBodies[i];
                body.applyBiasVelocities(timeStep);
                body.integratePosition(timeStep);

                // If body is moving very slowly, don't bother doing any continuous
                if (!body.isActiveVelocity(WebGLPhysicsConfig.CONTINUOUS_LINEAR_SQ / timeStep,
                                           WebGLPhysicsConfig.CONTINUOUS_ANGULAR_SQ / timeStep))
                {
                    body.sweepFrozen = true;
                    body.bullet = false;
                    continue;
                }

                // cached for triangle mesh lookups.
                //VMath.m43Copy(body.transform, body.endTransform);
                xform0 = body.transform;
                xform1 = body.endTransform;
                xform1[0] = xform0[0];
                xform1[1] = xform0[1];
                xform1[2] = xform0[2];
                xform1[3] = xform0[3];
                xform1[4] = xform0[4];
                xform1[5] = xform0[5];
                xform1[6] = xform0[6];
                xform1[7] = xform0[7];
                xform1[8] = xform0[8];
                xform1[9] = xform0[9];
                xform1[10] = xform0[10];
                xform1[11] = xform0[11];

                // determine if body should be a bullet.
                radius = body.shape.radius * WebGLPhysicsConfig.CONTINUOUS_LINEAR_BULLET;

                var vel = body.velocity;
                var vlsq = ((vel[0] * vel[0]) + (vel[1] * vel[1]) + (vel[2] * vel[2])) * timeStepSq;
                var wlsq = ((vel[3] * vel[3]) + (vel[4] * vel[4]) + (vel[5] * vel[5])) * timeStepSq;

                body.bullet = vlsq > (radius * radius) ||
                              wlsq > WebGLPhysicsConfig.CONTINUOUS_ANGULAR_BULLET;

                extents = body.extents;
                body.calculateSweptExtents(extents);
                dynamicMap.update(body, extents);

                body.sweepFrozen = false;
                unfrozen[numUnfrozen] = body;
                numUnfrozen += 1;
            }

            limit = kinematics.length;
            for (i = 0; i < limit; i += 1)
            {
                body = kinematics[i];

                VMath.m43Copy(body.transform, body.startTransform);
                body.integratePosition(timeStep);

                extents = body.extents;
                body.calculateSweptExtents(extents);
                dynamicMap.update(body, extents);
            }

            performance.integratePositions += (TurbulenzEngine.time - preTime);

            // ####################################################################

            preTime = TurbulenzEngine.time;

            // We must finalize the broadphase once more.
            // Any objects that have gone to sleep (or been woken up) will have effected
            // the static map.
            // And every dynamic object has been updated in dynamic map with its swept
            // extents for continuous collisions and absolutely must be finalized.
            staticMap.finalize();
            dynamicMap.finalize();

            // Continuous collision detection.
            var slop = WebGLPhysicsConfig.CONTINUOUS_SLOP + WebGLPhysicsConfig.CONTACT_SLOP;

            var events = this.persistantTOIEventList;
            var numEvents = 0;
            var toi;

            // Determine pairs of dynamics with one being a bullet that must be checked for collisions
            numDynDyn = dynamicMap.getOverlappingPairs(objects, 0);
            for (i = 0; i < numDynDyn; i += 2)
            {
                objectA = objects[i];
                objectB = objects[i + 1];

                // prevent possible GC issues.
                objects[i] = undefined;
                objects[i + 1] = undefined;

                if (!((objectA.bullet || objectA.kinematic) || (objectB.bullet || objectB.kinematic)) ||
                    (objectA.sweepFrozen && objectB.sweepFrozen) ||
                    this.filtered(objectA, objectB))
                {
                    continue;
                }

                if (objectA.kinematic || objectB.kinematic)
                {
                    if (objectA.kinematic)
                    {
                        numEvents = this.performStaticTOIBase(slop, timeStep, events, numEvents, objectB, objectA);
                    }
                    else
                    {
                        numEvents = this.performStaticTOIBase(slop, timeStep, events, numEvents, objectA, objectB);
                    }
                }
                else
                {
                    toi = WebGLPhysicsTOIEvent.allocate();
                    toi.objectA = objectA;
                    toi.objectB = objectB;
                    toi.shapeA = objectA.shape;
                    toi.shapeB = objectB.shape;

                    this.dynamicSweep(toi, timeStep, 0, slop);
                    // don't cull non-existant toi's for dynamic-dynamic.
                    // freezing of either object will impact whether a toi
                    // is able to be computed or not. miss too many collisions
                    // by culling too early here.

                    toi.frozenA = objectA.sweepFrozen;
                    toi.frozenB = objectB.sweepFrozen;

                    events[numEvents] = toi;
                    numEvents += 1;
                }
            }

            // Determine pairs of statics dynamics that must be checked for collisions
            for (i = 0; i < numUnfrozen; i += 1)
            {
                objectA = unfrozen[i];
                numPairs = staticMap.getOverlappingNodes(objectA.extents, objects, 0);
                for (j = 0; j < numPairs; j += 1)
                {
                    objectB = objects[j];
                    // prevent possible GC issues
                    objects[j] = undefined;

                    if (this.filtered(objectA, objectB))
                    {
                        continue;
                    }

                    numEvents = this.performStaticTOIBase(slop, timeStep, events, numEvents, objectA, objectB);
                }
            }

            // Time to begin!
            var curTimeAlpha = 0;
            while (curTimeAlpha < 1 && numEvents > 0)
            {
                var minTOI = null;
                var minIndex;

                for (i = 0; i < numEvents;)
                {
                    toi = events[i];

                    objectA = toi.objectA;
                    objectB = toi.objectB;
                    // Check if tOI Event should be culled.
                    if (objectA.sweepFrozen && objectB.sweepFrozen)
                    {
                        numEvents -= 1;
                        if (i !== numEvents)
                        {
                            events[i] = events[numEvents];
                            // prevent possible GC issues
                            events[numEvents] = undefined;
                        }
                        WebGLPhysicsTOIEvent.deallocate(toi);
                        continue;
                    }

                    // Check if TOI Event is invalidated.
                    if ((toi.frozenA !== objectA.sweepFrozen) ||
                        (toi.frozenB !== objectB.sweepFrozen))
                    {
                        // Recompute TOI.
                        toi.frozenA = objectA.sweepFrozen;
                        toi.frozenB = objectB.sweepFrozen;

                        // Check if order of objects in event need swapped
                        // (For staticSweep objectA must be non-frozen)
                        if (toi.frozenA)
                        {
                            toi.objectA = objectB;
                            toi.objectB = objectA;
                            toi.shapeA = objectB.shape;
                            toi.shapeB = objectA.shape;
                            toi.frozenA = false;
                            toi.frozenB = true;
                        }
                        this.staticSweep(toi, timeStep, curTimeAlpha, slop);

                        if (toi.toi === undefined)
                        {
                            numEvents -= 1;
                            if (i !== numEvents)
                            {
                                events[i] = events[numEvents];
                                // prevent possible GC issues
                                events[numEvents] = undefined;
                            }
                            WebGLPhysicsTOIEvent.deallocate(toi);
                            continue;
                        }
                    }

                    if (toi.toi !== undefined && (minTOI === null || (toi.toi < minTOI.toi)))
                    {
                        minTOI = toi;
                        minIndex = i;
                    }

                    i += 1;
                }

                if (minTOI === null)
                {
                    break;
                }

                // remove TOI Event from list.
                numEvents -= 1;
                if (minIndex !== numEvents)
                {
                    events[minIndex] = events[numEvents];
                    // prevent possible GC issues
                    events[numEvents] = undefined;
                }

                // Advance time alpha.
                curTimeAlpha = minTOI.toi;

                // Freeze objects at TOI.
                objectA = minTOI.objectA;
                objectB = minTOI.objectB;
                if (!objectA.collisionObject)
                {
                    if (!objectA.sweepFrozen)
                    {
                        objectA.integratePosition(timeStep * curTimeAlpha);
                        objectA.sweepFrozen = true;
                    }
                    if (objectA.permitSleep && !objectA.active)
                    {
                        this.wakeBody(objectA);
                    }
                }
                if (!objectB.collisionObject)
                {
                    if (!objectB.sweepFrozen)
                    {
                        objectB.integratePosition(timeStep * curTimeAlpha);
                        objectB.sweepFrozen = true;
                    }
                    if (objectB.permitSleep && !objectB.active)
                    {
                        this.wakeBody(objectB);
                    }
                }

                // Flip objects based on id.
                if (objectA.id > objectB.id)
                {
                    var tmp = objectA;
                    objectA = objectB;
                    objectB = tmp;

                    var tmpv = minTOI.closestA;
                    minTOI.closestA = minTOI.closestB;
                    minTOI.closestB = tmpv;

                    tmpv = minTOI.axis;
                    tmpv[0] = -tmpv[0];
                    tmpv[1] = -tmpv[1];
                    tmpv[2] = -tmpv[2];
                }

                var shapeA = objectA.shape;
                var shapeB = objectB.shape;

                // Find existing arbiter for shape pair.
                // Iterating the smaller list of either object.
                arb = null;
                var arbitersA = objectA.arbiters;
                var arbitersB = objectB.arbiters;
                var arbs = (arbitersA.length <= arbitersB.length) ? arbitersA : arbitersB;

                var numArbiters = arbs.length;
                for (i = 0; i < numArbiters; i += 1)
                {
                    var carb = arbs[i];
                    if (carb.shapeA === shapeA && carb.shapeB === shapeB &&
                        carb.objectA === objectA && carb.objectB === objectB)
                    {
                        arb = carb;
                        break;
                    }
                }

                // If arbiter does not already exist, create a new one.
                var fresh = (arb === null);
                if (fresh)
                {
                    arb = WebGLPhysicsArbiter.allocate(shapeA, shapeB, objectA, objectB);
                }

                arb.insertContact(minTOI.closestA, minTOI.closestB, minTOI.axis, minTOI.distance, minTOI.concave);
                if (fresh)
                {
                    arbiters.push(arb);
                    arb.active = true;
                    objectA.arbiters.push(arb);
                    objectB.arbiters.push(arb);
                }

                // Since object transforms do not change. The contact point which will be computed
                // in discrete collision detection at start of next world update, will be exactly
                // this contact point.
                //
                // For that reason it is a waste to perform discrete collision detection in the next update
                // for this pair of objects. This flag represent this fact.
                //
                // For active kinematic objects, the transform may change slightly due to innacuracies
                // and so not skipping discrete may achieve a new contact point and will be beneficial.
                if (!((objectA.kinematic && objectA.active) || (objectB.kinematic && objectB.active)))
                {
                    arb.skipDiscreteCollisions = true;
                }

                WebGLPhysicsTOIEvent.deallocate(minTOI);
            }

            // Prevent possible GC issues.
            while (numEvents > 0)
            {
                numEvents -= 1;
                WebGLPhysicsTOIEvent.deallocate(events[numEvents]);
                events[numEvents] = undefined;
            }

            // Integrate anything unfrozen to end of time step.
            while (numUnfrozen > 0)
            {
                numUnfrozen -= 1;
                objectA = unfrozen[numUnfrozen];

                // prevent possible GC issues
                unfrozen[numUnfrozen] = undefined;

                if (!objectA.sweepFrozen)
                {
                    objectA.integratePosition(timeStep);
                }
            }

            performance.continuous += (TurbulenzEngine.time - preTime);
        }

        // Ensure kinematic bodies are moved 'EXACTLY' to their set transform.
        // (Numerical innacuries in integrations).
        limit = kinematics.length;
        for (i = 0; i < limit; i += 1)
        {
            body = kinematics[i];

            VMath.m43Copy(body.newTransform, body.transform);
            VMath.m43Copy(body.newTransform, body.prevTransform);
        }

        this.midStep = false;
    },

    rayTest : function worldRayTestFn(ray)
    {
        var group = ray.group;
        var mask = ray.mask;
        if (group === undefined)
        {
            group = WebGLPhysicsDevice.prototype.FILTER_DYNAMIC;
        }
        if (mask === undefined)
        {
            mask = WebGLPhysicsDevice.prototype.FILTER_ALL;
        }

        var exclude = ray.exclude;

        // Create parametric ray
        var pRay = {
            origin: ray.from,
            direction: VMath.v3Sub(ray.to, ray.from),
            maxFactor: 1.0
        };

        this.staticSpatialMap.finalize();
        this.dynamicSpatialMap.finalize();

        function rayCallback(tree, obj, pRay, unusedAABBDistance, upperBound)
        {
            /*jshint bitwise: false*/
            var actual_obj = obj._public;
            if (actual_obj === exclude ||
                (obj.mask & group) === 0 || (obj.group & mask) === 0)
            {
                return null;
            }
            /*jshint bitwise: true*/

            pRay.maxFactor = upperBound;
            var resultObj = obj.rayTest(pRay);
            if (resultObj !== null)
            {
                if (obj.collisionObject)
                {
                    resultObj.collisionObject = actual_obj;
                    resultObj.body = null;
                }
                else
                {
                    resultObj.collisionObject = null;
                    resultObj.body = actual_obj;
                }
            }

            return resultObj;
        }

        var ret = AABBTree.rayTest([this.staticSpatialMap, this.dynamicSpatialMap], pRay, rayCallback);
        //delete additional factor property
        if (ret !== null)
        {
            delete ret.factor;
        }

        return ret;
    },

    //
    // cache having properties
    //   shapeA
    //   shapeB
    //   axis <-- to be mutated by this function
    //      axis is 'on' object B.
    //   closestA <-- to be populated by this function
    //   closestB <-- to be populated by this function
    contactPairTest : function contactPairTest(cache, xformA, xformB)
    {
        var axis = cache.axis;
        var shapeA = cache.shapeA;
        var shapeB = cache.shapeB;
        var supportA = cache.closestA;
        var supportB = cache.closestB;

        if (this.contactGJK === undefined)
        {
            this.contactGJK = WebGLGJKContactSolver.create();
            this.contactEPA = WebGLContactEPA.create();
        }

        //
        // Special case for planes
        //
        if (shapeA.type === "PLANE" || shapeB.type === "PLANE")
        {
            var planeShape, otherShape;
            var planeXForm, otherXForm;
            if (shapeA.type === "PLANE")
            {
                planeShape = shapeA;
                planeXForm = xformA;
                otherShape = shapeB;
                otherXForm = xformB;
            }
            else
            {
                planeShape = shapeB;
                planeXForm = xformB;
                otherShape = shapeA;
                otherXForm = xformA;
            }

            var A0 = planeXForm[0];
            var A1 = planeXForm[1];
            var A2 = planeXForm[2];
            var A3 = planeXForm[3];
            var A4 = planeXForm[4];
            var A5 = planeXForm[5];
            var A6 = planeXForm[6];
            var A7 = planeXForm[7];
            var A8 = planeXForm[8];
            var A9 = planeXForm[9];
            var A10 = planeXForm[10];
            var A11 = planeXForm[11];

            // local plane normal and distance.
            var n = planeShape.normal;
            var n0 = n[0];
            var n1 = n[1];
            var n2 = n[2];
            var nd = planeShape.distance;

            // transform plane normal into world space.
            var w0 = (n0 * A0) + (n1 * A3) + (n2 * A6);
            var w1 = (n0 * A1) + (n1 * A4) + (n2 * A7);
            var w2 = (n0 * A2) + (n1 * A5) + (n2 * A8);

            A0 = otherXForm[0];
            A1 = otherXForm[1];
            A2 = otherXForm[2];
            A3 = otherXForm[3];
            A4 = otherXForm[4];
            A5 = otherXForm[5];
            A6 = otherXForm[6];
            A7 = otherXForm[7];
            A8 = otherXForm[8];
            var B9 = otherXForm[9];
            var B10 = otherXForm[10];
            var B11 = otherXForm[11];

            // transform plane into shape local space.
            n0 = (A0 * w0) + (A1 * w1) + (A2 * w2);
            n1 = (A3 * w0) + (A4 * w1) + (A5 * w2);
            n2 = (A6 * w0) + (A7 * w1) + (A8 * w2);
            nd += (w0 * (A9 - B9)) + (w1 * (A10 - B10)) + (w2 * (A11 - B11));

            // Find maximum and minimal support points on shape.
            axis[0] = n0;
            axis[1] = n1;
            axis[2] = n2;
            otherShape.localSupportWithoutMargin(axis, supportA);

            axis[0] = -n0;
            axis[1] = -n1;
            axis[2] = -n2;
            otherShape.localSupportWithoutMargin(axis, supportB);

            // Find distance from plane for each support.
            var dot1 = (supportA[0] * n0) + (supportA[1] * n1) + (supportA[2] * n2) - nd;
            var dot2 = (supportB[0] * n0) + (supportB[1] * n1) + (supportB[2] * n2) - nd;

            // Choose closest support to plane for distance computation
            // with margins.
            var seperation, c0, c1, c2;
            if ((dot1 * dot1) < (dot2 * dot2))
            {
                c0 = supportA[0];
                c1 = supportA[1];
                c2 = supportA[2];
                seperation = dot1;
            }
            else
            {
                c0 = supportB[0];
                c1 = supportB[1];
                c2 = supportB[2];
                seperation = dot2;
            }

            if ((seperation < 0) !== ((dot1 * dot2) < 0))
            {
                seperation = -seperation;
                // negate normal
                w0 = -w0;
                w1 = -w1;
                w2 = -w2;
            }

            // Take collision margin from seperation.
            var rad = otherShape.collisionRadius;
            var prad = planeShape.collisionRadius;

            // find world-space support point on non-plane shape
            //VMath.m43TransformPoint(otherXForm, closest, closest);
            var a0 = (A0 * c0) + (A3 * c1) + (A6 * c2) + B9;
            var a1 = (A1 * c0) + (A4 * c1) + (A7 * c2) + B10;
            var a2 = (A2 * c0) + (A5 * c1) + (A8 * c2) + B11;

            // find world-space support point on plane shape
            // including collision margin
            var rsep = prad - seperation;
            var p0 = a0 + (w0 * rsep);
            var p1 = a1 + (w1 * rsep);
            var p2 = a2 + (w2 * rsep);

            // apply collision margin to non-plane support.
            a0 -= (w0 * rad);
            a1 -= (w1 * rad);
            a2 -= (w2 * rad);

            // apply collision radius to seperation.
            seperation -= rad + prad;

            if (shapeA.type === "PLANE")
            {
                axis[0] = -w0;
                axis[1] = -w1;
                axis[2] = -w2;
                supportA[0] = p0;
                supportA[1] = p1;
                supportA[2] = p2;
                supportB[0] = a0;
                supportB[1] = a1;
                supportB[2] = a2;
            }
            else
            {
                axis[0] = w0;
                axis[1] = w1;
                axis[2] = w2;
                supportA[0] = a0;
                supportA[1] = a1;
                supportA[2] = a2;
                supportB[0] = p0;
                supportB[1] = p1;
                supportB[2] = p2;
            }

            return seperation;
        }
        else
        {
            var gjk = this.contactGJK;
            var distance = gjk.evaluate(cache, xformA, xformB);
            if (distance === undefined)
            {
                distance = this.contactEPA.evaluate(gjk.simplex, cache, xformA, xformB);
            }

            if (distance !== undefined)
            {
                var axis0 = axis[0];
                var axis1 = axis[1];
                var axis2 = axis[2];

                var radiusA = shapeA.collisionRadius;
                var radiusB = shapeB.collisionRadius;

                supportA[0] -= axis0 * radiusA;
                supportA[1] -= axis1 * radiusA;
                supportA[2] -= axis2 * radiusA;

                supportB[0] += axis0 * radiusB;
                supportB[1] += axis1 * radiusB;
                supportB[2] += axis2 * radiusB;

                return (distance - radiusA - radiusB);
            }
            else
            {
                return undefined;
            }
        }
    },

    // callback of the form HitResult -> Bool
    // if callback is undefined, then a callback of function (x) { return true; } is implied.
    convexSweepTest : function convexSweepTestFn(params, callback)
    {
        //
        // Initialise objects reused in all convexSweepTest calls.
        //
        if (this.sweepCache === undefined)
        {
            this.sweepCache = {
                axis : VMath.v3BuildZero(),
                shapeA : null,
                shapeB : null,
                closestA : VMath.v3BuildZero(),
                closestB : VMath.v3BuildZero()
            };

            // fake triangle shape for triangle meshes!
            this.sweepTriangle = WebGLPhysicsTriangleShape.allocate();

            this.sweepDelta = VMath.v3BuildZero();

            this.sweepFromExtents = new Float32Array(6);
            this.sweepToExtents = new Float32Array(6);
            this.sweepExtents = new Float32Array(6);

            // fake body used to compute shape extents in triangle mesh coordinate systems.
            this.sweepFakeBody = {
                shape : null,
                transform : null
            };
            this.sweepTransform = VMath.m43BuildIdentity();
            this.sweepTransform2 = VMath.m43BuildIdentity();
        }

        var cache = this.sweepCache;
        var triangle = this.sweepTriangle;
        var delta = this.sweepDelta;
        var fromExtents = this.sweepFromExtents;
        var toExtents = this.sweepToExtents;
        var extents = this.sweepExtents;
        var fakeBody = this.sweepFakeBody;
        var transform = this.sweepTransform;
        var transform2 = this.sweepTransform2;

        var that = this;
        // sweep shapeA linearlly from 'from' transform, through delta vector
        // against shapeB with transform 'transform' up to a maximum
        // distance of upperBound
        function staticSweep(shapeA, cpos, delta, shapeB, transform, upperBound)
        {
            var delta0 = delta[0];
            var delta1 = delta[1];
            var delta2 = delta[2];

            var axis = cache.axis;
            var supportA = cache.closestA;
            var supportB = cache.closestB;

            //VMath.v3Neg(delta, cache.axis);
            axis[0] = -delta0;
            axis[1] = -delta1;
            axis[2] = -delta2;

            cache.shapeA = shapeA;
            cache.shapeB = shapeB;

            var distance = 0;

            var curIter = 0;
            var maxIter = 100;
            var contactDistance;

            var previousDistance = Number.MAX_VALUE;
            var intersected = false;
            for (;;)
            {
                var nextContact = that.contactPairTest(cache, cpos, transform);

                // objects intersecting!
                // abort and use previous result if existing
                if (nextContact === undefined || nextContact < WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
                {
                    if (contactDistance !== undefined || nextContact !== undefined)
                    {
                        if (contactDistance === undefined)
                        {
                            contactDistance = nextContact;
                        }
                        intersected = true;
                    }
                    break;
                }

                // terminate if distance is increasing!!
                if ((nextContact - previousDistance) >= 1)
                {
                    break;
                }
                previousDistance = nextContact;

                // distance to advance object.
                //var dot = VMath.v3Dot(delta, VMath.v3Sub(nextContact.closestB, nextContact.closestA));
                var d0 = supportB[0] - supportA[0];
                var d1 = supportB[1] - supportA[1];
                var d2 = supportB[2] - supportA[2];
                var dot = (delta0 * d0) + (delta1 * d1) + (delta2 * d2);

                // If seperating axis is perpendicular to direction of motion
                // Then it is not possible for use to intersect with it.
                if (dot <= WebGLPhysicsConfig.COPLANAR_THRESHOLD)
                {
                    break;
                }

                var gap = (nextContact * nextContact) / dot;
                distance += gap;
                if (distance >= upperBound)
                {
                    contactDistance = undefined;
                    break;
                }

                contactDistance = nextContact;
                cpos[9]  += (delta0 * gap);
                cpos[10] += (delta1 * gap);
                cpos[11] += (delta2 * gap);

                // Exit if distance between objects is nominal
                if (contactDistance <= WebGLPhysicsConfig.GJK_EPA_DISTANCE_THRESHOLD)
                {
                    intersected = true;
                    break;
                }

                // Max iteration cutoff.
                curIter += 1;
                if (curIter > maxIter)
                {
                    break;
                }
            }

            if (contactDistance === undefined || !intersected)
            {
                return null;
            }
            else
            {
                return {
                    hitPoint : VMath.v3Copy(supportB),
                    hitNormal : VMath.v3Copy(axis),
                    distance : distance
                };
            }
        }

        var shape = params.shape._private;
        var from = params.from;
        var to = params.to;

        //var delta = VMath.v3Sub(VMath.m43Pos(to), VMath.m43Pos(from));
        var d0 = (to[9] - from[9]);
        var d1 = (to[10] - from[10]);
        var d2 = (to[11] - from[11]);

        //var upperBound = VMath.v3Length(delta);
        var upperBound = Math.sqrt((d0 * d0) + (d1 * d1) + (d2 * d2));

        //VMath.v3Normalize(delta, delta);
        var scale = 1 / upperBound;
        delta[0] = d0 * scale;
        delta[1] = d1 * scale;
        delta[2] = d2 * scale;

        var group = (params.group === undefined) ? WebGLPhysicsDevice.prototype.FILTER_DYNAMIC : params.group;
        var mask  = (params.mask  === undefined) ? WebGLPhysicsDevice.prototype.FILTER_ALL     : params.mask;
        var exclude = params.exclude;

        // Find AABB encompassing swept shape
        fakeBody.shape = shape;
        fakeBody.transform = from;
        WebGLPhysicsPrivateBody.prototype.calculateExtents.call(fakeBody, fromExtents);

        fakeBody.transform = to;
        WebGLPhysicsPrivateBody.prototype.calculateExtents.call(fakeBody, toExtents);

        //var extents = VMath.aabbUnion(fromExtents, toExtents);
        extents[0] = (fromExtents[0] < toExtents[0] ? fromExtents[0] : toExtents[0]);
        extents[1] = (fromExtents[1] < toExtents[1] ? fromExtents[1] : toExtents[1]);
        extents[2] = (fromExtents[2] < toExtents[2] ? fromExtents[2] : toExtents[2]);
        extents[3] = (fromExtents[3] > toExtents[3] ? fromExtents[3] : toExtents[3]);
        extents[4] = (fromExtents[4] > toExtents[4] ? fromExtents[4] : toExtents[4]);
        extents[5] = (fromExtents[5] > toExtents[5] ? fromExtents[5] : toExtents[5]);

        // Find all objects intersecting swept shape AABB.
        this.staticSpatialMap.finalize();
        this.dynamicSpatialMap.finalize();

        var objects = this.persistantObjectsList;
        var triangles = this.persistantTrianglesList;
        var staticCount = this.staticSpatialMap.getOverlappingNodes(extents, objects, 0);
        var limit = staticCount + this.dynamicSpatialMap.getOverlappingNodes(extents, objects, staticCount);

        var minResult = null;
        var i, j;
        for (i = 0; i < limit; i += 1)
        {
            var object = objects[i];
            // Prevent GC issues from persistant list.
            objects[i] = undefined;

            /*jshint bitwise: false*/
            var actual_object = object._public;
            if (actual_object === exclude || object.shape === shape ||
               (object.mask & group) === 0 || (object.group & mask) === 0)
            {
                continue;
            }
            /*jshint bitwise: true*/

            var result;
            var collisionShape = object.shape;
            if (collisionShape.type === "TRIANGLE_MESH")
            {
                var triangleArray = collisionShape.triangleArray;
                triangle.triangleArray = triangleArray;
                triangle.collisionRadius = collisionShape.collisionRadius;

                var numTriangles;
                if (triangleArray.spatialMap)
                {
                    // Find AABB encompassing swept shape, in local coordinate system of triangle mesh.
                    VMath.m43InverseOrthonormal(object.transform, transform2);
                    VMath.m43Mul(from, transform2, transform);

                    fakeBody.transform = transform;
                    WebGLPhysicsPrivateBody.prototype.calculateExtents.call(fakeBody, fromExtents);

                    VMath.m43Mul(to, transform2, transform);
                    WebGLPhysicsPrivateBody.prototype.calculateExtents.call(fakeBody, toExtents);

                    //var extents = VMath.aabbUnion(fromExtents, toExtents);
                    extents[0] = (fromExtents[0] < toExtents[0] ? fromExtents[0] : toExtents[0]);
                    extents[1] = (fromExtents[1] < toExtents[1] ? fromExtents[1] : toExtents[1]);
                    extents[2] = (fromExtents[2] < toExtents[2] ? fromExtents[2] : toExtents[2]);
                    extents[3] = (fromExtents[3] > toExtents[3] ? fromExtents[3] : toExtents[3]);
                    extents[4] = (fromExtents[4] > toExtents[4] ? fromExtents[4] : toExtents[4]);
                    extents[5] = (fromExtents[5] > toExtents[5] ? fromExtents[5] : toExtents[5]);

                    numTriangles = triangleArray.spatialMap.getOverlappingNodes(extents, triangles, 0);
                    for (j = 0; j < numTriangles; j += 1)
                    {
                        triangle.index = triangles[j].index;
                        // avoid GC problems of persistant array.
                        triangles[j] = undefined;

                        VMath.m43Copy(from, transform2);
                        result = staticSweep(shape, transform2, delta, triangle, object.transform, upperBound);
                        if (result)
                        {
                            result.collisionObject = actual_object;
                            result.body = null;

                            if (!callback || callback(result))
                            {
                                minResult = result;
                                upperBound = result.distance;
                            }
                        }
                    }
                }
                else
                {
                    numTriangles = triangleArray.numTriangles;
                    for (j = 0; j < numTriangles; j += 1)
                    {
                        triangle.index = (j * WebGLPhysicsPrivateTriangleArray.prototype.TRIANGLE_SIZE);
                        VMath.m43Copy(from, transform2);
                        result = staticSweep(shape, transform2, delta, triangle, object.transform, upperBound);
                        if (result)
                        {
                            result.collisionObject = actual_object;
                            result.body = null;

                            if (!callback || callback(result))
                            {
                                minResult = result;
                                upperBound = result.distance;
                            }
                        }
                    }
                }
            }
            else
            {
                VMath.m43Copy(from, transform2);
                result = staticSweep(shape, transform2, delta, collisionShape, object.transform, upperBound);
                if (result)
                {
                    if (object.collisionObject)
                    {
                        result.collisionObject = actual_object;
                        result.body = null;
                    }
                    else
                    {
                        result.collisionObject = null;
                        result.body = actual_object;
                    }

                    if (!callback || callback(result))
                    {
                        minResult = result;
                        upperBound = result.distance;
                    }
                }
            }

            // Cut off on epsilon distance
            // Based on rough experimental result
            if (upperBound < 1e-4)
            {
                // clean up remaining objects for GC
                for (j = i; j < limit; j += 1)
                {
                    objects[j] = undefined;
                }

                break;
            }
        }

        if (minResult)
        {
            // delete additional property
            delete minResult.distance;
        }

        return minResult;
    },

    addBody : function addBodyFn(body)
    {
        if (body.world)
        {
            return false;
        }

        body.world = this;
        if (body.collisionObject && !body.kinematic)
        {
            this.collisionObjects.push(body);
            this.syncBody(body);
            return true;
        }

        if (body.kinematic)
        {
            this.kinematicBodies.push(body);
        }
        else
        {
            this.rigidBodies.push(body);
        }

        var addSleeping = !body.active;
        body.previouslyActive = true;
        body.active = false;

        // Prepare body for disjoint set forest algorithm
        // in computeSleeping
        body.islandRoot = body;
        body.islandRank = 0;

        if (!addSleeping)
        {
            this.wakeBody(body);
        }
        else
        {
            this.syncBody(body);
        }

        return true;
    },

    removeBody : function removeBodyFn(body)
    {
        if (body.world !== this)
        {
            return false;
        }

        var list, activeList;
        if (body.collisionObject && !body.kinematic)
        {
            list = this.collisionObjects;
        }
        else if (body.kinematic)
        {
            list = this.kinematicBodies;
            activeList = this.activeKinematics;
        }
        else
        {
            list = this.rigidBodies;
            activeList = this.activeBodies;
        }

        body.world = null;
        list[list.indexOf(body)] = list[list.length - 1];
        list.pop();

        if (activeList && body.active)
        {
            activeList[activeList.indexOf(body)] = activeList[activeList.length - 1];
            activeList.pop();
            this.dynamicSpatialMap.remove(body);
        }
        else
        {
            this.staticSpatialMap.remove(body);
        }

        this.removeArbitersFromObject(body);

        return true;
    },

    addConstraint : function addConstraintFn(constraint)
    {
        if (constraint.world)
        {
            return false;
        }

        constraint.world = this;
        this.constraints.push(constraint);

        if (constraint.bodyA)
        {
            constraint.bodyA.constraints.push(constraint);
        }
        if (constraint.bodyB)
        {
            constraint.bodyB.constraints.push(constraint);
        }

        var addSleeping = !constraint.active;
        constraint.active = false;

        // Prepare constraint for disjoint set forest algorithm
        // in computeSleeping
        constraint.islandRoot = constraint;
        constraint.islandRank = 0;

        if (!addSleeping)
        {
            this.wakeConstraint(constraint);
        }

        return true;
    },

    removeConstraint : function removeConstraintFn(constraint)
    {
        if (constraint.world !== this)
        {
            return false;
        }

        constraint.world = null;

        var list = this.constraints;
        list[list.indexOf(constraint)] = list[list.length - 1];
        list.pop();

        if (constraint.bodyA)
        {
            list = constraint.bodyA.constraints;
            list[list.indexOf(constraint)] = list[list.length - 1];
            list.pop();
        }
        if (constraint.bodyB)
        {
            list = constraint.bodyA.constraints;
            list[list.indexOf(constraint)] = list[list.length - 1];
            list.pop();
        }

        if (constraint.active)
        {
            list = this.activeConstraints;
            list[list.indexOf(constraint)] = list[list.length - 1];
            list.pop();
        }

        return true;
    },

    flush : function physicsFlushFn()
    {
        // Use public remove# methods to ensure necessary side effects
        // Occur and avoid code duplication.

        while (this.rigidBodies.length > 0)
        {
            this.removeBody(this.rigidBodies[0]);
        }

        while (this.collisionObjects.length > 0)
        {
            this.removeBody(this.collisionObjects[0]);
        }

        while (this.kinematicObjects.length > 0)
        {
            this.removeBody(this.kinematicObjects[0]);
        }

        while (this.constraints.length > 0)
        {
            this.removeConstraint(this.constraints[0]);
        }

        this.timeStamp = 0;
    },

    removeArbitersFromObject : function removeArbitersFromObjectFn(object)
    {
        var arbiters = object.arbiters;
        var worldArbiters = this.activeArbiters;
        while (arbiters.length > 0)
        {
            var arb = arbiters.pop();

            // Remove from other object also.
            var bodyArbiters = (arb.objectA === object) ? arb.objectB.arbiters : arb.objectA.arbiters;
            bodyArbiters[bodyArbiters.indexOf(arb)] = bodyArbiters[bodyArbiters.length - 1];
            bodyArbiters.pop();

            // Remove from world arbiters list
            if (arb.active)
            {
                worldArbiters[worldArbiters.indexOf(arb)] = worldArbiters[worldArbiters.length - 1];
                worldArbiters.pop();
            }

            // Clean up all contacts.
            while (arb.contacts.length > 0)
            {
                var contact = arb.contacts.pop();
                WebGLPhysicsContact.deallocate(contact);
            }

            WebGLPhysicsArbiter.deallocate(arb);
        }
    }
};

WebGLPhysicsWorld.create = function webGLPrivatePhysicsWorldFn(params)
{
    var rets = new WebGLPhysicsWorld();
    var s = new WebGLPrivatePhysicsWorld();
    rets._private = s;
    s._public = rets;

    s.gravity = (params.gravity !== undefined) ? VMath.v3Copy(params.gravity) : VMath.v3Build(0, -10, 0);
    s.maxSubSteps = (params.maxSubSteps !== undefined) ? params.maxSubSteps : 10;

    s.fixedTimeStep = (params.fixedTimeStep !== undefined) ? params.fixedTimeStep : (1 / 60);

    s.variableMinStep = (params.minimumTimeStep !== undefined) ? params.minimumTimeStep : (1 / 70);
    s.variableMaxStep = (params.maximumTimeStep !== undefined) ? params.maximumTimeStep : (1 / 50);

    s.variableStep = (params.variableTimeSteps !== undefined) ? params.variableTimeSteps : false;

    s.maxGiveUpTimeStep = (params.maxGiveUpTimeStep !== undefined) ? params.maxGiveUpTimeStep : 1 / 20;

    // read only properties
    Object.defineProperty(rets, "maxSubSteps", {
        value : s.maxSubSteps,
        enumerable : true
    });

    Object.defineProperty(rets, "maxGiveUpTimeStep", {
        value : s.maxGiveUpTimeStep,
        enumerable : true
    });

    if (!s.variableStep)
    {
        Object.defineProperty(rets, "fixedTimeStep", {
            value : s.fixedTimeStep,
            enumerable : true
        });
    }
    else
    {
        Object.defineProperty(rets, "minimumTimeStep", {
            value : s.minimumTimeStep,
            enumerable : true
        });
        Object.defineProperty(rets, "maximumTimeStep", {
            value : s.maximumTimeStep,
            enumerable : true
        });
    }



    // read only, getter needed to make copy
    Object.defineProperty(rets, "gravity", {
        get : function physicsWorldGetGravity()
        {
            return VMath.v3Copy(this._private.gravity);
        },
        enumerable : true
    });

    s.staticSpatialMap = AABBTree.create(true);
    s.dynamicSpatialMap = AABBTree.create();

    s.collisionObjects = [];
    s.rigidBodies = [];
    s.constraints = [];
    s.kinematicBodies = [];

    // List of active arbiters between shapes.
    s.activeArbiters = [];

    // List of active rigid bodies and constraints.
    s.activeBodies = [];
    s.activeKinematics = [];
    s.activeConstraints = [];

    s.persistantObjectsList = [];
    s.persistantObjectsList2 = [];
    s.persistantTrianglesList = [];
    s.persistantTOIEventList = [];

    s.timeStamp = 0;

    // timing information
    s.performanceData = {
        discrete             : 0,
        sleepComputation     : 0,
        prestepContacts      : 0,
        prestepConstraints   : 0,
        integrateVelocities  : 0,
        warmstartContacts    : 0,
        warmstartConstraints : 0,
        physicsIterations    : 0,
        integratePositions   : 0,
        continuous           : 0
    };

    // read only, no getter needed
    Object.defineProperty(rets, "performanceData", {
        value : s.performanceData,
        enumerable : true
    });

    // Extents used throughout all calls to syncBody
    s.syncExtents = new Float32Array(6);

    return rets;
};


//
// WebGL Physics Device
//
function WebGLPhysicsDevice() {}
WebGLPhysicsDevice.prototype = {

    version : 1,

    vendor : "Turbulenz",

    FILTER_DYNAMIC : 1,
    FILTER_STATIC : 2,
    FILTER_KINEMATIC : 4,
    FILTER_DEBRIS : 8,
    FILTER_TRIGGER : 16,
    FILTER_CHARACTER : 32,
    FILTER_PROJECTILE : 64,
    FILTER_USER_MIN : 128,
    FILTER_USER_MAX : 0x8000,
    FILTER_ALL : 0xffff,

    createDynamicsWorld : function createDynamicsWorldFn(params)
    {
        return WebGLPhysicsWorld.create(params);
    },

    createPlaneShape : function createPlaneShapeFn(params)
    {
        return WebGLPhysicsPlaneShape.create(params);
    },

    createBoxShape : function createBoxShapeFn(params)
    {
        return WebGLPhysicsBoxShape.create(params);
    },

    createSphereShape : function createSphereShapeFn(params)
    {
        return WebGLPhysicsSphereShape.create(params);
    },

    createCapsuleShape : function createCapsuleShapeFn(params)
    {
        return WebGLPhysicsCapsuleShape.create(params);
    },

    createCylinderShape : function createCylinderShapeFn(params)
    {
        return WebGLPhysicsCylinderShape.create(params);
    },

    createConeShape : function createConeShapeFn(params)
    {
        return WebGLPhysicsConeShape.create(params);
    },

    createTriangleMeshShape : function createTriangleMeshShapeFn(params)
    {
        return WebGLPhysicsTriangleMeshShape.create(params);
    },

    createConvexHullShape : function createConvexHullShapeFn(params)
    {
        return WebGLPhysicsConvexHullShape.create(params);
    },

    createTriangleArray : function createTriangleArrayFn(params)
    {
        return WebGLPhysicsTriangleArray.create(params);
    },

    createCollisionObject : function createCollisionObjectFn(params)
    {
        return WebGLPhysicsCollisionObject.create(params);
    },

    createRigidBody : function createRigidBodyFn(params)
    {
        return WebGLPhysicsRigidBody.create(params);
    },

    createPoint2PointConstraint : function createPoint2PointConstraintFn(params)
    {
        return WebGLPhysicsPoint2PointConstraint.create(params);
    },

    createHingeConstraint : function createHingeConstraintFn(params)
    {
        return WebGLPhysicsConstraint.create("HINGE", params);
    },

    createConeTwistConstraint : function createConeTwistConstraintFn(params)
    {
        return WebGLPhysicsConstraint.create("CONETWIST", params);
    },

    create6DOFConstraint : function create6DOFConstraintFn(params)
    {
        return WebGLPhysicsConstraint.create("D6", params);
    },

    createSliderConstraint : function createSliderConstraintFn(params)
    {
        return WebGLPhysicsConstraint.create("SLIDER", params);
    },

    createCharacter : function createCharacterFn(params)
    {
        return WebGLPhysicsCharacter.create(params);
    }
};

WebGLPhysicsDevice.create = function webGLPhysicsDeviceFn(params)
{
    var pd = new WebGLPhysicsDevice();
    pd.genObjectId = 0;
    return pd;
};


// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine: false*/
/*global SoundTARLoader: false*/
/*global Audio: false*/
/*global VMath: false*/
/*global navigator: false*/
/*global window: false*/
/*global Uint8Array: false*/
/*global console*/



//
// WebGLSound
//
function WebGLSound() {}
WebGLSound.prototype =
{
    version : 1,

    destroy : function soundDestroyFn()
    {
        var audioContext = this.audioContext;
        if (audioContext)
        {
            delete this.audioContext;
            delete this.buffer;
        }
        else
        {
            delete this.audio;
        }
    }
};

WebGLSound.create = function webGLSoundCreateFn(sd, params)
{
    var sound = new WebGLSound();

    var soundPath = params.src;

    sound.name = (params.name || soundPath);
    sound.frequency = 0;
    sound.channels = 0;
    sound.bitrate = 0;
    sound.length = 0;
    sound.compressed = (!params.uncompress);

    var onload = params.onload;

    var data, numSamples, numChannels, samplerRate;

    var audioContext = sd.audioContext;
    if (audioContext)
    {
        sound.audioContext = audioContext;

        var buffer;
        if (soundPath)
        {
            if (!sd.isResourceSupported(soundPath))
            {
                if (onload)
                {
                    onload(null);
                }
                return null;
            }

            var bufferCreated = function bufferCreatedFn(buffer)
            {
                if (buffer)
                {
                    sound.buffer = buffer;
                    sound.frequency = buffer.sampleRate;
                    sound.channels = buffer.numberOfChannels;
                    sound.bitrate = (sound.frequency * sound.channels * 2 * 8);
                    sound.length = buffer.duration;

                    if (onload)
                    {
                        onload(sound, 200);
                    }
                }
                else
                {
                    if (onload)
                    {
                        onload(null);
                    }
                }
            };

            var bufferFailed = function bufferFailedFn()
            {
                if (onload)
                {
                    onload(null);
                }
            };

            data = params.data;
            if (data)
            {
                if (audioContext.decodeAudioData)
                {
                    audioContext.decodeAudioData(data, bufferCreated, bufferFailed);
                }
                else
                {
                    buffer = audioContext.createBuffer(data, false);
                    bufferCreated(buffer);
                }
            }
            else
            {
                var xhr;
                if (window.XMLHttpRequest)
                {
                    xhr = new window.XMLHttpRequest();
                }
                else if (window.ActiveXObject)
                {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                }
                else
                {
                    if (onload)
                    {
                        onload(null);
                    }
                    return null;
                }

                xhr.onreadystatechange = function ()
                {
                    if (xhr.readyState === 4)
                    {
                        if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                        {
                            var xhrStatus = xhr.status;
                            var xhrStatusText = (xhrStatus !== 0 && xhr.statusText || 'No connection');
                            var response = xhr.response;

                            // Sometimes the browser sets status to 200 OK when the connection is closed
                            // before the message is sent (weird!).
                            // In order to address this we fail any completely empty responses.
                            // Hopefully, nobody will get a valid response with no headers and no body!
                            if (xhr.getAllResponseHeaders() === "" && !response && xhrStatus === 200 && xhrStatusText === 'OK')
                            {
                                if (onload)
                                {
                                    onload(null);
                                }
                            }
                            else if (xhrStatus === 200 || xhrStatus === 0)
                            {
                                if (audioContext.decodeAudioData)
                                {
                                    audioContext.decodeAudioData(response, bufferCreated, bufferFailed);
                                }
                                else
                                {
                                    var buffer = audioContext.createBuffer(response, false);
                                    bufferCreated(buffer);
                                }
                            }
                            else
                            {
                                if (onload)
                                {
                                    onload(null);
                                }
                            }
                        }
                        // break circular reference
                        xhr.onreadystatechange = null;
                        xhr = null;
                    }
                };
                xhr.open("GET", soundPath, true);
                xhr.responseType = "arraybuffer";
                xhr.setRequestHeader("Content-Type", "text/plain");
                xhr.send(null);
            }

            return sound;
        }
        else
        {
            data = params.data;
            if (data)
            {
                numSamples = data.length;
                numChannels = (params.channels || 1);
                samplerRate = params.frequency;

                var contextSampleRate = audioContext.sampleRate;
                var c, channel, i, j;

                if (contextSampleRate === samplerRate)
                {
                    buffer = audioContext.createBuffer(numChannels, (numSamples / numChannels), samplerRate);

                    // De-interleave data
                    for (c = 0; c < numChannels; c += 1)
                    {
                        channel = buffer.getChannelData(c);
                        for (i = c, j = 0; i < numSamples; i += numChannels, j += 1)
                        {
                            channel[j] = data[i];
                        }
                    }
                }
                else
                {
                    var ratio = (samplerRate / contextSampleRate);
                    var bufferLength = (numSamples / (ratio * numChannels));

                    buffer = audioContext.createBuffer(numChannels, bufferLength, contextSampleRate);

                    // De-interleave data
                    for (c = 0; c < numChannels; c += 1)
                    {
                        channel = buffer.getChannelData(c);
                        for (j = 0; j < bufferLength; j += 1)
                        {
                            /*jshint bitwise: false*/
                            channel[j] = data[c + (((j * ratio) | 0) * numChannels)];
                            /*jshint bitwise: true*/
                        }
                    }
                }

                if (buffer)
                {
                    sound.buffer = buffer;
                    sound.frequency = samplerRate;
                    sound.channels = numChannels;
                    sound.bitrate = (samplerRate * numChannels * 2 * 8);
                    sound.length = (numSamples / (samplerRate * numChannels));

                    if (onload)
                    {
                        onload(sound, 200);
                    }

                    return sound;
                }
            }
        }
    }
    else
    {
        var audio;

        if (soundPath)
        {
            var extension = soundPath.slice(-3);

            data = params.data;
            if (data)
            {

                var dataArray;
                if (data instanceof Uint8Array)
                {
                    dataArray = data;
                }
                else
                {
                    dataArray = new Uint8Array(data);
                }

                // Check extension based on data

                if (dataArray[0] === 79 &&
                    dataArray[1] === 103 &&
                    dataArray[2] === 103 &&
                    dataArray[3] === 83)
                {
                    extension = 'ogg';
                    soundPath = 'data:audio/ogg;base64,';
                }
                else if (dataArray[0] === 82 &&
                         dataArray[1] === 73 &&
                         dataArray[2] === 70 &&
                         dataArray[3] === 70)
                {
                    extension = 'wav';
                    soundPath = 'data:audio/wav;base64,';
                }
                else
                {
                    // Assume it's an mp3?
                    extension = 'mp3';
                    soundPath = 'data:audio/mpeg;base64,';
                }

                // Mangle data into a data URI
                soundPath = soundPath + TurbulenzEngine.base64Encode(dataArray);
            }

            if (!(extension in sd.supportedExtensions))
            {
                if (onload)
                {
                    onload(null);
                }
                return null;
            }

            audio = new Audio();

            audio.preload = 'auto';
            audio.autobuffer = true;

            audio.src = soundPath;

            audio.onerror = function loadingSoundFailedFn(e)
            {
                if (onload)
                {
                    onload(null);
                    onload = null;
                }
            };

            sd.addLoadingSound(function checkLoadedFn() {
                if (3 <= audio.readyState)
                {
                    sound.frequency = (audio.sampleRate || audio.mozSampleRate);
                    sound.channels = (audio.channels || audio.mozChannels);
                    sound.bitrate = (sound.frequency * sound.channels * 2 * 8);
                    sound.length = audio.duration;

                    if (audio.buffered &&
                        audio.buffered.length &&
                        0 < audio.buffered.end(0))
                    {
                        if (isNaN(sound.length) ||
                            sound.length === Number.POSITIVE_INFINITY)
                        {
                            sound.length = audio.buffered.end(0);
                        }

                        if (onload)
                        {
                            onload(sound, 200);
                            onload = null;
                        }
                    }
                    else
                    {
                        // Make sure the data is actually loaded
                        var forceLoading = function forceLoadingFn()
                        {
                            audio.pause();
                            audio.removeEventListener('play', forceLoading, false);

                            if (onload)
                            {
                                onload(sound, 200);
                                onload = null;
                            }
                        };
                        audio.addEventListener('play', forceLoading, false);
                        audio.volume = 0;
                        audio.play();
                    }

                    return true;
                }
                return false;
            });

            sound.audio = audio;

            return sound;
        }
        else
        {
            data = params.data;
            if (data)
            {
                audio = new Audio();

                if (audio.mozSetup)
                {
                    numSamples = data.length;
                    numChannels = (params.channels || 1);
                    samplerRate = params.frequency;

                    audio.mozSetup(numChannels, samplerRate);

                    sound.data = data;
                    sound.frequency = samplerRate;
                    sound.channels = numChannels;
                    sound.bitrate = (samplerRate * numChannels * 2 * 8);
                    sound.length = (numSamples / (samplerRate * numChannels));

                    sound.audio = audio;

                    if (onload)
                    {
                        onload(sound, 200);
                    }

                    return sound;
                }
                else
                {
                    audio = null;
                }
            }
        }
    }

    if (onload)
    {
        onload(null);
    }

    return null;
};


//
// WebGLSoundSource
//
function WebGLSoundSource() {}
WebGLSoundSource.prototype =
{
    version : 1,

    // Public API
    play : function sourcePlayFn(sound, seek)
    {
        var audioContext = this.audioContext;
        if (audioContext)
        {
            var bufferNode = this.bufferNode;

            if (this.sound !== sound)
            {
                if (bufferNode)
                {
                    bufferNode.noteOff(0);
                }
            }
            else
            {
                if (bufferNode)
                {
                    if (bufferNode.loop)
                    {
                        return true;
                    }
                }
            }

            bufferNode = this.createBufferNode(sound);

            this.sound = sound;

            if (!this.playing)
            {
                this.playing = true;
                this.paused = false;

                this.sd.addPlayingSource(this);
            }

            if (seek === undefined)
            {
                seek = 0;
            }

            if (0 < seek)
            {
                var buffer = sound.buffer;
                bufferNode.noteGrainOn(0, seek, (buffer.duration - seek));
                this.playStart = (audioContext.currentTime - seek);
            }
            else
            {
                bufferNode.noteOn(0);
                this.playStart = audioContext.currentTime;
            }
        }
        else
        {
            var audio;

            if (this.sound !== sound)
            {
                this.stop();

                if (sound.data)
                {
                    audio = new Audio();
                    audio.mozSetup(sound.channels, sound.frequency);
                }
                else
                {
                    audio = sound.audio.cloneNode(true);
                }

                this.sound = sound;
                this.audio = audio;

                this.updateAudioVolume();

                audio.loop = this.looping;

                audio.addEventListener('ended', this.loopAudio, false);
            }
            else
            {
                if (this.playing && !this.paused)
                {
                    if (this.looping)
                    {
                        return true;
                    }
                }

                audio = this.audio;
            }

            if (!this.playing)
            {
                this.playing = true;
                this.paused = false;

                this.sd.addPlayingSource(this);
            }

            if (seek === undefined)
            {
                seek = 0;
            }

            if (0.05 < Math.abs(audio.currentTime - seek))
            {
                try
                {
                    audio.currentTime = seek;
                }
                catch (e)
                {
                    // There does not seem to be any reliable way of seeking
                }
            }

            if (sound.data)
            {
                audio.mozWriteAudio(sound.data);
            }
            else
            {
                audio.play();
            }
        }

        return true;
    },

    stop : function sourceStopFn()
    {
        var playing = this.playing;
        if (playing)
        {
            this.playing = false;
            this.paused = false;

            var audioContext = this.audioContext;
            if (audioContext)
            {
                this.sound = null;

                var bufferNode = this.bufferNode;
                if (bufferNode)
                {
                    bufferNode.noteOff(0);
                    this.bufferNode = null;
                }
            }
            else
            {
                var audio = this.audio;
                if (audio)
                {
                    this.sound = null;
                    this.audio = null;

                    audio.pause();

                    audio.removeEventListener('ended', this.loopAudio, false);

                    audio = null;
                }
            }

            this.sd.removePlayingSource(this);
        }

        return playing;
    },

    pause : function sourcePauseFn()
    {
        if (this.playing)
        {
            if (!this.paused)
            {
                this.paused = true;

                var audioContext = this.audioContext;
                if (audioContext)
                {
                    this.playPaused = audioContext.currentTime;

                    this.bufferNode.noteOff(0);
                    this.bufferNode = null;
                }
                else
                {
                    this.audio.pause();
                }

                this.sd.removePlayingSource(this);
            }

            return true;
        }

        return false;
    },

    resume : function sourceResumeFn(seek)
    {
        if (this.paused)
        {
            this.paused = false;

            var audioContext = this.audioContext;
            if (audioContext)
            {
                if (seek === undefined)
                {
                    seek = (this.playPaused - this.playStart);
                }

                var bufferNode = this.createBufferNode(this.sound);

                if (0 < seek)
                {
                    var buffer = this.sound.buffer;
                    bufferNode.noteGrainOn(0, seek, (buffer.duration - seek));
                    this.playStart = (audioContext.currentTime - seek);
                }
                else
                {
                    bufferNode.noteOn(0);
                    this.playStart = audioContext.currentTime;
                }
            }
            else
            {
                var audio = this.audio;

                if (seek !== undefined)
                {
                    if (0.05 < Math.abs(audio.currentTime - seek))
                    {
                        try
                        {
                            audio.currentTime = seek;
                        }
                        catch (e)
                        {
                            // There does not seem to be any reliable way of seeking
                        }

                    }
                }

                audio.play();
            }

            this.sd.addPlayingSource(this);

            return true;
        }

        return false;
    },

    rewind : function sourceRewindFn()
    {
        if (this.playing)
        {
            var audioContext = this.audioContext;
            if (audioContext)
            {
                var bufferNode = this.bufferNode;
                if (bufferNode)
                {
                    bufferNode.noteOff(0);
                }

                bufferNode = this.createBufferNode(this.sound);

                bufferNode.noteOn(0);

                this.playStart = audioContext.currentTime;

                return true;
            }
            else
            {
                var audio = this.audio;
                if (audio)
                {
                    audio.currentTime = 0;

                    return true;
                }
            }
        }

        return false;
    },

    clear : function sourceClearFn()
    {
        this.stop();
    },

    setAuxiliarySendFilter : function setAuxiliarySendFilterFn()
    {
    },

    setDirectFilter : function setDirectFilterFn()
    {
    },

    destroy : function sourceDestroyFn()
    {
        this.stop();

        var audioContext = this.audioContext;
        if (audioContext)
        {
            var pannerNode = this.pannerNode;
            if (pannerNode)
            {
                pannerNode.disconnect();
                delete this.pannerNode;
            }

            delete this.audioContext;
        }
    }
};

WebGLSoundSource.create = function webGLSoundSourceCreateFn(sd, id, params)
{
    var source = new WebGLSoundSource();

    source.sd = sd;
    source.id = id;

    source.sound = null;
    source.playing = false;
    source.paused = false;

    var gain = (params.gain || 1);
    var looping = (params.looping || false);
    var pitch = (params.pitch || 1);
    var position, direction, velocity;

    var audioContext = sd.audioContext;
    if (audioContext)
    {
        source.audioContext = audioContext;
        source.bufferNode = null;
        source.playStart = -1;
        source.playPaused = -1;

        var pannerNode = audioContext.createPanner();
        source.pannerNode = pannerNode;
        pannerNode.connect(audioContext.destination);

        if (sd.linearDistance)
        {
            if (typeof pannerNode.LINEAR_DISTANCE === "number")
            {
                pannerNode.distanceModel = pannerNode.LINEAR_DISTANCE;
            }
        }

        pannerNode.panningModel = pannerNode.EQUALPOWER;

        Object.defineProperty(source, "position", {
                get : function getPositionFn() {
                    return position.slice();
                },
                set : function setPositionFn(newPosition) {
                    position = VMath.v3Copy(newPosition, position);
                    if (!source.relative)
                    {
                        pannerNode.setPosition(newPosition[0], newPosition[1], newPosition[2]);
                    }
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "direction", {
                get : function getDirectionFn() {
                    return direction.slice();
                },
                set : function setDirectionFn(newDirection) {
                    direction = VMath.v3Copy(newDirection, direction);
                    pannerNode.setOrientation(newDirection[0], newDirection[1], newDirection[2]);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "velocity", {
                get : function getVelocityFn() {
                    return velocity.slice();
                },
                set : function setVelocityFn(newVelocity) {
                    velocity = VMath.v3Copy(newVelocity, velocity);
                    pannerNode.setVelocity(newVelocity[0], newVelocity[1], newVelocity[2]);
                },
                enumerable : true,
                configurable : false
            });

        source.createBufferNode = function createBufferNodeFn(sound)
        {
            var buffer = sound.buffer;

            var bufferNode = audioContext.createBufferSource();
            bufferNode.buffer = buffer;
            bufferNode.gain.value = gain;
            bufferNode.loop = looping;
            bufferNode.playbackRate.value = pitch;

            if (1 < sound.channels)
            {
                // We do not support panning of stereo sources
                bufferNode.connect(audioContext.destination);
            }
            else
            {
                bufferNode.connect(pannerNode);
            }

            this.bufferNode = bufferNode;

            return bufferNode;
        };

        Object.defineProperty(source, "gain", {
                get : function getGainFn() {
                    return gain;
                },
                set : function setGainFn(newGain) {
                    gain = newGain;
                    var bufferNode = this.bufferNode;
                    if (bufferNode)
                    {
                        bufferNode.gain.value = newGain;
                    }
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "looping", {
                get : function getLoopingFn() {
                    return looping;
                },
                set : function setLoopingFn(newLooping) {
                    looping = newLooping;
                    var bufferNode = this.bufferNode;
                    if (bufferNode)
                    {
                        bufferNode.loop = newLooping;
                    }
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "pitch", {
                get : function getPitchFn() {
                    return pitch;
                },
                set : function setPitchFn(newPitch) {
                    pitch = newPitch;
                    var bufferNode = this.bufferNode;
                    if (bufferNode)
                    {
                        bufferNode.playbackRate.value = newPitch;
                    }
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "tell", {
            get : function tellFn() {
                if (this.playing)
                {
                    if (this.paused)
                    {
                        return (this.playPaused - this.playStart);
                    }
                    else
                    {
                        return (audioContext.currentTime - this.playStart);
                    }
                }
                else
                {
                    return 0;
                }
            },
            enumerable : true,
            configurable : false
        });

        Object.defineProperty(source, "minDistance", {
                get : function getMinDistanceFn() {
                    return pannerNode.refDistance;
                },
                set : function setMinDistanceFn(minDistance) {
                    pannerNode.refDistance = minDistance;
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "maxDistance", {
                get : function getMaxDistanceFn() {
                    return pannerNode.maxDistance;
                },
                set : function setMaxDistanceFn(maxDistance) {
                    pannerNode.maxDistance = maxDistance;
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "rollOff", {
                get : function getRolloffFactorFn() {
                    return pannerNode.rolloffFactor;
                },
                set : function setRolloffFactorFn(rollOff) {
                    pannerNode.rolloffFactor = rollOff;
                },
                enumerable : true,
                configurable : false
            });
    }
    else
    {
        source.audio = null;

        source.gainFactor = 1;
        source.pitch = pitch;

        source.updateAudioVolume = function updateAudioVolumeFn()
        {
            var audio = this.audio;
            if (audio)
            {
                var volume = Math.min((this.gainFactor * gain), 1);
                audio.volume = volume;
                if (0 >= volume)
                {
                    audio.muted = true;
                }
                else
                {
                    audio.muted = false;
                }
            }
        };

        Object.defineProperty(source, "position", {
                get : function getPositionFn() {
                    return position.slice();
                },
                set : function setPositionFn(newPosition) {
                    position = VMath.v3Copy(newPosition, position);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "direction", {
                get : function getDirectionFn() {
                    return direction.slice();
                },
                set : function setDirectionFn(newDirection) {
                    direction = VMath.v3Copy(newDirection, direction);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "velocity", {
                get : function getVelocityFn() {
                    return velocity.slice();
                },
                set : function setVelocityFn(newVelocity) {
                    velocity = VMath.v3Copy(newVelocity, velocity);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(source, "gain", {
                get : function getGainFn() {
                    return gain;
                },
                set : function setGainFn(newGain) {
                    if (gain !== newGain)
                    {
                        gain = newGain;
                        source.updateAudioVolume();
                    }
                },
                enumerable : true,
                configurable : false
            });

        if (sd.loopingSupported)
        {
            Object.defineProperty(source, "looping", {
                    get : function getLoopingFn() {
                        return looping;
                    },
                    set : function setLoopingFn(newLooping) {
                        looping = newLooping;
                        var audio = source.audio;
                        if (audio)
                        {
                            audio.loop = newLooping;
                        }
                    },
                    enumerable : true,
                    configurable : false
                });

            source.loopAudio = function loopAudioFn() {
                var audio = source.audio;
                if (audio)
                {
                    source.playing = false;
                    source.sd.removePlayingSource(source);
                }
            };
        }
        else
        {
            source.looping = looping;

            source.loopAudio = function loopAudioFn() {
                var audio = source.audio;
                if (audio)
                {
                    if (source.looping)
                    {
                        audio.currentTime = 0;
                        audio.play();
                    }
                    else
                    {
                        source.playing = false;
                        source.sd.removePlayingSource(source);
                    }
                }
            };
        }

        Object.defineProperty(source, "tell", {
            get : function tellFn() {
                var audio = source.audio;
                if (audio)
                {
                    return audio.currentTime;
                }
                else
                {
                    return 0;
                }
            },
            enumerable : true,
            configurable : false
        });
    }

    source.relative = params.relative;
    source.position = (params.position || VMath.v3BuildZero());
    source.direction = (params.direction || VMath.v3BuildZero());
    source.velocity = (params.velocity || VMath.v3BuildZero());
    source.minDistance = (params.minDistance || 1);
    source.maxDistance = (params.maxDistance || Number.MAX_VALUE);
    source.rollOff = (params.rollOff || 1);

    return source;
};


//
// WebGLSoundDevice
//
function WebGLSoundDevice() {}
WebGLSoundDevice.prototype =
{
    version : 1,

    vendor : "Turbulenz",

    // Public API
    createSource : function createSourceFn(params)
    {
        this.lastSourceID += 1;
        return WebGLSoundSource.create(this, this.lastSourceID, params);
    },

    createSound : function createSoundFn(params)
    {
        return WebGLSound.create(this, params);
    },

    loadSoundsArchive : function loadSoundsArchiveFn(params)
    {
        var src = params.src;
        if (typeof SoundTARLoader !== 'undefined')
        {
            SoundTARLoader.create({
                sd: this,
                src : src,
                uncompress : params.uncompress,
                onsoundload : function tarSoundLoadedFn(texture)
                {
                    params.onsoundload(texture);
                },
                onload : function soundTarLoadedFn(success, status)
                {
                    if (params.onload)
                    {
                        params.onload(success);
                    }
                },
                onerror : function soundTarFailedFn()
                {
                    if (params.onload)
                    {
                        params.onload(false);
                    }
                }
            });
            return true;
        }
        else
        {
            TurbulenzEngine.callOnError(
                'Missing archive loader required for ' + src);
            return false;
        }
    },

    createEffect : function createEffectFn(params)
    {
        return null;
    },

    createEffectSlot : function createEffectSlotFn(params)
    {
        return null;
    },

    createFilter : function createFilterFn(params)
    {
        return null;
    },

    update : function soundUpdateFn()
    {
        var sqrt = Math.sqrt;

        var listenerTransform = this.listenerTransform;
        var listenerPosition0 = listenerTransform[9];
        var listenerPosition1 = listenerTransform[10];
        var listenerPosition2 = listenerTransform[11];

        var linearDistance = this.linearDistance;

        var playingSources = this.playingSources;
        var id;
        for (id in playingSources)
        {
            if (playingSources.hasOwnProperty(id))
            {
                var source = playingSources[id];

                // Change volume depending on distance to listener
                var minDistance = source.minDistance;
                var maxDistance = source.maxDistance;
                var position = source.position;
                var position0 = position[0];
                var position1 = position[1];
                var position2 = position[2];

                var distanceSq;
                if (source.relative)
                {
                    distanceSq = ((position0 * position0) + (position1 * position1) + (position2 * position2));
                }
                else
                {
                    var delta0 = (listenerPosition0 - position0);
                    var delta1 = (listenerPosition1 - position1);
                    var delta2 = (listenerPosition2 - position2);
                    distanceSq = ((delta0 * delta0) + (delta1 * delta1) + (delta2 * delta2));
                }

                var gainFactor;
                if (distanceSq <= (minDistance * minDistance))
                {
                    gainFactor = 1;
                }
                else if (distanceSq >= (maxDistance * maxDistance))
                {
                    gainFactor = 0;
                }
                else
                {
                    var distance = sqrt(distanceSq);
                    if (linearDistance)
                    {
                        gainFactor = ((maxDistance - distance) / (maxDistance - minDistance));
                    }
                    else
                    {
                        gainFactor = minDistance / (minDistance + (source.rollOff * (distance - minDistance)));
                    }
                }

                if (source.gainFactor !== gainFactor)
                {
                    source.gainFactor = gainFactor;
                    source.updateAudioVolume();
                }
            }
        }
    },

    isSupported : function isSupportedFn(name)
    {
        if ("FILEFORMAT_OGG" === name)
        {
            return ("ogg" in this.supportedExtensions);
        }
        else if ("FILEFORMAT_MP3" === name)
        {
            return ("mp3" in this.supportedExtensions);
        }
        else if ("FILEFORMAT_WAV" === name)
        {
            return ("wav" in this.supportedExtensions);
        }
        return false;
    },

    // Private API
    addLoadingSound : function addLoadingSoundFn(soundCheckCall)
    {
        var loadingSounds = this.loadingSounds;
        loadingSounds[loadingSounds.length] = soundCheckCall;

        var loadingInterval = this.loadingInterval;
        var that = this;
        if (loadingInterval === null)
        {
            this.loadingInterval = loadingInterval = window.setInterval(function checkLoadingSources() {
                var numLoadingSounds = loadingSounds.length;
                var n = 0;
                do
                {
                    var soundCheck = loadingSounds[n];
                    if (soundCheck())
                    {
                        numLoadingSounds -= 1;
                        if (n < numLoadingSounds)
                        {
                            loadingSounds[n] = loadingSounds[numLoadingSounds];
                        }
                        loadingSounds.length = numLoadingSounds;
                    }
                    else
                    {
                        n += 1;
                    }
                }
                while (n < numLoadingSounds);
                if (numLoadingSounds === 0)
                {
                    window.clearInterval(loadingInterval);
                    that.loadingInterval = null;
                }
            }, 100);
        }
    },

    addPlayingSource : function addPlayingSourceFn(source)
    {
        this.playingSources[source.id] = source;
    },

    removePlayingSource : function removePlayingSourceFn(source)
    {
        delete this.playingSources[source.id];
    },

    isResourceSupported : function isResourceSupportedFn(soundPath)
    {
        var extension = soundPath.slice(-3).toLowerCase();
        return (extension in this.supportedExtensions);
    },

    destroy : function soundDeviceDestroyFn()
    {
        var loadingInterval = this.loadingInterval;
        if (loadingInterval !== null)
        {
            window.clearInterval(loadingInterval);
            this.loadingInterval = null;
        }

        var loadingSounds = this.loadingSounds;
        if (loadingSounds)
        {
            loadingSounds.length = 0;
            this.loadingSounds = null;
        }

        var playingSources = this.playingSources;
        var id;
        if (playingSources)
        {
            for (id in playingSources)
            {
                if (playingSources.hasOwnProperty(id))
                {
                    var source = playingSources[id];
                    if (source)
                    {
                        source.stop();
                    }
                }
            }
            this.playingSources = null;
        }
    }
};

// Constructor function
WebGLSoundDevice.create = function webGLSoundDeviceFn(params)
{
    var sd = new WebGLSoundDevice();

    sd.extensions = '';
    sd.renderer = 'HTML5 Audio';
    sd.aLCVersion = 0;
    sd.aLCExtensions = '';
    sd.aLCEFXVersion = 0;
    sd.aLCMaxAuxiliarySends = 0;

    sd.deviceSpecifier = (params.deviceSpecifier || null);
    sd.frequency = (params.frequency || 44100);
    sd.dopplerFactor = (params.dopplerFactor || 1);
    sd.dopplerVelocity = (params.dopplerVelocity || 1);
    sd.speedOfSound = (params.speedOfSound || 343.29998779296875);
    sd.linearDistance = (params.linearDistance !== undefined ? params.linearDistance : true);

    sd.loadingSounds = [];
    sd.loadingInterval = null;

    sd.playingSources = {};
    sd.lastSourceID = 0;

    var AudioContextConstructor = (window.AudioContext || window.webkitAudioContext);
    if (AudioContextConstructor)
    {
        var audioContext = new AudioContextConstructor();

        sd.renderer = 'WebAudio';
        sd.audioContext = audioContext;
        sd.frequency = audioContext.sampleRate;

        var listener = audioContext.listener;
        listener.dopplerFactor = sd.dopplerFactor;
        listener.speedOfSound = sd.speedOfSound;

        var listenerTransform, listenerVelocity;

        Object.defineProperty(sd, "listenerTransform", {
                get : function getListenerTransformFn() {
                    return listenerTransform.slice();
                },
                set : function setListenerTransformFn(transform) {
                    listenerTransform = VMath.m43Copy(transform, listenerTransform);

                    var position0 = transform[9];
                    var position1 = transform[10];
                    var position2 = transform[11];

                    listener.setPosition(position0, position1, position2);

                    listener.setOrientation(-transform[6], -transform[7], -transform[8],
                                            transform[3], transform[4], transform[5]);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(sd, "listenerVelocity", {
                get : function getListenerVelocityFn() {
                    return listenerVelocity.slice();
                },
                set : function setListenerVelocityFn(velocity) {
                    listenerVelocity = VMath.v3Copy(velocity, listenerVelocity);
                    listener.setVelocity(velocity[0], velocity[1], velocity[2]);
                },
                enumerable : true,
                configurable : false
            });

        Object.defineProperty(sd, "gain", {
                get : function getGainFn() {
                    return listener.gain;
                },
                set : function setGainFn(newGain) {
                    listener.gain = newGain;
                },
                enumerable : true,
                configurable : false
            });

        sd.update = function soundDeviceUpdate()
        {
            var listenerPosition0 = listenerTransform[9];
            var listenerPosition1 = listenerTransform[10];
            var listenerPosition2 = listenerTransform[11];

            var playingSources = this.playingSources;
            var stopped = [];
            var id;

            for (id in playingSources)
            {
                if (playingSources.hasOwnProperty(id))
                {
                    var source = playingSources[id];

                    if (!source.looping)
                    {
                        var tell = (audioContext.currentTime - source.playStart);
                        if (source.bufferNode.buffer.duration < tell)
                        {
                            source.playing = false;
                            source.sound = null;
                            source.bufferNode = null;
                            stopped[stopped.length] = id;
                            continue;
                        }
                    }

                    if (source.relative)
                    {
                        var position = source.position;
                        var pannerNode = source.pannerNode;
                        pannerNode.setPosition(position[0] + listenerPosition0,
                                               position[1] + listenerPosition1,
                                               position[2] + listenerPosition2);
                    }
                }
            }

            var numStopped = stopped.length;
            var n;
            for (n = 0; n < numStopped; n += 1)
            {
                delete playingSources[stopped[n]];
            }
        };
    }

    sd.listenerTransform = (params.listenerTransform || VMath.m43BuildIdentity());
    sd.listenerVelocity = (params.listenerVelocity || VMath.v3BuildZero());
    sd.listenerGain = (params.listenerGain || 1);

    // Need a temporary Audio element to test capabilities
    var audio = new Audio();

    // Check for looping support
    sd.loopingSupported = (typeof audio.loop === 'boolean');

    // Check for supported extensions
    var supportedExtensions = {};
    if (audio.canPlayType('application/ogg'))
    {
        supportedExtensions.ogg = true;
    }
    if (audio.canPlayType('audio/mp3'))
    {
        supportedExtensions.mp3 = true;
    }
    if (audio.canPlayType('audio/wav'))
    {
        supportedExtensions.wav = true;
    }
    sd.supportedExtensions = supportedExtensions;

    audio = null;

    return sd;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global window*/


//
// SoundTARLoader
//
function SoundTARLoader() {}
SoundTARLoader.prototype = {

    version : 1,

    processBytes : function processBytesFn(bytes)
    {
        var offset = 0;
        var totalSize = bytes.length;

        function getString(limit)
        {
            var nextOffset = (offset + limit);
            var s = [];
            var n = 0;
            var c = bytes[offset];
            offset += 1;
            while (c && n < limit)
            {
                s[n] = c;
                n += 1;

                c = bytes[offset];
                offset += 1;
            }
            offset = nextOffset;
            return String.fromCharCode.apply(null, s);
        }

        function getNumber(text)
        {
            /*jshint regexp: false*/
            text = text.replace(/[^\d]/g, '');
            /*jshint regexp: true*/
            return parseInt('0' + text, 8);
        }

        function parseHeader()
        {
            var header = {
                fileName : getString(100),
                mode : getString(8),
                uid : getString(8),
                gid : getString(8),
                length : getNumber(getString(12)),
                lastModified : getString(12),
                checkSum : getString(8),
                fileType : getString(1),
                linkName : getString(100),
                ustarSignature : getString(6),
                ustarVersion : getString(2),
                ownerUserName : getString(32),
                ownerGroupName : getString(32),
                deviceMajor : getString(8),
                deviceMinor : getString(8),
                fileNamePrefix : getString(155)
            };
            offset += 12;
            return header;
        }

        var sd = this.sd;
        var uncompress = this.uncompress;
        var onsoundload = this.onsoundload;
        var result = true;

        // This function is called for each sound in the archive,
        // synchronously if there is an immediate error,
        // asynchronously otherwise.  If one fails, the load result
        // for the whole archive is false.

        this.soundsLoading = 0;
        var that = this;
        function onload(sound)
        {
            that.soundsLoading -= 1;
            if (sound)
            {
                onsoundload(sound);
            }
            else
            {
                result = false;
            }
        }

        var header;
        while ((offset + 512) <= totalSize)
        {
            header = parseHeader();
            if (0 < header.length)
            {
                var fileName;
                if (header.fileName === "././@LongLink")
                {
                    // name in next chunk
                    fileName = getString(256);
                    offset += 256;

                    header = parseHeader();
                }
                else
                {
                    if (header.fileNamePrefix &&
                        header.ustarSignature === "ustar")
                    {
                        fileName = (header.fileNamePrefix + header.fileName);
                    }
                    else
                    {
                        fileName = header.fileName;
                    }
                }
                if ('' === header.fileType || '0' === header.fileType)
                {
                    //console.log('Loading "' + fileName + '" (' + header.length + ')');
                    this.soundsLoading += 1;
                    sd.createSound({
                        src : fileName,
                        data : (sd.audioContext ?
                                bytes.buffer.slice(offset, (offset + header.length)) :
                                bytes.subarray(offset, (offset + header.length))),
                        uncompress : uncompress,
                        onload : onload
                    });
                }
                offset += (Math.floor((header.length + 511) / 512) * 512);
            }
        }

        bytes = null;

        return result;
    },

    isValidHeader : function isValidHeaderFn(header)
    {
        return true;
    }
};

// Constructor function
SoundTARLoader.create = function tgaLoaderFn(params)
{
    var loader = new SoundTARLoader();
    loader.sd = params.sd;
    loader.uncompress = params.uncompress;
    loader.onsoundload = params.onsoundload;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    loader.soundsLoading = 0;

    var src = params.src;
    if (src)
    {
        loader.src = src;
        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            if (params.onerror)
            {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4)
            {
                if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';

                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if (xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK')
                    {
                        loader.onload('', 0);
                        return;
                    }

                    if (xhrStatus === 200 || xhrStatus === 0)
                    {
                        var buffer;
                        if (xhr.responseType === "arraybuffer")
                        {
                            buffer = xhr.response;
                        }
                        else if (xhr.mozResponseArrayBuffer)
                        {
                            buffer = xhr.mozResponseArrayBuffer;
                        }
                        else //if (xhr.responseText !== null)
                        {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            var i;
                            buffer = [];
                            buffer.length = numChars;
                            for (i = 0; i < numChars; i += 1)
                            {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                        }

                        // Fix for loading from file
                        if (xhrStatus === 0 && window.location.protocol === "file:")
                        {
                            xhrStatus = 200;
                        }

                        // processBytes returns false if any of the
                        // entries in the archive was not supported or
                        // couldn't be loaded as a sound.

                        var archiveResult =
                            loader.processBytes(new Uint8Array(buffer));

                        // Wait until all sounds have been loaded (or
                        // failed) and return the result.

                        if (loader.onload)
                        {
                            var callOnload = function callOnloadFn()
                            {
                                if (0 < loader.soundsLoading)
                                {
                                    if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                                    {
                                        window.setTimeout(callOnloadFn, 100);
                                    }
                                }
                                else
                                {
                                    loader.onload(archiveResult, xhrStatus);
                                }
                            };
                            callOnload();
                        }
                    }
                    else
                    {
                        if (loader.onerror)
                        {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if (xhr.hasOwnProperty && xhr.hasOwnProperty("responseType"))
        {
            xhr.responseType = "arraybuffer";
        }
        else if (xhr.overrideMimeType)
        {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        else
        {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }

    return loader;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global window*/


//
// TARLoader
//
function TARLoader() {}
TARLoader.prototype = {

    version : 1,

    processBytes : function processBytesFn(bytes)
    {
        var offset = 0;
        var totalSize = bytes.length;

        function getString(limit)
        {
            var nextOffset = (offset + limit);
            var s = [];
            var n = 0;
            var c = bytes[offset];
            offset += 1;
            while (c && n < limit)
            {
                s[n] = c;
                n += 1;

                c = bytes[offset];
                offset += 1;
            }
            offset = nextOffset;
            return String.fromCharCode.apply(null, s);
        }

        function getNumber(text)
        {
            /*jshint regexp: false*/
            text = text.replace(/[^\d]/g, '');
            /*jshint regexp: true*/
            return parseInt('0' + text, 8);
        }

        function parseHeader()
        {
            var header = {
                fileName : getString(100),
                mode : getString(8),
                uid : getString(8),
                gid : getString(8),
                length : getNumber(getString(12)),
                lastModified : getString(12),
                checkSum : getString(8),
                fileType : getString(1),
                linkName : getString(100),
                ustarSignature : getString(6),
                ustarVersion : getString(2),
                ownerUserName : getString(32),
                ownerGroupName : getString(32),
                deviceMajor : getString(8),
                deviceMinor : getString(8),
                fileNamePrefix : getString(155)
            };
            offset += 12;
            return header;
        }

        var gd = this.gd;
        var mipmaps = this.mipmaps;
        var ontextureload = this.ontextureload;
        var result = true;

        this.texturesLoading = 0;
        var that = this;
        function onload(texture)
        {
            that.texturesLoading -= 1;
            if (texture)
            {
                ontextureload(texture);
            }
            else
            {
                offset = totalSize;
                result = false;
            }
        }

        var header;
        while ((offset + 512) <= totalSize)
        {
            header = parseHeader();
            if (0 < header.length)
            {
                var fileName;
                if (header.fileName === "././@LongLink")
                {
                    // name in next chunk
                    fileName = getString(256);
                    offset += 256;

                    header = parseHeader();
                }
                else
                {
                    if (header.fileNamePrefix &&
                        header.ustarSignature === "ustar")
                    {
                        fileName = (header.fileNamePrefix + header.fileName);
                    }
                    else
                    {
                        fileName = header.fileName;
                    }
                }
                if ('' === header.fileType || '0' === header.fileType)
                {
                    //console.log('Loading "' + fileName + '" (' + header.length + ')');
                    this.texturesLoading += 1;
                    gd.createTexture({
                        src : fileName,
                        data : bytes.subarray(offset, (offset + header.length)),
                        mipmaps : mipmaps,
                        onload : onload
                    });
                }
                offset += (Math.floor((header.length + 511) / 512) * 512);
            }
        }

        bytes = null;

        return result;
    },

    isValidHeader : function isValidHeaderFn(header)
    {
        return true;
    }
};

// Constructor function
TARLoader.create = function tgaLoaderFn(params)
{
    var loader = new TARLoader();
    loader.gd = params.gd;
    loader.mipmaps = params.mipmaps;
    loader.ontextureload = params.ontextureload;
    loader.onload = params.onload;
    loader.onerror = params.onerror;
    loader.texturesLoading = 0;

    var src = params.src;
    if (src)
    {
        loader.src = src;
        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            if (params.onerror)
            {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4)
            {
                if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';

                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if (xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK')
                    {
                        loader.onload('', 0);
                        return;
                    }

                    if (xhrStatus === 200 || xhrStatus === 0)
                    {
                        var buffer;
                        if (xhr.responseType === "arraybuffer")
                        {
                            buffer = xhr.response;
                        }
                        else if (xhr.mozResponseArrayBuffer)
                        {
                            buffer = xhr.mozResponseArrayBuffer;
                        }
                        else //if (xhr.responseText !== null)
                        {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for (var i = 0; i < numChars; i += 1)
                            {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                        }

                        // Fix for loading from file
                        if (xhrStatus === 0 && window.location.protocol === "file:")
                        {
                            xhrStatus = 200;
                        }

                        if (loader.processBytes(new Uint8Array(buffer)))
                        {
                            if (loader.onload)
                            {
                                var callOnload = function callOnloadFn()
                                {
                                    if (0 < loader.texturesLoading)
                                    {
                                        if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                                        {
                                            window.setTimeout(callOnloadFn, 100);
                                        }
                                    }
                                    else
                                    {
                                        loader.onload(true, xhrStatus);
                                    }
                                };
                                callOnload();
                            }
                        }
                        else
                        {
                            if (loader.onerror)
                            {
                                loader.onerror();
                            }
                        }
                    }
                    else
                    {
                        if (loader.onerror)
                        {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if (xhr.hasOwnProperty && xhr.hasOwnProperty("responseType"))
        {
            xhr.responseType = "arraybuffer";
        }
        else if (xhr.overrideMimeType)
        {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        else
        {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }

    return loader;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global TurbulenzEngine*/
/*global Uint8Array*/
/*global Uint16Array*/
/*global window*/


//
// TGALoader
//
function TGALoader() {}
TGALoader.prototype = {

    version : 1,

    TYPE_MAPPED      : 1,
    TYPE_COLOR       : 2,
    TYPE_GRAY        : 3,
    TYPE_MAPPED_RLE  : 9,
    TYPE_COLOR_RLE   : 10,
    TYPE_GRAY_RLE    : 11,

    DESC_ABITS       : 0x0f,
    DESC_HORIZONTAL  : 0x10,
    DESC_VERTICAL    : 0x20,

    SIGNATURE        : "TRUEVISION-XFILE",

    RLE_PACKETSIZE       : 0x80,

    processBytes : function processBytesFn(bytes)
    {
        var header = this.parseHeader(bytes);
        if (!this.isValidHeader(header))
        {
            return;
        }

        var offset = 18;

        this.width  = header.width;
        this.height = header.height;

        this.bytesPerPixel = Math.floor(header.bpp / 8);

        /*jshint bitwise: false*/
        this.horzRev = (header.descriptor & this.DESC_HORIZONTAL);
        this.vertRev = !(header.descriptor & this.DESC_VERTICAL);
        /*jshint bitwise: true*/

        var rle = false;

        var gd = this.gd;
        switch (header.imageType)
        {
        case this.TYPE_MAPPED_RLE:
            rle = true;
            if (header.colorMapSize > 24)
            {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            }
            else if (header.colorMapSize > 16)
            {
                this.format = gd.PIXELFORMAT_R8G8B8;
            }
            else
            {
                this.format = gd.PIXELFORMAT_R5G5B5A1;
            }
            break;

        case this.TYPE_MAPPED:
            if (header.colorMapSize > 24)
            {
                this.format = gd.PIXELFORMAT_R8G8B8A8;
            }
            else if (header.colorMapSize > 16)
            {
                this.format = gd.PIXELFORMAT_R8G8B8;
            }
            else
            {
                this.format = gd.PIXELFORMAT_R5G5B5A1;
            }
            break;

        case this.TYPE_GRAY_RLE:
            rle = true;
            this.format = gd.PIXELFORMAT_L8;
            break;

        case this.TYPE_GRAY:
            this.format = gd.PIXELFORMAT_L8;
            break;

        case this.TYPE_COLOR_RLE:
            rle = true;
            switch (this.bytesPerPixel)
            {
            case 4:
                this.format = gd.PIXELFORMAT_R8G8B8A8;
                break;

            case 3:
                this.format = gd.PIXELFORMAT_R8G8B8;
                break;

            case 2:
                this.format = gd.PIXELFORMAT_R5G5B5A1;
                break;

            default:
                return;
            }
            break;

        case this.TYPE_COLOR:
            switch (this.bytesPerPixel)
            {
            case 4:
                this.format = gd.PIXELFORMAT_R8G8B8A8;
                break;

            case 3:
                this.format = gd.PIXELFORMAT_R8G8B8;
                break;

            case 2:
                this.format = gd.PIXELFORMAT_R5G5B5A1;
                break;

            default:
                return;
            }
            break;

        default:
            return;
        }

        // Skip the image ID field.
        if (header.idLength)
        {
            offset += header.idLength;
            if (offset > bytes.length)
            {
                return;
            }
        }

        if (this.TYPE_MAPPED_RLE === header.imageType ||
            this.TYPE_MAPPED === header.imageType)
        {
            if (header.colorMapType !== 1)
            {
                return;
            }
        }
        else if (header.colorMapType !== 0)
        {
            return;
        }

        if (header.colorMapType === 1)
        {
            var index  = header.colorMapIndex;
            var length = header.colorMapLength;

            if (length === 0)
            {
                return;
            }

            var pelbytes = Math.floor(header.colorMapSize / 8);
            var numColors = (length + index);
            var colorMap = [];
            colorMap.length = (numColors * pelbytes);

            this.colorMap = colorMap;
            this.colorMapBytesPerPixel = pelbytes;

            // Zero the entries up to the beginning of the map
            var j;
            for (j = 0; j < (index * pelbytes); j += 1)
            {
                colorMap[j] = 0;
            }

            // Read in the rest of the colormap
            for (j = (index * pelbytes); j < (index * pelbytes); j += 1, offset += 1)
            {
                colorMap[j] = bytes[offset];
            }

            offset += (length * pelbytes);
            if (offset > bytes.length)
            {
                return;
            }

            if (pelbytes >= 3)
            {
                // Rearrange the colors from BGR to RGB
                for (j = (index * pelbytes); j < (length * pelbytes); j += pelbytes)
                {
                    var tmp = colorMap[j];
                    colorMap[j] = colorMap[j + 2];
                    colorMap[j + 2] = tmp;
                }
            }
        }

        var size = (this.width * this.height * this.bytesPerPixel);

        if (bytes.length < (offset + size))
        {
            return;
        }

        var data = bytes.subarray(offset);
        bytes = null;

        if (rle)
        {
            data = this.expandRLE(data);
        }

        if (this.horzRev)
        {
            this.flipHorz(data);
        }

        if (this.vertRev)
        {
            this.flipVert(data);
        }

        if (this.colorMap)
        {
            data = this.expandColorMap(data);
        }
        else if (2 < this.bytesPerPixel)
        {
            this.convertBGR2RGB(data);
        }
        else if (2 === this.bytesPerPixel)
        {
            data = this.convertARGB2RGBA(data);
        }

        this.data = data;
    },

    parseHeader : function parseHeaderFn(bytes)
    {
        /*jshint bitwise: false*/
        var header = {
            idLength : bytes[0],
            colorMapType : bytes[1],

            imageType : bytes[2],

            colorMapIndex : ((bytes[4] << 8) | bytes[3]),
            colorMapLength : ((bytes[6] << 8) | bytes[5]),

            colorMapSize : bytes[7],

            xOrigin : ((bytes[9] << 8) | bytes[8]),
            yOrigin : ((bytes[11] << 8) | bytes[10]),

            width : ((bytes[13] << 8) | bytes[12]),
            height : ((bytes[15] << 8) | bytes[14]),

            bpp : bytes[16],

            // Image descriptor:
            // 3-0: attribute bpp
            // 4:   left-to-right
            // 5:   top-to-bottom
            // 7-6: zero
            descriptor : bytes[17]
        };
        /*jshint bitwise: true*/
        return header;
    },

    isValidHeader : function isValidHeaderFn(header)
    {
        if (this.TYPE_MAPPED_RLE === header.imageType ||
            this.TYPE_MAPPED === header.imageType)
        {
            if (header.colorMapType !== 1)
            {
                return false;
            }
        }
        else if (header.colorMapType !== 0)
        {
            return false;
        }

        if (header.colorMapType === 1)
        {
            if (header.colorMapLength === 0)
            {
                return false;
            }
        }

        switch (header.imageType)
        {
        case this.TYPE_MAPPED_RLE:
        case this.TYPE_MAPPED:
            break;

        case this.TYPE_GRAY_RLE:
        case this.TYPE_GRAY:
            break;

        case this.TYPE_COLOR_RLE:
        case this.TYPE_COLOR:
            switch (Math.floor(header.bpp / 8))
            {
            case 4:
            case 3:
            case 2:
                break;

            default:
                return false;
            }
            break;

        default:
            return false;
        }

        if (16384 < header.width)
        {
            return false;
        }

        if (16384 < header.height)
        {
            return false;
        }

        return true;
    },

    expandRLE : function expandRLEFn(data)
    {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var datasize = pelbytes;
        var size = (width * height * pelbytes);
        var RLE_PACKETSIZE = this.RLE_PACKETSIZE;
        var dst = new Uint8Array(size);
        var src = 0, dest = 0, n, k;
        do
        {
            var count = data[src];
            src += 1;

            /*jshint bitwise: false*/
            var bytes = (((count & ~RLE_PACKETSIZE) + 1) * datasize);

            if (count & RLE_PACKETSIZE)
            {
                // Optimized case for single-byte encoded data
                if (datasize === 1)
                {
                    var r = data[src];
                    src += 1;

                    for (n = 0; n < bytes; n += 1)
                    {
                        dst[dest + k] = r;
                    }
                }
                else
                {
                    // Fill the buffer with the next value
                    for (n = 0; n < datasize; n += 1)
                    {
                        dst[dest + n] = data[src + n];
                    }
                    src += datasize;

                    for (k = datasize; k < bytes; k += datasize)
                    {
                        for (n = 0; n < datasize; n += 1)
                        {
                            dst[dest + k + n] = dst[dest + n];
                        }
                    }
                }
            }
            else
            {
                // Read in the buffer
                for (n = 0; n < bytes; n += 1)
                {
                    dst[dest + n] = data[src + n];
                }
                src += bytes;
            }
            /*jshint bitwise: true*/

            dest += bytes;
        }
        while (dest < size);

        return dst;
    },

    expandColorMap : function expandColorMapFn(data)
    {
        // Unpack image
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var size = (width * height * pelbytes);
        var dst = new Uint8Array(size);
        var dest = 0, src = 0;
        var palette = this.colorMap;
        delete this.colorMap;

        if (pelbytes === 2 || pelbytes === 3 || pelbytes === 4)
        {
            do
            {
                var index = (data[src] * pelbytes);
                src += 1;

                for (var n = 0; n < pelbytes; n += 1)
                {
                    dst[dest] = palette[index + n];
                    dest += 1;
                }
            }
            while (dest < size);
        }

        if (pelbytes === 2)
        {
            dst = this.convertARGB2RGBA(dst);
        }

        return dst;
    },

    flipHorz : function flipHorzFn(data)
    {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var halfWidth = Math.floor(width / 2);
        var pitch = (width * pelbytes);
        for (var i = 0; i < height; i += 1)
        {
            for (var j = 0; j < halfWidth; j += 1)
            {
                for (var k = 0; k < pelbytes; k += 1)
                {
                    var tmp = data[j * pelbytes + k];
                    data[j * pelbytes + k] = data[(width - j - 1) * pelbytes + k];
                    data[(width - j - 1) * pelbytes + k] = tmp;
                }
            }
            data += pitch;
        }
    },

    flipVert : function flipVertFn(data)
    {
        var pelbytes = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var halfHeight = Math.floor(height / 2);
        var pitch = (width * pelbytes);
        for (var i = 0; i < halfHeight; i += 1)
        {
            var srcRow = (i * pitch);
            var destRow = ((height - i - 1) * pitch);
            for (var j = 0; j < pitch; j += 1)
            {
                var tmp = data[srcRow + j];
                data[srcRow + j] = data[destRow + j];
                data[destRow + j] = tmp;
            }
        }
    },

    convertBGR2RGB : function convertBGR2RGBFn(data)
    {
        // Rearrange the colors from BGR to RGB
        var bytesPerPixel = this.bytesPerPixel;
        var width = this.width;
        var height = this.height;
        var size = (width * height * bytesPerPixel);
        var offset = 0;
        do
        {
            var tmp = data[offset];
            data[offset] = data[offset + 2];
            data[offset + 2] = tmp;
            offset += bytesPerPixel;
        }
        while (offset < size);
    },

    convertARGB2RGBA : function convertARGB2RGBAFn(data)
    {
        // Rearrange the colors from ARGB to RGBA (2 bytes)
        var bytesPerPixel = this.bytesPerPixel;
        if (bytesPerPixel === 2)
        {
            var width = this.width;
            var height = this.height;
            var size = (width * height * bytesPerPixel);
            var dst = new Uint16Array(width * height);
            var src = 0, dest = 0;
            var r, g, b, a;

            /*jshint bitwise: false*/
            var mask = ((1 << 5) - 1);
            var blueMask = mask;
            var greenMask = (mask << 5);
            var redMask = (mask << 10);
            //var alphaMask = (1 << 15);
            do
            {
                var value = ((src[1] << 8) | src[0]);
                src += 2;
                b = (value & blueMask) << 1;
                g = (value & greenMask) << 1;
                r = (value & redMask) << 1;
                a = (value >> 15);
                dst[dest] = r | g | b | a;
                dest += 1;
            }
            while (src < size);
            /*jshint bitwise: true*/

            return dst;
        }
        else
        {
            return data;
        }
    }
};

// Constructor function
TGALoader.create = function tgaLoaderFn(params)
{
    var loader = new TGALoader();
    loader.gd = params.gd;
    loader.onload = params.onload;
    loader.onerror = params.onerror;

    var src = params.src;
    if (src)
    {
        loader.src = src;
        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            if (params.onerror)
            {
                params.onerror("No XMLHTTPRequest object could be created");
            }
            return null;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4)
            {
                if (!TurbulenzEngine || !TurbulenzEngine.isUnloading())
                {
                    var xhrStatus = xhr.status;
                    var xhrStatusText = xhr.status !== 0 && xhr.statusText || 'No connection';

                    // Sometimes the browser sets status to 200 OK when the connection is closed
                    // before the message is sent (weird!).
                    // In order to address this we fail any completely empty responses.
                    // Hopefully, nobody will get a valid response with no headers and no body!
                    if (xhr.getAllResponseHeaders() === "" && xhr.responseText === "" && xhrStatus === 200 && xhrStatusText === 'OK')
                    {
                        loader.onload('', 0);
                        return;
                    }

                    if (xhrStatus === 200 || xhrStatus === 0)
                    {
                        var buffer;
                        if (xhr.responseType === "arraybuffer")
                        {
                            buffer = xhr.response;
                        }
                        else if (xhr.mozResponseArrayBuffer)
                        {
                            buffer = xhr.mozResponseArrayBuffer;
                        }
                        else //if (xhr.responseText !== null)
                        {
                            /*jshint bitwise: false*/
                            var text = xhr.responseText;
                            var numChars = text.length;
                            buffer = [];
                            buffer.length = numChars;
                            for (var i = 0; i < numChars; i += 1)
                            {
                                buffer[i] = (text.charCodeAt(i) & 0xff);
                            }
                            /*jshint bitwise: true*/
                        }

                        // Fix for loading from file
                        if (xhrStatus === 0 && window.location.protocol === "file:")
                        {
                            xhrStatus = 200;
                        }

                        loader.processBytes(new Uint8Array(buffer));
                        if (loader.data)
                        {
                            if (loader.onload)
                            {
                                loader.onload(loader.data, loader.width, loader.height, loader.format, xhrStatus);
                            }
                        }
                        else
                        {
                            if (loader.onerror)
                            {
                                loader.onerror();
                            }
                        }
                    }
                    else
                    {
                        if (loader.onerror)
                        {
                            loader.onerror();
                        }
                    }
                }
                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
            }
        };
        xhr.open("GET", params.src, true);
        if (xhr.hasOwnProperty && xhr.hasOwnProperty("responseType"))
        {
            xhr.responseType = "arraybuffer";
        }
        else if (xhr.overrideMimeType)
        {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        else
        {
            xhr.setRequestHeader("Content-Type", "text/plain; charset=x-user-defined");
        }
        xhr.send(null);
    }
    else
    {
        loader.processBytes(params.data);
        if (loader.data)
        {
            if (loader.onload)
            {
                loader.onload(loader.data, loader.width, loader.height, loader.format);
            }
        }
        else
        {
            if (loader.onerror)
            {
                loader.onerror();
            }
        }
    }

    return loader;
};

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

// Copyright (c) 2012 Turbulenz Limited

function TouchEvent() {}

TouchEvent.create = function touchEventCreateFn(params)
{
    var touchEvent = new TouchEvent();

    touchEvent.changedTouches   = params.changedTouches;
    touchEvent.gameTouches      = params.gameTouches;
    touchEvent.touches          = params.touches;

    return touchEvent;
};

// Copyright (c) 2011-2012 Turbulenz Limited
/*global VMathArrayConstructor: true*/
/*global VMath*/
/*global WebGLGraphicsDevice*/
/*global WebGLInputDevice*/
/*global WebGLSoundDevice*/
/*global WebGLPhysicsDevice*/
/*global WebGLNetworkDevice*/
/*global Float32Array*/
/*global console*/
/*global window*/


//
// WebGLTurbulenzEngine
//
function WebGLTurbulenzEngine() {}
WebGLTurbulenzEngine.prototype = {

    version : '0.23.1.0',

    setInterval: function (f, t)
    {
        var that = this;
        return window.setInterval(function () {
                that.updateTime();
                f();
            }, t);
    },

    clearInterval: function (i)
    {
        return window.clearInterval(i);
    },

    createGraphicsDevice: function (params)
    {
        if (this.graphicsDevice)
        {
            this.callOnError('GraphicsDevice already created');
            return null;
        }
        else
        {
            var graphicsDevice = WebGLGraphicsDevice.create(this.canvas, params);
            this.graphicsDevice = graphicsDevice;
            return graphicsDevice;
        }
    },

    createPhysicsDevice: function (params)
    {
        if (this.physicsDevice)
        {
            this.callOnError('PhysicsDevice already created');
            return null;
        }
        else
        {
            var physicsDevice;
            var plugin = this.getPluginObject();
            if (plugin)
            {
                physicsDevice = plugin.createPhysicsDevice(params);
            }
            else
            {
                physicsDevice = WebGLPhysicsDevice.create(params);
            }
            this.physicsDevice = physicsDevice;
            return physicsDevice;
        }
    },

    createSoundDevice: function (params)
    {
        if (this.soundDevice)
        {
            this.callOnError('SoundDevice already created');
            return null;
        }
        else
        {
            var soundDevice;
            var plugin = this.getPluginObject();
            if (plugin)
            {
                soundDevice = plugin.createSoundDevice(params);
            }
            else
            {
                soundDevice = WebGLSoundDevice.create(params);
            }
            this.soundDevice = soundDevice;
            return soundDevice;
        }
    },

    createInputDevice: function (params)
    {
        if (this.inputDevice)
        {
            this.callOnError('InputDevice already created');
            return null;
        }
        else
        {
            var inputDevice = WebGLInputDevice.create(this.canvas, params);
            this.inputDevice = inputDevice;
            return inputDevice;
        }
    },

    createNetworkDevice: function (params)
    {
        if (this.networkDevice)
        {
            throw 'NetworkDevice already created';
        }
        else
        {
            var networkDevice = WebGLNetworkDevice.create(params);
            this.networkDevice = networkDevice;
            return networkDevice;
        }
    },

    createMathDevice: function (params)
    {
        // Check if the browser supports using apply with Float32Array
        try
        {
            var testVector = new Float32Array([1, 2, 3]);

            VMath.v3Build.apply(VMath, testVector);

            // Clamp FLOAT_MAX
            testVector[0] = VMath.FLOAT_MAX;
            VMath.FLOAT_MAX = testVector[0];
        }
        catch (e)
        {
        }

        return VMath;
    },

    createNativeMathDevice: function (params)
    {
        return VMath;
    },

    getGraphicsDevice: function ()
    {
        var graphicsDevice = this.graphicsDevice;
        if (graphicsDevice === null)
        {
            this.callOnError("GraphicsDevice not created yet.");
        }
        return graphicsDevice;
    },

    getPhysicsDevice: function ()
    {
        return this.physicsDevice;
    },

    getSoundDevice: function ()
    {
        return this.soundDevice;
    },

    getInputDevice: function ()
    {
        return this.inputDevice;
    },

    getNetworkDevice: function ()
    {
        return this.networkDevice;
    },

    getMathDevice: function ()
    {
        return VMath;
    },

    getNativeMathDevice: function ()
    {
        return VMath;
    },

    flush: function ()
    {

    },

    run: function ()
    {

    },

    encrypt: function (msg)
    {
        return msg;
    },

    decrypt: function (msg)
    {
        return msg;
    },

    generateSignature: function (msg)
    {
        return null;
    },

    verifySignature: function (msg, sig)
    {
        return true;
    },

    onerror: function (msg)
    {
        console.error(msg);
    },

    onwarning: function (msg)
    {
        console.warn(msg);
    },

    getSystemInfo: function ()
    {
        return this.systemInfo;
    },

    request: function (url, callback)
    {
        var that = this;

        var xhr;
        if (window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        else
        {
            that.callOnError("No XMLHTTPRequest object could be created");
            return;
        }

        function httpRequestCallback()
        {
            if (xhr.readyState === 4) /* 4 == complete */
            {
                if (!that.isUnloading())
                {
                    var xhrResponseText = xhr.responseText;
                    var xhrStatus = xhr.status;

                    if ("" === xhrResponseText)
                    {
                        xhrResponseText = null;
                    }

                    if (null === xhr.getResponseHeader("Content-Type") &&
                        "" === xhr.getAllResponseHeaders())
                    {
                        // Sometimes the browser sets status to 200 OK
                        // when the connection is closed before the
                        // message is sent (weird!).  In order to address
                        // this we fail any completely empty responses.
                        // Hopefully, nobody will get a valid response
                        // with no headers and no body!
                        // Except that for cross domain requests getAllResponseHeaders ALWAYS returns an empty string
                        // even for valid responses...
                        callback(null, 0);
                        return;
                    }

                    // Fix for loading from file
                    if (xhrStatus === 0 && xhrResponseText && window.location.protocol === "file:")
                    {
                        xhrStatus = 200;
                    }

                    // Invoke the callback
                    if (xhrStatus !== 0)
                    {
                        // Under these conditions, we return a null
                        // response text.

                        if (404 === xhrStatus)
                        {
                            xhrResponseText = null;
                        }

                        callback(xhrResponseText, xhrStatus);
                    }
                    else
                    {
                        // Checking xhr.statusText when xhr.status is
                        // 0 causes a silent error

                        callback(xhrResponseText, 0);
                    }
                }

                // break circular reference
                xhr.onreadystatechange = null;
                xhr = null;
                callback = null;
            }
        }

        xhr.open('GET', url, true);
        if (callback)
        {
            xhr.onreadystatechange = httpRequestCallback;
        }
        xhr.send();
    },

    // Internals
    destroy : function ()
    {
        if (this.networkDevice)
        {
            delete this.networkDevice;
        }
        if (this.inputDevice)
        {
            this.inputDevice.destroy();
            delete this.inputDevice;
        }
        if (this.physicsDevice)
        {
            delete this.physicsDevice;
        }
        if (this.soundDevice)
        {
            if (this.soundDevice.destroy)
            {
                this.soundDevice.destroy();
            }
            delete this.soundDevice;
        }
        if (this.graphicsDevice)
        {
            this.graphicsDevice.destroy();
            delete this.graphicsDevice;
        }
        if (this.canvas)
        {
            delete this.canvas;
        }
        if (this.resizeCanvas)
        {
            window.removeEventListener('resize', this.resizeCanvas, false);
        }
    },

    getPluginObject : function ()
    {
        if (!this.plugin &&
            this.pluginId)
        {
            this.plugin = document.getElementById(this.pluginId);
        }
        return this.plugin;
    },

    unload : function ()
    {
        if (!this.unloading)
        {
            this.unloading = true;
            if (this.onunload)
            {
                this.onunload();
            }
            if (this.destroy)
            {
                this.destroy();
            }
        }
    },

    isUnloading : function ()
    {
        return this.unloading;
    },

    enableProfiling : function ()
    {
    },

    startProfiling : function ()
    {
        if (console && console.profile && console.profileEnd)
        {
            console.profile("turbulenz");
        }
    },

    stopProfiling : function ()
    {
        // Chrome and Safari return an object. IE and Firefox print to the console/profile tab.
        var result;
        if (console && console.profile && console.profileEnd)
        {
            console.profileEnd("turbulenz");
            if (console.profiles)
            {
                result = console.profiles[console.profiles.length - 1];
            }
        }

        return result;
    },

    callOnError : function (msg)
    {
        var onerror = this.onerror;
        if (onerror)
        {
            onerror(msg);
        }
    }
};

// Constructor function
WebGLTurbulenzEngine.create = function webGLTurbulenzEngineFn(params)
{
    var tz = new WebGLTurbulenzEngine();

    var canvas = params.canvas;
    var fillParent = params.fillParent;

    // To expose unload (the whole interaction needs a re-design)
    window.TurbulenzEngineCanvas = tz;

    tz.pluginId = params.pluginId;
    tz.plugin = null;

    // time property
    var getTime = Date.now;
    var performance = window.performance;
    if (performance)
    {
        // It seems high resolution "now" requires a proper "this"
        if (performance.now)
        {
            getTime = function getTimeFn()
            {
                return performance.now();
            };
        }
        else if (performance.webkitNow)
        {
            getTime = function getTimeFn()
            {
                return performance.webkitNow();
            };
        }
    }

    // To be used by the GraphicsDevice for accurate fps calculations
    tz.getTime = getTime;

    var baseTime = getTime(); // all in milliseconds (our "time" property is in seconds)

    // Safari 6.0 has broken object property defines.
    var canUseDefineProperty = true;
    var navStr = navigator.userAgent;
    var navVersionIdx = navStr.indexOf("Version/6.0");
    if (-1 !== navVersionIdx)
    {
        if (-1 !== navStr.substring(navVersionIdx).indexOf("Safari/"))
        {
            canUseDefineProperty = false;
        }
    }

    if (canUseDefineProperty && Object.defineProperty)
    {
        Object.defineProperty(tz, "time", {
                get : function () {
                    return ((getTime() - baseTime) * 0.001);
                },
                set : function (newValue) {
                    if (typeof newValue === 'number')
                    {
                        // baseTime is in milliseconds, newValue is in seconds
                        baseTime = (getTime() - (newValue * 1000));
                    }
                    else
                    {
                        tz.callOnError("Must set 'time' attribute to a number");
                    }
                },
                enumerable : false,
                configurable : false
            });

        tz.updateTime = function ()
        {
        };
    }
    else
    {
        tz.updateTime = function ()
        {
            this.time = ((getTime() - baseTime) * 0.001);
        };
    }

    // fast zero timeouts
    if (window.postMessage)
    {
        var zeroTimeoutMessageName = "0-timeout-message";
        var timeouts = [];
        var timeId = 0;

        var setZeroTimeout = function setZeroTimeoutFn(fn)
        {
            timeId += 1;
            var timeout = {
                    id : timeId,
                    fn : fn
                };
            timeouts.push(timeout);
            window.postMessage(zeroTimeoutMessageName, "*");
            return timeout;
        };

        var clearZeroTimeout = function clearZeroTimeoutFn(timeout)
        {
            var id = timeout;
            var numTimeouts = timeouts.length;
            for (var n = 0; n < numTimeouts; n += 1)
            {
                if (timeouts[n].id === id)
                {
                    timeouts.splice(n, 1);
                    return;
                }
            }
        };

        var handleZeroTimeoutMessages = function handleZeroTimeoutMessagesFn(event)
        {
            if (event.source === window &&
                event.data === zeroTimeoutMessageName)
            {
                event.stopPropagation();

                if (timeouts.length && !tz.isUnloading())
                {
                    var timeout = timeouts.shift();
                    var fn = timeout.fn;
                    fn();
                }
            }
        };
        window.addEventListener("message", handleZeroTimeoutMessages, true);

        tz.setTimeout = function (f, t)
        {
            if (t < 1)
            {
                return setZeroTimeout(f);
            }
            else
            {
                var that = this;
                return window.setTimeout(function () {
                        that.updateTime();
                        if (!that.isUnloading())
                        {
                            f();
                        }
                    }, t);
            }
        };

        tz.clearTimeout = function (i)
        {
            if (typeof i === 'object')
            {
                return clearZeroTimeout(i);
            }
            else
            {
                return window.clearTimeout(i);
            }
        };
    }
    else
    {
        tz.setTimeout = function (f, t)
        {
            var that = this;
            return window.setTimeout(function () {
                    that.updateTime();
                    if (!that.isUnloading())
                    {
                        f();
                    }
                }, t);
        };

        tz.clearTimeout = function (i)
        {
            return window.clearTimeout(i);
        };
    }

    var requestAnimationFrame = (window.requestAnimationFrame       ||
                                 window.webkitRequestAnimationFrame ||
                                 window.oRequestAnimationFrame      ||
                                 window.msRequestAnimationFrame     ||
                                 window.mozRequestAnimationFrame);
    if (requestAnimationFrame)
    {
        tz.setInterval = function (f, t)
        {
            var that = this;
            if (Math.abs(t - (1000 / 60)) <= 1)
            {
                var interval = {
                    enabled: true
                };
                var wrap1 = function wrap1()
                {
                    if (interval.enabled)
                    {
                        that.updateTime();
                        if (!that.isUnloading())
                        {
                            f();
                        }
                        requestAnimationFrame(wrap1, that.canvas);
                    }
                };
                requestAnimationFrame(wrap1, that.canvas);
                return interval;
            }
            else
            {
                var wrap2 = function wrap2()
                {
                    that.updateTime();
                    if (!that.isUnloading())
                    {
                        f();
                    }
                };
                return window.setInterval(wrap2, t);
            }
        };

        tz.clearInterval = function (i)
        {
            if (typeof i === 'object')
            {
                i.enabled = false;
            }
            else
            {
                window.clearInterval(i);
            }
        };
    }

    tz.canvas = canvas;
    tz.networkDevice = null;
    tz.inputDevice = null;
    tz.physicsDevice = null;
    tz.soundDevice = null;
    tz.graphicsDevice = null;

    if (fillParent)
    {
        // Resize canvas to fill parent
        tz.resizeCanvas = function ()
        {
            canvas.width = canvas.parentNode.clientWidth;
            canvas.height = canvas.parentNode.clientHeight;
        };

        tz.resizeCanvas();

        window.addEventListener('resize', tz.resizeCanvas, false);
    }

    var previousOnBeforeUnload = window.onbeforeunload;
    window.onbeforeunload = function ()
    {
        tz.unload();

        if (previousOnBeforeUnload)
        {
            previousOnBeforeUnload.call(this);
        }
    };

    tz.time = 0;

    // System info
    var systemInfo = {
        architecture: '',
        cpuDescription: '',
        cpuVendor: '',
        numPhysicalCores: 1,
        numLogicalCores: 1,
        ramInMegabytes: 0,
        frequencyInMegaHZ: 0,
        osVersionMajor: 0,
        osVersionMinor: 0,
        osVersionBuild: 0,
        osName: navigator.platform,
        userLocale: (navigator.language || navigator.userLanguage).replace('-', '_')
    };
    var userAgent = navigator.userAgent;
    var osIndex = userAgent.indexOf('Windows');
    if (osIndex !== -1)
    {
        systemInfo.osName = 'Windows';
        if (navigator.platform === 'Win64')
        {
            systemInfo.architecture = 'x86_64';
        }
        else if (navigator.platform === 'Win32')
        {
            systemInfo.architecture = 'x86';
        }
        osIndex += 7;
        if (userAgent.slice(osIndex, (osIndex + 4)) === ' NT ')
        {
            osIndex += 4;
            systemInfo.osVersionMajor = parseInt(userAgent.slice(osIndex, (osIndex + 1)), 10);
            systemInfo.osVersionMinor = parseInt(userAgent.slice((osIndex + 2), (osIndex + 4)), 10);
        }
    }
    else
    {
        osIndex = userAgent.indexOf('Mac OS X');
        if (osIndex !== -1)
        {
            systemInfo.osName = 'Darwin';
            if (navigator.platform.indexOf('Intel') !== -1)
            {
                systemInfo.architecture = 'x86';
            }
            osIndex += 9;
            systemInfo.osVersionMajor = parseInt(userAgent.slice(osIndex, (osIndex + 2)), 10);
            systemInfo.osVersionMinor = parseInt(userAgent.slice((osIndex + 3), (osIndex + 4)), 10);
            systemInfo.osVersionBuild = (parseInt(userAgent.slice((osIndex + 5), (osIndex + 6)), 10) || 0);
        }
        else
        {
            osIndex = userAgent.indexOf('Linux');
            if (osIndex !== -1)
            {
                systemInfo.osName = 'Linux';
                if (navigator.platform.indexOf('64') !== -1)
                {
                    systemInfo.architecture = 'x86_64';
                }
                else if (navigator.platform.indexOf('x86') !== -1)
                {
                    systemInfo.architecture = 'x86';
                }
            }
        }
    }
    tz.systemInfo = systemInfo;

    var b64ConversionTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split('');

    tz.base64Encode = function base64EncodeFn(bytes)
    {
        var output = "";
        var numBytes = bytes.length;
        var valueToChar = b64ConversionTable;
        var n, chr1, chr2, chr3, enc1, enc2, enc3, enc4;

        /*jshint bitwise: false*/
        n = 0;
        while (n < numBytes)
        {
            chr1 = bytes[n];
            n += 1;

            enc1 = (chr1 >> 2);

            if (n < numBytes)
            {
                chr2 = bytes[n];
                n += 1;

                if (n < numBytes)
                {
                    chr3 = bytes[n];
                    n += 1;

                    enc2 = (((chr1 & 3) << 4) | (chr2 >> 4));
                    enc3 = (((chr2 & 15) << 2) | (chr3 >> 6));
                    enc4 = (chr3 & 63);
                }
                else
                {
                    enc2 = (((chr1 & 3) << 4) | (chr2 >> 4));
                    enc3 = ((chr2 & 15) << 2);
                    enc4 = 64;
                }
            }
            else
            {
                enc2 = ((chr1 & 3) << 4);
                enc3 = 64;
                enc4 = 64;
            }

            output += valueToChar[enc1];
            output += valueToChar[enc2];
            output += valueToChar[enc3];
            output += valueToChar[enc4];
        }
        /*jshint bitwise: true*/

        return output;
    };

    return tz;
};

window.WebGLTurbulenzEngine = WebGLTurbulenzEngine;



// Copyright (c) 2011 Turbulenz Limited

/*global TurbulenzServices: false*/

//
// API
//
function MappingTable() {}
MappingTable.prototype =
{
    version : 1,

    getURL: function mappingTableGetURL(assetPath, missingCallbackFn)
    {
        var url = this.urlMapping[assetPath];
        if (url)
        {
            return url;
        }
        else
        {
            if (missingCallbackFn)
            {
                missingCallbackFn(assetPath);
            }
            return (this.assetPrefix + assetPath);
        }
    },

    map: function mappingTableMap(logicalPath, physicalPath)
    {
        this.urlMapping[logicalPath] = physicalPath;
    },

    alias: function mappingTableAlias(alias, logicalPath)
    {
        var urlMapping = this.urlMapping;
        urlMapping[alias] = urlMapping[logicalPath];
    }
};

MappingTable.create = function MappingTableCreateFn(params)
{
    var mappingTable = new MappingTable();

    mappingTable.mappingTableURL = params.mappingTableURL;
    mappingTable.mappingTablePrefix = params.mappingTablePrefix;
    mappingTable.assetPrefix = params.assetPrefix;

    mappingTable.errorCallbackFn = params.errorCallback || TurbulenzServices.defaultErrorCallback;
    if (!mappingTable.mappingTableURL)
    {
        mappingTable.errorCallbackFn("TurbulenzServices.createMappingTable no mapping table file given");
    }

    function createMappingTableCallbackFn(urlMappingData)
    {
        var urlMapping = urlMappingData.urnmapping || urlMappingData.urnremapping || {};
        mappingTable.urlMapping = urlMapping;

        // Prepend all the mapped physical paths with the asset server
        var mappingTablePrefix = mappingTable.mappingTablePrefix;
        if (mappingTablePrefix)
        {
            var source;
            for (source in urlMapping)
            {
                if (urlMapping.hasOwnProperty(source))
                {
                    urlMapping[source] = mappingTablePrefix + urlMapping[source];
                }
            }
        }

        params.onload(mappingTable);
    }

    params.requestHandler.request({
            src: mappingTable.mappingTableURL,
            onload: function jsonifyResponse(jsonResponse, status) {
                var obj = JSON.parse(jsonResponse);
                if (status === 200)
                {
                    createMappingTableCallbackFn(obj);
                }
                else
                {
                    mappingTable.errorCallbackFn("TurbulenzServices.createMappingTable error with HTTP status " + status + ": " + jsonResponse.msg, status);
                }
            }
        });

    return mappingTable;
};

// Copyright (c) 2012 Turbulenz Limited

/*global
Global: false
Draw2D: false
Float32Array: false
TurbulenzEngine: false
*/

//
// Draw2DGroup. Wraps vertex buffer data with pairings of indices and textures
// representing subsets of buffer relating to a set of equal-texture quads.
//
// [ sprite1  sprite2  sprite3  sprite4  sprite5 ]
//  \---------------/  \------/ \--------------/
//       texture 1    texture 2     texture 3
//      12 indices    6 indices     12 indices
//
function Draw2DGroup() {}
Draw2DGroup.create = function draw2DGroupFn()
{
    var group = new Draw2DGroup();

    // pairs of index counts + associated texture for subset of group.
    group.indices = [];
    group.textures = [];
    group.numSets = 0;

    // vertex buffer for group.
    group.vertexBufferData = new Draw2D.prototype.floatArray(1024);
    group.numVertices = 0;

    return group;
};

function Draw2DSprite() {}
Draw2DSprite.prototype = {

    version : 1,

    //
    // Assumption is that user will not be performing these actions frequently.
    // To that end, we provide a function which performs the ssary side effects
    // on call, to prevent an overhead for lazy evaluation.
    //
    getTextureRectangle : function getTextureRectangleFn(dst)
    {
        if (dst === undefined)
        {
            dst = new Draw2D.prototype.floatArray(4);
        }
        var data = this.data;
        var texture = this._texture;
        if (texture)
        {
            dst[0] = data[12] * texture.width;
            dst[1] = data[13] * texture.height;
            dst[2] = data[14] * texture.width;
            dst[3] = data[15] * texture.height;
        }
        else
        {
            dst[0] = data[12];
            dst[1] = data[13];
            dst[2] = data[14];
            dst[3] = data[15];
        }
        return dst;
    },
    setTextureRectangle : function setTextureRectangleFn(uvRect)
    {
        var data = this.data;
        var texture = this._texture;
        if (texture)
        {
            var iwidth  = 1 / texture.width;
            var iheight = 1 / texture.height;
            data[12] = uvRect[0] * iwidth;
            data[13] = uvRect[1] * iheight;
            data[14] = uvRect[2] * iwidth;
            data[15] = uvRect[3] * iheight;
        }
        else
        {
            data[12] = uvRect[0];
            data[13] = uvRect[1];
            data[14] = uvRect[2];
            data[15] = uvRect[3];
        }
    },

    getColor : function getColorFn(dst)
    {
        if (dst === undefined)
        {
            dst = new Draw2D.prototype.floatArray(4);
        }
        var data = this.data;
        dst[0] = data[8];
        dst[1] = data[9];
        dst[2] = data[10];
        dst[3] = data[11];
        return dst;
    },
    setColor : function setColorFn(color)
    {
        var data = this.data;
        data[8]  = color[0];
        data[9]  = color[1];
        data[10] = color[2];
        data[11] = color[3];
    },

    getTexture : function getTextureFn()
    {
        return this._texture;
    },
    setTexture : function setTextureFn(texture)
    {
        if (this._texture !== texture)
        {
            var su = (this._texture ? this._texture.width  : 1.0) / (texture ? texture.width  : 1.0);
            var sv = (this._texture ? this._texture.height : 1.0) / (texture ? texture.height : 1.0);
            this._texture = texture || null;

            // re-normalise texture coordinates.
            var data = this.data;
            data[12] *= su;
            data[13] *= sv;
            data[14] *= su;
            data[15] *= sv;
        }
    },

    getWidth : function getWidthFn()
    {
        return this.data[17] * 2;
    },
    setWidth : function setWidthFn(width)
    {
        width *= 0.5;
        var data = this.data;
        if (data[17] !== width)
        {
            data[17] = width;
            this._invalidate();
        }
    },

    getHeight : function getHeightFn()
    {
        return this.data[18] * 2;
    },
    setHeight : function setHeightFn(height)
    {
        height *= 0.5;
        var data = this.data;
        if (data[18] !== height)
        {
            data[18] = height;
            this._invalidate();
        }
    },

    getScale : function getScaleFn(dst)
    {
        if (dst === undefined)
        {
            dst = new Draw2D.prototype.floatArray(2);
        }
        var data = this.data;
        dst[0] = data[19];
        dst[1] = data[20];
        return dst;
    },
    setScale : function setScaleFn(scale)
    {
        var scaleX = scale[0];
        var scaleY = scale[1];
        var data = this.data;
        if (data[19] !== scaleX || data[20] !== scaleY)
        {
            data[19] = scaleX;
            data[20] = scaleY;
            this._invalidate();
        }
    },

    getShear : function getShearFn(dst)
    {
        if (dst === undefined)
        {
            dst = new Draw2D.prototype.floatArray(2);
        }
        var data = this.data;
        dst[0] = data[21];
        dst[1] = data[22];
        return dst;
    },
    setShear : function setShearFn(shear)
    {
        var shearX = shear[0];
        var shearY = shear[1];
        var data = this.data;
        if (data[21] !== shearX || data[22] !== shearY)
        {
            data[21] = shearX;
            data[22] = shearY;
            this._invalidate();
        }
    },

    getOrigin : function getOriginFn(dst)
    {
        if (dst === undefined)
        {
            dst = new Draw2D.prototype.floatArray(2);
        }
        var data = this.data;
        dst[0] = data[23];
        dst[1] = data[24];
        return dst;
    },
    setOrigin : function setOriginFn(origin)
    {
        var originX = origin[0];
        var originY = origin[1];
        var data = this.data;
        if (data[23] !== originX || data[24] !== originY)
        {
            data[23] = originX;
            data[24] = originY;
            this._invalidate();
        }
    },

    // Method for internal use only.
    //
    // Recompute locally defined vectors.
    _invalidate : function invalidateFn()
    {
        var data = this.data;
        // [ T1 T2 ] = [ scaleX 0 ] [ 1 shearX ]
        // [ T3 T4 ]   [ 0 scaleY ] [ shearY 1 ]
        var T1 = data[19];
        var T2 = data[19] * data[21];
        var T3 = data[20] * data[22];
        var T4 = data[20];

        // Recompute locally defined position of true center of sprite.
        var x = data[17] - data[23];  // x = width/2 - originX
        var y = data[18] - data[24];  // y = height/2 - originY
        var cx = data[25] = (T1 * x + T2 * y); // (cx) = T (x)
        var cy = data[26] = (T3 * x + T4 * y); // (cy)     (y)

        // Recompute locally defined position of top-left vertex relative to center of sprite.
        x = -data[17]; // x = -width/2
        y = -data[18]; // y = -height/2
        var ux = data[27] = (T1 * x + T2 * y); // (ux) = T (x)
        var uy = data[28] = (T3 * x + T4 * y); // (uy)     (y)

        // Recompute locally defined position of top-right vertex relative to center of sprite.
        x = -x; // x = width / 2
        var vx = data[29] = (T1 * x + T2 * y); // (vx) = T (x)
        var vy = data[30] = (T3 * x + T4 * y); // (vy)     (y)

        // Rotate vectors to screen space so that in the case that rotation is not performed
        // These vectors are still valid.
        var rotation = data[16] = this.rotation;
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);

        data[31] = ((cos * cx) - (sin * cy));
        data[32] = ((sin * cx) + (cos * cy));
        data[33] = ((cos * ux) - (sin * uy));
        data[34] = ((sin * ux) + (cos * uy));
        data[35] = ((cos * vx) - (sin * vy));
        data[36] = ((sin * vx) + (cos * vy));

        // Compute suitable epsilon to consider rotations equals.
        // We do this by finding the vertex furthest from defined center of rotation.
        // And using its distance to compute what rotation constitutes a 'visible' rotation.
        //
        // Positions of vertices relative to origin are given by:
        // v1 = c + u, v2 = c + v, v3 = c - v, v4 = c - u.
        // |v1|^2 = |c|^2 + |u|^2 + 2c.u
        // |v4|^2 = |c|^2 + |u|^2 - 2c.u
        // |v2|^2 = |c|^2 + |v|^2 + 2c.v
        // |v3|^2 = |c|^2 + |v|^2 - 2c.v
        //
        // Compute r1 = |u|^2 + abs(2c.u)
        // Compute r2 = |v|^2 + abs(2c.v)
        //
        // Finally max(|vi|^2) = |c|^2 + max(r1, r2)
        //
        var dot = 2 * ((cx * ux) + (cy * uy));
        if (dot < 0)
        {
            dot = -dot;
        }
        var r1 = (ux * ux) + (uy * uy) + dot;

        dot = 2 * ((cx * vx) + (cy * vy));
        if (dot < 0)
        {
            dot = -dot;
        }
        var r2 = (vx * vx) + (vy * vy) + dot;

        if (r2 > r1)
        {
            r1 = r2;
        }

        r1 += ((cx * cx) + (cy * cy));
        // r1 is the squared distance to furthest vertex.
        //
        // We permit a half pixel movement to be considered a 'true' movement.
        // Squared rotation required to impart this movement on furthest vertex is
        data[37] = (0.25 / r1); // squared epsilon
    },

    // Method for internal use only.
    //
    // Recompute draw2d coordinate space vertices and vectors.
    _update : function _updateFn(angleScaleFactor)
    {
        var data = this.data;
        var x, y, u, v;

        // Check if rotation has been modified
        x = this.rotation;
        y = x - data[16]; // y = rotation - previousRotation
        if ((y * y) > (data[37] * angleScaleFactor)) // if |y| > epsilon
        {
            data[16] = x; //previousRotation = rotation
            u = Math.cos(x);
            v = Math.sin(x);

            // rotate locally defined vectors.
            x = data[25];
            y = data[26];
            data[31] = (u * x - v * y); // (px) = [cos -sin] (cx)
            data[32] = (v * x + u * y); // (py) = [sin  cos] (cy)

            x = data[27];
            y = data[28];
            data[33] = (u * x - v * y); // (x1) = [cos -sin] (ux)
            data[34] = (v * x + u * y); // (y1) = [sin  cos] (uy)

            x = data[29];
            y = data[30];
            data[35] = (u * x - v * y); // (x2) = [cos -sin] (vx)
            data[36] = (v * x + u * y); // (y2) = [sin  cos] (vy)
        }

        // Compute center of this sprite in screen space.
        u = this.x + data[31]; // u = centerX = positionX + px
        v = this.y + data[32]; // v = centerY = positionY + py

        // Compute vertex positions in screen space.
        x = data[33];
        y = data[34];
        data[0] = u + x; // v1x = centerX + x1
        data[1] = v + y; // v1y = centerY + y1
        data[6] = u - x; // v4x = centerX - x1
        data[7] = v - y; // v4y = centerY - y1

        x = data[35];
        y = data[36];
        data[2] = u + x; // v2x = centerX + x2
        data[3] = v + y; // v2y = centerY + y2
        data[4] = u - x; // v3x = centerX - x2
        data[5] = v - y; // v3y = centerY - y2
    }
};

Draw2DSprite.create = function draw2DSpriteCreateFn(params)
{
    if ((params.width === undefined || params.height === undefined) && !params.texture)
    {
        return null;
    }

    // data:
    // ---
    // First 16 values reserved for Draw2DSpriteData.
    //   includes colour and texture coordinates.
    //
    // 16    : old_rotation (for lazy evaluation)
    // 17,18 : width/2, height/2 (changed by user via function)
    // 19,20 : scaleX, scaleY    (changed by user via function)
    // 21,22 : shearX, shearY    (changed by user via function)
    // 23,24 : originX, originY  (changed by user via function)
    // 25,26 : cx, cy // locally defined position of true center of sprite relative to origin
    //    (dependant on scale/shear/center/dimension)
    // 27,28 : u1, v1 // locally defined position of top-left vertex relative to center of sprite.
    //    (dependant on scale/shear/dimension)
    // 29,30 : u2, v2 // locally defined position of top-right vertex relative to center of sprite.
    //    (dependant on scale/shear/dimension)
    // 31,32 : px, py // relative defined position of true center of sprite relative to origin
    //    (dependant on rotation and cx,cy)
    // 33,34 : x1, y1 // relative defined position of top-left vertex relative to center of sprite.
    //    (dependant on rotation and u1,v1)
    // 35,36 : x2, y2 // relative defined position of top-right vertex relative to center of sprite.
    //    (dependant on rotation and u2,v2)
    // 37 : Squared epsilon to consider rotations equal based on dimensions.
    var s = new Draw2DSprite();
    var data = s.data = new Draw2D.prototype.floatArray(38);

    // texture (not optional)
    var texture = s._texture = params.texture || null;

    // position (optional, default 0,0)
    s.x = (params.x || 0.0);
    s.y = (params.y || 0.0);

    // rotation (optional, default 0)
    s.rotation = data[16] = (params.rotation || 0.0);

    // colour (optional, default [1,1,1,1])
    var color = params.color;
    data[8]  = (color ? color[0] : 1.0);
    data[9]  = (color ? color[1] : 1.0);
    data[10] = (color ? color[2] : 1.0);
    data[11] = (color ? color[3] : 1.0);

    // uvRect (optional, default texture rectangle)
    var uvRect = params.textureRectangle;
    var iwidth  = (texture ? 1 / texture.width  : 1);
    var iheight = (texture ? 1 / texture.height : 1);
    data[12] = (uvRect ? (uvRect[0] * iwidth)  : 0.0);
    data[13] = (uvRect ? (uvRect[1] * iheight) : 0.0);
    data[14] = (uvRect ? (uvRect[2] * iwidth)  : 1.0);
    data[15] = (uvRect ? (uvRect[3] * iheight) : 1.0);

    // dimensions / 2 (default texture dimensions)
    data[17] = ((params.width  !== undefined) ? params.width  : texture.width)  * 0.5;
    data[18] = ((params.height !== undefined) ? params.height : texture.height) * 0.5;

    // scale (default [1,1])
    var scale = params.scale;
    data[19] = (scale ? scale[0] : 1.0);
    data[20] = (scale ? scale[1] : 1.0);

    // shear (default [0,0])
    var shear = params.shear;
    data[21] = (shear ? shear[0] : 0.0);
    data[22] = (shear ? shear[1] : 0.0);

    // origin (default dimensions / 2)
    var origin = params.origin;
    data[23] = (origin ? origin[0] : data[17]);
    data[24] = (origin ? origin[1] : data[18]);

    s._invalidate();
    return s;
};

//
// Used in rectangle draw routines to compute data to be pushed into vertex buffers.
//
function Draw2DSpriteData() {}
Draw2DSpriteData.setFromRotatedRectangle = function setFromRotatedRectangleFn(sprite, texture, rect, uvrect, color, rotation, origin)
{
    var x1 = rect[0];
    var y1 = rect[1];
    var x2 = rect[2];
    var y2 = rect[3];

    if (!rotation)
    {
        sprite[0] = x1;
        sprite[1] = y1;
        sprite[2] = x2;
        sprite[3] = y1;
        sprite[4] = x1;
        sprite[5] = y2;
        sprite[6] = x2;
        sprite[7] = y2;
    }
    else
    {
        var cx, cy;
        if (origin)
        {
            cx = x1 + origin[0];
            cy = y1 + origin[1];
        }
        else
        {
            cx = 0.5 * (x1 + x2);
            cy = 0.5 * (y1 + y2);
        }

        var dx = x1 - cx;
        var dy = y1 - cy;

        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);
        var w = (x2 - x1);
        var h = (y2 - y1);

        sprite[0] = x1 = cx + (cos * dx - sin * dy);
        sprite[1] = y1 = cy + (sin * dx + cos * dy);
        sprite[2] = x1 + (cos * w);
        sprite[3] = y1 + (sin * w);
        sprite[4] = x1 - (sin * h);
        sprite[5] = y1 + (cos * h);
        sprite[6] = x1 + (cos * w - sin * h);
        sprite[7] = y1 + (sin * w + cos * h);
    }

    if (color)
    {
        sprite[8]  = color[0];
        sprite[9]  = color[1];
        sprite[10] = color[2];
        sprite[11] = color[3];
    }
    else
    {
        sprite[8] = sprite[9] = sprite[10] = sprite[11] = 1.0;
    }

    if (uvrect && texture)
    {
        var iwidth  = 1 / texture.width;
        var iheight = 1 / texture.height;
        sprite[12] = uvrect[0] * iwidth;
        sprite[13] = uvrect[1] * iheight;
        sprite[14] = uvrect[2] * iwidth;
        sprite[15] = uvrect[3] * iheight;
    }
    else
    {
        sprite[12] = sprite[13] = 0;
        sprite[14] = sprite[15] = 1;
    }
};

Draw2DSpriteData.create = function draw2DSpriteFn()
{
    // x1 y1 x2 y2 x3 y3 x4 y4 - vertices [0,8)
    // cr cg cb ca u1 v1 u2 v2 - normalized color + texture [8,16)
    return new Draw2D.prototype.floatArray(16);
};

function Draw2D() {}

Draw2D.prototype = {

    version : 7,

    forceUpdate : false,
    clearBackBuffer : false,

    // supported sort modes.
    sort : {
        deferred  : 'deferred',
        immediate : 'immediate',
        texture   : 'texture'
    },

    // supported scale modes.
    scale : {
        scale : 'scale',
        none  : 'none'
    },

    drawStates: {
        uninit: 0,
        ready : 1,
        draw  : 2
    },

    defaultClearColor: [0, 0, 0, 1],

    clear: function clearFn(clearColor)
    {
        if (this.state !== this.drawStates.ready)
        {
            return false;
        }

        var gd = this.graphicsDevice;
        if (this.currentRenderTarget)
        {
            if (!gd.beginRenderTarget(this.currentRenderTarget.renderTarget))
            {
                return false;
            }

            gd.clear(clearColor || this.defaultClearColor);
            gd.endRenderTarget();
        }
        else
        {
            gd.clear(clearColor || this.defaultClearColor);
        }

        return true;
    },

    clearBatch: function clearFn()
    {
        for (var name in this.texLists)
        {
            if (this.texLists.hasOwnProperty(name))
            {
                delete this.texLists[name];
            }
        }
        this.currentTextureGroup = undefined;
        this.numGroups = 0;
    },

    bufferSprite : function bufferSpriteFn(buffer, sprite, index)
    {
        sprite._update(0);
        /*jshint bitwise: false*/
        index <<= 4;
        /*jshint bitwise: true*/

        var data = sprite.data;
        buffer[index]      = data[0];
        buffer[index + 1]  = data[1];
        buffer[index + 2]  = data[2];
        buffer[index + 3]  = data[3];
        buffer[index + 4]  = data[4];
        buffer[index + 5]  = data[5];
        buffer[index + 6]  = data[6];
        buffer[index + 7]  = data[7];
        buffer[index + 8]  = data[8];
        buffer[index + 9]  = data[9];
        buffer[index + 10] = data[10];
        buffer[index + 11] = data[11];
        buffer[index + 12] = data[12];
        buffer[index + 13] = data[13];
        buffer[index + 14] = data[14];
        buffer[index + 15] = data[15];
    },

    update: function updateFn()
    {
        var graphicsDevice = this.graphicsDevice;
        var width = this.width;
        var height = this.height;

        var graphicsDeviceWidth = graphicsDevice.width;
        var graphicsDeviceHeight = graphicsDevice.height;

        if (width !== graphicsDeviceWidth || height !== graphicsDeviceHeight || this.forceUpdate)
        {
            var viewWidth, viewHeight, viewX, viewY;
            var viewportRectangle = this.viewportRectangle;

            if (viewportRectangle)
            {
                viewX = viewportRectangle[0];
                viewY = viewportRectangle[1];
                viewWidth  = viewportRectangle[2] - viewX;
                viewHeight = viewportRectangle[3] - viewY;
            }
            else
            {
                viewX = 0;
                viewY = 0;
                viewWidth = graphicsDeviceWidth;
                viewHeight = graphicsDeviceHeight;
            }

            if ((viewWidth === graphicsDeviceWidth) && (viewHeight === graphicsDeviceHeight))
            {
                this.clearBackBuffer = false;
            }
            else
            {
                this.clearBackBuffer = true;
            }

            var target = this.currentRenderTarget;

            if (this.scaleMode === 'scale')
            {
                var viewAspectRatio = viewWidth / viewHeight;
                var graphicsDeviceAspectRatio = graphicsDeviceWidth / graphicsDeviceHeight;
                var calcViewWidth, calcViewHeight, diffWidth, diffHeight, halfDiffWidth, halfDiffHeight;

                if (graphicsDeviceAspectRatio > viewAspectRatio)
                {
                    calcViewWidth = Math.ceil((graphicsDeviceHeight / viewHeight) * viewWidth);
                    diffWidth = graphicsDeviceWidth - calcViewWidth;
                    halfDiffWidth = Math.floor(diffWidth * 0.5);

                    this.scissorX = halfDiffWidth;
                    this.scissorY = 0;
                    this.scissorWidth = calcViewWidth;
                    this.scissorHeight = graphicsDeviceHeight;

                    this.viewScaleX = viewWidth / calcViewWidth;
                    this.viewScaleY = viewHeight / graphicsDeviceHeight;

                    if (!target)
                    {
                        this.clipOffsetX = (halfDiffWidth / graphicsDeviceWidth * 2.0) - 1.0;
                        this.clipOffsetY = 1;
                        this.clipScaleX = (calcViewWidth / graphicsDeviceWidth * 2.0) / viewWidth;
                        this.clipScaleY = -2.0 / viewHeight;
                    }
                }
                else
                {
                    calcViewHeight = Math.ceil((graphicsDeviceWidth / viewWidth) * viewHeight);
                    diffHeight = graphicsDeviceHeight - calcViewHeight;
                    halfDiffHeight = Math.floor(diffHeight * 0.5);

                    this.scissorX = 0;
                    this.scissorY = halfDiffHeight;
                    this.scissorWidth = graphicsDeviceWidth;
                    this.scissorHeight = calcViewHeight;

                    this.viewScaleX = viewWidth / graphicsDeviceWidth;
                    this.viewScaleY = viewHeight / calcViewHeight;

                    if (!target)
                    {
                        this.clipOffsetX = -1.0;
                        this.clipOffsetY = 1 - ((halfDiffHeight / graphicsDeviceHeight) * 2.0);
                        this.clipScaleX = 2.0 / viewWidth;
                        this.clipScaleY = ((calcViewHeight / graphicsDeviceHeight) * -2.0) / viewHeight;
                    }
                }
            }
            else
            {
                this.viewScaleX = 1;
                this.viewScaleY = 1;

                if (!target)
                {
                    this.clipOffsetX = -1.0;
                    this.clipOffsetY = 1.0;
                    this.clipScaleX = 2.0 / graphicsDeviceWidth;
                    this.clipScaleY = -2.0 / graphicsDeviceHeight;
                }

                this.scissorX = 0;
                this.scissorY = (graphicsDeviceHeight - viewHeight);
                this.scissorWidth = viewWidth;
                this.scissorHeight = viewHeight;
            }

            this.spriteAngleFactor = Math.min(this.viewScaleX, this.viewScaleY);
            this.spriteAngleFactor *= this.spriteAngleFactor;

            this.width = graphicsDeviceWidth;
            this.height = graphicsDeviceHeight;

            var i = 0;
            var renderTargets = this.renderTargetStructs;
            var limit = renderTargets.length;
            for (i = 0; i < limit; i += 1)
            {
                this.validateTarget(renderTargets[i], this.scissorWidth, this.scissorHeight);
            }

            if (target)
            {
                this.clipOffsetX = -1.0;
                this.clipOffsetY = -1.0;
                this.clipScaleX = 2.0 * target.actualWidth / target.texture.width / viewWidth;
                this.clipScaleY = 2.0 * target.actualHeight / target.texture.height / viewHeight;
            }

            // Deal with viewports that are not started at (0,0)
            this.clipOffsetX -= viewX * this.clipScaleX;
            this.clipOffsetY -= viewY * this.clipScaleY;

            var clipSpace = this.techniqueParameters.clipSpace;
            clipSpace[0] = this.clipScaleX;
            clipSpace[1] = this.clipScaleY;
            clipSpace[2] = this.clipOffsetX;
            clipSpace[3] = this.clipOffsetY;

            this.updateRenderTargetVbo(this.scissorX, this.scissorY, this.scissorWidth, this.scissorHeight);
            this.forceUpdate = false;
        }
    },

    getViewport: function getViewportFn(dst)
    {
        if (!dst)
        {
            dst = new Draw2D.prototype.floatArray(4);
        }
        var viewport = this.viewportRectangle;
        if (viewport)
        {
            dst[0] = viewport[0];
            dst[1] = viewport[1];
            dst[2] = viewport[2];
            dst[3] = viewport[3];
        }
        else
        {
            dst[0] = dst[1] = 0;
            dst[2] = this.graphicsDevice.width;
            dst[3] = this.graphicsDevice.height;
        }
        return dst;
    },
    getScreenSpaceViewport: function screenSpaceViewportFn(dst)
    {
        if (!dst)
        {
            dst = new Draw2D.prototype.floatArray(4);
        }
        // ensure mapping is correct.
        this.update();

        dst[0] = this.scissorX;
        dst[1] = this.height - (this.scissorY + this.scissorHeight);
        dst[2] = dst[0] + this.scissorWidth;
        dst[3] = dst[1] + this.scissorHeight;
        return dst;
    },

    viewportMap: function viewportMapFn(screenX, screenY, dst)
    {
        if (!dst)
        {
            dst = new Draw2D.prototype.floatArray(2);
        }
        // ensure mapping is correct.
        this.update();

        // webgl coordinates have flipped y.
        var scissorY = (this.height - this.scissorHeight - this.scissorY);

        dst[0] = (screenX - this.scissorX) * this.viewScaleX;
        dst[1] = (screenY - scissorY) * this.viewScaleY;

        var viewport = this.viewportRectangle;
        if (viewport)
        {
            dst[0] += viewport[0];
            dst[1] += viewport[1];
        }

        return dst;
    },
    viewportUnmap: function screenMapFn(x, y, dst)
    {
        if (!dst)
        {
            dst = new Draw2D.prototype.floatArray(2);
        }
        // ensure mapping is correct.
        this.update();

        var viewport = this.viewportRectangle;
        if (viewport)
        {
            x -= viewport[0];
            y -= viewport[1];
        }

        // webgl coordinates have flipped y.
        var scissorY = (this.height - this.scissorHeight - this.scissorY);

        dst[0] = (x / this.viewScaleX) + this.scissorX;
        dst[1] = (y / this.viewScaleY) + scissorY;
        return dst;
    },

    viewportClamp: function viewportClampFn(point)
    {
        if (point)
        {
            var x = point[0];
            var y = point[1];

            var minX, minY, maxX, maxY;
            var viewport = this.viewportRectangle;
            if (viewport)
            {
                minX = viewport[0];
                minY = viewport[1];
                maxX = viewport[2];
                maxY = viewport[3];
            }
            else
            {
                minX = 0;
                minY = 0;
                maxX = this.graphicsDevice.width;
                maxY = this.graphicsDevice.height;
            }

            if (x < minX)
            {
                x = minX;
            }
            else if (x > maxX)
            {
                x = maxX;
            }

            if (y < minY)
            {
                y = minY;
            }
            else if (y > maxY)
            {
                y = maxY;
            }

            point[0] = x;
            point[1] = y;
        }

        return point;
    },

    configure: function configureFn(params)
    {
        if (this.state !== this.drawStates.ready)
        {
            return false;
        }

        var viewportRectangle = ("viewportRectangle" in params) ? params.viewportRectangle : this.viewportRectangle;

        var scaleMode = params.scaleMode;
        if (scaleMode !== undefined)
        {
            // check scaleMode is supported.
            if (!(scaleMode in this.scale))
            {
                return false;
            }
            if (scaleMode === 'scale' && !viewportRectangle)
            {
                return false;
            }
            this.scaleMode = scaleMode;
        }

        this.viewportRectangle = viewportRectangle;

        this.forceUpdate = true;
        this.update();

        return true;
    },

    destroy: function destroyFn()
    {
        this.texLists = null;
        this.state = this.drawStates.uninit;

        delete this.graphicsDevice;

        if (this.vertexBuffer)
        {
            this.vertexBuffer.destroy();
        }
        if (this.indexBuffer)
        {
            this.indexBuffer.destroy();
        }

        this.copyVertexBuffer.destroy();

        var renderTargets = this.renderTargetStructs;
        while (renderTargets.length > 0)
        {
            var target = renderTargets.pop();
            target.texture.destroy();
            target.renderTarget.destroy();
            delete target.texture;
            delete target.renderTarget;
        }
    },

    begin: function beginFn(blendMode, sortMode)
    {
        // Check sort mode is well defined (or undefined signifying default)
        if (sortMode && !(sortMode in this.sort))
        {
            return false;
        }

        // Check blend mode is well defined (or undefined signifying default)
        if (blendMode && !(blendMode in this.blend))
        {
            return false;
        }

        //if there are render states left in the stack
        //and begin has been called without an end
        //draw previous data with current render state
        var firstTime = !this.sortMode;
        if (this.dispatch())
        {
            this.clearBatch();
        }

        if (firstTime)
        {
            if (this.state !== this.drawStates.ready)
            {
                return false;
            }

            // Check the buffers are correct before we render
            this.update();

            if (!this.currentRenderTarget)
            {
                this.graphicsDevice.setScissor(this.scissorX, this.scissorY, this.scissorWidth, this.scissorHeight);
            }
        }

        this.state = this.drawStates.draw;

        sortMode  = (sortMode)  ? sortMode  : (firstTime ? 'deferred' : this.sortMode);
        blendMode = (blendMode) ? blendMode : (firstTime ? 'opaque'   : this.blendMode);


        if (!firstTime)
        {
            this.sortModeStack.push(this.sortMode);
            this.blendModeStack.push(this.blendMode);
        }
        this.sortMode = sortMode;
        this.blendMode = blendMode;

        this.prepareSortMode(sortMode);
        this.graphicsDevice.setTechnique(this.blendModeTechniques[blendMode]);

        return true;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // append sprite data to group buffer.
    _bufferSprite : function bufferSpriteFn(group, sprite)
    {
        var vertexData = group.vertexBufferData;
        var vertexBuffer = this.vertexBuffer;

        var index = group.numVertices * vertexBuffer.stride;
        var total = index + (4 * vertexBuffer.stride);
        if (total >= vertexData.length)
        {
            // allocate new vertex buffer data array.
            var size = this.bufferSizeAlgorithm(total, this.cpuStride);
            var newData = new Draw2D.prototype.floatArray(size);

            // copy data from existing buffer.
            var i;
            for (i = 0; i < index; i += 1)
            {
                newData[i] = vertexData[i];
            }

            group.vertexBufferData = vertexData = newData;
        }

        var c1 = sprite[8];
        var c2 = sprite[9];
        var c3 = sprite[10];
        var c4 = sprite[11];
        var u1 = sprite[12];
        var v1 = sprite[13];
        var u2 = sprite[14];
        var v2 = sprite[15];

        vertexData[index]      = sprite[0];
        vertexData[index + 1]  = sprite[1];
        vertexData[index + 2]  = c1;
        vertexData[index + 3]  = c2;
        vertexData[index + 4]  = c3;
        vertexData[index + 5]  = c4;
        vertexData[index + 6]  = u1;
        vertexData[index + 7]  = v1;

        vertexData[index + 8]  = sprite[2];
        vertexData[index + 9]  = sprite[3];
        vertexData[index + 10] = c1;
        vertexData[index + 11] = c2;
        vertexData[index + 12] = c3;
        vertexData[index + 13] = c4;
        vertexData[index + 14] = u2;
        vertexData[index + 15] = v1;

        vertexData[index + 16] = sprite[4];
        vertexData[index + 17] = sprite[5];
        vertexData[index + 18] = c1;
        vertexData[index + 19] = c2;
        vertexData[index + 20] = c3;
        vertexData[index + 21] = c4;
        vertexData[index + 22] = u1;
        vertexData[index + 23] = v2;

        vertexData[index + 24] = sprite[6];
        vertexData[index + 25] = sprite[7];
        vertexData[index + 26] = c1;
        vertexData[index + 27] = c2;
        vertexData[index + 28] = c3;
        vertexData[index + 29] = c4;
        vertexData[index + 30] = u2;
        vertexData[index + 31] = v2;

        group.numVertices += 4;

        // increment number of indices in present subset.
        group.indices[group.numSets - 1] += 6;
    },

    bufferMultiSprite : function bufferMultiSprite(group, buffer, count, offset)
    {
        var vertexData = group.vertexBufferData;
        var vertexBuffer = this.vertexBuffer;

        var numSprites = (count === undefined) ? Math.floor(buffer.length / 16) : count;
        count = numSprites * 16;

        offset = (offset !== undefined ? offset : 0) * 16;

        var i;
        var index = (group.numVertices * vertexBuffer.stride);
        var total = index + (numSprites * 4 * vertexBuffer.stride);
        if (total >= vertexData.length)
        {
            // allocate new vertex buffer data array.
            var size = this.bufferSizeAlgorithm(total, this.cpuStride);
            var newData = new Draw2D.prototype.floatArray(size);

            // copy data from existing buffer.
            for (i = 0; i < index; i += 1)
            {
                newData[i] = vertexData[i];
            }

            group.vertexBufferData = vertexData = newData;
        }

        var limit = offset + count;
        for (i = offset; i < limit; i += 16)
        {
            var c1 = buffer[i + 8];
            var c2 = buffer[i + 9];
            var c3 = buffer[i + 10];
            var c4 = buffer[i + 11];
            var u1 = buffer[i + 12];
            var v1 = buffer[i + 13];
            var u2 = buffer[i + 14];
            var v2 = buffer[i + 15];

            vertexData[index]      = buffer[i];
            vertexData[index + 1]  = buffer[i + 1];
            vertexData[index + 2]  = c1;
            vertexData[index + 3]  = c2;
            vertexData[index + 4]  = c3;
            vertexData[index + 5]  = c4;
            vertexData[index + 6]  = u1;
            vertexData[index + 7]  = v1;

            vertexData[index + 8]  = buffer[i + 2];
            vertexData[index + 9]  = buffer[i + 3];
            vertexData[index + 10] = c1;
            vertexData[index + 11] = c2;
            vertexData[index + 12] = c3;
            vertexData[index + 13] = c4;
            vertexData[index + 14] = u2;
            vertexData[index + 15] = v1;

            vertexData[index + 16] = buffer[i + 4];
            vertexData[index + 17] = buffer[i + 5];
            vertexData[index + 18] = c1;
            vertexData[index + 19] = c2;
            vertexData[index + 20] = c3;
            vertexData[index + 21] = c4;
            vertexData[index + 22] = u1;
            vertexData[index + 23] = v2;

            vertexData[index + 24] = buffer[i + 6];
            vertexData[index + 25] = buffer[i + 7];
            vertexData[index + 26] = c1;
            vertexData[index + 27] = c2;
            vertexData[index + 28] = c3;
            vertexData[index + 29] = c4;
            vertexData[index + 30] = u2;
            vertexData[index + 31] = v2;

            index += 32;
        }

        group.numVertices += (numSprites * 4);
        // increment number of indices in present subset.
        group.indices[group.numSets - 1] += (numSprites * 6);
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    indexData : function indexDataFn(count)
    {
        var indexData = new Draw2D.prototype.uint16Array(count);
        var i;
        var vertexIndex = 0;
        for (i = 0; i < count; i += 6)
        {
            indexData[i]     = vertexIndex;
            indexData[i + 1] = vertexIndex + 1;
            indexData[i + 2] = vertexIndex + 2;
            indexData[i + 3] = vertexIndex + 1;
            indexData[i + 4] = vertexIndex + 2;
            indexData[i + 5] = vertexIndex + 3;
            vertexIndex += 4;
        }
        return indexData;
    },

    // upload group buffer to graphics device vertexBuffer.
    uploadBuffer : function uploadBufferFn(group, count, offset)
    {
        var vertexBuffer = this.vertexBuffer;
        var vertexBufferParameters = this.vertexBufferParameters;
        var graphicsDevice = this.graphicsDevice;
        var vertexData = group.vertexBufferData;

        var performanceData = this.performanceData;

        // Resize buffers.
        if (count > vertexBufferParameters.numVertices)
        {
            var newSize = this.bufferSizeAlgorithm(count, this.gpuStride);
            if (newSize > this.maxVertices)
            {
                newSize = this.maxVertices;
            }

            vertexBufferParameters.numVertices = newSize;
            this.vertexBuffer.destroy();
            this.vertexBuffer = vertexBuffer = graphicsDevice.createVertexBuffer(vertexBufferParameters);

            // 32 bytes per vertex.
            // 2 bytes per index, 1.5 indices per vertex.
            performanceData.gpuMemoryUsage = newSize * 35; // 32 + (1.5 * 2)

            newSize *= 1.5;

            // Set indices.
            var indexBufferParameters = this.indexBufferParameters;
            indexBufferParameters.data = this.indexData(newSize);
            indexBufferParameters.numIndices = newSize;
            this.indexBuffer.destroy();
            this.indexBuffer = graphicsDevice.createIndexBuffer(indexBufferParameters);
            graphicsDevice.setIndexBuffer(this.indexBuffer);
        }

        performanceData.dataTransfers += 1;

        // Upload data.
        if (offset === 0)
        {
            vertexBuffer.setData(vertexData, 0, count);
        }
        else
        {
            var stride = vertexBuffer.stride;
            vertexBuffer.setData(vertexData.subarray(offset * stride, (offset + count) * stride), 0, count);
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    drawRawImmediate : function drawRawImmediateFn(texture, multiSprite, count, offset)
    {
        var group = this.drawGroups[0];
        group.textures[0] = texture || this.defaultTexture;
        group.indices[0] = 0;
        group.numSets = 1;
        this.numGroups = 1;

        this.bufferMultiSprite(group, multiSprite, count, offset);

        // Draw render group immediately.
        this.dispatch();
    },

    drawSpriteImmediate : function drawSpriteImmediateFn(sprite)
    {
        var group = this.drawGroups[0];
        group.textures[0] = sprite._texture || this.defaultTexture;
        group.indices[0] = 0;
        group.numSets = 1;
        this.numGroups = 1;

        sprite._update(this.spriteAngleFactor);
        this._bufferSprite(group, sprite.data);

        // Draw render group immediately.
        this.dispatch();
    },

    drawImmediate : function drawImmediateFn(params)
    {
        var texture = params.texture || this.defaultTexture;
        var destRect = params.destinationRectangle;
        var srcRect = params.sourceRectangle;
        var color = params.color;
        var rotation = params.rotation;

        var group = this.drawGroups[0];
        group.textures[0] = texture;
        group.indices[0] = 0;
        group.numSets = 1;
        this.numGroups = 1;

        var drawSprite = this.drawSprite;
        Draw2DSpriteData.setFromRotatedRectangle(drawSprite, texture, destRect, srcRect, color, rotation, params.origin);
        this._bufferSprite(group, drawSprite);

        // Draw render group immediately.
        this.dispatch();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    drawRawDeferred : function drawRawDeferredFn(texture, multiSprite, count, offset)
    {
        texture = texture || this.defaultTexture;
        var group = this.drawGroups[0];
        this.numGroups = 1;
        // If present group draw list uses a different texture
        // We must start a new draw list.
        var numSets = group.numSets;
        if (numSets === 0 || group.textures[numSets - 1] !== texture)
        {
            group.textures[numSets] = texture;
            group.indices[numSets] = 0;
            group.numSets += 1;
        }

        this.bufferMultiSprite(group, multiSprite, count, offset);
    },

    drawSpriteDeferred : function drawSpriteDeferredFn(sprite)
    {
        var texture = sprite._texture || this.defaultTexture;

        var group = this.drawGroups[0];
        this.numGroups = 1;
        // If present group draw list uses a different texture
        // We must start a new draw list.
        var numSets = group.numSets;
        if (numSets === 0 || group.textures[numSets - 1] !== texture)
        {
            group.textures[numSets] = texture;
            group.indices[numSets] = 0;
            group.numSets += 1;
        }

        sprite._update(this.spriteAngleFactor);
        this._bufferSprite(group, sprite.data);
    },

    drawDeferred : function drawDeferredFn(params)
    {
        var texture = params.texture || this.defaultTexture;

        var group = this.drawGroups[0];
        this.numGroups = 1;
        // If present group draw list uses a different texture
        // We must start a new draw list.
        var numSets = group.numSets;
        if (numSets === 0 || group.textures[numSets - 1] !== texture)
        {
            group.textures[numSets] = texture;
            group.indices[numSets] = 0;
            group.numSets += 1;
        }

        var destRect = params.destinationRectangle;
        var srcRect = params.sourceRectangle;
        var color = params.color;
        var rotation = params.rotation;

        var drawSprite = this.drawSprite;
        Draw2DSpriteData.setFromRotatedRectangle(drawSprite, texture, destRect, srcRect, color, rotation, params.origin);

        this._bufferSprite(group, drawSprite);
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    drawRawTextured : function drawRawTexturedFn(texture, multiSprite, count, offset)
    {
        texture = texture || this.defaultTexture;
        var group;
        // If last call to drawTextured used the same texture, then we need not look up render group.
        if (this.currentTextureGroup !== undefined && this.currentTextureGroup.textures[0] === texture)
        {
            group = this.currentTextureGroup;
        }
        else
        {
            // Look up render group in texLists.
            var name = texture.name;
            var texLists = this.texLists;
            group = texLists[name];
            if (!group)
            {
                // Create new render group.
                group = this.drawGroups[this.numGroups];
                if (!group)
                {
                    group = Draw2DGroup.create();
                }
                this.drawGroups[this.numGroups] = texLists[name] = group;
                group.textures[0] = texture;
                group.indices[0] = 0;
                group.numSets = 1;
                this.numGroups += 1;
            }
            this.currentTextureGroup = group;
        }

        this.bufferMultiSprite(group, multiSprite, count, offset);
    },

    drawSpriteTextured : function drawSpriteTexturedFn(sprite)
    {
        var texture = sprite._texture || this.defaultTexture;

        var group;
        // If last call to drawTextured used the same texture, then we need not look up render group.
        if (this.currentTextureGroup !== undefined && this.currentTextureGroup.textures[0] === texture)
        {
            group = this.currentTextureGroup;
        }
        else
        {
            // Look up render group in texLists.
            var name = texture.name;
            var texLists = this.texLists;
            group = texLists[name];
            if (!group)
            {
                // Create new render group.
                group = this.drawGroups[this.numGroups];
                if (!group)
                {
                    group = Draw2DGroup.create();
                }
                this.drawGroups[this.numGroups] = texLists[name] = group;
                group.textures[0] = texture;
                group.indices[0] = 0;
                group.numSets = 1;
                this.numGroups += 1;
            }
            this.currentTextureGroup = group;
        }

        sprite._update(this.spriteAngleFactor);
        this._bufferSprite(group, sprite.data);
    },

    drawTextured : function drawTexturedFn(params)
    {
        var texture = params.texture || this.defaultTexture;

        var group;
        // If last call to drawTextured used the same texture, then we need not look up render group.
        if (this.currentTextureGroup !== undefined && this.currentTextureGroup.textures[0] === texture)
        {
            group = this.currentTextureGroup;
        }
        else
        {
            // Look up render group in texLists.
            var name = texture.name;
            var texLists = this.texLists;
            group = texLists[name];
            if (!group)
            {
                // Create new render group.
                group = this.drawGroups[this.numGroups];
                if (!group)
                {
                    group = Draw2DGroup.create();
                }
                this.drawGroups[this.numGroups] = texLists[name] = group;
                group.textures[0] = texture;
                group.indices[0] = 0;
                group.numSets = 1;
                this.numGroups += 1;
            }
            this.currentTextureGroup = group;
        }

        var destRect = params.destinationRectangle;
        var srcRect = params.sourceRectangle;
        var color = params.color;
        var rotation = params.rotation;

        var drawSprite = this.drawSprite;
        Draw2DSpriteData.setFromRotatedRectangle(drawSprite, texture, destRect, srcRect, color, rotation, params.origin);

        this._bufferSprite(group, drawSprite);
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    prepareSortMode : function refreshSortModeFn(sortMode)
    {
        if (sortMode === 'deferred')
        {
            this.draw = this.drawDeferred;
            this.drawSprite = this.drawSpriteDeferred;
            this.drawRaw = this.drawRawDeferred;
        }
        else if (sortMode === 'immediate')
        {
            this.draw = this.drawImmediate;
            this.drawSprite = this.drawSpriteImmediate;
            this.drawRaw = this.drawRawImmediate;
        }
        else
        {
            this.draw = this.drawTextured;
            this.drawSprite = this.drawSpriteTextured;
            this.drawRaw = this.drawRawTextured;
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////

    end: function endFn()
    {
        if (this.state !== this.drawStates.draw)
        {
            return false;
        }

        //dispatch objects to the graphics card
        if (this.dispatch())
        {
            this.clearBatch();
        }

        if (this.blendModeStack.length !== 0)
        {
            this.blendMode = this.blendModeStack.pop();
            this.sortMode = this.sortModeStack.pop();
            this.prepareSortMode(this.sortMode);
            this.graphicsDevice.setTechnique(this.blendModeTechniques[this.blendMode]);
        }
        else
        {
            this.blendMode = undefined;
            this.sortMode = undefined;
            this.state = this.drawStates.ready;
        }

        return true;
    },

    dispatch: function dispatchFn()
    {
        // Nothing to dispatch.
        var numGroups = this.numGroups;
        if (numGroups === 0)
        {
            return false;
        }

        var graphicsDevice = this.graphicsDevice;
        var techniqueParameters = this.techniqueParameters;
        graphicsDevice.setIndexBuffer(this.indexBuffer);

        var drawGroups = this.drawGroups;
        var renderTargetUsed = false;
        if (this.currentRenderTarget)
        {
            renderTargetUsed = graphicsDevice.beginRenderTarget(this.currentRenderTarget.renderTarget);
        }

        var performanceData = this.performanceData;

        var i;
        for (i = 0; i < numGroups; i += 1)
        {
            var group = drawGroups[i];

            var textures = group.textures;
            var indices = group.indices;
            var setIndex = 0;

            var vindex = 0;
            var vlimit = group.numVertices;
            while (vindex < vlimit)
            {
                // number of vertices remaining.
                var vcount = vlimit - vindex;
                if (vcount > this.maxVertices)
                {
                    vcount = this.maxVertices;
                }

                // Upload group vertex sub-buffer to graphics device.
                this.uploadBuffer(group, vcount, vindex);
                graphicsDevice.setStream(this.vertexBuffer, this.semantics);

                // sprite uses 4 vertices, and 6 indices
                // so for 'vcount' number of vertices, we have vcount * 1.5 indices
                var ilimit = vcount * 1.5;
                var iindex = 0;
                while (iindex < ilimit) {
                    techniqueParameters.texture = textures[setIndex];

                    // number of indices remaining to render.
                    var icount = ilimit - iindex;
                    if (icount >= indices[setIndex])
                    {
                        // finish rendering sub list.
                        icount = indices[setIndex];
                        setIndex += 1;
                    }
                    else
                    {
                        // sub list still has remaining indices to render.
                        indices[setIndex] -= icount;
                    }

                    var batchSize = icount / 6;
                    if (performanceData.batchCount === 0)
                    {
                        performanceData.minBatchSize = batchSize;
                        performanceData.maxBatchSize = batchSize;
                        performanceData.avgBatchSize = batchSize;
                        performanceData.batchCount = 1;
                    }
                    else
                    {
                        if (batchSize < performanceData.minBatchSize)
                        {
                            performanceData.minBatchSize = batchSize;
                        }
                        if (batchSize > performanceData.maxBatchSize)
                        {
                            performanceData.maxBatchSize = batchSize;
                        }
                        performanceData.avgBatchSize *= performanceData.batchCount;
                        performanceData.avgBatchSize += batchSize;
                        performanceData.batchCount += 1;
                        performanceData.avgBatchSize /= performanceData.batchCount;
                    }

                    graphicsDevice.setTechniqueParameters(techniqueParameters);
                    graphicsDevice.drawIndexed(graphicsDevice.PRIMITIVE_TRIANGLES, icount, iindex);

                    iindex += icount;
                }

                vindex += vcount;
            }

            group.numSets = 0;
            group.numVertices = 0;
        }

        if (this.currentRenderTarget && renderTargetUsed)
        {
            graphicsDevice.endRenderTarget();
        }

        return true;
    },

    bufferSizeAlgorithm : function bufferSizeAlgorithmFn(target, stride)
    {
        // scale factor of 2 is asymtopically optimal in terms of number of resizes
        // performed and copies performed, but we want to try and conserve memory
        // and so choose a less optimal 1.25 so that buffer will never be too much
        // larger than necessary.
        var factor = 1.25;

        // We size buffer to the next power of the factor which is >= target
        var logf = Math.ceil(Math.log(target) / Math.log(factor));
        var size = Math.floor(Math.pow(factor, logf));

        // Additionally ensure that we always take a multiple of of the stride
        // to avoid wasted bytes that could never be used.
        return (stride * Math.ceil(size / stride));
    },

    updateRenderTargetVbo : function updateRenderTargetVboFn(viewX, viewY, viewWidth, viewHeight)
    {
        var graphicsDevice = this.graphicsDevice;
        var halfGraphicsDeviceWidth = 0.5 * graphicsDevice.width;
        var halfGraphicsDeviceHeight = 0.5 * graphicsDevice.height;

        //
        // Update the VBO for the presentRenderTarget
        //
        var vertexBuffer = this.copyVertexBuffer;

        var left = (viewX - halfGraphicsDeviceWidth) / halfGraphicsDeviceWidth;
        var right = (viewX + viewWidth - halfGraphicsDeviceWidth) / halfGraphicsDeviceWidth;
        var topv = (viewY - halfGraphicsDeviceHeight) / halfGraphicsDeviceHeight;
        var bottom = (viewY + viewHeight - halfGraphicsDeviceHeight) / halfGraphicsDeviceHeight;

        var vertexData = this.vertexBufferData;
        vertexData[0] = left;
        vertexData[1] = bottom;
        vertexData[2] = 0.0;
        vertexData[3] = 1.0;

        vertexData[4] = left;
        vertexData[5] = topv;
        vertexData[6] = 0.0;
        vertexData[7] = 0.0;

        vertexData[8] = right;
        vertexData[9] = bottom;
        vertexData[10] = 1.0;
        vertexData[11] = 1.0;

        vertexData[12] = right;
        vertexData[13] = topv;
        vertexData[14] = 1.0;
        vertexData[15] = 0.0;

        vertexBuffer.setData(vertexData, 0, 4);
    },

    // always overallocate.
    makePow2 : function makePow2Fn(dim)
    {
        var index = Math.log(dim) / Math.log(2);
        return (1 << Math.ceil(index));
    },

    createRenderTarget : function createRenderTargetFn(params)
    {
        var gd = this.graphicsDevice;
        var renderTargets = this.renderTargetStructs;
        var index = renderTargets.length;

        var name = (params && params.name) ? params.name : ("RenderTarget#" + index);
        var backBuffer = (params && params.backBuffer !== undefined) ? params.backBuffer : true;
        var matchScreen = (params.width === undefined || params.height === undefined);

        var texParams = this.renderTargetTextureParameters;
        texParams.name = name;

        var width  = (matchScreen) ? gd.width  : params.width;
        var height = (matchScreen) ? gd.height : params.height;
        texParams.width  = this.makePow2(width);
        texParams.height = this.makePow2(height);

        var texture = gd.createTexture(texParams);
        var targetParams = this.renderTargetParams;
        targetParams.colorTexture0 = texture;
        var renderTarget = gd.createRenderTarget(targetParams);

        renderTargets.push({
            managed : matchScreen,
            renderTarget : renderTarget,
            texture : texture,
            backBuffer : backBuffer,
            actualWidth  : (backBuffer ? width  : texture.width),
            actualHeight : (backBuffer ? height : texture.height)
        });

        return index;
    },

    validateTarget : function validateTargetFn(target, viewWidth, viewHeight)
    {
        if (target.managed)
        {
            var tex = target.texture;
            if (target.backBuffer)
            {
                target.actualWidth = viewWidth;
                target.actualHeight = viewHeight;
            }
            viewWidth = this.makePow2(viewWidth);
            viewHeight = this.makePow2(viewHeight);
            if (!target.backBuffer)
            {
                target.actualWidth = viewWidth;
                target.actualHeight = viewHeight;
            }
            if (tex.width !== viewWidth || tex.height !== viewHeight)
            {
                var texParams = this.renderTargetTextureParameters;
                var targetParams = this.renderTargetParams;

                texParams.name = tex.name;
                texParams.width  = viewWidth;
                texParams.height = viewHeight;

                tex.destroy();
                target.renderTarget.destroy();

                var graphicsDevice = this.graphicsDevice;
                target.texture = graphicsDevice.createTexture(texParams);
                targetParams.colorTexture0 = target.texture;
                target.renderTarget = graphicsDevice.createRenderTarget(targetParams);
            }
        }
    },

    setBackBuffer : function setBackBufferFn()
    {
        if (this.state !== this.drawStates.ready)
        {
            return false;
        }

        this.currentRenderTarget = null;
        this.forceUpdate = true;

        return true;
    },

    getRenderTargetTexture : function getRenderTargetTextureFn(renderTargetIndex)
    {
        var renderTargets = this.renderTargetStructs;
        if (renderTargetIndex < 0 || renderTargetIndex >= renderTargets.length)
        {
            return null;
        }

        return renderTargets[renderTargetIndex].texture;
    },

    getRenderTarget : function getRenderTargetFn(renderTargetIndex)
    {
        var renderTargets = this.renderTargetStructs;
        if (renderTargetIndex < 0 || renderTargetIndex >= renderTargets.length)
        {
            return null;
        }

        return renderTargets[renderTargetIndex].renderTarget;
    },

    setRenderTarget : function setRenderTargetFn(renderTargetIndex)
    {
        var renderTargets = this.renderTargetStructs;
        if (renderTargetIndex < 0 || renderTargetIndex >= renderTargets.length)
        {
            return false;
        }

        if (this.state !== this.drawStates.ready)
        {
            return false;
        }

        this.currentRenderTarget = renderTargets[renderTargetIndex];
        this.forceUpdate = true;

        return true;
    },

    copyRenderTarget: function copyRenderTargetFn(renderTargetIndex)
    {
        if (this.state !== this.drawStates.ready)
        {
            return false;
        }

        var renderTargets = this.renderTargetStructs;
        if (renderTargetIndex < 0 || renderTargetIndex >= renderTargets.length)
        {
            return false;
        }

        // Check the buffers are correct before we render.
        this.update();

        if (!this.currentRenderTarget)
        {
            this.graphicsDevice.setScissor(this.scissorX, this.scissorY, this.scissorWidth, this.scissorHeight);
        }

        var graphicsDevice = this.graphicsDevice;
        var target = renderTargets[renderTargetIndex];
        var tex = target.texture;

        var technique = this.copyTechnique;
        var params = this.copyTechniqueParameters;
        var copyUVScale = params.copyUVScale;
        copyUVScale[0] = target.actualWidth / tex.width;
        copyUVScale[1] = target.actualHeight / tex.height;
        params.copyFlip = (!this.currentRenderTarget ? -1.0 : 1.0);
        params.inputTexture0 = tex;

        var renderTargetUsed = false;
        var currentTarget = this.currentRenderTarget;
        var vbo = this.copyVertexBuffer;
        if (currentTarget)
        {
            renderTargetUsed = graphicsDevice.beginRenderTarget(currentTarget.renderTarget);
        }

        graphicsDevice.setTechnique(technique);
        graphicsDevice.setTechniqueParameters(params);

        graphicsDevice.setStream(vbo, this.quadSemantics);
        graphicsDevice.draw(this.quadPrimitive, 4, 0);

        if (currentTarget && renderTargetUsed)
        {
            graphicsDevice.endRenderTarget();
        }

        return true;
    },

    resetPerformanceData : function resetPerformanceDataFn()
    {
        var data = this.performanceData;
        data.minBatchSize = data.maxBatchSize = data.avgBatchSize = undefined;
        data.batchCount = 0;
        data.dataTransfers = 0;
    }
};

// Constructor function
//
// params : {
//    graphicsDevice : gd,
//    blendModes : { // optional
//       name : Technique,
//       **repeated**
//    }
// }
Draw2D.create = function draw2DCreateFn(params)
{
    var o = new Draw2D();
    var gd = o.graphicsDevice = params.graphicsDevice;

    // Current sort and blend mode.
    o.sortMode  = undefined;
    o.blendMode = undefined;
    // Disjoint stack of modes for nested begins.
    o.sortModeStack  = [];
    o.blendModeStack = [];

    // Set of render groups to be dispatched.
    o.drawGroups = [Draw2DGroup.create()];
    o.numGroups = 0;

    // Set of render groups for texture sort mode.
    // dictionary on texture name.
    o.texLists = [];
    // Cached reference to last retrieved group to accelerate
    // texture sort mode draw calls.
    o.texGroup = undefined;

    // Sprite data instance used for rectangle draw calls.
    o.drawSprite = Draw2DSpriteData.create();

    // Solid fill texture for draw calls that do not specify a texture.
    o.defaultTexture = gd.createTexture({
        name : "DefaultDraw2DTexture",
        width : 1,
        height : 1,
        depth : 1,
        format : "L8",
        cubemap : false,
        mipmaps : true,
        renderable : false,
        dynamic : false,
        data : [0xff]
    });

    // Draw call methods.
    // These are set based on current sort mode.
    o.draw = undefined;
    o.drawSprite = undefined;
    o.drawRaw = undefined;

    // Load embedded default shader and techniques
    /*jshint white: false*/
    var shader = gd.createShader(
{
 "version": 1,
 "name": "draw2D.cgfx",
 "samplers":
 {
  "texture":
  {
   "MinFilter": 9985,
   "MagFilter": 9729,
   "WrapS": 33071,
   "WrapT": 33071
  },
  "inputTexture0":
  {
   "MinFilter": 9728,
   "MagFilter": 9729,
   "WrapS": 33071,
   "WrapT": 33071
  }
 },
 "parameters":
 {
  "clipSpace":
  {
   "type": "float",
   "columns": 4
  },
  "copyUVScale":
  {
   "type": "float",
   "columns": 2
  },
  "copyFlip":
  {
   "type": "float"
  },
  "texture":
  {
   "type": "sampler2D"
  },
  "inputTexture0":
  {
   "type": "sampler2D"
  }
 },
 "techniques":
 {
  "opaque":
  [
   {
    "parameters": ["clipSpace","texture"],
    "semantics": ["POSITION","COLOR","TEXCOORD0"],
    "states":
    {
     "DepthTestEnable": false,
     "DepthMask": false,
     "CullFaceEnable": false,
     "BlendEnable": false
    },
    "programs": ["vp_draw2D","fp_draw2D"]
   }
  ],
  "alpha":
  [
   {
    "parameters": ["clipSpace","texture"],
    "semantics": ["POSITION","COLOR","TEXCOORD0"],
    "states":
    {
     "DepthTestEnable": false,
     "DepthMask": false,
     "CullFaceEnable": false,
     "BlendEnable": true,
     "BlendFunc": [770,771]
    },
    "programs": ["vp_draw2D","fp_draw2D"]
   }
  ],
  "additive":
  [
   {
    "parameters": ["clipSpace","texture"],
    "semantics": ["POSITION","COLOR","TEXCOORD0"],
    "states":
    {
     "DepthTestEnable": false,
     "DepthMask": false,
     "CullFaceEnable": false,
     "BlendEnable": true,
     "BlendFunc": [770,1]
    },
    "programs": ["vp_draw2D","fp_draw2D"]
   }
  ],
  "copy":
  [
   {
    "parameters": ["copyUVScale","copyFlip","inputTexture0"],
    "semantics": ["POSITION","TEXCOORD0"],
    "states":
    {
     "DepthTestEnable": false,
     "DepthMask": false,
     "CullFaceEnable": false,
     "BlendEnable": false
    },
    "programs": ["vp_copy","fp_copy"]
   }
  ]
 },
 "programs":
 {
  "fp_copy":
  {
   "type": "fragment",
   "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision mediump float;\nprecision mediump int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[8];\nvec4 _ret_0;uniform sampler2D inputTexture0;void main()\n{_ret_0=texture2D(inputTexture0,tz_TexCoord[0].xy);gl_FragColor=_ret_0;}"
  },
  "vp_copy":
  {
   "type": "vertex",
   "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision mediump float;\nprecision mediump int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[8];attribute vec4 ATTR8;attribute vec4 ATTR0;\nvec4 _OutPosition1;vec2 _OutUV1;uniform vec2 copyUVScale;uniform float copyFlip;void main()\n{_OutPosition1.x=ATTR0.x;_OutPosition1.y=ATTR0.y*copyFlip;_OutPosition1.zw=ATTR0.zw;_OutUV1=ATTR8.xy*copyUVScale;tz_TexCoord[0].xy=_OutUV1;gl_Position=_OutPosition1;}"
  },
  "fp_draw2D":
  {
   "type": "fragment",
   "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision mediump float;\nprecision mediump int;\n#else\n#define TZ_LOWP\n#endif\nvarying TZ_LOWP vec4 tz_Color;varying vec4 tz_TexCoord[8];\nvec4 _ret_0;vec4 _TMP0;uniform sampler2D texture;void main()\n{_TMP0=texture2D(texture,tz_TexCoord[0].xy);_ret_0=tz_Color*_TMP0;gl_FragColor=_ret_0;}"
  },
  "vp_draw2D":
  {
   "type": "vertex",
   "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision mediump float;\nprecision mediump int;\n#else\n#define TZ_LOWP\n#endif\nvarying TZ_LOWP vec4 tz_Color;varying vec4 tz_TexCoord[8];attribute vec4 ATTR8;attribute vec4 ATTR3;attribute vec4 ATTR0;\nvec4 _OUTPosition1;vec4 _OUTColor1;vec2 _OUTTexCoord01;uniform vec4 clipSpace;void main()\n{vec2 _position;_position=ATTR0.xy*clipSpace.xy+clipSpace.zw;_OUTPosition1.x=_position.x;_OUTPosition1.y=_position.y;_OUTPosition1.z=0.0;_OUTPosition1.w=1.0;_OUTColor1=ATTR3;_OUTTexCoord01=ATTR8.xy;tz_TexCoord[0].xy=ATTR8.xy;tz_Color=ATTR3;gl_Position=_OUTPosition1;}"
  }
 }
}
    );
    /*jshint white: true*/

    // supported blend modes.
    o.blend = {
        additive : 'additive',
        alpha    : 'alpha',
        opaque   : 'opaque'
    },

    // Mapping from blend mode name to Technique object.
    o.blendModeTechniques = {};
    o.blendModeTechniques.additive = shader.getTechnique("additive");
    o.blendModeTechniques.alpha    = shader.getTechnique("alpha");
    o.blendModeTechniques.opaque   = shader.getTechnique("opaque");

    // Append techniques and supported blend modes with user supplied techniques.
    if (params.blendModes)
    {
        for (var name in params.blendModes)
        {
            if (params.blendModes.hasOwnProperty(name))
            {
                o.blend[name] = name;
                o.blendModeTechniques[name] = params.blendModes[name];
            }
        }
    }

    // Blending techniques.
    o.techniqueParameters = gd.createTechniqueParameters({
        clipSpace: new Draw2D.prototype.floatArray(4),
        texture: null
    });

    // Current render target
    o.currentRenderTarget = null;
    o.renderTargetStructs = [];

    o.state = o.drawStates.ready;

    o.scaleMode = 'none';
    o.blendMode = 'opaque';

    // View port, back buffer and managed render target values.
    o.width = 0;
    o.height = 0;

    o.scissorX = 0;
    o.scissorY = 0;
    o.scissorWidth = o.graphicsDevice.width;
    o.scissorHeight = o.graphicsDevice.height;

    o.clipOffsetX = -1.0;
    o.clipOffsetY = 1;
    o.clipScaleX = 2.0 / o.graphicsDevice.width;
    o.clipScaleY = -2.0 / o.graphicsDevice.height;

    o.viewScaleX = 1;
    o.viewScaleY = 1;

    // GPU Memory.
    // -----------

    var initial = (params.initialGpuMemory ? params.initialGpuMemory : 0);
    if (initial < 140)
    {
        // 140 = minimum that can be used to draw a single sprite.
        initial = 140;
    }
    if (initial > 2293760)
    {
        // 2293760 = maximum that can ever be used in 16bit indices.
        initial = 2293760;
    }

    o.performanceData = {
        gpuMemoryUsage : initial,
        minBatchSize : 0,
        maxBatchSize : 0,
        avgBatchSize : 0,
        batchCount : 0,
        dataTransfers : 0
    };

    o.maxGpuMemory = (params.maxGpuMemory ? params.maxGpuMemory : 2293760);
    if (o.maxGpuMemory < initial)
    {
        o.maxGpuMemory = initial;
    }

    var initialVertices = Math.floor(initial / 140) * 4;
    o.maxVertices = Math.floor(o.maxGpuMemory / 140) * 4;
    if (o.maxVertices > 65536)
    {
        o.maxVertices = 65536;
    }

    // number of bytes used per-sprite on cpu vertex buffers.
    o.cpuStride = 64;

    // vertex buffer is in terms of number of vertices.
    // so we have a stride of 4 rather than 128.
    o.gpuStride = 4;

    // Index and vertex buffer setup.
    o.vertexBufferParameters = {
        numVertices: initialVertices,
        attributes: [gd.VERTEXFORMAT_FLOAT2, gd.VERTEXFORMAT_FLOAT4, gd.VERTEXFORMAT_FLOAT2],
        'transient': true
    };
    o.vertexBuffer = gd.createVertexBuffer(o.vertexBufferParameters);

    o.semantics = gd.createSemantics([gd.SEMANTIC_POSITION, gd.SEMANTIC_COLOR, gd.SEMANTIC_TEXCOORD0]);
    o.indexBufferParameters = {
        numIndices: (initialVertices * 1.5),
        format: gd.INDEXFORMAT_USHORT,
        dynamic: false,
        data : o.indexData((initialVertices * 1.5))
    };
    o.indexBuffer = gd.createIndexBuffer(o.indexBufferParameters);

    // Render Target API
    // -----------------

    // Objects and values used in render target management.
    o.renderTargetIndex = 0;
    o.renderTargetCount = 0;

    o.renderTargetTextureParameters = {
        name   : '',
        width  : 0,
        height : 0,
        depth  : 1,
        format     : "R8G8B8A8",
        cubemap    : false,
        mipmaps    : true,
        renderable : true,
        dynamic    : true
    };

    o.renderTargetParams = {
        colorTexture0 : null
    };

    // Render Target copying.
    // ----------------------

    // Copy technique for copyRenderTarget
    o.copyTechnique = shader.getTechnique("copy");
    o.copyTechniqueParameters = gd.createTechniqueParameters({
        inputTexture0 : null,
        copyFlip : 1,
        copyUVScale : new Draw2D.prototype.floatArray([1, 1])
    });

    // Objects used in copyRenderTarget method.
    o.quadSemantics = gd.createSemantics([gd.SEMANTIC_POSITION, gd.SEMANTIC_TEXCOORD0]);
    o.quadPrimitive = gd.PRIMITIVE_TRIANGLE_STRIP;

    o.copyVertexBufferParams = {
        numVertices: 4,
        attributes: [gd.VERTEXFORMAT_FLOAT2, gd.VERTEXFORMAT_FLOAT2],
        'transient': true
    };
    o.copyVertexBuffer = gd.createVertexBuffer(o.copyVertexBufferParams);

    // updateRenderTargetVBO
    // ---------------------

    /*jshint white: false*/
    o.vertexBufferData = new Draw2D.prototype.floatArray([-1.0, -1.0, 0.0, 0.0,
                                                           1.0, -1.0, 1.0, 0.0,
                                                          -1.0,  1.0, 0.0, 1.0,
                                                           1.0,  1.0, 1.0, 1.0]);
    /*jshint white: true*/

    return o;
};

// Detect correct typed arrays
(function () {
    Draw2D.prototype.uint16Array = function (arg) {
        if (arguments.length === 0)
        {
            return [];
        }

        var i, ret;
        if (typeof arg === "number")
        {
            ret = new Array(arg);
        }
        else
        {
            ret = [];
            for (i = 0; i < arg.length; i += 1)
            {
                ret[i] = arg[i];
            }
        }
        return ret;
    };

    var testArray;
    var textDescriptor;

    if (typeof Uint16Array !== "undefined")
    {
        testArray = new Uint16Array(4);
        textDescriptor = Object.prototype.toString.call(testArray);
        if (textDescriptor === '[object Uint16Array]')
        {
            Draw2D.prototype.uint16Array = Uint16Array;
        }
    }

    Draw2D.prototype.floatArray = function (arg) {
        if (arguments.length === 0)
        {
            return [];
        }

        var i, ret;
        if (typeof arg === "number")
        {
            ret = new Array(arg);
        }
        else
        {
            ret = [];
            for (i = 0; i < arg.length; i += 1)
            {
                ret[i] = arg[i];
            }
        }
        return ret;
    };

    if (typeof Float32Array !== "undefined")
    {
        testArray = new Float32Array(4);
        textDescriptor = Object.prototype.toString.call(testArray);
        if (textDescriptor === '[object Float32Array]')
        {
            Draw2D.prototype.floatArray = Float32Array;
            Draw2D.prototype.defaultClearColor = new Float32Array(Draw2D.prototype.defaultClearColor);
        }
    }
}());


/*jslint browser: true*/
/*global TurbulenzEngine,Canvas,Draw2D,Grid,RandomSeedGenerator,CellDrawing,NeighbourhoodWatch*/
TurbulenzEngine.onload = function onload() {
    
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathsDevice = TurbulenzEngine.createMathDevice({}),
		drawing = Draw2D.create({ graphicsDevice : graphicsDevice }),
		gridWidth = 50,
		cellWidth = 5,
		gameWidth = graphicsDevice.width,
		gameHeight = graphicsDevice.height,
		viewport = mathsDevice.v4Build(0, 0, gameWidth, gameHeight),
		configureParams = {
			scaleMode : undefined,
			viewportRectangle : viewport
		},
		grid = new Grid(new RandomSeedGenerator(new CellDrawing(drawing, gridWidth, cellWidth), gridWidth).generate(), new NeighbourhoodWatch(gridWidth));		

    function update() {
		graphicsDevice.beginFrame();
		drawing.setBackBuffer();		
		drawing.clear();
		drawing.begin();		
		grid.draw();
		drawing.end();
		graphicsDevice.endFrame();
    }

    TurbulenzEngine.onunload = function gameOnunload() {
		graphicsDevice = null;
		mathsDevice = null;
		grid = null;
		drawing = null;
		viewport = null;
		configureParams = null;
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
    TurbulenzEngine.setInterval(grid.update, 150);
};
function LiveCell (cellFactory, rule, drawService) {
    
    var neighbourCount = 0;

    function checkRule() {
        if (rule.isAlive(neighbourCount)) {
            return cellFactory.createLiveCell();
        } else {
            return cellFactory.createDeadCell();
        }
    }

    function notify() {
        neighbourCount += 1;
    }

    function notifyNeighbours(neighbours) {
        neighbours.forEach(function (neighbour) {
            neighbour.notify();
        });
    }

    function draw(index) {
        drawService.draw(true, index);
    }

    return {
        checkRule : checkRule,
        notify : notify,
        notifyNeighbours : notifyNeighbours,
        draw : draw
    };
}

function DeadCell(cellFactory, rule, drawService) {
    
    var neighbourCount = 0;

    function checkRule() {
        if (rule.isAlive(neighbourCount)) {
            return cellFactory.createLiveCell();
        } else {
            return cellFactory.createDeadCell();
        }
    }

    function notify() {
        neighbourCount += 1;
    }

    // don't notify neighbours, I'm dead
    // dead code??
    function notifyNeighbours(neighbours) { }

    function draw(index) {
        drawService.draw(false, index);
    }

    return {
        checkRule : checkRule,
        notify : notify,
        notifyNeighbours : notifyNeighbours,
        draw : draw
    };
}
function CellDrawing(boxDrawing, gridWidth, cellWidth) {
    

    if(cellWidth == undefined) {
        cellWidth = 1;
    }

    function draw(isAlive, index) {
        if(isAlive) {
            var xCoordinate = (index % gridWidth) * cellWidth,
                yCoordinate = (Math.round(index / gridWidth)) * cellWidth;

            boxDrawing.draw({ destinationRectangle : [xCoordinate, yCoordinate, xCoordinate + cellWidth, yCoordinate + cellWidth] });
        }
    }

    return { draw : draw };
}
function CellFactory(liveCellRule, deadCellRule, drawService) {    
    
    function createLiveCell() {
        return new LiveCell(this, liveCellRule, drawService);
    }

    function createDeadCell() {
        return new DeadCell(this, deadCellRule, drawService);
    }

    return {
        createLiveCell : createLiveCell,
        createDeadCell : createDeadCell
    };
}
function Grid(seed, neighbourhoodWatch) {
    
    var cells = seed;

    function notifyNeighbours() {
        cells.forEach(function (cell, index) {
            cell.notifyNeighbours(neighbourhoodWatch.getNeighbours(cells, index));
        });
    }

    function checkRules() {
        var newCells = [];
        cells.forEach(function (cell, index) {            
            newCells.push(cell.checkRule());
        });

        cells = newCells;
    }

    function update() {
        notifyNeighbours(cells);
        checkRules();        
    }

    function draw() {
        cells.forEach(function (cell, index) {
            cell.draw(index);
        });
    }

    return {
        update : update,
        notifyNeighbours : notifyNeighbours,
        draw : draw
    };
}
function NeighbourhoodWatch(gridWidth) {
    

    function getStartIndex(cellIndex) {
        var startIndex = cellIndex - gridWidth - 1;

        if (startIndex < 0) {
            startIndex = 0;
        }

        return startIndex;
    }

    function getEndIndex(cellIndex, maxIndex) {
        var endIndex = cellIndex + gridWidth + 1;

        if (endIndex >= maxIndex) {
            endIndex = maxIndex - 1;
        }

        return endIndex;
    }

    function isCellWithinBounds(cellIndex, currentIndex) {
        var cellX = cellIndex % gridWidth,
            cellY = Math.floor(cellIndex / gridWidth),
            currX = currentIndex % gridWidth,
            currY = Math.floor(currentIndex / gridWidth),
            x = cellX - currX,
            y = cellY - currY;

        return (x >= -1 && x <= 1) && (y >= -1 && y <= 1) && (cellIndex !== currentIndex);
    }

    function getNeighbours(cells, cellIndex) {
        var neighbours = [],
            startIndex = getStartIndex(cellIndex),
            endIndex = getEndIndex(cellIndex, cells.length),
            currentIndex = startIndex;

        for (currentIndex; currentIndex <= endIndex; currentIndex += 1) {
            if (isCellWithinBounds(cellIndex, currentIndex)) {
                neighbours.push(cells[currentIndex]);
            }
        }

        return neighbours;
    }

    return {
        getNeighbours : getNeighbours
    };
}
/*global CellFactory,LiveCellRule, DeadCellRule*/
function RandomSeedGenerator(cellDrawing, gridWidth) {
    
    var gridSize = gridWidth * gridWidth;

    function generate() {
        var cellFactory = new CellFactory(new LiveCellRule(), new DeadCellRule(), cellDrawing),
            cells = [],
            liveCell,
            i = 0;

        for (i; i < gridSize; i += 1) {
            liveCell = Math.floor((Math.random() * 100) + 1);

            if (liveCell > 50) {
                cells.push(cellFactory.createLiveCell());
            } else {
                cells.push(cellFactory.createDeadCell());
            }
        }

        return cells;
    }

    return {
        generate : generate
    };
}
function LiveCellRule() {
    
    function isAlive(noNeighbours) {
        return noNeighbours > 1 && noNeighbours < 4;
    }

    return {
        isAlive : isAlive
    };
}

function DeadCellRule() {
    
    function isAlive(noNeighbours) {
        return noNeighbours === 3;
    }

    return {
        isAlive : isAlive
    };
}
window.TurbulenzEngine = TurbulenzEngine;}());