import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import  ProfileScreen  from "../screens/ProfileScreen";
import OwnerScreen from "../screens/trips/OwnerScreen";
import TripDetails from "../screens/trips/TripDetails";
import tripStore from "../stores/tripStore";

const ProfileNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Edit" component={EditScreen} />
      <Screen
        name="TripDetails"
        component={TripDetails}
        options={({ route }) => {
          const { id } = route.params;
          return {
            title: tripStore.getTripById(id).title,
          };
        }}
      />
      <Screen name="Owner" component={OwnerScreen} />
    </Navigator>
  );
};

export default ProfileNavigator;
