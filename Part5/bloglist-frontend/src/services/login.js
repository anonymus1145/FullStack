import axios from 'axios'
const baseUrl = '/api/login'

// Login module
// Makes a POST request to the server with username and password to log in a user and return the user object with token
const login = async (credentials) => {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
}

export default { login };
