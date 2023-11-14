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

test('clamp', () => {
  const min = 0;
  const max = 100;
  expect(PH.clamp(10, min, max)).toStrictEqual(10);
  expect(PH.clamp(-10, min, max)).toStrictEqual(min);
  expect(PH.clamp(110, min, max)).toStrictEqual(max);
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