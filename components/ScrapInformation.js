import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { defaultStyles } from "./styles/DefaultStyles";

export default function ScrapInformation({ navigation }) {
  const [scrap, setScrap] = useState(
    global.loadedScraps[0][global.currentIndex[0]],
  );
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [imageURI, setImageURI] = useState(
    "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg",
  );

  const [id, setID] = useState("");
  const [textileClass, setTextileClass] = useState("");

  useEffect(() => {
    if (scrap !== null) {
      setID(scrap["id"]);
      setTextileClass(scrap["fabric_class"]);
      fetch(
        `https://scraps-processing-api-delicate-pond-5077.fly.dev/user/${scrap["owner"]}`,
        {
          method: "GET",
        },
      )
        .then((response) => response.json())
        .then(async (data) => {
          setUser(data);
          setUsername(data["username"]);
          setEmail(data["email"]);
          setInstagram(data["instagram"]);
        })
        .catch((error) => console.error(error));
      fetch(
        `https://scraps-processing-api-delicate-pond-5077.fly.dev/scraps/${scrap["id"]}/image`,
        {
          method: "GET",
        },
      )
        .then((response) => response.json())
        .then(async (data) => setImageURI(data))
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <SafeAreaView style={scrapInformationStyles.container}>
      <ScrollView style={scrapInformationStyles.scrollView} vertical={true}>
        <Text style={defaultStyles.title}>{scrap["id"]}</Text>
        <Text style={scrapInformationStyles.title}>textile class</Text>
        <Text style={scrapInformationStyles.text}>{scrap["fabric_class"]}</Text>
        <Text style={scrapInformationStyles.title}>textile type</Text>
        <Text style={scrapInformationStyles.text}>{scrap["fabric_type"]}</Text>
        <Text style={scrapInformationStyles.title}>user</Text>
        <Text style={scrapInformationStyles.text}>{username}</Text>
        <Text style={scrapInformationStyles.title}>user's email</Text>

        <Text style={scrapInformationStyles.text}>{email}</Text>

        <Text style={scrapInformationStyles.title}>user's instagram</Text>
        <Pressable
          onPress={() =>
            Linking.openURL(`https://www.instagram.com/${user["instagram"]}/`)
          }
        >
          <Text style={scrapInformationStyles.text}>{user["instagram"]}</Text>
        </Pressable>
        <Image
          source={{
            uri: imageURI,
          }}
          style={{ width: 350, height: 300 }}
        ></Image>
        <Text style={scrapInformationStyles.title}>note</Text>
        <Text style={scrapInformationStyles.text}>{scrap["note"]}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const scrapInformationStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  text: {
    marginVertical: 10,
    fontFamily: "Helvetica",
    fontSize: 16,
  },
});
