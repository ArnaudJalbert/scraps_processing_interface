function drawScrapOutline(ctx, origin, scrapPoints, pixelPerCentimeter, zoom) {
  // drawing the scrap
  ctx.beginPath();
  ctx.moveTo(
    origin.x + scrapPoints[0].x * pixelPerCentimeter * zoom,
    origin.y + scrapPoints[0].y * pixelPerCentimeter * zoom,
  );
  for (const scrapPoint of scrapPoints.slice(1)) {
    const x = origin.x + scrapPoint.x * pixelPerCentimeter * zoom;
    const y = origin.y + scrapPoint.y * pixelPerCentimeter * zoom;
    ctx.lineTo(x, y);
  }
  ctx.fill();
}

function drawHorizontalMeasure(
  ctx,
  shapeWidth,
  shapeHeight,
  width,
  height,
  zoom,
) {
  const leftWidthMarginFactor = 0.05;
  const rightWidthMarginFactor = 1 - leftWidthMarginFactor;
  const heightMarginFactor = 0.95;
  const tickHeight = 0.01;
  // left horizontal tick
  const leftStart = {
    x: width * leftWidthMarginFactor,
    y: height * heightMarginFactor,
  };
  ctx.beginPath();
  ctx.moveTo(leftStart.x, leftStart.y + height * tickHeight);
  ctx.lineTo(leftStart.x, leftStart.y - height * tickHeight);
  ctx.stroke();
  // right horizontal tick
  const rightStart = {
    x: width * rightWidthMarginFactor,
    y: height * heightMarginFactor,
  };
  ctx.beginPath();
  ctx.moveTo(rightStart.x, rightStart.y + height * tickHeight);
  ctx.lineTo(rightStart.x, rightStart.y - height * tickHeight);
  ctx.stroke();
  // line between two ticks
  ctx.beginPath();
  ctx.moveTo(leftStart.x, leftStart.y);
  ctx.lineTo(rightStart.x, rightStart.y);
  ctx.stroke();
  // text to indicate measure
  ctx.font = "20px Helvetica";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const horizontalMeasureText = `${(
    (1 / zoom) *
    (1 - leftWidthMarginFactor * 2) *
    shapeWidth
  ).toFixed(2)}cm`;
  ctx.fillText(horizontalMeasureText, width / 2, leftStart.y + height * 0.02);
}

function drawVerticalMeasure(
  ctx,
  shapeWidth,
  shapeHeight,
  width,
  height,
  zoom,
) {
  const topHeightMarginFactor = 0.1;
  const bottomHeightMarginFactor = 1 - topHeightMarginFactor;
  const widthMarginFactor = 0.05;
  const tickWidth = 0.01;
  const textDistance = 0.03;
  // top tick
  const topStart = {
    x: width * widthMarginFactor,
    y: height * topHeightMarginFactor,
  };
  ctx.beginPath();
  ctx.moveTo(topStart.x + width * tickWidth, topStart.y);
  ctx.lineTo(topStart.x - width * tickWidth, topStart.y);
  ctx.stroke();
  // bottom tick
  const bottomStart = {
    x: width * widthMarginFactor,
    y: height * bottomHeightMarginFactor,
  };
  ctx.beginPath();
  ctx.moveTo(bottomStart.x + width * tickWidth, bottomStart.y);
  ctx.lineTo(bottomStart.x - width * tickWidth, bottomStart.y);
  ctx.stroke();
  // line between two ticks
  ctx.beginPath();
  ctx.moveTo(topStart.x, topStart.y);
  ctx.lineTo(bottomStart.x, bottomStart.y);
  ctx.stroke();
  // text to indicate measure
  ctx.font = "20px Helvetica";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const horizontalMeasureText = `${(
    (1 / zoom) *
    (1 - topHeightMarginFactor * 2) *
    shapeHeight
  ).toFixed(2)}cm`;
  ctx.fillText(
    horizontalMeasureText,
    topStart.x + width * textDistance * 2,
    topStart.y - height * textDistance,
  );
}

function drawMeasurement(ctx, shapeWidth, shapeHeight, width, height, zoom) {
  drawHorizontalMeasure(ctx, shapeWidth, shapeHeight, width, height, zoom);
  drawVerticalMeasure(ctx, shapeWidth, shapeHeight, width, height, zoom);
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
  const origin = { x: canvasWidth / 2, y: canvasHeight / 2 };

  drawScrapOutline(ctx, origin, scrapPoints, pixelPerCentimeter, zoom);

  drawMeasurement(
    ctx,
    shapeWidth,
    shapeHeight,
    canvasWidth,
    canvasHeight,
    zoom,
  );
}
