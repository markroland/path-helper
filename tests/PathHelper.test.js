const PathHelper = require('./../src/PathHelper.js');

const PH = new PathHelper();

test('getMin', () => {
  let path = [
    [-2,  1],
    [ 4,  1],
    [ 4, -3],
    [-2, -3]
  ];
  expect(PH.getMin(path)).toStrictEqual([-2, -3]);
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