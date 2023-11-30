import { StyleSheet } from "react-native";
import WelcomePage from "./components/WelcomePage";
import RegisterScrap from "./components/RegisterScrap";
import OneScrapView from "./components/OneScrapView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="welcome" component={WelcomePage} />
        <Stack.Screen
          name="Register Scrap"
          component={RegisterScrap}
          initialParams={{ navigation: navigator }}
          options={{ title: "capture" }}
        />
        <Stack.Screen
            name="View Scraps"
            component={OneScrapView}
            initialParams={{ navigation: navigator }}
            options={{ title: "view" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
});
