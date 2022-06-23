import { StyleSheet, View, Image, Button } from "react-native";
import React, { useState } from "react";
import Reinput from "reinput";
import * as ImagePicker from "expo-image-picker";
import { baseURL } from "../../stores/instance";
import tripStore from "../../stores/tripStore";

export default function EditTrip({ route }) {
  const { trip } = route.params;
  const [newTrip, setNewTrip] = useState(null);
  const [image, setImage] = useState(baseURL + trip.image);

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
      setNewTrip({
        ...newTrip,
        image: {
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
          name: filename,
          type: img_type,
        },
      });
      setImage(
        Platform.OS === "android"
          ? result.uri
          : result.uri.replace("file://", "")
      );
    }
  };
  const handleChangeTitle = (text) => {
    setNewTrip({
      ...newTrip,
      title: text,
    });
  };
  const handleChangeDescription = (text) => {
    setNewTrip({
      ...newTrip,
      description: text,
    });
  };

  const handleSubmit = (event) => {
    console.log(newTrip);
    tripStore.updateTrip(newTrip, trip._id);
  };

  return (
    <View style={styles.text}>
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
        <Reinput
          defaultValue={trip.title}
          label="Title"
          placeholder="Type here..."
          onChangeText={handleChangeTitle}
        />
        <Reinput
          defaultValue={trip.description}
          label="Desctiption"
          placeholder="Type here..."
          onChangeText={handleChangeDescription}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 100,
  },
});
