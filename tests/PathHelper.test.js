const PathHelper = require('./../src/PathHelper.js');

const PH = new PathHelper();

test('pathsToFixed', () => {
  let path = [
    [
      [0.0001, 0.1501],
      [1.1645, 1.5762]
    ]
  ];
  expect(PH.pathsToFixed(path, 2)).toStrictEqual([
    [
      [0, 0.15],
      [1.16, 1.58]
    ]
  ]);
});

test('pathPointsArrayToObject', () => {
  let path = [
    [0.0001, 0.1501],
    [1.1645, 1.5762]
  ];
  expect(PH.pathPointsArrayToObject(path)).toStrictEqual([
    {x: 0.0001, y: 0.1501},
    {x: 1.1645, y: 1.5762}
  ]);
});

test('pathPointsObjectToArray', () => {
  let path = [
    {x: 0.0001, y: 0.1501},
    {x: 1.1645, y: 1.5762}
  ];
  expect(PH.pathPointsObjectToArray(path)).toStrictEqual([
    [0.0001, 0.1501],
    [1.1645, 1.5762]
  ]);
});

test('getMin', () => {
  let path = [
    [-2,  1],
    [ 4,  1],
    [ 4, -3],
    [-2, -3]
  ];
  expect(PH.getMin(path)).toStrictEqual([-2, -3]);
});

test('map', () => {
  expect(PH.map(2, 0, 10, -5, 5)).toStrictEqual(-3);
  expect(PH.map(-1, 0, 10, -5, 5)).toStrictEqual(-6);
  expect(PH.map(-1, 0, 10, -5, 5, true)).toStrictEqual(-5);
  expect(PH.map(20, 0, 10, -5, 5)).toStrictEqual(15);
  expect(PH.map(20, 0, 10, -5, 5, true)).toStrictEqual(5);
});

test('clamp', () => {
  const min = 0;
  const max = 100;
  expect(PH.clamp(10, min, max)).toStrictEqual(10);
  expect(PH.clamp(-10, min, max)).toStrictEqual(min);
  expect(PH.clamp(110, min, max)).toStrictEqual(max);
});

test('midpoint', () => {
  expect(PH.midpoint([0, 0], [1, 1])).toStrictEqual([0.5, 0.5]);
});

test('angle', () => {
  expect(PH.angle([1, 0], [0, 0], [1, 1])).toBeCloseTo(Math.PI/4, 6);
});

test('curvature', () => {
  let radius = Math.sqrt(2)/2;
  let curvature = 1/radius;
  expect(PH.curvature([1, 0], [0, 0], [1, 1])).toBeCloseTo(curvature, 6);
});

test('closedPath_true', () => {

  let path = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0]
  ];
  PH.closedPath(path);

  expect(PH.closedPath(path)).toStrictEqual(true);
});

test('closedPath_false', () => {

  let path = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ];
  PH.closedPath(path);

  expect(PH.closedPath(path)).toStrictEqual(false);
});

test('matrixMultiply', () => {

  let a = [
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2]
  ];

  let b = [
    [1],
    [2],
    [3]
  ];

  let c = [[1, 2, 3]];

  expect(PH.matrixMultiply(a,b)).toStrictEqual([ [ 2 ], [ 4 ], [ 6 ] ]);
  expect(PH.matrixMultiply(c,a)).toStrictEqual([ [ 2, 4, 6 ] ]);
});

test('reflectPath', () => {

  const original_path = [
    [0.5, 0.5],
    [1.0, 1.0]
  ];

  let reflection_A = PH.reflectPath(original_path, "x", 0);
  expect(reflection_A).toStrictEqual([ [ -0.5, 0.5 ], [ -1.0, 1.0 ] ]);

  let reflection_B = PH.reflectPath(original_path, "horizontal", 0);
  expect(reflection_B).toStrictEqual([ [ -0.5, 0.5 ], [ -1.0, 1.0 ] ]);

  let reflection_C = PH.reflectPath(original_path, "horizontal", 0.5);
  expect(reflection_C).toStrictEqual([ [ 0.5, 0.5 ], [ 0.0, 1.0 ] ]);

  let reflection_D = PH.reflectPath(original_path, "y", 0);
  expect(reflection_D).toStrictEqual([ [ 0.5, -0.5 ], [ 1.0, -1.0 ] ]);

  let reflection_E = PH.reflectPath(original_path, "vertical", 0);
  expect(reflection_E).toStrictEqual([ [ 0.5, -0.5 ], [ 1.0, -1.0 ] ]);

  let reflection_F = PH.reflectPath(original_path, "vertical", 0.5);
  expect(reflection_F).toStrictEqual([ [ 0.5, 0.5 ], [ 1.0, 0.0 ] ]);
});

