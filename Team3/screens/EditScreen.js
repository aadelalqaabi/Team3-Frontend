import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from "react-native";
import Reinput from "reinput";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import Toast from "react-native-toast-message";

function EditScreen() {
  const [image, setImage] = useState(baseURL + authStore.user.image);
  const [user, setUser] = useState();
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
      setUser({
        ...user,
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
  };

  const handleSubmit = async () => {
    Toast.show({
      type: "success",
      text1: "Profile Updated",
    });
    navigation.navigate("Profile");
    await authStore.updateUser(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancel}>
        <Button onPress={cancelButton} title="Cancel" color="black" />
      </View>
      <View style={styles.main}>
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
                  width: 200,
                  height: 200,
                  borderRadius: 100,
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
        <View style={styles.input}>
          <Reinput
            label="Bio"
            onChangeText={handleChangeBio}
            placeholder="add your bio..."
          />
        </View>
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
      </View>
    </SafeAreaView>
  );
}
export default observer(EditScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  cancel: {
    marginRight: 20,
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
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
    width: 250,
    margin: 12,

    padding: 10,
  },
});
