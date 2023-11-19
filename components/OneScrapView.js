import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Canvas from "react-native-canvas";
import { defaultStyles } from "./styles/DefaultStyles";
import { useEffect, useRef } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import drawScrap from "./DrawScrap";
import {
  getShapeHeight,
  getShapeWidth,
  getPixelPerCentimeter,
} from "./GetScrapInformation";

const marginHorizontal = 15;

const testScrapPoints = [
  {
    id: "AJ-0001",
    points: [
      { x: 2, y: 2 },
      { x: 4, y: -1 },
      { x: 3, y: -3 },
      { x: 1, y: -4 },
      { x: -2, y: -3 },
      { x: -3, y: -1 },
      { x: -2, y: 3 },
    ],
  },
  {
    id: "AJ-0002",
    points: [
      { x: 1, y: 1 },
      { x: 2, y: 0.5 },
      { x: 3, y: -3 },
      { x: 1, y: -4 },
      { x: -2, y: -2 },
      { x: -2, y: -1 },
      { x: -2, y: 3 },
    ],
  },
];

function getShapeInfo(canvasWidth, canvasHeight, scrap) {
  const shapeInfo = { shapeWidth: 0, shapeHeight: 0, pixelPerCentimeter: 0 };
  // width and height of the shape
  shapeInfo.shapeWidth = getShapeWidth(scrap.points);
  shapeInfo.shapeHeight = getShapeHeight(scrap.points);
  // from the size of the scrap and width of the canvas, figure out the "pixel/centimeter" ratio
  shapeInfo.pixelPerCentimeter = getPixelPerCentimeter(
    shapeInfo.shapeWidth,
    shapeInfo.shapeHeight,
    canvasWidth,
    canvasHeight,
  );

  return shapeInfo;
}

export default function OneScrapView({ navigation }) {
  // width and height of canvas
  const canvasWidth = Dimensions.get("window").width - marginHorizontal * 2;
  // setting height to only take 50% of the screen
  const canvasHeight = Dimensions.get("window").height * 0.65;
  // current scrap to be drawn
  let currentScrapIndex = 0;
  let scrap = testScrapPoints[currentScrapIndex];
  // info about the shape depending on the canvas
  let shapeInfo = getShapeInfo(canvasWidth, canvasHeight, scrap);

  // reference to the ctx of canvas
  let ctx = null;

  // show information about the scrap
  const openScrapInformation = () => {
    console.log("Opening Scrap Information");
  };

  // reference to the canvas
  const ref = useRef(null);
  // make sure canvas is loaded and load initial scrap
  useEffect(() => {
    // Code template from : https://www.atomlab.dev/tutorials/react-native-canvas
    if (ref.current) {
      ctx = ref.current.getContext("2d");
      drawScrap(
        scrap.points,
        ctx,
        1,
        canvasWidth,
        canvasHeight,
        shapeInfo.pixelPerCentimeter,
        shapeInfo.shapeWidth,
        shapeInfo.shapeHeight,
      );
    }
  }, [ref]);
  // update the scrap when values are changed

  const updateScrap = (value) => {
    drawScrap(
      scrap.points,
      ctx,
      value,
      canvasWidth,
      canvasHeight,
      shapeInfo.pixelPerCentimeter,
      shapeInfo.shapeWidth,
      shapeInfo.shapeHeight,
    );
  };

  const updateShapeInfo = () => {
    scrap = testScrapPoints[currentScrapIndex];
    shapeInfo = getShapeInfo(canvasWidth, canvasHeight, scrap);
  };
  // changed the scrap when user goes to next scrap
  const loadNextScrap = () => {
    // check that this is not the last scrap
    if (currentScrapIndex >= testScrapPoints.length - 1) {
      return;
    }
    // update index and all info
    currentScrapIndex++;
    updateShapeInfo();
    // update the canvas
    updateScrap(1);
  };

  const loadPreviousScrap = () => {
    // check that this is not the first scrap
    if (currentScrapIndex === 0) {
      return;
    }
    // update index and all info
    currentScrapIndex--;
    updateShapeInfo();
    // update the canvas
    updateScrap(1);
  };

  return (
    <View style={oneScrapViewStyles.container}>
      <Text style={defaultStyles.title}>{scrap.id}</Text>
      <Pressable onPress={openScrapInformation}>
        <Canvas style={oneScrapViewStyles.canvas} ref={ref} />
      </Pressable>
      <Slider
        value={1}
        minimumValue={0}
        maximumValue={2}
        onValueChange={(value) => updateScrap(value)}
      />
      <View style={oneScrapViewStyles.navigationButtons}>
        <Pressable onPress={loadPreviousScrap}>
          <Text style={oneScrapViewStyles.navigationButtonText}>Previous</Text>
        </Pressable>
        <Pressable onPress={loadNextScrap}>
          <Text style={oneScrapViewStyles.navigationButtonText}>Next</Text>
        </Pressable>
      </View>
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
  navigationButtons: {
    flex: 1,
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
});
