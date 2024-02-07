import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const update = (id, newPerson) => {
  const request = axios.patch(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}
