import { Text, View } from "react-native";
import Logout from "./authScreens/Logout";
export function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>profile!</Text>
      <Logout/>
    </View>
  );
}