test('splitPath', () => {

  let path = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ];

  let paths = PH.splitPath(path);

  expect(paths.length).toEqual(path.length-1);
  expect(paths).toStrictEqual([[[0, 0],[1, 0]], [[1, 0],[2, 0]], [[2, 0],[3, 0]]]);
});

test('shearPath', () => {

  let path = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0]
  ];

  expect(PH.shearPath(path, "horizontal", 1)).toStrictEqual([ [ 0, 0 ], [ 1, 1 ], [ 2, 1 ], [ 1, 0 ] ]);
  expect(PH.shearPath(path, "vertical", 1)).toStrictEqual([ [ 0, 0 ], [ 0, 1 ], [ 1, 2 ], [ 1, 1 ] ]);
});

test('rotatePoint', () => {

  const a = [1, 0];
  const b = [0.5, 0];
  const theta = 0.5 * Math.PI;

  const c = [0.5, 0.5];

  expect(PH.rotatePoint(a, theta, b)).toStrictEqual(c);
});

test('rectangle', () => {

  const output = [
    [-0.5, -0.25],
    [ 0.5, -0.25],
    [ 0.5,  0.25],
    [-0.5,  0.25],
    [-0.5, -0.25]
  ];
  PH.rectangle(1, 0.5);

  expect(PH.rectangle(1, 0.5)).toStrictEqual(output);
});

test('extendLine', () => {

  const path = [
    [0, 0],
    [1, 1]
  ];

  let extended_path = PH.extendLine(path[0], path[1], 0, 1);

  let distance = PH.distance(extended_path[0], extended_path[1]);

  expect(distance).toBeCloseTo(2.414, 3);
});

test('extendLine3D', () => {

  const path = [
    [0, 0, 0],
    [1, 1, 1]
  ];

  let extended_path = PH.extendLine(path[0], path[1], 0, 1);

  let distance = PH.distance(extended_path[0], extended_path[1]);

  expect(distance).toBeCloseTo(2.732, 3);
});

test('extendPath', () => {
  // TBD
});

test('lineCircleIntersect', () => {

  const line = [
    [0, 0],
    [1, 1]
  ];

  const circle_params = [
    [0.3, 0],
    0.5
  ];

  let intersections = PH.lineCircleIntersect(line[0], line[1], circle_params);

  // Expect an array of intersection points
  expect(Array.isArray(intersections)).toBe(true);

  // Only proceed if there are intersections
  if (intersections) {

    // Check x and y coordinates separately
    expect(intersections[0][0]).toBeCloseTo(0.4702, 4);
    expect(intersections[0][1]).toBeCloseTo(0.4702, 4);
  }

});

test('parallelPath3D', () => {

  const path = [
    [0, 0, 0],
    [1, 1, 1]
  ];

  const parallel_path = PH.parallelPath(path[0], path[1], 1);

  expect(parallel_path.length).toStrictEqual(2);
  expect(parallel_path[0].length).toStrictEqual(3);
  expect(parallel_path[1].length).toStrictEqual(3);

  let distance = PH.distance(parallel_path[0], path[0]);

  expect(distance).toBeCloseTo(1, 2);

  distance = PH.distance(parallel_path[1], path[1]);

  expect(distance).toBeCloseTo(1, 2);
});

test('parallelPath2D', () => {

  const path = [
    [0, 0],
    [1, 1]
  ];

  const parallel_path = PH.parallelPath(path[0], path[1], 1);

  expect(parallel_path.length).toStrictEqual(2);
  expect(parallel_path[0].length).toStrictEqual(2);
  expect(parallel_path[1].length).toStrictEqual(2);


  let distance = PH.distance(parallel_path[0], path[0]);

  expect(distance).toBeCloseTo(1, 2);

  distance = PH.distance(parallel_path[1], path[1]);

  expect(distance).toBeCloseTo(1, 2);
});

test('splitPathByDistance', () => {

  const path = [
    [-1, 0],
    [ 1, 0]
  ];

  const distance = 0.091;

  const paths = PH.splitPathByDistance(path, distance);

  // Expect a set number of paths based on the overall path
  // length and the max distance
  expect(paths.length).toStrictEqual(
    Math.ceil(PH.pathLength(path) / distance)
  );

  // Expect each path to be of the requested distance (except for the last one)
  for (let i = 0; i < paths.length - 1; i++) {
    expect(PH.pathLength(paths[i])).toBeCloseTo(distance, 5);
  }

  // Expect the last segment to be less than the requested distance
  expect(PH.pathLength(paths[paths.length-1])).toBeLessThan(distance);
});

