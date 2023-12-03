import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingVertical: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingVertical: 5,
  },
  text: {
    marginBottom: 10,
    textAlign: "justify",
  },
  option: {
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "yellow",
    marginVertical: 10,
  },
  textInput: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  actionButton: {
    marginBottom: 20,
    borderWidth:1,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 28,
    paddingVertical: 5,
  },
  actionButtonOnPress: {
    color: "red",
    textAlign: "center",
    fontSize: 32,
  }
});
