function chaikinCurve(){

  // Create new class object
  const PH = new PathHelper();

  // Set original path points
  const originalPath = [

    // Closed
    [0, 0],
    [0, 100],
    [100, 100],
    [100, 0],
    [0, 0],

    // Open
    // [0, 0],
    // [100, 0],
    // [0, 100],
    // [100, 100]
  ];

  // Draw a Chaikin Curve
  let path = PH.chaikinCurve(originalPath, 3);

  // Draw the path to the canvas
  draw([path]);
}