function selfIntersectingPath() {

  // Create new class object
  const PH = new PathHelper();

  let paths = [];

  let path = [
    [-200, 0],
    [-100, -100],
    [0, -100],
    [100, 0],
    [0, 100],
    [-50, 0],
    [-50, -110]
  ];

  // Center path on canvas
  path = PH.translatePath(path, [canvas.width/2, canvas.height/2]);

  // console.log(PH.selfIntersectingPath(path));

  console.log(PH.selfIntersectingPathRecursive(path));

  paths.push(path);

  // Draw the path to the canvas
  draw(paths);
}