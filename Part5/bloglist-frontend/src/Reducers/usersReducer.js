//@ts-check
// We import the createSlice function from the reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

// We import the userService to be able to call the server
import userService from "../services/users";


// We give the reducer an initial state
const initialState = [];


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;


// Action creators

// Initialize users
export const  /** @type import("@reduxjs/toolkit").ActionCreator<any> */ initializeUsers = () => {
  return async (/** @type {(arg0: { payload: any; type: "users/setUsers"; }) => void} */ dispatch) => {
    const users = await userService.getUsers();
    dispatch(setUsers(users));
  };
};


export default usersSlice.reducer;
