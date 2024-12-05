Path Helper
===========

The PathHelper class contains a variety of methods to assist with performing operations
on multi-point paths (polylines).

Documentation
-------------

Code is documented using [JSDoc](https://jsdoc.app/) syntax and is compiled using the [NPM jsdoc](https://www.npmjs.com/package/jsdoc) package.

Generate documentation:
```sh
npm run docs
```

Demo (BETA)
-----------

This is a new experimental feature. This will start a local web server where class methods can be demonstrated.

```sh
npm run demo
```

Open http://localhost:8000 in your browser.

Formatting
----------

Use [ESLint](https://eslint.org) to check code formatting. Run with:

```sh
npm run lint
```

Testing
-------

Unit Testing is being developed with [Jest](https://jestjs.io). Run with:

```sh
npm run test
```

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

The following methods are grouped and ordered loosely by their purpose and use.

Note: Some examples show rounded results in floating point numbers in order
to keep the examples concise.

**Types of Operations:**
 - [General Operations](#general-operations)
 - [Mathematical Formulas](#mathematical-formulas)
 - [Shapes](#shapes)
 - [Linear Transformations](#linear-transformations)
 - [Boolean Shape Operations](#boolean-shape-operations)
 - [Path Operations](#path-operations)

```js
let PH = new PathHelper();
```

Note: A custom Psuedo-Random Number Generator (PRNG) can be set as a class parameter.
This is useful for creating consistent, deterministic results as required by most NFTs art.

---------------------------------------------------------------------------------------
### General Operations
*The following methods provide general help with interacting with Path data in JavaScript*

---------------------------------------------------------------------------------------

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
    "points": 4,
    "range": [2, 2],
    "center": [0, 0]
}
```

### deepCopy

Create a deep copy of a JavaScript array/object.

This is useful so that paths can be duplicated and then manipulated
independently without any references.

### pathsToFixed

Simplify the precision of floating point numbers in a Paths array.

```js
let path = [
    [
        [0.0001, 0.1501],
        [1.1645, 1.5762]
    ]
];
let new_path = PH.pathsToFixed(path, 2);
```

**Expected Output:**
```js
[
    [
        [0, 0.15],
        [1.16, 1.58]
    ]
]
```

### pathPointsArrayToObject

Convert the points in a path from an array to an object

```js
PH.pathPointsArrayToObject([
    [0.0001, 0.1501],
    [1.1645, 1.5762]
]);
```

**Expected Output:**
```js
[
    {x: 0.0001, y: 0.1501},
    {x: 1.1645, y: 1.5762}
]
```

### pathPointsObjectToArray

Convert the points in a path from an object to an array

```js
PH.pathPointsObjectToArray([
    {x: 0.0001, y: 0.1501},
    {x: 1.1645, y: 1.5762}
]);
```

**Expected Output:**
```js
[
    [0.0001, 0.1501],
    [1.1645, 1.5762]
]
```
### arrayColumn

Get the values from a single column in the input array

```js
PH.arrayColumn(
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    2
);
// Output is [3, 6, 9]
```

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

### getRndInteger

Get a random Integer (whole number) between two values (inclusive).
This can take an optional Psudeo-Random Number Generator (PRNG) function as a final parameter,
which can help with the creation of deterministic results.

```js
PH.getRndInteger(1, 10);
// Output is 5
```

### getRandom

Get a random Number between two values (inclusive).
This can take an optional Psudeo-Random Number Generator (PRNG) function as a final parameter,
which can help with the creation of deterministic results. This has a default range of 0 to 1
to match Math.random().

```js
PH.getRandom(1, 3);
// Output is 1.3623930350489668
```

### getGaussianRandom

Get a random number between 0 and 1 within a Gaussian Distribution probability.
This can take an optional Psudeo-Random Number Generator (PRNG) function as a final parameter,
which can help with the creation of deterministic results.

```js
PH.getGaussianRandom();
// Output is 0.5166768388415707
```

### map

Map a value from one scale to another scale. This accepts an optional fifth boolean parameter
to clamp the result to the output scale.

```js
PH.map(2, 0, 10, -5, 5);
// Output is -3
```

### Clamp

Constrain a value within a range of numbers. If the input
value is below the acceptable minimum, then the
minimum value will be returned. If the input value is
over the acceptable maximum, then the maximum value
will be returned.

```js
PH.clamp(10, 0, 100);
// Output is 10

PH.clamp(-10, 0, 100);
// Output is 0

PH.clamp(110, 0, 100);
// Output is 100
```
### lerp

Perform a linear interpolation between two values

```js
PH.lerp(0, 20, 0.3);
// Output is 6
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

### polarToRect

Convert Polar coordinates to Rectangular (Cartesian) coordinates

```js
PH.polarToRect(1, 0.25 * Math.PI);
// Output is [0.7071067811865476, 0.7071067811865475]
```

### rectToPolar

Convert Rectangular (Cartesian) coordinates to Polar coordinates

```js
PH.rectToPolar(0.7071, 0.7071);
// Output is {radius: 0.99999, theta: 0.7854}
```

### greatestCommonDivisor

Get the [Greatest Common Divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor) of two numbers

```js
PH.greatestCommonDivisor(50, 30);
// Output is 10
```

### sign

Get the sign of the number: +1 for positive, -1 for negative and 0 for zero.

```js
PH.sign(23)
// Output is 1
PH.sign(-12)
// Output is -1
PH.sign(0)
// Output is 0
```

---------------------------------------------------------------------------------------
### Mathematical Formulas
*The following methods perform general mathematical operations*

---------------------------------------------------------------------------------------

### crossProduct

Calculate the cross product of two 3D vectors

```js
let a = [-2, 1, 1];
let b = [ 3, 2, 1];
PH.crossProduct(a, b);
// Output is [-1, 5, -7]
```

### dotProduct

Calculate the dot product of two matrices

```js
let a = [-2, 1, 1];
let b = [ 3, 2, 1];
PH.dotProduct(a, b);
// Output is -3
```

### matrixMultiply

Multiply two matrices

```js
let a = [[1, 2, 3]];
let b = [
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2]
];
PH.matrixMultiply(a, b);
// Output is [ [ 2, 4, 6 ] ]
```

### lineSlopeIntercept

Calculate the slope and y-intercept of the line passing between two points.
In the return object, `m` represents slope and `b` represents the y-intercept.

```js
PH.lineSlopeIntercept([1, 2], [2, 3]);
// Output is {m: 1, b: 1}
```

### solveQuadratic

Solve the Quadratic Equation. For real values only.
Standard Quadratic Equation: ax^2 + bx + c = 0

```js
PH.solveQuadratic(2, 4, -4);
// Output is [0.7321, -2.7321]
```

### distance

Calculate the distance between two points in 2D or 3D space

```js
PH.distance([0, 0], [1, 1]);
// Output is 1.4142135623730951

PH.distance([0, 0, 0], [1, 1, 1]);
// Output is 1.7320508075688772
```

### midpoint

Calculate the point equidistance from two points

```js
PH.midpoint([0, 0], [1, 1]);
// Output is [0.5, 0.5]
```

### angle

Calculate the angle between 3 points

```js
PH.angle([1, 0], [0, 0], [1, 1]);
// Output is 0.7853981633974483
```

### curvature

Calculate the curvature of 3 points

```js
PH.curvature([1, 0], [0, 0], [1, 1]);
// Output is 0.7071067811865476
```

---------------------------------------------------------------------------------------
### Shapes
*The following methods help create basic shapes, curves, etc.*

---------------------------------------------------------------------------------------

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

### rectangle

Create a rectangle centered at the origin. Specify the width and height.

```js
PH.rectangle(1, 0.5);
```

### ellipse

Create an ellipse (oval) centered at the origin. Specify the width, height, and number of segments.

```js
PH.ellipse(4, 2, 60);
```

### superellipse

Create a superellipse, also known as a Lamé curve, centered at the origin. Specify the width, height, and number of segments.
A squircle is a special case when the width and height are the same.

```js
PH.superellipse(4, 2, 60);
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

### arcPointToPoint

Compose a circular arc between two points. The center of the circle on
which the arc lies is the midpoint between (x1, y1) and (x2, y2). The
arc starts at (x1, y1) and proceeds clockwise for `theta` radians.
This method is most useful when you have two known points and wish to
connect them using a circular arc.

### arc

Compose a circular arc centered around a known point with a known radius

### quadraticBezierPath

Create a [Quadratic Bézier curve](https://en.wikipedia.org/wiki/Bézier_curve#Quadratic_Bézier_curves) path.

```js
PH.quadraticBezierPath(
    [0, 0],
    [1, 1],
    [0, 2],
    5
);
```

**Expected Output:**
```js
[
    [0, 0],
    [0.32, 0.4],
    [0.48, 0.8],
    [0.48, 1.2],
    [0.32, 1.6],
    [0, 2],
]
```

### cubicBezierPath

Create a [Cubic Bézier curve](https://en.wikipedia.org/wiki/Bézier_curve#Cubic_Bézier_curves) path.

```js
PH.cubicBezierPath(
    [0, 0],
    [1, 0.5],
    [1, 1.5],
    [0, 2],
    5
);
```

**Expected Output:**
```js
[
    [0, 0],
    [0.48, 0.35],
    [0.72, 0.78],
    [0.72, 1.2],
    [0.48, 1.65],
    [0, 2]
]
```

---------------------------------------------------------------------------------------
### Linear Transformations
*The following methods perform standard linear transformations*

---------------------------------------------------------------------------------------

### centerPaths

Translate a group of paths to be centered around the origin

### scalePath

Scale a Path with respect to the origin. To scale "in place", translate
the path to be centered at the origin, apply `scalePath`, and then re-translate
the path in the opposite direction.

```js
let path = [
    [-1,  0],
    [ 0, -1],
    [ 1,  0],
    [ 0,  1]
];
PH.scalePath(path, 0.5);
```

**Expected Output:**
```js
[
    [-0.5, 0],
    [0, -0.5],
    [0.5, 0],
    [0, 0.5]
]
```

### translatePath

Translate a Path in 2D Cartesian coordinates

```js
let path = [
    [-1,  0],
    [ 0, -1],
    [ 1,  0],
    [ 0,  1]
];
PH.translatePath(path, [0.5, 0.5]);
```

**Expected Output:**
```js
[
    [-0.5, 0.5],
    [0.5, -0.5],
    [1.5, 0.5],
    [0.5, 1.5]
]
```

### rotatePath

Rotate a path around a point using the [Rotation Matrix](https://en.wikipedia.org/wiki/Rotation_matrix).

```js
let path = [
    [-1,  0],
    [ 0, -1],
    [ 1,  0],
    [ 0,  1]
];
PH.rotatePath(path, 0.5 * Math.PI);
```

**Expected Output:**
```js
[
    [ 0, -1],
    [ 1,  0],
    [ 0,  1],
    [-1,  0]
]
```

### rotatePoint

Rotate a point around another point using the [Rotation Matrix](https://en.wikipedia.org/wiki/Rotation_matrix).

```js
let a = [1, 0];
let b = [0.5, 0];
console.log(PH.rotatePoint(a, 0.5 * Math.PI, b));
```

**Expected Output:**
```js
[0.5, 0.5]
```

### reflectPath

Reflect a Path vertically or horizontally about an axis (X or Y)

```js
PH.reflectPath([[1, 1], [2, 2]], "x", 0.0);
// Expected output is [[-1, 1], [-2, 2]]
```

### shearPath

Shear (or skew) a Path in a direction, "horizontal" or "vertical", by a slope value.

```js
let path = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0]
];
PH.shearPath(path, "horizontal", 1);
```

**Expected Output:**
```js
[
    [0, 0],
    [1, 1],
    [2, 1],
    [1, 0]
]
```

### distortPath

Distort a path by mapping the corners of a rectangular bounding box
to the respective corners of a manipulated quadrilateral.
The path will be distorted using a linear interpolation of the
transformation.

```
Bouding Box:

 A -- B
 |    |
 D -- C

Distortion:

 A ------- B
  \       /
   \     /
    D - C
```

---------------------------------------------------------------------------------------
### Boolean Shape Operations
*The following methods perform standard [Boolean operations on polygons](https://en.wikipedia.org/wiki/Boolean_operations_on_polygons)*

---------------------------------------------------------------------------------------

### booleanAdd

Perform a Boolean addition (union) of two closed paths

### booleanAddComparison (PRIVATE)

Remove segments of Shape A that are inside of Shape B.
This is a helper method for `booleanAdd`.

### booleanSubtract

Perform a Boolean subtraction (difference) of two closed paths

### booleanSubtractComparison (PRIVATE)

Remove segments of Shape B that are outside of Shape A.
This is a helper method for `booleanSubtract`.

### booleanIntersection

Perform a Boolean intersection of two closed paths

### booleanIntersectionComparison (PRIVATE)

Remove segments of Shape B that are outside of Shape A.
This is a helper method for `booleanIntersection`.

### shapeIntersections

Calculate the intersection points of Shape A with Shape B,
and insert these intersection points in Shape A (in order).

This is a helper method for the Boolean shape operations.

---------------------------------------------------------------------------------------
### Path Operations
*The following methods perform a wide variety of operations for manipulating paths*

---------------------------------------------------------------------------------------

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

### closedPath

Determine if a Path is closed, meaning that the ending point coincides with
the starting point. This supports an optional `threshold` parameter that
can be set to specify a maximum distance that the points can be apart and
still considered coincident.

```js
let path = [
    [0, 0],
    [1, 0]
];
PH.closedPath(path);
// Output is False

let path = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0]
];
PH.closedPath(path);
// Output is True
```

### selfIntersectingPath

Determine if a path intersects, or overlaps, with itself.

### simplePolygon

Determine if a path represents a shape that is a simple polygon, meaning that the path
is a closed shape that does not intersect itself.

### complexPolygon

Determine if a path represents a shape that is a complex polygon, meaning that the path
is a closed shape that intersects itself.

### convexPolygon

Determine if a path represents a shape that is a convex polygon.

### concavePolygon

Determine if a path represents a shape that is a concave polygon.

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

### lineCircleIntersect

Calculate the intersection points between a line and a circle. The
response is an array with 0, 1 or 2 Point array elements representing the
locations of intersections.

```js
PH.lineCircleIntersect([-1, -1], [1, 1], [[0,0], 1]);
```

**Expected Output:**
```js
[
    [0.7071, 0.7071],
    [-0.7071, -0.7071]
]
```

### circleInterceptPoints

Calculate the intersection point between two circles. This requires both
circles to be centered at the origin. A `sign` parameter solves for one of
two possible solutions. This assumes the input circles do intersect and
does not solve for non-intersection.

### pointOnLineSegment

Check if a Point is on a Line Segment (or within a threshold/buffer)

```js
PH.pointOnLineSegment(
    [0.5, 0.01],
    [[0, 0], [1, 0]],
    0
);
// Output is false

PH.pointOnLineSegment(
    [0.5, 0.01],
    [[0, 0], [1, 0]],
    0.001
);
// Output is true
```

### pointInPolygon

Determine if a point is inside of a polygon. This is taken from
Jeffrey Thompson's excellent eBook on
[Collission Detection](http://www.jeffreythompson.org/collision-detection/line-circle.php).

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

### varyPath

Vary the width (stroke) of a path. A 2D or 3D input Path can be provided. If
a Path of 2D Points is provided, then the width "envelope" will be created at
random using a smoothed noise function. If 3D Points are provided the 3rd Point
array value will be used as the envelope distance at that point. The output path
is created by increasing the path offset incrementally to fill in the envelope.
If a 3D Path is provided, then max_offset, period and smoothing_window are not
required.

```js
PathHelp.varyPath([[0, 0], [1, 0]], 0.003, 0.050, 0.010)
```

### offsetPath

Create a path that runs parallel to the input path. This handles
closed paths (end point coincident with start point) as well as
open paths. The path must contain 3 or more points. An optional third parameter
can be set to "true" in order to eliminate knots/kinks when the offset
line overlaps with itself.

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

A function can also be used as the second parameter. The functions's input value is a
number betweeen 0 and 1 representing the current point's array index as a percentage.
The output of the function is a numerical offset value. For example an offset function could
be:

```js
/**
 * Function returns an offset value describing a parabola
 **/
function(val) {
    const max_offset = 0.01;
    return max_offset * (-Math.pow(2 * val - 1, 2) + 1);
}
````

### removeKnots

Remove parts of a path where it intersects with itself creating a loop/knot.
This serves as a help function in offsetPath to support wide offset values.

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

Extend the line segment between points A and B by an amount in either direction.
This works for 2D and 3D points.

```
          A          B
  In:     ------------
  Out:  ----------------
```

```js
PH.extendLine([0, 0], [1, 1], 0.2, 0.2);
```

### extendPath

Extend a multi-point path by one point in the same direction and with
the same distance as the previous two points. A second optional "factor" parameter
can be set to either decrease or increase the curvature of the path.

### limitPathDistance

Limit a path's length to a maximum distance

### superimposeFunction

Superimpose a function onto a path. For example, add a Sine Wave function onto any
input path.

### noisify

Add random noise to a path. This can make lines appear more organic or hand-drawn.
This accepts a number of parameters that impact the quality of the line:
 - `max_segment_length`: Use a lower value to increase the resolution
 - `max_noise`: Set a maximum magnitude of the noise displacement
 - `gaussian`: Use a Gaussian distribution for the noise values instead of using
   the native `random` function. This should reduce the noise effect
 - `force_close`: This is useful for closed paths. Since the first and last point
   of a closed paths may receive different random noise they may or may not close
   after the noise has been added. Depending on the desired effect this may or
   may not be desirable, so this may be set to `true` or `false` to achieve either effect
 - `smooth_window`: Set a smoothing window size to reduce the jaggedness of the
   path after receiving noise. This creates smoother, wavier lines
 - `smooth_repeat`: Use this in conjunction with `smooth_window` in order to repeat
   the `smooth_window` multiple times, making the line even smoother.
 - `anchor_start`: Set to true if you want the path's first point to keep its position.
   Defaults to false to maintain legacy behavior.
 - `anchor_end`: Set to true if you want the path's last point to keep its position.
   Defaults to true to maintain legacy behavior.

### smoothPath

Smooth a path by performing a one dimensional convolution on the X
and Y components of each point in the path. The `size` parameter defines
the window size. A larger window size will produce a smoother, less
defined path. There are different boundary treatments supported:

- preserve: This is like "trim", except the input path's end points are appended.
  This was the function's original behavior. This method can create relatively long
  segments toward the end of the line that can look out of place.

- trim: This drops the points that are near the ends and don't have a full smoothing
  window. This method does not create or add additional path data. It will shorten the path.

- weight: This duplicates the endpoints to accomodate the window size. It will shorten
  the path, but not as much as the trim method. It can result in some curling toward
  the endpoints since they are repeated.

- extrapolate: This adds additional points that attempt to be at the same interval/distance
  as segments at the end of the path and point in the same direction as the opposite side
  of the window. This maintains the original length and solves the flat ending segemnts
  of the "preserve" method.

### smoothCorners

Smooth the corners on a Path in relation to other points on the path.
A `sharpness` parameter controls the curvature on a scale from 0 to 1,
where 0 represents the maximum amount of curvature
between points and a value of 1 represents no curvature.

### radiusCorners

Smooth the corners on a Path by a set value. The curvature begins at the
`radius` distance from the each point. This is useful for creating
uniform curvatures, like to round corners on polygon.


### shiftPath

Shift and wrap the elements in the array. This is useful for changing the
start/end point of a closed shape. Specifically, when using a pen plotter
this can be used to break up undesired patterns created by a pen depositing
extra ink when it starts/stops a path.

```js
let path = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4]
];
PH.shiftPath(path, 2);
```

**Expected Output:**
```js
[
    [3, 3],
    [4, 4],
    [1, 1],
    [2, 2]
]
```

### subdividePath

Divide each segment of a multi-point Path array into
two segments.

```js
let path = [
    [0, 0],
    [0, 1],
    [1, 1]
];
PH.subdividePath(path);
```

**Expected Output:**
```js
[
    [0, 0],
    [0, 0.5],
    [0, 1],
    [0.5, 1],
    [1, 1]
]
```

### dividePath

Divide a two-point Path array (line) into 2 or more segments

```js
let path = [
    [0, 0],
    [0, 1]
];
PH.dividePath(path, 5);
```

**Expected Output:**
```js
[
    [0, 0],
    [0, 0.2],
    [0, 0.4],
    [0, 0.6],
    [0, 0.8],
    [0, 1]
]
```

### dividePathComplete

Refactor a Path array so that no segments of the path exceed
a maximum distance. This can be used to "upsample" a path so that
smoothing, adding noise, or other follow-up transformations may
be applied in a more uniform manner.

### resamplePath

Resample a path to contain a certain number of points. The new path
will have points that are equidistant along the original path. This will
result in a slightly different path than the origanl path - i.e.
sharp corners will not be preserved unless the sampling value is
sufficiently high.

### filterPath

Apply a filter function to the points in a path to remove points that fail
the function parameters. For example, a filter function could remove
every-other point, or points outside of a certain coordinate range or
distance from another point. An optional parameter allows the result to be
split into multiple paths or to retain the original path with the points removed.

### filterPaths

This is a helper function that puts multiple paths through the filterPath
method.

### dashPath

Turn a solid line/path into a dashed line. A distance can be specified
for the length of the dash and the length of the gap. An optional
parameter can be set to return the gaps instead of the dashes.

### decimatePath

Randomly remove portions of a path. This is controlled by an `odds`
parameter where a value of zero means that there is no chance any point
will be removed from the path and a value of one means that there is
a 100% chance that the point will be removed from the path.

To achieve this each point in the path is evaluated against a random
number between 0 and 1 and if the number is less than the odds, then
the point is removed from the path.

** Example of odds at 0.1 **

Here 2 out of the 20 segments have been removed as an example of what
could happen if the odds of removal are 10%.

```
Input:  --------------------
Output: -------- -------- --
```

### decimatePaths

This applies the same logic as `decimatePath` to multiple Path arrays.

### morph

Create a new path that is a morphology of Paths A and B. Paths A and B
are upsampled so that they are composed of an equal number of points and
can interpolated.

### joinPaths

Join Paths together when their endpoints are within a minimum distance of each other.
This is a recursive algorithm that will keep consolidating paths until no paths
are left within the threshold distance of each other.

```
        A          B C           D
Input:  ------------ -------------
Output: --------------------------
        A                        B
```

### cleanPath

Remove consecutive points if they are less than or equal to a threshold distance of the previous point.

This is useful to "downsample" a path if its spatial resolution is higher than required
by the output device, such as a screen or pen plotter. This can help reduce file size or
reduce plotting time without sacrificing image quality.

```js
let path = [
    [0, 0],
    [0.1, 0],
    [0.2, 0],
    [0.21, 0],
    [0.22, 0],
    [0.25, 0],
    [0.3, 0]
];
PH.cleanPath(path, 0.05);
```

**Expected Output:**
```js
[
    [0, 0],
    [0.1, 0],
    [0.2, 0],
    [0.3, 0]
]
```

### sortPaths

Sort Path arrays by start point from left to right, top to bottom.
This is primarily useful for plotting optimization in order to reduce the
distance traveled for non-drawing movements.

*Note:* This is a simple algorithm and could be improved for greater
efficiency in the future. For example, rather than sorting every path by
the starting point, the end point of the previous path could be used as
the position by which to find the next closest path. This could be further
optimized by optionally allowing paths to be plotted in reverse.

### shufflePaths

Randomly re-sort Path arrays. This is useful for plotting if the design has
a repetitive pattern and it is undesirable for pen up/down artifacts to appear
in a pattern that could negatively impact the desired image. This uses the
[Fisher-Yates algorithm](https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj)
for shuffling.

### removeShortPaths

Remove any path from a Paths array if the distance (total length) of the path
is below a certain distance. This can be useful if an algorithm produces many
short segments that may not be necessary. It can be used to increase plotter
efficiency and reduce stress on the servo motor.

### simplify

Simplify a path by removing points that do not significantly alter
the path's shape. Like `cleanPath` this is useful to reduce the complexity of
a path without sacrificing image quality.

### pointsToPaths2

This method takes a flat array of Points, and calculates the distance between
each point. If the distance is below a threshold these points are considered to
be part of a connected Path. Each Path will continue to grow until there are no
points within the threshold distance. Once a Path terminates a new Point is selected
for Path evaluation. This continues until no points remain to be evaluated.

This method was developed in order to convert raster/bitmap images into vector images.
This works by performing edge detection on the image and then using this method to
"connect the dots" of pixels determined to be edges.

### pointsToPaths

This is the original recursive version of pointsToPaths2 and is known to cause a stack overflow.
Consider using pointsToPaths2 instead.

### cropToShape

Crop paths to a bounding shape. This supports a threshold value that can
be used to handle points that are near the boundary of the crop shape. This should be
able to handle concave and convex polygons.

### cropToCircle

Crop paths to a circle.

**DEPRECATED**: This has been replaced by the more generalized `cropToShape` method
and will be removed in the future.

### cropToRectangle

Crop paths to a rectangle.

**DEPRECATED**: This has been replaced by the more generalized `cropToShape` method
and will be removed in the future.

### knockout

Remove portions of paths that are inside of another shape.
This may also be considered a Boolean Exclusive Or (XOR)

### fill

Fill a convex shape (polygon) with straight lines

### layeredPaths

Layer paths according to their stacking order
The lowest index (0) of "paths" will be on the bottom
of the stack. Subsequent paths (1, 2, 3...) will
knock out (subtract) any portions of previous paths
that they cover.

**Important:** *Shapes that are knocked-out do not include
the portion of the other shape that covers them. In
other words, the cover section is removed from the original
path and leaves a blank space, rather than incorporating
the portion of the other shape*

### subtractPaths

Subtract paths from one another. The lowest index
The lowest index (0) of "paths" will be on the bottom
of the stack. Subsequent paths (1, 2, 3...) will
knock out (subtract) any portions of previous paths
that they cover.

**Important:** *This is very similar to layeredPaths, except
that this method incorporates the path of the shape that
is being subtracted from the original path (as opposed to
removing it as in layeredPaths).*

### linePathSplit (PRIVATE)

Take a line segment and a path of a closed shape and return
the portion of that line that is not intersected by the shape

### linePathsSplit (PRIVATE)

Take a line segment and multiple paths representing a closed
convex polygon and return the portion of that line that is
not intersected by any of the shapes (paths)

### projectShapeShadow

Determine the "shadow" of an input shape at a certain translation
vector. This has been proven for closed-path convex regular polygons.
This has not been tested for other shapes.

### jot

Add a "jot" or small mark near the end of the path. The offset
distance from the end of the path, the length of the mark,
and a rotation range can be set.

License
-------

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
