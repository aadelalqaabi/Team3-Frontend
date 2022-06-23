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
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export function CreateScreen() {
  const navigation = useNavigation();
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
    Toast.show({
      type: "success",
      text1: "Trip Added",
    });
    tripStore.createTrip(trip);
    navigation.navigate("TripList");
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
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                zIndex: 1,
                marginTop: 100,
                borderColor: "black",
                borderWidth: 0.5,
                backgroundColor: "#04a9f4",
                borderRadius: "50%",
                width: 200,
                padding: 5,
                paddingLeft: 30,
              }}
            >
              <MaterialIcons
                style={{ position: "absolute", marginLeft: 10, marginTop: 8 }}
                name="file-upload"
                size={30}
                color="white"
              />
              <Button
                color={"white"}
                title="Choose an image"
                onPress={pickImage}
              />
            </View>
          ) : (
            <></>
          )}

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
          </View>
          {image && (
            <Button title="Choose another image " onPress={pickImage} />
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
        <View
          style={{
            borderColor: "black",
            borderWidth: 0.5,
            width: 150,
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        >
          <Button color={"black"} title="Submit" onPress={handleSubmit} />
        </View>
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
