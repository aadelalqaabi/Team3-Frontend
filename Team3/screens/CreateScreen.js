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
    <SafeAreaView style={{ margin: 10 }}>
      <Text style={styles.title}>Choose an image</Text>
      <View>
        {image === null ? (
          <Button title="Pick an image from camera roll" onPress={pickImage} />
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
              }}
            />
            <Button title="Choose another image " onPress={pickImage} />
          </View>
        )}
      </View>
      <Text style={styles.title}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={handleChangeTitle}
      />
      <Text style={styles.title}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={handleChangeDescription}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
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
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
});
