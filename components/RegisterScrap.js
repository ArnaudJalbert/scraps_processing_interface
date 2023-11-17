import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import DropdownComponent from "./DropdownComponent";
import {
  fabricsTypesOptions,
  textileClassOptions,
} from "../constants/ScrapConstants";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { defaultStyles } from "./styles/DefaultStyles";
import * as WebBrowser from 'expo-web-browser';

export default function RegisterScrap() {
  const [locationIsChecked, setLocationIsChecked] = useState(false);
  const [result, setResult] = useState(null)
  const openScanner = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Scrap</Text>
      <Pressable onPress={openScanner}>
        <Text style={defaultStyles.option}>scan your scrap</Text>
      </Pressable>
      <TextInput
        editable
        multiline={true}
        textAlign="left"
        style={styles.descriptionInput}
        onChangeText={() => console.log("text")}
        placeholder="Optional Description..."
      />
      {/* Dropdown menu to select the main textile class*/}
      <DropdownComponent
        placeholder={textileClassOptions.placeholder}
        data={textileClassOptions.data}
      />
      {/* Dropdown menu to optionally select the fabrics type*/}
      <DropdownComponent
        placeholder={fabricsTypesOptions.placeholder}
        data={fabricsTypesOptions.data}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={locationIsChecked}
          onValueChange={setLocationIsChecked}
        />
        <Text style={styles.checkboxLabel}>
          {"Use your location to geotag the scrap"}
        </Text>
      </View>
      <Button color="#000" title={"Register Scrap"} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 50,
    textAlign: "center",
  },
  shape: {
    width: "80%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#dcba19",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    paddingHorizontal: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 150,
    borderColor: "#999",
  },
});
