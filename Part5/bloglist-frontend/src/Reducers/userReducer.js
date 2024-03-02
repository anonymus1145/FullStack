//@ts-check
import { createSlice } from "@reduxjs/toolkit";

// We give the reducer an initial state
const initialState = null;

// We create a slice of the redux store with the name 'user' using createSlice
// We pass the initial state and the reducer function as arguments to the createSlice
// The reducer function is used to update the state
// The reducer function is called whenever an action is dispatched
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Action creators

// Initialize user
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ initializeUser = (/** @type {object} */ user) => {
  return async (/** @type {(arg0: { payload: any; type: object; }) => void} */ dispatch) => {
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
