export function getShapeWidth(shape) {
    let smallest = shape[0].x;
    let biggest = shape[0].x;

    // check all points
    for (const points of shape) {
        if (points.x < smallest) {
            smallest = points.x;
        }
        if (points.x > biggest) {
            biggest = points.x;
        }
    }

    // return the biggest width of the shape
    return biggest - smallest;
}

export function getShapeHeight(shape) {
    let smallest = shape[0].y;
    let biggest = shape[0].y;

    // check all points
    for (const points of shape) {
        if (points.y < smallest) {
            smallest = points.y;
        }
        if (points.y > biggest) {
            biggest = points.y;
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