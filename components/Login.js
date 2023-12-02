import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { defaultStyles } from "./styles/DefaultStyles";
import { useState } from "react";

export default function Login({ navigation }) {
  // login input and user data
  const [login, setLogin] = useState("");

  // create user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");

  const getUser = async (login) => {
    // flag to tell if user exists
    let user = null;
    let userExists = false;
    // options for the user request
    const options = {
      method: "GET",
    };
    // request address
    let requestString = `https://scraps-processing-api.fly.dev/user/${login.toLowerCase()}`;
    await fetch(requestString, options)
      .then((response) => {
        if (response.status === 200) {
          userExists = true;
          return response.json();
        }
        return {};
      })
      .then(async (data) => {
        user = data;
      })
      .catch((error) => console.error(error));

    if (userExists) {
      global.loggedUser[0] = user;
      navigation.navigate("View Scraps");
    } else {
      // TODO display bad login response
    }
  };

  const createUser = async () => {
    let user = null;
    let userCreated = false;
    // options for the user request
    const options = {
      method: "POST",
    };
    let requestString;
    // request address
    requestString = `https://scraps-processing-api.fly.dev/create-user?username=${username}&email=${email}&instagram=${instagram}`;

    await fetch(requestString, options)
      .then((response) => {
        if (response.status === 200) {
          userCreated = true;
          return response.json();
        }
        return {};
      })
      .then((data) => {
        if (userCreated) {
          user = data;
        }
      })
      .catch((error) => console.error(error));

    if (userCreated) {
      global.loggedUser[0] = user;
      navigation.navigate("View Scraps");
    } else {
      console.log("user was not created successfully");
    }
  };
  return (
    <View style={loginPageStyles.container}>
      <Text style={defaultStyles.appName}>scraps processing</Text>
      <Text style={defaultStyles.text}>
        to login, please enter your email, username or instagram handle
      </Text>
      <TextInput
        editable
        autoCapitalize="none"
        multiline={false}
        textAlign="left"
        style={defaultStyles.textInput}
        onChangeText={(inputLogin) => setLogin(inputLogin)}
        placeholder="..."
      />
      <Pressable onPress={() => getUser(login)}>
        <Text style={defaultStyles.actionButton}>login</Text>
      </Pressable>
      <Text style={defaultStyles.text}>
        if you have never used the app, create an account
      </Text>
      <TextInput
        editable
        autoCapitalize="none"
        multiline={false}
        textAlign="left"
        style={defaultStyles.textInput}
        onChangeText={(inputUsername) => setUsername(inputUsername)}
        placeholder="username"
      />
      <TextInput
        editable
        autoCapitalize="none"
        multiline={false}
        textAlign="left"
        style={defaultStyles.textInput}
        onChangeText={(inputEmail) => setEmail(inputEmail)}
        placeholder="email"
      />
      <TextInput
        editable
        autoCapitalize="none"
        multiline={false}
        textAlign="left"
        style={defaultStyles.textInput}
        onChangeText={(inputInstagram) => setInstagram(inputInstagram)}
        placeholder="instagram handle"
      />
      <Pressable onPress={() => createUser(login)}>
        <Text style={defaultStyles.actionButton}>create account</Text>
      </Pressable>
    </View>
  );
}

const loginPageStyles = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 50,
  },
});
