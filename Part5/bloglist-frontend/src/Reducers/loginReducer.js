//@ts-check
import { createSlice } from "@reduxjs/toolkit";

// We give the reducer an initial state
const initialState = {
  username: "",
  password: "",
};

// We create a slice of the redux store with the name 'login' using createSlice
// We pass the initial state and the reducer function as arguments to the createSlice
// The reducer function is used to update the state
// The reducer function is called whenever an action is dispatched
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const { setUsername, setPassword } = loginSlice.actions;

// Action creators
//
// Initialize login with username and password
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ initializeLogin = (/** @type {{ username: string; password: string; }} */ login) => {
  return async (/** @type {(arg0: { payload: any; type: "login/setUsername" | "login/setPassword"; }) => void} */ dispatch) => {
    dispatch(setUsername(login.username));
    dispatch(setPassword(login.password));
  };
};
export default loginSlice.reducer;
