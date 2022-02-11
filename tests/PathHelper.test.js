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
