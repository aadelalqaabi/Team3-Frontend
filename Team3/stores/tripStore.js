import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import { instance } from "./instance";

class TripStore {
  constructor() {
    makeAutoObservable(this);
  }

  trips = [];

  createTrip = async (newTrip) => {
    try {
      const formData = new FormData();
      for (const key in newTrip) formData.append(key, newTrip[key]);
      const response = await instance.post("/trips", formData);
      this.trips.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchTrips = async () => {
    try {
      const response = await instance.get("/trips");
      this.trips = response.data;
    } catch (error) {
      console.log("here  ", error);
    }
  };

  updateTrip = async (updatedTrip, tripId) => {
    try {
      const res = await instance.put(`/${tripId}`, updatedTrip);
      this.trips = this.trips.map((trip) =>
        trip._id === tripId ? res.data : trip
      );
    } catch (error) {
      console.log(error);
    }
  };

  deletetrip = async (tripId) => {
    try {
      await instance.delete(`/${tripId}`);
      this.trips = this.trips.filter((trip) => trip._id !== tripId);
    } catch (error) {
      console.log(error);
    }
  };

  getTripById = (tripId) => {
    return this.trips.find((trip) => trip._id === tripId);
  };

  getTrips = () => {
    return this.trips;
  };
}

const tripStore = new TripStore();
tripStore.fetchTrips();
export default tripStore;
