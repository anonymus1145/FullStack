//@ts-check
import axios from "axios";
const baseUrl = "/api/users";

// Variable to hold the token
let token = null;

// Function to get the token from login user
const setToken = (/** @type {{ token: string; }} */ newToken) => {
  token = `Bearer ${newToken}`;
};

// Module to handle users and create routes for them
// Get all users
const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getUsers, setToken };
