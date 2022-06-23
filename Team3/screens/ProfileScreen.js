import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Logout from "./authScreens/Logout";
import tripStore from "../stores/tripStore";
import authStore from "../stores/authStore";
import Trip from "./trips/Trip";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";

function ProfileScreen() {
  const navigation = useNavigation();
  let trips = authStore.user.trips;
  trips = tripStore.trips.filter((trip) => trips.includes(trip._id));
  // trips = trips.map((trip) => (
  //   <OwnerTrip
  //     key={trip._id}
  //     trip={trip}
  //     onPress={() => {
  //       navigation.navigate('TripDetails', { id: trip._id });
  //     }}
  //   />
  // ));
  function renderTrip({ item: trip }) {
    return (
      <OwnerTrip
        trip={trip}
        onPress={() => {
          navigation.navigate("TripDetails", { id: trip._id });
        }}
      />
    );
  }
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
        <ScrollView>
        <FlatList
          data={trips}
          renderItem={renderTrip}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(trip, index) => index}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "justify",
    margin: 12,
    padding: 10,
  },
  bioText: {
    fontSize: 13,
    color: "grey"
  },
  tripList: {
    grid: 2,
    gridtemplate: "c1 c2",
  },
  imageCard:{
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  }
});
