function drawScrapOutline(ctx, origin, scrapPoints, pixelPerCentimeter, zoom) {
  // drawing the scrap
  ctx.beginPath();
  const firstx = origin[0] + scrapPoints[0][0] * pixelPerCentimeter * zoom;
  const firsty = origin[1] + scrapPoints[0][1] * pixelPerCentimeter * zoom;
  ctx.moveTo(firstx, firsty);
  let a = scrapPoints[0][0] - scrapPoints[0][1];
  let b;
  for (let i = 1; i < scrapPoints.length; i++) {
    // lines on canvas
    const x = origin[0] + scrapPoints[i][0] * pixelPerCentimeter * zoom;
    const y = origin[1] + scrapPoints[i][1] * pixelPerCentimeter * zoom;
    ctx.lineTo(x, y);

    a = b;
  }
  ctx.fill();
  a = scrapPoints[0][0] - scrapPoints[0][1];
  for (let i = 1; i < scrapPoints.length; i++) {
    // lines on canvas
    const x = origin[0] + scrapPoints[i][0] * pixelPerCentimeter * zoom;
    const y = origin[1] + scrapPoints[i][1] * pixelPerCentimeter * zoom;

    // distance
    b = scrapPoints[i][0] - scrapPoints[i][1];
    let distance = Math.sqrt(a * a + b * b);
    ctx.font = "10px Helvetica";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const distanceText = `${(distance / pixelPerCentimeter).toFixed(
      2,
    )}cm`;
    ctx.fillStyle = "#ff0000";
    ctx.fillText(distanceText, x, y);
    a = b;
  }

  ctx.fillStyle = "#000";
}

function drawHorizontalMeasure(
  ctx,
  shapeWidth,
  shapeHeight,
  width,
  height,
  zoom,
  pixelPerCentimeter,
) {
  const leftWidthMarginFactor = 0.05;
  const rightWidthMarginFactor = 1 - leftWidthMarginFactor;
  const heightMarginFactor = 0.95;
  const tickHeight = 0.01;
  // left horizontal tick
  const leftStart = [
    width * leftWidthMarginFactor,
    height * heightMarginFactor,
  ];
  ctx.beginPath();
  ctx.moveTo(leftStart[0], leftStart[1] + height * tickHeight);
  ctx.lineTo(leftStart[0], leftStart[1] - height * tickHeight);
  ctx.stroke();
  // right horizontal tick
  const rightStart = [
    width * rightWidthMarginFactor,
    height * heightMarginFactor,
  ];
  ctx.beginPath();
  ctx.moveTo(rightStart[0], rightStart[1] + height * tickHeight);
  ctx.lineTo(rightStart[0], rightStart[1] - height * tickHeight);
  ctx.stroke();
  // line between two ticks
  ctx.beginPath();
  ctx.moveTo(leftStart[0], leftStart[1]);
  ctx.lineTo(rightStart[0], rightStart[1]);
  ctx.stroke();
  // text to indicate measure
  ctx.font = "20px Helvetica";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const horizontalMeasureText = `${(
    (1 / zoom) *
    (width / pixelPerCentimeter) *
    (rightWidthMarginFactor - leftWidthMarginFactor)
  ).toFixed(2)}cm`;
  ctx.fillText(horizontalMeasureText, width / 2, leftStart[1] + height * 0.02);
}

function drawVerticalMeasure(
  ctx,
  shapeWidth,
  shapeHeight,
  width,
  height,
  zoom,
  pixelPerCentimeter,
) {
  const topHeightMarginFactor = 0.1;
  const bottomHeightMarginFactor = 1 - topHeightMarginFactor;
  const widthMarginFactor = 0.05;
  const tickWidth = 0.01;
  const textDistance = 0.03;
  // top tick
  const topStart = [width * widthMarginFactor, height * topHeightMarginFactor];
  ctx.beginPath();
  ctx.moveTo(topStart[0] + width * tickWidth, topStart[1]);
  ctx.lineTo(topStart[0] - width * tickWidth, topStart[1]);
  ctx.stroke();
  // bottom tick
  const bottomStart = [
    width * widthMarginFactor,
    height * bottomHeightMarginFactor,
  ];
  ctx.beginPath();
  ctx.moveTo(bottomStart[0] + width * tickWidth, bottomStart[1]);
  ctx.lineTo(bottomStart[0] - width * tickWidth, bottomStart[1]);
  ctx.stroke();
  // line between two ticks
  ctx.beginPath();
  ctx.moveTo(topStart[0], topStart[1]);
  ctx.lineTo(bottomStart[0], bottomStart[1]);
  ctx.stroke();
  // text to indicate measure
  ctx.font = "20px Helvetica";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const horizontalMeasureText = `${(
    (1 / zoom) *
    (height / pixelPerCentimeter)
  ).toFixed(2)}cm`;
  ctx.fillText(
    horizontalMeasureText,
    topStart[0] + width * textDistance * 2,
    topStart[1] - height * textDistance,
  );
}

function drawMeasurement(
  ctx,
  shapeWidth,
  shapeHeight,
  width,
  height,
  zoom,
  pixelPerCentimeter,
) {
  drawHorizontalMeasure(
    ctx,
    shapeWidth,
    shapeHeight,
    width,
    height,
    zoom,
    pixelPerCentimeter,
  );
  drawVerticalMeasure(
    ctx,
    shapeWidth,
    shapeHeight,
    width,
    height,
    zoom,
    pixelPerCentimeter,
  );
}

export default function drawScrap(
  scrapPoints,
  ctx,
  zoom,
  canvasWidth,
  canvasHeight,
  pixelPerCentimeter,
  shapeWidth,
  shapeHeight,
) {
  // setting canvas size to the window size
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;

  // setting the origin at the middle of the canvas
  const origin = [canvasWidth / 2, canvasHeight / 2];

  drawScrapOutline(ctx, origin, scrapPoints, pixelPerCentimeter, zoom);

  drawMeasurement(
    ctx,
    shapeWidth,
    shapeHeight,
    canvasWidth,
    canvasHeight,
    zoom,
    pixelPerCentimeter,
  );
}
