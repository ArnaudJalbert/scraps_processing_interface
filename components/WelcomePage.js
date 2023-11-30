import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "./styles/DefaultStyles";

function openRegisterScrap() {
  // TODO: Put right url
  Linking.openURL("").catch((err) =>
    console.error("An error occurred", err),
  );
}

export default function WelcomePage({ navigation }) {
  return (
    <View style={welcomePageStyles.container}>
      <Text style={defaultStyles.appName}>scraps processing</Text>
      <Text style={[defaultStyles.title, welcomePageStyles.titleFlex]}>
        welcome to scraps_processing, the app to register your scraps so you can
        use them or share them later
      </Text>
      <View style={welcomePageStyles.optionsContainer}>
        <Pressable onPress={() => navigation.navigate("Register Scrap")}>
          <Text style={defaultStyles.option}> register a scrap</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("View Scraps")}>
          <Text style={defaultStyles.option}> view scraps</Text>
        </Pressable>
      </View>
    </View>
  );
}

const welcomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
  },

  titleFlex: {
    flex: 2,
  },
  subTitleFlex: {
    flex: 1,
  },
  optionsContainer: {
    flex: 10,
  },
});
