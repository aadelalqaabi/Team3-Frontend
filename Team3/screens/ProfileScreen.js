import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {
  const navigation = useNavigation();
  const editProfileButton = () => {
    navigation.navigate('Edit');
  };
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
          <Text style={styles.userName}>UserName</Text>
        </View>
        <View style={styles.edit}>
          <Button
            onPress={editProfileButton}
            title="Edit"
            color="#841584"
            // accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
      <View style={styles.bio}>
        <Text style={styles.bioText}>
          biobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobio
        </Text>
      </View>
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
