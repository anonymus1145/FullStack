//@ts-check
// We import the createSlice function from the reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

// We give the reducer an initial state
const initialState = "";

// We create a slice of the redux store with the name 'notification' using createSlice
// We pass the initial state and the reducer function as arguments to the createSlice
// The reducer function is used to update the state
// The reducer function is called whenever an action is dispatched
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

// Action creators

// We initialize the notification
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ initializeNotification = (/** @type {string} */ notification) => {
  return async (/** @type {(arg0: { payload: any; type: string; }) => void} */ dispatch) => {
    dispatch(setNotification(notification));
  };
}
export default notificationSlice.reducer;
