import {Pressable, StyleSheet, Text, View} from "react-native";
import DropdownComponent from "./DropdownComponent";
import { useEffect, useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { defaultStyles } from "./styles/DefaultStyles";

export default function FilterScraps({ navigation }) {
  // textile classes
  const textileClassPlaceholder = "any";
  const [textileClasses, setTextileClasses] = useState(["any"]);
  const [selectedClass, setSelectedClass] = useState("any");

  // textile types
  const textileTypePlaceholder = "any";
  const [textileTypes, setTextileTypes] = useState(["any"]);
  const [selectedType, setSelectedType] = useState("any");

  // scrap selection
  const selectionChoices = [
    "scraps by everyone",
    "my scraps",
    "only close scraps",
  ];
  const [selectedSelectionChoice, setSelectedSelectionChoice] =
    useState("scraps by everyone");

  // scrap distance
  const [scrapsDistance, setScrapsDistance] = useState(5);

  useEffect(() => {
    const loadTextileClasses = () => {
      fetch("https://scraps-processing-api.fly.dev/textile-classes", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          data.push("any");
          setTextileClasses(data);
        })
        .catch((error) => console.error(error));
    };
    loadTextileClasses();

    const loadTextileTypes = () => {
      let requestAllTypes = `https://scraps-processing-api.fly.dev/textile-types`;
      fetch(requestAllTypes, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          data.push("any");
          setTextileTypes(data);
        })
        .catch((error) => console.error(error));
    };
    loadTextileTypes();
  }, []);

  const loadFilteredPage = () => {
    let filter = {};
    if(selectedClass !== "any"){
      filter["fabric_class"] = selectedClass;
    }
    if (selectedType ){
      filter["fabric_type"] = selectedClass;
    }
    global.scrapFilters = filter;
    navigation.goBack();
  }

  return (
    <View style={filterStyles.container}>
      {/* Dropdown menu to select the main textile class*/}
      <View>
        <Text style={defaultStyles.text}>filter by textile class</Text>
        <DropdownComponent
          placeholder={textileClassPlaceholder}
          data={textileClasses}
          setSelected={(value) => {
            setSelectedClass(value);
          }}
        />
      </View>
      <View>
        <Text style={defaultStyles.text}>filter by textile type</Text>
        <DropdownComponent
          placeholder={textileTypePlaceholder}
          data={textileTypes}
          setSelected={(value) => setSelectedType(value)}
        />
      </View>

      <View>
        <Text style={defaultStyles.text}>
          see your scraps only or others' scraps
        </Text>
        <DropdownComponent
          placeholder={selectedSelectionChoice}
          data={selectionChoices}
          setSelected={(value) => {
            if (value === "only close scraps") {
              setScrapsDistance(5);
            }
            setSelectedSelectionChoice(value);
          }}
        />
      </View>
      <View>
        <Text>max distance from scraps -> {scrapsDistance}km</Text>
        <Slider
          value={scrapsDistance}
          minimumValue={0}
          maximumValue={100}
          onValueChange={(value) => setScrapsDistance(Math.floor(value))}
        />
      </View>
      <Pressable onPress={loadFilteredPage}>
        <Text style={defaultStyles.actionButton}> filter</Text>
      </Pressable>
    </View>

  );
}

const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
  },
});
