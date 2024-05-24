import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const setAccesToken = async (token) => {
  try {
    await SecureStore.setItemAsync(Constants.expoConfig.extra.key, token);
    console.log("Token stored successfully");
  } catch (error) {
    console.log(error);
  }
};

const getAccesToken = async () => {
  try {
    const value = await SecureStore.getItemAsync(Constants.expoConfig.extra.key);
    if (value) {
      console.log("Token retrieved successfully");
      return value;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAccesToken = async () => {
  try {
    await SecureStore.deleteItemAsync(Constants.expoConfig.extra.key);
    console.log("Token deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

export default {
  setAccesToken,
  getAccesToken,
  deleteAccesToken
};
