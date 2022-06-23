import {

  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { baseURL } from "../../stores/instance";
import tripStore from "../../stores/tripStore";
import { Trip } from "../trips/Trip";
import OwnerProfileTrip from "./OwnerProfileTrip";

  function OwnerScreen({route, navigation}) {
    const { owner } = route.params;
    
    let trips = owner.trips;
    trips = tripStore.trips.filter((trip) => trips.includes(trip._id));


  let trips = owner.trips;
  trips = tripStore.trips.filter((trip) => trips.includes(trip._id));
  trips = trips.map((trip) => (
    <OwnerProfileTrip
      key={trip._id}
      trip={trip}
      onPress={() => {
        navigation.navigate("TripDetails", { id: trip._id });
      }}
    />
  ));
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `${baseURL}${owner.image}`,
              }}
            />
            <Text style={styles.userName}>{owner.username}</Text>
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{owner.bio}</Text>
        </View>
        <View>{trips}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  imageUserName: {
    justifyContent: "flex-Start",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    marginLeft: 2,
  },
  profile: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 25,
    fontSize: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginRight: 130,
    marginLeft: 130,
    marginTop: 120,
    borderWidth: 2,
  },
  userName: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
  },
  edit: {
    borderRadius: 10,
    position: "absolute",
    marginTop: 400,
    marginLeft: "16%",
    backgroundColor: "#e7e7e7",
    borderRadius: "50%",
    justifyContent: "center",
    paddingLeft: 80,
    paddingRight: 80,
  },
  bio: {
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    padding: 10,
    paddingTop: 2,
    paddingBottom: 15,
    fontSize: 4,
  },
  bioText: {
    fontSize: 17,
  },
});