describe('intersect_point', () => {

  test('returns the intersection of crossing segments', () => {
    expect(PH.intersect_point([0, 0], [2, 2], [0, 2], [2, 0])).toEqual([1, 1]);
  });

  test('returns the intersection when segments meet at an endpoint', () => {
    expect(PH.intersect_point([0, 0], [1, 1], [1, 1], [2, 0])).toEqual([1, 1]);
  });

  test('returns null when the lines would intersect beyond the segments', () => {
    expect(PH.intersect_point([0, 0], [1, 1], [0, 3], [3, 0])).toBeNull();
  });

  test('returns null for parallel segments', () => {
    expect(PH.intersect_point([0, 0], [1, 0], [0, 1], [1, 1])).toBeNull();
  });

  test('returns null for collinear segments (zero denominator)', () => {
    // Both ua and ub evaluate to NaN (0/0) here, which must not be treated as an intersection
    expect(PH.intersect_point([0, 0], [1, 0], [2, 0], [3, 0])).toBeNull();
  });

  test('returns null for collinear overlapping segments', () => {
    expect(PH.intersect_point([0, 0], [2, 0], [1, 0], [3, 0])).toBeNull();
  });

  test('returns null for a zero-length segment', () => {
    expect(PH.intersect_point([1, 1], [1, 1], [0, 0], [2, 2])).toBeNull();
  });
});

describe('getLineLineCollision', () => {

  const pt = (x, y) => ({x, y});

  test('returns the intersection of crossing segments as an {x,y} object', () => {
    expect(PH.getLineLineCollision(pt(0, 0), pt(2, 2), pt(0, 2), pt(2, 0))).toEqual({x: 1, y: 1});
  });

  test('returns false when the segments do not intersect', () => {
    expect(PH.getLineLineCollision(pt(0, 0), pt(1, 1), pt(0, 3), pt(3, 0))).toBe(false);
  });

  test('returns false for parallel segments', () => {
    expect(PH.getLineLineCollision(pt(0, 0), pt(1, 0), pt(0, 1), pt(1, 1))).toBe(false);
  });

  test('returns false for collinear segments rather than an {x: NaN, y: NaN} object', () => {
    expect(PH.getLineLineCollision(pt(0, 0), pt(1, 0), pt(2, 0), pt(3, 0))).toBe(false);
  });
});

test('removeKnots keeps a path without knots unchanged', () => {
  const path = [[0, 0], [1, 0.1], [2, 0], [3, 0.1], [4, 0]];
  expect(PH.removeKnots(path)).toStrictEqual(path);
});

test('removeKnots cuts out a loop at the intersection', () => {
  // The last segment crosses the first one at [2, 0]
  const path = [[0, 0], [4, 0], [4, 1], [2, 1], [2, -1], [3, -1]];
  const result = PH.removeKnots(path);
  // The loop is cut out, and the crossing segment still runs to its end point
  expect(result).toStrictEqual([[0, 0], [2, 0], [2, -1], [3, -1]]);
});

test('offsetPath with prevent_knots does not add points', () => {
  const path = [];
  for (let i = 0; i < 200; i++) {
    path.push([i * 0.01, 0.003 * Math.sin(i * 0.7)]);
  }
  const offset = PH.offsetPath(path, 0.01, true);
  expect(offset.length).toBeLessThanOrEqual(path.length);
});

test('offsetAngle without a miter limit is unchanged', () => {
  const result = PH.offsetAngle([0, 0], [1, 0], [2, 0], 0.1);
  expect(result.length).toBe(3);
  expect(result[1][0]).toBeCloseTo(1);
  expect(Math.abs(result[1][1])).toBeCloseTo(0.1);
});

test('offsetAngle bevels a corner beyond the miter limit', () => {
  // A hairpin: A and B are both almost straight back along the same line from C
  const A = [0, 0], C = [1, 0], B = [0, 0.01];
  const unlimited = PH.offsetAngle(A, C, B, 0.1);
  expect(Math.hypot(unlimited[1][0] - C[0], unlimited[1][1] - C[1])).toBeGreaterThan(1);

  const beveled = PH.offsetAngle(A, C, B, 0.1, 3);
  expect(beveled.length).toBe(4);
  // Both corner points are the offset distance from the vertex
  expect(Math.hypot(beveled[1][0] - C[0], beveled[1][1] - C[1])).toBeCloseTo(0.1);
  expect(Math.hypot(beveled[2][0] - C[0], beveled[2][1] - C[1])).toBeCloseTo(0.1);
});

test('offsetAngle keeps a corner within the miter limit', () => {
  const result = PH.offsetAngle([0, 0], [1, 0], [2, 1], 0.1, 3);
  expect(result.length).toBe(3);
});

