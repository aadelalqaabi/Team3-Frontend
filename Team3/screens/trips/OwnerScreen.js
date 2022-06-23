import {
    Text,
    View,
    SafeAreaView,
    Button,
    StyleSheet,
    Image,
    ScrollView, FlatList
  } from 'react-native';
  import tripStore from "../../stores/tripStore";
  import { Trip } from "../trips/Trip";
  import { OwnerTrip } from "../trips/OwnerTrip";
  import { observer } from "mobx-react";

  function OwnerScreen({route, navigation}) {
    const { owner } = route.params;
    
    let trips = owner.trips;
    trips = tripStore.trips.filter((trip) => trips.includes(trip._id));

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
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.imageUserNameEdit}>
                    <View style={styles.imageUserName}>
                        <Image
                            style={styles.profileImage}
                            source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                        <Text style={styles.userName}>{owner.username}</Text>
                    </View>
                </View>
                <View style={styles.bio}>
                    <Text style={styles.bioText}>bio</Text>
                </View>
                <ScrollView>
                <FlatList
                  data={trips}
                  renderItem={renderTrip}
                  //Setting the number of column
                  numColumns={2}
                  keyExtractor={(trip, index) => index}
                />
                {/* <View>{trips}</View> */}
            </ScrollView>
        </SafeAreaView>
    );
  }

  export default observer(OwnerScreen)
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
  