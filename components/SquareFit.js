import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Canvas from "react-native-canvas";
import { defaultStyles } from "./styles/DefaultStyles";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import drawScrap from "./DrawScrap";

const marginHorizontal = 15;

export default function SquareFit({ navigation }) {
  // reference to the canvas
  let ctx;
  const ref = useRef(null);

  const [scrap, setScrap] = useState(
    global.loadedScraps[0][global.currentIndex[0]],
  );
  const [shapeInfo, setShapeInfo] = useState(global.currentShapeInfo[0]);
  let zoom = 0.95 * 0.5;

  let width;
  let currentWidth;
  let height;
  let currentHeight;
  let startingX;
  let currentX;
  let startingY;
  let currentY;
  let currentRotation = 0;

  // make sure canvas and data are loaded and load initial scrap
  useEffect(() => {
    // Code template from : https://www.atomlab.dev/tutorials/react-native-canvas
    width = shapeInfo.canvasWidth / 3;
    currentWidth = width;
    height = shapeInfo.canvasHeight * 0.5;
    currentHeight = height / 3;
    startingX = shapeInfo.canvasWidth / 3;
    currentX = startingX;
    startingY = (height / 7) * 2;
    currentY = startingY;
    if (ref.current) {
      ctx = ref.current.getContext("2d");
      drawScrap(
        scrap["dimensions"],
        ctx,
        zoom,
        shapeInfo.canvasWidth,
        height,
        shapeInfo.pixelPerCentimeter,
        shapeInfo.shapeWidth,
        shapeInfo.shapeHeight,
      );
      // rect

      drawSquare(currentWidth, currentHeight, startingX, startingY);
    }
  }, [ref]);

  function drawSquare(width, height, startX, startY, rotation) {
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate((currentRotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // text
    ctx.font = "15px Helvetica";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const horizontalMeasureText = `${Math.abs(
      (1 / zoom) * (width / shapeInfo.pixelPerCentimeter),
    ).toFixed(2)}cm`;
    const verticalMeasureText = `${Math.abs(
      (1 / zoom) * (height / shapeInfo.pixelPerCentimeter),
    ).toFixed(2)}cm`;
    ctx.fillStyle = "#ff0000";
    ctx.fillText(horizontalMeasureText, width / 2, -10);
    ctx.fillText(verticalMeasureText, width+35, height/2);
    ctx.restore();
  }

  return (
    <View style={oneScrapViewStyles.container}>
      <Text style={defaultStyles.title}>Scraps</Text>
      <Canvas style={oneScrapViewStyles.canvas} ref={ref} />
      <Text>scale scrap</Text>
      <Slider
        value={1}
        minimumValue={0}
        maximumValue={2}
        onValueChange={(value) => {
          zoom = value * 0.7;
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          drawSquare(currentWidth, currentHeight, currentX, currentY);
        }}
      />
      <Text>shape width</Text>
      <Slider
        value={1}
        minimumValue={-5}
        maximumValue={5}
        onValueChange={(value) => {
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          currentWidth = width * value;
          drawSquare(currentWidth, currentHeight, currentX, currentY);
        }}
      />
      <Text>shape height</Text>
      <Slider
        value={1}
        minimumValue={-3}
        maximumValue={2}
        onValueChange={(value) => {
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          currentHeight = height * value;
          drawSquare(currentWidth, currentHeight, currentX, currentY);
        }}
      />
      <Text>shape horizontal position</Text>
      <Slider
        value={1}
        minimumValue={-3}
        maximumValue={2}
        onValueChange={(value) => {
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          currentX = startingX * value;
          drawSquare(currentWidth, currentHeight, currentX, currentY);
        }}
      />
      <Text>shape vertical position</Text>
      <Slider
        value={1}
        minimumValue={-3}
        maximumValue={2}
        onValueChange={(value) => {
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          currentY = startingY * value;
          drawSquare(currentWidth, currentHeight, currentX, currentY);
        }}
      />
      <Text>rotation</Text>

      <Slider
        value={0}
        minimumValue={0}
        maximumValue={360}
        onValueChange={(value) => {
          drawScrap(
            scrap["dimensions"],
            ctx,
            zoom,
            shapeInfo.canvasWidth,
            height,
            shapeInfo.pixelPerCentimeter,
            shapeInfo.shapeWidth,
            shapeInfo.shapeHeight,
          );
          currentRotation = value;
          drawSquare(
            currentWidth,
            currentHeight,
            currentX,
            currentY,
            currentRotation,
          );
        }}
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
  canvas: {
    flex: 1,
    borderWidth: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#000",
  },
  navigationButtonText: {
    color: "#fff",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    color: "#fff",
    backgroundColor: "#000",
    paddingVertical: 10,
    textAlign: "center",
  },
});
