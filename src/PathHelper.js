/**
 * PathHelper class
 * @author Mark Roland
 * @license Creative Commons Attribution-ShareAlike 4.0 International License
 */
class PathHelper {

  /**
   * Get information about a 2D path
   * @param {array} path - A path
   * @returns {object} An object with information about the object
   * including its X/Y dimension range and center point
   */
  info(path) {
    let results = {
      "min": this.getMin(path),
      "max": this.getMax(path)
    };
    results.range = [
      results.max[0] - results.min[0],
      results.max[1] - results.min[1]
    ];
    results.center = [
      results.min[0] + results.range[0]/2,
      results.min[1] + results.range[1]/2
    ];
    return results;
  }

  /**
   * Create a deep copy of a JavaScript array/object
   * @param {array|object} a - The thing to be copied
   * @returns {array|object} An independent copy of the input value
   **/
  deepCopy(a) {
    return JSON.parse(JSON.stringify(a));
  }

  /**
   * Get the minimum value from each coordinate compononent of a path
   * Supports 2D and 3D.
   * @param {array} path - A Path array
   * @returns {array} An array with the minimum value for each dimension
   **/
  getMin(path) {
    let x_coordinates = this.arrayColumn(path, 0);
    let y_coordinates = this.arrayColumn(path, 1);
    if (path[0].length === 3) {
      let z_coordinates = this.arrayColumn(path, 2);
      return [
        this.arrayMin(x_coordinates),
        this.arrayMin(y_coordinates),
        this.arrayMin(z_coordinates)
      ];
    }
    return [
      this.arrayMin(x_coordinates),
      this.arrayMin(y_coordinates),
    ];
  }

  /**
   * Get the maximum value from each coordinate compononent of a path
   * Supports 2D and 3D.
   * @param {array} path - A Path array
   * @returns {array} An array with the maximum value for each dimension
   **/
  getMax(path) {
    let x_coordinates = this.arrayColumn(path, 0);
    let y_coordinates = this.arrayColumn(path, 1);
    if (path[0].length === 3) {
      let z_coordinates = this.arrayColumn(path, 2);
      return [
        this.arrayMax(x_coordinates),
        this.arrayMax(y_coordinates),
        this.arrayMax(z_coordinates)
      ];
    }
    return [
      this.arrayMax(x_coordinates),
      this.arrayMax(y_coordinates),
    ];
  }

  /**
   * Calculate the cross product of A and B
   * @param {array} a - A 3D Vector (an Array consisting of three Numbers)
   * @param {array} b - A 3D Vector (an Array consisting of three Numbers)
   * @returns {array} The Cross Product of A cross B (an Array consisting of three Numbers)
   */
  crossProduct(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }

  /**
   * Get the Bounding Box coordinates for a 2D or 3D path
   * @param {array} path - A Path array
   * @returns {array} A multidimensional array with the minimum and maximum values for each dimension
   **/
  boundingBox(path) {
    let mins = this.getMin(path);
    let maxs = this.getMax(path);
    let bbox = [
      [mins[0], maxs[0]],
      [mins[1], maxs[1]]
    ];

    if (mins.length === 3 && maxs.length === 3) {
      bbox.push([mins[2], maxs[2]]);
    }

    return bbox;
  }

  /**
   * Get the smallest number from an array
   * @param {array} a - An array of numbers
   * @returns {number} The smallest number from the input
   **/
  arrayMin(a) {
    return Math.min(...a);
  }

  /**
   * Get the largest number from an array
   * @param {array} a - An array of numbers
   * @returns {number} The largest number from the input
   **/
  arrayMax(a) {
    return Math.max(...a);
  }

  /**
   * Convert Degrees to Radians
   * @param {number} degrees
   * @returns {number} The input number represented in units of Radians
   **/
  degreesToRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  /**
   * Convert Radians to Degrees
   * @param {number} radians
   * @returns {number} The input number represented in units of Degrees
   **/
  radiansToDegrees(radians) {
    return radians * (180/Math.PI);
  }

  /**
   * Calculate the Greatest Common Divisor (or Highest Common Factor) of 2 numbers
   *
   * https://en.wikipedia.org/wiki/Greatest_common_divisor
   * https://www.geeksforgeeks.org/c-program-find-gcd-hcf-two-numbers/
   *
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  greatestCommonDivisor(a, b) {
    if (b == 0) {
      return a;
    }
    return this.greatestCommonDivisor(b, a % b);
  }

  /**
   * Determine if two lines are equivalent
   * @param {array} a - A path containing two points
   * @param {array} b - A path containing two points
   * @param {number} [threshold=0] -  A maximum distance points can be apart and considered equal
   * @returns {boolean} True if the same, false otherwise
   */
  lineEquals(a, b, threshold = 0) {
    if (this.pointEquals(a[0], b[0], threshold) && this.pointEquals(a[1], b[1], threshold)) {
      return true;
    }
    return false;
  }

  /**
   * Determine if two points are equivalent (coincident)
   * @param {array} a - A point array containing two values for x and y
   * @param {array} b - A point array containing two values for x and y
   * @param {number} [threshold=0] - A maximum distance points can be apart and considered equal
   * @returns {boolean} True if the same, false otherwise
   */
  pointEquals(a, b, threshold = 0) {
    if (threshold === 0 && a[0] === b[0] && a[1] === b[1]) {
      return true;
    } else if (this.distance(a, b) <= threshold) {
      return true;
    }
    return false;
  }

