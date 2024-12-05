function filterPath() {

	// Create new class object
	const PH = new PathHelper();

	let paths = [];

	path = PH.polygon(120, 100);

	// Remove every-other point
    let filtered_paths = PH.filterPath(path, function(point, i) {

			if (i % 10 == 0) {
			return true;
			}
			return false;
		},
		true
	);

	// Remove points above the X axis
    filtered_paths = PH.filterPaths(filtered_paths, function(point, i) {
			if (point[1] >= 0) {
				return true;
			}
			return false;
		}
	);

	paths = paths.concat(filtered_paths);

	// Center on canvas
	paths = paths.map(function(path) {
	  return PH.translatePath(path, [
		canvas.width/2,
		canvas.height/2
	  ]);
	});

	// Draw the path to the canvas
	draw(paths);
  }