//@ts-check
import React from "react";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./Reducers/blogsReducer";
import { initializeUser } from "./Reducers/userReducer";
import { initializeNotification } from "./Reducers/notificationReducer";

const App = () => {
  // Username and password state for the login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for new blog
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // We call the useDispatch hook to get access to the actions from the store
  const dispatch = useDispatch();

  // We call the useSelector hook to get access to the state user, blogs and notification from the store
  // @ts-ignore
  const user = useSelector((state) => state.user);
  // @ts-ignore
  const message = useSelector((state) => state.notification);

  // Get all blogs
  useEffect(() => {
    // We call dispatch and give the action creator as an argument to update the state
    // We call the initializeAnecdotes action from the reducer and pass it to the action
    dispatch(initializeBlogs());
  }, []);

  // Check if user is in local storage and set user state and push token to blogs module
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const /** @type {object} */ user = JSON.parse(loggedUserJSON);
      // Set user state to the user object with token returned from local storage
      dispatch(initializeUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blog App</h1>
      <h2>{message}</h2>
      {user ? (
        <BlogForm
          setNewTitle={setNewTitle}
          setNewUrl={setNewUrl}
          newTitle={newTitle}
          newUrl={newUrl}
        />
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
