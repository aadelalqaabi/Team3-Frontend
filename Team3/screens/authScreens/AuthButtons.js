import { StyleSheet, Text, View } from 'react-native'
import { Center, Square, Circle, Button} from "native-base";
import Logout from './Logout';
import React from 'react'

export default function AuthButtons({ navigation }) {
  return (
    <Center height={550}>
      <Text style={styles.title}>Welcom To TripShare</Text>
        <Button style={styles.btn} size={"lg"} colorScheme={"blue"} onPress={() => {navigation.navigate('Register');} }>Register</Button>
        <Button style={styles.btn} size={"lg"} colorScheme={"green"} onPress={() => {navigation.navigate('Login');} }>  Log In  </Button>
        <Logout/>
    </Center>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 40,
    },
    btn: {
        marginVertical: 8
    },
})