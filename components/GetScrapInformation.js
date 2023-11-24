export function getShapeWidth(shape) {
  let smallest = shape[0][0];
  let biggest = shape[0][0];

  // check all points
  for (const points of shape) {
    if (points[0] < smallest) {
      smallest = points[0];
    }
    if (points[0] > biggest) {
      biggest = points[0];
    }
  }

  // return the biggest width of the shape
  return biggest - smallest;
}

export function getShapeHeight(shape) {
  let smallest = shape[0][1];
  let biggest = shape[0][1];

  // check all points
  for (const points of shape) {
    if (points[1] < smallest) {
      smallest = points[1];
    }
    if (points[1] > biggest) {
      biggest = points[1];
    }
  }

  // return the biggest width of the shape
  return biggest - smallest;
}

export function getPixelPerCentimeter(
  shapeWidth,
  shapeHeight,
  canvasWidth,
  canvasHeight,
) {
  const height = canvasHeight / 2 / shapeHeight;
  const width = canvasWidth / 2 / shapeWidth;
  if (height > width) {
    return height;
  }
  return width;
}
