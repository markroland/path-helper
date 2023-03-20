function polygon(){

  // Create new class object
  const PH = new PathHelper();

  // Draw a 6-sided polygon of radius 100
  let path = PH.polygon(6, 100);

  // Center path on canvas
  path = PH.translatePath(path, [canvas.width/2, canvas.height/2]);

  // Draw the path to the canvas
  draw([path]);
}