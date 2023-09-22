function smoothPath() {

  // Set seed from URL
  let seed = 0;
  const urlParams = new URLSearchParams(window.location.search);
  seed = parseInt(urlParams.get('seed'));
  console.log("Seed: " + seed);

  // Create new class object
  let prng = mulberry32(seed);
  const PH = new PathHelper(prng);

  let paths = [];

  let path;

  // Line
  path = [
    [-200, 0],
    [ 200, 0]
  ];

  // Curve
  path = PH.quadraticBezierPath(
    [-200, 0],
    [0, -200],
    [ 200, 0],
    60
  );

  // Polygon
  // path = PH.polygon(12, 100);

  // Get distance of path for breaking into smaller segments
  let path_distance = PH.pathLength(path);

  // Add noise
  let noisy_path = PH.noisify(
    path,
    (1/20) * path_distance,
    (1/20) * path_distance,
    false,
    PH.closedPath(path),
    0,
    0,
    true,
    false
  );

  // Initialize a smoothed path
  let smoothed_noisy_path = noisy_path;

  // Smooth path
  // const smooth_boundary = "preserve"; // Same as original
  // const smooth_boundary = "weight";
  // const smooth_boundary = "extrapolate";
  // const smooth_boundary = "trim";
  const smooth_boundary = "other";
  console.log(smooth_boundary);
  try {
    smoothed_noisy_path = PH.smoothPath(smoothed_noisy_path, 3, smooth_boundary);
    smoothed_noisy_path = PH.smoothPath(smoothed_noisy_path, 7, smooth_boundary);
    smoothed_noisy_path = PH.smoothPath(smoothed_noisy_path, 7, smooth_boundary);
    // smoothed_noisy_path = PH.smoothPath(smoothed_noisy_path, 7, smooth_boundary);
    // smoothed_noisy_path = PH.smoothPath(smoothed_noisy_path, 7, smooth_boundary);
  } catch (e) {
    console.log(e);
  }

  // Center path on canvas
  smoothed_noisy_path = PH.translatePath(smoothed_noisy_path, [canvas.width/2, canvas.height/2]);

  // Draw the path to the canvas
  draw([smoothed_noisy_path]);
}