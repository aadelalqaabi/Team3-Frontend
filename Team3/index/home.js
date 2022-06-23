import { createStackNavigator } from "@react-navigation/stack";
import TripList from "../screens/trips/TripList";
import TripDetails from "../screens/trips/TripDetails";
import tripStore from "../stores/tripStore";
import OwnerScreen from "../screens/trips/OwnerScreen";
import EditTrip from "../screens/trips/EditTrip";

const RootNavigator = () => {
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
        name="TripList"
        component={TripList}
      />
      <Screen name="Owner" component={OwnerScreen} />
      <Screen name="EditTrip" component={EditTrip} />
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

export default RootNavigator;
