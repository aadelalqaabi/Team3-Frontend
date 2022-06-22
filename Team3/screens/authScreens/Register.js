import { StyleSheet, Text, View, TextInput } from "react-native";
import { Center, Square, Circle, Button } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    authStore.register(user);
  };
  return (
    <Center>
      <Text style={styles.title}>Register</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            handleChange("username", text);
          }}
          placeholder="Enter Username"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder="Enter Password"
        />
        {console.log("user: " + JSON.stringify(user))}
        <Button size={"lg"} colorScheme={"blue"} onPress={handleSubmit}>
          Register
        </Button>
      </View>
    </Center>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
  },
});
