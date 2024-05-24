//@ts-check
// We import the necessary import to implement the Redux Store
import { configureStore } from "@reduxjs/toolkit";

// We import the reducer from the reducer folder
import blogsReducer from "../Reducers/blogsReducer";
import userReducer from "../Reducers/userReducer";
import notificationReducer from "../Reducers/notificationReducer";
import loginReducer from "../Reducers/loginReducer";
import usersReducer from "../Reducers/usersReducer";

// We create the store where we will store the reducers
const store = configureStore({
  reducer: {
    // We add the reducer here
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: usersReducer,
  },
});

// We export the store
export default store;
