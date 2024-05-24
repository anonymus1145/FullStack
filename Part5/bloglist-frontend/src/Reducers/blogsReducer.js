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
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blog = state.find((blog) => blog.id === id);
      const changedBlog = { ...blog, likes: blog.likes + 1 };
      // Replaces the blog in the state array with the given id with the changedBlog object and keeps the rest of the blogs unchanged.
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
  },
});

export const { setBlogs, addBlog, removeBlog, likeBlog } = blogSlice.actions;

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

// Update blog in the state after it is updated in the server
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ updateBlog =
    (blog) => {
      return async (
        /** @type {(arg0: { payload: any; type: "blogs/addBlog"; }) => void} */ dispatch,
      ) => {
        const updatedBlog = await blogService.update(blog.id, blog);
        dispatch(addBlog(updatedBlog));
      };
    };

// Remove blog from the state after it is removed from the server
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ deleteBlog =
    (id) => {
      return async (
        /** @type {(arg0: { payload: any; type: "blogs/addBlog"; }) => void} */ dispatch,
      ) => {
        await blogService.remove(id);
        dispatch(deleteBlog(id));
      };
    };

// Update the likes of the blog
export const /** @type import("@reduxjs/toolkit").ActionCreator<any> */ blogLike =
    (id) => {
      return async (
        /** @type {(arg0: { payload: any; type: string; }) => void} */ dispatch,
      ) => {
        dispatch(likeBlog(id));
      };
    };

export default blogSlice.reducer;
