import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import RootNavigator from "./index/home";
import { CreateScreen } from "./screens/CreateScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Login from "./screens/authScreens/Login";
import Register from "./screens/authScreens/Register";
import AuthButtons from "./screens/authScreens/AuthButtons";
import { observer } from "mobx-react";
import authStore from "./stores/authStore";
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const checkUser = authStore.user;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <StatusBar style="dark" />
        {checkUser ? (
          <TabBar />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Set Up Account" component={AuthButtons} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor:"#fffffc",
          marginBottom: 10,
          marginLeft: 5,
          marginRight: 5,
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
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={45}
              style={{ position: "absolute", paddingTop: "20%" }}
            />
          ),

          tabBarActiveTintColor: "#1e2029",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
      <Tab.Screen
        name="Create A Trip"
        component={CreateScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={85}
              color="black"
              style={{
                
                paddingTop: "20%",
                position: "absolute",
                paddingBottom: "28%",
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
          tabBarInactiveTintColor: "#8D9C98",
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
              size={45}
              color={color}
              style={{ position: "absolute", paddingTop: "20%" }}
            />
          ),
          tabBarActiveTintColor: "#1e2029",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
    </Tab.Navigator>
  );
}

export default observer(App);
