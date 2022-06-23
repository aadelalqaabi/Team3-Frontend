import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logout from "./authScreens/Logout";
import tripStore from "../stores/tripStore";
import authStore from "../stores/authStore";
import Trip from "./trips/Trip";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import OwnerTrip from "./trips/OwnerTrip";

function ProfileScreen() {
  const navigation = useNavigation();
  const trips = tripStore.trips
    .filter((trip) => trip.userId._id === authStore.user.id)
    .map((trip) => (
      <OwnerTrip
        key={trip._id}
        trip={trip}
        onPress={() => {
          navigation.navigate("TripDetails", { id: trip._id });
        }}
      />
    ));
  const editProfileButton = () => {
    navigation.navigate("Edit");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{ position: "relative", alignSelf: "flex-end", margin: 10 }}
        >
          <Logout />
        </View>
        <Text style={styles.profile}>Profile</Text>
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
            <Image
              style={styles.profileImage}
              source={{
                uri: baseURL + authStore.user.image,
              }}
            />
            <Text style={styles.userName}>{authStore.user.username}</Text>
          </View>
          <View style={styles.edit}>
            <Button
              onPress={editProfileButton}
              title="Edit Profile"
              color="black"
            />
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{authStore.user.bio}</Text>
        </View>
        <View>{trips}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default observer(ProfileScreen);
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
    marginTop: 80,
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
    marginTop: 360,
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
    fontSize: 9,
  },
  bioText: {
    fontSize: 17,
    paddingBottom: 20,
  },
});
