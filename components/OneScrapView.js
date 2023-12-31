import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Canvas from "react-native-canvas";
import { defaultStyles } from "./styles/DefaultStyles";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import drawScrap from "./DrawScrap";
import {
  getShapeHeight,
  getShapeWidth,
  getPixelPerCentimeter,
} from "./GetScrapInformation";

const marginHorizontal = 15;

function getShapeInfo(canvasWidth, canvasHeight, scrap) {
  const shapeInfo = {
    shapeWidth: 0,
    shapeHeight: 0,
    pixelPerCentimeter: 0,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
  };
  // width and height of the shape
  shapeInfo.shapeWidth = getShapeWidth(scrap["dimensions"]);
  shapeInfo.shapeHeight = getShapeHeight(scrap["dimensions"]);
  // from the size of the scrap and width of the canvas, figure out the "pixel/centimeter" ratio
  shapeInfo.pixelPerCentimeter = getPixelPerCentimeter(
    shapeInfo.shapeWidth,
    shapeInfo.shapeHeight,
    canvasWidth,
    canvasHeight,
  );

  global.currentShapeInfo[0] = shapeInfo;

  return shapeInfo;
}

export default function OneScrapView({ navigation }) {
  // all scraps data
  let scraps = [];
  // current scrap to be drawn
  let currentScrapIndex = 0;
  global.currentIndex[0] = currentScrapIndex;
  // scrap to draw
  let scrap = null;
  // shape information
  let shapeInformation = null;

  // width and height of canvas
  const canvasWidth = Dimensions.get("window").width - marginHorizontal * 2;
  // setting height to only take 50% of the screen
  const canvasHeight = Dimensions.get("window").height * 0.65;

  // reference to the ctx of canvas
  let ctx = null;

  const loadScrapsData = () => {
    const options = {
      method: "GET",
    };
    // filters to get scraps
    const filters = global.scrapFilters[0];
    let filterString = "?";
    for (const filter in filters) {
      filterString += `${filter}=${filters[filter]}&`;
    }
    filterString = filterString.slice(0, -1);
    let requestString = `https://scraps-processing-api-delicate-pond-5077.fly.dev/scraps`;
    if (filterString !== "?") {
      requestString += filterString;
    }
    fetch(requestString, options)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.length > 0) {
          currentScrapIndex = 0;
          scraps = data;
          global.loadedScraps[0] = data;
          global.currentIndex[0] = currentScrapIndex;
          scrap = scraps[currentScrapIndex];
          shapeInformation = getShapeInfo(canvasWidth, canvasHeight, scrap);
          updateScrap(0.8);
        } else {
          scraps = [];
          scrap = null;
          drawBlank();
        }
      })
      .catch((error) => console.error(error));
  };

  // reference to the canvas
  const ref = useRef(null);
  let focusHandler = null;

  // make sure canvas and data are loaded and load initial scrap
  useEffect(() => {
    // Code template from : https://www.atomlab.dev/tutorials/react-native-canvas
    loadScrapsData();
    if (ref.current) {
      ctx = ref.current.getContext("2d");
    }

    focusHandler = navigation.addListener("focus", () => {
      refresh();
    });

    return focusHandler;
  }, [ref, focusHandler]);

  const drawBlank = () => {
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    ctx.font = "20px Helvetica";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(
      "no scraps match your filters",
      canvasWidth / 2,
      canvasHeight / 2,
    );
  };
  // update the scrap when values are changed
  const updateScrap = (value) => {
    if (ref.current && scrap !== null) {
      drawScrap(
        scrap["dimensions"],
        ctx,
        value,
        canvasWidth,
        canvasHeight,
        shapeInformation.pixelPerCentimeter,
        shapeInformation.shapeWidth,
        shapeInformation.shapeHeight,
          true,
      );
    }
  };

  const updateShapeInfo = () => {
    if (scrap !== null) {
      scrap = scraps[currentScrapIndex];
      shapeInformation = getShapeInfo(canvasWidth, canvasHeight, scrap);
    }
  };
  // changed the scrap when user goes to next scrap
  const loadNextScrap = () => {
    // check that scraps are loaded
    if (scraps == null) {
      loadScrapsData();
      return;
    }
    // check that this is not the last scrap
    if (currentScrapIndex >= scraps.length - 1) {
      return;
    }
    if (scrap === null) {
      return;
    }
    // update index and all info
    currentScrapIndex++;
    global.currentIndex[0] = currentScrapIndex;
    updateShapeInfo();
    // update the canvas
    updateScrap(0.9);
  };

  const loadPreviousScrap = () => {
    // check that scraps are loaded
    if (scraps == null) {
      loadScrapsData();
      return;
    }
    // check that this is not the first scrap
    if (currentScrapIndex === 0) {
      return;
    }
    if (scrap === null) {
      return;
    }
    // update index and all info
    currentScrapIndex--;
    global.currentIndex[0] = currentScrapIndex;
    updateShapeInfo();
    // update the canvas
    updateScrap(1);
  };

  // show information about the scrap
  const openScrapInformation = () => {
    navigation.navigate("Scrap Information");
  };

  const openSquareFit = () => {
    navigation.navigate("SquareFit");
  };

  const refresh = () => {
    loadScrapsData();
    currentScrapIndex = 0;
    global.currentIndex[0] = currentScrapIndex;
  };

  const openFilterWindow = () => {
    navigation.navigate("Filter Scraps");
  };

  return (
    <View style={oneScrapViewStyles.container}>
      <Text style={defaultStyles.title}>Scraps</Text>
      <Pressable onPress={openScrapInformation}>
        <Canvas style={oneScrapViewStyles.canvas} ref={ref} />
      </Pressable>
      <Slider
        value={1}
        minimumValue={0}
        maximumValue={2}
        onValueChange={(value) => updateScrap(value)}
      />
      <View style={oneScrapViewStyles.buttons}>
        <View style={oneScrapViewStyles.navigationButtons}>
          <Pressable onPress={loadPreviousScrap}>
            <Text style={oneScrapViewStyles.navigationButtonText}>
              Previous
            </Text>
          </Pressable>
          <Pressable onPress={loadNextScrap}>
            <Text style={oneScrapViewStyles.navigationButtonText}>Next</Text>
          </Pressable>
        </View>
        <View style={oneScrapViewStyles.navigationButtons}>
          <Pressable onPress={openSquareFit}>
            <Text style={oneScrapViewStyles.filterButton}>Shape Fit</Text>
          </Pressable>
          <Pressable onPress={openFilterWindow}>
            <Text style={oneScrapViewStyles.filterButton}>Filter</Text>
          </Pressable>
        </View>
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
