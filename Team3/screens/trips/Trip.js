import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import * as Font from "expo-font";
import { baseURL } from "../../stores/instance";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import tripStore from "../../stores/tripStore";

function Trip({ trip, onPress }) {
  const owner = trip.userId;
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
    tripStore.deletetrip(trip._id);
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
      <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          navigation.navigate("Owner", { owner: owner });
        }}
      >
        <Image
          style={styles.profileImage}
          source={{ uri: `${baseURL}${owner.image}` }}
        />
        <Text style={styles.profileName}>{owner.username}</Text>
      </TouchableOpacity>
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

export default observer(Trip);

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
  profileName: {
    justifyContent: "center",
    paddingTop: 6,
    fontSize: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 15,
  },
  profile: {
    flexDirection: "row",
    padding: 10,

  },
});