  /**
   * Get a Random Integer (whole number) between two values (inclusive)
   * Reference: https://www.w3schools.com/js/js_random.asp
   * @param {number} min - The lower bound of acceptable values
   * @param {number} max - The upper bound of acceptable values
   * @return {number} - A randomly selected number
   */
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Get a Random Number between two values (inclusive)
   * @param {number} min - The lower bound of acceptable values
   * @param {number} max - The upper bound of acceptable values
   * @return {number} - A randomly selected number
   */
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Get a Random number within a Gaussian Distribution probability
   * From Stack Overflow - https://stackoverflow.com/a/49434653
   * Currently unverified
   * @param {number} [u=0] - Should be left at zero
   * @param {number} [v=0] - Should be left at zero
   * @return {number} - A randomly selected number
   */
  getGaussianRandom(u = 0, v = 0) {
    while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) {
      // resample between 0 and 1
      return this.getGaussianRandom();
    }
    return num;
  }

  /**
   * Map a value from one scale to another scale
   * @param {number} value - The value to be mapped
   * @param {number} in_min - The minimum value on the current scale
   * @param {number} in_max - The maximum value on the current scale
   * @param {number} out_min - The minimum value on the new scale
   * @param {number} out_max - The maximum value on the new scale
   * @return {number} - The mapped value
   */
  map (value, in_min, in_max, out_min, out_max) {
    // Shift negative values up into positive range
    if (in_min < 0 || in_max < 0) {
      in_max = in_max + -in_min;
      value = value + -in_min;
      in_min = in_min + -in_min;
    }
    return out_min + (out_max - out_min) * ((value - in_min) / (in_max - in_min));
  }

  /**
   * Perform a linear interpolation between two value
   * @param {number} beginning - The start of the scale
   * @param {number} end - The end of the scale
   * @param {number} percent - The percentage (0.0 to 1.0) to be selected along the input range
   * @return {number} - The interpolated value
   **/
  lerp(beginning, end, percent) {
    return beginning + (end - beginning) * percent;
  }

  /**
   * Create a regular convex polygon centered at the origin
   * @param {number} sides - The number of sides for the shape
   * @param {number} radius - The radius of the shape - the distance from the center to a vertex
   * @param {number} [rotation=0] - An optional rotation to be applied to the shape
   * @return {array} - An array of Points for the vertices of the shape. The first
   * and last points will overlap to create a closed path.
   **/
  polygon(sides, radius, rotation = 0) {
    let polygon = [];
    let polygon_theta = 0.0;
    for (let a = 0; a <= sides; a++) {
      polygon_theta = (a/sides) * (2 * Math.PI);
      polygon.push([
        radius * Math.cos(polygon_theta + rotation),
        radius * Math.sin(polygon_theta + rotation)
      ]);
    }
    return polygon;
  }

  /**
   * Create a regular star polygon centered at the origin
   * @param {number} [star_points=5] - The number of points to the star
   * @param {number} [outer_radius=1.0] - The distance from the center to the outer points
   * @param {number} [inner_radius=0] - The distance from the center to the concave points
   * @return {array} - An array of Points for the vertices of the shape. The first
   * and last points will overlap to create a closed path.
   **/
  star(star_points = 5, outer_radius = 1.0, inner_radius = 0.5) {

    let shape = [];

    let i_max = star_points * 2;
    for (let i = 0; i < i_max; i++) {

      let radius = outer_radius;
      let theta = (i / i_max) * 2 * Math.PI;

      // Inner point
      if (i % 2 == 1) {
        radius = inner_radius;
      }

      shape.push([
        radius * Math.cos(theta),
        radius * Math.sin(theta)
      ]);
    }

    // Close shape
    shape.push(shape[0]);

    return shape;
  }

  /**
   * Create a parabola path
   * @param {number} focus - The focal distance of the parabola
   * @param {number} width - The width of the parabola to return
   * @param {number} segments - The number of segments to use to describe
   * the path. A higher number increases the smoothness of the path.
   * @return {array} - An array of Points defining a Path
   **/
  parabola(focus, width, segments) {
    let path = [];
    for (let a = 0; a <= segments; a++) {
      let x = this.map(a, 0, segments, -width/2, width/2);
      let y = focus * Math.pow(x,2);
      path.push([x,y]);
    }
    return path;
  }

  /**
   * Calculate the location where two lines (p1-to-p2 and p3-to-p4) intersect
   * Copied from https://editor.p5js.org/mwburke/sketches/h1ec1s6LG
   * @param {array} p1 - Starting point of Line A
   * @param {array} p2 - Ending point of Line A
   * @param {array} p3 - Starting point of Line B
   * @param {array} p4 - Ending point of Line B
   * @return {array} - An array defining a point of intersection
   **/
  intersect_point(p1, p2, p3, p4) {
    const ua = ((p4[0] - p3[0]) * (p1[1] - p3[1]) -
      (p4[1] - p3[1]) * (p1[0] - p3[0])) /
      ((p4[1] - p3[1]) * (p2[0] - p1[0]) -
      (p4[0] - p3[0]) * (p2[1] - p1[1]));

    const ub = ((p2[0] - p1[0]) * (p1[1] - p3[1]) -
      (p2[1] - p1[1]) * (p1[0] - p3[0])) /
      ((p4[1] - p3[1]) * (p2[0] - p1[0]) -
      (p4[0] - p3[0]) * (p2[1] - p1[1]));

    const x = p1[0] + ua * (p2[0] - p1[0]);
    const y = p1[1] + ua * (p2[1] - p1[1]);

    return [x, y];
  }

  /**
   * Calculate if and where two finite line segments intersect
   * From https://stackoverflow.com/a/30159167
   * @param {array} p0 - A point array containing two values for x and y. Start Point of Line A
   * @param {array} p1 - A point array containing two values for x and y. End Point of Line A
   * @param {array} p2 - A point array containing two values for x and y. Start Point of Line B
   * @param {array} p3 - A point array containing two values for x and y. End Point of Line B
   * @returns Boolean True if the lines intersect, false otherwise
   */
  getLineLineCollision(p0, p1, p2, p3) {

    var s1, s2;
    s1 = {x: p1.x - p0.x, y: p1.y - p0.y};
    s2 = {x: p3.x - p2.x, y: p3.y - p2.y};

    var s10_x = p1.x - p0.x;
    var s10_y = p1.y - p0.y;
    var s32_x = p3.x - p2.x;
    var s32_y = p3.y - p2.y;

    var denom = s10_x * s32_y - s32_x * s10_y;

    if(denom === 0) {
        return false;
    }

    var denom_positive = denom > 0;

    var s02_x = p0.x - p2.x;
    var s02_y = p0.y - p2.y;

    var s_numer = s10_x * s02_y - s10_y * s02_x;

    if((s_numer < 0) == denom_positive) {
        return false;
    }

    var t_numer = s32_x * s02_y - s32_y * s02_x;

    if((t_numer < 0) == denom_positive) {
        return false;
    }

    if((s_numer > denom) == denom_positive || (t_numer > denom) == denom_positive) {
        return false;
    }

    var t = t_numer / denom;

    var p = {x: p0.x + (t * s10_x), y: p0.y + (t * s10_y)};
    return p;
  }

  /**
   * Calculate the distance between two points in 2D or 3D space
   * @param {array} p1 - A Point array containing two values for x and y. End Point of Line A
   * @param {array} p2 - A Point array containing two values for x and y. Start Point of Line B
   * @returns {number} - The distance between the two points
   */
  distance(p1, p2) {
    if (p1.length == 2) {
      p1.push(0);
    }
    if (p2.length == 2) {
      p2.push(0);
    }
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));
  }

  /**
   * Calculate the total distance of a path of two or more points
   * @param {array} path - A Path array
   * @returns {number} - The total distance of the path
   */
  pathLength(path) {
    let distance = 0.0;
    for (let i = 0; i < path.length-1; i++) {
      distance += this.distance(path[i], path[i+1]);
    }
    return distance;
  }

  parallelPath(p1, p2, offset_amount) {

    // Calculate the slope of the line AB as an angle
    let delta_y = p2[1] - p1[1];
    let delta_x = p2[0] - p1[0];
    let theta = Math.atan2(delta_y, delta_x);

    // Line A is a line perpendicular to the line AB, starting
    // at point A
    let line_A = [
      p1,
      [
        p1[0] + offset_amount * Math.cos(theta + Math.PI/2),
        p1[1] + offset_amount * Math.sin(theta + Math.PI/2)
      ]
    ];

    // Line B is a line perpendicular to the line BA, starting
    // at point B
    let line_B = [
      p2,
      [
        p2[0] + offset_amount * Math.cos(theta + Math.PI/2),
        p2[1] + offset_amount * Math.sin(theta + Math.PI/2)
      ]
    ];

    // Use the endpoints from Lines A and B to construct
    // a new line that is parallel to AB
    return [line_A[1], line_B[1]];
  }

  /**
   * Expand a Path
   * @param Array An array of points
   * @param number The expansion offset at the start of the path
   * @param number the expansion offset at the end of the path
   * @param String The Cap style at the end of the line: 'open', 'flat', 'round'
   * @returns Array A multidimensional array of one or more paths. "open" has 2 paths
   * while "flat" and "round" is one continuous path.
   **/
  expandPath(path, offset_start, offset_end, capStyle = 'open') {

    let parallels = [];
    let parallel = [];
    let parallel_segment;
    let offset = offset_start;
    let i_max = path.length-1;

    // Outer
    parallel = [];
    for (let i = 0; i < i_max; i++) {
      offset = offset_start + (offset_end - offset_start) * (i/i_max);
      parallel_segment = this.parallelPath(path[i], path[i+1], offset);
      parallel.push(parallel_segment[0]);
    }

    // Push the last point
    parallel_segment = this.parallelPath(path[path.length-2], path[path.length-1], offset_end);
    parallel.push(parallel_segment[1]);

    parallels.push(parallel);

    // Inner
    parallel = [];
    for (let i = 0; i < i_max; i++) {
      offset = offset_start + (offset_end - offset_start) * (i/i_max);
      parallel_segment = this.parallelPath(path[i], path[i+1], -offset);
      parallel.push(parallel_segment[0]);
    }

    // Push the last point
    parallel_segment = this.parallelPath(path[path.length-2], path[path.length-1], -offset_end);
    parallel.push(parallel_segment[1]);

    parallels.push(parallel);

    let output;
    switch (capStyle) {
      case 'flat':
        output = parallels[0].concat(parallels[1].reverse());
        output.push(parallels[0][0]);
        return [output];
      case 'round':
        parallels[1].reverse();

        output = parallels[0];

        // Cap
        output = output.concat(this.arcPointToPoint(
            parallels[0][parallels[0].length-1][0],
            parallels[0][parallels[0].length-1][1],
            parallels[1][0][0],
            parallels[1][0][1],
            -Math.PI,
            6
          )
        );

        output = output.concat(parallels[1]);

        // Cap
        output = output.concat(this.arcPointToPoint(
            parallels[1][parallels[1].length-1][0],
            parallels[1][parallels[1].length-1][1],
            parallels[0][0][0],
            parallels[0][0][1],
            -Math.PI,
            6
          )
        );

        // Last point
        output.push(parallels[0][0]);

        return [output];
      default:
        return parallels;
    }
  }

  /**
   * Offset a Path
   * @param Array An array of points
   * @param number the offset distance of the path. A negative number
   * represents an "inside" offset for an acute angle ACB
   * @returns Array A multidimensional path array of points
   **/
  offsetPath(path, offset) {

    let offset_path = [];

    // Create a copy so that elements can be removed without
    // effecting source array
    let source_path = JSON.parse(JSON.stringify(path));

    if (this.distance(source_path[0], source_path[source_path.length-1]) < 0.0001) {

      // Closed path ("shape")

      // Remove the last point if the first and last points are the same (or very close)
      // This is required for closed shapes
      source_path.pop();

      // Loop through points and calculate the offset for the next 2 line segments
      for (let i = 0; i < source_path.length; i++) {
        let j = (i + 1) % source_path.length;
        let k = (i + 2) % source_path.length;
        let offset_angle = this.offsetAngle(source_path[i], source_path[j], source_path[k], -offset);
        offset_path.push(offset_angle[1]);
      }

      // Close path by adding first point
      offset_path.push(offset_path[0]);

    } else {

      // Open path
      for (let i = 0; i <= source_path.length-3; i++) {
        let j = i + 1;
        let k = i + 2;
        let offset_angle = this.offsetAngle(source_path[i], source_path[j], source_path[k], -offset);

        if (i === 0) {
          offset_path.push(offset_angle[0]);
          offset_path.push(offset_angle[1]);
        } else if (i === source_path.length-3) {
          offset_path.push(offset_angle[1]);
          offset_path.push(offset_angle[2]);
        } else {
          offset_path.push(offset_angle[1]);
        }
      }
    }

    if (isNaN(offset_path[offset_path.length-1][0])) {
      console.log("NaN Error");
      console.log(offset_path);
    }

    return offset_path;
  }

  /**
   * Offset a path of 3 points
   *
   * INTENDED TO BE PRIVATE METHOD OF CLASS
   *
   *    (A: p1)
   *      /
   *     /
   *    /________
   *   (C: p2)   (B: p3)
   *
   *
   * @param Array Point 1. Endpoint "A"
   * @param Array Point 2. Midpoint/Vertex "C"
   * @param Array Point 3. Endpoint "B"
   * @param number the offset distance of the path. A negative number
   * represents an "inside" offset for an acute angle ACB
   * @returns Array A path array
   **/
  offsetAngle(p1, p2, p3, offset) {

    // Define the distances of the sides of the triangle
    let a = this.distance(p2, p3);
    let b = this.distance(p1, p2);
    let c = this.distance(p3, p1);

    // Use the Law of Cosines to calculate the angle ACB
    let acos_arg = (
      (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2))
      /
      (2 * a * b)
    );

    // Round to a high, but reasonable level of precision
    // to avoid errors at very obtuse angles (nearing 180 degrees)
    acos_arg = acos_arg.toFixed(8);
    if (Math.abs(acos_arg) > 1) {
      console.log("Invalid acos() argument: " + acos_arg);
    }

    // Gamma angle in radians. This is the angle of ACB
    let gamma = Math.acos(acos_arg);

    // Calculate the distance that the side AC (or CB)
    // must be extended (or subtracted) in order to turn
    // around (or inside) vertex C
    let corner_offset = offset * Math.tan(Math.PI/2 - (0.5 * gamma));

    // Calculate the parallel offset path from point 1 to 2 (Side AC)
    let AC_offset = this.parallelPath(p1, p2, offset);

    // Compute the Cross Product of the vector CA with vector CB
    // to determine if the parallel path is on the interior or
    // exterior of the angle. If the magnitude of the cross product
    // is negative, then invert the corner offset magnitude.
    let vector_a = [
      p1[0] - p2[0],
      p1[1] - p2[1],
      0
    ];
    let vector_b = [
      p3[0] - p2[0],
      p3[1] - p2[1],
      0
    ];
    let cross_product = this.crossProduct(vector_a, vector_b);
    if (cross_product[2] < 0) {
      corner_offset = corner_offset * -1;
    }

    // Extend/Reduce the line by the Corner Offset distance
    AC_offset = this.extendLine(AC_offset[0], AC_offset[1], 0, corner_offset);

    // Calculate the parallel offset path from point 2 to 3 (Side CB)
    let CB_offset = this.parallelPath(p2, p3, offset);

    // Combine the 2 offset sides to get the new path
    let expanded_path = AC_offset;
    expanded_path.push(CB_offset[1]);

    return expanded_path;
  }

  extendLine(A, B, deltaA, deltaB) {

    // let lineSlope = this.lineSlopeIntercept(A, B);

    let theta = Math.atan2(B[1] - A[1], B[0] - A[0]);

    // console.log("Angle (Degrees): ", (theta * 180 / Math.PI).toFixed(2));

    let new_A = [
      A[0] - (deltaA * Math.cos(theta)),
      A[1] - (deltaA * Math.sin(theta)),
    ];

    let new_B = [
      B[0] + (deltaB * Math.cos(theta)),
      B[1] + (deltaB * Math.sin(theta)),
    ];

    return [new_A, new_B];
  }

  /**
   * Smooth the corners on a Path based on percentages
   * @param Array An array of points representing the path to be modified
   * @param number A value from 0 to 1. A sharpness of 0 represents the maximum amount of curvature
   * possible between adjacent points. A sharpness of 1 represents no change
   */
  smoothCorners(path, sharpness) {

    // This is somewhat arbitrary. A larger value is needed for larger paths
    const bezier_segments = 20;

    // Don't exceed limits
    if (sharpness >= 1) {
      return path;
    }

    if (sharpness < 0) {
      sharpness = 0;
    }

    // Map Sharpness to bend
    // Bend should range from >= 0.5 to < 1 so that
    // the path can be C2 continuous
    // Where 0.5 is the broadest bend and 1 is no bend
    let bend = this.map(sharpness, 0, 1, 0.5, 1);

    // Loop through all points
    // First point won't have a bend
    let new_path = [];
    new_path.push(path[0]);
    for (let i = 1; i < path.length - 1; i++) {

      // Create variables that are easier to read
      let op_p1 = path[i-1];
      let op_p2 = path[i];
      let op_p3 = path[i+1];

      // Calculate points at which the bezier should start/end
      let p1_bend = [
        this.lerp(op_p1[0], op_p2[0], bend),
        this.lerp(op_p1[1], op_p2[1], bend),
      ];
      let p2_bend = [
        this.lerp(op_p3[0], op_p2[0], bend),
        this.lerp(op_p3[1], op_p2[1], bend),
      ];

      // Add curve
      let bezier = this.cubicBezierPath(
        p1_bend,
        op_p2,
        op_p2,
        p2_bend,
        bezier_segments
      );

      // Remove last point if bend is 0.5
      // In this case the end point of the current curve
      // matches the beginning point of the next curve
      if (bend === 0.5) {
        bezier.pop();
      }

      new_path = new_path.concat(bezier);
    }

    // Last point won't have a bend
    new_path.push(path[path.length - 1]);

    return new_path;
  }

  /**
   * Smooth the corners on a Path based on a radius distance
   * @param Array An array of points representing the path to be modified
   * @param number A numeric radius to apply to the corner
   */
  radiusCorners(path, radius) {

    const bezier_segments = 20;

    // Loop through all points
    // First point won't have a bend
    let new_path = [];
    new_path.push(path[0]);
    for (let i = 1; i < path.length - 1; i++) {

      // Create variables that are easier to read
      let p1 = path[i-1];
      let p2 = path[i];
      let p3 = path[i+1];

      // Calculate points at which the bezier should start/end
      let distance_p1_p2 = this.distance(p1, p2);
      let p1_bend = [
        this.lerp(p1[0], p2[0], (distance_p1_p2 - radius) / distance_p1_p2),
        this.lerp(p1[1], p2[1], (distance_p1_p2 - radius) / distance_p1_p2),
      ];

      let distance_p3_p2 = this.distance(p3, p2);
      let p2_bend = [
        this.lerp(p3[0], p2[0], (distance_p3_p2 - radius) / distance_p3_p2),
        this.lerp(p3[1], p2[1], (distance_p3_p2 - radius) / distance_p3_p2),
      ];

      // Add curve
      let bezier = this.cubicBezierPath(
        p1_bend,
        p2,
        p2,
        p2_bend,
        bezier_segments
      );

      new_path = new_path.concat(bezier);
    }

    // Last point won't have a bend
    new_path.push(path[path.length - 1]);

    return new_path;
  }

  /**
   * Compose an arc between 2 points
   * Description incomplete
   * @param x1 X-position of starting point
   * @param y1 Y-position of starting point
   * @param x2 X-position of end point
   * @param y2 Y-position of end point
   * @param theta rotation/angle to travel
   * @param segments The number of steps to use
   * @returns Array A Path array of points
   **/
  arcPointToPoint(x1, y1, x2, y2, theta, segments = 12) {
    let path = [];
    let theta_0 = Math.atan2(y2 - y1, x2 - x1);
    let distance = this.distance([x1, y1], [x2, y2]);
    for (let c = 1; c < segments; c++) {
      path.push([
        x1 + (x2 - x1)/2 + distance/2 * Math.cos(theta_0 + Math.PI + c/segments * theta),
        y1 + (y2 - y1)/2 + distance/2 * Math.sin(theta_0 + Math.PI + c/segments * theta)
      ]);
    }
    return path;
  }

  /**
   * Compose an arc
   * Draw an arc centered at a position
   * @param Array An array of position [x,y]
   * @param number The radius of the arc from the position
   * @param number The number of radius to rotate through the arc
   * @param number A radian offset from which to start the arc
   * @param integer The number of line segments used to render the arc
   * @returns Array A Path array of points
   **/
  arc(position, radius, theta, theta_offset, segments) {
    let path = [];
    for (let s = 0; s <= segments; s++) {
      path.push([
        position[0] + radius * Math.cos(theta_offset + s/segments * theta),
        position[0] + radius * Math.sin(theta_offset + s/segments * theta)
      ]);
    }
    return path;
  }

  /**
   * Returns objet representing Line equation.
   * m = slope
   * b = Y intercept
   **/
  lineSlopeIntercept(p1, p2) {
    let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    let b = p1[1] - m * p1[0];
    return { "m": m, "b": b};
  }

  arrayColumn(arr, n){
    return arr.map(a => a[n]);
  }

  /**
   * Translate a group of paths to be centered around the origin
   **/
  centerPaths(paths) {

    let x;
    let x_min = 0;
    let x_max = 0;
    let y;
    let y_min = 0;
    let y_max = 0;

    // Get the most extreme points (bounds) from all paths
    for (let i = 0; i < paths.length; i++) {

      // Get X coordinates as an 1-dimensional array
      let x_coordinates = this.arrayColumn(paths[i], 0);

      x = Math.min(...x_coordinates);
      if (x < x_min) {
        x_min = x;
      }

      x = Math.max(...x_coordinates);
      if (x > x_max) {
        x_max = x;
      }

      // Get Y coordinates as an 1-dimensional array
      let y_coordinates = this.arrayColumn(paths[i], 1);

      y = Math.min(...y_coordinates);
      if (y < y_min) {
        y_min = y;
      }

      y = Math.max(...y_coordinates);
      if (y > y_max) {
        y_max = y;
      }
    }

    // Determine offset of X direction
    let x_range = x_max - x_min;
    let x_center_offset = x_min + x_range/2;

    // Determine offset of Y direction
    let y_range = y_max - y_min;
    let y_center_offset = y_min + y_range/2;

    // Translate each path
    for (let i = 0; i < paths.length; i++) {
      paths[i] = this.translatePath(paths[i], [-x_center_offset, -y_center_offset]);
    }

    return paths;
  }

  /**
   * Scale Path
   * path A 2D path array of [x,y] coordinates
   *   OR a 3D path array of [x,y,z] coordinates
   * scale A value from 0 to 1
   **/
  scalePath(path, scale) {
    let scale_x = scale;
    let scale_y = scale;
    let scale_z = scale;
    if (scale.length !== undefined) {
      scale_x = scale[0];
      scale_y = scale[1];
      scale_z = scale[2] !== undefined ? scale[2] : 1;
    }
    return path.map(function(a){
      let scaled = [
        a[0] * scale_x,
        a[1] * scale_y
      ];
      if (a.length == 3) {
        scaled.push(a[2] * scale_z);
      }
      return scaled;
    });
  }

  /**
   * Translate a path
   **/
  translatePath(path, delta) {
    return path.map(function(a){
      return [
        a[0] + delta[0],
        a[1] + delta[1]
      ];
    });
  }

  /**
   * Rotate points x and y by angle theta about center point (0,0)
   * https://en.wikipedia.org/wiki/Rotation_matrix
   **/
  rotatePath(path, theta) {
    return path.map(function(a){
      return [
        a[0] * Math.cos(theta) - a[1] * Math.sin(theta),
        a[0] * Math.sin(theta) + a[1] * Math.cos(theta)
      ];
    });
  }

  /**
   * Reflect a Path (array of points) about an axis (X or Y)
   *
   * @param Array The path to be reflected
   * @param String The axis over which to reflect "x" or "Y")
   * @param number An optional Axis offset value. The origin is the default
   *
   * @returns Array The reflected path
   */
  reflectPath(path, axis, offset = 0.0) {
    return path.map(function(point){
      if (axis == "x") {
        return [point[0] * -1, point[1]];
      } else if (axis == "y") {
        return [point[0], point[1] * -1];
      } else {
        return point;
      }
    });
  }

  /**
   * Free Distort a Path
   * @param {array} path - A Path array
   * @param {array} bounding_box - An array of 4 points representing the bounding box of the path.
   * Points should start in the top-left and proceed clockwise.
   * A -- B
   * |    |
   * D -- C
   * @param {array} distortion - An array of 4 points representing the distorted points of the bounding box.
   * Points should start in the top-left and proceed clockwise
   * A ------ B
   *  \      /
   *   \    /
   *   D - C
   * @return {array} The transformed shape
   **/
  distortPath(path, bounding_box, distortion) {

    // The distortion array must always contain four points
    // representing the transformation, starting in the top-left
    // and going clockwise.
    if (distortion.length != 4) {
      console.log("distortion array length must be four.");
      return [];
    }

    // Initialize output
    let transformed_path = [];

    // Get bounding box of shape
    const shape_info = this.info(bounding_box);

    // Loop through points of the input path
    for (let j = 0; j < path.length; j++) {

      let x_delta_percent = (path[j][0] - shape_info.min[0]) / shape_info.range[0];
      let y_delta_percent = (path[j][1] - shape_info.min[1]) / shape_info.range[1];

      // Map the current point's X position to the top of the distortion quadrilateral
      let p_top = [
        this.lerp(
          distortion[0][0],
          distortion[1][0],
          x_delta_percent
        ),
        this.lerp(
          distortion[0][1],
          distortion[1][1],
          x_delta_percent
        ),
      ];

      // Map the current point's X position to the bottom of the distortion quadrilateral
      let p_bottom = [
        this.lerp(
          distortion[3][0],
          distortion[2][0],
          x_delta_percent
        ),
        this.lerp(
          distortion[3][1],
          distortion[2][1],
          x_delta_percent
        ),
      ];

      // Interpolate the current point's Y position between the top and bottom of the
      // distortion quadrilateral
      let p_prime = [
        this.lerp(
          p_top[0],
          p_bottom[0],
          y_delta_percent
        ),
        this.lerp(
          p_top[1],
          p_bottom[1],
          y_delta_percent
        ),
      ];

      // Add the new point to the output
      transformed_path.push(p_prime);
    }

    return transformed_path;
  }

  /**
   * Shift and wrap the elements in the array
   * https://javascript.plainenglish.io/algorithms-101-rotate-array-in-javascript-three-solutions-260fbc923b64
   */
  shiftPath(path, k) {
    if (path.length > k) {
        path.unshift( ...path.splice(-k));
    } else {
      let i = 0;
      while(i < k){
        path.unshift(path.splice(-1));
        i++;
      }
    }
    return path;
  }

  /**
   * Split each segment of the source path into 2 parts and return the result
   **/
  subdividePath(path) {

    let divided_path = [];

    for (let i = 0; i < path.length-1; i++) {

      // Current point
      divided_path.push(path[i]);

      // Point halfway to next point
      divided_path.push([
        path[i][0] + (path[i+1][0] - path[i][0])/2,
        path[i][1] + (path[i+1][1] - path[i][1])/2
      ]);

      // Point halfway to next point (Also works)
      /*
      divided_path.push([
        path[i][0] - (path[i][0] - path[i+1][0])/2,
        path[i][1] - (path[i][1] - path[i+1][1])/2
      ]);
      //*/
    }

    return divided_path;
  }

  /**
   * Split each segment of the source path into multiple segments
   **/
  dividePath(line, segments) {

    let divided_path = [];

    const start_point = line[0];
    const end_point   = line[1];
    for (let i = 0; i <= segments; i++) {
      divided_path.push([
        this.lerp(start_point[0], end_point[0], i/segments),
        this.lerp(start_point[1], end_point[1], i/segments)
      ]);
    }

    return divided_path;
  }

  /**
   * Break down a multi-point path into segments that don't
   * exceed a maximum segment length
   **/
  dividePathComplete(path, max_segment_length) {
    let divided_path = [];
    for (let i = 0; i < path.length-1; i++) {
      let segment = [path[i], path[i+1]];
      let length = this.distance(segment[0], segment[1]);
      if (length > max_segment_length) {
        let subdivisions = Math.ceil(length / max_segment_length);
        let subdivided_segment = this.dividePath(segment, subdivisions);
        subdivided_segment.pop();
        divided_path = divided_path.concat(subdivided_segment);
      } else {
        divided_path.push(segment[0]);
      }
    }
    divided_path.push(path[path.length-1]);

    return divided_path;
  }

  /**
   * Randomly remove portions of a path
   *
   * @param Array An path array (array of points)
   * @param number The ratio of points that should be removed (0 to 1)
   *
   * @param Array An array of paths
   **/
  decimatePath(path, odds = 0.05) {
    let new_paths = [];
    let new_path = [];
    for (let j = 0; j < path.length; j++) {
      if (Math.random() < odds) {
        if (new_path.length > 1) {
          new_paths.push(new_path);
        }
        new_path = [];
        continue;
      }
      new_path.push(path[j])
    }
    if (new_path.length > 1) {
      new_paths.push(new_path);
    }
    return new_paths;
  }

  /**
   * Randomly remove portions of multiple paths
   *
   * @param Array An array of paths
   * @param number The ratio of points that should be removed (0 to 1)
   *
   * @param Array An array of paths
   **/
  decimatePaths(paths, odds = 0.05) {
    let new_paths = [];
    for (let i = 0; i < paths.length; i++) {
      let temp_paths = this.decimatePath(paths[i], odds);
      if (temp_paths.length > 1) {
        new_paths = new_paths.concat(temp_paths);
      }
    }
    return new_paths;
  }

  /**
   * Join Paths together when endpoints within threshold distance of each other
   * @param paths Array A multidimensional arry of paths
   * @param number The distance threshold below which points should be considered the same location.
   *   The value is based on the Standard unit of canvas center to canvas nearest edge.
   *   In thise case 1 = 1.5" (Default of 0.01 = 0.015" ~ 1/64")
   * @param integer The index position of the paths input that is being analyzed
   * @param integer A counter of function call iterations. Useful for debugging and stopping the recursion
   * @returns Array An array of paths
   **/
  joinPaths(paths, threshold = 0.01, active_path_index = 0, iteration = 0) {

    // Set border parameters
    let min_x = -5/3;
    let max_x = 5/3;
    let min_y = -1;
    let max_y = 1;

    let debug = false;

    // Bail if iterations exceeded
    iteration++;
    if (debug) { console.log('---------------------'); }
    if (debug) { console.log('Iteration:', iteration); }

    let path_index = active_path_index;
    let distance;

    // Check for completion of multiple closed loops
    for (let i = path_index; i < paths.length; i++) {
      let path_closed = false;
      if (debug) { console.log('path_index:', path_index); }

      // Calculate distance between first and last point of target path
      distance = this.distance(paths[path_index][0], paths[path_index][paths[path_index].length-1]);

      // If distance is below threshold, then the path should be considered a closed loop
      if (distance < threshold) {
        path_closed = true;
      }

      // If the path is a closed loop, then increment the index to look at the next path
      // as the target path
      if (path_closed) {
        if (debug) { console.log('Path ' + path_index + ' closed.'); }
        path_index++;
        if (debug) { console.log('New Path Index: ' + path_index); }
        continue;
      }
      break;
    }

    if (debug) { console.log('selected path_index:', path_index); }
    if (debug) { console.log('paths.length:', paths.length); }

    // Exit function if the last path is closed
    if (path_index == paths.length) {
      return paths;
    }

    // Last point of the target path on which to join other paths
    let last_point = paths[path_index][paths[path_index].length - 1];

    // Check remaining paths
    // console.log('paths.length', paths.length)
    let overlap_count = 0;
    for (let i = 0; i < paths.length; i++) {

      // Skip self
      if (i == path_index) {
        continue;
      }

      // Check last point of target path against first point of other paths
      distance = this.distance(last_point, paths[i][0]);

      if (distance < threshold) {
        // console.log(last_point, paths[i][0], distance, paths[i]);
        overlap_count++;
        // console.log('before:', paths[0])
        paths[path_index] = paths[path_index].concat(paths[i].slice(1));
        // console.log('after:', paths[0])

        // remove from paths
        paths.splice(i, 1);
        break;
      }

      // Check last point of target path against last point of other paths
      distance = this.distance(last_point, paths[i][paths[i].length-1]);
      if (distance < threshold) {
        // console.log(last_point, paths[i][0], distance);
        overlap_count++;
        paths[path_index] = paths[path_index].concat(paths[i].reverse().slice(1));

        // remove from paths
        paths.splice(i, 1);
        break;
      }

      // Check first point of target path against first point of other paths
      distance = this.distance(paths[path_index][0], paths[i][0]);
      if (distance < threshold) {
        overlap_count++;
        paths[path_index] = paths[i].reverse().concat(paths[path_index]);
        paths.splice(i, 1);
        break;
      }

      // Check first point of target path against last point of other paths
      distance = this.distance(paths[path_index][0], paths[i][paths[i].length-1]);
      if (distance < threshold) {
        overlap_count++;
        paths[path_index] = paths[i].concat(paths[path_index]);
        paths.splice(i, 1);
        break;
      }

    }

    if (debug) { console.log("Overlap Count", overlap_count); }

    // Exit function if the last path is closed
    if (path_index == paths.length) {
      return paths;
    }

    // Check to see if both ends of the current path terminate on
    // the edge of the drawing area
    let first_point = paths[path_index][0];
    last_point = paths[path_index][paths[path_index].length - 1];
    let on_border = false;
    if (!on_border) {
      distance = this.distance(last_point, [min_x, last_point[1]]);
      if (distance < threshold) {
        on_border = true;
      }
    }
    if (!on_border) {
      distance = this.distance(last_point, [max_x, last_point[1]]);
      if (distance < threshold) {
        on_border = true;
      }
    }
    if (!on_border) {
      distance = this.distance(last_point, [last_point[0], min_y]);
      if (distance < threshold) {
        on_border = true;
      }
    }
    if (!on_border) {
      distance = this.distance(last_point, [last_point[0], max_y]);
      if (distance < threshold) {
        on_border = true;
      }
    }

    // Check the beginning of the path only if the end of the path is
    // on the border
    if (on_border) {
      distance = this.distance(first_point, [min_x, first_point[1]]);
      if (distance > threshold) {
        on_border = false;
      }
    }
    if (on_border) {
      distance = this.distance(first_point, [max_x, first_point[1]]);
      if (distance > threshold) {
        on_border = false;
      }
    }
    if (on_border) {
      distance = this.distance(first_point, [first_point[0], min_y]);
      if (distance > threshold) {
        on_border = false;
      }
    }
    if (on_border) {
      distance = this.distance(first_point, [first_point[0], max_y]);
      if (distance > threshold) {
        on_border = false;
      }
    }

    // If the target path is closed or on the border go to next path
    if (overlap_count === 0 || on_border) {
      active_path_index++;
    }

    paths = this.joinPaths(paths, threshold, active_path_index, iteration);

    // Remove consecutive duplicate points (within a threshold of distance)
    paths[0] = this.cleanPath(paths[0], 0.0001);

    return paths;
  }

  /**
   * Remove duplicate consecutive points in a path
   */
  cleanPath(path, threshold = 0.0001) {

    let cleanedPath = [];

    // This doesn't work, but ideally it would
    // Source: https://stackoverflow.com/a/30716969
    // let cleanedPath = path.filter(function(item, pos, arr){
    //   // Always keep the 0th element as there is nothing before it
    //   // Then check if each element is different than the one before it
    //   console.log(pos, item)
    //   if (pos !== 0 && this.pointEquals(item, arr[pos-1])) {
    //     console.log("Hit");
    //   }
    //   return pos === 0 || !this.pointEquals(item, arr[pos-1]);
    // });
    // console.log(cleanedPath);

    // Copy first position of "path" to the filtered path
    cleanedPath.push(path[0]);

    // Subsequent positions must greater than the minimum distance to be added
    path.forEach(function(point, index) {
      var last_point = cleanedPath[cleanedPath.length - 1];
      var step_distance = Math.sqrt(Math.pow(point[0] - last_point[0], 2) + Math.pow(point[1] - last_point[1], 2));
      if (step_distance > threshold) {
        cleanedPath.push(point);
      }
    });

    return cleanedPath;
  }

  pointsToPaths2(points, threshold) {
    const paths = [];

    let new_path = [];
    while (points.length > 1) {

      // New paths starts with next unprocessed point
      if (new_path.length === 0) {
        new_path.push(points.shift());
      }

      // Loop through all points and identify candidate points within
      // the distance threshold
      let distance;
      let candidates = [];
      for (let p = 0; p < points.length; p++) {

        let active_path_last_point_index = new_path.length - 1;
        distance = this.distance(
          new_path[active_path_last_point_index],
          points[p]
        );

        if (distance < threshold) {
          candidates.push({
            "point" : p,
            "distance" : distance
          });
        }
      }

      // No points near enough? We got us a path; move on.
      if (candidates.length === 0) {

        paths.push(new_path);
        new_path = [];

        continue;
      }

      // If we're here, we got candidates
      // Sort points by distance, favor by index if distances are equal
      candidates.sort(
        (a, b) => (a.distance > b.distance) ? 1 : (a.distance === b.distance) ? ((a.point > b.point) ? 1 : -1) : -1
      );

      // Add the nearest point as the next point in the path
      let nearest_point_index = candidates[0].point;
      let nearest_point = points[nearest_point_index];
      new_path.push(nearest_point);

      // Remove the point from available points
      points.splice(nearest_point_index, 1);
    }

    // We might be left with a non-empty path
    if (new_path.length > 0) paths.push(new_path);

    return paths;
  }

  /**
   * Join points together when endpoints within threshold distance of each other
   **/
  pointsToPaths(paths, points, active_path_index = 0, threshold = 0.001) {

    // Escape recursion (Chrome is having a "Maximum call stack size exceeded" error)
    // here where Safari and Firefox are not
    if (points.length === 0) {
      return paths;
    }

    // Loop through all points and identify candidate points within
    // the distance threshold
    let distance;
    let candidates = [];
    for (let p = 0; p < points.length; p++) {

      let active_path_last_point_index = paths[active_path_index].length - 1;
      distance = this.distance(
        paths[active_path_index][active_path_last_point_index],
        points[p]
      );

      if (distance < threshold) {
        candidates.push({
          "point" : p,
          "distance" : distance
        });
      }
    }

    if (candidates.length > 0) {

      // Sort points by distance, favor by index if distances are equal
      // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
      candidates.sort(
        (a, b) => (a.distance > b.distance) ? 1 : (a.distance === b.distance) ? ((a.point > b.point) ? 1 : -1) : -1
      );

      // Add the nearest point as the next point in the path
      let nearest_point_index = candidates[0].point;
      let nearest_point = points[nearest_point_index];
      paths[active_path_index].push(nearest_point);

      // Remove the point from available points
      points.splice(nearest_point_index, 1);

    } else {

      // If no points are within the threshold then start a new path
      paths.push([
        points.shift()
      ]);
      active_path_index++;
    }

    paths = this.pointsToPaths(paths, points, active_path_index, threshold);

    return paths;
  }

  smoothPath(path, size = 3) {
    let newData = [];
    newData.push(path[0]);
    if (path.length < size) {
      return path;
    }
    let range = (size - 1)/2;
    let v = 1 / size;
    const kernel = new Array(size).fill(v);
    for (let p = range; p < path.length-range; p++) {
      let sum = [0,0];
      for (let k = -range; k <= range; k++) {
        // Sum X and Y components
        sum[0] += path[p+k][0] * kernel[k+range];
        sum[1] += path[p+k][1] * kernel[k+range];
      }
      newData.push(sum);
    }
    newData.push(path[path.length-1]);
    return newData;
  }

  quadraticBezierPath(p1, p2, p3, segments) {
    let path = [];
    for (let i = 0; i < segments; i++) {
      let t = i/segments;
      path.push([
        Math.pow(1-t, 2) * p1[0] + 2 * (1-t) * t * p2[0] + Math.pow(t, 2) * p3[0],
        Math.pow(1-t, 2) * p1[1] + 2 * (1-t) * t * p2[1] + Math.pow(t, 2) * p3[1]
      ]);
    }
    return path;
  }

  quadraticBezierPathAlgorithm(p1, p2, p3, segments) {

    let path = [];

    path.push(p1);

    let a = p1;
    let b = p2;
    let c;
    let d;
    for (let i = 1; i < segments; i++) {
      c = [
        p1[0] - (p1[0] - p2[0]) * (i/(segments-1)),
        p1[1] - (p1[1] - p2[1]) * (i/(segments-1))
      ];
      d = [
        p2[0] - (p2[0] - p3[0]) * (i/(segments-1)),
        p2[1] - (p2[1] - p3[1]) * (i/(segments-1))
      ];
      path.push(this.intersect_point(a,b,c,d));
      a = c;
      b = d;
    }

    path.push(p3);

    return path;
  }

  /**
   * Bezier Path with 4 control points
   * Equations from https://javascript.info/bezier-curve
   */
  cubicBezierPath(p1, p2, p3, p4, segments) {
    let path = [];
    for (let i = 0; i <= segments; i++) {
      let t = i/segments;
      path.push([
        Math.pow(1-t, 3) * p1[0] + 3 * Math.pow(1-t, 2) * t * p2[0] + 3 * (1-t) * Math.pow(t,2) * p3[0] + Math.pow(t,3) * p4[0],
        Math.pow(1-t, 3) * p1[1] + 3 * Math.pow(1-t, 2) * t * p2[1] + 3 * (1-t) * Math.pow(t,2) * p3[1] + Math.pow(t,3) * p4[1]
      ]);
    }
    return path;
  }

  sortPaths(paths) {
    paths = paths.sort(function(a, b){
      // Compare the X-position of the first point in the path
      return a[0][0] - b[0][0];
    });
    return paths;
  }

  /**
   * Shuffle Paths using the Fisher-Yates algorithm
   * From https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
   *
   * @param paths An array of paths
   *
   * @returns An array of paths now in a random order
   */
  shufflePaths(paths) {
    for (let i = paths.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = paths[i];
      paths[i] = paths[j];
      paths[j] = temp;
    }
    return paths;
  }

  polarToRect(radius, theta) {
    return [
      radius * Math.cos(theta),
      radius * Math.sin(theta)
    ];
  }

  // From http://www.jeffreythompson.org/collision-detection/line-circle.php
  pointOnLineSegment(p, line, buffer = 0.01) {

    // get distance from the point to the two ends of the line
    let d1 = this.distance(p, line[0]);
    let d2 = this.distance(p, line[1]);

    // get the length of the line
    let lineLen = this.distance(line[0], line[1]);

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }

    return false;
  }

  /**
   * Calculate the intersection points (0, 1 or 2) between a line and a circle
   */
  lineCircleIntersect(p1, p2, circle) {

    let intersections = [];

    // Get line.m and line.b
    let line = this.lineSlopeIntercept(p1, p2);

    let r = circle[1];

    // Note: This is for circle at origin only right now
    let a = Math.pow(line.m, 2) + 1;
    let b = 2 * line.m * line.b;
    let c = Math.pow(line.b, 2) - Math.pow(r,2);

    let x_values = this.solveQuadratic(a, b, c);

    if (x_values.length === 0) {
      return intersections;
    }

    for (let x_value of x_values) {

      let intersect = [
        x_value,
        line.m * x_value + line.b
      ];

      // Determine if coordinate is on the line p1->p2
      if (this.pointOnLineSegment(intersect, [p1, p2])) {
        intersections.push(intersect);
      }
    }

    return intersections;
  }

  /**
   * Solve the Quadratic Equation. For real values only
   */
  solveQuadratic(a, b, c) {

    let discriminant = Math.pow(b, 2) - 4 * a * c;

    // One real and equal answer
    if (discriminant === 0) {
      let x = -b / (2 * a);
      return [x];
    }

    // Two real and different answers
    if (discriminant > 0) {
      let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return [x1, x2];
    }

    return [];
  }

  /**
   * Calculate an intersection point of two circles
   * https://math.stackexchange.com/questions/256100/how-can-i-find-the-points-at-which-two-circles-intersect
   * https://www.analyzemath.com/CircleEq/circle_intersection.html
   * See alternate implementation: https://gist.github.com/jupdike/bfe5eb23d1c395d8a0a1a4ddd94882ac
   * @param p1 Array of x/y position ([x,y]) of Circle 1
   * @param r1 float Radius of Circle 1
   * @param p2 Array of x/y position ([x,y]) of Circle 2
   * @param r2 float Radius of Circle 2
   * @returns Array An array of intersection points
   **/
  circleInterceptPoints(p1, r1, p2, r2, sign) {

    // Distance between centers of the circles
    let d = this.distance(p1, p2);

    let x = (1/2) * (p1[0] + p2[0])
      + ((Math.pow(r1, 2) - Math.pow(r2, 2)) / (2 * Math.pow(d, 2))) * (p2[0] - p1[0])
      + sign * (1/2) * Math.sqrt(
          2 * ((Math.pow(r1, 2) + Math.pow(r2, 2))/(Math.pow(d, 2)))
          - Math.pow((Math.pow(r1, 2) - Math.pow(r2, 2)), 2) / Math.pow(d, 4)
          - 1
        ) * (p2[1] - p1[1]);

    let y = (1/2) * (p1[1] + p2[1])
      + ((Math.pow(r1, 2) - Math.pow(r2, 2)) / (2 * Math.pow(d, 2))) * (p2[1] - p1[1])
      + sign * (1/2) * Math.sqrt(
          2 * ((Math.pow(r1, 2) + Math.pow(r2, 2))/(Math.pow(d, 2)))
          - Math.pow((Math.pow(r1, 2) - Math.pow(r2, 2)), 2) / Math.pow(d, 4)
          - 1
        ) * (p1[0] - p2[0]);

    return [x,y];
  }

  /**
   * Take a path and crop it to a circle
   * This works, but hasn't been rigorously tested on edge cases
   * @deprecated Try cropToShape() instead
   */
  cropToCircle(candidate_paths, center = [0,0], crop_radius = 1) {

    let paths = [];

    let path = [];

    for (let i = 0; i < candidate_paths.length; i++) {

      // Loop through points/segments of path
      for (let p = 0; p < candidate_paths[i].length; p++) {

        // Calculate distance of point from center
        let d1 = this.distance([0,0], candidate_paths[i][p]);

        // Calculate distance from next point (if it exists) to the center
        let d2 = null;
        if (p+1 < candidate_paths[i].length) {
          d2 = this.distance([0,0], candidate_paths[i][p+1]);
        }

        if (d1 < crop_radius) {

          // Point is inside circle

          // Check if next point (if there is one) is outside the circle.
          if (d2 !== null && d2 > crop_radius) {

            // The point is outside of the crop circle, so calculate its point of intersection
            let intersections = this.lineCircleIntersect(
              candidate_paths[i][p],
              candidate_paths[i][p+1],
              [[0,0], crop_radius]
            );

            // Assuming these are short line segments
            // there should only be one point of intersection.
            // Add it to the path
            if (intersections.length == 1) {
              path.push(intersections[0]);
            }

            // End active path and re-initialize
            paths.push(path);
            path = [];

          } else {

            // The next point is also inside the circle so no need to calculate an intersection
            path.push(candidate_paths[i][p]);

            // End active path and start a new one if it's the last point
            if (d2 === null) {
              paths.push(path);
              path = [];
            }

          }
        } else if ((d1 > crop_radius) && (d2 !== null && d2 < crop_radius)) {

          // The point is outside the circle, but the next point is in, so calculate
          // the point of intersection.
          let intersections = this.lineCircleIntersect(
            candidate_paths[i][p],
            candidate_paths[i][p+1],
            [[0,0], crop_radius]
          );

          // Assuming these are short line segments
          // there should only be one point of intersection.
          // Add it to the path
          if (intersections.length == 1) {
            path.push(intersections[0]);
          }

          // End active path and start a new one if there are at least 2 points to define a line
          // if (path.length >= 2) {
          //   paths.push(path);
          //   path = [];
          // }
        }
      }
    }

    // Save path if it contains at least one line segment (2 points)
    if (path.length >= 2) {
      paths.push(path);
    }

    return paths;
  }

  /**
   * Take a path and crop it to a rectangle
   * This works, but hasn't been rigorously tested on edge cases.
   * For example, if there are 2 consecutive points that are both
   * outside of the crop area, but cut across the region, the segment
   * of the path that cuts across will not be determined or used.
   * Note: This has not been performance optimized.
   * @deprecated Try cropToShape() instead
   * @param The candidate paths to be cropped
   * @param The minimum X value to be included (inclusive)
   * @param The maximum X value to be included (inclusive)
   * @param The minimum Y value to be included (inclusive)
   * @param The maximum Y value to be included (inclusive)
   * @returns Array A multidimensional array of paths
   */
  cropToRectangle(candidate_paths, x_min, x_max, y_min, y_max) {

    let paths = [];

    let path = [];

    // Define the crop shape using the function input
    let cropShape = [
      [x_min, y_min],
      [x_max, y_min],
      [x_max, y_max],
      [x_min, y_max]
    ];

    // Loop through all paths
    for (let i = 0; i < candidate_paths.length; i++) {

      path = [];

      // Loop through points/segments of path
      for (let p = 0; p < candidate_paths[i].length-1; p++) {

        // Check if point is within bounds
        let point_in_bounds = (candidate_paths[i][p][0] >= x_min && candidate_paths[i][p][0] <= x_max)
          && (candidate_paths[i][p][1] >= y_min && candidate_paths[i][p][1] <= y_max);

        // Check if next point is within bounds (if not the last point)
        let next_point_in_bounds = null;
        if (p+1 < candidate_paths[i].length) {
          next_point_in_bounds = (candidate_paths[i][p+1][0] > x_min && candidate_paths[i][p+1][0] < x_max)
            && (candidate_paths[i][p+1][1] > y_min && candidate_paths[i][p+1][1] < y_max);
        }

        // Determine if the next point is the end of the candiate path
        let next_point_is_last = false;
        if (p === candidate_paths[i].length-2) {
          next_point_is_last = true;
        }

        if (point_in_bounds) {

          if (next_point_in_bounds) {

            // The next point is also inside the bounds so no need to calculate an intersection
            path.push(candidate_paths[i][p]);

            if (next_point_is_last) {
              path.push(candidate_paths[i][p+1]);
            }

          } else {

            // The next point is not inside the bounds so the point at which the segment crosses the border
            // must be calculated

            // Determine which side the next point intersects with. Stop testing after the first
            // is found.
            for (let pt = 0; pt < cropShape.length; pt++) {
              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              // Add the intersection point to the path if one is found
              if (intersection_point !== false) {
                path.push(
                  candidate_paths[i][p],
                  [intersection_point.x, intersection_point.y]
                );

                // Save path if it contains at least one line segment (2 points)
                if (path.length >= 2) {
                  paths.push(path);
                }

                // Reset the path since the path hit the border
                path = [];

                // Break the for-loop. No need to calculate any other intersections
                break;
              }
            }
          }
        } else {

          // The current point is out of bounds

          if (next_point_in_bounds) {

            // The next point is inside the bounds so the point at which the segment crosses the border
            // must be calculated

            // Determine which side the next point intersects with. Stop testing after the first
            // is found.
            for (let pt = 0; pt < cropShape.length; pt++) {
              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              if (intersection_point !== false) {
                path.push(
                  [intersection_point.x, intersection_point.y],
                  candidate_paths[i][p+1]
                );
                break;
              }
            }
          } else {

            // Test if the segment crosses any of the crop borders
            for (let pt = 0; pt < cropShape.length; pt++) {

              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              // Add the intersection point to the path if one is found
              if (intersection_point !== false) {
                path.push([intersection_point.x, intersection_point.y]);
              }
            }

          }
        }
      }

      // Save path if it contains at least one line segment (2 points)
      if (path.length >= 2) {
        paths.push(path);
      }
    }
    return paths;
  }

  /**
   * Crop multiple paths to a bounding shape
   *
   * @param Array The candidate paths to be cropped
   * @param Array The bounding shape to be applied to the candidate paths
   * @param Array The threshold at which to consider a path as intersecting
   * with another.
   *
   * @returns Array A multidimensional array of paths
   */
  cropToShape(candidate_paths, cropShape, threshold = 0.0001) {

    let paths = [];
    let path = [];

    // Reformat vertices of cropShape for use with pointInPolygon()
    let vertices = [];
    for (let v = 0; v < cropShape.length-1; v++) {
      vertices.push({x: cropShape[v][0], y: cropShape[v][1]});
    }

    // Loop through all paths
    for (let i = 0; i < candidate_paths.length; i++) {

      path = [];

      // Loop through points/segments of path
      for (let p = 0; p < candidate_paths[i].length-1; p++) {

        // Check if point is within bounds
        let point_in_bounds = this.pointInPolygon(
          vertices,
          candidate_paths[i][p][0],
          candidate_paths[i][p][1],
          threshold
        );

        // Check if next point is within bounds (if not the last point)
        let next_point_in_bounds = null;
        if (p+1 < candidate_paths[i].length) {
          next_point_in_bounds = this.pointInPolygon(
            vertices,
            candidate_paths[i][p+1][0],
            candidate_paths[i][p+1][1],
            threshold
          );
        }

        // Determine if the next point is the end of the candiate path
        let next_point_is_last = false;
        if (p === candidate_paths[i].length-2) {
          next_point_is_last = true;
        }

        if (point_in_bounds) {

          if (next_point_in_bounds) {

            // The next point is also inside the bounds so no need to calculate an intersection
            path.push(candidate_paths[i][p]);

            if (next_point_is_last) {
              path.push(candidate_paths[i][p+1]);
            }

          } else {

            // The next point is not inside the bounds so the point at which the segment crosses the border
            // must be calculated

            // Determine which side the next point intersects with. Stop testing after the first
            // is found.
            for (let pt = 0; pt < cropShape.length; pt++) {

              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              // Note: Could/Should this use this.pointEquals() instead?
              let on_line = this.pointOnLineSegment(
                candidate_paths[i][p],
                [cropShape[pt], cropShape[(pt+1) % cropShape.length]],
                0.011 // Math.abs(threshold)
              );

              if (on_line && intersection_point == false) {
                intersection_point = {
                  "x": candidate_paths[i][p][0],
                  "y": candidate_paths[i][p][1]
                };
              }

              // Add the intersection point to the path if one is found
              if (intersection_point !== false) {
                path.push(
                  candidate_paths[i][p],
                  [intersection_point.x, intersection_point.y]
                );

                // Save path if it contains at least one line segment (2 points)
                if (path.length >= 2) {
                  paths.push(path);
                }

                // Reset the path since the path hit the border
                path = [];

                // Break the for-loop. No need to calculate any other intersections
                break;
              }
            }
          }
        } else {

          // The current point is out of bounds

          if (next_point_in_bounds) {

            // The next point is inside the bounds so the point at which the segment crosses the border
            // must be calculated

            // Determine which side the next point intersects with. Stop testing after the first
            // is found.
            for (let pt = 0; pt < cropShape.length; pt++) {

              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              // Note: Could/Should this use this.pointEquals() instead?
              let on_line = this.pointOnLineSegment(
                candidate_paths[i][p],
                [cropShape[pt], cropShape[(pt+1) % cropShape.length]],
                Math.abs(threshold)
              );

              if (on_line) {
                intersection_point = {
                  "x": candidate_paths[i][p][0],
                  "y": candidate_paths[i][p][1]
                };
              }

              if (intersection_point !== false) {
                path.push(
                  [intersection_point.x, intersection_point.y],
                  candidate_paths[i][p+1]
                );
                break;
              }
            }
          } else {

            /*
              The start and end points are out of bounds, however it is
              possible that the line could cut across the crop shape.
            */

            // Test if the segment crosses any of the crop borders
            let intersections = [];
            for (let pt = 0; pt < cropShape.length; pt++) {

              let intersection_point = this.getLineLineCollision(
                {"x": candidate_paths[i][p][0], "y": candidate_paths[i][p][1]},
                {"x": candidate_paths[i][p+1][0], "y": candidate_paths[i][p+1][1]},
                {"x": cropShape[pt][0], "y": cropShape[pt][1]},
                {"x": cropShape[(pt+1) % cropShape.length][0], "y": cropShape[(pt+1) % cropShape.length][1]}
              );

              if (intersection_point !== false) {
                intersections.push(intersection_point);
              }
            }

            // Add the intersection points if two are found. This
            // works for a convex cropShape, but doesn't account
            // for a cropShape that may have concave parts, which
            // could allow more than 2 intersections.
            if (intersections.length == 2) {
              path.push(
                [intersections[0].x, intersections[0].y],
                [intersections[1].x, intersections[1].y]
              );
            }

          }
        }
      }

      // Save path if it contains at least one line segment (2 points)
      if (path.length >= 2) {
        paths.push(path);
      }
    }

    return paths;
  }

  /**
   * Remove portion of paths that are inside of the knockout shape
   * This may also be considered a Boolean Exclusive Or (XOR)
   *
   * @param Array An array of path arrays
   * @param Array An array definiting a closed shape
   *
   * @returns Array An array of path arrays
   **/
  knockout(paths, shape) {

    let new_paths = [];

    // Loop through paths
    for (let i = 0; i < paths.length; i++) {

      // Get intersections
      let new_path = this.shapeIntersections(paths[i], shape);

      // Remove segments of the path (new_path) that are inside of the shape
      let knocked_paths = this.booleanSubtractComparison(new_path, shape, false);

      // Add to new paths
      new_paths = new_paths.concat(knocked_paths);
    }

    return new_paths;
  }

  /**
   * PolyPoint from http://www.jeffreythompson.org/collision-detection/poly-point.php
   * Threshold has been added so that points very close to the border of the
   * polygon can be selecteive counted as in or out
   * @param Array Vertices of Polygon
   * @param number X Position of Point
   * @param number Y Position of Point
   * @param number The Threshold at which to consider a point near the border as either
   * inside or outside.
   *
   * @returns Boolean True if the point is inside the Polygon, false otherwise
   **/
  pointInPolygon(vertices, px, py, threshold = -0.00001) {

    let collision = false;

    // go through each of the vertices, plus
    // the next vertex in the list
    let next = 0;
    for (let current=0; current<vertices.length; current++) {

      // get next vertex in list
      // if we've hit the end, wrap around to 0
      next = current+1;
      if (next == vertices.length) {
        next = 0;
      }

      // get the PVectors at our current position
      // this makes our if statement a little cleaner
      let vc = vertices[current];
      let vn = vertices[next];

      // compare position, flip 'collision' variable back and forth
      let within_vertical_band = (vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py);
      let jordan_curve_theorem = (vn.x-vc.x) * (py-vc.y) / (vn.y-vc.y) + vc.x;
      if (within_vertical_band && px < jordan_curve_theorem) {
        collision = !collision;
      }

      // If the point is within the threshold of a border, then
      // return right away. If the threshold is positive, then be
      // more permissive for counting the point as inside the polyon.
      // If the threshold is negative, then be less permissive with
      // including the point in the polygon
      let on_line = this.pointOnLineSegment(
        [px, py],
        [[vc.x, vc.y], [vn.x, vn.y]],
        Math.abs(threshold)
      );
      if (on_line) {
        if (threshold > 0) {
          return true;
        } else {
          return false;
        }
      }

    }

    return collision;
  }

  /**
   * Fill a convex shape (polygon) with straight lines
   *
   * @param array The shape to be filled
   * @param number The space between the fill lines
   * @param number The angle (in radians) of the fill lines (0.0 is horizontal)
   * @param boolean Set whether the lines should alternate directions (optimal for plotting)
   * @param boolean Set to true to connect the lines. Default is false
   * @param function An optional function to describe how to space fill lines
   *
   * @returns Array A multidimensional array of paths
   */
  fill(shape, spacing, angle = 0.0, alternate = true, connect = false, fillFunc = null) {

    // Calculate the tight bounding box of the shape
    let bbox = this.boundingBox(shape);

    // Calculate the center of that bounding box
    let bbox_center = [
      bbox[0][0] + (bbox[0][1] - bbox[0][0])/2,
      bbox[1][0] + (bbox[1][1] - bbox[1][0])/2,
    ];

    // Calculate the diagonal/radius distance of the bounding box
    // in order to know the maximum radius of the shape so that it
    // can be covered by any angle of lines
    let radius = this.distance(
      [bbox[0][0], bbox[1][0]],
      [bbox[0][1], bbox[1][1]]
    );

    // Construct the fill lines
    let num_lines = radius / spacing;
    let lines = [];
    for (let j = 0; j < num_lines; j++) {

      // Calculate the vertical position of the fill line
      // The default uses even spacing. A fill function
      // can be passed in to define the line spacing
      let y = -radius/2 + radius * (j/num_lines);
      if (typeof fillFunc == "function") {
        y = fillFunc(j/num_lines);
      }

      // Create a fill line
      let line = [
        [-radius, y],
        [ radius, y]
      ];

      // Rotate the line to match the requested fill angle
      if (angle !== 0) {
        line = this.rotatePath(line, angle);
      }

      // Move from the origin to the shape's position
      line = this.translatePath(line, bbox_center);

      lines.push(line);
    }

    // Apply the fill lines to the shape
    let fill = [];
    for (let i = 0; i < lines.length; i++) {

      // Start point of fill line
      let p1 = lines[i][0];

      // End point of fill line
      let p2 = lines[i][1];

      // Calculate intersection with shape
      let intersections = [];
      for (let a = 0; a < shape.length; a++) {

        // Define side of shape - points a and b
        let b = a + 1;
        if (b >= shape.length) {
          b = b % shape.length;
        }

        // Calculate intersection
        let intersection = this.getLineLineCollision(
          {"x": p1[0], "y": p1[1]},
          {"x": p2[0], "y": p2[1]},
          {"x": shape[a][0], "y": shape[a][1]},
          {"x": shape[b][0], "y": shape[b][1]}
        );

        // Add to array of intersection points
        if (intersection !== false) {
          intersections.push(intersection);
        }
      }

      // Process intersections
      if (intersections.length > 0) {

        // Sort by X-position to determine order of intersection
        intersections.sort(
          (a, b) => (a.x > b.x) ? 1 : -1
        );

        // Alternate line direction
        if (alternate && i % 2) {
          intersections = intersections.reverse();
        }

        for (let j = 0; j < intersections.length - 1; j++) {

          if (j % 2 === 1) {
            continue;
          }

          // Add line to results
          if (connect) {
            fill = fill.concat([
              [intersections[j].x, intersections[j].y],
              [intersections[j+1].x, intersections[j+1].y]
            ]);
          } else {
            fill.push([
              [intersections[j].x, intersections[j].y],
              [intersections[j+1].x, intersections[j+1].y]
            ]);
          }
        }

      }
    }

    // Force multi-dimensional array for connected lines
    // so that the return data types match
    if (connect) {
      fill = [fill];
    }

    return fill;
  }

  /**
   * Layer paths according to their stacking order
   * The lowest index (0) of "paths" will be on the bottom
   * of the stack. Subsequent paths (1, 2, 3...) will
   * knock out (subtract) any portions of previous paths
   * that they cover.
   *
   * Important: Shapes that are knocked-out do not include
   * the portion of the otehr shape that covers them. In
   * other words, the cover section is removed from the original
   * path and leaves a blank space, rather than incorporating
   * the portion of the other shape
   *
   * @param Array An array of path arrays
   * @param Boolean Whether or not to join paths
   * @param number This represents an offset from the original
   * path that can be used to adjust at what point an intersection
   * occurs.
   * @param Boolean Set to true if the Paths are
   * quadrilaterals where each shares 1 side in succession. This
   * can be used to achieve an outlined path effect with overlaps
   *
   * @returns Array An array of paths
   **/
  layeredPaths(paths, join = false, offset = 0, continuous = false) {

    // Final paths for plotting
    let final_paths = [];

    // Loop through shapes
    for (let i = 0; i < paths.length; i++) {

      // Initialize arrays used to store the whole
      // or segmented version of paths[i]
      let paths_of_i = [];

      // The last shape doesn't need to be evaluated since
      // it is on "top" of all other shapes
      if (i == paths.length-1) {

        // In "continuous" mode the final point/side of the
        // last shape should be removed
        if (continuous) {
          paths[i].pop();
        }

        final_paths.push(paths[i])
        break;
      }

      // Get all shapes on "layers" above the current shape
      let comparison_shapes = JSON.parse(JSON.stringify(paths))
      comparison_shapes.splice(0, i+1)

      // Expand Shape
      if (offset > 0) {
        let offset_paths = [];
        for (let c = 0; c < comparison_shapes.length; c++) {
          comparison_shapes[c] = this.offsetPath(comparison_shapes[c], offset);
        }
      }

      // Loop through sides of shape under evaluation
      for (let point = 0; point < paths[i].length-1; point++) {

        // In "continuous" mode, don't evaluate interior/equivalent
        // sides of adjacent quadrilaterals
        if (continuous && (point == 1 || (point == 3 && i > 0))) {
          continue;
        }

        // Initialize the segment as the full side of the path
        let new_segments = [
          [paths[i][point], paths[i][point+1]]
        ];

        // Split the path using any shapes that overlap it
        new_segments = this.linePathsSplit(
          [paths[i][point], paths[i][point+1]],
          comparison_shapes
        )

        // Add the side's segments to an array for the whole shape
        // This could be concatenated to final_paths directly, but
        // I like the idea of having one array for the whole shape
        if (new_segments.length > 0) {
          paths_of_i = paths_of_i.concat(new_segments);
        }
      }

      // Add the paths of the shape onto the final output paths
      final_paths = final_paths.concat(paths_of_i)
    }

    if (join) {
      final_paths = this.joinPaths(final_paths)
    }

    return final_paths;
  }

  /**
   * Subtract paths from one another. The lowest index
   * The lowest index (0) of "paths" will be on the bottom
   * of the stack. Subsequent paths (1, 2, 3...) will
   * knock out (subtract) any portions of previous paths
   * that they cover.
   *
   * Important: This is very similar to layeredPaths, except
   * that this method incorporates the path of the shape that
   * is being subtracted from the original path (as opposed to
   * removing it as in layeredPaths).
   *
   * @param Array An array of path arrays
   *
   * @returns Array An array of path objects either labeled as "group"
   * if it contains more than one path or "path" if it contains a single
   * path. It is important to group pieces of the same original shape/path
   * together so that if a fill is applied later all pieces of the same original
   * shape can be filled the same.
   **/
  subtractPaths(paths) {

    // Final paths for plotting
    let final_paths = [];

    // Loop through shapes
    for (let i = 0; i < paths.length; i++) {

      // The last shape doesn't need to be evaluated since
      // it is on "top" of all other shapes
      if (i == paths.length-1) {
        // final_paths.push(paths[i])
        final_paths.push({
          "path": paths[i]
        });
        break;
      }

      // Get all shapes on "layers" above (higher index) the current shape
      let comparison_shapes = this.deepCopy(paths);
      comparison_shapes.splice(0, i+1);

      // Subtract these shapes from the current shape
      let new_shape = this.deepCopy(paths[i]);
      for (let j = 0; j < comparison_shapes.length; j++) {

        // Check if the new_shape has been completely
        // eliminated by other shape subtractions
        if (typeof new_shape == "undefined") {
          break;
        }

        // Subtract the comparision shape from the original shape
        new_shape = this.booleanSubtract(
          new_shape,
          comparison_shapes[j]
        );
      }

      // Add the paths of the shape onto the final output paths
      // final_paths = final_paths.concat(new_shape)
      if (new_shape.length > 1) {
        final_paths.push({
          "group": new_shape
        });
      } else {
        final_paths.push({
          "path": new_shape[0]
        });
      }
    }

    return final_paths;
  }

  /**
   * Take a line segment and a path of a closed shape and return the portion of that
   * line that is not intersected by the shape
   *
   * INTENDED TO BE PRIVATE METHOD OF CLASS
   *
   * @param Array An array containing 2 point Arrays that define the x/y position of the
   * line's start and end points
   * @param Array An array containing 2 or more point Arrays defining a path.
   * @param number An optional threshold value for a distance below which two points
   * should be considered coincident and not intersecting.
   * @returns An array of zero, one or two line arrays
   **/
  linePathSplit(line, path, threshold = 0.001) {

    // Start and End points for line
    let a = line[0];
    let b = line[1];

    // Test if endpoints are inside the shape being tested against
    let vertices = [];
    for (let v = 0; v < path.length-1; v++) {
      vertices.push({x: path[v][0], y: path[v][1]});
    }
    let point_a_inside = this.pointInPolygon(vertices, a[0], a[1]);
    let point_b_inside = this.pointInPolygon(vertices, b[0], b[1]);

    // If both points are inside shape then there is no line left
    if (point_a_inside && point_b_inside) {
      return [];
    }

    // Check all points of path
    let intersections = [];
    for (let i = 0; i < path.length-1; i++) {

      // Start and end points for path
      let c = path[i];
      let d = path[i+1];

      // Detect if line segment a->b intersects with segment c->d
      let intersect = this.getLineLineCollision(
        {x: a[0], y: a[1]},
        {x: b[0], y: b[1]},
        {x: c[0], y: c[1]},
        {x: d[0], y: d[1]}
      )

      // Save found intersections to an array of intersections
      // to be further evaluated
      if (intersect != false) {
        intersections.push([intersect.x, intersect.y]);
      }
    }

    // Evaluate intersection(s)
    // A convex polygon can only intersect 0, 1 or 2 times
    if (intersections.length == 0) {

      // If no intersections were found return the originl input line
      return [
        [a, b]
      ];
    } else if (intersections.length == 1 && point_a_inside) {

      // Point A is inside the target shape
      return [
        [intersections[0], b]
      ];
    } else if (intersections.length == 1 && point_b_inside) {

      // Point B is inside the target shape
      return [
        [a, intersections[0]]
      ];
    } else if (intersections.length == 1) {

      // This situation arises if the point is very near a line
      // on the path, most likely due to a previous evaluation of
      // the line and path where the line was previously split
      // into two segments.

      // Find greatest distance from an endpoint to the intersection
      let dist1 = this.distance(a, intersections[0])
      let dist2 = this.distance(intersections[0], b)

      if (dist1 > dist2) {
        return [
          [a, intersections[0]]
        ];
      } else {
        return [
          [intersections[0], b]
        ];
      }

    } else if (intersections.length == 2) {

      // Determine which intersection matches with which intersection to
      // split the line into two non-overlapping segments
      let dist1 = this.distance(a, intersections[0])
      let dist2 = this.distance(a, intersections[1])
      if (dist1 < threshold && dist2 < threshold) {
        return [
          [a,b]
        ];
      } else if (dist1 < dist2) {
        return [
          [a, intersections[0]],
          [intersections[1], b]
        ];
      } else {
        return [
          [a, intersections[1]],
          [intersections[0], b]
        ];
      }
    }
    return [];
  }

  /**
   * Take a line segment and multiple paths representing a closed convex polygon
   * and return the portion of that line that is not intersected by any of the shapes (paths)
   *
   * INTENDED TO BE PRIVATE METHOD OF CLASS
   *
   * @param Array An array containing 2 point Arrays that define the x/y position of the
   * line's start and end points
   * @param Array An array of paths. Each path should represent a closed convex
   * shape.
   * @returns An array of zero, one or two lines that represent the portion of the
   * input line that do not intersect with or are not covered by any of the input paths
   **/
  linePathsSplit(line, paths) {

    let segments = [];

    // Loop through all of the paths
    for (let i = 0; i < paths.length; i++) {

      // Calculate the intersection(s) between the line
      // and the current path. This will produce 0, 1 or 2
      // intersections for convex polygons
      segments = this.linePathSplit(line, paths[i])

      // Initialize an empty array to store subsegments of the
      // segments.
      let sub_segments = [];

      if (typeof segments === "undefined") {
        console.log("segments is undefined");
        continue;
      }

      if (segments.length > 1) {

        // If there are two segments (max for a convex polygon "path")
        // then they should each be evaluated against the other paths.
        // This is where the recursive magic happens.
        for (let j = 0; j < segments.length; j++) {
          sub_segments = sub_segments.concat(
            this.linePathsSplit(segments[j], paths)
          );
        }

        return sub_segments;

      } else if (segments.length == 1) {

        // If there was one intersection, creating a truncated line,
        // which should become the new line to be evaluated against
        // the rest of the "paths"
        line = segments[0];

      } else {

        // If segments is empty then the endpoints were completely
        // contained within a shape (overlapped and hidden from view)
        return segments
      }
    }

    return segments;
  }

  /**
   * Add noise to a path
   * @param Array The source path
   * @param number The maximum distance allowed between points. If a segment
   * of the path is greater than this distance it will be subdivided into
   * shorter segments.
   * @param number The maximum magnitude of the noise offset
   * @param Boolean Whether to use Guassian noise
   * @param Boolean Whether to force the path to close (end point equals start point)
   * @param Integer An optional smoothing window value
   * @param Integer An optional repetition of the smoothing window. Repeating a smaller
   * smoothing window more times keeps sharper angles while still smoothing straight lines.
   * @param Array The path with added noise
   */
  noisify(path, max_segment_length, max_noise, gaussian = false, force_close = false, smooth_window = 0, smooth_repeat = 1) {

    // Break full path into segments
    let path2 = this.dividePathComplete(path, max_segment_length);

    let newpath = []
    for (let i = 0; i < path2.length-1; i++) {

      let noise;

      if (gaussian) {
        noise = this.getGaussianRandom() * max_noise;
      } else {
        noise = this.getRandom(-max_noise, max_noise);
      }

      let delta_y = path2[i+1][1] - path2[i][1];
      let delta_x = path2[i+1][0] - path2[i][0];
      let theta = Math.atan2(delta_y, delta_x);
      newpath.push([
        path2[i][0] + noise * Math.cos(theta + Math.PI/2),
        path2[i][1] + noise * Math.sin(theta + Math.PI/2)
      ]);
    }

    // Add last point
    newpath.push(path2[path2.length-1]);

    // Force a close shape (end point equals start point)
    if (force_close) {
      if (!this.pointEquals(newpath[0], newpath[newpath.length-1])) {
        newpath.push(newpath[0]);
      }
    }

    if (smooth_window > 1) {
      for (let i = 0; i < smooth_repeat; i++) {
        newpath = this.smoothPath(newpath, smooth_window);
      }
    }

    return newpath;
  }

  /**
   * Remove unnecessary points
   */
  simplify(path, distance_threshold = 1.0, direction_threshold = Math.PI / 4) {

    var simplified = [];

    // Copy first position of "path" to the filtered path
    simplified.push(path[0], path[1]);

    let last_direction = Math.atan2(path[1][1] - path[0][1], path[1][0] - path[0][0]);

    // Subsequent positions must greater than the minimum distance to be added
    for (let i = 1; i < path.length-1; i++) {
      var magnitude = this.distance(simplified[simplified.length - 1], path[i+1]);

      let direction = Math.atan2(path[i+1][1] - path[i][1], path[i+1][0] - path[i][0]);
      let direction_delta = last_direction - direction;

      // console.log(magnitude, Math.abs(direction_delta));

      if (Math.abs(direction_delta) > direction_threshold) {
        // console.log(Math.abs(direction_delta), direction_threshold);
        last_direction = direction;
        simplified.push(path[i+1]);
      } else if (magnitude > distance_threshold) {
        // console.log("magnitude exceeded");
        last_direction = direction;
        simplified.push(path[i+1]);
      }
    }

    return simplified;
  }

  /**
   * Perform a Boolean addition (union) of two closed paths
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array An array of points representing Shape B added to Shape A.
   * If Shape B does not overlap Shape A, then Shape A will be returned unchanged.
   **/
  booleanAdd(shapeA, shapeB) {

    // Ensure that shapes are closed (e.g. Last point matches first point)
    if (!this.pointEquals(shapeA[shapeA.length-1], shapeA[0], 0.0001)) {
      shapeA.push(shapeA[0]);
    }
    if (!this.pointEquals(shapeB[shapeB.length-1], shapeB[0], 0.0001)) {
      shapeB.push(shapeB[0]);
    }

    // Get intersections
    let newA = this.shapeIntersections(shapeA, shapeB);
    let newB = this.shapeIntersections(shapeB, shapeA);

    // Build a new shape from the two shapes using the segments
    // that are outside of the other shape
    let newShape = [];
    newShape = newShape.concat(this.booleanAddComparison(newA, shapeB));
    newShape = newShape.concat(this.booleanAddComparison(newB, shapeA));

    // Join all of the path segments into a continuous path
    newShape = this.joinPaths(newShape);

    return newShape;
  }

  /**
   * Remove segments of Shape A that are inside of Shape B
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array A multidimensional array of paths from Shape A
   * that are outside of Shape B
   **/
  booleanAddComparison(shapeA, shapeB) {
    let paths = [];

    let shapeB_vertices = [];
    for (let v = 0; v < shapeB.length-1; v++) {
      shapeB_vertices.push({x: shapeB[v][0], y: shapeB[v][1]});
    }

    let path = [];
    let i_max = shapeA.length-1;
    for (let i = 0; i < i_max; i++) {
      let mid_point = [
        this.lerp(shapeA[i][0], shapeA[i+1][0], 0.5),
        this.lerp(shapeA[i][1], shapeA[i+1][1], 0.5),
      ];
      if (this.pointInPolygon(shapeB_vertices, mid_point[0], mid_point[1])) {
        path.push(shapeA[i]);
        if (path.length > 1) {
          paths.push(path);
        }
        path = [];
      } else {
        path.push(shapeA[i]);
      }
      // Add last point if end of loop... I'm not convinced this is correct
      if (i == i_max - 1) {
        path.push(shapeA[i+1]);
      }
    }
    if (path.length > 1) {
      paths.push(path);
    }

    return paths;
  }

  /**
   * Perform a Boolean subtraction (difference) of two closed paths
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array An array of points representing Shape B removed from Shape A.
   * If Shape B does not overlap Shape A, then Shape A will be returned unchanged.
   **/
  booleanSubtract(shapeA, shapeB) {

    // Ensure that shapes are closed (e.g. Last point matches first point)
    if (!this.pointEquals(shapeA[shapeA.length-1], shapeA[0], 0.0001)) {
      shapeA.push(shapeA[0]);
    }
    if (!this.pointEquals(shapeB[shapeB.length-1], shapeB[0], 0.0001)) {
      shapeB.push(shapeB[0]);
    }

    // Get intersections
    let newA = this.shapeIntersections(shapeA, shapeB);
    let newB = this.shapeIntersections(shapeB, shapeA);

    // Build a new shape from the two shapes using the segments
    // that are outside of the other shape
    let newShape = [];
    newShape = newShape.concat(this.booleanSubtractComparison(newA, shapeB));
    newShape = newShape.concat(this.booleanSubtractComparison(newB, shapeA, true));

    // Join all of the path segments into a continuous path
    newShape = this.joinPaths(newShape);

    return newShape;
  }

  /**
   * Remove segments of Shape B that are outside of Shape A
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array A multidimensional array of paths from Shape A
   * that are outside of Shape B
   **/
  booleanSubtractComparison(shapeA, shapeB, invert = false) {
    let paths = [];

    // Extract and reformat vertices from shapeB for use with this.pointInPolygon
    let shapeB_vertices = [];
    for (let v = 0; v < shapeB.length-1; v++) {
      shapeB_vertices.push({x: shapeB[v][0], y: shapeB[v][1]});
    }

    // Loop through all segments of Shape A and determine if they are inside
    // or outside of Shape B
    let path = [];
    let i_max = shapeA.length-1;
    for (let i = 0; i < i_max; i++) {

      // Get the midpoint of the segment as the point to compare
      let mid_point = [
        this.lerp(shapeA[i][0], shapeA[i+1][0], 0.5),
        this.lerp(shapeA[i][1], shapeA[i+1][1], 0.5),
      ];

      if (!invert) {

        if (this.pointInPolygon(shapeB_vertices, mid_point[0], mid_point[1])) {
          path.push(shapeA[i]);
          if (path.length > 1) {
            paths.push(path);
          }
          path = [];
        } else {
          path.push(shapeA[i]);
        }
        // Add last point if end of loop... I'm not convinced this is correct
        if (i == i_max - 1) {
          path.push(shapeA[i+1]);
        }

      } else {

        if (!this.pointInPolygon(shapeB_vertices, mid_point[0], mid_point[1])) {
          path.push(shapeA[i]);
          if (path.length > 1) {
            paths.push(path);
          }
          path = [];
        } else {
          path.push(shapeA[i]);
        }
        // Add last point if end of loop... I'm not convinced this is correct
        if (i == i_max - 1) {
          path.push(shapeA[i+1]);
        }

      }
    }
    if (path.length > 1) {
      paths.push(path);
    }

    return paths;
  }

  /**
   * Perform a Boolean intersection of two closed paths
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array An array of points representing the overlapping region(s) of Shape A and Shape B.
   * If there is no overlap an empty shape should be returned
   **/
  booleanIntersect(shapeA, shapeB) {

    // Ensure that shapes are closed (e.g. Last point matches first point)
    if (!this.pointEquals(shapeA[shapeA.length-1], shapeA[0], 0.0001)) {
      shapeA.push(shapeA[0]);
    }
    if (!this.pointEquals(shapeB[shapeB.length-1], shapeB[0], 0.0001)) {
      shapeB.push(shapeB[0]);
    }

    // Get intersections
    let newA = this.shapeIntersections(shapeA, shapeB);
    let newB = this.shapeIntersections(shapeB, shapeA);

    // Build a new shape from the two shapes using the segments
    // that are outside of the other shape
    let newShape = [];
    newShape = newShape.concat(this.booleanIntersectionComparison(newA, shapeB));
    newShape = newShape.concat(this.booleanIntersectionComparison(newB, shapeA, true));

    // Join all of the path segments into a continuous path
    newShape = this.joinPaths(newShape);

    return newShape;
  }

  /**
   * Remove segments of Shape B that are outside of Shape A
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array A multidimensional array of paths from Shape A
   * that are outside of Shape B
   **/
  booleanIntersectionComparison(shapeA, shapeB) {
    let paths = [];

    // Extract and reformat vertices from shapeB for use with this.pointInPolygon
    let shapeB_vertices = [];
    for (let v = 0; v < shapeB.length-1; v++) {
      shapeB_vertices.push({x: shapeB[v][0], y: shapeB[v][1]});
    }

    // Loop through all segments of Shape A and determine if they are inside
    // or outside of Shape B
    let path = [];
    let i_max = shapeA.length-1;
    for (let i = 0; i < i_max; i++) {

      // Get the midpoint of the segment as the point to compare
      let mid_point = [
        this.lerp(shapeA[i][0], shapeA[i+1][0], 0.5),
        this.lerp(shapeA[i][1], shapeA[i+1][1], 0.5),
      ];

      if (!this.pointInPolygon(shapeB_vertices, mid_point[0], mid_point[1])) {
        path.push(shapeA[i]);
        if (path.length > 1) {
          paths.push(path);
        }
        path = [];
      } else {
        path.push(shapeA[i]);
      }
      // Add last point if end of loop... I'm not convinced this is correct
      if (i == i_max - 1) {
        path.push(shapeA[i+1]);
      }

    }
    if (path.length > 1) {
      paths.push(path);
    }

    return paths;
  }

  /**
   * Calculate the intersection points of Shape A with Shape B,
   * and insert these intersection points in Shape A (in order)
   *
   * @param Array An array of points defining a closed shape
   * @param Array An array of points defining a closed shape
   *
   * @returns Array An array of points representing Shape A with
   * the intersection points of Shape B added
   **/
  shapeIntersections(shapeA, shapeB) {

    let newA = [];

    // Loop through points of Shape A
    for (let i = 0; i < shapeA.length - 1; i++) {

      // Add the starting point
      newA.push(shapeA[i]);

      // Analyze current line segment of Shape A for intersections
      // with all segments of Shape B
      let segment_intersections = [];
      for (let j = 0; j < shapeB.length-1; j++) {
        let intersect = this.getLineLineCollision(
          {x: shapeA[i][0], y: shapeA[i][1]},
          {x: shapeA[i+1][0], y: shapeA[i+1][1]},
          {x: shapeB[j][0], y: shapeB[j][1]},
          {x: shapeB[j+1][0], y: shapeB[j+1][1]}
        );
        if (intersect) {
          segment_intersections.push([
            intersect.x,
            intersect.y
          ]);
        }
      }

      // Sort segment_intersections and insert in Shape A
      if (segment_intersections.length > 0) {
        let self = this;
        segment_intersections.sort(function(a, b) {
          return (self.distance(shapeA[i], a) > self.distance(shapeA[i], b) ? 1 : -1)
        });
        newA = newA.concat(segment_intersections);
      }
    }

    // Close shape
    newA.push(shapeA[shapeA.length - 1]);

    return newA;
  }

}

// Add module support for CommonJS format in Node (via `require`)
if (typeof exports === "object") {
  module.exports = PathHelper;
}