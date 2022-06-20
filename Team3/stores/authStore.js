import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = (token) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signOut();
      }
    }
  };

  signUp = async (newUser) => {
    try {
      const response = await instance.post("/signup", newUser);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  
  signIn = async (userData) => {
    try {
      const response = await instance.post("/signin", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  signOut = () => {
    this.user = null;
    localStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
  };

  updateUser = async (updatedUser, userId, recipeId) => {
    try {
      const res = await instance.put(
        `/${userId}/recipes/${recipeId}`,
        updatedUser
      );
    } catch (error) {
      console.log("RecipeStore-> updatedRecipe-> error", error);
    }
  };
}



const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
