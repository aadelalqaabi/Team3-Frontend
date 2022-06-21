import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Center, Square, Circle, Button} from "native-base";
import { useState } from 'react';
import authStore from '../../stores/authStore';
import React from 'react'

export default function Logout() {
    const handleLogOut = () => {
        authStore.logout();
    };
  return (
    <Center>
      <Button size={"lg"} colorScheme={"red"} onPress={handleLogOut}> Logout </Button>
    </Center>
  )
}

const styles = StyleSheet.create({})