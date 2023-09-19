function reflectPath(){

  // Create new class object
  const PH = new PathHelper();

  // Draw a 6-sided polygon of radius 100
  let path = [
    [10, -10],
    [100, -100]
  ];

  // Rotate 22.5 degrees clockwise
  // path = PH.reflectPath(path, "y");
  path = PH.reflectPath(path, "vertical", 20);

  path = PH.reflectPath(path, "horizontal", 55);

  // Draw the path to the canvas
  draw([path]);
}