import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "./screens/ProfileScreen";
import RootNavigator from "./index/home";
import { CreateScreen } from "./screens/CreateScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#f3f6fe",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: "absolute",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={RootNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name="home"
              color={color}
              size={35}
              style={{ paddingTop: 13 }}
            />
          ),

          tabBarActiveTintColor: "#ff844b",
          tabBarInactiveTintColor: "#4e7d96",
        }}
      />
      <Tab.Screen
        name="Create A Trip"
        component={CreateScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name="md-add-circle-sharp"
              size={80}
              color={color}
              style={{
                paddingTop: "5%",
                position: "absolute",
                paddingBottom: 45,
                shadowOpacity: 0.2,
                shadowRadius: 5,
                shadowColor: "black",
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            />
          ),
          tabBarActiveTintColor: "#ff844b",
          tabBarInactiveTintColor: "#4e7d96",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={color}
              style={{ paddingTop: 13 }}
            />
          ),
          tabBarActiveTintColor: "#ff844b",
          tabBarInactiveTintColor: "#4e7d96",
        }}
      />
    </Tab.Navigator>
  );
}
