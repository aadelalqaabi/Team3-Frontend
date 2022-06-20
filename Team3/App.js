import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "./screens/ProfileScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CreateScreen } from "./screens/CreateScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, style }) => (
              <Ionicons
                name="home"
                color={"black"}
                size={30}
                style={{ paddingTop: "5%" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="md-add-circle-sharp"
                size={30}
                color={"black"}
                style={{ paddingTop: "5%" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign
                name="profile"
                size={30}
                color="black"
                style={{ paddingTop: "5%" }}
              />
            ),
            tabBarOptions: { showLabel: false },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
