import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  Button,
  Platform,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import tripStore from "../stores/tripStore";
import * as ImagePicker from "expo-image-picker";
import Reinput from "reinput";
import authStore from "../stores/authStore";
import { baseURL } from "../stores/instance";

export function CreateScreen() {
  const [image, setImage] = useState(null);
  const [trip, setTrip] = useState({
    title: "",
    description: "",
    image: "",
  });

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

  const handleChangeTitle = (text) => {
    setTrip({
      ...trip,
      title: text,
    });
  };
  const handleChangeDescription = (text) => {
    setTrip({
      ...trip,
      description: text,
    });
  };

  const handleSubmit = (event) => {
    tripStore.createTrip(trip);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fffffc" }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fffffc",
          marginTop: 70,
          margin: 20,
          height: "100%",
        }}
      >
        <Text style={styles.title}>Create a trip</Text>
        <View style={{ paddingBottom: 30 }}>
          {image === null ? (
            <Button title="Choose an image" onPress={pickImage} />
          ) : (
            <></>
          )}

          {image && (
            <View>
              <Image
                source={{ uri: image }}
                style={{
                  alignSelf: "center",
                  width: 384,
                  height: 216,
                  borderRadius: 20,
                  margin: 10,
                  shadowOpacity: 0.8,
                  shadowRadius: 4,
                  shadowColor: "black",
                  shadowOffset: {
                    height: 0,
                    width: 0,
                  },
                  elevation: 1,
                }}
              />
              <Button title="Choose another image " onPress={pickImage} />
            </View>
          )}
        </View>
        <Reinput
          label="Title"
          placeholder="Type here..."
          onChangeText={handleChangeTitle}
        />
        <Reinput
          label="Description"
          placeholder="Type here..."
          onChangeText={handleChangeDescription}
        />

        <Button title="Submit" onPress={handleSubmit} />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 22,
    fontWeight: "bold",
  },
});
