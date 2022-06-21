import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logout from './authScreens/Logout';
import tripStore from '../stores/tripStore';
import authStore from '../stores/authStore';
import { Trip } from './trips/Trip';

export function ProfileScreen() {
  let trips = authStore.user.trips;
  trips = tripStore.trips.filter((trip) => trips.includes(trip._id));
  trips = trips.map((trip) => (
    <Trip
      trip={trip}
      onPress={() => {
        navigation.navigate('TripDetails', { id: trip._id });
      }}
    />
  ));
  const navigation = useNavigation();
  const editProfileButton = () => {
    navigation.navigate('Edit');
    console.log(trips);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <Text style={styles.userName}>{authStore.user.username}</Text>
          </View>
          <View style={styles.edit}>
            <Button onPress={editProfileButton} title="Edit" color="#841584" />
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>bio</Text>
        </View>
        <View>{trips}</View>
        <Logout />
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageUserName: {
    justifyContent: 'flex-Start',
    alignItems: 'center',
    flexDirection: 'row',
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
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  bio: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  bioText: {
    fontSize: 20,
  },
});
