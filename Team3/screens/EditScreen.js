import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export function EditScreen() {
  const [text, onChangeText] = React.useState('');
  const navigation = useNavigation();
  const cancelButton = () => {
    navigation.navigate('Profile');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancel}>
        <Button onPress={cancelButton} title="Cancel" color="#841584" />
      </View>
      <View style={styles.main}>
        <View style={styles.addImage}>
          <Button
            // onPress={editProfileButton}
            title="Add Image"
            color="#841584"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={onChangeText}
            value={text}
            placeholder="add your bio..."
          />
        </View>
        <View style={styles.addImage}>
          <Button
            // onPress={editProfileButton}
            title="Submit"
            color="#841584"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  cancel: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 10,
  },
  addImageText: {
    fontSize: 30,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
