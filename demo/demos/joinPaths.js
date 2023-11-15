function joinPaths() {

  // Create new class object
  const PH = new PathHelper();

  const side = 100;
  const gap = 20;

  let paths = [
    [
      [0.0, 0.0],
      [side - gap, 0.0],
    ],
    [
      [side, 0],
      [side, side],
    ],
    [
      [0, side],
      [side - gap, side],
    ],
    [
      [0, gap],
      [0, side - gap],
    ]
  ];

  // Center on canvas
  paths = paths.map(function(path) {
    return PH.translatePath(path, [
      canvas.width/2 - (side / 2),
      canvas.height/2 - (side / 2)
    ]);
  });

  // Lines shouldn't connect when gap < join_threshold
  let join_threshold = 10;
  let joined_paths = PH.joinPaths(paths, join_threshold);

  // Lines should connect when gap < join_threshold
  // let join_threshold = 10;
  // let joined_paths = PH.joinPaths(paths, join_threshold);

  // Draw the path to the canvas
  draw(paths);
}