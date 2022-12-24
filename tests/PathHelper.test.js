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
