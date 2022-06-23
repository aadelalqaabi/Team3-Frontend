import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import tripStore from "../../stores/tripStore";
import Trip from "./Trip";
import { observer } from "mobx-react";
import * as Font from "expo-font";

function TripList({ navigation }) {
  const trips = tripStore.getTrips();
  const [loaded] = Font.useFonts({
    PoetsenOne: require("../../assets/fonts/PoetsenOne.ttf"),
  });
  if (!loaded) {
    return null;
  }

  function renderTrip({ item: trip }) {
    return (
      <Trip
        trip={trip}
        onPress={() => {
          navigation.navigate("TripDetails", { id: trip._id });
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fffffc" }}>
      <Text style={styles.name}>Tripper</Text>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={trips}
        renderItem={renderTrip}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default observer(TripList);

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  productsListContainer: {
    backgroundColor: "#fffffc",
    marginHorizontal: 10,
  },
  name: {
    fontSize: 35,
    fontFamily: "PoetsenOne",
    color: "black",
    marginTop: 8,
    marginLeft: 32,
    paddingTop: 4,
    paddingBottom: 12,
  },
});
