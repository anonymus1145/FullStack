//@ts-check
import React from "react";
import { useState } from "react";

// Services
import blogService from "../services/blogs";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {removeBlog } from "../Reducers/blogsReducer";
import { initializeUser } from "../Reducers/userReducer";
import { initializeNotification } from "../Reducers/notificationReducer";
import { blogLike } from "../Reducers/blogsReducer";

// React routing
import { Link } from "react-router-dom";


const Blog = ({ blog }) => {
  // State for View
  const [view, setView] = useState("");

  // State for number of likes in the store
  // @ts-ignore
  const likes = useSelector((state) => state.blogs).find(
    (/** @type {object} */ blogLikes) => blogLikes.id === blog.id,
  ).likes;

  // We call useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // Function to like a blog
  const like = async () => {
    // Create new blog object equal with old blog and add 1 to likes
    const updatedBlog = { ...blog, likes: likes + 1 };

    // Update blog in database
    try {
      const response = await blogService.update(blog.id, updatedBlog);
      // Update blogs state
      if (response) {
        // Update like state in the redux store
        dispatch(blogLike(blog.id));
      }
      // Set error message
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        window.localStorage.removeItem("loggedUser");
        dispatch(initializeUser(null));
      }
      // Set error message
      dispatch(initializeNotification("Cannot like the blog"));
      setTimeout(() => {
        dispatch(initializeNotification(""));
      }, 5000);
    }
  };

  // Function to delete a blog
  const remove = async () => {
    // try to delete the blog from the database
    try {
      // Ask the user if he really wants to delete the blog
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}?`,
      );
      if (!window.confirm) {
        return;
      }
      // Delete blog and update's the state
      dispatch(removeBlog(blog.id));
    } catch (exception) {
      if (exception.response.status === 401) {
        console.log(exception);
        window.localStorage.removeItem("loggedUser");
        dispatch(initializeUser(null));
      }
      // Set error message
      dispatch(initializeNotification("Cannot delete the blog"));
      setTimeout(() => {
        dispatch(initializeNotification(""));
      }, 5000);
    }
  };
  // We give to the component a ClassName so that we can access it in the tests
  return (
    <div className="blog">
      <div style={{ marginTop: "10px" }}>
        {blog.title}
        <button style={{ marginLeft: "10px" }} onClick={() => setView("true")}>
          View
        </button>
        <button style={{ marginLeft: "10px" }}>
          <Link to={`/${blog.id}`}>Details</Link>
        </button>
      </div>
      <div>
        {view ? (
          <div>
            <p>{blog.url}</p>
            <p>
              likes: {likes}
              <button onClick={like} style={{ marginLeft: "10px" }}>
                Like
              </button>
            </p>
            <p> added by {blog.author}</p>
            <button onClick={remove}>Delete Blog</button>
            <button onClick={() => setView("")}>Hide</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
