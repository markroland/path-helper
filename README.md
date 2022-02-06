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
PH.getMin(path);
// Output is [-2, -3]
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
PH.getMax(path);
// Output is [4, 1]
```

### crossProduct

Calculate the cross product of two 3D vectors

```js
let a = [-2, 1, 1];
let b = [ 3, 2, 1];
PH.crossProduct(a, b);
// Output is [-1, 5, -7]
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
PH.boundingBox(path);
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
// Output is -2.7
```

### arrayMax

Get the largest number from an array

```js
PH.arrayMax([10, 2, 4.5, 7, 2.3, -1.2, -2.7]);
// Output is 10
```

### degreesToRadians

Convert Degrees to Radians

```js
PH.degreesToRadians(135.0);
// Output is 2.356194490192345
```

### radiansToDegrees

Convert Radians to Degrees

```js
PH.radiansToDegrees(0.5 * Math.PI);
// Output is 90
```

### greatestCommonDivisor

Get the [Greatest Common Divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two numbers

```js
PH.greatestCommonDivisor(50, 30);
// Output is 10
```

### lineEquals

Determine if two lines are equivalent by comparing their start and end points.
This supports an optional `threshold` parameter that can be set to specify a
maximum distance that two points can be apart and still considered coincident.
This is very useful when dealing with floating point numbers.

```js
let AB = [
    [0, 0],
    [0, 1]
];
let CD = [
    [0.005, 0],
    [0, 1.005]
];
PH.lineEquals(AB, CD);
// Output is False

PH.lineEquals(AB, CD, 0.01);
// Output is True
```

### pointEquals

Determine if two points are coincident.
This supports an optional `threshold` parameter that can be set to specify a
maximum distance that the points can be apart and still considered coincident.
This is very useful when dealing with floating point numbers.

```js
let A = [0.0, 0.0];
let B = [0.005, 0];
PH.pointEquals(A, B);
// Output is False

PH.pointEquals(A, B, 0.01);
// Output is True
```

### getRndInteger

Get a random Integer (whole number) between two values (inclusive)

```js
PH.getRndInteger(1, 10);
// Output is 5
```

### getRandom

Get a random Number between two values (inclusive)

```js
PH.getRandom(1, 3);
// Output is 1.3623930350489668
```

### getGaussianRandom

Get a random number between 0 and 1 within a Gaussian Distribution probability

```js
PH.getGaussianRandom();
// Output is 0.5166768388415707
```

### map

Map a value from one scale to another scale

```js
PH.map(2, 0, 10, -5, 5);
// Output is -3
```

### lerp

Perform a linear interpolation between two values

```js
PH.lerp(0, 20, 0.3);
// Output is 6
```

### polygon

Create a [regular polygon](https://en.wikipedia.org/wiki/Regular_polygon) centered at the origin

```js
PH.polygon(4, 1.0, Math.PI/4);
```

**Expected Output:**
```js
[
    [
        0.7071067811865476,
        0.7071067811865475
    ],
    [
        -0.7071067811865475,
        0.7071067811865476
    ],
    [
        -0.7071067811865477,
        -0.7071067811865475
    ],
    [
        0.7071067811865474,
        -0.7071067811865477
    ],
    [
        0.7071067811865477,
        0.7071067811865474
    ]
]
```

### star

Create a [regular star polygon](https://en.wikipedia.org/wiki/Star_polygon) centered at the origin

```js
PH.star(4, 1.0, Math.PI/4);
```

**Expected Output:**
```js
[
    [
        1,
        0
    ],
    [
        0.4045084971874737,
        0.29389262614623657
    ],
    [
        0.30901699437494745,
        0.9510565162951535
    ],
    [
        -0.15450849718747367,
        0.4755282581475768
    ],
    [
        -0.8090169943749473,
        0.5877852522924732
    ],
    [
        -0.5,
        6.123233995736766e-17
    ],
    [
        -0.8090169943749475,
        -0.587785252292473
    ],
    [
        -0.15450849718747378,
        -0.47552825814757677
    ],
    [
        0.30901699437494723,
        -0.9510565162951536
    ],
    [
        0.40450849718747367,
        -0.2938926261462367
    ],
    [
        1,
        0
    ]
]
```

### parabola

Create a [parabolic path](https://en.wikipedia.org/wiki/Parabola) centered at the origin

```js
PH.parabola(2.0, 1.0, 6);
```

**Expected Output:**
```js
[
    [
        -0.5,
        0.5
    ],
    [
        -0.33333333333333337,
        0.22222222222222227
    ],
    [
        -0.16666666666666669,
        0.055555555555555566
    ],
    [
        0,
        0
    ],
    [
        0.16666666666666663,
        0.05555555555555553
    ],
    [
        0.33333333333333337,
        0.22222222222222227
    ],
    [
        0.5,
        0.5
    ]
]
```

### intersect_point

Calculate the location where two lines intersect.

Note: Consider using getLineLineCollision instead

```js
PH.intersect_point(
    [ 0, 0],
    [ 0, 3],
    [-1, 1],
    [ 1, 1]
);
```

**Expected Output:**
```js
[0, 1]
```

### getLineLineCollision

Calculate if and where two finite line segments intersect

Note: This method and intersect_point are very similar. This method
is more robust because it detects non-intersection. Both methods
were copied from other sources.

```js
PH.getLineLineCollision(
    {x:  0, y: 0},
    {x:  0, y: 3},
    {x: -1, y: 1},
    {x:  1, y: 1}
);
```

**Expected Output:**
```js
{x:  0, y: 1}
```

### distance

Calculate the distance between two points in 2D or 3D space

```js
PH.distance([0, 0], [1, 1]);
// Output is 1.4142135623730951

