//@ts-check
import axios from "axios";
const baseUrl = "/api/blogs";

// Variable to hold the token
let token = null;

// Function to get the token from login user
const setToken = (/** @type {{ token: string; }} */ newToken) => {
  token = `Bearer ${newToken}`;
};

// Module to handle blogs and create routes for them
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Function to create a new blog
const create = async (/** @type {object} */ newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// Function to update a blog
const update = async (/** @type {{ id: string }} */ id, /** @type {object} */ newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

// Function to delete a blog
const remove = async (/** @type {{ id: string }} */ id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, setToken, remove };

