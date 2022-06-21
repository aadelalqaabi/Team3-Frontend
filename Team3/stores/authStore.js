import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = async (token) => {
    await AsyncStorage.setItem('myToken', JSON.stringify(token));
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  checkForToken = async () => {
    let token = null;
    const jsonValue = await AsyncStorage.getItem('myToken')
    if(jsonValue !== null) token = JSON.parse(jsonValue);

    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.logout();
      }
    }
  };

  register = async (newUser) => {
    try {
      const response = await instance.post("/register", newUser);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  
  login = async (userData) => {
    try {
      const response = await instance.post("/login", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    this.user = null;
    AsyncStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
  };

//   updateUser = async (updatedUser, userId, recipeId) => {
//     try {
//       const res = await instance.put(
//         `/${userId}/recipes/${recipeId}`,
//         updatedUser
//       );
//     } catch (error) {
//       console.log("RecipeStore-> updatedRecipe-> error", error);
//     }
//   };
}



const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
