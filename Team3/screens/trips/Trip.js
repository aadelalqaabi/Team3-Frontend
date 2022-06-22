import { observer } from "mobx-react";
import React from "react";
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

function Trip({ trip, onPress }) {
  const [loaded] = Font.useFonts({
    cream: require("../../assets/fonts/cream.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Image style={styles.thumb} source={{ uri: `${baseURL}${trip.image}` }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{trip.title}</Text>
      </View>
    </TouchableOpacity>
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
    paddingBottom: 22
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
});
