import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TripDetails from "../screens/trips/TripDetails";
import tripStore from "../stores/tripStore";

const ProfileNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Screen name="Edit" component={EditScreen} />
      <Screen
        name="TripDetails"
        component={TripDetails}
        options={({ route }) => {
          const { id } = route.params;
          return {
            title: tripStore.getTripById(id).title,
            headerBackTitleVisible: false,
          };
        }}
      />
    </Navigator>
  );
};

export default ProfileNavigator;
