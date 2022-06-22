import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from './screens/ProfileScreen';
import RootNavigator from './index/home';
import ProfileNavigator from './index/ProfileNavigator';
import { CreateScreen } from './screens/CreateScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Login from './screens/authScreens/Login';
import Register from './screens/authScreens/Register';
import AuthButtons from './screens/authScreens/AuthButtons';
import { observer } from 'mobx-react';
import authStore from './stores/authStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const checkUser = authStore.user;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
          backgroundColor: '#f3f6fe',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
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

          tabBarActiveTintColor: '#ff844b',
          tabBarInactiveTintColor: '#4e7d96',
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
                paddingTop: '5%',
                position: 'absolute',
                paddingBottom: 45,
                shadowOpacity: 0.2,
                shadowRadius: 5,
                shadowColor: 'black',
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            />
          ),
          tabBarActiveTintColor: '#ff844b',
          tabBarInactiveTintColor: '#4e7d96',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
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
          tabBarActiveTintColor: '#ff844b',
          tabBarInactiveTintColor: '#4e7d96',
        }}
      />
    </Tab.Navigator>
  );
}

export default observer(App);
