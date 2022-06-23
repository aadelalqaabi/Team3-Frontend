
import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import {
  Alert,

  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import * as Font from "expo-font";
import { baseURL } from "../../stores/instance";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import tripStore from "../../stores/tripStore";

function OwnerTrip({ trip, onPress }) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ]);

  if (value === "edit") {
    navigation.navigate("EditTrip", { trip: trip });
    setValue(null);
  } else if (value === "delete") {
    Alert.alert("Are you sure?", "You're trip will be permanently deleted!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => tripStore.deletetrip(trip._id) },
    ]);

    setValue(null);
  }

  const [loaded] = Font.useFonts({
    cream: require("../../assets/fonts/cream.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View>
      <DropDownPicker
        label="..."
        style={{
          borderRadius: 30,
          borderWidth: 0,
          width: 60,
          backgroundColor: "#00000000",
          alignSelf: "flex-end",
          height: 60,
        }}
        dropDownContainerStyle={{
          width: 100,
          position: "absolute",
          alignSelf: "flex",
          paddingTop: 10,
          marginLeft: 300,
          borderWidth: 0,
          borderRadius: 10,
        }}
        showTickIcon={false}
        showArrowIcon={false}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="..."
        placeholderStyle={{
          fontSize: 50,
          paddingBottom: 10,
        }}
      />
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${trip.image}` }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{trip.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default observer(OwnerTrip);


const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 16,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,

    marginVertical: 5,
  },
  thumb: {
    alignSelf: "center",
    width: 384,
    height: 216,
    borderRadius: 20,
    margin: 10,
    zIndex: -1,
    opacity: 0.7,

  },
  infoContainer: {
    position: "absolute",
    alignSelf: "flex-end",

    paddingLeft: 28,
    paddingBottom: 22,
  },
  name: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fffffc",

    padding: 30,
  },
  name: {
    fontSize: 28,
    fontFamily: "Cochin",
    fontWeight: "bold",
    color: "white",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },

    fontFamily: "cream",
  },
  edit: {
    borderRadius: 10,
  },

});
