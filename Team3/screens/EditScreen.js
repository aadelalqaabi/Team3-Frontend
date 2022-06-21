import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import authStore from "../stores/authStore";

export default function EditScreen() {
  const [text, onChangeText] = useState("");
  const [user, setUser] = useState(authStore.user);
  const navigation = useNavigation();
  const cancelButton = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename = result.uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let img_type = match ? `image/${match[1]}` : `image`;
      setTrip({
        ...trip,
        image: {
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
          name: filename,
          type: img_type,
        },
      });
      setImage(result.uri);
    }
  };

  const handleChangeBio = (text) => {
    setUser({
      ...user,
      bio: text,
    });
    console.log(user);
  };

  const handleSubmit = (event) => {
    authStore.updateUser(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancel}>
        <Button onPress={cancelButton} title="Cancel" color="#841584" />
      </View>
      <View style={styles.main}>
        <View style={styles.addImage}>
          <Button
            // onPress={editProfileButton}
            title="Add Image"
            color="#841584"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={handleChangeBio}
            placeholder="add your bio..."
          />
        </View>
        <View style={styles.addImage}>
          <Button onPress={handleSubmit} title="Submit" color="#841584" />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  cancel: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    backgroundColor: "pink",
    borderRadius: 10,
    padding: 10,
  },
  addImageText: {
    fontSize: 30,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
