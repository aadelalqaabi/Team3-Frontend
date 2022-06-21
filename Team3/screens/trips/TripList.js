import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import tripStore from "../../stores/tripStore";
import { Trip } from "./Trip";
import { observer } from "mobx-react";
import * as Font from "expo-font";

function TripList({ navigation }) {
  const trips = tripStore.getTrips();

  const [loaded] = Font.useFonts({
    Helvetica: require("../../assets/fonts/Helvetican.ttf"),
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
    <SafeAreaView style={{ backgroundColor: "#e3edf2" , marginBottom: 160}}>
      <Text style={styles.name}>Trips</Text>
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        data={trips}
        renderItem={renderTrip}
      />
    </SafeAreaView>
  );
}

export default observer(TripList);

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#e8eef1",
    height: "100%",
  },
  productsListContainer: {
    backgroundColor: "#e8eef1",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 40,
    fontFamily: "Helvetica",
    color: "black",
    marginTop: 30,
    marginLeft: 30,
  },
});
