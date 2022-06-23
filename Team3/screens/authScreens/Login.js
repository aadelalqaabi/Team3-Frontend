import { StyleSheet, Text, View, TextInput } from "react-native";
import { Center, Square, Circle, Button } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    authStore.login(user);
  };
  return (
    <Center>
      <Text style={styles.title}>Login</Text>
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
        <Button size={"lg"} colorScheme={"green"} onPress={handleSubmit}>
          Login
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
  },
});
