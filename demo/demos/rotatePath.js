function rotatePath(){

  // Create new class object
  const PH = new PathHelper();

  // Draw a 6-sided polygon of radius 100
  let path = PH.polygon(4, 100, 0.25 * Math.PI);

  // Move to top-left of canvas
  const path_info = PH.info(path);
  const top_left = path_info.min;
  path = PH.translatePath(path, [-top_left[0], -top_left[1]]);

  // Rotate around shape's bottom-right corner
  const new_path_info = PH.info(path);
  const bottom_right = new_path_info.max;
  console.log(bottom_right);

  // Rotate 22.5 degrees clockwise
  path = PH.rotatePath(path, 0.125 * Math.PI, bottom_right);

  // Draw the path to the canvas
  draw([path]);
}