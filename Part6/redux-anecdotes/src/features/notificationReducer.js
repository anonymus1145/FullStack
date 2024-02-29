import { createSlice } from "@reduxjs/toolkit";

const initialState = "No notification yet";

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
