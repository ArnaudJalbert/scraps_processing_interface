import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Canvas from "react-native-canvas";
import { defaultStyles } from "./styles/DefaultStyles";
import { useEffect, useRef } from "react";
import { Slider } from "@miblanchard/react-native-slider";

const marginHorizontal = 15;

const testScrapPoints = [
  { x: 2, y: 2 },
  { x: 4, y: -1 },
  { x: 3, y: -3 },
  { x: 1, y: -4 },
  { x: -2, y: -3 },
  { x: -3, y: -1 },
  { x: -2, y: 3 },
];

function getShapeWidth(shape) {
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

function getShapeHeight(shape) {
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

function getPixelPerCentimeter(
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

function drawMeasurement(ctx, shapeWidth, shapeHeight, width, height)
{
// drawing the measurement
// left horizontal tick
const leftStart = { x: width * 0.05, y: height * 0.95 };
ctx.beginPath();
ctx.moveTo(leftStart.x, leftStart.y + height * 0.01);
ctx.lineTo(leftStart.x, leftStart.y - height * 0.01);
ctx.stroke();
// right horizontal tick
const rightStart = { x: width * 0.95, y: height * 0.95 };
ctx.beginPath();
ctx.moveTo(rightStart.x, rightStart.y + height * 0.01);
ctx.lineTo(rightStart.x, rightStart.y - height * 0.01);
ctx.stroke();
// line between two ticks
ctx.beginPath();
ctx.moveTo(leftStart.x, leftStart.y);
ctx.lineTo(rightStart.x, rightStart.y);
ctx.stroke();

ctx.font = "20px Helvetica";
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
const horizontalMeasureText = `${shapeWidth}cm`;
ctx.fillText(horizontalMeasureText, (width/2), leftStart.y - (height * 0.02));
}

const drawScrap = (ctx, zoom, canvasWidth, canvasHeight, pixelPerCentimeter, shapeWidth, shapeHeight) => {
  // setting canvas size to the window size
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;

  // getting the with and the height of the canvas
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  // setting the origin at the middle of the canvas
  const origin = { x: width / 2, y: height / 2 };

  // drawing the scrap
  ctx.beginPath();
  ctx.moveTo(
      origin.x + testScrapPoints[0].x * pixelPerCentimeter * zoom,
      origin.y + testScrapPoints[0].y * pixelPerCentimeter * zoom,
  );
  for (const scrapPoint of testScrapPoints.slice(1)) {
    const x = origin.x + scrapPoint.x * pixelPerCentimeter * zoom;
    const y = origin.y + scrapPoint.y * pixelPerCentimeter * zoom;
    ctx.lineTo(x, y);
  }
  ctx.fill();

  drawMeasurement(ctx, shapeWidth, shapeHeight, width, height)
};

export default function OneScrapView({ navigation }) {
  // width and height of canvas
  const canvasWidth = Dimensions.get("window").width - marginHorizontal * 2;
  // setting height to only take 50% of the screen
  const canvasHeight = Dimensions.get("window").height * 0.75;

  // width and height of the shape
  const shapeWidth = getShapeWidth(testScrapPoints);
  const shapeHeight = getShapeHeight(testScrapPoints);

  console.log(shapeWidth);
  console.log(shapeHeight);

  // reference to the canvas
  const ref = useRef(null);
  // reference to the ctx of canvas
  let ctx = null;
  const pixelPerCentimeter = getPixelPerCentimeter(
    shapeWidth,
    shapeHeight,
    canvasWidth,
    canvasHeight,
  );


  const updateScrap = (value) => {
    drawScrap(ctx, value, canvasWidth, canvasHeight, pixelPerCentimeter, shapeWidth, shapeHeight);
  };

  const openScrapInformation = () => {
    console.log("allo");
  };

  // Code template from : https://www.atomlab.dev/tutorials/react-native-canvas
  useEffect(() => {
    if (ref.current) {
      ctx = ref.current.getContext("2d");
      drawScrap(ctx, 1, canvasWidth, canvasHeight, pixelPerCentimeter, shapeWidth, shapeHeight);
    }
  }, [ref]);

  return (
    <View style={oneScrapViewStyles.container}>
      <Pressable onPress={openScrapInformation}>
        <Canvas
          style={{
            flex: 1,
          }}
          ref={ref}
        />
      </Pressable>
      <Slider
        value={1}
        minimumValue={0}
        maximumValue={2}
        onValueChange={(value) => updateScrap(value)}
      />
    </View>
  );
}

const oneScrapViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    marginBottom: 50,
    marginHorizontal: marginHorizontal,
    justifyContent: "center", //Centered vertically
  },
});
