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

### Info

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

### Other:

 - deepCopy
 - getMin
 - getMax
 - boundingBox
 - arrayMin
 - arrayMax
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
 - cropToCircle
 - cropToRectangle
 - pointInPolygon
 - fill
 - layeredPaths
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
