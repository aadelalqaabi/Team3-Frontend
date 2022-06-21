import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from "./screens/ProfileScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CreateScreen } from "./screens/CreateScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Login from "./screens/authScreens/Login";
import Register from "./screens/authScreens/Register";
import AuthButtons from "./screens/authScreens/AuthButtons";
import { observer } from "mobx-react";
import authStore from "./stores/authStore";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function App() {
  const checkUser = authStore.user; 
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {
        checkUser ? ( 
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false, tabBarIcon: ({ color, size, style }) => (<Ionicons name="home" color={"black"} size={30} style={{ paddingTop: "5%" }}/>),}}/>
            <Tab.Screen name="Create" component={CreateScreen} options={{ tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<Ionicons name="md-add-circle-sharp" size={30} color={"black"} style={{ paddingTop: "5%" }}/>),}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<AntDesign name="profile" size={30} color="black" style={{ paddingTop: "5%" }}/>), tabBarOptions: { showLabel: false },}}/>
          </Tab.Navigator>
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

export default observer(App);
