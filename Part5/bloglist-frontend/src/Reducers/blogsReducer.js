//@ts-check
// We import the creaSlice to be able to create a slice of the store
import { createSlice } from "@reduxjs/toolkit";
// We import the blogService to be able to call the server
import blogService from "../services/blogs";

// We give the reducer an initial state
const initialState = [];

// We create a slice of the redux store with the name 'blogs' using createSlice
// We pass the initial state and the reducer function as arguments to the createSlice
// The reducer function is used to update the state
// The reducer function is called whenever an action is dispatched
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(
        (
          /** @type {{ likes: number; }} */ a,
          /** @type {{ likes: number; }} */ b,
        ) => b.likes - a.likes,
      );
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

// Action creators

// Initialize blogs based on server data
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ initializeBlogs =
    () => {
      return async (
        /** @type {(arg0: { payload: any; type: "blogs/setBlogs"; }) => void} */ dispatch,
      ) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
      };
    };

// Add blog to the state after it is added to the server so that it can be displayed without having 
// to make a new request to the server
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ addBlogToState =
    (blog) => {
      return async (
        /** @type {(arg0: { payload: any; type: "blogs/addBlog"; }) => void} */ dispatch,
      ) => {
        dispatch(addBlog(blog));
      };
    };

export default blogSlice.reducer;
