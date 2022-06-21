import { createStackNavigator } from "@react-navigation/stack";
import TripList from "../screens/trips/TripList";
import TripDetails from "../screens/trips/TripDetails";
import tripStore from "../stores/tripStore";

const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="TripList" component={TripList} />
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
    </Navigator>
  );
};

export default RootNavigator;
