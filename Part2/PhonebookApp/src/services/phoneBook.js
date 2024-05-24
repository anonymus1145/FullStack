/**
 * @module phoneBook
 */
import axios from "axios";
const baseUrl = "/api/users";

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
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
