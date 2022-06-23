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

function ProfileScreen() {
  const navigation = useNavigation();
  const trips = tripStore.trips
    .filter((trip) => trip.userId._id === authStore.user.id)
    .map((trip) => (
      <Trip
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
            <Button onPress={editProfileButton} title="Edit" color="#841584" />
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{authStore.user.bio}</Text>
        </View>
        <View>{trips}</View>
        <Logout />
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
    flexDirection: "row",
  },

  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  userName: {
    fontSize: 20,
    marginLeft: 10,
  },
  edit: {
    backgroundColor: "pink",
    borderRadius: 10,
  },
  bio: {
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  bioText: {
    fontSize: 20,
  },
});