test('offsetPath with a miter limit keeps a noisy line bounded', () => {
  let path = [];
  for (let i = 0; i < 300; i++) {
    path.push([i * 0.006, 0.003 * Math.sin(i * 1.3) + 0.002 * Math.cos(i * 0.4)]);
  }
  for (let j = 0; j < 60; j++) {
    path = PH.offsetPath(path, -0.003, true, 4);
  }
  const xs = path.map((p) => p[0]);
  // The line spans 0 to about 1.8; without a limit it ends up hundreds of units wide
  expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(5);
});


describe('cropToShape: segments crossing the crop border', () => {

  // Crop shapes are closed paths (first point repeated as the last point)
  const square = [[0,0],[10,0],[10,10],[0,10],[0,0]];
  const big = [[0,0],[100,0],[100,100],[0,100],[0,0]];

  // Compare cropped paths allowing for floating point noise in computed intersections
  const expectPaths = (actual, expected) => {
    expect(actual.length).toBe(expected.length);
    actual.forEach((path, i) => {
      expect(path.length).toBe(expected[i].length);
      path.forEach((point, j) => {
        expect(point[0]).toBeCloseTo(expected[i][j][0], 9);
        expect(point[1]).toBeCloseTo(expected[i][j][1], 9);
      });
    });
  };

  // ---- Exiting: start point inside (or on) the border, end point outside ----

  test('exit: start well inside the shape', () => {
    expectPaths(PH.cropToShape([[[5,5],[5,20]]], square), [
      [[5,5],[5,10]]
    ]);
  });

  test('exit: start 0.3 inside an edge that the segment does not cross', () => {
    expectPaths(PH.cropToShape([[[5,0.3],[5,20]]], square), [
      [[5,0.3],[5,10]]
    ]);
  });

  test('exit: start 0.1 inside an edge that the segment does not cross', () => {
    // The segment leaves through the top edge. The bottom edge is only nearby.
    expectPaths(PH.cropToShape([[[5,0.1],[5,20]]], square), [
      [[5,0.1],[5,10]]
    ]);
  });

  test('exit: start 0.005 inside an edge that the segment does not cross', () => {
    expectPaths(PH.cropToShape([[[5,0.005],[5,20]]], square), [
      [[5,0.005],[5,10]]
    ]);
  });

  test('exit: nearby-edge tolerance does not grow with edge length', () => {
    // 100-unit edges; start is 0.5 inside the bottom edge
    expectPaths(PH.cropToShape([[[50,0.5],[50,200]]], big), [
      [[50,0.5],[50,100]]
    ]);
  });

  test('exit: start exactly on the bottom edge, crossing to the top edge', () => {
    expectPaths(PH.cropToShape([[[5,0],[5,20]]], square), [
      [[5,0],[5,10]]
    ]);
  });

  test('exit: start exactly on the right edge, crossing to the left edge', () => {
    expectPaths(PH.cropToShape([[[10,5],[-5,5]]], square), [
      [[10,5],[0,5]]
    ]);
  });

  test('exit: start on the border and moving outward keeps the touch point', () => {
    // Legacy behavior: a degenerate zero-length segment at the border
    expectPaths(PH.cropToShape([[[10,5],[15,5]]], square), [
      [[10,5],[10,5]]
    ]);
  });

  // ---- Exiting, with points inside the border tolerance ----

  test('exit: start slightly outside the border (within tolerance) but crossing through the shape', () => {
    // 0.005 outside the right edge, which is close enough to count as inside.
    // The segment passes through the shape and leaves by the left edge, so it
    // should not be cut off at the right edge that it starts beside.
    expectPaths(PH.cropToShape([[[10.005,5],[-5,5]]], square), [
      [[10.005,5],[0,5]]
    ]);
  });

  test('exit: end slightly outside the border, within the tolerance of the crossing', () => {
    // The end is 0.03 past the left edge. The stretch beyond the crossing is
    // still within tolerance of the border, but the segment does leave.
    expectPaths(PH.cropToShape([[[5,5],[-0.03,5]]], square), [
      [[5,5],[0,5]]
    ]);
  });

  // ---- Entering: start point outside, end point inside ----

  test('enter: start well outside the shape', () => {
    expectPaths(PH.cropToShape([[[5,-5],[5,5]]], square), [
      [[5,0],[5,5]]
    ]);
  });

  test('enter: start 0.1 outside the shape', () => {
    expectPaths(PH.cropToShape([[[5,-0.1],[5,5]]], square), [
      [[5,0],[5,5]]
    ]);
  });

  test('enter: start on the border but classified outside (negative threshold)', () => {
    expectPaths(PH.cropToShape([[[5,0],[5,5]]], square, -0.0001), [
      [[5,0],[5,5]]
    ]);
  });

});
