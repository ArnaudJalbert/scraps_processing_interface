import { StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "./styles/DefaultStyles";

export default function WelcomePage({ navigation }) {
    return (
        <View style={oneScrapViewStyles.container}>
            <Text>Bonjour!</Text>
        </View>
    );
}

const oneScrapViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
    },
});
