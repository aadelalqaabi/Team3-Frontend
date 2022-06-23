import { observer } from "mobx-react";
import React from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
} from "react-native";
import { baseURL } from "../../stores/instance";
import tripStore from "../../stores/tripStore";

function TripDetails({ route }) {
  const trip = tripStore.getTripById(route.params.id);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.profile}>
        <Image
          style={styles.profileImage}
          source={{ uri: `${baseURL}${trip.userId.image}` }}
        />
        <Text style={styles.profileName}>{trip.userId.username}</Text>
      </View>

      <View>
        <Image
          style={styles.image}
          source={{ uri: `${baseURL}${trip.image}` }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{trip.title}</Text>
        </View>

        <View style={styles.desContainer}>
          <Text style={styles.description}>{trip.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default observer(TripDetails);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: "100%",
  },
  infoContainer: {
    padding: 50,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 10,
    height: 150,
    marginTop: 260,
    zIndex: 100,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowColor: "grey",
    shadowOffset: {
      height: -15,
    },
  },
  desContainer: {
    padding: 16,
    borderRadius: 50,
    position: "absolute",
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 50,
    justifyContent: "center",
    paddingTop: 0,
    height: 150,
    marginTop: 330,
    zIndex: 100,
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    fontWeight: "400",
    color: "#3d3d3d",
    marginBottom: 16,
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
