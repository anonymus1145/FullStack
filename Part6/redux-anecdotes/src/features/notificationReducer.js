import { createSlice } from "@reduxjs/toolkit";

// Notification reducer initial state
const initialState = "";

// We create a slice of the redux store with the name 'notification' using createSlice
// We pass the initial state and the reducer function as arguments to the createSlice
// The reducer function is used to update the stater
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

// Actions creators
//
// Initialize Notification based on server data
export const initializeNotification = (content) => {
  return async (dispatch) => {
    dispatch(setNotification(content), 5)
  };
};
export default notificationSlice.reducer;
