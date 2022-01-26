Path Helper
===========

The PathHelper class contains a variety of methods to assist with performing operations
on multi-point paths (polylines).

Documentation
-------------

I am in the process of formatting this following [JSDoc](https://jsdoc.app/).

Common Data Types
-----------------

### Point

A point is an array of 2 or 3 elements representing either the point's X,Y or X,Y,Z position.

```js
let point = [0.0, 0.0];
```

### Path

A path is an array of one or more points.

```js
let path = [
    [-1, 0],
    [ 1, 0]
];
```

### Paths

Paths represent one or more path.

```js
let paths = [
    [
        [-1, 0],
        [ 1, 0]
    ],
    [
        [0, -1],
        [0,  1]
    ]
];
```

Methods
-------

```js
let PH = new PathHelper();
```

### info

Get information about a 2D path

```js
let path = [
    [-1,  1],
    [ 1,  1],
    [ 1, -1],
    [-1, -1]
];
let i = PH.info(path);
```

**Expected Output:**
```js
{
    "min": [-1, -1],
    "max": [1, 1],
    "range": [2, 2],
    "center": [0, 0]
}
```

### deepCopy

Create a deep copy of a JavaScript array/object.

This is useful so that paths can be duplicated and then manipulated
independently without any references.

### getMin

Get the minimum value from each coordinate compononent of a 2D or 3D path

```js
let path = [
    [-2,  1],
    [ 4,  1],
    [ 4, -3],
    [-2, -3]
];
let i = PH.getMin(path);
```

**Expected Output:**
```js
[-2, -3]
```

### getMax

Get the minimum value from each coordinate compononent of a 2D or 3D path

```js
let path = [
    [-2,  1],
    [ 4,  1],
    [ 4, -3],
    [-2, -3]
];
let i = PH.getMax(path);
```

**Expected Output:**
```js
[4, 1]
```

### crossProduct

Calculate the cross product of two 3D vectors

```js
let a = [-2, 1, 1];
let b = [ 3, 2, 1];
let i = PH.crossProduct(a, b);
```

**Expected Output:**
```js
[-1, 5, -7]
```

### boundingBox

Get the Bounding Box coordinates for a 2D or 3D path

This returns a multidimensional array with the minimum and maximum values for each dimension

```js
let path = [
    [-1,  0],
    [ 0, -1],
    [ 1,  0],
    [ 0,  1]
];
let i = PH.boundingBox(path);
```

**Expected Output:**
```js
[
    [-1, 1],
    [-1, 1],
]
```

### arrayMin

Get the smallest number from an array

```js
PH.arrayMin([10, 2, 4.5, 7, 2.3, -1.2, -2.7]);
```

**Expected Output:**
```js
-2.7
```

### arrayMax

Get the largest number from an array

```js
PH.arrayMax([10, 2, 4.5, 7, 2.3, -1.2, -2.7]);
```

**Expected Output:**
```js
10
```

### Other:

 - degreesToRadians
 - radiansToDegrees
 - greatestCommonDivisor
 - lineEquals
 - pointEquals
 - getRndInteger
 - getRandom
 - getGaussianRandom
 - map
 - lerp
 - polygon
 - star
 - parabola
 - intersect_point
 - getLineLineCollision
 - distance (point-to-point)
 - pathLength
 - perpendicularPath
 - parallelPath
 - expandPath
 - offsetPath
 - offsetAngle
 - extendLine
 - smoothCorners
 - radiusCorners
 - arcPointToPoint
 - arc
 - lineSlopeIntercept
 - arrayColumn
 - centerPaths
 - scalePath
 - translatePath
 - rotatePath
 - shiftPath
 - reflectPath
 - subdividePath
 - dividePath
 - dividePathComplete
 - decimatePath
 - decimatePaths
 - joinPaths
 - cleanPath
 - pointsToPaths2
 - pointsToPaths
 - smoothPath
 - quadraticBezierPath
 - quadraticBezierPathAlgorithm
 - cubicBezierPath
 - sortPaths
 - shufflePaths
 - polarToRect
 - pointOnLineSegment
 - lineCircleIntersect
 - solveQuadratic
 - circleInterceptPoints
 - cropToCircle (Deprecated: Try cropToShape instead)
 - cropToRectangle (Deprecated: Try cropToShape instead)
 - cropToShape
 - knockout
 - pointInPolygon
 - fill
 - layeredPaths
 - subtractPaths
 - linePathSplit (for layeredPaths)
 - linePathsSplit (for layeredPaths)
 - noisify
 - simplify
 - booleanAdd
 - booleanAddComparison
 - booleanSubtract
 - booleanSubtractComparison
 - booleanIntersection
 - booleanIntersectionComparison
 - shapeIntersections

License
-------

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
