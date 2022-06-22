import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { baseURL } from "../../stores/instance";
import tripStore from "../../stores/tripStore";
import { useNavigation } from '@react-navigation/native';

export function Trip({ trip, onPress }) {
  const navigation = useNavigation();
  const owner = trip.userId;
  
  return (
  <View>
      <Button onPress={() => {navigation.navigate('Owner', {owner: owner})}} title={owner.username} color="#841584" />
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image style={styles.thumb} source={{ uri: `${baseURL}${trip.image}` }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{trip.title}</Text>
        </View>
      </TouchableOpacity>
  </View>
  );
}

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
    marginVertical: 20,
  },
  thumb: {
    alignSelf: "center",
    width: 384,
    height: 216,
    borderRadius: 20,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  },
  infoContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 30,
  },
  name: {
    fontSize: 28,
    fontFamily: "Cochin",
    fontWeight: "bold",
    color: "white",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});