PH.distance([0, 0, 0], [1, 1, 1]);
// Output is 1.7320508075688772
```

### pathLength

Calculate the total distance of a path of two or more points in 2D or 3D

```js
PH.pathLength([
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0]
]);
// Output is 4
```

### parallelPath

Create a line that runs parallel to the input points.

The side that the path runs parallel is determined by the
cross product of BA and AC (BA X AC), where A = p1, B = p2
and C = the first point of the returned line. This follows
the convention of the [right hand rule](https://en.wikipedia.org/wiki/Right-hand_rule).

```
   (C) -------- (D) (Positive Offset)
p1 (A) -------- (B) p2
   (C) -------- (D) (Negative Offset)
```

```js
PH.parallelPath([0, 0], [0, 1], 0.2);
```

**Expected Output:**
```js
[
    [-0.2, 0],
    [-0.2, 1]
]
```

### expandPath

Create two paths that run alongside the input path, either in
parallel or in a taper. Optionally close the path with an end cap.

```js
PH.expandPath([[0, 0], [0, 1]], 0.2, 0.2, "open");
```

### offsetPath

Create a path that runs parallel to the input path. This handles
closed paths (end point coincident with start point) as well as
open paths. The path must contain 3 or more points.

```js
PH.offsetPath([[0, 0], [0, 0.5], [0, 1]], 0.2);
```

**Expected Output:**
```js
[
    [-0.2, 0.0],
    [-0.2, 0.5]
]
```

### offsetAngle (PRIVATE)

Create a path offset from 3 points: A, B, C. A negative offset
represents an "interior" offset for the acute angle ACB.

```
  (A: p1)
   /  /
  /  /____ Negative Offset
 /________
(C: p2)   (B: p3)
```

This is used by the `offsetPath` method and is currently intended
to be a private method of the class.

### extendLine

Extend the line segment between points A and B by an amount in either direction

```
          A          B
  In:     ------------
  Out:  ----------------
```

```js
PH.extendLine([0, 0], [1, 1], 0.2, 0.2);
```

**Expected Output:**
```js
[
    [-0.1414, -0.1414],
    [ 1.1414,  1.1414]
]
```

### Other:

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
 - reflectPath
 - distortPath
 - shiftPath
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
