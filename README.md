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

Note: Some examples show rounded results in floating point numbers in order
to keep the examples concise.

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

### smoothPath

Smooth a path by performing a one dimensional convolution on the X
and Y components of each point in the path. The `size` parameter defines
the window size. A larger window size will produce a smoother, less
defined path.

### smoothCorners

Smooth the corners on a Path in relation to other points on the path.
A `sharpness` parameter controls the curvature on a scale from 0 to 1,
where 0 represents the maximum amount of curvature
between points and a value of 1 represents no curvature.

### radiusCorners

Smooth the corners on a Path by a set value. The curvature begins at the
`radius` distance from the each point. This is useful for creating
uniform curvatures, like to round corners on polygon.

### arcPointToPoint

Compose a circular arc between two points. The center of the circle on
which the arc lies is the midpoint between (x1, y1) and (x2, y2). The
arc starts at (x1, y1) and proceeds clockwise for `theta` radians.
This method is most useful when you have two known points and wish to
connect them using a circular arc.

### arc

Compose a circular arc centered around a known point with a known radius

### lineSlopeIntercept

Calculate the slope and y-intercept of the line passing between two points.
In the return object, `m` represents slope and `b` represents the y-intercept.

```js
PH.lineSlopeIntercept([1, 2], [2, 3]);
// Output is {m: 1, b: 1}
```

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

Rotate a path around the origin using the [Rotation Matrix](https://en.wikipedia.org/wiki/Rotation_matrix).

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

### reflectPath

Reflect a Path about an axis (X or Y)

```js
PH.reflectPath([[1, 1], [2, 2]], "x");
// Expected output is [[-1, 1], [-2, 2]]
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

### joinPaths

Join Paths together when their endpoints are within a minimum distance of each other.
This is a recursive algorithm that will keep consolidating paths until no paths
are left within the threshold distance of each other.

*Note: There are currently margin/boundary conditions in this method that are highly specific
to another project*

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

###

### Other:

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
 - booleanAdd
 - booleanAddComparison
 - booleanSubtract
 - booleanSubtractComparison
 - booleanIntersection
 - booleanIntersectionComparison
 - shapeIntersections

To Do:
------

 - Add optional rotation center point parameter to scalePath
 - Add optional rotation center point parameter to rotatePath
 - Generalize joinPaths to not include dimensions
 - Evaluate need for both cleanPath and simplify


License
-------

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
